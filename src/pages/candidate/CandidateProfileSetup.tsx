import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Briefcase, Upload, X, Check, Plus, User, FileText, Sparkles } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

const CandidateProfileSetup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [customSkill, setCustomSkill] = useState("");
  const [customSkills, setCustomSkills] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    location: "",
    bio: "",
    experience: "",
    education: "",
    linkedin: "",
    portfolio: ""
  });

  const predefinedSkills = [
    "JavaScript", "TypeScript", "React", "Angular", "Vue.js", "Node.js",
    "Python", "Java", "C++", "C#", ".NET", "PHP",
    "HTML/CSS", "Tailwind CSS", "Bootstrap", "SASS",
    "MongoDB", "PostgreSQL", "MySQL", "Redis",
    "AWS", "Azure", "Google Cloud", "Docker", "Kubernetes",
    "Git", "CI/CD", "REST APIs", "GraphQL",
    "Machine Learning", "Data Science", "AI/ML",
    "Project Management", "Agile", "Scrum",
    "UI/UX Design", "Figma", "Adobe XD",
    "Communication", "Leadership", "Problem Solving"
  ];

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleAddCustomSkill = () => {
    if (customSkill.trim() && !customSkills.includes(customSkill.trim()) && !predefinedSkills.includes(customSkill.trim())) {
      setCustomSkills([...customSkills, customSkill.trim()]);
      setSelectedSkills([...selectedSkills, customSkill.trim()]);
      setCustomSkill("");
    }
  };

  const handleRemoveCustomSkill = (skill: string) => {
    setCustomSkills(customSkills.filter(s => s !== skill));
    setSelectedSkills(selectedSkills.filter(s => s !== skill));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setResumeFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/candidate/profile-preview");
  };

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

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
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-display font-bold text-foreground">Complete Your Profile</h1>
            <span className="text-sm text-muted-foreground">Step {step} of {totalSteps}</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="bg-card rounded-2xl border border-border p-8 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <User className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-xl font-display font-semibold text-foreground">Personal Information</h2>
                <p className="text-sm text-muted-foreground">Tell us about yourself</p>
              </div>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="San Francisco, CA"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Professional Bio</Label>
                <textarea
                  id="bio"
                  className="w-full min-h-[100px] px-3 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  placeholder="Brief description about your professional background..."
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn Profile</Label>
                  <Input
                    id="linkedin"
                    placeholder="https://linkedin.com/in/johndoe"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="portfolio">Portfolio URL</Label>
                  <Input
                    id="portfolio"
                    placeholder="https://johndoe.com"
                    value={formData.portfolio}
                    onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="button" onClick={() => setStep(2)}>
                  Continue
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Step 2: Skills Selection */}
        {step === 2 && (
          <div className="bg-card rounded-2xl border border-border p-8 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-xl font-display font-semibold text-foreground">Select Your Skills</h2>
                <p className="text-sm text-muted-foreground">Choose skills that match your expertise</p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-4">
                Selected: <span className="font-medium text-accent">{selectedSkills.length} skills</span>
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {predefinedSkills.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleSkillToggle(skill)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm font-medium transition-all",
                      selectedSkills.includes(skill)
                        ? "bg-accent text-accent-foreground"
                        : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                    )}
                  >
                    {selectedSkills.includes(skill) && <Check className="w-3 h-3 inline mr-1" />}
                    {skill}
                  </button>
                ))}
              </div>

              {/* Custom Skills */}
              <div className="border-t border-border pt-6">
                <Label className="mb-3 block">Add Custom Skills</Label>
                <div className="flex gap-2 mb-4">
                  <Input
                    placeholder="Enter a skill..."
                    value={customSkill}
                    onChange={(e) => setCustomSkill(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddCustomSkill())}
                  />
                  <Button type="button" onClick={handleAddCustomSkill} variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                
                {customSkills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {customSkills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleRemoveCustomSkill(skill)}
                          className="hover:bg-accent-foreground/20 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button type="button" onClick={() => setStep(3)} disabled={selectedSkills.length === 0}>
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Resume Upload */}
        {step === 3 && (
          <div className="bg-card rounded-2xl border border-border p-8 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-xl font-display font-semibold text-foreground">Upload Your Resume</h2>
                <p className="text-sm text-muted-foreground">Add your resume to complete your profile</p>
              </div>
            </div>

            <div className="mb-8">
              <label
                htmlFor="resume"
                className={cn(
                  "flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-2xl cursor-pointer transition-colors",
                  resumeFile
                    ? "border-accent bg-accent/5"
                    : "border-border hover:border-accent/50 hover:bg-secondary/50"
                )}
              >
                {resumeFile ? (
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                      <FileText className="w-8 h-8 text-accent" />
                    </div>
                    <p className="font-medium text-foreground">{resumeFile.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="mt-2 text-accent"
                      onClick={(e) => {
                        e.preventDefault();
                        setResumeFile(null);
                      }}
                    >
                      Remove & Upload Different
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center mb-4">
                      <Upload className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-foreground font-medium">Drop your resume here</p>
                    <p className="text-sm text-muted-foreground mt-1">or click to browse (PDF only)</p>
                  </div>
                )}
                <input
                  id="resume"
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button onClick={handleSubmit} disabled={!resumeFile}>
                Complete Profile
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CandidateProfileSetup;
