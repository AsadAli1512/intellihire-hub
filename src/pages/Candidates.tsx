import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/layout/Navbar";
import {
  Search,
  Filter,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Star,
  FileText,
  Video,
  MoreVertical,
  CheckCircle2,
  Clock,
  XCircle,
  Download,
  MessageSquare,
  Calendar,
} from "lucide-react";

const Candidates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterJob, setFilterJob] = useState("all");

  const candidates = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      title: "Senior Full Stack Developer",
      experience: "6 years",
      appliedFor: "Senior Full Stack Developer",
      status: "interviewed",
      score: 92,
      skills: ["React", "Node.js", "TypeScript", "PostgreSQL"],
      avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=0d9488&color=fff",
      appliedDate: "Dec 5, 2024",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "m.chen@email.com",
      phone: "+1 (555) 234-5678",
      location: "New York, NY",
      title: "Frontend Developer",
      experience: "4 years",
      appliedFor: "Senior Full Stack Developer",
      status: "shortlisted",
      score: 85,
      skills: ["React", "Vue.js", "JavaScript", "CSS"],
      avatar: "https://ui-avatars.com/api/?name=Michael+Chen&background=6366f1&color=fff",
      appliedDate: "Dec 4, 2024",
    },
    {
      id: 3,
      name: "Emily Davis",
      email: "emily.d@email.com",
      phone: "+1 (555) 345-6789",
      location: "Austin, TX",
      title: "Backend Developer",
      experience: "5 years",
      appliedFor: "Backend Engineer",
      status: "pending",
      score: null,
      skills: ["Python", "Django", "PostgreSQL", "AWS"],
      avatar: "https://ui-avatars.com/api/?name=Emily+Davis&background=ec4899&color=fff",
      appliedDate: "Dec 3, 2024",
    },
    {
      id: 4,
      name: "James Wilson",
      email: "j.wilson@email.com",
      phone: "+1 (555) 456-7890",
      location: "Seattle, WA",
      title: "Full Stack Developer",
      experience: "3 years",
      appliedFor: "Senior Full Stack Developer",
      status: "rejected",
      score: 62,
      skills: ["React", "Express", "MongoDB"],
      avatar: "https://ui-avatars.com/api/?name=James+Wilson&background=f59e0b&color=fff",
      appliedDate: "Dec 2, 2024",
    },
    {
      id: 5,
      name: "Amanda Lee",
      email: "a.lee@email.com",
      phone: "+1 (555) 567-8901",
      location: "Remote",
      title: "Senior Software Engineer",
      experience: "7 years",
      appliedFor: "Tech Lead",
      status: "offered",
      score: 95,
      skills: ["React", "TypeScript", "GraphQL", "AWS", "Docker"],
      avatar: "https://ui-avatars.com/api/?name=Amanda+Lee&background=10b981&color=fff",
      appliedDate: "Dec 1, 2024",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> Pending Review
          </Badge>
        );
      case "shortlisted":
        return (
          <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 flex items-center gap-1">
            <Star className="w-3 h-3" /> Shortlisted
          </Badge>
        );
      case "interviewed":
        return (
          <Badge className="bg-accent/10 text-accent border-accent/20 flex items-center gap-1">
            <Video className="w-3 h-3" /> Interviewed
          </Badge>
        );
      case "offered":
        return (
          <Badge className="bg-green-500/10 text-green-500 border-green-500/20 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Offered
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <XCircle className="w-3 h-3" /> Rejected
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-500";
    if (score >= 70) return "text-yellow-500";
    return "text-red-500";
  };

  const filteredCandidates = candidates.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesJob = filterJob === "all" || c.appliedFor === filterJob;
    return matchesSearch && matchesJob;
  });

  const stats = {
    total: candidates.length,
    pending: candidates.filter((c) => c.status === "pending").length,
    shortlisted: candidates.filter((c) => c.status === "shortlisted").length,
    interviewed: candidates.filter((c) => c.status === "interviewed").length,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-display font-bold">Candidates</h1>
              <p className="text-muted-foreground">Manage and review job applicants</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" /> Export
              </Button>
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" /> Schedule Interviews
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid sm:grid-cols-4 gap-4 mb-8">
            <Card className="border-border/50">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Candidates</p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-yellow-500">{stats.pending}</p>
                <p className="text-sm text-muted-foreground">Pending Review</p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-blue-500">{stats.shortlisted}</p>
                <p className="text-sm text-muted-foreground">Shortlisted</p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-accent">{stats.interviewed}</p>
                <p className="text-sm text-muted-foreground">Interviewed</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterJob} onValueChange={setFilterJob}>
              <SelectTrigger className="w-full sm:w-64">
                <SelectValue placeholder="Filter by job" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Jobs</SelectItem>
                <SelectItem value="Senior Full Stack Developer">Senior Full Stack Developer</SelectItem>
                <SelectItem value="Backend Engineer">Backend Engineer</SelectItem>
                <SelectItem value="Tech Lead">Tech Lead</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" /> More Filters
            </Button>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList>
              <TabsTrigger value="all">All ({candidates.length})</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
              <TabsTrigger value="interviewed">Interviewed</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {filteredCandidates.map((candidate) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  getStatusBadge={getStatusBadge}
                  getScoreColor={getScoreColor}
                />
              ))}
            </TabsContent>

            <TabsContent value="pending" className="space-y-4">
              {filteredCandidates
                .filter((c) => c.status === "pending")
                .map((candidate) => (
                  <CandidateCard
                    key={candidate.id}
                    candidate={candidate}
                    getStatusBadge={getStatusBadge}
                    getScoreColor={getScoreColor}
                  />
                ))}
            </TabsContent>

            <TabsContent value="shortlisted" className="space-y-4">
              {filteredCandidates
                .filter((c) => c.status === "shortlisted")
                .map((candidate) => (
                  <CandidateCard
                    key={candidate.id}
                    candidate={candidate}
                    getStatusBadge={getStatusBadge}
                    getScoreColor={getScoreColor}
                  />
                ))}
            </TabsContent>

            <TabsContent value="interviewed" className="space-y-4">
              {filteredCandidates
                .filter((c) => c.status === "interviewed")
                .map((candidate) => (
                  <CandidateCard
                    key={candidate.id}
                    candidate={candidate}
                    getStatusBadge={getStatusBadge}
                    getScoreColor={getScoreColor}
                  />
                ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

interface CandidateCardProps {
  candidate: any;
  getStatusBadge: (status: string) => React.ReactNode;
  getScoreColor: (score: number) => string;
}

const CandidateCard = ({ candidate, getStatusBadge, getScoreColor }: CandidateCardProps) => {
  return (
    <Card className="border-border/50 hover:border-accent/30 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="w-14 h-14">
            <AvatarImage src={candidate.avatar} />
            <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg">{candidate.name}</h3>
                  {candidate.score && (
                    <span className={`font-bold ${getScoreColor(candidate.score)}`}>
                      {candidate.score}%
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground">{candidate.title}</p>
              </div>
              {getStatusBadge(candidate.status)}
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
              <span className="flex items-center gap-1">
                <Mail className="w-4 h-4" /> {candidate.email}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" /> {candidate.location}
              </span>
              <span className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" /> {candidate.experience}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {candidate.skills.slice(0, 4).map((skill: string) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {candidate.skills.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{candidate.skills.length - 4} more
                </Badge>
              )}
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Applied for: <span className="font-medium text-foreground">{candidate.appliedFor}</span>
                <span className="mx-2">•</span>
                {candidate.appliedDate}
              </p>

              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <FileText className="w-4 h-4 mr-1" /> Resume
                </Button>
                {candidate.score && (
                  <Link to={`/reports/${candidate.id}`}>
                    <Button variant="ghost" size="sm">
                      <Video className="w-4 h-4 mr-1" /> Report
                    </Button>
                  </Link>
                )}
                <Button variant="ghost" size="sm">
                  <MessageSquare className="w-4 h-4 mr-1" /> Message
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Candidates;
