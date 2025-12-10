import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/layout/Navbar";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  Users,
  Sparkles,
  Plus,
  X,
  Save,
  Eye,
  Send,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

const PostJob = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [skills, setSkills] = useState<string[]>(["React", "TypeScript"]);
  const [newSkill, setNewSkill] = useState("");
  const [customQuestions, setCustomQuestions] = useState<string[]>([]);
  const [newQuestion, setNewQuestion] = useState("");

  const [jobData, setJobData] = useState({
    title: "",
    department: "",
    location: "",
    jobType: "",
    experienceLevel: "",
    salaryMin: "",
    salaryMax: "",
    description: "",
    responsibilities: "",
    requirements: "",
    benefits: "",
    enableAiInterview: true,
    interviewDuration: "30",
    maxCandidates: "50",
  });

  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleAddQuestion = () => {
    if (newQuestion) {
      setCustomQuestions([...customQuestions, newQuestion]);
      setNewQuestion("");
    }
  };

  const handleRemoveQuestion = (index: number) => {
    setCustomQuestions(customQuestions.filter((_, i) => i !== index));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleSubmit = () => {
    toast.success("Job posted successfully!");
    navigate("/recruiter");
  };

  const steps = [
    { id: 1, title: "Basic Info", icon: Briefcase },
    { id: 2, title: "Details", icon: Users },
    { id: 3, title: "AI Interview", icon: Sparkles },
    { id: 4, title: "Review", icon: Eye },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate("/recruiter")}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </button>
            <h1 className="text-3xl font-display font-bold">Post a New Job</h1>
            <p className="text-muted-foreground">Create a job listing with AI-powered interviews</p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {steps.map((s, index) => (
              <div key={s.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                    step >= s.id
                      ? "bg-accent text-primary-foreground border-accent"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {step > s.id ? <CheckCircle2 className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
                </div>
                <span
                  className={`ml-2 text-sm hidden sm:block ${
                    step >= s.id ? "font-medium" : "text-muted-foreground"
                  }`}
                >
                  {s.title}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={`hidden sm:block w-16 h-0.5 mx-4 ${
                      step > s.id ? "bg-accent" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Basic Info */}
          {step === 1 && (
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Enter the essential details about the position</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title *</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="e.g., Senior Full Stack Developer"
                      value={jobData.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select
                      value={jobData.department}
                      onValueChange={(value) => setJobData({ ...jobData, department: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="hr">Human Resources</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="location"
                        name="location"
                        placeholder="e.g., San Francisco, CA or Remote"
                        className="pl-10"
                        value={jobData.location}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Job Type</Label>
                    <Select
                      value={jobData.jobType}
                      onValueChange={(value) => setJobData({ ...jobData, jobType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Experience Level</Label>
                    <Select
                      value={jobData.experienceLevel}
                      onValueChange={(value) => setJobData({ ...jobData, experienceLevel: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry">Entry Level</SelectItem>
                        <SelectItem value="mid">Mid Level</SelectItem>
                        <SelectItem value="senior">Senior Level</SelectItem>
                        <SelectItem value="lead">Lead / Manager</SelectItem>
                        <SelectItem value="executive">Executive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Salary Range</Label>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          name="salaryMin"
                          placeholder="Min"
                          className="pl-8"
                          value={jobData.salaryMin}
                          onChange={handleInputChange}
                        />
                      </div>
                      <span className="text-muted-foreground">to</span>
                      <div className="relative flex-1">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          name="salaryMax"
                          placeholder="Max"
                          className="pl-8"
                          value={jobData.salaryMax}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-2">
                  <Label>Required Skills</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="px-3 py-1">
                        {skill}
                        <button onClick={() => handleRemoveSkill(skill)} className="ml-2">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a skill"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                    />
                    <Button onClick={handleAddSkill} size="icon">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
                <CardDescription>Provide detailed information about the role</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="description">Job Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe the role, team, and company culture..."
                    rows={5}
                    value={jobData.description}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="responsibilities">Key Responsibilities</Label>
                  <Textarea
                    id="responsibilities"
                    name="responsibilities"
                    placeholder="List the main responsibilities (one per line)..."
                    rows={4}
                    value={jobData.responsibilities}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">Requirements</Label>
                  <Textarea
                    id="requirements"
                    name="requirements"
                    placeholder="List the requirements and qualifications..."
                    rows={4}
                    value={jobData.requirements}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="benefits">Benefits & Perks</Label>
                  <Textarea
                    id="benefits"
                    name="benefits"
                    placeholder="List the benefits you offer..."
                    rows={3}
                    value={jobData.benefits}
                    onChange={handleInputChange}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: AI Interview Settings */}
          {step === 3 && (
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent" />
                  AI Interview Settings
                </CardTitle>
                <CardDescription>Configure the automated interview process</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-accent/5 rounded-lg border border-accent/10">
                  <div>
                    <p className="font-medium">Enable AI Interview</p>
                    <p className="text-sm text-muted-foreground">
                      Automatically conduct initial interviews with candidates
                    </p>
                  </div>
                  <Switch
                    checked={jobData.enableAiInterview}
                    onCheckedChange={(checked) =>
                      setJobData({ ...jobData, enableAiInterview: checked })
                    }
                  />
                </div>

                {jobData.enableAiInterview && (
                  <>
                    <Separator />

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Interview Duration</Label>
                        <Select
                          value={jobData.interviewDuration}
                          onValueChange={(value) =>
                            setJobData({ ...jobData, interviewDuration: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="45">45 minutes</SelectItem>
                            <SelectItem value="60">60 minutes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Max Candidates</Label>
                        <Select
                          value={jobData.maxCandidates}
                          onValueChange={(value) =>
                            setJobData({ ...jobData, maxCandidates: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="25">25 candidates</SelectItem>
                            <SelectItem value="50">50 candidates</SelectItem>
                            <SelectItem value="100">100 candidates</SelectItem>
                            <SelectItem value="unlimited">Unlimited</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Custom Questions */}
                    <div className="space-y-4">
                      <Label>Custom Interview Questions</Label>
                      <p className="text-sm text-muted-foreground">
                        Add specific questions for the AI to ask candidates
                      </p>

                      {customQuestions.length > 0 && (
                        <div className="space-y-2">
                          {customQuestions.map((question, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg"
                            >
                              <span className="w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm">
                                {index + 1}
                              </span>
                              <p className="flex-1 text-sm">{question}</p>
                              <button
                                onClick={() => handleRemoveQuestion(index)}
                                className="text-muted-foreground hover:text-destructive"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter a custom question..."
                          value={newQuestion}
                          onChange={(e) => setNewQuestion(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && handleAddQuestion()}
                        />
                        <Button onClick={handleAddQuestion}>
                          <Plus className="w-4 h-4 mr-2" /> Add
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Review & Publish</CardTitle>
                <CardDescription>Review your job listing before publishing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">Job Title</p>
                    <p className="font-medium">{jobData.title || "Not specified"}</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{jobData.location || "Not specified"}</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">Job Type</p>
                    <p className="font-medium capitalize">{jobData.jobType || "Not specified"}</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">Salary Range</p>
                    <p className="font-medium">
                      {jobData.salaryMin && jobData.salaryMax
                        ? `$${jobData.salaryMin} - $${jobData.salaryMax}`
                        : "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Required Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {jobData.enableAiInterview && (
                  <div className="p-4 bg-accent/5 rounded-lg border border-accent/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-5 h-5 text-accent" />
                      <p className="font-medium">AI Interview Enabled</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {jobData.interviewDuration} minute interview • Max {jobData.maxCandidates} candidates
                      {customQuestions.length > 0 && ` • ${customQuestions.length} custom questions`}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                <ArrowLeft className="w-4 h-4 mr-2" /> Previous
              </Button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <Button onClick={() => setStep(step + 1)}>
                Next <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline">
                  <Save className="w-4 h-4 mr-2" /> Save Draft
                </Button>
                <Button onClick={handleSubmit}>
                  <Send className="w-4 h-4 mr-2" /> Publish Job
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostJob;
