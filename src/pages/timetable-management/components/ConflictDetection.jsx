import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConflictDetection = ({ conflicts, onResolveConflict }) => {
  const [selectedConflict, setSelectedConflict] = useState(null);

  const mockConflicts = [
    {
      id: 1,
      type: 'room_double_booking',
      severity: 'high',
      title: 'Room Double Booking',
      description: 'CS-101 is booked for two different classes at the same time',
      details: {
        timeSlot: 'Monday 10:00-11:00',
        room: 'CS-101',
        conflictingClasses: [
          { subject: 'Data Structures', faculty: 'Dr. Smith', batch: 'CS-A' },
          { subject: 'Algorithms', faculty: 'Prof. Johnson', batch: 'CS-B' }
        ]
      },
      suggestions: [
        { action: 'Move to CS-102', impact: 'No impact on schedule' },
        { action: 'Reschedule to 11:00-12:00', impact: 'Minor adjustment needed' }
      ],
      timestamp: '2025-09-11T09:30:00Z'
    },
    {
      id: 2,
      type: 'faculty_unavailable',
      severity: 'medium',
      title: 'Faculty Unavailability',
      description: 'Dr. Wilson is scheduled during their unavailable hours',
      details: {
        timeSlot: 'Tuesday 08:00-09:00',
        faculty: 'Dr. Wilson',
        subject: 'Machine Learning',
        batch: 'CS-B',
        reason: 'Faculty has marked this time as unavailable'
      },
      suggestions: [
        { action: 'Move to 14:00-15:00', impact: 'Preferred time slot' },
        { action: 'Assign substitute faculty', impact: 'May affect course continuity' }
      ],
      timestamp: '2025-09-11T09:15:00Z'
    },
    {
      id: 3,
      type: 'student_overload',
      severity: 'low',
      title: 'Student Schedule Overload',
      description: 'CS-A batch has 7 consecutive hours without break',
      details: {
        timeSlot: 'Wednesday 09:00-16:00',
        batch: 'CS-A',
        consecutiveHours: 7,
        subjects: ['Data Structures', 'Algorithms', 'Database Systems', 'Web Development', 'Machine Learning', 'Software Engineering', 'Operating Systems']
      },
      suggestions: [
        { action: 'Add 1-hour break at 12:00', impact: 'Improves student well-being' },
        { action: 'Redistribute classes across days', impact: 'Better workload balance' }
      ],
      timestamp: '2025-09-11T08:45:00Z'
    },
    {
      id: 4,
      type: 'resource_conflict',
      severity: 'high',
      title: 'Lab Equipment Conflict',
      description: 'Lab-1 equipment required by two different sessions',
      details: {
        timeSlot: 'Thursday 14:00-16:00',
        resource: 'Lab-1 (Advanced Computing Lab)',
        conflictingClasses: [
          { subject: 'Machine Learning Lab', faculty: 'Dr. Wilson', batch: 'CS-B' },
          { subject: 'Data Science Lab', faculty: 'Prof. Miller', batch: 'CS-C' }
        ]
      },
      suggestions: [
        { action: 'Move ML Lab to Lab-2', impact: 'Equipment compatibility check needed' },
        { action: 'Reschedule Data Science Lab', impact: 'Minimal schedule impact' }
      ],
      timestamp: '2025-09-11T08:30:00Z'
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'text-error border-error bg-error/5';
      case 'medium':
        return 'text-warning border-warning bg-warning/5';
      case 'low':
        return 'text-accent border-accent bg-accent/5';
      default:
        return 'text-muted-foreground border-border bg-muted/5';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high':
        return 'AlertTriangle';
      case 'medium':
        return 'AlertCircle';
      case 'low':
        return 'Info';
      default:
        return 'Bell';
    }
  };

  const handleResolveConflict = (conflictId, suggestion) => {
    if (onResolveConflict) {
      onResolveConflict(conflictId, suggestion);
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days ago`;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-error rounded-md flex items-center justify-center">
              <Icon name="AlertTriangle" size={18} color="white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Conflict Detection</h3>
              <p className="text-sm text-muted-foreground">
                {mockConflicts?.length} conflicts detected
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="RefreshCw">
              Refresh
            </Button>
            <Button variant="outline" size="sm" iconName="Settings">
              Configure
            </Button>
          </div>
        </div>
      </div>
      <div className="p-6">
        {mockConflicts?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
            <h4 className="text-lg font-medium text-foreground mb-2">No Conflicts Detected</h4>
            <p className="text-sm text-muted-foreground">
              Your timetable is optimized and conflict-free.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {mockConflicts?.map((conflict) => (
              <div
                key={conflict?.id}
                className={`border rounded-lg p-4 ${getSeverityColor(conflict?.severity)}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <Icon
                      name={getSeverityIcon(conflict?.severity)}
                      size={20}
                      className={conflict?.severity === 'high' ? 'text-error' : 
                                conflict?.severity === 'medium' ? 'text-warning' : 'text-accent'}
                    />
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">
                        {conflict?.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {conflict?.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Detected {formatTimeAgo(conflict?.timestamp)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        conflict?.severity === 'high' ?'bg-error text-error-foreground'
                          : conflict?.severity === 'medium' ?'bg-warning text-warning-foreground' :'bg-accent text-accent-foreground'
                      }`}
                    >
                      {conflict?.severity?.toUpperCase()}
                    </span>
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName={selectedConflict === conflict?.id ? "ChevronUp" : "ChevronDown"}
                      onClick={() => setSelectedConflict(
                        selectedConflict === conflict?.id ? null : conflict?.id
                      )}
                    >
                      Details
                    </Button>
                  </div>
                </div>

                {selectedConflict === conflict?.id && (
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Conflict Details */}
                      <div>
                        <h5 className="text-sm font-medium text-foreground mb-2">
                          Conflict Details
                        </h5>
                        <div className="space-y-2 text-sm">
                          {conflict?.details?.timeSlot && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Time:</span>
                              <span className="text-foreground">{conflict?.details?.timeSlot}</span>
                            </div>
                          )}
                          {conflict?.details?.room && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Room:</span>
                              <span className="text-foreground">{conflict?.details?.room}</span>
                            </div>
                          )}
                          {conflict?.details?.faculty && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Faculty:</span>
                              <span className="text-foreground">{conflict?.details?.faculty}</span>
                            </div>
                          )}
                          {conflict?.details?.batch && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Batch:</span>
                              <span className="text-foreground">{conflict?.details?.batch}</span>
                            </div>
                          )}
                        </div>

                        {conflict?.details?.conflictingClasses && (
                          <div className="mt-3">
                            <h6 className="text-xs font-medium text-foreground mb-2">
                              Conflicting Classes:
                            </h6>
                            <div className="space-y-1">
                              {conflict?.details?.conflictingClasses?.map((cls, index) => (
                                <div key={index} className="text-xs text-muted-foreground">
                                  {cls?.subject} - {cls?.faculty} ({cls?.batch})
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Suggested Resolutions */}
                      <div>
                        <h5 className="text-sm font-medium text-foreground mb-2">
                          Suggested Resolutions
                        </h5>
                        <div className="space-y-2">
                          {conflict?.suggestions?.map((suggestion, index) => (
                            <div
                              key={index}
                              className="p-3 bg-background rounded-md border border-border"
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium text-foreground">
                                  {suggestion?.action}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="xs"
                                  onClick={() => handleResolveConflict(conflict?.id, suggestion)}
                                >
                                  Apply
                                </Button>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {suggestion?.impact}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConflictDetection;