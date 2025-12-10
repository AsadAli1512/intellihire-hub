import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Search,
  Filter,
  MapPin,
  Building2,
  Clock,
  Sparkles,
  FileText,
  Video,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  Calendar,
} from "lucide-react";

const Applications = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const applications = [
    {
      id: 1,
      jobTitle: "Senior Full Stack Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      appliedDate: "Dec 5, 2024",
      status: "interview_scheduled",
      interviewDate: "Dec 15, 2024",
      interviewTime: "2:00 PM PST",
      logo: "https://ui-avatars.com/api/?name=TC&background=0d9488&color=fff",
    },
    {
      id: 2,
      jobTitle: "Frontend Developer",
      company: "StartupXYZ",
      location: "New York, NY",
      appliedDate: "Dec 3, 2024",
      status: "under_review",
      logo: "https://ui-avatars.com/api/?name=SX&background=6366f1&color=fff",
    },
    {
      id: 3,
      jobTitle: "React Developer",
      company: "Digital Agency",
      location: "Remote",
      appliedDate: "Nov 28, 2024",
      status: "interview_completed",
      interviewScore: 85,
      logo: "https://ui-avatars.com/api/?name=DA&background=ec4899&color=fff",
    },
    {
      id: 4,
      jobTitle: "Software Engineer",
      company: "Enterprise Corp",
      location: "Seattle, WA",
      appliedDate: "Nov 20, 2024",
      status: "offered",
      offerAmount: "$145,000",
      logo: "https://ui-avatars.com/api/?name=EC&background=f59e0b&color=fff",
    },
    {
      id: 5,
      jobTitle: "Backend Developer",
      company: "FinTech Solutions",
      location: "Austin, TX",
      appliedDate: "Nov 15, 2024",
      status: "rejected",
      logo: "https://ui-avatars.com/api/?name=FS&background=64748b&color=fff",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "under_review":
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> Under Review
          </Badge>
        );
      case "interview_scheduled":
        return (
          <Badge className="bg-accent/10 text-accent border-accent/20 flex items-center gap-1">
            <Calendar className="w-3 h-3" /> Interview Scheduled
          </Badge>
        );
      case "interview_completed":
        return (
          <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 flex items-center gap-1">
            <Video className="w-3 h-3" /> Interview Completed
          </Badge>
        );
      case "offered":
        return (
          <Badge className="bg-green-500/10 text-green-500 border-green-500/20 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Offer Received
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <XCircle className="w-3 h-3" /> Not Selected
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filterApplications = (status?: string) => {
    let filtered = applications;
    if (status) {
      filtered = applications.filter((app) => app.status === status);
    }
    if (searchTerm) {
      filtered = filtered.filter(
        (app) =>
          app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filtered;
  };

  const stats = {
    total: applications.length,
    pending: applications.filter((a) => a.status === "under_review").length,
    interviews: applications.filter(
      (a) => a.status === "interview_scheduled" || a.status === "interview_completed"
    ).length,
    offers: applications.filter((a) => a.status === "offered").length,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold mb-2">My Applications</h1>
            <p className="text-muted-foreground">Track and manage your job applications</p>
          </div>

          {/* Stats */}
          <div className="grid sm:grid-cols-4 gap-4 mb-8">
            <Card className="border-border/50">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Applications</p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-yellow-500">{stats.pending}</p>
                <p className="text-sm text-muted-foreground">Under Review</p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-accent">{stats.interviews}</p>
                <p className="text-sm text-muted-foreground">Interviews</p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-green-500">{stats.offers}</p>
                <p className="text-sm text-muted-foreground">Offers</p>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" /> Filter
            </Button>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList>
              <TabsTrigger value="all">All ({applications.length})</TabsTrigger>
              <TabsTrigger value="under_review">Under Review</TabsTrigger>
              <TabsTrigger value="interviews">Interviews</TabsTrigger>
              <TabsTrigger value="offered">Offers</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {filterApplications().map((app) => (
                <ApplicationCard key={app.id} application={app} getStatusBadge={getStatusBadge} />
              ))}
            </TabsContent>

            <TabsContent value="under_review" className="space-y-4">
              {filterApplications("under_review").map((app) => (
                <ApplicationCard key={app.id} application={app} getStatusBadge={getStatusBadge} />
              ))}
            </TabsContent>

            <TabsContent value="interviews" className="space-y-4">
              {filterApplications("interview_scheduled")
                .concat(filterApplications("interview_completed"))
                .map((app) => (
                  <ApplicationCard key={app.id} application={app} getStatusBadge={getStatusBadge} />
                ))}
            </TabsContent>

            <TabsContent value="offered" className="space-y-4">
              {filterApplications("offered").map((app) => (
                <ApplicationCard key={app.id} application={app} getStatusBadge={getStatusBadge} />
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

interface ApplicationCardProps {
  application: any;
  getStatusBadge: (status: string) => React.ReactNode;
}

const ApplicationCard = ({ application, getStatusBadge }: ApplicationCardProps) => {
  return (
    <Card className="border-border/50 hover:border-accent/30 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <img
            src={application.logo}
            alt={application.company}
            className="w-14 h-14 rounded-xl"
          />
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-lg">{application.jobTitle}</h3>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-4 h-4" /> {application.company}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {application.location}
                  </span>
                </div>
              </div>
              {getStatusBadge(application.status)}
            </div>

            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-muted-foreground">
                Applied: {application.appliedDate}
              </p>

              <div className="flex items-center gap-2">
                {application.status === "interview_scheduled" && (
                  <div className="flex items-center gap-2 text-sm mr-4">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <span>
                      {application.interviewDate} at {application.interviewTime}
                    </span>
                  </div>
                )}

                {application.status === "interview_scheduled" && (
                  <Link to={`/interview/${application.id}`}>
                    <Button size="sm">
                      <Video className="w-4 h-4 mr-2" /> Join Interview
                    </Button>
                  </Link>
                )}

                {application.status === "interview_completed" && (
                  <Link to={`/reports/${application.id}`}>
                    <Button variant="outline" size="sm">
                      <FileText className="w-4 h-4 mr-2" /> View Report
                    </Button>
                  </Link>
                )}

                {application.status === "offered" && (
                  <div className="flex items-center gap-2">
                    <span className="text-green-500 font-semibold">{application.offerAmount}</span>
                    <Button size="sm">Review Offer</Button>
                  </div>
                )}

                <Link to={`/jobs/${application.id}`}>
                  <Button variant="ghost" size="sm">
                    View Job <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Applications;
