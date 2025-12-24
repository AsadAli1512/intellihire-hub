import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Briefcase, 
  ArrowLeft,
  Plus,
  X,
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  FileText
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

const RecruiterPostJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    responsibilities: "",
    requirements: "",
    benefits: "",
    location: "",
    type: "full-time",
    salaryMin: "",
    salaryMax: "",
    experience: "",
    deadline: ""
  });
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [customSkill, setCustomSkill] = useState("");
  const [interviewSlots, setInterviewSlots] = useState<{ date: string; time: string }[]>([
    { date: "", time: "" }
  ]);

  const predefinedSkills = [
    "JavaScript", "TypeScript", "React", "Angular", "Vue.js", "Node.js",
    "Python", "Java", "C++", "C#", ".NET", "PHP",
    "MongoDB", "PostgreSQL", "MySQL", "AWS", "Docker", "Kubernetes"
  ];

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleAddCustomSkill = () => {
    if (customSkill.trim() && !selectedSkills.includes(customSkill.trim())) {
      setSelectedSkills([...selectedSkills, customSkill.trim()]);
      setCustomSkill("");
    }
  };

  const handleAddSlot = () => {
    setInterviewSlots([...interviewSlots, { date: "", time: "" }]);
  };

  const handleRemoveSlot = (index: number) => {
    setInterviewSlots(interviewSlots.filter((_, i) => i !== index));
  };

  const handleSlotChange = (index: number, field: "date" | "time", value: string) => {
    const updated = [...interviewSlots];
    updated[index][field] = value;
    setInterviewSlots(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic here
    navigate("/recruiter/jobs");
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
          Back to Jobs
        </button>

        <div className="mb-8">
          <h1 className="text-2xl font-display font-bold text-foreground mb-2">
            Post a New Job
          </h1>
          <p className="text-muted-foreground">
            Create a job listing to find the perfect candidate
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <h2 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent" />
              Basic Information
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g. Senior Frontend Developer"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Job Description *</Label>
                <textarea
                  id="description"
                  className="w-full min-h-[150px] px-3 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  placeholder="Describe the role and what you're looking for..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="responsibilities">Key Responsibilities</Label>
                <textarea
                  id="responsibilities"
                  className="w-full min-h-[100px] px-3 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  placeholder="List the main responsibilities (one per line)"
                  value={formData.responsibilities}
                  onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements">Requirements</Label>
                <textarea
                  id="requirements"
                  className="w-full min-h-[100px] px-3 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  placeholder="List the requirements (one per line)"
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Job Details */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <h2 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-accent" />
              Job Details
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    placeholder="e.g. San Francisco, CA"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Job Type *</Label>
                  <select
                    id="type"
                    className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                    <option value="remote">Remote</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="salaryMin">Salary Min</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="salaryMin"
                      type="number"
                      placeholder="50000"
                      className="pl-8"
                      value={formData.salaryMin}
                      onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salaryMax">Salary Max</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="salaryMax"
                      type="number"
                      placeholder="80000"
                      className="pl-8"
                      value={formData.salaryMax}
                      onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience</Label>
                  <Input
                    id="experience"
                    placeholder="e.g. 3-5 years"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deadline">Application Deadline</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Required Skills */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <h2 className="text-lg font-display font-semibold text-foreground mb-4">
              Required Skills
            </h2>
            <div className="flex flex-wrap gap-2 mb-4">
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
                  {skill}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add custom skill..."
                value={customSkill}
                onChange={(e) => setCustomSkill(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddCustomSkill())}
              />
              <Button type="button" variant="outline" onClick={handleAddCustomSkill}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {selectedSkills.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedSkills.filter(s => !predefinedSkills.includes(s)).map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => setSelectedSkills(selectedSkills.filter(s => s !== skill))}
                      className="hover:bg-accent-foreground/20 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Interview Slots */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <h2 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-accent" />
              Interview Time Slots
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Add available time slots for AI video interviews
            </p>
            <div className="space-y-3">
              {interviewSlots.map((slot, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    <Input
                      type="date"
                      value={slot.date}
                      onChange={(e) => handleSlotChange(index, "date", e.target.value)}
                      placeholder="Select date"
                    />
                    <Input
                      type="time"
                      value={slot.time}
                      onChange={(e) => handleSlotChange(index, "time", e.target.value)}
                      placeholder="Select time"
                    />
                  </div>
                  {interviewSlots.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveSlot(index)}
                      className="shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              className="mt-4 gap-2"
              onClick={handleAddSlot}
            >
              <Plus className="w-4 h-4" />
              Add Another Slot
            </Button>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={() => navigate(-1)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Post Job
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default RecruiterPostJob;
