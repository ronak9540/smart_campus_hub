import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const UpcomingEvents = ({ events, onEventClick, onViewAll }) => {
  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

  // Filter events for the next 7 days
  const upcomingEvents = events?.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= today && eventDate <= nextWeek;
    })?.sort((a, b) => new Date(a.date) - new Date(b.date))?.slice(0, 5);

  const getEventTypeColor = (type) => {
    const colors = {
      'class': 'bg-blue-500',
      'assignment': 'bg-orange-500',
      'exam': 'bg-red-500',
      'event': 'bg-green-500',
      'personal': 'bg-purple-500'
    };
    return colors?.[type] || 'bg-gray-500';
  };

  const getEventTypeIcon = (type) => {
    const icons = {
      'class': 'BookOpen',
      'assignment': 'FileText',
      'exam': 'ClipboardCheck',
      'event': 'Calendar',
      'personal': 'User'
    };
    return icons?.[type] || 'Calendar';
  };

  const formatEventDate = (date) => {
    const eventDate = new Date(date);
    const isToday = eventDate?.toDateString() === today?.toDateString();
    const isTomorrow = eventDate?.toDateString() === new Date(today.getTime() + 24 * 60 * 60 * 1000)?.toDateString();

    if (isToday) return 'Today';
    if (isTomorrow) return 'Tomorrow';
    
    return eventDate?.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getPriorityLevel = (event) => {
    const eventDate = new Date(event.date);
    const hoursUntil = (eventDate - today) / (1000 * 60 * 60);
    
    if (event?.type === 'exam' && hoursUntil <= 24) return 'high';
    if (event?.type === 'assignment' && hoursUntil <= 48) return 'high';
    if (hoursUntil <= 2) return 'urgent';
    if (hoursUntil <= 24) return 'medium';
    return 'low';
  };

  const getPriorityIndicator = (priority) => {
    const indicators = {
      'urgent': { color: 'bg-red-500', pulse: true },
      'high': { color: 'bg-orange-500', pulse: false },
      'medium': { color: 'bg-yellow-500', pulse: false },
      'low': { color: 'bg-green-500', pulse: false }
    };
    return indicators?.[priority] || indicators?.low;
  };

  if (upcomingEvents?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Upcoming Events</h3>
        </div>
        <div className="text-center py-8">
          <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No upcoming events in the next 7 days</p>
          <p className="text-sm text-muted-foreground mt-2">
            Create an event to get started with your schedule
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Upcoming Events</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onViewAll}
          iconName="ArrowRight"
          iconPosition="right"
          iconSize={14}
        >
          View All
        </Button>
      </div>
      {/* Events List */}
      <div className="divide-y divide-border">
        {upcomingEvents?.map((event, index) => {
          const priority = getPriorityLevel(event);
          const priorityIndicator = getPriorityIndicator(priority);

          return (
            <div
              key={index}
              onClick={() => onEventClick(event)}
              className="p-4 hover:bg-muted/50 transition-smooth cursor-pointer"
            >
              <div className="flex items-start space-x-3">
                {/* Event Type Indicator */}
                <div className="flex-shrink-0 mt-1">
                  <div className={`w-3 h-3 rounded-full ${getEventTypeColor(event?.type)}`} />
                </div>

                {/* Event Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-foreground truncate">
                        {event?.title}
                      </h4>
                      {event?.description && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {event?.description}
                        </p>
                      )}
                      
                      {/* Event Meta */}
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Icon name="Calendar" size={12} />
                          <span>{formatEventDate(event?.date)}</span>
                        </div>
                        
                        {event?.time && (
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <Icon name="Clock" size={12} />
                            <span>{event?.time}</span>
                          </div>
                        )}
                        
                        {event?.location && (
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <Icon name="MapPin" size={12} />
                            <span className="truncate max-w-20">{event?.location}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Priority Indicator */}
                    <div className="flex items-center space-x-2 ml-2">
                      <div
                        className={`w-2 h-2 rounded-full ${priorityIndicator?.color} ${
                          priorityIndicator?.pulse ? 'animate-pulse' : ''
                        }`}
                      />
                      <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-border bg-muted/20">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Showing next 7 days</span>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span>Urgent</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-orange-500" />
              <span>High</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;