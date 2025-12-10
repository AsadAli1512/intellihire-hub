import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Sparkles,
  Target,
  Users,
  Globe,
  Award,
  Heart,
  Lightbulb,
  Shield,
  Rocket,
  ArrowRight,
  Building2,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const stats = [
    { value: "50K+", label: "Candidates Interviewed" },
    { value: "2K+", label: "Companies Trust Us" },
    { value: "95%", label: "Hiring Success Rate" },
    { value: "40%", label: "Time Saved on Hiring" },
  ];

  const values = [
    {
      icon: Heart,
      title: "People First",
      description: "We believe in fair, unbiased evaluation that gives every candidate an equal opportunity to showcase their skills.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We constantly push the boundaries of what's possible with AI to create better hiring experiences.",
    },
    {
      icon: Shield,
      title: "Trust & Transparency",
      description: "We're committed to ethical AI practices and transparent evaluation processes.",
    },
    {
      icon: Rocket,
      title: "Excellence",
      description: "We strive for excellence in everything we do, from our technology to our customer service.",
    },
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      bio: "Former HR Director at Google with 15 years of recruitment experience.",
      avatar: "https://ui-avatars.com/api/?name=Sarah+Chen&background=0d9488&color=fff&size=128",
    },
    {
      name: "Michael Rodriguez",
      role: "CTO & Co-Founder",
      bio: "Ex-Meta AI researcher specializing in natural language processing.",
      avatar: "https://ui-avatars.com/api/?name=Michael+Rodriguez&background=6366f1&color=fff&size=128",
    },
    {
      name: "Emily Watson",
      role: "Chief Product Officer",
      bio: "Product leader from Linkedin with expertise in talent solutions.",
      avatar: "https://ui-avatars.com/api/?name=Emily+Watson&background=ec4899&color=fff&size=128",
    },
    {
      name: "David Kim",
      role: "VP of Engineering",
      bio: "Built scalable systems at Amazon handling millions of users.",
      avatar: "https://ui-avatars.com/api/?name=David+Kim&background=f59e0b&color=fff&size=128",
    },
  ];

  const milestones = [
    { year: "2021", event: "Founded with a mission to revolutionize hiring" },
    { year: "2022", event: "Launched AI interview platform, 100 companies onboarded" },
    { year: "2023", event: "Reached 10,000 AI interviews conducted" },
    { year: "2024", event: "Expanded globally, 50,000+ candidates interviewed" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 hero-gradient opacity-50" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
                <Sparkles className="w-3 h-3 mr-1" /> About JobShob
              </Badge>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Transforming How the World Hires
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                We're on a mission to make hiring faster, fairer, and more effective through the power of AI. 
                Our platform helps companies find the best talent while giving every candidate a fair chance to shine.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/jobs">
                  <Button size="lg">
                    View Open Jobs <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-4xl font-display font-bold text-accent mb-2">{stat.value}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <Badge className="mb-4" variant="secondary">
                  <Target className="w-3 h-3 mr-1" /> Our Mission
                </Badge>
                <h2 className="text-3xl font-display font-bold mb-6">
                  Democratizing Access to Fair Hiring Practices
                </h2>
                <p className="text-muted-foreground mb-6">
                  Traditional hiring processes are often biased, time-consuming, and inconsistent. 
                  We founded JobShob to change that. Our AI-powered platform ensures every candidate 
                  gets a fair evaluation based on their skills and potential, not their background or connections.
                </p>
                <ul className="space-y-3">
                  {[
                    "Eliminate unconscious bias in initial screening",
                    "Reduce time-to-hire by 40%",
                    "Provide candidates with constructive feedback",
                    "Help companies find diverse, qualified talent",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-accent/20 to-accent/5 rounded-3xl flex items-center justify-center">
                  <div className="w-32 h-32 bg-accent/10 rounded-full flex items-center justify-center">
                    <Sparkles className="w-16 h-16 text-accent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold mb-4">Our Core Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {values.map((value, index) => (
                <Card key={index} className="border-border/50 text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="mb-4" variant="secondary">
                <Users className="w-3 h-3 mr-1" /> Our Team
              </Badge>
              <h2 className="text-3xl font-display font-bold mb-4">Meet the Leaders</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A diverse team of experts from top companies, united by a passion for fair hiring
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {team.map((member, index) => (
                <Card key={index} className="border-border/50 text-center">
                  <CardContent className="p-6">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4"
                    />
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-accent mb-2">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="mb-4" variant="secondary">
                <Award className="w-3 h-3 mr-1" /> Our Journey
              </Badge>
              <h2 className="text-3xl font-display font-bold mb-4">Milestones</h2>
            </div>
            <div className="max-w-3xl mx-auto">
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-accent text-primary-foreground rounded-full flex items-center justify-center font-bold">
                        {milestone.year.slice(-2)}
                      </div>
                      {index < milestones.length - 1 && (
                        <div className="w-0.5 h-full bg-border mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <p className="text-sm text-accent font-medium">{milestone.year}</p>
                      <p className="text-lg font-medium">{milestone.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <Card className="max-w-4xl mx-auto border-border/50 bg-gradient-to-br from-primary to-primary/80">
              <CardContent className="p-8 md:p-12 text-center">
                <Globe className="w-12 h-12 text-accent mx-auto mb-6" />
                <h2 className="text-3xl font-display font-bold text-primary-foreground mb-4">
                  Join the Future of Hiring
                </h2>
                <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                  Whether you're a company looking to streamline your hiring or a candidate ready to showcase your skills, 
                  we're here to help.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link to="/signup">
                    <Button variant="secondary" size="lg">
                      <Building2 className="w-4 h-4 mr-2" />
                      For Recruiters
                    </Button>
                  </Link>
                  <Link to="/jobs">
                    <Button variant="outline" size="lg" className="text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10">
                      <Users className="w-4 h-4 mr-2" />
                      For Candidates
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
