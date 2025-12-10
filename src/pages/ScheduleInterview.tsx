import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import Navbar from "@/components/layout/Navbar";
import {
  Clock,
  Video,
  Sparkles,
  CheckCircle2,
  ArrowLeft,
  CalendarDays,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

const ScheduleInterview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
  ];

  const job = {
    title: "Senior Full Stack Developer",
    company: "TechCorp Inc.",
    duration: "30 minutes",
  };

  const handleSchedule = async () => {
    if (!selectedDate || !selectedSlot) {
      toast.error("Please select a date and time slot");
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    toast.success("Interview scheduled successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Link */}
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              <Sparkles className="w-3 h-3 mr-1" /> AI Interview
            </Badge>
            <h1 className="text-3xl font-display font-bold mb-2">Schedule Your Interview</h1>
            <p className="text-muted-foreground">
              {job.title} at {job.company}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calendar */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-accent" />
                  Select a Date
                </CardTitle>
                <CardDescription>Choose your preferred interview date</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                  className="rounded-md border p-3"
                />
              </CardContent>
            </Card>

            {/* Time Slots */}
            <div className="space-y-6">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-accent" />
                    Select a Time
                  </CardTitle>
                  <CardDescription>
                    {selectedDate
                      ? `Available slots for ${format(selectedDate, "MMMM d, yyyy")}`
                      : "Please select a date first"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedDate ? (
                    <div className="grid grid-cols-2 gap-3">
                      {availableSlots.map((slot) => (
                        <Button
                          key={slot}
                          variant={selectedSlot === slot ? "default" : "outline"}
                          className="h-12"
                          onClick={() => setSelectedSlot(slot)}
                        >
                          {slot}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <CalendarDays className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Select a date to see available time slots</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Interview Info */}
              <Card className="border-border/50 bg-accent/5">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Video className="w-5 h-5 text-accent" />
                    Interview Details
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>Duration: {job.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-muted-foreground" />
                      <span>AI-powered video interview</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                      <span>Flexible rescheduling available</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tips */}
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium mb-1">Before your interview</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Ensure stable internet connection</li>
                        <li>• Find a quiet, well-lit space</li>
                        <li>• Test your camera and microphone</li>
                        <li>• Have your resume ready to reference</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Confirm Button */}
              <Button
                className="w-full"
                size="lg"
                onClick={handleSchedule}
                disabled={!selectedDate || !selectedSlot || isSubmitting}
              >
                {isSubmitting ? (
                  "Scheduling..."
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    {selectedDate && selectedSlot
                      ? `Confirm ${format(selectedDate, "MMM d")} at ${selectedSlot}`
                      : "Confirm Interview"}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ScheduleInterview;
