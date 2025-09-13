import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import TimetableGrid from './components/TimetableGrid';
import AISchedulingPanel from './components/AISchedulingPanel';
import ConflictDetection from './components/ConflictDetection';
import ClassroomAvailability from './components/ClassroomAvailability';
import FacultySchedule from './components/FacultySchedule';

const TimetableManagement = () => {
  const [activeTab, setActiveTab] = useState('timetable');
  const [selectedDepartment, setSelectedDepartment] = useState('computer-science');
  const [selectedShift, setSelectedShift] = useState('morning');
  const [selectedWeek, setSelectedWeek] = useState('current');
  const [isGeneratingSchedule, setIsGeneratingSchedule] = useState(false);

  const departmentOptions = [
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'information-technology', label: 'Information Technology' },
    { value: 'electronics', label: 'Electronics & Communication' },
    { value: 'mechanical', label: 'Mechanical Engineering' },
    { value: 'civil', label: 'Civil Engineering' }
  ];

  const shiftOptions = [
    { value: 'morning', label: 'Morning Shift (8:00 AM - 1:00 PM)' },
    { value: 'afternoon', label: 'Afternoon Shift (1:00 PM - 6:00 PM)' },
    { value: 'evening', label: 'Evening Shift (6:00 PM - 10:00 PM)' }
  ];

  const weekOptions = [
    { value: 'previous', label: 'Previous Week' },
    { value: 'current', label: 'Current Week (Sep 9-14, 2025)' },
    { value: 'next', label: 'Next Week' }
  ];

  const tabs = [
    { id: 'timetable', label: 'Timetable Grid', icon: 'Calendar' },
    { id: 'ai-scheduling', label: 'AI Scheduling', icon: 'Brain' },
    { id: 'conflicts', label: 'Conflicts', icon: 'AlertTriangle' },
    { id: 'rooms', label: 'Classrooms', icon: 'Building' },
    { id: 'faculty', label: 'Faculty Schedule', icon: 'Users' }
  ];

  const handleScheduleGeneration = async (config) => {
    setIsGeneratingSchedule(true);
    // Simulate AI schedule generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsGeneratingSchedule(false);
    // Switch to timetable view to show results
    setActiveTab('timetable');
  };

  const handleScheduleChange = (draggedItem, targetSlot) => {
    console.log('Schedule change:', draggedItem, targetSlot);
    // Handle schedule updates
  };

  const handleConflictResolve = (conflictId, suggestion) => {
    console.log('Resolving conflict:', conflictId, suggestion);
    // Handle conflict resolution
  };

  const handleRoomBook = (roomId, timeSlot) => {
    console.log('Booking room:', roomId, timeSlot);
    // Handle room booking
  };

  const handleRoomRelease = (roomId, timeSlot) => {
    console.log('Releasing room:', roomId, timeSlot);
    // Handle room release
  };

  const handleFacultyScheduleUpdate = (facultyId, scheduleData) => {
    console.log('Updating faculty schedule:', facultyId, scheduleData);
    // Handle faculty schedule updates
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'timetable':
        return (
          <TimetableGrid
            selectedWeek={selectedWeek}
            selectedDepartment={selectedDepartment}
            selectedShift={selectedShift}
            onScheduleChange={handleScheduleChange}
          />
        );
      case 'ai-scheduling':
        return (
          <AISchedulingPanel
            onGenerateSchedule={handleScheduleGeneration}
            isGenerating={isGeneratingSchedule}
          />
        );
      case 'conflicts':
        return (
          <ConflictDetection
            conflicts={[]} // Add missing required prop
            onResolveConflict={handleConflictResolve}
          />
        );
      case 'rooms':
        return (
          <ClassroomAvailability
            onRoomBook={handleRoomBook}
            onRoomRelease={handleRoomRelease}
          />
        );
      case 'faculty':
        return (
          <FacultySchedule
            onScheduleUpdate={handleFacultyScheduleUpdate}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Calendar" size={24} color="white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Timetable Management</h1>
              <p className="text-muted-foreground">
                AI-powered scheduling and comprehensive timetable oversight
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={20} className="text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Classes</p>
                  <p className="text-xl font-semibold text-foreground">156</p>
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={20} className="text-success" />
                <div>
                  <p className="text-sm text-muted-foreground">Active Faculty</p>
                  <p className="text-xl font-semibold text-foreground">24</p>
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="Building" size={20} className="text-accent" />
                <div>
                  <p className="text-sm text-muted-foreground">Classrooms</p>
                  <p className="text-xl font-semibold text-foreground">18</p>
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="AlertTriangle" size={20} className="text-error" />
                <div>
                  <p className="text-sm text-muted-foreground">Conflicts</p>
                  <p className="text-xl font-semibold text-foreground">4</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <Select
              label="Department"
              options={departmentOptions}
              value={selectedDepartment}
              onChange={setSelectedDepartment}
            />
            <Select
              label="Shift"
              options={shiftOptions}
              value={selectedShift}
              onChange={setSelectedShift}
            />
            <Select
              label="Week"
              options={weekOptions}
              value={selectedWeek}
              onChange={setSelectedWeek}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="default" iconName="Sparkles" iconPosition="left">
              Generate AI Schedule
            </Button>
            <Button variant="outline" iconName="Download">
              Export Timetable
            </Button>
            <Button variant="outline" iconName="Upload">
              Import Schedule
            </Button>
            <Button variant="outline" iconName="RefreshCw">
              Sync Calendar
            </Button>
            <Button variant="ghost" iconName="Settings">
              Settings
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="border-b border-border">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-smooth ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                  }`}
                >
                  <Icon name={tab?.icon} size={18} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default TimetableManagement;