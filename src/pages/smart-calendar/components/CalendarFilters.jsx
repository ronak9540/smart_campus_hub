import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CalendarFilters = ({ 
  activeFilters, 
  onFilterChange, 
  onSyncCalendar, 
  lastSyncTime,
  isCollapsed,
  onToggleCollapse 
}) => {
  const filterOptions = [
    { id: 'classes', label: 'Classes', color: 'bg-blue-500', count: 24 },
    { id: 'assignments', label: 'Assignments', color: 'bg-orange-500', count: 8 },
    { id: 'exams', label: 'Exams', color: 'bg-red-500', count: 3 },
    { id: 'events', label: 'College Events', color: 'bg-green-500', count: 5 },
    { id: 'personal', label: 'Personal', color: 'bg-purple-500', count: 12 }
  ];

  const formatLastSync = () => {
    if (!lastSyncTime) return 'Never';
    const now = new Date();
    const diff = now - lastSyncTime;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return lastSyncTime?.toLocaleDateString();
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={18} className="text-muted-foreground" />
          <h3 className="font-medium text-foreground">Filters</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="w-6 h-6"
        >
          <Icon 
            name={isCollapsed ? "ChevronDown" : "ChevronUp"} 
            size={16} 
          />
        </Button>
      </div>
      {/* Filter Content */}
      {!isCollapsed && (
        <div className="p-4 space-y-4">
          {/* Event Type Filters */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Event Types</h4>
            <div className="space-y-2">
              {filterOptions?.map((filter) => (
                <label
                  key={filter?.id}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-muted transition-smooth cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={activeFilters?.includes(filter?.id)}
                      onChange={() => onFilterChange(filter?.id)}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                    />
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${filter?.color}`} />
                      <span className="text-sm text-foreground">{filter?.label}</span>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    {filter?.count}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="pt-4 border-t border-border space-y-3">
            <h4 className="text-sm font-medium text-foreground">Quick Actions</h4>
            
            {/* Sync Calendar */}
            <Button
              variant="outline"
              size="sm"
              onClick={onSyncCalendar}
              iconName="RefreshCw"
              iconPosition="left"
              iconSize={14}
              fullWidth
            >
              Sync Calendar
            </Button>
            
            <div className="text-xs text-muted-foreground text-center">
              Last sync: {formatLastSync()}
            </div>

            {/* Filter Actions */}
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onFilterChange('all')}
                className="flex-1 text-xs"
              >
                Select All
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onFilterChange('none')}
                className="flex-1 text-xs"
              >
                Clear All
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarFilters;