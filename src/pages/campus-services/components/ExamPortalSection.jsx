import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExamPortalSection = ({ isVisible, onClose }) => {
  const [activeTab, setActiveTab] = useState('schedule');

  const examSchedule = [
    {
      id: 1,
      subject: "Data Structures and Algorithms",
      code: "CS301",
      date: "2025-09-20",
      time: "9:00 AM - 12:00 PM",
      venue: "Hall A - Room 101",
      type: "Mid-term",
      duration: "3 hours",
      instructor: "Dr. Smith Johnson"
    },
    {
      id: 2,
      subject: "Database Management Systems",
      code: "CS302",
      date: "2025-09-22",
      time: "2:00 PM - 5:00 PM",
      venue: "Hall B - Room 205",
      type: "Mid-term",
      duration: "3 hours",
      instructor: "Prof. Emily Davis"
    },
    {
      id: 3,
      subject: "Computer Networks",
      code: "CS303",
      date: "2025-09-25",
      time: "10:00 AM - 1:00 PM",
      venue: "Hall C - Room 301",
      type: "Final",
      duration: "3 hours",
      instructor: "Dr. Michael Brown"
    }
  ];

  const hallTickets = [
    {
      id: 1,
      examType: "Mid-term Examinations",
      semester: "Fall 2025",
      studentId: "CS2021001",
      studentName: "John Doe",
      rollNumber: "21CS001",
      department: "Computer Science",
      downloadDate: "2025-09-15",
      status: "available"
    }
  ];

  const results = [
    {
      id: 1,
      subject: "Object Oriented Programming",
      code: "CS201",
      semester: "Spring 2025",
      examType: "Final",
      marksObtained: 85,
      totalMarks: 100,
      grade: "A",
      gpa: 8.5,
      publishDate: "2025-08-20"
    },
    {
      id: 2,
      subject: "Digital Logic Design",
      code: "CS202",
      semester: "Spring 2025",
      examType: "Final",
      marksObtained: 78,
      totalMarks: 100,
      grade: "B+",
      gpa: 7.8,
      publishDate: "2025-08-20"
    },
    {
      id: 3,
      subject: "Mathematics III",
      code: "MA301",
      semester: "Spring 2025",
      examType: "Final",
      marksObtained: 92,
      totalMarks: 100,
      grade: "A+",
      gpa: 9.2,
      publishDate: "2025-08-20"
    }
  ];

  const getExamTypeColor = (type) => {
    switch (type) {
      case 'Final':
        return 'text-error bg-error/10';
      case 'Mid-term':
        return 'text-warning bg-warning/10';
      case 'Quiz':
        return 'text-primary bg-primary/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+': case'A':
        return 'text-success bg-success/10';
      case 'B+': case'B':
        return 'text-primary bg-primary/10';
      case 'C+': case'C':
        return 'text-warning bg-warning/10';
      default:
        return 'text-error bg-error/10';
    }
  };

  const calculateSemesterGPA = () => {
    const totalGPA = results?.reduce((sum, result) => sum + result?.gpa, 0);
    return (totalGPA / results?.length)?.toFixed(2);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="FileText" size={20} color="white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Exam Portal</h2>
              <p className="text-sm text-muted-foreground">Examination schedules, hall tickets & results</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="flex border-b border-border">
          {[
            { id: 'schedule', label: 'Exam Schedule', icon: 'Calendar' },
            { id: 'halltickets', label: 'Hall Tickets', icon: 'FileText' },
            { id: 'results', label: 'Results', icon: 'Award' }
          ]?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-smooth ${
                activeTab === tab?.id
                  ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>

        <div className="p-6 max-h-96 overflow-y-auto">
          {activeTab === 'schedule' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-foreground">Upcoming Examinations</h3>
                <Button variant="outline" size="sm" iconName="Download">
                  Download Schedule
                </Button>
              </div>

              <div className="grid gap-4">
                {examSchedule?.map((exam) => (
                  <div key={exam?.id} className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground">{exam?.subject}</h4>
                        <p className="text-sm text-muted-foreground">Course Code: {exam?.code}</p>
                        <p className="text-sm text-muted-foreground">Instructor: {exam?.instructor}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getExamTypeColor(exam?.type)}`}>
                        {exam?.type}
                      </span>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Icon name="Calendar" size={16} className="text-muted-foreground" />
                        <span>{exam?.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="Clock" size={16} className="text-muted-foreground" />
                        <span>{exam?.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="MapPin" size={16} className="text-muted-foreground" />
                        <span>{exam?.venue}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="Timer" size={16} className="text-muted-foreground" />
                        <span>{exam?.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'halltickets' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Hall Tickets</h3>
                <Button variant="outline" size="sm" iconName="Printer">
                  Print All
                </Button>
              </div>

              <div className="grid gap-4">
                {hallTickets?.map((ticket) => (
                  <div key={ticket?.id} className="bg-muted/50 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-foreground text-lg">{ticket?.examType}</h4>
                        <p className="text-muted-foreground">{ticket?.semester}</p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-medium text-success bg-success/10">
                        Available
                      </span>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Student Name:</span>
                          <span className="font-medium">{ticket?.studentName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Student ID:</span>
                          <span className="font-medium">{ticket?.studentId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Roll Number:</span>
                          <span className="font-medium">{ticket?.rollNumber}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Department:</span>
                          <span className="font-medium">{ticket?.department}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Download Date:</span>
                          <span className="font-medium">{ticket?.downloadDate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button iconName="Download">
                        Download Hall Ticket
                      </Button>
                      <Button variant="outline" iconName="Printer">
                        Print
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'results' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Examination Results</h3>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Semester GPA</p>
                    <p className="text-xl font-bold text-primary">{calculateSemesterGPA()}</p>
                  </div>
                  <Button variant="outline" size="sm" iconName="Download">
                    Download Transcript
                  </Button>
                </div>
              </div>

              <div className="grid gap-4">
                {results?.map((result) => (
                  <div key={result?.id} className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground">{result?.subject}</h4>
                        <p className="text-sm text-muted-foreground">
                          {result?.code} • {result?.semester} • {result?.examType}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${getGradeColor(result?.grade)}`}>
                          {result?.grade}
                        </span>
                        <p className="text-xs text-muted-foreground mt-1">GPA: {result?.gpa}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <div>
                          <p className="text-sm text-muted-foreground">Marks Obtained</p>
                          <p className="text-lg font-semibold text-foreground">
                            {result?.marksObtained}/{result?.totalMarks}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Percentage</p>
                          <p className="text-lg font-semibold text-foreground">
                            {((result?.marksObtained / result?.totalMarks) * 100)?.toFixed(1)}%
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Published: {result?.publishDate}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamPortalSection;