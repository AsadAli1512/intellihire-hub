import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  User, 
  MapPin, 
  Mail, 
  Phone, 
  Linkedin, 
  Globe, 
  FileText, 
  Edit2,
  Check,
  Download
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

const CandidateProfilePreview = () => {
  const navigate = useNavigate();

  // Mock data - would come from state/API in production
  const profile = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Experienced Full-Stack Developer with 5+ years of expertise in building scalable web applications. Passionate about clean code, user experience, and continuous learning.",
    linkedin: "https://linkedin.com/in/johndoe",
    portfolio: "https://johndoe.dev",
    resumeName: "John_Doe_Resume.pdf",
    skills: [
      "JavaScript", "TypeScript", "React", "Node.js", "Python",
      "PostgreSQL", "MongoDB", "AWS", "Docker", "Git",
      "REST APIs", "GraphQL", "Tailwind CSS"
    ]
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

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Success Banner */}
        <div className="bg-success/10 border border-success/20 rounded-2xl p-6 mb-8 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-success flex items-center justify-center shrink-0">
            <Check className="w-6 h-6 text-success-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-display font-semibold text-foreground">Profile Complete!</h2>
            <p className="text-sm text-muted-foreground">
              Your profile is now ready. You can start applying for jobs or edit your profile anytime.
            </p>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          {/* Banner */}
          <div className="h-32 hero-gradient" />
          
          {/* Profile Header */}
          <div className="px-8 pb-6 relative">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12">
              <div className="w-24 h-24 rounded-2xl bg-accent flex items-center justify-center text-3xl font-display font-bold text-accent-foreground border-4 border-card">
                {profile.firstName[0]}{profile.lastName[0]}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-display font-bold text-foreground">
                  {profile.firstName} {profile.lastName}
                </h1>
                <p className="text-muted-foreground">Full-Stack Developer</p>
              </div>
              <Button variant="outline" size="sm" className="gap-2" onClick={() => navigate("/candidate/profile-setup")}>
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </Button>
            </div>
          </div>

          {/* Profile Content */}
          <div className="px-8 pb-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Bio */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">About</h3>
                  <p className="text-foreground leading-relaxed">{profile.bio}</p>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Resume */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">Resume</h3>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 border border-border">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{profile.resumeName}</p>
                      <p className="text-sm text-muted-foreground">PDF • 245 KB</p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right Column - Contact Info */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">Contact</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <span className="text-foreground">{profile.email}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <span className="text-foreground">{profile.phone}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <span className="text-foreground">{profile.location}</span>
                  </div>
                  
                  {profile.linkedin && (
                    <a 
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm hover:text-accent transition-colors"
                    >
                      <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                        <Linkedin className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <span className="text-foreground">LinkedIn Profile</span>
                    </a>
                  )}
                  
                  {profile.portfolio && (
                    <a 
                      href={profile.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm hover:text-accent transition-colors"
                    >
                      <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                        <Globe className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <span className="text-foreground">Portfolio Website</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/dashboard">
            <Button variant="outline" size="lg">
              Go to Dashboard
            </Button>
          </Link>
          <Link to="/jobs">
            <Button size="lg" className="gap-2">
              Browse Jobs
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default CandidateProfilePreview;
