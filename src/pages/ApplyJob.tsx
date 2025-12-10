import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/layout/Navbar";
import {
  ArrowLeft,
  ArrowRight,
  Upload,
  FileText,
  CheckCircle2,
  Briefcase,
  User,
  FileUp,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { toast } from "sonner";

const ApplyJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    portfolio: "",
    coverLetter: "",
    expectedSalary: "",
    noticePeriod: "",
    yearsOfExperience: "",
  });

  const steps = [
    { id: 1, title: "Personal Info", icon: User },
    { id: 2, title: "Resume", icon: FileUp },
    { id: 3, title: "Additional Details", icon: Briefcase },
    { id: 4, title: "Review", icon: Send },
  ];

  const progress = (step / steps.length) * 100;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        toast.error("Please upload a PDF file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }
      setCvFile(file);
      toast.success("Resume uploaded successfully");
    }
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.fullName || !formData.email || !formData.phone) {
        toast.error("Please fill in all required fields");
        return;
      }
    }
    if (step === 2 && !cvFile) {
      toast.error("Please upload your resume");
      return;
    }
    setStep(step + 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    toast.success("Application submitted successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Back Link */}
          <Link
            to={`/jobs/${id}`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Job
          </Link>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold mb-2">Apply for Position</h1>
            <p className="text-muted-foreground">Senior Full Stack Developer at TechCorp Inc.</p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((s, index) => (
                <div key={s.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                      step >= s.id
                        ? "bg-accent text-primary-foreground border-accent"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    {step > s.id ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <s.icon className="w-5 h-5" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`hidden sm:block w-24 h-0.5 mx-2 ${
                        step > s.id ? "bg-accent" : "bg-border"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Form Steps */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>{steps[step - 1].title}</CardTitle>
              <CardDescription>
                {step === 1 && "Tell us about yourself"}
                {step === 2 && "Upload your resume for AI-powered parsing"}
                {step === 3 && "A few more details to complete your application"}
                {step === 4 && "Review your application before submitting"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Step 1: Personal Info */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn Profile</Label>
                      <Input
                        id="linkedin"
                        name="linkedin"
                        placeholder="linkedin.com/in/username"
                        value={formData.linkedin}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="portfolio">Portfolio/Website</Label>
                    <Input
                      id="portfolio"
                      name="portfolio"
                      placeholder="https://yourportfolio.com"
                      value={formData.portfolio}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Resume Upload */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    {cvFile ? (
                      <div className="space-y-4">
                        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                          <FileText className="w-8 h-8 text-green-500" />
                        </div>
                        <div>
                          <p className="font-medium">{cvFile.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(cvFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => setCvFile(null)}
                          className="text-destructive"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                          <Upload className="w-8 h-8 text-accent" />
                        </div>
                        <div>
                          <p className="font-medium">Upload your resume</p>
                          <p className="text-sm text-muted-foreground">
                            PDF format, max 5MB
                          </p>
                        </div>
                        <label htmlFor="cv-upload">
                          <Button variant="outline" className="cursor-pointer" asChild>
                            <span>
                              <FileUp className="w-4 h-4 mr-2" />
                              Choose File
                            </span>
                          </Button>
                          <input
                            id="cv-upload"
                            type="file"
                            accept=".pdf"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-accent/5 rounded-lg border border-accent/10">
                    <Sparkles className="w-6 h-6 text-accent flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">AI-Powered Resume Parsing</p>
                      <p className="text-sm text-muted-foreground">
                        We'll automatically extract your skills and experience to match you with the best opportunities.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Additional Details */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                      <Input
                        id="yearsOfExperience"
                        name="yearsOfExperience"
                        placeholder="5"
                        value={formData.yearsOfExperience}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expectedSalary">Expected Salary</Label>
                      <Input
                        id="expectedSalary"
                        name="expectedSalary"
                        placeholder="$150,000"
                        value={formData.expectedSalary}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="noticePeriod">Notice Period</Label>
                    <Input
                      id="noticePeriod"
                      name="noticePeriod"
                      placeholder="2 weeks"
                      value={formData.noticePeriod}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="coverLetter">Cover Letter (Optional)</Label>
                    <Textarea
                      id="coverLetter"
                      name="coverLetter"
                      placeholder="Tell us why you're interested in this role..."
                      rows={5}
                      value={formData.coverLetter}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Full Name</p>
                      <p className="font-medium">{formData.fullName}</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{formData.email}</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{formData.phone}</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Resume</p>
                      <p className="font-medium">{cvFile?.name || "Not uploaded"}</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Experience</p>
                      <p className="font-medium">{formData.yearsOfExperience || "Not specified"} years</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Expected Salary</p>
                      <p className="font-medium">{formData.expectedSalary || "Not specified"}</p>
                    </div>
                  </div>

                  {formData.coverLetter && (
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">Cover Letter</p>
                      <p className="text-sm">{formData.coverLetter}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-3 p-4 bg-accent/5 rounded-lg border border-accent/10">
                    <Sparkles className="w-6 h-6 text-accent flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">Next Step: AI Interview</p>
                      <p className="text-sm text-muted-foreground">
                        After submitting, you'll be invited to schedule an AI-powered interview.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                {step > 1 ? (
                  <Button variant="outline" onClick={() => setStep(step - 1)}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                ) : (
                  <div />
                )}

                {step < 4 ? (
                  <Button onClick={handleNext}>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit Application
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ApplyJob;
