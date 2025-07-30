// ABI للتفاعل مع عقد UniswapV2DEX
export const DEX_ABI = [
  {
    "type": "function",
    "name": "createPair",
    "inputs": [
      {"name": "tokenA", "type": "address"},
      {"name": "tokenB", "type": "address"}
    ],
    "outputs": [{"name": "pair", "type": "address"}],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "getPair",
    "inputs": [
      {"name": "tokenA", "type": "address"},
      {"name": "tokenB", "type": "address"}
    ],
    "outputs": [{"name": "pair", "type": "address"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "swapExactTokensForTokens",
    "inputs": [
      {"name": "amountIn", "type": "uint256"},
      {"name": "amountOutMin", "type": "uint256"},
      {"name": "path", "type": "address[]"},
      {"name": "to", "type": "address"},
      {"name": "deadline", "type": "uint256"}
    ],
    "outputs": [{"name": "amounts", "type": "uint256[]"}],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "getAmountsOut",
    "inputs": [
      {"name": "amountIn", "type": "uint256"},
      {"name": "path", "type": "address[]"}
    ],
    "outputs": [{"name": "amounts", "type": "uint256[]"}],
    "stateMutability": "view"
  }
] as const;

// عنوان العقد على شبكة Monad Testnet
export const DEX_CONTRACT_ADDRESS = "0xcC50EAb18CB032a0AC5788327ef9c152ac03dba9";

// ABI للتوكن ERC20
export const ERC20_ABI = [
  {
    "type": "function",
    "name": "balanceOf",
    "inputs": [{"name": "owner", "type": "address"}],
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "approve",
    "inputs": [
      {"name": "spender", "type": "address"},
      {"name": "value", "type": "uint256"}
    ],
    "outputs": [{"name": "", "type": "bool"}],
    "stateMutability": "nonpayable"
  }
] as const;