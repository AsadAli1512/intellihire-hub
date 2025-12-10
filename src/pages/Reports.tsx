import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  ArrowLeft,
  Download,
  Share2,
  Star,
  MessageSquare,
  Clock,
  CheckCircle2,
  TrendingUp,
  Brain,
  Mic,
  Code,
  Users,
  Lightbulb,
  Target,
  Award,
  FileText,
  Video,
  Calendar,
} from "lucide-react";

const Reports = () => {
  const { id } = useParams();

  // Mock report data
  const report = {
    id: id || "1",
    jobTitle: "Senior Full Stack Developer",
    company: "TechCorp Inc.",
    interviewDate: "December 10, 2024",
    duration: "28 minutes",
    overallScore: 85,
    recommendation: "Strong Hire",
    
    scores: {
      technical: 88,
      communication: 82,
      problemSolving: 90,
      culturalFit: 80,
      experience: 85,
    },
    
    strengths: [
      "Excellent technical depth in React and TypeScript",
      "Clear and structured communication style",
      "Strong problem-solving approach with real examples",
      "Good understanding of system design principles",
    ],
    
    improvements: [
      "Could elaborate more on team collaboration experiences",
      "Consider providing more metrics-driven results",
    ],
    
    questions: [
      {
        question: "Tell me about yourself and your experience with full-stack development.",
        score: 85,
        feedback: "Provided a clear overview of experience with relevant examples.",
        keyPoints: ["5+ years experience", "React/Node expertise", "Leadership roles"],
      },
      {
        question: "Can you describe a challenging project you worked on?",
        score: 90,
        feedback: "Excellent example with clear problem-solution-result structure.",
        keyPoints: ["Complex architecture", "Scalability focus", "Measurable outcomes"],
      },
      {
        question: "How do you approach debugging complex issues?",
        score: 88,
        feedback: "Demonstrated systematic debugging approach with practical examples.",
        keyPoints: ["Methodical approach", "Tool proficiency", "Root cause analysis"],
      },
      {
        question: "Explain your experience with React and TypeScript patterns.",
        score: 82,
        feedback: "Good technical knowledge, could expand on advanced patterns.",
        keyPoints: ["Hooks mastery", "Type safety", "Performance optimization"],
      },
      {
        question: "How do you ensure code quality in your projects?",
        score: 80,
        feedback: "Solid practices mentioned, could discuss more team processes.",
        keyPoints: ["Testing strategies", "Code reviews", "CI/CD pipelines"],
      },
    ],
    
    transcript: `
[00:00] AI: Hello! Welcome to your AI interview for the Senior Full Stack Developer position at TechCorp Inc. I'm here to learn more about your experience and skills. Are you ready to begin?

[00:15] Candidate: Yes, I'm ready. Thank you for having me.

[00:20] AI: Great! Let's start with the first question. Tell me about yourself and your experience with full-stack development.

[00:30] Candidate: I'm a full-stack developer with over 5 years of experience building web applications. I specialize in React and TypeScript on the frontend and Node.js with PostgreSQL on the backend. In my current role at TechCorp, I've led the development of several key features that serve over 100,000 users daily...
    `,
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-500";
    if (score >= 70) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreBg = (score: number) => {
    if (score >= 85) return "bg-green-500";
    if (score >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Back Link */}
          <Link
            to="/applications"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Applications
          </Link>

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-display font-bold mb-2">Interview Report</h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span>{report.jobTitle}</span>
                <span>•</span>
                <span>{report.company}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {report.interviewDate}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Share2 className="w-4 h-4 mr-2" /> Share
              </Button>
              <Button>
                <Download className="w-4 h-4 mr-2" /> Download PDF
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Overall Score */}
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-6">
                    <div className="relative w-32 h-32">
                      <svg className="w-32 h-32 -rotate-90">
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="currentColor"
                          strokeWidth="12"
                          fill="none"
                          className="text-muted"
                        />
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="currentColor"
                          strokeWidth="12"
                          fill="none"
                          strokeDasharray={`${report.overallScore * 3.52} 352`}
                          className="text-accent"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold">{report.overallScore}</span>
                        <span className="text-sm text-muted-foreground">/ 100</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold mb-2">Overall Performance</h2>
                      <Badge className="bg-green-500/10 text-green-500 border-green-500/20 mb-4">
                        <Award className="w-4 h-4 mr-1" />
                        {report.recommendation}
                      </Badge>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Duration: {report.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          {report.questions.length} Questions
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Score Breakdown */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-accent" />
                    Score Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(report.scores).map(([key, value]) => (
                    <div key={key}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="capitalize flex items-center gap-2">
                          {key === "technical" && <Code className="w-4 h-4" />}
                          {key === "communication" && <Mic className="w-4 h-4" />}
                          {key === "problemSolving" && <Brain className="w-4 h-4" />}
                          {key === "culturalFit" && <Users className="w-4 h-4" />}
                          {key === "experience" && <Lightbulb className="w-4 h-4" />}
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </span>
                        <span className={`font-semibold ${getScoreColor(value)}`}>{value}%</span>
                      </div>
                      <Progress value={value} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Question Details */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-accent" />
                    Question Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {report.questions.map((q, index) => (
                    <div key={index}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center font-semibold text-sm">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{q.question}</p>
                            <p className="text-sm text-muted-foreground mt-1">{q.feedback}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {q.keyPoints.map((point, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {point}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <Badge className={getScoreBg(q.score) + " text-white"}>
                          {q.score}%
                        </Badge>
                      </div>
                      {index < report.questions.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Transcript */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-accent" />
                    Interview Transcript
                  </CardTitle>
                  <CardDescription>Full conversation transcript</CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="whitespace-pre-wrap text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg max-h-96 overflow-y-auto">
                    {report.transcript}
                  </pre>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Strengths */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    Key Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {report.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Areas for Improvement */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                    Areas for Improvement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {report.improvements.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Star className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card className="border-border/50">
                <CardContent className="p-4 space-y-3">
                  <Button variant="outline" className="w-full">
                    <Video className="w-4 h-4 mr-2" />
                    Watch Recording
                  </Button>
                  <Button variant="outline" className="w-full">
                    <FileText className="w-4 h-4 mr-2" />
                    View Resume
                  </Button>
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

export default Reports;
