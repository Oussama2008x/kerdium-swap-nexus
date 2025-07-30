import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";
import { lightTheme, darkTheme } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { useTheme } from "./ThemeProvider";

const client = createThirdwebClient({
  clientId: "19c0ffb997d9e0d9ea54ddc15ebaff6f",
});

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("com.okex.wallet"),
  createWallet("walletConnect"),
  createWallet("com.bitget.web3"),
  createWallet("app.phantom"),
];

export default function WalletConnect() {
  const { theme } = useTheme();

  const getTheme = () => {
    if (theme === "dark") {
      return darkTheme({
        colors: {
          borderColor: "hsl(0, 0%, 15%)",
          success: "hsl(142, 77%, 35%)",
          primaryButtonBg: "hsl(142, 77%, 35%)",
        },
      });
    }
    return lightTheme({
      colors: {
        borderColor: "hsl(0, 0%, 89%)",
        success: "hsl(142, 77%, 35%)",
        primaryButtonBg: "hsl(142, 77%, 35%)",
      },
    });
  };

  return (
    <ConnectButton
      client={client}
      connectButton={{ label: "Connect Wallet" }}
      connectModal={{ size: "compact" }}
      theme={getTheme()}
      wallets={wallets}
    />
  );
}