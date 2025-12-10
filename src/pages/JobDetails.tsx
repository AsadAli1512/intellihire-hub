import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  ArrowLeft,
  MapPin,
  Clock,
  DollarSign,
  Building2,
  Users,
  Calendar,
  Briefcase,
  GraduationCap,
  CheckCircle2,
  Sparkles,
  Share2,
  Bookmark,
  Globe,
} from "lucide-react";

const JobDetails = () => {
  const { id } = useParams();

  // Mock job data - in real app this would come from API
  const job = {
    id: id || "1",
    title: "Senior Full Stack Developer",
    company: "TechCorp Inc.",
    logo: "https://ui-avatars.com/api/?name=TC&background=0d9488&color=fff",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120,000 - $180,000",
    experience: "5+ years",
    department: "Engineering",
    posted: "2 days ago",
    deadline: "December 31, 2024",
    applicants: 45,
    aiInterview: true,
    description: `We are looking for a Senior Full Stack Developer to join our growing engineering team. You will be responsible for developing and maintaining web applications, collaborating with cross-functional teams, and mentoring junior developers.

This is an exciting opportunity to work on cutting-edge technology and make a significant impact on our products used by millions of users worldwide.`,
    responsibilities: [
      "Design and implement scalable web applications",
      "Collaborate with product managers and designers",
      "Write clean, maintainable, and well-documented code",
      "Mentor junior developers and conduct code reviews",
      "Participate in system design and architecture decisions",
      "Troubleshoot and debug applications",
    ],
    requirements: [
      "5+ years of experience in full-stack development",
      "Proficiency in React, Node.js, and TypeScript",
      "Experience with PostgreSQL or similar databases",
      "Strong understanding of RESTful APIs and microservices",
      "Excellent problem-solving and communication skills",
      "Bachelor's degree in Computer Science or related field",
    ],
    benefits: [
      "Competitive salary and equity",
      "Health, dental, and vision insurance",
      "401(k) with company matching",
      "Unlimited PTO",
      "Remote work flexibility",
      "Learning and development budget",
    ],
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS", "Docker"],
    interviewProcess: [
      { step: 1, title: "AI Interview", description: "30-minute automated interview" },
      { step: 2, title: "Technical Screen", description: "1-hour coding assessment" },
      { step: 3, title: "System Design", description: "45-minute architecture discussion" },
      { step: 4, title: "Final Round", description: "Meet the team" },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 mb-6">
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Jobs
          </Link>
        </div>

        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Job Header */}
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={job.logo}
                      alt={job.company}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h1 className="text-2xl font-display font-bold">{job.title}</h1>
                          <p className="text-lg text-muted-foreground">{job.company}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="icon">
                            <Bookmark className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" /> {job.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" /> {job.salary}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" /> {job.experience}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {job.skills.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                        {job.aiInterview && (
                          <Badge className="bg-accent/10 text-accent border-accent/20">
                            <Sparkles className="w-3 h-3 mr-1" />
                            AI Interview
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Job Description */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>About the Role</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground whitespace-pre-line">{job.description}</p>

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-4">Key Responsibilities</h3>
                    <ul className="space-y-2">
                      {job.responsibilities.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-muted-foreground">
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-4">Requirements</h3>
                    <ul className="space-y-2">
                      {job.requirements.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-muted-foreground">
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-4">Benefits & Perks</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {job.benefits.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Interview Process */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-accent" />
                    Interview Process
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {job.interviewProcess.map((step, index) => (
                      <div key={step.step} className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center font-semibold text-sm">
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{step.title}</h4>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                        {index < job.interviewProcess.length - 1 && (
                          <div className="absolute left-4 top-8 w-px h-8 bg-border" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Apply Card */}
              <Card className="border-border/50 sticky top-24">
                <CardContent className="p-6 space-y-6">
                  <Link to={`/apply/${job.id}`}>
                    <Button className="w-full" size="lg">
                      Apply Now
                    </Button>
                  </Link>

                  <div className="space-y-4 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> Posted
                      </span>
                      <span className="font-medium">{job.posted}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Clock className="w-4 h-4" /> Deadline
                      </span>
                      <span className="font-medium">{job.deadline}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Users className="w-4 h-4" /> Applicants
                      </span>
                      <span className="font-medium">{job.applicants} applied</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Building2 className="w-4 h-4" /> Department
                      </span>
                      <span className="font-medium">{job.department}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <GraduationCap className="w-4 h-4" /> Experience
                      </span>
                      <span className="font-medium">{job.experience}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Company Info */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">About the Company</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={job.logo}
                      alt={job.company}
                      className="w-12 h-12 rounded-lg"
                    />
                    <div>
                      <h4 className="font-medium">{job.company}</h4>
                      <p className="text-sm text-muted-foreground">Technology</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    TechCorp is a leading technology company building innovative solutions for businesses worldwide.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Globe className="w-4 h-4 mr-2" />
                      Website
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Building2 className="w-4 h-4 mr-2" />
                      More Jobs
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JobDetails;
