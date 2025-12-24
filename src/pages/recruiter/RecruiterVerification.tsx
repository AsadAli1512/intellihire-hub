import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Briefcase, 
  Upload, 
  Building2, 
  FileText, 
  CheckCircle2,
  AlertTriangle,
  X,
  Clock
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

const RecruiterVerification = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    ntnNumber: "",
    companyAddress: "",
    companyWebsite: "",
    companyPhone: ""
  });
  const [documents, setDocuments] = useState<{
    registration: File | null;
    ntn: File | null;
    letterhead: File | null;
  }>({
    registration: null,
    ntn: null,
    letterhead: null
  });
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (type: keyof typeof documents) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDocuments(prev => ({ ...prev, [type]: file }));
    }
  };

  const handleRemoveFile = (type: keyof typeof documents) => {
    setDocuments(prev => ({ ...prev, [type]: null }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
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

        <main className="container mx-auto px-4 py-12 max-w-lg">
          <div className="bg-card rounded-2xl border border-border p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-warning/10 flex items-center justify-center mx-auto mb-6">
              <Clock className="w-10 h-10 text-warning" />
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground mb-3">
              Verification Pending
            </h1>
            <p className="text-muted-foreground mb-6">
              Your verification documents have been submitted successfully. 
              Our team will review them and notify you within 24-48 hours.
            </p>

            <div className="bg-secondary/50 rounded-xl p-4 mb-6 text-left">
              <h3 className="font-medium text-foreground mb-3">Submitted Documents:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  Company Registration Certificate
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  NTN Certificate
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  Company Letterhead
                </li>
              </ul>
            </div>

            <div className="bg-info/10 border border-info/20 rounded-xl p-4 text-left text-sm">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-info shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  You'll receive an email once your account is verified. 
                  Until then, access to recruiter features will be limited.
                </p>
              </div>
            </div>

            <Button 
              className="mt-6" 
              variant="outline"
              onClick={() => navigate("/recruiter")}
            >
              Go to Dashboard
            </Button>
          </div>
        </main>
      </div>
    );
  }

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

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-2xl font-display font-bold text-foreground mb-2">
            Complete Verification
          </h1>
          <p className="text-muted-foreground">
            Submit your company documents to start posting jobs
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border p-8">
          {/* Company Information */}
          <div className="mb-8">
            <h2 className="text-lg font-display font-semibold text-foreground mb-4">
              Company Information
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  placeholder="Acme Corporation"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ntnNumber">NTN Number *</Label>
                  <Input
                    id="ntnNumber"
                    placeholder="1234567-8"
                    value={formData.ntnNumber}
                    onChange={(e) => setFormData({ ...formData, ntnNumber: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyPhone">Company Phone</Label>
                  <Input
                    id="companyPhone"
                    placeholder="+92 300 1234567"
                    value={formData.companyPhone}
                    onChange={(e) => setFormData({ ...formData, companyPhone: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyAddress">Company Address *</Label>
                <Input
                  id="companyAddress"
                  placeholder="123 Business Street, City, Country"
                  value={formData.companyAddress}
                  onChange={(e) => setFormData({ ...formData, companyAddress: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyWebsite">Company Website</Label>
                <Input
                  id="companyWebsite"
                  placeholder="https://www.company.com"
                  value={formData.companyWebsite}
                  onChange={(e) => setFormData({ ...formData, companyWebsite: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Document Upload */}
          <div className="mb-8">
            <h2 className="text-lg font-display font-semibold text-foreground mb-4">
              Required Documents
            </h2>
            <div className="space-y-4">
              {/* Registration Certificate */}
              <div>
                <Label className="mb-2 block">Company Registration Certificate *</Label>
                <label
                  className={cn(
                    "flex items-center justify-between p-4 rounded-xl border-2 border-dashed cursor-pointer transition-colors",
                    documents.registration
                      ? "border-accent bg-accent/5"
                      : "border-border hover:border-accent/50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm text-foreground">
                      {documents.registration ? documents.registration.name : "Upload registration certificate (PDF)"}
                    </span>
                  </div>
                  {documents.registration ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleRemoveFile("registration");
                      }}
                      className="p-1 hover:bg-secondary rounded"
                    >
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                  ) : (
                    <Upload className="w-5 h-5 text-muted-foreground" />
                  )}
                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={handleFileChange("registration")}
                  />
                </label>
              </div>

              {/* NTN Certificate */}
              <div>
                <Label className="mb-2 block">NTN Certificate *</Label>
                <label
                  className={cn(
                    "flex items-center justify-between p-4 rounded-xl border-2 border-dashed cursor-pointer transition-colors",
                    documents.ntn
                      ? "border-accent bg-accent/5"
                      : "border-border hover:border-accent/50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm text-foreground">
                      {documents.ntn ? documents.ntn.name : "Upload NTN certificate (PDF)"}
                    </span>
                  </div>
                  {documents.ntn ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleRemoveFile("ntn");
                      }}
                      className="p-1 hover:bg-secondary rounded"
                    >
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                  ) : (
                    <Upload className="w-5 h-5 text-muted-foreground" />
                  )}
                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={handleFileChange("ntn")}
                  />
                </label>
              </div>

              {/* Company Letterhead */}
              <div>
                <Label className="mb-2 block">Company Letterhead *</Label>
                <label
                  className={cn(
                    "flex items-center justify-between p-4 rounded-xl border-2 border-dashed cursor-pointer transition-colors",
                    documents.letterhead
                      ? "border-accent bg-accent/5"
                      : "border-border hover:border-accent/50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm text-foreground">
                      {documents.letterhead ? documents.letterhead.name : "Upload company letterhead (PDF/Image)"}
                    </span>
                  </div>
                  {documents.letterhead ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleRemoveFile("letterhead");
                      }}
                      className="p-1 hover:bg-secondary rounded"
                    >
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                  ) : (
                    <Upload className="w-5 h-5 text-muted-foreground" />
                  )}
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={handleFileChange("letterhead")}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="bg-secondary/50 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-1">Important</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>All documents must be clear and legible</li>
                  <li>Documents should be in PDF format (max 5MB each)</li>
                  <li>Verification typically takes 24-48 hours</li>
                </ul>
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={!formData.companyName || !formData.ntnNumber || !formData.companyAddress || !documents.registration || !documents.ntn || !documents.letterhead}
          >
            Submit for Verification
          </Button>
        </form>
      </main>
    </div>
  );
};

export default RecruiterVerification;
