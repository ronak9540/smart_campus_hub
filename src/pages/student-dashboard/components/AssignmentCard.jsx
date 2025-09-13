import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AssignmentCard = ({ assignments }) => {
  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getPriorityColor = (daysLeft) => {
    if (daysLeft <= 1) return 'text-error';
    if (daysLeft <= 3) return 'text-warning';
    return 'text-success';
  };

  const getPriorityBg = (daysLeft) => {
    if (daysLeft <= 1) return 'bg-error/10 border-error/20';
    if (daysLeft <= 3) return 'bg-warning/10 border-warning/20';
    return 'bg-success/10 border-success/20';
  };

  const urgentAssignments = assignments?.filter(assignment => getDaysUntilDue(assignment?.dueDate) <= 3);
  const upcomingAssignments = assignments?.filter(assignment => getDaysUntilDue(assignment?.dueDate) > 3);

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Assignments</h3>
        <div className="flex items-center space-x-2">
          {urgentAssignments?.length > 0 && (
            <span className="bg-error text-error-foreground text-xs px-2 py-1 rounded-full">
              {urgentAssignments?.length} urgent
            </span>
          )}
          <Icon name="BookOpen" size={20} className="text-muted-foreground" />
        </div>
      </div>
      <div className="space-y-4">
        {assignments?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-2" />
            <p className="text-muted-foreground">All assignments completed!</p>
          </div>
        ) : (
          <>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {assignments?.slice(0, 4)?.map((assignment) => {
                const daysLeft = getDaysUntilDue(assignment?.dueDate);
                return (
                  <div key={assignment?.id} className={`border rounded-lg p-4 ${getPriorityBg(daysLeft)}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{assignment?.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{assignment?.subject}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="flex items-center space-x-1 text-sm text-muted-foreground">
                            <Icon name="Calendar" size={14} />
                            <span>Due: {new Date(assignment.dueDate)?.toLocaleDateString()}</span>
                          </span>
                          <span className={`text-sm font-medium ${getPriorityColor(daysLeft)}`}>
                            {daysLeft === 0 ? 'Due today' : 
                             daysLeft === 1 ? 'Due tomorrow' : 
                             daysLeft < 0 ? 'Overdue' : 
                             `${daysLeft} days left`}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        {assignment?.status === 'submitted' ? (
                          <Icon name="CheckCircle" size={20} className="text-success" />
                        ) : (
                          <Icon name="Clock" size={20} className="text-warning" />
                        )}
                      </div>
                    </div>
                    {assignment?.status !== 'submitted' && (
                      <div className="flex space-x-2 mt-3">
                        <Button variant="outline" size="xs" iconName="Download" iconPosition="left">
                          Download
                        </Button>
                        <Button variant="default" size="xs" iconName="Upload" iconPosition="left">
                          Submit
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {assignments?.length > 4 && (
              <div className="text-center pt-2 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  +{assignments?.length - 4} more assignments
                </p>
              </div>
            )}
          </>
        )}

        <Link to="/academic-interactions">
          <Button variant="outline" size="sm" fullWidth iconName="BookOpen" iconPosition="left">
            View All Assignments
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AssignmentCard;