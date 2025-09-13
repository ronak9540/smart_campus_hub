import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import AttendanceCard from './components/AttendanceCard';
import TimetableCard from './components/TimetableCard';
import AssignmentCard from './components/AssignmentCard';
import AnnouncementCard from './components/AnnouncementCard';
import QuickActionsCard from './components/QuickActionsCard';
import PerformanceChart from './components/PerformanceChart';
import Icon from '../../components/AppIcon';

const StudentDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Mock data for dashboard components
  const attendanceData = {
    todayPercentage: 87,
    presentClasses: 6,
    totalClasses: 7,
    overallPercentage: 82
  };

  const todaySchedule = [
    {
      id: 1,
      subject: "Data Structures",
      faculty: "Dr. Sarah Johnson",
      startTime: "09:00",
      endTime: "10:30",
      room: "CS-101",
      type: "lecture"
    },
    {
      id: 2,
      subject: "Database Management",
      faculty: "Prof. Michael Chen",
      startTime: "11:00",
      endTime: "12:30",
      room: "CS-102",
      type: "lecture"
    },
    {
      id: 3,
      subject: "Web Development Lab",
      faculty: "Ms. Emily Davis",
      startTime: "14:00",
      endTime: "16:00",
      room: "CS-Lab-1",
      type: "lab"
    },
    {
      id: 4,
      subject: "Software Engineering",
      faculty: "Dr. Robert Wilson",
      startTime: "16:30",
      endTime: "18:00",
      room: "CS-103",
      type: "lecture"
    }
  ];

  const assignments = [
    {
      id: 1,
      title: "Binary Search Tree Implementation",
      subject: "Data Structures",
      dueDate: "2025-09-12",
      status: "pending",
      priority: "high"
    },
    {
      id: 2,
      title: "Database Design Project",
      subject: "Database Management",
      dueDate: "2025-09-15",
      status: "pending",
      priority: "medium"
    },
    {
      id: 3,
      title: "React Portfolio Website",
      subject: "Web Development",
      dueDate: "2025-09-18",
      status: "submitted",
      priority: "low"
    },
    {
      id: 4,
      title: "Software Requirements Document",
      subject: "Software Engineering",
      dueDate: "2025-09-20",
      status: "pending",
      priority: "medium"
    },
    {
      id: 5,
      title: "Algorithm Analysis Report",
      subject: "Data Structures",
      dueDate: "2025-09-25",
      status: "pending",
      priority: "low"
    }
  ];

  const announcements = [
    {
      id: 1,
      title: "Mid-term Examination Schedule Released",
      content: `The mid-term examination schedule for all courses has been published on the student portal. Please check your individual timetables and note the exam dates, times, and venues.\n\nImportant points to remember:\n• Arrive 30 minutes before the exam\n• Bring valid student ID\n• No electronic devices allowed\n• Contact academic office for any queries`,
      author: "Academic Office",
      timestamp: "2025-09-10T10:30:00Z",
      priority: "high",
      read: false,
      attachments: ["exam_schedule.pdf"]
    },
    {
      id: 2,
      title: "Library Extended Hours During Exam Period",
      content: "The central library will remain open 24/7 during the examination period from September 15-30. Additional study spaces have been arranged in the conference halls.",
      author: "Library Administration",
      timestamp: "2025-09-10T08:15:00Z",
      priority: "medium",
      read: false,
      attachments: []
    },
    {
      id: 3,
      title: "Guest Lecture on Artificial Intelligence",
      content: "Join us for an exciting guest lecture by Dr. Amanda Rodriguez from MIT on \'The Future of AI in Healthcare\' scheduled for September 20th at 2:00 PM in the main auditorium.",
      author: "Computer Science Department",
      timestamp: "2025-09-09T16:45:00Z",
      priority: "low",
      read: true,
      attachments: []
    },
    {
      id: 4,
      title: "Campus WiFi Maintenance Notice",
      content: "The campus WiFi network will undergo scheduled maintenance on September 13th from 2:00 AM to 6:00 AM. Internet services may be intermittent during this period.",
      author: "IT Services",
      timestamp: "2025-09-08T14:20:00Z",
      priority: "medium",
      read: true,
      attachments: []
    }
  ];

  const feeStatus = {
    paid: false,
    amount: 2500,
    dueDate: "2025-09-20",
    semester: "Fall 2025"
  };

  const performanceData = [
    { month: 'Jan', gpa: 3.2 },
    { month: 'Feb', gpa: 3.4 },
    { month: 'Mar', gpa: 3.6 },
    { month: 'Apr', gpa: 3.5 },
    { month: 'May', gpa: 3.8 },
    { month: 'Jun', gpa: 3.7 },
    { month: 'Jul', gpa: 3.9 },
    { month: 'Aug', gpa: 3.8 }
  ];

  const attendanceChartData = [
    { week: 'Week 1', percentage: 95 },
    { week: 'Week 2', percentage: 88 },
    { week: 'Week 3', percentage: 92 },
    { week: 'Week 4', percentage: 85 },
    { week: 'Week 5', percentage: 90 },
    { week: 'Week 6', percentage: 87 },
    { week: 'Week 7', percentage: 93 },
    { week: 'Week 8', percentage: 89 }
  ];

  const getGreeting = () => {
    const hour = currentTime?.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="w-full px-4 sm:px-6 lg:px-8 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {getGreeting()}, John! 👋
              </h1>
              <p className="text-muted-foreground mt-1">
                {currentTime?.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="hidden sm:flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={16} />
                <span>Computer Science Department</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={16} />
                <span>Semester 7</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Main Cards */}
          <div className="lg:col-span-8 space-y-6">
            {/* Top Row - Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AttendanceCard attendanceData={attendanceData} />
              <TimetableCard todaySchedule={todaySchedule} />
            </div>

            {/* Performance Chart */}
            <PerformanceChart 
              performanceData={performanceData} 
              attendanceData={attendanceChartData} 
            />

            {/* Assignments Section */}
            <AssignmentCard assignments={assignments} />
          </div>

          {/* Right Column - Secondary Cards */}
          <div className="lg:col-span-4 space-y-6">
            <QuickActionsCard feeStatus={feeStatus} />
            <AnnouncementCard announcements={announcements} />
          </div>
        </div>

        {/* Bottom Section - Additional Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Academic Progress Summary */}
          <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Icon name="TrendingUp" size={20} className="text-success" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Academic Progress</h3>
                <p className="text-sm text-muted-foreground">Current semester performance</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Completed Credits</span>
                <span className="font-medium text-foreground">18/24</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Current GPA</span>
                <span className="font-medium text-success">3.8/4.0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Class Rank</span>
                <span className="font-medium text-foreground">12/150</span>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Icon name="Calendar" size={20} className="text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Upcoming Events</h3>
                <p className="text-sm text-muted-foreground">Next 7 days</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-warning rounded-full" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Mid-term Exams</p>
                  <p className="text-xs text-muted-foreground">Sept 15 - Sept 20</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">AI Guest Lecture</p>
                  <p className="text-xs text-muted-foreground">Sept 20, 2:00 PM</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-success rounded-full" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Project Presentation</p>
                  <p className="text-xs text-muted-foreground">Sept 25, 10:00 AM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Campus Resources */}
          <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Icon name="Building" size={20} className="text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Campus Resources</h3>
                <p className="text-sm text-muted-foreground">Quick access</p>
              </div>
            </div>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-smooth">
                <div className="flex items-center space-x-3">
                  <Icon name="Book" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">Library</span>
                </div>
                <Icon name="ExternalLink" size={14} className="text-muted-foreground" />
              </button>
              <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-smooth">
                <div className="flex items-center space-x-3">
                  <Icon name="Bus" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">Transport</span>
                </div>
                <Icon name="ExternalLink" size={14} className="text-muted-foreground" />
              </button>
              <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-smooth">
                <div className="flex items-center space-x-3">
                  <Icon name="Home" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">Hostel</span>
                </div>
                <Icon name="ExternalLink" size={14} className="text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;