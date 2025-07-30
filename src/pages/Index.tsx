import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Shield, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: TrendingUp,
      title: "Advanced Trading",
      description: "Trade with confidence using our advanced swap technology and real-time pricing."
    },
    {
      icon: Shield,
      title: "Secure & Verified",
      description: "All tokens are verified and secured with audited smart contracts."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Execute swaps instantly on the Monad testnet with minimal fees."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-20">
        <div className="container text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Kerdium Finance
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            The next generation DeFi platform built on Monad testnet. 
            Experience seamless trading with advanced features and unmatched security.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold px-8"
            >
              <Link to="/swap">
                Start Trading <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Kerdium Finance?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built with cutting-edge technology to provide the best DeFi experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-primary/20 hover:border-primary/40 transition-colors">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Network Info Section */}
      <section className="py-20">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Built on Monad Testnet
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="p-6 rounded-lg bg-card border border-primary/20">
              <h3 className="font-semibold mb-2">Chain ID</h3>
              <p className="text-muted-foreground">10143</p>
            </div>
            <div className="p-6 rounded-lg bg-card border border-primary/20">
              <h3 className="font-semibold mb-2">Native Token</h3>
              <p className="text-muted-foreground">MON</p>
            </div>
            <div className="p-6 rounded-lg bg-card border border-primary/20">
              <h3 className="font-semibold mb-2">Network</h3>
              <p className="text-muted-foreground">Monad Testnet</p>
            </div>
            <div className="p-6 rounded-lg bg-card border border-primary/20">
              <h3 className="font-semibold mb-2">Status</h3>
              <p className="text-success font-semibold">Live</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
