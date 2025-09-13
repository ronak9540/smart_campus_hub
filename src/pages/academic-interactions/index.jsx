import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import AssignmentCard from './components/AssignmentCard';
import NotesSection from './components/NotesSection';
import QueryTicketSystem from './components/QueryTicketSystem';
import DiscussionForum from './components/DiscussionForum';
import FeedbackSystem from './components/FeedbackSystem';

const AcademicInteractions = () => {
  const [activeTab, setActiveTab] = useState('assignments');
  const [userRole] = useState('student'); // This would come from auth context

  // Mock data for assignments
  const [assignments] = useState([
    {
      id: "1",
      title: "Data Structures Implementation",
      subject: "Computer Science",
      instructor: "Dr. Sarah Johnson",
      description: "Implement various data structures including linked lists, stacks, queues, and binary trees using Python. Include comprehensive test cases and documentation.",
      dueDate: "2025-01-15T23:59:00",
      status: "pending",
      points: 100,
      attachments: ["assignment_brief.pdf", "starter_code.py"],
      submissionCount: 25
    },
    {
      id: "2",
      title: "Physics Lab Report - Wave Mechanics",
      subject: "Physics",
      instructor: "Prof. Michael Chen",
      description: "Analyze wave interference patterns and calculate wavelengths from experimental data. Submit detailed calculations and observations.",
      dueDate: "2025-01-12T17:00:00",
      status: "submitted",
      points: 75,
      grade: "A-",
      attachments: ["lab_manual.pdf"]
    },
    {
      id: "3",
      title: "Literature Analysis Essay",
      subject: "English Literature",
      instructor: "Dr. Emily Davis",
      description: "Write a 2000-word analysis of symbolism in Shakespeare's Hamlet. Focus on the use of imagery and metaphor throughout the play.",
      dueDate: "2025-01-10T23:59:00",
      status: "overdue",
      points: 150,
      attachments: ["essay_guidelines.pdf", "reading_list.pdf"]
    }
  ]);

  // Mock data for notes
  const [notes] = useState([
    {
      id: "1",
      title: "Calculus Integration Techniques",
      category: "lecture",
      description: "Comprehensive notes on integration by parts, substitution, and partial fractions with solved examples.",
      fileType: "application/pdf",
      fileSize: 2048576,
      uploadedBy: "Dr. Sarah Johnson",
      uploadDate: "2025-01-08T10:30:00",
      downloadCount: 45
    },
    {
      id: "2",
      title: "Python Programming Cheat Sheet",
      category: "reference",
      description: "Quick reference guide for Python syntax, built-in functions, and common libraries.",
      fileType: "application/pdf",
      fileSize: 1024000,
      uploadedBy: "John Smith",
      uploadDate: "2025-01-07T14:20:00",
      downloadCount: 78
    },
    {
      id: "3",
      title: "Database Design Project Template",
      category: "project",
      description: "Template and guidelines for the final database design project including ER diagrams and normalization examples.",
      fileType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      fileSize: 3145728,
      uploadedBy: "Prof. Robert Wilson",
      uploadDate: "2025-01-06T09:15:00",
      downloadCount: 32
    }
  ]);

  // Mock data for tickets
  const [tickets, setTickets] = useState([
    {
      id: "T001",
      title: "Unable to access online library resources",
      category: "library",
      priority: "high",
      status: "open",
      description: "I\'m getting authentication errors when trying to access digital journals through the library portal. The error occurs after entering my credentials.",
      createdAt: "2025-01-09T14:30:00",
      createdBy: "Current User",
      assignedTo: "Library Support Team",
      responses: [
        {
          author: "Library Support",
          message: "We're investigating this issue. Please try clearing your browser cache and cookies, then attempt to log in again.",
          timestamp: "2025-01-09T15:45:00"
        }
      ]
    },
    {
      id: "T002",
      title: "Grade discrepancy in Mathematics course",
      category: "academic",
      priority: "medium",
      status: "resolved",
      description: "There seems to be an error in my midterm grade calculation. The individual scores don't match the final grade shown in the portal.",
      createdAt: "2025-01-08T11:20:00",
      createdBy: "Current User",
      assignedTo: "Academic Office",
      responses: [
        {
          author: "Academic Coordinator",
          message: "Thank you for bringing this to our attention. We\'ve reviewed your grades and found a calculation error. Your grade has been corrected.",
          timestamp: "2025-01-08T16:30:00"
        }
      ]
    }
  ]);

  // Mock data for discussions
  const [discussions, setDiscussions] = useState([
    {
      id: "1",
      title: "Study Group for Data Structures Final Exam",
      category: "study-groups",
      content: "Looking to form a study group for the upcoming Data Structures final exam. We can meet twice a week to review concepts and solve practice problems together. Anyone interested?",
      author: "Alice Johnson",
      createdAt: "2025-01-09T10:15:00",
      replies: [
        {
          id: "r1",
          author: "Bob Smith",
          content: "I\'m interested! I\'m particularly struggling with tree traversal algorithms. When are you thinking of meeting?",
          createdAt: "2025-01-09T11:30:00",
          likes: 2
        },
        {
          id: "r2",
          author: "Carol Davis",
          content: "Count me in too! I have good notes on graph algorithms that I can share with the group.",
          createdAt: "2025-01-09T12:45:00",
          likes: 1
        }
      ],
      views: 24,
      likes: 5,
      tags: ["study-group", "data-structures", "exam-prep"]
    },
    {
      id: "2",
      title: "Help needed with Physics Lab Equipment",
      category: "assignments",
      content: "I'm having trouble with the oscilloscope setup for the wave mechanics experiment. The readings seem inconsistent. Has anyone else encountered this issue?",
      author: "David Wilson",
      createdAt: "2025-01-08T16:20:00",
      replies: [
        {
          id: "r3",
          author: "Prof. Michael Chen",
          content: "Make sure you're using the correct probe settings and that the equipment is properly calibrated. I'll be in the lab tomorrow morning if you need assistance.",
          createdAt: "2025-01-08T17:15:00",
          likes: 3
        }
      ],
      views: 18,
      likes: 2,
      tags: ["physics", "lab-equipment", "help-needed"]
    }
  ]);

  // Mock data for feedback
  const [feedbacks] = useState([
    {
      id: "1",
      type: "course",
      subject: "Computer Science",
      instructor: "Dr. Sarah Johnson",
      rating: 5,
      comments: "Excellent course structure and teaching methodology. The practical assignments really helped in understanding the concepts better.",
      suggestions: "Maybe include more real-world examples in the lectures.",
      submittedBy: "Anonymous",
      submittedAt: "2025-01-08T14:30:00",
      status: "submitted"
    },
    {
      id: "2",
      type: "facility",
      rating: 3,
      comments: "The library facilities are good but the WiFi connection is often slow, especially during peak hours.",
      suggestions: "Upgrade the internet infrastructure to handle more concurrent users.",
      submittedBy: "Anonymous",
      submittedAt: "2025-01-07T11:20:00",
      status: "submitted"
    }
  ]);

  const tabs = [
    { id: 'assignments', label: 'Assignments', icon: 'FileText', count: assignments?.length },
    { id: 'notes', label: 'Notes & Resources', icon: 'BookOpen', count: notes?.length },
    { id: 'queries', label: 'Query Tickets', icon: 'HelpCircle', count: tickets?.length },
    { id: 'discussions', label: 'Discussions', icon: 'MessageCircle', count: discussions?.length },
    { id: 'feedback', label: 'Feedback', icon: 'Star', count: feedbacks?.length }
  ];

  const handleAssignmentAction = (action, assignmentId) => {
    console.log(`${action} assignment:`, assignmentId);
    // Implementation would handle assignment actions
  };

  const handleNotesAction = (action, data) => {
    console.log(`${action} notes:`, data);
    // Implementation would handle notes actions
  };

  const handleTicketAction = (action, ticketId, data) => {
    console.log(`${action} ticket:`, ticketId, data);
    if (action === 'create') {
      setTickets(prev => [...prev, data]);
    } else if (action === 'update') {
      setTickets(prev => prev?.map(ticket => 
        ticket?.id === ticketId ? { ...ticket, ...data } : ticket
      ));
    }
  };

  const handleDiscussionAction = (action, discussionId, data) => {
    console.log(`${action} discussion:`, discussionId, data);
    if (action === 'create') {
      setDiscussions(prev => [...prev, data]);
    } else if (action === 'reply') {
      setDiscussions(prev => prev?.map(discussion => 
        discussion?.id === discussionId 
          ? { ...discussion, replies: [...(discussion?.replies || []), data] }
          : discussion
      ));
    }
  };

  const handleFeedbackSubmit = (feedbackData) => {
    console.log('Submit feedback:', feedbackData);
    // Implementation would handle feedback submission
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link to="/student-dashboard" className="hover:text-foreground transition-smooth">
            Dashboard
          </Link>
          <Icon name="ChevronRight" size={16} />
          <span className="text-foreground">Academic Interactions</span>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Academic Interactions</h1>
          <p className="text-muted-foreground">
            Manage assignments, share resources, and collaborate with your academic community
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="FileText" size={20} className="text-accent" />
              <span className="text-sm font-medium text-foreground">Assignments</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{assignments?.length}</p>
            <p className="text-xs text-muted-foreground">
              {assignments?.filter(a => a?.status === 'pending')?.length} pending
            </p>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="BookOpen" size={20} className="text-success" />
              <span className="text-sm font-medium text-foreground">Resources</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{notes?.length}</p>
            <p className="text-xs text-muted-foreground">Available notes</p>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="HelpCircle" size={20} className="text-warning" />
              <span className="text-sm font-medium text-foreground">Tickets</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{tickets?.length}</p>
            <p className="text-xs text-muted-foreground">
              {tickets?.filter(t => t?.status === 'open')?.length} open
            </p>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="MessageCircle" size={20} className="text-primary" />
              <span className="text-sm font-medium text-foreground">Discussions</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{discussions?.length}</p>
            <p className="text-xs text-muted-foreground">Active topics</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-border mb-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs?.map(tab => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-smooth ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                }`}
              >
                <Icon name={tab?.icon} size={18} />
                <span>{tab?.label}</span>
                {tab?.count > 0 && (
                  <span className="bg-muted text-muted-foreground rounded-full px-2 py-1 text-xs">
                    {tab?.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'assignments' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Assignments</h2>
                  <p className="text-sm text-muted-foreground">Track and manage your assignments</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" iconName="Filter" iconPosition="left">
                    Filter
                  </Button>
                  <Button variant="outline" size="sm" iconName="SortDesc" iconPosition="left">
                    Sort
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                {assignments?.map(assignment => (
                  <AssignmentCard
                    key={assignment?.id}
                    assignment={assignment}
                    userRole={userRole}
                    onViewDetails={(id) => handleAssignmentAction('view', id)}
                    onSubmit={(id) => handleAssignmentAction('submit', id)}
                    onGrade={(id) => handleAssignmentAction('grade', id)}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <NotesSection
              notes={notes}
              onUpload={(data) => handleNotesAction('upload', data)}
              onDownload={(id) => handleNotesAction('download', id)}
              onDelete={(id) => handleNotesAction('delete', id)}
              userRole={userRole}
            />
          )}

          {activeTab === 'queries' && (
            <QueryTicketSystem
              tickets={tickets}
              onCreateTicket={(data) => handleTicketAction('create', null, data)}
              onUpdateTicket={(id, data) => handleTicketAction('update', id, data)}
              userRole={userRole}
            />
          )}

          {activeTab === 'discussions' && (
            <DiscussionForum
              discussions={discussions}
              onCreateDiscussion={(data) => handleDiscussionAction('create', null, data)}
              onReply={(id, data) => handleDiscussionAction('reply', id, data)}
              userRole={userRole}
            />
          )}

          {activeTab === 'feedback' && (
            <FeedbackSystem
              feedbacks={feedbacks}
              onSubmitFeedback={handleFeedbackSubmit}
              userRole={userRole}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AcademicInteractions;