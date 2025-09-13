import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AssignmentCard = ({ assignment, userRole, onViewDetails, onSubmit, onGrade }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'submitted':
        return 'bg-success text-success-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      case 'overdue':
        return 'bg-error text-error-foreground';
      case 'graded':
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = getDaysRemaining(assignment?.dueDate);

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevated transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-foreground">{assignment?.title}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment?.status)}`}>
              {assignment?.status}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{assignment?.subject} • {assignment?.instructor}</p>
          <p className="text-sm text-foreground line-clamp-2">{assignment?.description}</p>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <Icon name="Calendar" size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Due: {formatDate(assignment?.dueDate)}</span>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {daysRemaining > 0 ? `${daysRemaining} days left` : 
               daysRemaining === 0 ? 'Due today' : 
               `${Math.abs(daysRemaining)} days overdue`}
            </span>
          </div>
          {assignment?.points && (
            <div className="flex items-center space-x-1">
              <Icon name="Award" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{assignment?.points} points</span>
            </div>
          )}
        </div>
        {assignment?.grade && (
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={16} className="text-accent" />
            <span className="text-sm font-medium text-accent">{assignment?.grade}</span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {assignment?.attachments && assignment?.attachments?.length > 0 && (
            <div className="flex items-center space-x-1">
              <Icon name="Paperclip" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{assignment?.attachments?.length} files</span>
            </div>
          )}
          {assignment?.submissionCount && userRole === 'teacher' && (
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{assignment?.submissionCount} submissions</span>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => onViewDetails(assignment?.id)}>
            View Details
          </Button>
          {userRole === 'student' && assignment?.status !== 'submitted' && assignment?.status !== 'graded' && (
            <Button variant="default" size="sm" onClick={() => onSubmit(assignment?.id)}>
              Submit
            </Button>
          )}
          {userRole === 'teacher' && assignment?.submissionCount > 0 && (
            <Button variant="default" size="sm" onClick={() => onGrade(assignment?.id)}>
              Grade
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;