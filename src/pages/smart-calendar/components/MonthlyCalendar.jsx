import React from 'react';
import Icon from '../../../components/AppIcon';

const MonthlyCalendar = ({ 
  currentDate, 
  events, 
  onDateClick, 
  onEventClick, 
  selectedDate 
}) => {
  const today = new Date();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const firstDayOfWeek = firstDayOfMonth?.getDay();
  const daysInMonth = lastDayOfMonth?.getDate();

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Generate calendar days
  const calendarDays = [];
  
  // Previous month's trailing days
  const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 0);
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    let day = prevMonth?.getDate() - i;
    calendarDays?.push({
      day,
      isCurrentMonth: false,
      isPrevMonth: true,
      date: new Date(prevMonth.getFullYear(), prevMonth.getMonth(), day)
    });
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays?.push({
      day,
      isCurrentMonth: true,
      isPrevMonth: false,
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    });
  }

  // Next month's leading days
  const remainingDays = 42 - calendarDays?.length; // 6 rows × 7 days
  for (let day = 1; day <= remainingDays; day++) {
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, day);
    calendarDays?.push({
      day,
      isCurrentMonth: false,
      isPrevMonth: false,
      date: nextMonth
    });
  }

  const getEventsForDate = (date) => {
    const dateStr = date?.toDateString();
    return events?.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate?.toDateString() === dateStr;
    });
  };

  const isToday = (date) => {
    return date?.toDateString() === today?.toDateString();
  };

  const isSelected = (date) => {
    return selectedDate && date?.toDateString() === selectedDate?.toDateString();
  };

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

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Week Day Headers */}
      <div className="grid grid-cols-7 border-b border-border">
        {weekDays?.map((day) => (
          <div
            key={day}
            className="p-3 text-center text-sm font-medium text-muted-foreground bg-muted"
          >
            {day}
          </div>
        ))}
      </div>
      {/* Calendar Grid */}
      <div className="grid grid-cols-7">
        {calendarDays?.map((calendarDay, index) => {
          const dayEvents = getEventsForDate(calendarDay?.date);
          const isCurrentDay = isToday(calendarDay?.date);
          const isSelectedDay = isSelected(calendarDay?.date);

          return (
            <div
              key={index}
              className={`min-h-[120px] border-r border-b border-border p-2 cursor-pointer transition-smooth hover:bg-muted/50 ${
                !calendarDay?.isCurrentMonth ? 'bg-muted/20' : ''
              } ${isSelectedDay ? 'bg-accent/10 border-accent' : ''}`}
              onClick={() => onDateClick(calendarDay?.date)}
            >
              {/* Date Number */}
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-sm font-medium ${
                    !calendarDay?.isCurrentMonth
                      ? 'text-muted-foreground'
                      : isCurrentDay
                      ? 'text-primary font-semibold' :'text-foreground'
                  }`}
                >
                  {calendarDay?.day}
                </span>
                {isCurrentDay && (
                  <div className="w-2 h-2 bg-primary rounded-full" />
                )}
              </div>
              {/* Events */}
              <div className="space-y-1">
                {dayEvents?.slice(0, 3)?.map((event, eventIndex) => (
                  <div
                    key={eventIndex}
                    onClick={(e) => {
                      e?.stopPropagation();
                      onEventClick(event);
                    }}
                    className={`text-xs p-1 rounded text-white cursor-pointer hover:opacity-80 transition-smooth ${getEventTypeColor(event?.type)}`}
                  >
                    <div className="flex items-center space-x-1">
                      <Icon name={event?.icon} size={10} />
                      <span className="truncate">{event?.title}</span>
                    </div>
                    {event?.time && (
                      <div className="text-xs opacity-90 mt-1">
                        {event?.time}
                      </div>
                    )}
                  </div>
                ))}
                
                {dayEvents?.length > 3 && (
                  <div className="text-xs text-muted-foreground text-center py-1">
                    +{dayEvents?.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthlyCalendar;