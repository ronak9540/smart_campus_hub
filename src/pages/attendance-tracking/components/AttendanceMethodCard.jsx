import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AttendanceMethodCard = ({ method, onSelect, isActive }) => {
  const getMethodIcon = () => {
    switch (method?.type) {
      case 'qr':
        return 'QrCode';
      case 'biometric':
        return 'Fingerprint';
      case 'facial':
        return 'Camera';
      default:
        return 'CheckCircle';
    }
  };

  const getMethodColor = () => {
    switch (method?.type) {
      case 'qr':
        return 'text-blue-600';
      case 'biometric':
        return 'text-green-600';
      case 'facial':
        return 'text-purple-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 transition-all duration-200 hover:shadow-elevated cursor-pointer ${
      isActive ? 'ring-2 ring-primary shadow-elevated' : ''
    }`} onClick={() => onSelect(method?.type)}>
      <div className="flex flex-col items-center text-center space-y-4">
        <div className={`w-16 h-16 rounded-full bg-muted flex items-center justify-center ${getMethodColor()}`}>
          <Icon name={getMethodIcon()} size={32} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">{method?.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{method?.description}</p>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Icon name="Clock" size={16} className="text-muted-foreground" />
          <span className="text-muted-foreground">{method?.avgTime}</span>
        </div>
        <Button 
          variant={isActive ? "default" : "outline"} 
          size="sm"
          className="w-full"
        >
          {isActive ? 'Selected' : 'Select Method'}
        </Button>
      </div>
    </div>
  );
};

export default AttendanceMethodCard;