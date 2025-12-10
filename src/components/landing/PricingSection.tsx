import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Basic",
    price: "$49",
    period: "/month",
    description: "Perfect for small teams starting with AI interviews",
    features: [
      "Up to 5 job postings",
      "50 AI interviews/month",
      "Basic CV parsing",
      "Standard reports",
      "Email support",
      "1 recruiter seat",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Standard",
    price: "$149",
    period: "/month",
    description: "For growing companies with serious hiring needs",
    features: [
      "Up to 25 job postings",
      "200 AI interviews/month",
      "Advanced CV parsing",
      "Detailed PDF reports",
      "Priority support",
      "5 recruiter seats",
      "Custom questions",
      "Interview recordings",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Premium",
    price: "$399",
    period: "/month",
    description: "Enterprise-grade features for large organizations",
    features: [
      "Unlimited job postings",
      "Unlimited AI interviews",
      "Premium CV parsing",
      "White-label reports",
      "24/7 dedicated support",
      "Unlimited seats",
      "API access",
      "Custom integrations",
      "Advanced analytics",
      "SSO & security",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const PricingSection = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Pricing
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
            Simple, Transparent
            <span className="gradient-text"> Pricing</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose the plan that fits your hiring needs. All plans include a 14-day free trial.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative rounded-2xl p-8 transition-all duration-300",
                plan.popular
                  ? "bg-primary text-primary-foreground scale-105 shadow-2xl z-10"
                  : "bg-card border border-border hover:border-accent/50 hover:shadow-elegant"
              )}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 px-4 py-1 rounded-full bg-accent text-accent-foreground text-sm font-medium shadow-glow">
                    <Sparkles className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan info */}
              <div className="mb-8">
                <h3 className={cn(
                  "text-xl font-display font-semibold mb-2",
                  plan.popular ? "text-primary-foreground" : "text-foreground"
                )}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className={cn(
                    "text-4xl font-display font-bold",
                    plan.popular ? "text-primary-foreground" : "text-foreground"
                  )}>
                    {plan.price}
                  </span>
                  <span className={cn(
                    "text-sm",
                    plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"
                  )}>
                    {plan.period}
                  </span>
                </div>
                <p className={cn(
                  "text-sm",
                  plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"
                )}>
                  {plan.description}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={cn(
                      "w-5 h-5 shrink-0 mt-0.5",
                      plan.popular ? "text-accent" : "text-accent"
                    )} />
                    <span className={cn(
                      "text-sm",
                      plan.popular ? "text-primary-foreground/90" : "text-muted-foreground"
                    )}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link to="/signup">
                <Button
                  variant={plan.popular ? "hero" : "outline"}
                  className="w-full"
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
