import { useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import { getContract, prepareContractCall, readContract } from "thirdweb";
import { DEX_ABI, DEX_CONTRACT_ADDRESS, ERC20_ABI } from "@/lib/dexABI";
import { defineChain } from "thirdweb/chains";
import { createThirdwebClient } from "thirdweb";

const client = createThirdwebClient({
  clientId: "19c0ffb997d9e0d9ea54ddc15ebaff6f",
});

// تعريف شبكة Monad Testnet
const monadTestnet = defineChain({
  id: 10143,
  name: "Monad Testnet",
  nativeCurrency: {
    name: "MON",
    symbol: "MON",
    decimals: 18,
  },
  rpc: "https://10143.rpc.thirdweb.com/w8-dZJvKoRr4IgqwGRvShjA_yTv7T7aXhl2Tcq7wR7ojrctA0i5i7NfLlKpvjBCxGUb4H9dbLZ9mj3WEwpZ1Lg",
  blockExplorers: [
    {
      name: "Monad Testnet Explorer",
      url: "https://monad-testnet.socialscan.io",
    },
  ],
});

export function useSwap() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const account = useActiveAccount();

  const dexContract = getContract({
    client,
    chain: monadTestnet,
    address: DEX_CONTRACT_ADDRESS,
    abi: DEX_ABI,
  });

  // الحصول على سعر التحويل
  const getAmountsOut = async (amountIn: string, path: string[]): Promise<string[]> => {
    try {
      setError(null);
      const amounts = await readContract({
        contract: dexContract,
        method: "getAmountsOut",
        params: [BigInt(amountIn), path],
      });
      return amounts.map((amount: bigint) => amount.toString());
    } catch (err) {
      setError("خطأ في الحصول على السعر");
      console.error("Error getting amounts out:", err);
      return [];
    }
  };

  // تنفيذ المبادلة بين التوكنات
  const swapTokens = async (
    amountIn: string,
    amountOutMin: string,
    path: string[],
    deadline: number = Math.floor(Date.now() / 1000) + 1200 // 20 دقيقة من الآن
  ) => {
    if (!account) {
      setError("يرجى ربط المحفظة أولاً");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // إعداد استدعاء العقد
      const transaction = prepareContractCall({
        contract: dexContract,
        method: "swapExactTokensForTokens",
        params: [
          BigInt(amountIn),
          BigInt(amountOutMin),
          path,
          account.address,
          BigInt(deadline),
        ],
      });

      // تنفيذ المعاملة
      // ملاحظة: ستحتاج إلى إضافة منطق تنفيذ المعاملة هنا
      console.log("Swap transaction prepared:", transaction);
      
    } catch (err) {
      setError("خطأ في تنفيذ المبادلة");
      console.error("Swap error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // الحصول على رصيد التوكن
  const getTokenBalance = async (tokenAddress: string, userAddress: string): Promise<string> => {
    try {
      if (tokenAddress === "Native Token") {
        // للتوكن الأصلي MON، استخدم الرصيد الأصلي
        return "0"; // ستحتاج إلى تنفيذ منطق الحصول على رصيد ETH/MON
      }

      const tokenContract = getContract({
        client,
        chain: monadTestnet,
        address: tokenAddress,
        abi: ERC20_ABI,
      });

      const balance = await readContract({
        contract: tokenContract,
        method: "balanceOf",
        params: [userAddress],
      });
      return balance.toString();
    } catch (err) {
      console.error("Error getting token balance:", err);
      return "0";
    }
  };

  // الموافقة على إنفاق التوكن
  const approveToken = async (tokenAddress: string, amount: string) => {
    if (!account) {
      setError("يرجى ربط المحفظة أولاً");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const tokenContract = getContract({
        client,
        chain: monadTestnet,
        address: tokenAddress,
        abi: ERC20_ABI,
      });

      const transaction = prepareContractCall({
        contract: tokenContract,
        method: "approve",
        params: [DEX_CONTRACT_ADDRESS, BigInt(amount)],
      });

      // تنفيذ الموافقة
      console.log("Approval transaction prepared:", transaction);
      
    } catch (err) {
      setError("خطأ في الموافقة على التوكن");
      console.error("Approval error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    getAmountsOut,
    swapTokens,
    getTokenBalance,
    approveToken,
    dexContract,
  };
}