// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@uniswap/v2-core/contracts/UniswapV2Pair.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol";
import "@uniswap/v2-core/contracts/libraries/UniswapV2Library.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IWETH.sol";
import "@uniswap/v2-core/contracts/interfaces/IERC20.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

contract UniswapV2DEX is IUniswapV2Factory, IUniswapV2Router02 {
    address public override feeTo;
    address public override feeToSetter;
    mapping(address => mapping(address => address)) public override getPair;
    address[] public override allPairs;
    address public immutable WETH;

    modifier ensure(uint deadline) {
        require(deadline >= block.timestamp, "DEX: EXPIRED");
        _;
    }

    constructor(address _WETH) {
        feeToSetter = msg.sender;
        WETH = _WETH;
    }

    // ===== FACTORY =====
    function allPairsLength() external view override returns (uint) {
        return allPairs.length;
    }

    function createPair(address tokenA, address tokenB) external override returns (address pair) {
        require(tokenA != tokenB, "DEX: IDENTICAL_ADDRESSES");
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), "DEX: ZERO_ADDRESS");
        require(getPair[token0][token1] == address(0), "DEX: PAIR_EXISTS");
        bytes memory bytecode = type(UniswapV2Pair).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        UniswapV2Pair(pair).initialize(token0, token1);
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair;
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
    }

    function setFeeTo(address _feeTo) external override {
        require(msg.sender == feeToSetter, "DEX: FORBIDDEN");
        feeTo = _feeTo;
    }

    function setFeeToSetter(address _feeToSetter) external override {
        require(msg.sender == feeToSetter, "DEX: FORBIDDEN");
        feeToSetter = _feeToSetter;
    }

    // ===== ROUTER HELPERS =====
    function _pairFor(address tokenA, address tokenB) internal view returns (address) {
        return getPair[tokenA][tokenB];
    }

    function _quote(uint amountA, uint reserveA, uint reserveB) internal pure returns (uint) {
        return UniswapV2Library.quote(amountA, reserveA, reserveB);
    }

    function _getReserves(address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB) {
        (reserveA, reserveB,) = IUniswapV2Pair(_pairFor(tokenA, tokenB)).getReserves();
        (reserveA, reserveB) = tokenA < tokenB ? (reserveA, reserveB) : (reserveB, reserveA);
    }

    // ===== ADD LIQUIDITY =====
    function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) external override ensure(deadline) returns (uint amountA, uint amountB, uint liquidity) {
        if (_pairFor(tokenA, tokenB) == address(0)) createPair(tokenA, tokenB);
        (uint reserveA, uint reserveB) = _getReserves(tokenA, tokenB);
        if (reserveA == 0 && reserveB == 0) {
            (amountA, amountB) = (amountADesired, amountBDesired);
        } else {
            uint amountBOptimal = _quote(amountADesired, reserveA, reserveB);
            if (amountBOptimal <= amountBDesired) {
                require(amountBOptimal >= amountBMin, "DEX: INSUFFICIENT_B_AMOUNT");
                (amountA, amountB) = (amountADesired, amountBOptimal);
            } else {
                uint amountAOptimal = _quote(amountBDesired, reserveB, reserveA);
                require(amountAOptimal >= amountAMin, "DEX: INSUFFICIENT_A_AMOUNT");
                (amountA, amountB) = (amountAOptimal, amountBDesired);
            }
        }
        IERC20(tokenA).transferFrom(msg.sender, _pairFor(tokenA, tokenB), amountA);
        IERC20(tokenB).transferFrom(msg.sender, _pairFor(tokenA, tokenB), amountB);
        liquidity = IUniswapV2Pair(_pairFor(tokenA, tokenB)).mint(to);
    }

    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external payable override ensure(deadline) returns (uint amountToken, uint amountETH, uint liquidity) {
        if (_pairFor(token, WETH) == address(0)) createPair(token, WETH);
        (uint reserveToken, uint reserveETH) = _getReserves(token, WETH);
        if (reserveToken == 0 && reserveETH == 0) {
            (amountToken, amountETH) = (amountTokenDesired, msg.value);
        } else {
            uint amountETHOptimal = _quote(amountTokenDesired, reserveToken, reserveETH);
            if (amountETHOptimal <= msg.value) {
                require(amountETHOptimal >= amountETHMin, "DEX: INSUFFICIENT_ETH_AMOUNT");
                (amountToken, amountETH) = (amountTokenDesired, amountETHOptimal);
            } else {
                uint amountTokenOptimal = _quote(msg.value, reserveETH, reserveToken);
                require(amountTokenOptimal >= amountTokenMin, "DEX: INSUFFICIENT_TOKEN_AMOUNT");
                (amountToken, amountETH) = (amountTokenOptimal, msg.value);
            }
        }
        IERC20(token).transferFrom(msg.sender, _pairFor(token, WETH), amountToken);
        IWETH(WETH).deposit{value: amountETH}();
        IWETH(WETH).transfer(_pairFor(token, WETH), amountETH);
        liquidity = IUniswapV2Pair(_pairFor(token, WETH)).mint(to);
    }

    // ===== REMOVE LIQUIDITY =====
    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) public override ensure(deadline) returns (uint amountA, uint amountB) {
        address pair = _pairFor(tokenA, tokenB);
        IERC20(pair).transferFrom(msg.sender, pair, liquidity);
        (uint amount0, uint amount1) = IUniswapV2Pair(pair).burn(to);
        (amountA, amountB) = tokenA < tokenB ? (amount0, amount1) : (amount1, amount0);
        require(amountA >= amountAMin, "DEX: INSUFFICIENT_A_AMOUNT");
        require(amountB >= amountBMin, "DEX: INSUFFICIENT_B_AMOUNT");
    }

    function removeLiquidityETH(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) public override ensure(deadline) returns (uint amountToken, uint amountETH) {
        (amountToken, amountETH) = removeLiquidity(token, WETH, liquidity, amountTokenMin, amountETHMin, address(this), deadline);
        IERC20(token).transfer(to, amountToken);
        IWETH(WETH).withdraw(amountETH);
        payable(to).transfer(amountETH);
    }

    // ===== REMOVE LIQUIDITY FOR FEE-ON-TRANSFER TOKENS =====
    function removeLiquidityETHSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external override ensure(deadline) returns (uint amountETH) {
        (, amountETH) = removeLiquidity(token, WETH, liquidity, amountTokenMin, amountETHMin, address(this), deadline);
        IERC20(token).transfer(to, IERC20(token).balanceOf(address(this)));
        IWETH(WETH).withdraw(amountETH);
        payable(to).transfer(amountETH);
    }

    function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external override ensure(deadline) returns (uint amountETH) {
        address pair = _pairFor(token, WETH);
        uint value = approveMax ? type(uint).max : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        amountETH = removeLiquidityETHSupportingFeeOnTransferTokens(token, liquidity, amountTokenMin, amountETHMin, to, deadline);
    }

    // ===== STANDARD SWAPS =====
    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external override ensure(deadline) returns (uint[] memory amounts) {
        amounts = UniswapV2Library.getAmountsOut(address(this), amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, "DEX: INSUFFICIENT_OUTPUT_AMOUNT");
        IERC20(path[0]).transferFrom(msg.sender, _pairFor(path[0], path[1]), amounts[0]);
        _swap(path, to);
    }

    function swapExactETHForTokens(
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external override payable ensure(deadline) returns (uint[] memory amounts) {
        require(path[0] == WETH, "DEX: INVALID_PATH");
        amounts = UniswapV2Library.getAmountsOut(address(this), msg.value, path);
        require(amounts[amounts.length - 1] >= amountOutMin, "DEX: INSUFFICIENT_OUTPUT_AMOUNT");
        IWETH(WETH).deposit{value: amounts[0]}();
        IWETH(WETH).transfer(_pairFor(path[0], path[1]), amounts[0]);
        _swap(path, to);
    }

    function swapExactTokensForETH(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external override ensure(deadline) returns (uint[] memory amounts) {
        require(path[path.length - 1] == WETH, "DEX: INVALID_PATH");
        amounts = UniswapV2Library.getAmountsOut(address(this), amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, "DEX: INSUFFICIENT_OUTPUT_AMOUNT");
        IERC20(path[0]).transferFrom(msg.sender, _pairFor(path[0], path[1]), amounts[0]);
        _swap(path, address(this));
        IWETH(WETH).withdraw(amounts[amounts.length - 1]);
        payable(to).transfer(amounts[amounts.length - 1]);
    }

    // ===== SWAP SUPPORTING FEE-ON-TRANSFER =====
    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external override ensure(deadline) {
        IERC20(path[0]).transferFrom(msg.sender, _pairFor(path[0], path[1]), amountIn);
        _swapSupportingFeeOnTransfer(path, to);
        require(IERC20(path[path.length - 1]).balanceOf(to) >= amountOutMin, "DEX: INSUFFICIENT_OUTPUT_AMOUNT");
    }

    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external override payable ensure(deadline) {
        require(path[0] == WETH, "DEX: INVALID_PATH");
        IWETH(WETH).deposit{value: msg.value}();
        IWETH(WETH).transfer(_pairFor(path[0], path[1]), msg.value);
        _swapSupportingFeeOnTransfer(path, to);
        require(IERC20(path[path.length - 1]).balanceOf(to) >= amountOutMin, "DEX: INSUFFICIENT_OUTPUT_AMOUNT");
    }

    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external override ensure(deadline) {
        require(path[path.length - 1] == WETH, "DEX: INVALID_PATH");
        IERC20(path[0]).transferFrom(msg.sender, _pairFor(path[0], path[1]), amountIn);
        _swapSupportingFeeOnTransfer(path, address(this));
        uint amountETH = IERC20(WETH).balanceOf(address(this));
        require(amountETH >= amountOutMin, "DEX: INSUFFICIENT_OUTPUT_AMOUNT");
        IWETH(WETH).withdraw(amountETH);
        payable(to).transfer(amountETH);
    }

    // ===== INTERNAL SWAP LOGIC =====
    function _swap(address[] memory path, address _to) internal {
        for (uint i; i < path.length - 1; i++) {
            (address input, address output) = (path[i], path[i+1]);
            address pair = _pairFor(input, output);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            (uint reserve0, uint reserve1) = IUniswapV2Pair(pair).getReserves();
            uint amountIn = IERC20(input).balanceOf(pair) - (input == token0 ? reserve0 : reserve1);
            uint amountOut = UniswapV2Library.getAmountOut(amountIn, reserve0, reserve1);
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOut) : (amountOut, uint(0));
            address to = i < path.length - 2 ? _pairFor(output, path[i+2]) : _to;
            IUniswapV2Pair(pair).swap(amount0Out, amount1Out, to, new bytes(0));
        }
    }

    function _swapSupportingFeeOnTransfer(address[] memory path, address _to) internal {
        for (uint i; i < path.length - 1; i++) {
            (address input, address output) = (path[i], path[i+1]);
            address pair = _pairFor(input, output);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            uint reserve0 = IUniswapV2Pair(pair).reserve0();
            uint reserve1 = IUniswapV2Pair(pair).reserve1();
            uint amountInput = IERC20(input).balanceOf(pair) - (input == token0 ? reserve0 : reserve1);
            uint amountOutput = UniswapV2Library.getAmountOut(amountInput, reserve0, reserve1);
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOutput) : (amountOutput, uint(0));
            address to = i < path.length - 2 ? _pairFor(output, path[i+2]) : _to;
            IUniswapV2Pair(pair).swap(amount0Out, amount1Out, to, new bytes(0));
        }
    }
}