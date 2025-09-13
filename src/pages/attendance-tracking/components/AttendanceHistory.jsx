import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const AttendanceHistory = ({ history }) => {
  const getMethodIcon = (method) => {
    switch (method?.toLowerCase()) {
      case 'qr code':
        return 'QrCode';
      case 'biometric':
        return 'Fingerprint';
      case 'facial recognition':
        return 'Camera';
      case 'manual':
        return 'Edit';
      default:
        return 'CheckCircle';
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'verified':
        return 'text-success';
      case 'pending':
        return 'text-warning';
      case 'failed':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusBg = (status) => {
    switch (status?.toLowerCase()) {
      case 'verified':
        return 'bg-success/10';
      case 'pending':
        return 'bg-warning/10';
      case 'failed':
        return 'bg-error/10';
      default:
        return 'bg-muted';
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Attendance</h3>
        <Button variant="ghost" size="sm" iconName="History">
          View All
        </Button>
      </div>
      <div className="space-y-4">
        {history?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Clock" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No attendance records found</p>
            <p className="text-sm text-muted-foreground mt-1">Your attendance history will appear here</p>
          </div>
        ) : (
          history?.map((record) => (
            <div key={record?.id} className="flex items-center space-x-4 p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
              <div className="flex-shrink-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusBg(record?.status)}`}>
                  <Icon name={getMethodIcon(record?.method)} size={20} className={getStatusColor(record?.status)} />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground truncate">
                    {record?.subject}
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusBg(record?.status)} ${getStatusColor(record?.status)}`}>
                      {record?.status}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <Icon name="Calendar" size={12} />
                      <span>{formatDate(record?.timestamp)}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} />
                      <span>{formatTime(record?.timestamp)}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="MapPin" size={12} />
                      <span>{record?.location}</span>
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    via {record?.method}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {history?.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-success">
                {history?.filter(r => r?.status === 'verified')?.length}
              </p>
              <p className="text-xs text-muted-foreground">Verified</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-warning">
                {history?.filter(r => r?.status === 'pending')?.length}
              </p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-error">
                {history?.filter(r => r?.status === 'failed')?.length}
              </p>
              <p className="text-xs text-muted-foreground">Failed</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceHistory;