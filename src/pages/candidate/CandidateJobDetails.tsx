import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  Building2, 
  Calendar,
  Users,
  CheckCircle2,
  ArrowLeft,
  Bookmark,
  Share2,
  Video
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

const CandidateJobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  // Mock job data
  const job = {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechFlow Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120,000 - $160,000",
    posted: "2 days ago",
    applicants: 45,
    logo: "TF",
    description: `We are looking for a Senior Frontend Developer to join our growing team. You will be responsible for building and maintaining our web applications using modern technologies.

The ideal candidate has strong experience with React, TypeScript, and modern CSS frameworks. You should be passionate about creating great user experiences and writing clean, maintainable code.`,
    responsibilities: [
      "Build and maintain responsive web applications using React and TypeScript",
      "Collaborate with designers to implement pixel-perfect UI components",
      "Write clean, efficient, and well-documented code",
      "Participate in code reviews and mentor junior developers",
      "Optimize applications for maximum speed and scalability",
      "Stay up-to-date with emerging technologies and industry trends"
    ],
    requirements: [
      "5+ years of experience in frontend development",
      "Strong proficiency in React, TypeScript, and modern JavaScript",
      "Experience with CSS-in-JS solutions or Tailwind CSS",
      "Familiarity with state management solutions (Redux, Zustand, etc.)",
      "Understanding of RESTful APIs and GraphQL",
      "Excellent problem-solving and communication skills"
    ],
    benefits: [
      "Competitive salary and equity package",
      "Health, dental, and vision insurance",
      "Flexible work schedule and remote options",
      "Professional development budget",
      "401(k) with company match",
      "Unlimited PTO"
    ],
    skills: ["React", "TypeScript", "Tailwind CSS", "GraphQL", "Node.js"],
    interviewSlots: [
      { id: 1, date: "Dec 20, 2024", time: "10:00 AM PST" },
      { id: 2, date: "Dec 20, 2024", time: "2:00 PM PST" },
      { id: 3, date: "Dec 21, 2024", time: "11:00 AM PST" },
      { id: 4, date: "Dec 22, 2024", time: "3:00 PM PST" }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Jobs
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center text-xl font-display font-bold text-accent shrink-0">
                  {job.logo}
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-display font-bold text-foreground mb-2">{job.title}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Building2 className="w-4 h-4" />
                      {job.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {job.posted}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setSaved(!saved)}
                    className={cn(saved && "text-accent border-accent")}
                  >
                    <Bookmark className={cn("w-4 h-4", saved && "fill-current")} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-6">
                <span className="px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium">
                  {job.type}
                </span>
                <span className="px-3 py-1.5 rounded-full bg-success/10 text-success text-sm font-medium flex items-center gap-1">
                  <DollarSign className="w-3 h-3" />
                  {job.salary}
                </span>
                <span className="px-3 py-1.5 rounded-full bg-info/10 text-info text-sm font-medium flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {job.applicants} applicants
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <h2 className="text-lg font-display font-semibold text-foreground mb-4">About the Role</h2>
              <p className="text-muted-foreground whitespace-pre-line leading-relaxed">{job.description}</p>
            </div>

            {/* Responsibilities */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <h2 className="text-lg font-display font-semibold text-foreground mb-4">Responsibilities</h2>
              <ul className="space-y-3">
                {job.responsibilities.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <h2 className="text-lg font-display font-semibold text-foreground mb-4">Requirements</h2>
              <ul className="space-y-3">
                {job.requirements.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <h2 className="text-lg font-display font-semibold text-foreground mb-4">Benefits</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {job.benefits.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <div className="bg-card rounded-2xl border border-border p-6 sticky top-24">
              <h3 className="text-lg font-display font-semibold text-foreground mb-4">Ready to Apply?</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                  <Video className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-sm font-medium text-foreground">AI Video Interview</p>
                    <p className="text-xs text-muted-foreground">15-20 minutes</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-3">Select an interview slot:</p>
                <div className="space-y-2">
                  {job.interviewSlots.slice(0, 3).map((slot) => (
                    <div
                      key={slot.id}
                      className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-accent/50 cursor-pointer transition-colors"
                    >
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{slot.date}</p>
                        <p className="text-xs text-muted-foreground">{slot.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  +{job.interviewSlots.length - 3} more slots available
                </p>
              </div>

              <Link to={`/candidate/apply/${job.id}`}>
                <Button className="w-full" size="lg">
                  Apply Now
                </Button>
              </Link>

              <p className="text-xs text-center text-muted-foreground mt-4">
                Your profile and resume will be shared with the employer
              </p>
            </div>

            {/* Skills */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-full bg-secondary text-muted-foreground text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CandidateJobDetails;
