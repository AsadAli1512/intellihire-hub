import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import ThemeToggle from "@/components/ThemeToggle";
import {
  Briefcase,
  LayoutDashboard,
  FileText,
  Users,
  Video,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  Menu,
  Search,
  Filter,
  Mail,
  Phone,
  MapPin,
  Star,
  Download,
  MessageSquare,
  Calendar,
  MoreVertical,
  CheckCircle2,
  Clock,
  XCircle,
  TrendingUp,
  Eye,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";

const RecruiterCandidates = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterJob, setFilterJob] = useState("all");
  const location = useLocation();
  const navigate = useNavigate();

  const sidebarLinks = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/recruiter" },
    { icon: FileText, label: "Job Postings", href: "/recruiter/jobs" },
    { icon: Users, label: "Candidates", href: "/recruiter/candidates" },
    { icon: Video, label: "Interviews", href: "/recruiter/interviews" },
    { icon: BarChart3, label: "Reports", href: "/recruiter/reports" },
    { icon: CreditCard, label: "Subscription", href: "/recruiter/subscriptions" },
    { icon: Settings, label: "Settings", href: "/recruiter/settings" },
  ];

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
      resumeUrl: "#",
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
      resumeUrl: "#",
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
      resumeUrl: "#",
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
      resumeUrl: "#",
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
      resumeUrl: "#",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="flex items-center gap-1"><Clock className="w-3 h-3" /> Pending</Badge>;
      case "shortlisted":
        return <Badge className="bg-info/10 text-info border-info/20 flex items-center gap-1"><Star className="w-3 h-3" /> Shortlisted</Badge>;
      case "interviewed":
        return <Badge className="bg-accent/10 text-accent border-accent/20 flex items-center gap-1"><Video className="w-3 h-3" /> Interviewed</Badge>;
      case "offered":
        return <Badge className="bg-success/10 text-success border-success/20 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Offered</Badge>;
      case "rejected":
        return <Badge variant="destructive" className="flex items-center gap-1"><XCircle className="w-3 h-3" /> Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-success";
    if (score >= 70) return "text-warning";
    return "text-destructive";
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

        <div className="absolute bottom-20 left-4 right-4">
          <div className="p-4 rounded-xl bg-sidebar-accent border border-sidebar-border">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-sidebar-primary">PRO PLAN</span>
              <TrendingUp className="w-4 h-4 text-sidebar-primary" />
            </div>
            <p className="text-xs text-sidebar-foreground/70">15/25 AI interviews used</p>
            <div className="mt-2 h-1.5 bg-sidebar-border rounded-full overflow-hidden">
              <div className="h-full w-3/5 bg-sidebar-primary rounded-full" />
            </div>
          </div>
        </div>

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
            <h1 className="text-xl font-display font-semibold text-foreground">Candidates</h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" /> Export
            </Button>
            <button className="relative p-2 hover:bg-secondary rounded-lg">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
            </button>
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-medium">
              TF
            </div>
          </div>
        </header>

        <main className="p-6">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="border-border/50">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-display font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Candidates</p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-display font-bold text-warning">{stats.pending}</p>
                <p className="text-sm text-muted-foreground">Pending Review</p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-display font-bold text-info">{stats.shortlisted}</p>
                <p className="text-sm text-muted-foreground">Shortlisted</p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-display font-bold text-accent">{stats.interviewed}</p>
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
                <Card key={candidate.id} className="border-border/50 hover:border-accent/30 transition-colors">
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
                                <span className={cn("font-bold", getScoreColor(candidate.score))}>
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
                          {candidate.skills.slice(0, 4).map((skill) => (
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
                              <Link to={`/recruiter/reports/${candidate.id}`}>
                                <Button variant="ghost" size="sm">
                                  <Eye className="w-4 h-4 mr-1" /> Report
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
              ))}
            </TabsContent>

            <TabsContent value="pending" className="space-y-4">
              {filteredCandidates.filter((c) => c.status === "pending").map((candidate) => (
                <Card key={candidate.id} className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={candidate.avatar} />
                        <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold">{candidate.name}</h3>
                        <p className="text-sm text-muted-foreground">{candidate.appliedFor}</p>
                      </div>
                      <Button variant="accent" size="sm">Schedule Interview</Button>
                      <Button variant="outline" size="sm">View Resume</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="shortlisted" className="space-y-4">
              {filteredCandidates.filter((c) => c.status === "shortlisted").map((candidate) => (
                <Card key={candidate.id} className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={candidate.avatar} />
                        <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{candidate.name}</h3>
                          {candidate.score && (
                            <span className={cn("font-bold text-sm", getScoreColor(candidate.score))}>
                              {candidate.score}%
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{candidate.appliedFor}</p>
                      </div>
                      <Button variant="accent" size="sm">Send Offer</Button>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="interviewed" className="space-y-4">
              {filteredCandidates.filter((c) => c.status === "interviewed").map((candidate) => (
                <Card key={candidate.id} className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={candidate.avatar} />
                        <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{candidate.name}</h3>
                          {candidate.score && (
                            <span className={cn("font-bold text-sm", getScoreColor(candidate.score))}>
                              {candidate.score}%
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{candidate.appliedFor}</p>
                      </div>
                      <Link to={`/recruiter/reports/${candidate.id}`}>
                        <Button variant="accent" size="sm">View Report</Button>
                      </Link>
                      <Button variant="outline" size="sm">Shortlist</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default RecruiterCandidates;
