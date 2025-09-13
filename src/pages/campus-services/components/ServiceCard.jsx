import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServiceCard = ({ service, onServiceClick }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'text-success bg-success/10';
      case 'maintenance':
        return 'text-warning bg-warning/10';
      case 'unavailable':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevated transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${service?.bgColor}`}>
            <Icon name={service?.icon} size={24} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{service?.title}</h3>
            <p className="text-sm text-muted-foreground">{service?.subtitle}</p>
          </div>
        </div>
        {service?.status && (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service?.status)}`}>
            {service?.status}
          </span>
        )}
      </div>
      <p className="text-sm text-muted-foreground mb-4">{service?.description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {service?.stats && service?.stats?.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-lg font-semibold text-foreground">{stat?.value}</p>
              <p className="text-xs text-muted-foreground">{stat?.label}</p>
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onServiceClick(service)}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Access
        </Button>
      </div>
    </div>
  );
};

export default ServiceCard;