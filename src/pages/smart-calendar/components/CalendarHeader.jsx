import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CalendarHeader = ({ 
  currentDate, 
  onPrevMonth, 
  onNextMonth, 
  onToday, 
  viewMode, 
  onViewModeChange,
  onCreateEvent 
}) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const formatHeaderDate = () => {
    const month = monthNames?.[currentDate?.getMonth()];
    const year = currentDate?.getFullYear();
    return `${month} ${year}`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Date Navigation */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={onPrevMonth}
              className="w-8 h-8"
            >
              <Icon name="ChevronLeft" size={16} />
            </Button>
            <h2 className="text-xl font-semibold text-foreground min-w-[180px] text-center">
              {formatHeaderDate()}
            </h2>
            <Button
              variant="outline"
              size="icon"
              onClick={onNextMonth}
              className="w-8 h-8"
            >
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToday}
            className="text-primary hover:text-primary"
          >
            Today
          </Button>
        </div>

        {/* View Controls and Actions */}
        <div className="flex items-center space-x-3">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === 'month' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('month')}
              className="px-3 py-1 text-xs"
            >
              Month
            </Button>
            <Button
              variant={viewMode === 'week' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('week')}
              className="px-3 py-1 text-xs"
            >
              Week
            </Button>
            <Button
              variant={viewMode === 'day' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('day')}
              className="px-3 py-1 text-xs"
            >
              Day
            </Button>
          </div>

          {/* Create Event Button */}
          <Button
            variant="default"
            size="sm"
            onClick={onCreateEvent}
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
  );
};

export default CalendarHeader;