import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Briefcase, 
  ArrowLeft,
  Calendar,
  Clock,
  Video,
  FileText,
  User,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

const CandidateApplyJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [step, setStep] = useState(1);
  const [agreed, setAgreed] = useState(false);

  // Mock data
  const job = {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechFlow Inc.",
    location: "San Francisco, CA",
    logo: "TF"
  };

  const interviewSlots = [
    { id: 1, date: "December 20, 2024", day: "Friday", time: "10:00 AM PST", available: true },
    { id: 2, date: "December 20, 2024", day: "Friday", time: "2:00 PM PST", available: true },
    { id: 3, date: "December 21, 2024", day: "Saturday", time: "11:00 AM PST", available: true },
    { id: 4, date: "December 22, 2024", day: "Sunday", time: "3:00 PM PST", available: false },
    { id: 5, date: "December 23, 2024", day: "Monday", time: "9:00 AM PST", available: true },
    { id: 6, date: "December 23, 2024", day: "Monday", time: "4:00 PM PST", available: true }
  ];

  const profile = {
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    resume: "John_Doe_Resume.pdf",
    skills: ["React", "TypeScript", "Node.js", "Tailwind CSS"]
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/candidate/application-success");
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

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Job Details
        </button>

        {/* Job Summary */}
        <div className="bg-card rounded-2xl border border-border p-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-lg font-display font-bold text-accent">
              {job.logo}
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-foreground">{job.title}</h1>
              <p className="text-muted-foreground">{job.company} • {job.location}</p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                  step >= s
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-muted-foreground"
                )}
              >
                {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
              </div>
              {s < 3 && (
                <div className={cn(
                  "w-12 h-1 rounded-full transition-colors",
                  step > s ? "bg-accent" : "bg-secondary"
                )} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Select Interview Slot */}
        {step === 1 && (
          <div className="bg-card rounded-2xl border border-border p-8 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-xl font-display font-semibold text-foreground">Select Interview Slot</h2>
                <p className="text-sm text-muted-foreground">Choose a convenient time for your AI interview</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {interviewSlots.map((slot) => (
                <button
                  key={slot.id}
                  type="button"
                  disabled={!slot.available}
                  onClick={() => setSelectedSlot(slot.id)}
                  className={cn(
                    "p-4 rounded-xl border-2 text-left transition-all",
                    slot.available
                      ? selectedSlot === slot.id
                        ? "border-accent bg-accent/5"
                        : "border-border hover:border-accent/50"
                      : "border-border bg-secondary/30 opacity-50 cursor-not-allowed"
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{slot.day}</span>
                    {selectedSlot === slot.id && (
                      <CheckCircle2 className="w-5 h-5 text-accent" />
                    )}
                    {!slot.available && (
                      <span className="text-xs text-muted-foreground">Booked</span>
                    )}
                  </div>
                  <p className="text-foreground font-medium">{slot.date}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" />
                    {slot.time}
                  </p>
                </button>
              ))}
            </div>

            <div className="flex justify-end">
              <Button onClick={() => setStep(2)} disabled={!selectedSlot}>
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Review Application */}
        {step === 2 && (
          <div className="bg-card rounded-2xl border border-border p-8 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-xl font-display font-semibold text-foreground">Review Application</h2>
                <p className="text-sm text-muted-foreground">Confirm your details before submitting</p>
              </div>
            </div>

            {/* Profile Summary */}
            <div className="space-y-6 mb-8">
              <div className="p-4 rounded-xl bg-secondary/50">
                <div className="flex items-center gap-3 mb-4">
                  <User className="w-5 h-5 text-accent" />
                  <span className="font-medium text-foreground">Your Profile</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Name</p>
                    <p className="text-foreground font-medium">{profile.name}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Email</p>
                    <p className="text-foreground font-medium">{profile.email}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Phone</p>
                    <p className="text-foreground font-medium">{profile.phone}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Resume</p>
                    <p className="text-foreground font-medium">{profile.resume}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-secondary/50">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-5 h-5 text-accent" />
                  <span className="font-medium text-foreground">Selected Interview Slot</span>
                </div>
                {selectedSlot && (
                  <div className="text-sm">
                    <p className="text-foreground font-medium">
                      {interviewSlots.find(s => s.id === selectedSlot)?.date}
                    </p>
                    <p className="text-muted-foreground">
                      {interviewSlots.find(s => s.id === selectedSlot)?.time}
                    </p>
                  </div>
                )}
              </div>

              <div className="p-4 rounded-xl bg-secondary/50">
                <div className="flex items-center gap-3 mb-4">
                  <Video className="w-5 h-5 text-accent" />
                  <span className="font-medium text-foreground">Interview Details</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                    AI-powered video interview (15-20 minutes)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                    Complete at your selected time slot
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                    Results shared within 24 hours
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={() => setStep(3)}>
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Confirm & Submit */}
        {step === 3 && (
          <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border p-8 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-xl font-display font-semibold text-foreground">Confirm Submission</h2>
                <p className="text-sm text-muted-foreground">Review and submit your application</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-warning/10 border border-warning/20 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-foreground mb-1">Important Notes</p>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• Ensure you have a stable internet connection for the interview</li>
                    <li>• Use a device with a working camera and microphone</li>
                    <li>• Find a quiet, well-lit space for the interview</li>
                    <li>• You can reschedule up to 24 hours before your slot</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 mb-8">
              <input
                type="checkbox"
                id="agree"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 rounded border-input text-accent focus:ring-ring"
              />
              <Label htmlFor="agree" className="text-sm text-muted-foreground cursor-pointer">
                I confirm that all information provided is accurate and I agree to the{" "}
                <Link to="/terms" className="text-accent hover:underline">Terms of Service</Link>
                {" "}and{" "}
                <Link to="/privacy" className="text-accent hover:underline">Privacy Policy</Link>.
              </Label>
            </div>

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button type="submit" disabled={!agreed}>
                Submit Application
              </Button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
};

export default CandidateApplyJob;
