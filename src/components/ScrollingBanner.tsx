import { useTranslation } from "react-i18next";

export default function ScrollingBanner() {
  const { t } = useTranslation();

  const items = [
    t("footer.monadTestnet"),
    t("footer.kardiumExchange"),
    t("footer.comingSoon"),
  ];

  return (
    <div className="relative overflow-hidden bg-silver/20 border border-silver/30 rounded-full py-2 my-4">
      <div className="flex animate-scroll">
        {[...Array(3)].map((_, setIndex) => (
          <div key={setIndex} className="flex whitespace-nowrap">
            {items.map((item, index) => (
              <span
                key={`${setIndex}-${index}`}
                className={`px-8 text-sm font-bold ${
                  index === 1 ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}