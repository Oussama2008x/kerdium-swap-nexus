import { createThirdwebClient } from "thirdweb";
import { ThirdwebProvider } from "thirdweb/react";

const client = createThirdwebClient({
  clientId: "19c0ffb997d9e0d9ea54ddc15ebaff6f",
});

export default function CustomThirdwebProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThirdwebProvider>
      {children}
    </ThirdwebProvider>
  );
}