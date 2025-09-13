import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import components
import AttendanceMethodCard from './components/AttendanceMethodCard';
import CurrentClassInfo from './components/CurrentClassInfo';
import QRScanner from './components/QRScanner';
import BiometricScanner from './components/BiometricScanner';
import FacialRecognition from './components/FacialRecognition';
import AttendanceHistory from './components/AttendanceHistory';
import LiveAttendanceMonitor from './components/LiveAttendanceMonitor';
import ManualOverridePanel from './components/ManualOverridePanel';

const AttendanceTracking = () => {
  const [activeMethod, setActiveMethod] = useState(null);
  const [showScanner, setShowScanner] = useState(false);
  const [showManualOverride, setShowManualOverride] = useState(false);
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  // Mock data for current class
  const currentClass = {
    subject: "Data Structures & Algorithms",
    faculty: "Dr. Sarah Johnson",
    time: "10:00 AM - 11:30 AM",
    location: "Room 204, Computer Science Block",
    status: "ongoing",
    attendanceWindow: "Available for next 15 minutes"
  };

  // Mock data for attendance methods
  const attendanceMethods = [
    {
      type: 'qr',
      title: 'QR Code Scan',
      description: 'Quick and contactless attendance marking',
      avgTime: '2-3 seconds'
    },
    {
      type: 'biometric',
      title: 'Biometric Scan',
      description: 'Secure fingerprint verification',
      avgTime: '3-5 seconds'
    },
    {
      type: 'facial',
      title: 'Facial Recognition',
      description: 'AI-powered face detection and verification',
      avgTime: '4-6 seconds'
    }
  ];

  // Mock data for live attendance monitoring
  const liveAttendanceData = {
    totalStudents: 45,
    presentCount: 32,
    lastUpdated: new Date(),
    recentCheckins: [
      { id: 1, studentName: 'John Doe', method: 'QR', time: '10:05 AM', suspicious: false },
      { id: 2, studentName: 'Jane Smith', method: 'Bio', time: '10:04 AM', suspicious: false },
      { id: 3, studentName: 'Mike Johnson', method: 'Face', time: '10:03 AM', suspicious: true },
      { id: 4, studentName: 'Sarah Wilson', method: 'QR', time: '10:02 AM', suspicious: false }
    ]
  };

  // Initialize attendance history
  useEffect(() => {
    const mockHistory = [
      {
        id: 1,
        subject: "Data Structures & Algorithms",
        method: "QR Code",
        status: "verified",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        location: "Room 204"
      },
      {
        id: 2,
        subject: "Database Management Systems",
        method: "Biometric",
        status: "verified",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        location: "Room 301"
      },
      {
        id: 3,
        subject: "Computer Networks",
        method: "Facial Recognition",
        status: "pending",
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        location: "Room 105"
      },
      {
        id: 4,
        subject: "Operating Systems",
        method: "Manual",
        status: "verified",
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        location: "Room 202"
      }
    ];
    setAttendanceHistory(mockHistory);
  }, []);

  const handleMethodSelect = (methodType) => {
    setActiveMethod(methodType);
    setShowScanner(true);
  };

  const handleScanSuccess = (scanData) => {
    // Add new attendance record
    const newRecord = {
      id: Date.now(),
      subject: currentClass?.subject,
      method: scanData?.method,
      status: "verified",
      timestamp: scanData?.timestamp,
      location: scanData?.location || currentClass?.location
    };

    setAttendanceHistory(prev => [newRecord, ...prev]);
    setShowScanner(false);
    setActiveMethod(null);
    setSuccessMessage(`Attendance marked successfully via ${scanData?.method}!`);
    
    // Clear success message after 5 seconds
    setTimeout(() => setSuccessMessage(''), 5000);
  };

  const handleCloseScanner = () => {
    setShowScanner(false);
    setActiveMethod(null);
  };

  const handleManualOverride = (overrideData) => {
    // In a real app, this would make an API call
    console.log('Manual override applied:', overrideData);
    setShowManualOverride(false);
    setSuccessMessage('Manual override applied successfully!');
    setTimeout(() => setSuccessMessage(''), 5000);
  };

  const renderScanner = () => {
    switch (activeMethod) {
      case 'qr':
        return (
          <QRScanner 
            onScanSuccess={handleScanSuccess}
            onClose={handleCloseScanner}
          />
        );
      case 'biometric':
        return (
          <BiometricScanner 
            onScanSuccess={handleScanSuccess}
            onClose={handleCloseScanner}
          />
        );
      case 'facial':
        return (
          <FacialRecognition 
            onScanSuccess={handleScanSuccess}
            onClose={handleCloseScanner}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Attendance Tracking - Smart Campus Hub</title>
        <meta name="description" content="Mark attendance using QR codes, biometric scanning, or facial recognition. Monitor live attendance and manage records." />
      </Helmet>
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="UserCheck" size={24} color="white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Attendance Tracking</h1>
              <p className="text-muted-foreground">Mark your attendance using multiple verification methods</p>
            </div>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="bg-success/10 border border-success rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={20} className="text-success" />
                <p className="text-success font-medium">{successMessage}</p>
              </div>
            </div>
          )}
        </div>

        {/* Current Class Information */}
        <div className="mb-8">
          <CurrentClassInfo classInfo={currentClass} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Attendance Methods & Scanner */}
          <div className="xl:col-span-2 space-y-8">
            {!showScanner ? (
              <>
                {/* Attendance Methods */}
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-6">Select Attendance Method</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {attendanceMethods?.map((method) => (
                      <AttendanceMethodCard
                        key={method?.type}
                        method={method}
                        onSelect={handleMethodSelect}
                        isActive={activeMethod === method?.type}
                      />
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                  <div className="flex flex-wrap gap-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      iconName="History"
                    >
                      View Full History
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      iconName="Download"
                    >
                      Export Records
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      iconName="Settings"
                    >
                      Preferences
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      iconName="HelpCircle"
                    >
                      Help & Support
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              /* Scanner Interface */
              (<div>
                {renderScanner()}
              </div>)
            )}

            {/* Manual Override Panel */}
            {showManualOverride && (
              <ManualOverridePanel
                onClose={() => setShowManualOverride(false)}
                onSave={handleManualOverride}
              />
            )}
          </div>

          {/* Right Column - History & Live Monitor */}
          <div className="space-y-8">
            {/* Attendance History */}
            <AttendanceHistory history={attendanceHistory?.slice(0, 5)} />

            {/* Live Attendance Monitor */}
            <LiveAttendanceMonitor 
              classData={liveAttendanceData}
              onManualOverride={() => setShowManualOverride(true)}
            />

            {/* Attendance Statistics */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
              <h3 className="text-lg font-semibold text-foreground mb-4">This Week's Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Classes Attended</span>
                  <span className="font-medium text-foreground">12/15</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Attendance Rate</span>
                  <span className="font-medium text-success">80%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">On-time Rate</span>
                  <span className="font-medium text-primary">95%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AttendanceTracking;