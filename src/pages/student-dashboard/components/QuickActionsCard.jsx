import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsCard = ({ feeStatus }) => {
  const quickActions = [
    {
      id: 'qr-scan',
      title: 'QR Attendance',
      description: 'Scan QR code for attendance',
      icon: 'QrCode',
      color: 'bg-accent text-accent-foreground',
      action: () => {
        // Mock QR scanner functionality
        alert('QR Scanner would open here');
      }
    },
    {
      id: 'assignments',
      title: 'Submit Assignment',
      description: 'Upload your assignments',
      icon: 'Upload',
      color: 'bg-success text-success-foreground',
      link: '/academic-interactions'
    },
    {
      id: 'calendar',
      title: 'My Calendar',
      description: 'View schedule & events',
      icon: 'Calendar',
      color: 'bg-warning text-warning-foreground',
      link: '/smart-calendar'
    },
    {
      id: 'services',
      title: 'Campus Services',
      description: 'Library, transport & more',
      icon: 'Building',
      color: 'bg-secondary text-secondary-foreground',
      link: '/campus-services'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
        <Icon name="Zap" size={20} className="text-muted-foreground" />
      </div>
      <div className="space-y-4">
        {/* Fee Status Alert */}
        {feeStatus && !feeStatus?.paid && (
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Icon name="AlertTriangle" size={20} className="text-warning" />
              <div className="flex-1">
                <h4 className="font-medium text-foreground">Fee Payment Due</h4>
                <p className="text-sm text-muted-foreground">
                  Amount: ${feeStatus?.amount} • Due: {new Date(feeStatus.dueDate)?.toLocaleDateString()}
                </p>
              </div>
              <Button variant="warning" size="sm" iconName="CreditCard" iconPosition="left">
                Pay Now
              </Button>
            </div>
          </div>
        )}

        {/* Quick Action Grid */}
        <div className="grid grid-cols-2 gap-3">
          {quickActions?.map((action) => {
            const ActionComponent = action?.link ? Link : 'button';
            const actionProps = action?.link ? { to: action?.link } : { onClick: action?.action };

            return (
              <ActionComponent
                key={action?.id}
                {...actionProps}
                className="group p-4 rounded-lg border border-border hover:border-accent/50 transition-smooth bg-background hover:bg-muted"
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className={`w-12 h-12 rounded-lg ${action?.color} flex items-center justify-center group-hover:scale-105 transition-smooth`}>
                    <Icon name={action?.icon} size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground text-sm">{action?.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{action?.description}</p>
                  </div>
                </div>
              </ActionComponent>
            );
          })}
        </div>

        {/* Additional Quick Links */}
        <div className="pt-4 border-t border-border">
          <div className="grid grid-cols-1 gap-2">
            <Link to="/attendance-tracking">
              <Button variant="ghost" size="sm" fullWidth iconName="BarChart3" iconPosition="left">
                Attendance Analytics
              </Button>
            </Link>
            <Link to="/timetable-management">
              <Button variant="ghost" size="sm" fullWidth iconName="Clock" iconPosition="left">
                Today's Schedule
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsCard;