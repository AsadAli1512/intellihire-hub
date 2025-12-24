import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  ArrowLeft,
  Check,
  Crown,
  Zap,
  Building2,
  Video,
  Users,
  BarChart3,
  Star
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

const RecruiterSubscriptions = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [currentPlan, setCurrentPlan] = useState("basic");

  const plans = [
    {
      id: "basic",
      name: "Basic",
      icon: Building2,
      description: "Perfect for small businesses",
      monthlyPrice: 49,
      annualPrice: 470,
      features: [
        "5 job postings per month",
        "10 AI interviews per month",
        "Basic candidate analytics",
        "Email support",
        "Standard job visibility"
      ],
      popular: false
    },
    {
      id: "advanced",
      name: "Advanced",
      icon: Zap,
      description: "For growing companies",
      monthlyPrice: 99,
      annualPrice: 950,
      features: [
        "25 job postings per month",
        "50 AI interviews per month",
        "Advanced analytics & reports",
        "Priority email support",
        "Featured job listings",
        "Candidate comparison tools",
        "Custom interview questions"
      ],
      popular: true
    },
    {
      id: "premium",
      name: "Premium",
      icon: Crown,
      description: "Enterprise-grade features",
      monthlyPrice: 199,
      annualPrice: 1910,
      features: [
        "Unlimited job postings",
        "Unlimited AI interviews",
        "Custom AI interview models",
        "24/7 priority support",
        "Premium job placement",
        "API access",
        "Dedicated account manager",
        "Custom branding",
        "Team collaboration tools"
      ],
      popular: false
    }
  ];

  const getPrice = (plan: typeof plans[0]) => {
    return billingCycle === "monthly" ? plan.monthlyPrice : Math.round(plan.annualPrice / 12);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="text-xl font-display font-bold text-foreground">
              Job<span className="text-accent">Shob</span>
            </span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        <div className="text-center mb-12">
          <h1 className="text-3xl font-display font-bold text-foreground mb-3">
            Choose Your Plan
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Scale your hiring with AI-powered interviews. Choose the plan that fits your needs.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-3 p-1 rounded-xl bg-secondary">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                billingCycle === "monthly"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                billingCycle === "annual"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Annual
              <span className="ml-2 px-2 py-0.5 rounded-full bg-success/10 text-success text-xs">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "bg-card rounded-2xl border p-6 relative",
                plan.popular
                  ? "border-accent shadow-lg scale-105"
                  : "border-border",
                currentPlan === plan.id && "ring-2 ring-accent"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <div className={cn(
                  "w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4",
                  plan.popular ? "bg-accent/10" : "bg-secondary"
                )}>
                  <plan.icon className={cn(
                    "w-7 h-7",
                    plan.popular ? "text-accent" : "text-muted-foreground"
                  )} />
                </div>
                <h3 className="text-xl font-display font-bold text-foreground">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="text-center mb-6">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-display font-bold text-foreground">
                    ${getPrice(plan)}
                  </span>
                  <span className="text-muted-foreground">/mo</span>
                </div>
                {billingCycle === "annual" && (
                  <p className="text-sm text-muted-foreground mt-1">
                    ${plan.annualPrice} billed annually
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={cn(
                  "w-full",
                  plan.popular ? "" : "bg-secondary hover:bg-secondary/80 text-foreground"
                )}
                variant={plan.popular ? "default" : "outline"}
                disabled={currentPlan === plan.id}
              >
                {currentPlan === plan.id ? "Current Plan" : "Choose Plan"}
              </Button>
            </div>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-display font-bold text-foreground text-center mb-8">
            Compare Features
          </h2>
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="text-left p-4 font-medium text-foreground">Feature</th>
                  <th className="text-center p-4 font-medium text-foreground">Basic</th>
                  <th className="text-center p-4 font-medium text-foreground">Advanced</th>
                  <th className="text-center p-4 font-medium text-foreground">Premium</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="p-4 text-muted-foreground flex items-center gap-2">
                    <Video className="w-4 h-4" /> AI Interviews
                  </td>
                  <td className="p-4 text-center text-foreground">10/mo</td>
                  <td className="p-4 text-center text-foreground">50/mo</td>
                  <td className="p-4 text-center text-foreground">Unlimited</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 text-muted-foreground flex items-center gap-2">
                    <Briefcase className="w-4 h-4" /> Job Postings
                  </td>
                  <td className="p-4 text-center text-foreground">5/mo</td>
                  <td className="p-4 text-center text-foreground">25/mo</td>
                  <td className="p-4 text-center text-foreground">Unlimited</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 text-muted-foreground flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" /> Analytics
                  </td>
                  <td className="p-4 text-center text-foreground">Basic</td>
                  <td className="p-4 text-center text-foreground">Advanced</td>
                  <td className="p-4 text-center text-foreground">Custom</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 text-muted-foreground flex items-center gap-2">
                    <Users className="w-4 h-4" /> Team Members
                  </td>
                  <td className="p-4 text-center text-foreground">1</td>
                  <td className="p-4 text-center text-foreground">5</td>
                  <td className="p-4 text-center text-foreground">Unlimited</td>
                </tr>
                <tr>
                  <td className="p-4 text-muted-foreground">API Access</td>
                  <td className="p-4 text-center">—</td>
                  <td className="p-4 text-center">—</td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-accent mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-2xl mx-auto text-center">
          <h2 className="text-xl font-display font-semibold text-foreground mb-4">
            Have questions?
          </h2>
          <p className="text-muted-foreground mb-4">
            Contact our sales team for custom enterprise plans or any questions about our pricing.
          </p>
          <Button variant="outline">
            Contact Sales
          </Button>
        </div>
      </main>
    </div>
  );
};

export default RecruiterSubscriptions;
