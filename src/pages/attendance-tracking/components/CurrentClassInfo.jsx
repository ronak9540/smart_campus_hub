import React from 'react';
import Icon from '../../../components/AppIcon';

const CurrentClassInfo = ({ classInfo }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'ongoing':
        return 'bg-success text-success-foreground';
      case 'upcoming':
        return 'bg-warning text-warning-foreground';
      case 'ended':
        return 'bg-error text-error-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">Current Class</h2>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(classInfo?.status)}`}>
          {classInfo?.status?.charAt(0)?.toUpperCase() + classInfo?.status?.slice(1)}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Icon name="BookOpen" size={20} className="text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Subject</p>
              <p className="font-medium text-foreground">{classInfo?.subject}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Icon name="User" size={20} className="text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Faculty</p>
              <p className="font-medium text-foreground">{classInfo?.faculty}</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Icon name="Clock" size={20} className="text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Time</p>
              <p className="font-medium text-foreground">{classInfo?.time}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Icon name="MapPin" size={20} className="text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-medium text-foreground">{classInfo?.location}</p>
            </div>
          </div>
        </div>
      </div>
      {classInfo?.attendanceWindow && (
        <div className="mt-4 p-3 bg-muted rounded-md">
          <div className="flex items-center space-x-2">
            <Icon name="Timer" size={16} className="text-warning" />
            <p className="text-sm text-foreground">
              <span className="font-medium">Attendance Window:</span> {classInfo?.attendanceWindow}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentClassInfo;