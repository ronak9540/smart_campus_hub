import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TimetableCard = ({ todaySchedule }) => {
  const getCurrentClass = () => {
    const now = new Date();
    const currentTime = now?.getHours() * 60 + now?.getMinutes();
    
    return todaySchedule?.find(cls => {
      const [startHour, startMin] = cls?.startTime?.split(':')?.map(Number);
      const [endHour, endMin] = cls?.endTime?.split(':')?.map(Number);
      const startMinutes = startHour * 60 + startMin;
      const endMinutes = endHour * 60 + endMin;
      
      return currentTime >= startMinutes && currentTime <= endMinutes;
    });
  };

  const getNextClass = () => {
    const now = new Date();
    const currentTime = now?.getHours() * 60 + now?.getMinutes();
    
    return todaySchedule?.find(cls => {
      const [startHour, startMin] = cls?.startTime?.split(':')?.map(Number);
      const startMinutes = startHour * 60 + startMin;
      
      return currentTime < startMinutes;
    });
  };

  const currentClass = getCurrentClass();
  const nextClass = getNextClass();

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Today's Schedule</h3>
        <Icon name="Clock" size={20} className="text-muted-foreground" />
      </div>
      <div className="space-y-4">
        {currentClass && (
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-sm font-medium text-accent">Current Class</span>
            </div>
            <h4 className="font-semibold text-foreground">{currentClass?.subject}</h4>
            <p className="text-sm text-muted-foreground">{currentClass?.faculty}</p>
            <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center space-x-1">
                <Icon name="Clock" size={14} />
                <span>{currentClass?.startTime} - {currentClass?.endTime}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Icon name="MapPin" size={14} />
                <span>{currentClass?.room}</span>
              </span>
            </div>
          </div>
        )}

        {nextClass && (
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Next Class</span>
            </div>
            <h4 className="font-semibold text-foreground">{nextClass?.subject}</h4>
            <p className="text-sm text-muted-foreground">{nextClass?.faculty}</p>
            <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center space-x-1">
                <Icon name="Clock" size={14} />
                <span>{nextClass?.startTime} - {nextClass?.endTime}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Icon name="MapPin" size={14} />
                <span>{nextClass?.room}</span>
              </span>
            </div>
          </div>
        )}

        {!currentClass && !nextClass && (
          <div className="text-center py-8">
            <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">No more classes today</p>
          </div>
        )}

        <div className="space-y-2">
          <h5 className="text-sm font-medium text-foreground">All Classes Today</h5>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {todaySchedule?.map((cls, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-foreground">{cls?.subject}</span>
                <span className="text-muted-foreground">{cls?.startTime}</span>
              </div>
            ))}
          </div>
        </div>

        <Link to="/timetable-management">
          <Button variant="outline" size="sm" fullWidth iconName="Calendar" iconPosition="left">
            View Full Timetable
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TimetableCard;