import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import CalendarHeader from './components/CalendarHeader';
import CalendarFilters from './components/CalendarFilters';
import MonthlyCalendar from './components/MonthlyCalendar';
import EventModal from './components/EventModal';
import UpcomingEvents from './components/UpcomingEvents';
import WorkloadVisualization from './components/WorkloadVisualization';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const SmartCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [viewMode, setViewMode] = useState('month');
  const [activeFilters, setActiveFilters] = useState(['classes', 'assignments', 'exams', 'events', 'personal']);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalMode, setModalMode] = useState('create');
  const [isFiltersCollapsed, setIsFiltersCollapsed] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(new Date(Date.now() - 15 * 60 * 1000));
  const [isMobileView, setIsMobileView] = useState(false);

  // Mock events data
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Data Structures Lecture',
      description: 'Chapter 5: Binary Trees and Graph Algorithms',
      date: new Date(2025, 8, 12, 9, 0),
      time: '09:00',
      endTime: '10:30',
      type: 'class',
      location: 'Room 301, CS Building',
      icon: 'BookOpen',
      reminder: '15',
      repeat: 'weekly'
    },
    {
      id: '2',
      title: 'Machine Learning Assignment Due',
      description: 'Submit Linear Regression implementation with dataset analysis',
      date: new Date(2025, 8, 13, 23, 59),
      time: '23:59',
      type: 'assignment',
      location: 'Online Submission',
      icon: 'FileText',
      reminder: '60',
      repeat: 'none'
    },
    {
      id: '3',
      title: 'Physics Lab Exam',
      description: 'Practical examination on Optics and Wave Motion',
      date: new Date(2025, 8, 15, 14, 0),
      time: '14:00',
      endTime: '17:00',
      type: 'exam',
      location: 'Physics Lab 2',
      icon: 'ClipboardCheck',
      reminder: '1440',
      repeat: 'none'
    },
    {
      id: '4',
      title: 'Tech Fest 2025',
      description: 'Annual technical festival with competitions and workshops',
      date: new Date(2025, 8, 18, 10, 0),
      time: '10:00',
      endTime: '18:00',
      type: 'event',
      location: 'Main Auditorium',
      icon: 'Calendar',
      reminder: '1440',
      repeat: 'yearly'
    },
    {
      id: '5',
      title: 'Study Group Session',
      description: 'Algorithms and Complexity Theory discussion',
      date: new Date(2025, 8, 14, 16, 0),
      time: '16:00',
      endTime: '18:00',
      type: 'personal',
      location: 'Library Study Room 3',
      icon: 'User',
      reminder: '30',
      repeat: 'weekly'
    },
    {
      id: '6',
      title: 'Database Systems Lecture',
      description: 'SQL Queries and Database Optimization',
      date: new Date(2025, 8, 16, 11, 0),
      time: '11:00',
      endTime: '12:30',
      type: 'class',
      location: 'Room 205, CS Building',
      icon: 'BookOpen',
      reminder: '15',
      repeat: 'weekly'
    },
    {
      id: '7',
      title: 'Web Development Project Demo',
      description: 'Final project presentation for Web Technologies course',
      date: new Date(2025, 8, 20, 15, 0),
      time: '15:00',
      endTime: '16:30',
      type: 'assignment',
      location: 'Room 401, CS Building',
      icon: 'FileText',
      reminder: '120',
      repeat: 'none'
    },
    {
      id: '8',
      title: 'Career Counseling Session',
      description: 'Individual career guidance and placement preparation',
      date: new Date(2025, 8, 17, 13, 0),
      time: '13:00',
      endTime: '14:00',
      type: 'personal',
      location: 'Career Services Office',
      icon: 'User',
      reminder: '60',
      repeat: 'none'
    }
  ]);

  // Check for mobile view
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 1024);
    };

    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  // Filter events based on active filters
  const filteredEvents = events?.filter(event => activeFilters?.includes(event?.type));

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(today);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setModalMode('edit');
    setIsEventModalOpen(true);
  };

  const handleCreateEvent = () => {
    setSelectedEvent(null);
    setModalMode('create');
    setIsEventModalOpen(true);
  };

  const handleFilterChange = (filterId) => {
    if (filterId === 'all') {
      setActiveFilters(['classes', 'assignments', 'exams', 'events', 'personal']);
    } else if (filterId === 'none') {
      setActiveFilters([]);
    } else {
      setActiveFilters(prev => 
        prev?.includes(filterId) 
          ? prev?.filter(id => id !== filterId)
          : [...prev, filterId]
      );
    }
  };

  const handleSyncCalendar = () => {
    setLastSyncTime(new Date());
    // Simulate sync process
    setTimeout(() => {
      console.log('Calendar synced successfully');
    }, 1000);
  };

  const handleSaveEvent = (eventData) => {
    if (modalMode === 'create') {
      setEvents(prev => [...prev, eventData]);
    } else {
      setEvents(prev => prev?.map(event => 
        event?.id === eventData?.id ? eventData : event
      ));
    }
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(prev => prev?.filter(event => event?.id !== eventId));
  };

  const handleViewAllEvents = () => {
    // Navigate to detailed events view
    console.log('Navigate to all events view');
  };

  return (
    <>
      <Helmet>
        <title>Smart Calendar - Smart Campus Hub</title>
        <meta name="description" content="Unified scheduling with automatic synchronization across academic activities, assignments, and institutional events" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Smart Calendar</h1>
                <p className="text-muted-foreground mt-1">
                  Unified scheduling with automatic synchronization across all academic activities
                </p>
              </div>
              
              {/* Quick Actions */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSyncCalendar}
                  iconName="RefreshCw"
                  iconPosition="left"
                  iconSize={16}
                >
                  <span className="hidden sm:inline">Sync</span>
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleCreateEvent}
                  iconName="Plus"
                  iconPosition="left"
                  iconSize={16}
                >
                  <span className="hidden sm:inline">Create Event</span>
                  <span className="sm:hidden">Add</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Calendar Header */}
          <CalendarHeader
            currentDate={currentDate}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            onToday={handleToday}
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
            onCreateEvent={handleCreateEvent}
          />

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Filters */}
              <CalendarFilters
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
                onSyncCalendar={handleSyncCalendar}
                lastSyncTime={lastSyncTime}
                isCollapsed={isFiltersCollapsed}
                onToggleCollapse={() => setIsFiltersCollapsed(!isFiltersCollapsed)}
              />

              {/* Upcoming Events - Hidden on mobile when calendar is shown */}
              {(!isMobileView || viewMode !== 'month') && (
                <UpcomingEvents
                  events={filteredEvents}
                  onEventClick={handleEventClick}
                  onViewAll={handleViewAllEvents}
                />
              )}
            </div>

            {/* Main Calendar Area */}
            <div className="lg:col-span-3 space-y-6">
              {/* Calendar View */}
              {viewMode === 'month' && (
                <MonthlyCalendar
                  currentDate={currentDate}
                  events={filteredEvents}
                  onDateClick={handleDateClick}
                  onEventClick={handleEventClick}
                  selectedDate={selectedDate}
                />
              )}

              {/* Workload Visualization */}
              <WorkloadVisualization
                events={filteredEvents}
                currentDate={currentDate}
              />

              {/* Mobile Upcoming Events */}
              {isMobileView && viewMode === 'month' && (
                <UpcomingEvents
                  events={filteredEvents}
                  onEventClick={handleEventClick}
                  onViewAll={handleViewAllEvents}
                />
              )}
            </div>
          </div>

          {/* Integration Status */}
          <div className="mt-8 bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="Zap" size={20} className="text-primary" />
                <div>
                  <h3 className="text-sm font-medium text-foreground">Calendar Integration</h3>
                  <p className="text-xs text-muted-foreground">
                    Synced with Google Calendar and Outlook
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full" />
                <span className="text-xs text-muted-foreground">Connected</span>
              </div>
            </div>
          </div>
        </main>

        {/* Event Modal */}
        <EventModal
          isOpen={isEventModalOpen}
          onClose={() => setIsEventModalOpen(false)}
          event={selectedEvent}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
          mode={modalMode}
        />
      </div>
    </>
  );
};

export default SmartCalendar;