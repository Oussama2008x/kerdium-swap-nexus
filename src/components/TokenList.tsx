import { Check } from "lucide-react";

const tokens = [
  { name: "MON", address: "Native Token", isNative: true },
  { name: "YAKI", address: "0xfe140e1dce99be9f4f15d657cd9b7bf622270c50" },
  { name: "GMON", address: "0xaeef2f6b429cb59c9b2d7bb2141ada993e8571c3" },
  { name: "SHMON", address: "0x3a98250f98dd388c211206983453837c8365bdc1" },
  { name: "WMON", address: "0x760afe86e5de5fa0ee542fc7b7b713e1c5425701" },
  { name: "USDC", address: "0xf817257fed379853cde0fa4f97ab987181b1e5ea" },
  { name: "USDT", address: "0x88b8e2161dedc77ef4ab7585569d2415a1c1055d" },
  { name: "USDM", address: "0x5d876d73f4441d5f2438b1a3e2a51771b337f27a" },
  { name: "CHOG", address: "0xe0590015a873bf326bd645c3e1266d4db41c4e6b" },
  { name: "DAK", address: "0x0f0bdebf0f83cd1ee3974779bcb7315f9808c714" },
  { name: "MOON", address: "0x4aa50e8208095d9594d18e8e3008abb811125dce" },
  { name: "BEAN", address: "0x268e4e24e0051ec27b3d27a95977e71ce6875a05" },
  { name: "WETH", address: "0xb5a30b0fdc5ea94a52fdc42e3e9760cb8449fb37" },
  { name: "WBTC", address: "0x6bb379a2056d1304e73012b99338f8f581ee2e18" }
];

interface TokenListProps {
  onSelectToken: (token: { name: string; address: string; isNative?: boolean }) => void;
  selectedToken?: { name: string; address: string; isNative?: boolean };
}

export default function TokenList({ onSelectToken, selectedToken }: TokenListProps) {
  return (
    <div className="max-h-80 overflow-y-auto border border-border rounded-lg bg-card">
      {tokens.map((token) => (
        <div
          key={token.name}
          className="flex items-center justify-between p-3 hover:bg-muted cursor-pointer border-b border-border last:border-b-0"
          onClick={() => onSelectToken(token)}
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
              {token.name.slice(0, 2)}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">{token.name}</span>
                <Check className="w-4 h-4 text-verify" />
              </div>
              <span className="text-xs text-muted-foreground">
                {token.isNative ? "Native Token: Monad (MON)" : token.address}
              </span>
            </div>
          </div>
          {selectedToken?.name === token.name && (
            <Check className="w-5 h-5 text-primary" />
          )}
        </div>
      ))}
    </div>
  );
}