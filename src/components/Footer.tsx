import { Github, Send, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ScrollingBanner from "./ScrollingBanner";

export default function Footer() {
  const { t } = useTranslation();

  const socialLinks = [
    {
      href: "https://github.com",
      icon: Github,
      label: "GitHub"
    },
    {
      href: "https://telegram.org",
      icon: Send,
      label: "Telegram"
    },
    {
      href: "https://twitter.com",
      icon: Twitter,
      label: "X (Twitter)"
    }
  ];

  return (
    <footer className="border-t border-border bg-background">
      <div className="container py-8">
        <ScrollingBanner />
        
        <div className="flex flex-col items-center space-y-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">{t("footer.ceo")}</p>
            <p className="font-bold">Oussama Kerd</p>
          </div>

          <div className="flex items-center space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-muted-foreground">
            <Link to="/about" className="hover:text-primary transition-colors">
              {t("nav.about")} Kardium
            </Link>
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
          </div>

          <div className="text-center text-xs text-muted-foreground">
            <p>&copy; 2024 Kerdium Finance. All rights reserved.</p>
            <p className="mt-1">Built on Monad Testnet</p>
          </div>
        </div>
      </div>
    </footer>
  );
}