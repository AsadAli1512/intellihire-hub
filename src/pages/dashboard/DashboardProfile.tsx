import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Briefcase, 
  LayoutDashboard, 
  Search, 
  FileText, 
  Video, 
  BarChart3, 
  Settings, 
  LogOut,
  Bell,
  Menu,
  Upload,
  X,
  Plus,
  Save,
  Eye,
  Download,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const DashboardProfile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["React", "TypeScript", "Node.js", "Python"]);
  const [customSkill, setCustomSkill] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const sidebarLinks = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Search, label: "Find Jobs", href: "/dashboard/jobs" },
    { icon: FileText, label: "Applications", href: "/dashboard/applications" },
    { icon: Video, label: "Interviews", href: "/dashboard/interviews" },
    { icon: BarChart3, label: "Performance", href: "/dashboard/performance" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ];

  const availableSkills = [
    "JavaScript", "TypeScript", "React", "Vue.js", "Angular", "Node.js", "Python", 
    "Java", "C++", "Go", "Rust", "SQL", "MongoDB", "PostgreSQL", "AWS", "Docker",
    "Kubernetes", "CI/CD", "Agile", "Scrum", "Product Management", "UX Design",
    "UI Design", "Figma", "Adobe XD", "Machine Learning", "Data Science", "TensorFlow"
  ];

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const addCustomSkill = () => {
    if (customSkill && !selectedSkills.includes(customSkill)) {
      setSelectedSkills([...selectedSkills, customSkill]);
      setCustomSkill("");
    }
  };

  const handleSave = () => {
    toast({
      title: "Profile saved",
      description: "Your profile has been updated successfully."
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-16 flex items-center gap-2 px-6 border-b border-sidebar-border">
          <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <Briefcase className="w-4 h-4 text-sidebar-primary-foreground" />
          </div>
          <span className="text-lg font-display font-bold text-sidebar-foreground">
            Job<span className="text-sidebar-primary">Shob</span>
          </span>
        </div>

        <nav className="p-4 space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                location.pathname === link.href
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              )}
            >
              <link.icon className="w-5 h-5" />
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={() => navigate("/login")}
          >
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="lg:ml-64">
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 hover:bg-secondary rounded-lg"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-display font-semibold text-foreground">My Profile</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="gap-2">
              <Eye className="w-4 h-4" />
              Preview
            </Button>
            <button className="relative p-2 hover:bg-secondary rounded-lg">
              <Bell className="w-5 h-5 text-muted-foreground" />
            </button>
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-medium">
              JD
            </div>
          </div>
        </header>

        <main className="p-6">
          {/* Profile Completion */}
          <div className="mb-8 p-4 rounded-2xl bg-accent/10 border border-accent/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Profile Completion</span>
              <span className="text-sm font-bold text-accent">85%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full w-[85%] bg-accent rounded-full" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Add a cover letter to complete your profile</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Resume Upload */}
            <div className="lg:col-span-1 space-y-6">
              {/* Resume Upload */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">Resume / CV</h3>
                <div className="border-2 border-dashed border-border rounded-xl p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-6 h-6 text-accent" />
                  </div>
                  <p className="text-sm font-medium text-foreground mb-1">resume_john_doe.pdf</p>
                  <p className="text-xs text-muted-foreground mb-4">Uploaded Dec 10, 2024</p>
                  <div className="flex gap-2 justify-center">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block">
                    <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border bg-secondary/50 cursor-pointer hover:bg-secondary transition-colors">
                      <Upload className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Upload New Resume (PDF only)</span>
                    </div>
                    <input type="file" accept=".pdf" className="hidden" />
                  </label>
                </div>
              </div>

              {/* Profile Photo */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">Profile Photo</h3>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center text-accent-foreground text-2xl font-bold">
                    JD
                  </div>
                  <div>
                    <Button variant="outline" size="sm" className="gap-1 mb-2">
                      <Upload className="w-4 h-4" />
                      Upload
                    </Button>
                    <p className="text-xs text-muted-foreground">JPG, PNG. Max 2MB</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Skills */}
            <div className="lg:col-span-2 space-y-6">
              {/* Skills Selection */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-display font-semibold text-foreground mb-2">Skills</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Select your skills from the list or add custom skills
                </p>

                {/* Selected Skills */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-foreground mb-3 block">Selected Skills ({selectedSkills.length})</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedSkills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {skill}
                        <button 
                          onClick={() => toggleSkill(skill)}
                          className="ml-1 hover:bg-accent-foreground/20 rounded-full p-0.5"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Add Custom Skill */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-foreground mb-2 block">Add Custom Skill</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter a skill..."
                      value={customSkill}
                      onChange={(e) => setCustomSkill(e.target.value)}
                      className="flex-1 bg-background"
                      onKeyPress={(e) => e.key === 'Enter' && addCustomSkill()}
                    />
                    <Button variant="outline" onClick={addCustomSkill} className="gap-1">
                      <Plus className="w-4 h-4" />
                      Add
                    </Button>
                  </div>
                </div>

                {/* Available Skills */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-3 block">Available Skills</label>
                  <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
                    {availableSkills.filter(s => !selectedSkills.includes(s)).map((skill) => (
                      <button
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className="px-3 py-1.5 rounded-full bg-secondary text-muted-foreground text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Experience Summary */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">Professional Summary</h3>
                <textarea
                  className="w-full h-32 px-4 py-3 rounded-xl border border-border bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Write a brief summary about your experience, achievements, and career goals..."
                  defaultValue="Experienced full-stack developer with 5+ years of expertise in building scalable web applications. Passionate about clean code, user experience, and continuous learning. Led teams of 5-10 engineers and delivered projects for Fortune 500 clients."
                />
              </div>

              {/* Save Button */}
              <div className="flex justify-end gap-4">
                <Button variant="outline">Cancel</Button>
                <Button variant="accent" className="gap-2" onClick={handleSave}>
                  <Save className="w-4 h-4" />
                  Save Profile
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardProfile;