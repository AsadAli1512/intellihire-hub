import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Check,
  X,
  Sparkles,
  Zap,
  Crown,
  Users,
  Briefcase,
  Video,
  FileText,
  BarChart3,
  Clock,
  Mail,
  Headphones,
  Shield,
} from "lucide-react";
import { toast } from "sonner";

const Subscriptions = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      id: "basic",
      name: "Basic",
      description: "Perfect for small teams getting started",
      monthlyPrice: 49,
      annualPrice: 39,
      icon: Zap,
      popular: false,
      features: [
        { text: "Up to 5 job postings", included: true },
        { text: "25 AI interviews/month", included: true },
        { text: "Basic candidate reports", included: true },
        { text: "Email support", included: true },
        { text: "1 recruiter seat", included: true },
        { text: "Custom interview questions", included: false },
        { text: "Video recording", included: false },
        { text: "Advanced analytics", included: false },
        { text: "API access", included: false },
        { text: "Priority support", included: false },
      ],
    },
    {
      id: "standard",
      name: "Standard",
      description: "Best for growing companies",
      monthlyPrice: 99,
      annualPrice: 79,
      icon: Sparkles,
      popular: true,
      features: [
        { text: "Up to 25 job postings", included: true },
        { text: "100 AI interviews/month", included: true },
        { text: "Detailed candidate reports", included: true },
        { text: "Priority email support", included: true },
        { text: "5 recruiter seats", included: true },
        { text: "Custom interview questions", included: true },
        { text: "Video recording", included: true },
        { text: "Advanced analytics", included: false },
        { text: "API access", included: false },
        { text: "Dedicated support", included: false },
      ],
    },
    {
      id: "premium",
      name: "Premium",
      description: "For enterprises with high volume hiring",
      monthlyPrice: 249,
      annualPrice: 199,
      icon: Crown,
      popular: false,
      features: [
        { text: "Unlimited job postings", included: true },
        { text: "Unlimited AI interviews", included: true },
        { text: "Full candidate reports", included: true },
        { text: "24/7 priority support", included: true },
        { text: "Unlimited recruiter seats", included: true },
        { text: "Custom interview questions", included: true },
        { text: "Video recording & playback", included: true },
        { text: "Advanced analytics & insights", included: true },
        { text: "Full API access", included: true },
        { text: "Dedicated account manager", included: true },
      ],
    },
  ];

  const handleSelectPlan = (planId: string) => {
    toast.success(`Selected ${planId} plan. Redirecting to checkout...`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              <Sparkles className="w-3 h-3 mr-1" /> Pricing Plans
            </Badge>
            <h1 className="text-4xl font-display font-bold mb-4">
              Choose the Perfect Plan for Your Team
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Scale your hiring with AI-powered interviews. All plans include our core features.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4">
              <span className={`text-sm ${!isAnnual ? "font-semibold" : "text-muted-foreground"}`}>
                Monthly
              </span>
              <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
              <span className={`text-sm ${isAnnual ? "font-semibold" : "text-muted-foreground"}`}>
                Annual
              </span>
              {isAnnual && (
                <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20">
                  Save 20%
                </Badge>
              )}
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative border-border/50 ${
                  plan.popular ? "border-accent shadow-lg shadow-accent/10 scale-105" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-accent text-primary-foreground">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                    <plan.icon className="w-6 h-6 text-accent" />
                  </div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold">
                        ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                      </span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    {isAnnual && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Billed annually (${plan.annualPrice * 12}/year)
                      </p>
                    )}
                  </div>

                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => handleSelectPlan(plan.id)}
                  >
                    Get Started
                  </Button>

                  <Separator />

                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        {feature.included ? (
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        ) : (
                          <X className="w-4 h-4 text-muted-foreground/50 flex-shrink-0" />
                        )}
                        <span className={feature.included ? "" : "text-muted-foreground"}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Feature Comparison */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-display font-bold text-center mb-8">
              Everything You Need for Modern Hiring
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Video,
                  title: "AI Video Interviews",
                  description: "Automated interviews that evaluate candidates fairly and consistently",
                },
                {
                  icon: FileText,
                  title: "Smart Resume Parsing",
                  description: "Extract skills and experience automatically from CVs",
                },
                {
                  icon: BarChart3,
                  title: "Performance Analytics",
                  description: "Detailed reports with scoring and improvement suggestions",
                },
                {
                  icon: Users,
                  title: "Merit List Generation",
                  description: "Auto-rank candidates based on interview performance",
                },
                {
                  icon: Clock,
                  title: "Smart Scheduling",
                  description: "Easy interview slot management with conflict prevention",
                },
                {
                  icon: Shield,
                  title: "Bias-Free Evaluation",
                  description: "Consistent AI scoring eliminates unconscious bias",
                },
              ].map((feature, index) => (
                <Card key={index} className="border-border/50">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Enterprise CTA */}
          <div className="max-w-4xl mx-auto mt-16">
            <Card className="border-border/50 bg-gradient-to-br from-primary to-primary/80">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl font-display font-bold text-primary-foreground mb-2">
                      Need a Custom Solution?
                    </h3>
                    <p className="text-primary-foreground/80">
                      Contact us for enterprise pricing, custom integrations, and dedicated support.
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <Button variant="secondary" size="lg">
                      <Mail className="w-4 h-4 mr-2" />
                      Contact Sales
                    </Button>
                    <Button variant="outline" size="lg" className="text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10">
                      <Headphones className="w-4 h-4 mr-2" />
                      Book a Demo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Teaser */}
          <div className="text-center mt-16">
            <p className="text-muted-foreground">
              Have questions?{" "}
              <a href="#" className="text-accent hover:underline font-medium">
                Check our FAQ
              </a>{" "}
              or{" "}
              <a href="#" className="text-accent hover:underline font-medium">
                contact support
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Subscriptions;
