import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  MessageSquare,
  Clock,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Volume2,
} from "lucide-react";
import { toast } from "sonner";

const Interview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [stage, setStage] = useState<"setup" | "interview" | "complete">("setup");
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes
  const [isRecording, setIsRecording] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);

  const questions = [
    "Tell me about yourself and your experience with full-stack development.",
    "Can you describe a challenging project you worked on and how you overcame obstacles?",
    "How do you approach debugging complex issues in a production environment?",
    "Explain your experience with React and TypeScript. What patterns do you commonly use?",
    "How do you ensure code quality and maintainability in your projects?",
  ];

  useEffect(() => {
    if (stage === "interview" && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [stage, timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const startInterview = () => {
    setStage("interview");
    setIsRecording(true);
    toast.success("Interview started. Good luck!");
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      toast.info(`Question ${currentQuestion + 2} of ${questions.length}`);
    } else {
      setStage("complete");
      setIsRecording(false);
      toast.success("Interview completed!");
    }
  };

  const endInterview = () => {
    setStage("complete");
    setIsRecording(false);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-primary">
      {/* Setup Stage */}
      {stage === "setup" && (
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full border-border/50">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-accent" />
              </div>
              <CardTitle className="text-2xl font-display">AI Interview Setup</CardTitle>
              <CardDescription>
                Prepare for your interview with TechCorp Inc.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Camera Preview */}
              <div className="aspect-video bg-muted rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Video className="w-16 h-16 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Camera Preview</p>
                  </div>
                </div>
                {/* Controls overlay */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  <Button
                    variant={isVideoOn ? "secondary" : "destructive"}
                    size="icon"
                    onClick={() => setIsVideoOn(!isVideoOn)}
                  >
                    {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                  </Button>
                  <Button
                    variant={isMicOn ? "secondary" : "destructive"}
                    size="icon"
                    onClick={() => setIsMicOn(!isMicOn)}
                  >
                    {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                  </Button>
                </div>
              </div>

              {/* Checklist */}
              <div className="space-y-3">
                <h3 className="font-semibold">Before you begin:</h3>
                <div className="space-y-2">
                  {[
                    { label: "Good lighting and quiet environment", checked: true },
                    { label: "Camera and microphone working", checked: true },
                    { label: "Stable internet connection", checked: true },
                    { label: "30 minutes of uninterrupted time", checked: true },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interview Info */}
              <div className="p-4 bg-accent/5 rounded-lg border border-accent/10 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-accent" />
                  <span>Duration: ~30 minutes</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MessageSquare className="w-4 h-4 text-accent" />
                  <span>{questions.length} questions</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <AlertCircle className="w-4 h-4 text-accent" />
                  <span>You can re-record answers if needed</span>
                </div>
              </div>

              <Button onClick={startInterview} className="w-full" size="lg">
                Start Interview
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Interview Stage */}
      {stage === "interview" && (
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <div className="bg-card border-b border-border p-4">
            <div className="container mx-auto flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Badge variant="destructive" className="animate-pulse">
                  <span className="w-2 h-2 bg-white rounded-full mr-2" />
                  LIVE
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4" />
                  <span className="font-mono">{formatTime(timeRemaining)}</span>
                </div>
                <Progress value={progress} className="w-32 h-2" />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 container mx-auto p-4 grid lg:grid-cols-3 gap-6">
            {/* Video Area */}
            <div className="lg:col-span-2 space-y-4">
              {/* Main Video */}
              <div className="aspect-video bg-muted rounded-xl relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Sparkles className="w-20 h-20 text-accent mx-auto mb-4 animate-pulse" />
                    <p className="text-xl font-semibold">AI Interviewer</p>
                  </div>
                </div>
                {/* Self View */}
                <div className="absolute bottom-4 right-4 w-48 h-36 bg-primary/80 rounded-lg border border-border overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">
                    Your Camera
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant={isVideoOn ? "secondary" : "destructive"}
                  size="lg"
                  onClick={() => setIsVideoOn(!isVideoOn)}
                  className="rounded-full w-14 h-14"
                >
                  {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
                </Button>
                <Button
                  variant={isMicOn ? "secondary" : "destructive"}
                  size="lg"
                  onClick={() => setIsMicOn(!isMicOn)}
                  className="rounded-full w-14 h-14"
                >
                  {isMicOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
                </Button>
                <Button
                  variant="destructive"
                  size="lg"
                  onClick={endInterview}
                  className="rounded-full w-14 h-14"
                >
                  <PhoneOff className="w-6 h-6" />
                </Button>
              </div>
            </div>

            {/* Question Panel */}
            <div className="space-y-4">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-accent" />
                    Current Question
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-lg">{questions[currentQuestion]}</p>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Volume2 className="w-4 h-4" />
                    <span>Listen to the question</span>
                  </div>

                  <Button onClick={handleNextQuestion} className="w-full">
                    {currentQuestion < questions.length - 1 ? (
                      <>
                        Next Question
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    ) : (
                      "Complete Interview"
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Tips */}
              <Card className="border-border/50 bg-accent/5">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-sm mb-2">Tips:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Speak clearly and at a moderate pace</li>
                    <li>• Provide specific examples when possible</li>
                    <li>• Take a moment to think before answering</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* Complete Stage */}
      {stage === "complete" && (
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="max-w-lg w-full border-border/50 text-center">
            <CardContent className="p-8">
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h1 className="text-2xl font-display font-bold mb-2">Interview Complete!</h1>
              <p className="text-muted-foreground mb-6">
                Thank you for completing your AI interview. Our system is now analyzing your responses.
              </p>

              <div className="p-4 bg-muted/50 rounded-lg mb-6 text-left">
                <h3 className="font-semibold mb-2">What happens next?</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5" />
                    AI analyzes your responses (24-48 hours)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5" />
                    Recruiter reviews your performance report
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5" />
                    You'll receive feedback via email
                  </li>
                </ul>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" className="flex-1" onClick={() => navigate("/dashboard")}>
                  Go to Dashboard
                </Button>
                <Button className="flex-1" onClick={() => navigate("/jobs")}>
                  Browse More Jobs
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Interview;
