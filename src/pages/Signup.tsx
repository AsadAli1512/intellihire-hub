import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Briefcase, Mail, Lock, User, ArrowRight, Eye, EyeOff, Building2, UserCircle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type UserRole = "candidate" | "recruiter";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<UserRole>("candidate");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate signup - will be replaced with actual auth
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Account created! Please verify your email.");
      navigate("/verify-otp");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shadow-glow">
              <Briefcase className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="text-xl font-display font-bold text-foreground">
              Job<span className="text-accent">Shob</span>
            </span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">
              Create your account
            </h1>
            <p className="text-muted-foreground">
              Join JobShob and start your journey to smarter hiring.
            </p>
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <Label className="mb-3 block">I am a</Label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setRole("candidate")}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200",
                  role === "candidate"
                    ? "border-accent bg-accent/5"
                    : "border-border hover:border-accent/50"
                )}
              >
                <UserCircle className={cn(
                  "w-8 h-8",
                  role === "candidate" ? "text-accent" : "text-muted-foreground"
                )} />
                <span className={cn(
                  "font-medium",
                  role === "candidate" ? "text-accent" : "text-foreground"
                )}>
                  Candidate
                </span>
                <span className="text-xs text-muted-foreground text-center">
                  Looking for jobs
                </span>
              </button>
              <button
                type="button"
                onClick={() => setRole("recruiter")}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200",
                  role === "recruiter"
                    ? "border-accent bg-accent/5"
                    : "border-border hover:border-accent/50"
                )}
              >
                <Building2 className={cn(
                  "w-8 h-8",
                  role === "recruiter" ? "text-accent" : "text-muted-foreground"
                )} />
                <span className={cn(
                  "font-medium",
                  role === "recruiter" ? "text-accent" : "text-foreground"
                )}>
                  Recruiter
                </span>
                <span className="text-xs text-muted-foreground text-center">
                  Hiring talent
                </span>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="pl-10"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Must be at least 8 characters with 1 uppercase and 1 number
              </p>
            </div>

            <Button type="submit" variant="accent" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </form>

          {/* Terms */}
          <p className="text-xs text-muted-foreground text-center mt-4">
            By creating an account, you agree to our{" "}
            <Link to="/terms" className="text-accent hover:underline">Terms of Service</Link>
            {" "}and{" "}
            <Link to="/privacy" className="text-accent hover:underline">Privacy Policy</Link>
          </p>

          {/* Sign in link */}
          <p className="text-center mt-8 text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-accent font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Image/Illustration */}
      <div className="hidden lg:flex flex-1 hero-gradient items-center justify-center p-8">
        <div className="max-w-lg text-center">
          <div className="w-32 h-32 mx-auto mb-8 rounded-3xl bg-accent/20 flex items-center justify-center">
            {role === "candidate" ? (
              <UserCircle className="w-16 h-16 text-accent" />
            ) : (
              <Building2 className="w-16 h-16 text-accent" />
            )}
          </div>
          <h2 className="text-3xl font-display font-bold text-primary-foreground mb-4">
            {role === "candidate" ? "Land Your Dream Job" : "Find Perfect Candidates"}
          </h2>
          <p className="text-primary-foreground/70 text-lg">
            {role === "candidate" 
              ? "Experience fair, AI-powered interviews and get instant feedback on your performance."
              : "Save time with automated interviews that evaluate candidates consistently and objectively."
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
