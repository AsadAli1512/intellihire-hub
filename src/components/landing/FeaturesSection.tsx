import { 
  Brain, 
  Video, 
  FileText, 
  BarChart3, 
  Clock, 
  Shield,
  Zap,
  Users
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Questions",
    description: "Dynamic questions generated based on candidate's CV and job requirements. Every interview is personalized and relevant.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Video,
    title: "Live Video Interviews",
    description: "Conduct real-time interviews with LiveKit integration. AI analyzes responses, body language, and communication skills.",
    color: "text-info",
    bgColor: "bg-info/10",
  },
  {
    icon: FileText,
    title: "Smart CV Parsing",
    description: "Automatically extract skills, experience, and qualifications from resumes. No more manual data entry.",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    icon: BarChart3,
    title: "Comprehensive Scoring",
    description: "Multi-dimensional scoring based on technical skills, communication, and cultural fit. Get actionable insights.",
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    icon: Clock,
    title: "Automated Scheduling",
    description: "Let candidates pick interview slots that work for them. Automatic reminders and calendar integration.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Shield,
    title: "Bias-Free Evaluation",
    description: "AI ensures consistent, objective evaluation for every candidate. Make fair hiring decisions.",
    color: "text-info",
    bgColor: "bg-info/10",
  },
  {
    icon: Zap,
    title: "Instant Reports",
    description: "Get detailed PDF reports with transcripts, scores, and recommendations immediately after each interview.",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    icon: Users,
    title: "Merit List Generation",
    description: "Automatically rank candidates based on their performance. Export ready-to-use merit lists.",
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Features
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
            Everything You Need to
            <span className="gradient-text"> Hire Better</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Our AI-powered platform handles the entire interview process, from scheduling to scoring, so you can focus on finding the perfect candidate.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-elegant"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
