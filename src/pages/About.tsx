import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="container max-w-4xl mx-auto py-8">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-center">
            {t("about.title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed text-justify">
              {t("about.content")}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}