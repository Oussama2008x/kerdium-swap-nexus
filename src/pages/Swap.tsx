import { useState } from "react";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import TokenList from "@/components/TokenList";

export default function Swap() {
  const { t } = useTranslation();
  const [fromToken, setFromToken] = useState<{name: string; address: string; isNative?: boolean} | null>(null);
  const [toToken, setToToken] = useState<{name: string; address: string; isNative?: boolean} | null>(null);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount] = useState("0.00");
  const [isFromOpen, setIsFromOpen] = useState(false);
  const [isToOpen, setIsToOpen] = useState(false);

  const handleMaxClick = () => {
    // Simulate max balance - in real app, this would get actual wallet balance
    setFromAmount("1000.00");
  };

  const handleSwapDirection = () => {
    const tempToken = fromToken;
    setFromToken(toToken);
    setToToken(tempToken);
  };

  return (
    <div className="container max-w-md mx-auto py-8">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {t("swap.title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* From Token */}
          <div className="space-y-2">
            <label className="text-sm font-medium">{t("swap.from")}</label>
            <div className="relative">
              <Input
                type="number"
                placeholder="0.00"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                className="pr-24 text-right text-lg"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs"
                onClick={handleMaxClick}
              >
                {t("swap.max")}
              </Button>
            </div>
            
            <Popover open={isFromOpen} onOpenChange={setIsFromOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between border-primary/20 hover:border-primary/40"
                >
                  <div className="flex items-center space-x-2">
                    {fromToken ? (
                      <>
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                          {fromToken.name.slice(0, 2)}
                        </div>
                        <span>{fromToken.name}</span>
                      </>
                    ) : (
                      <span>{t("swap.selectToken")}</span>
                    )}
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0">
                <TokenList
                  onSelectToken={(token) => {
                    setFromToken(token);
                    setIsFromOpen(false);
                  }}
                  selectedToken={fromToken}
                />
              </PopoverContent>
            </Popover>

            {fromToken && (
              <div className="text-xs text-muted-foreground">
                <p>{t("swap.address")}: {fromToken.isNative ? t("swap.nativeToken") : fromToken.address}</p>
              </div>
            )}
          </div>

          {/* Swap Direction Button */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-primary/20 hover:border-primary/40"
              onClick={handleSwapDirection}
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>

          {/* To Token */}
          <div className="space-y-2">
            <label className="text-sm font-medium">{t("swap.to")}</label>
            <div className="relative">
              <Input
                type="text"
                placeholder="0.00"
                value={toAmount}
                readOnly
                className="text-right text-lg bg-muted"
              />
            </div>
            
            <Popover open={isToOpen} onOpenChange={setIsToOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between border-primary/20 hover:border-primary/40"
                >
                  <div className="flex items-center space-x-2">
                    {toToken ? (
                      <>
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                          {toToken.name.slice(0, 2)}
                        </div>
                        <span>{toToken.name}</span>
                      </>
                    ) : (
                      <span>{t("swap.selectToken")}</span>
                    )}
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0">
                <TokenList
                  onSelectToken={(token) => {
                    setToToken(token);
                    setIsToOpen(false);
                  }}
                  selectedToken={toToken}
                />
              </PopoverContent>
            </Popover>

            {toToken && (
              <div className="text-xs text-muted-foreground">
                <p>{t("swap.address")}: {toToken.isNative ? t("swap.nativeToken") : toToken.address}</p>
              </div>
            )}
          </div>

          {/* Swap Button */}
          <Button 
            className="w-full mt-6 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold py-3"
            disabled={!fromToken || !toToken || !fromAmount}
          >
            {!fromToken || !toToken ? t("swap.selectToken") : t("swap.title")}
          </Button>

          {/* Contract Address Info */}
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground">
              Swap Contract: 0xcC50EAb18CB032a0AC5788327ef9c152ac03dba9
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}