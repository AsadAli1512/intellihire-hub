import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  CheckCircle2,
  Calendar,
  Clock,
  Video,
  Mail,
  ArrowRight,
  Home
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const CandidateApplicationSuccess = () => {
  // Mock data
  const application = {
    job: "Senior Frontend Developer",
    company: "TechFlow Inc.",
    interviewDate: "December 20, 2024",
    interviewTime: "10:00 AM PST",
    confirmationId: "APP-2024-78934"
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

      <main className="container mx-auto px-4 py-12 max-w-2xl">
        {/* Success Animation */}
        <div className="text-center mb-8 animate-scale-in">
          <div className="w-24 h-24 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
            <div className="w-16 h-16 rounded-full bg-success flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-success-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground mb-3">
            Application Submitted!
          </h1>
          <p className="text-muted-foreground text-lg">
            Your application has been successfully submitted
          </p>
        </div>

        {/* Confirmation Card */}
        <div className="bg-card rounded-2xl border border-border p-8 mb-8 animate-slide-up">
          <div className="text-center mb-6 pb-6 border-b border-border">
            <p className="text-sm text-muted-foreground mb-1">Confirmation Number</p>
            <p className="text-2xl font-display font-bold text-accent">{application.confirmationId}</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <Briefcase className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Position</p>
                <p className="font-medium text-foreground">{application.job}</p>
                <p className="text-sm text-muted-foreground">{application.company}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <Calendar className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Interview Date</p>
                <p className="font-medium text-foreground">{application.interviewDate}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Interview Time</p>
                <p className="font-medium text-foreground">{application.interviewTime}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <Video className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Interview Type</p>
                <p className="font-medium text-foreground">AI Video Interview</p>
              </div>
            </div>
          </div>
        </div>

        {/* Email Notification */}
        <div className="bg-info/10 border border-info/20 rounded-2xl p-6 mb-8 flex items-start gap-4">
          <Mail className="w-6 h-6 text-info shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-foreground mb-1">Confirmation Email Sent</p>
            <p className="text-sm text-muted-foreground">
              We've sent a confirmation email with all the details and a calendar invite.
              Please check your inbox.
            </p>
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-card rounded-2xl border border-border p-6 mb-8">
          <h2 className="font-display font-semibold text-foreground mb-4">What's Next?</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-medium text-accent">1</span>
              </div>
              <div>
                <p className="font-medium text-foreground">Prepare for your interview</p>
                <p className="text-sm text-muted-foreground">
                  Review the job requirements and prepare your responses
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-medium text-accent">2</span>
              </div>
              <div>
                <p className="font-medium text-foreground">Join at your scheduled time</p>
                <p className="text-sm text-muted-foreground">
                  Click the interview link 5 minutes before your slot
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-medium text-accent">3</span>
              </div>
              <div>
                <p className="font-medium text-foreground">Complete the AI interview</p>
                <p className="text-sm text-muted-foreground">
                  Answer the questions and showcase your skills
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-medium text-accent">4</span>
              </div>
              <div>
                <p className="font-medium text-foreground">Receive feedback</p>
                <p className="text-sm text-muted-foreground">
                  Get AI-generated performance feedback within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/dashboard">
            <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
              <Home className="w-4 h-4" />
              Go to Dashboard
            </Button>
          </Link>
          <Link to="/jobs">
            <Button size="lg" className="w-full sm:w-auto gap-2">
              Browse More Jobs
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default CandidateApplicationSuccess;
