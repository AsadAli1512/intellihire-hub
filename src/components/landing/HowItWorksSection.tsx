import { Upload, Calendar, Video, Trophy } from "lucide-react";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Post Jobs & Upload CVs",
    description: "Create job postings with custom requirements. Candidates apply with their resumes which are automatically parsed by AI.",
    forRecruiter: "Post unlimited jobs with detailed requirements",
    forCandidate: "Upload your CV and let AI highlight your strengths",
  },
  {
    icon: Calendar,
    step: "02",
    title: "Schedule Interviews",
    description: "Set available time slots for interviews. Candidates pick what works best for them with automatic confirmations.",
    forRecruiter: "Define interview windows and let candidates choose",
    forCandidate: "Pick interview times that fit your schedule",
  },
  {
    icon: Video,
    step: "03",
    title: "AI-Powered Interview",
    description: "Our AI conducts live video interviews with dynamic questions tailored to each candidate's background and the job requirements.",
    forRecruiter: "AI asks the right questions automatically",
    forCandidate: "Comfortable interview experience with AI assistance",
  },
  {
    icon: Trophy,
    step: "04",
    title: "Get Results & Hire",
    description: "Receive comprehensive reports with scores, transcripts, and rankings. Make informed hiring decisions with data-driven insights.",
    forRecruiter: "Compare candidates with detailed merit lists",
    forCandidate: "Get instant feedback on your performance",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-24 bg-secondary/30 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            How It Works
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
            Simple Process,
            <span className="gradient-text"> Powerful Results</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From job posting to final hiring decision, we streamline every step of the recruitment process.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent/30 to-transparent -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.step} className="relative group">
                {/* Step card */}
                <div className="bg-card rounded-2xl p-6 border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-elegant h-full">
                  {/* Step number & icon */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center shadow-glow">
                        <step.icon className="w-6 h-6 text-accent-foreground" />
                      </div>
                      <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                        {step.step}
                      </span>
                    </div>
                    <h3 className="text-lg font-display font-semibold text-foreground">
                      {step.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mb-4 text-sm">
                    {step.description}
                  </p>

                  {/* For Recruiter/Candidate */}
                  <div className="space-y-2 text-xs">
                    <div className="flex items-start gap-2 p-2 rounded-lg bg-accent/5">
                      <span className="text-accent font-semibold shrink-0">Recruiter:</span>
                      <span className="text-muted-foreground">{step.forRecruiter}</span>
                    </div>
                    <div className="flex items-start gap-2 p-2 rounded-lg bg-info/5">
                      <span className="text-info font-semibold shrink-0">Candidate:</span>
                      <span className="text-muted-foreground">{step.forCandidate}</span>
                    </div>
                  </div>
                </div>

                {/* Arrow connector (visible on lg) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="w-8 h-8 rounded-full bg-background border-2 border-accent flex items-center justify-center">
                      <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
