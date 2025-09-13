import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TimetableGrid = ({ selectedWeek, selectedDepartment, selectedShift, onScheduleChange }) => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [conflicts, setConflicts] = useState([]);

  const timeSlots = [
    '08:00 - 09:00',
    '09:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '12:00 - 13:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00'
  ];

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const mockSchedule = {
    'Monday': {
      '08:00 - 09:00': { subject: 'Data Structures', faculty: 'Dr. Smith', room: 'CS-101', batch: 'CS-A' },
      '09:00 - 10:00': { subject: 'Algorithms', faculty: 'Prof. Johnson', room: 'CS-102', batch: 'CS-B' },
      '10:00 - 11:00': null,
      '11:00 - 12:00': { subject: 'Database Systems', faculty: 'Dr. Brown', room: 'CS-103', batch: 'CS-A' },
      '12:00 - 13:00': null,
      '13:00 - 14:00': { subject: 'Web Development', faculty: 'Ms. Davis', room: 'CS-104', batch: 'CS-C' },
      '14:00 - 15:00': { subject: 'Machine Learning', faculty: 'Dr. Wilson', room: 'CS-105', batch: 'CS-B' },
      '15:00 - 16:00': null,
      '16:00 - 17:00': { subject: 'Software Engineering', faculty: 'Prof. Miller', room: 'CS-106', batch: 'CS-A' }
    },
    'Tuesday': {
      '08:00 - 09:00': { subject: 'Operating Systems', faculty: 'Dr. Taylor', room: 'CS-107', batch: 'CS-B' },
      '09:00 - 10:00': { subject: 'Computer Networks', faculty: 'Prof. Anderson', room: 'CS-108', batch: 'CS-A' },
      '10:00 - 11:00': { subject: 'Data Structures', faculty: 'Dr. Smith', room: 'CS-101', batch: 'CS-C' },
      '11:00 - 12:00': null,
      '12:00 - 13:00': null,
      '13:00 - 14:00': { subject: 'Algorithms', faculty: 'Prof. Johnson', room: 'CS-102', batch: 'CS-A' },
      '14:00 - 15:00': { subject: 'Database Systems', faculty: 'Dr. Brown', room: 'CS-103', batch: 'CS-B' },
      '15:00 - 16:00': { subject: 'Web Development', faculty: 'Ms. Davis', room: 'CS-104', batch: 'CS-C' },
      '16:00 - 17:00': null
    },
    'Wednesday': {
      '08:00 - 09:00': { subject: 'Machine Learning', faculty: 'Dr. Wilson', room: 'CS-105', batch: 'CS-A' },
      '09:00 - 10:00': { subject: 'Software Engineering', faculty: 'Prof. Miller', room: 'CS-106', batch: 'CS-B' },
      '10:00 - 11:00': { subject: 'Operating Systems', faculty: 'Dr. Taylor', room: 'CS-107', batch: 'CS-C' },
      '11:00 - 12:00': { subject: 'Computer Networks', faculty: 'Prof. Anderson', room: 'CS-108', batch: 'CS-A' },
      '12:00 - 13:00': null,
      '13:00 - 14:00': null,
      '14:00 - 15:00': { subject: 'Data Structures', faculty: 'Dr. Smith', room: 'CS-101', batch: 'CS-B' },
      '15:00 - 16:00': { subject: 'Algorithms', faculty: 'Prof. Johnson', room: 'CS-102', batch: 'CS-C' },
      '16:00 - 17:00': { subject: 'Database Systems', faculty: 'Dr. Brown', room: 'CS-103', batch: 'CS-A' }
    },
    'Thursday': {
      '08:00 - 09:00': { subject: 'Web Development', faculty: 'Ms. Davis', room: 'CS-104', batch: 'CS-B' },
      '09:00 - 10:00': { subject: 'Machine Learning', faculty: 'Dr. Wilson', room: 'CS-105', batch: 'CS-C' },
      '10:00 - 11:00': { subject: 'Software Engineering', faculty: 'Prof. Miller', room: 'CS-106', batch: 'CS-A' },
      '11:00 - 12:00': { subject: 'Operating Systems', faculty: 'Dr. Taylor', room: 'CS-107', batch: 'CS-B' },
      '12:00 - 13:00': null,
      '13:00 - 14:00': { subject: 'Computer Networks', faculty: 'Prof. Anderson', room: 'CS-108', batch: 'CS-C' },
      '14:00 - 15:00': null,
      '15:00 - 16:00': { subject: 'Data Structures', faculty: 'Dr. Smith', room: 'CS-101', batch: 'CS-A' },
      '16:00 - 17:00': { subject: 'Algorithms', faculty: 'Prof. Johnson', room: 'CS-102', batch: 'CS-B' }
    },
    'Friday': {
      '08:00 - 09:00': { subject: 'Database Systems', faculty: 'Dr. Brown', room: 'CS-103', batch: 'CS-C' },
      '09:00 - 10:00': { subject: 'Web Development', faculty: 'Ms. Davis', room: 'CS-104', batch: 'CS-A' },
      '10:00 - 11:00': { subject: 'Machine Learning', faculty: 'Dr. Wilson', room: 'CS-105', batch: 'CS-B' },
      '11:00 - 12:00': { subject: 'Software Engineering', faculty: 'Prof. Miller', room: 'CS-106', batch: 'CS-C' },
      '12:00 - 13:00': null,
      '13:00 - 14:00': { subject: 'Operating Systems', faculty: 'Dr. Taylor', room: 'CS-107', batch: 'CS-A' },
      '14:00 - 15:00': { subject: 'Computer Networks', faculty: 'Prof. Anderson', room: 'CS-108', batch: 'CS-B' },
      '15:00 - 16:00': null,
      '16:00 - 17:00': null
    },
    'Saturday': {
      '08:00 - 09:00': null,
      '09:00 - 10:00': { subject: 'Lab Session', faculty: 'Dr. Smith', room: 'Lab-1', batch: 'CS-A' },
      '10:00 - 11:00': { subject: 'Lab Session', faculty: 'Dr. Smith', room: 'Lab-1', batch: 'CS-A' },
      '11:00 - 12:00': { subject: 'Lab Session', faculty: 'Prof. Johnson', room: 'Lab-2', batch: 'CS-B' },
      '12:00 - 13:00': { subject: 'Lab Session', faculty: 'Prof. Johnson', room: 'Lab-2', batch: 'CS-B' },
      '13:00 - 14:00': null,
      '14:00 - 15:00': { subject: 'Lab Session', faculty: 'Dr. Brown', room: 'Lab-3', batch: 'CS-C' },
      '15:00 - 16:00': { subject: 'Lab Session', faculty: 'Dr. Brown', room: 'Lab-3', batch: 'CS-C' },
      '16:00 - 17:00': null
    }
  };

  const handleDragStart = (e, day, timeSlot, scheduleItem) => {
    setDraggedItem({ day, timeSlot, scheduleItem });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetDay, targetTimeSlot) => {
    e?.preventDefault();
    if (draggedItem && onScheduleChange) {
      onScheduleChange(draggedItem, { day: targetDay, timeSlot: targetTimeSlot });
    }
    setDraggedItem(null);
  };

  const getConflictStatus = (day, timeSlot) => {
    return conflicts?.some(conflict => 
      conflict?.day === day && conflict?.timeSlot === timeSlot
    );
  };

  const renderScheduleCell = (day, timeSlot) => {
    const scheduleItem = mockSchedule?.[day]?.[timeSlot];
    const hasConflict = getConflictStatus(day, timeSlot);

    if (!scheduleItem) {
      return (
        <div
          className="h-16 border border-border rounded-md bg-muted/30 hover:bg-muted/50 transition-smooth cursor-pointer flex items-center justify-center"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, day, timeSlot)}
        >
          <Icon name="Plus" size={16} className="text-muted-foreground" />
        </div>
      );
    }

    return (
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, day, timeSlot, scheduleItem)}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, day, timeSlot)}
        className={`h-16 border rounded-md p-2 cursor-move transition-smooth ${
          hasConflict 
            ? 'border-error bg-error/10 hover:bg-error/20' :'border-primary bg-primary/10 hover:bg-primary/20'
        }`}
      >
        <div className="text-xs font-medium text-foreground truncate">
          {scheduleItem?.subject}
        </div>
        <div className="text-xs text-muted-foreground truncate">
          {scheduleItem?.faculty}
        </div>
        <div className="text-xs text-muted-foreground truncate">
          {scheduleItem?.room} • {scheduleItem?.batch}
        </div>
        {hasConflict && (
          <Icon name="AlertTriangle" size={12} className="text-error absolute top-1 right-1" />
        )}
      </div>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Weekly Timetable</h3>
            <p className="text-sm text-muted-foreground">
              {selectedDepartment} • {selectedShift} • Week of {selectedWeek}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Download">
              Export
            </Button>
            <Button variant="outline" size="sm" iconName="RefreshCw">
              Refresh
            </Button>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Header */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              <div className="text-sm font-medium text-muted-foreground p-2">Time</div>
              {weekDays?.map((day) => (
                <div key={day} className="text-sm font-medium text-foreground p-2 text-center">
                  {day}
                </div>
              ))}
            </div>

            {/* Timetable Grid */}
            <div className="space-y-2">
              {timeSlots?.map((timeSlot) => (
                <div key={timeSlot} className="grid grid-cols-7 gap-2">
                  <div className="text-xs text-muted-foreground p-2 flex items-center">
                    {timeSlot}
                  </div>
                  {weekDays?.map((day) => (
                    <div key={`${day}-${timeSlot}`} className="relative">
                      {renderScheduleCell(day, timeSlot)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center space-x-6 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary/20 border border-primary rounded"></div>
              <span className="text-muted-foreground">Scheduled Class</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-error/20 border border-error rounded"></div>
              <span className="text-muted-foreground">Conflict Detected</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-muted/50 border border-border rounded"></div>
              <span className="text-muted-foreground">Available Slot</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimetableGrid;