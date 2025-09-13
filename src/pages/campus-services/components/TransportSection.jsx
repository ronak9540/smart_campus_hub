import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TransportSection = ({ isVisible, onClose }) => {
  const [selectedRoute, setSelectedRoute] = useState(null);

  const busRoutes = [
    {
      id: 1,
      routeNumber: "Route 1",
      routeName: "Main Campus - City Center",
      stops: ["Main Gate", "Library", "Cafeteria", "City Mall", "Central Station"],
      schedule: [
        { time: "7:00 AM", status: "completed" },
        { time: "8:30 AM", status: "completed" },
        { time: "10:00 AM", status: "active" },
        { time: "12:00 PM", status: "upcoming" },
        { time: "2:00 PM", status: "upcoming" },
        { time: "4:00 PM", status: "upcoming" },
        { time: "6:00 PM", status: "upcoming" }
      ],
      currentLocation: "Library",
      estimatedArrival: "5 mins",
      capacity: "32/40",
      driver: "Michael Johnson",
      contact: "+1-555-0156"
    },
    {
      id: 2,
      routeNumber: "Route 2",
      routeName: "Campus - Residential Area",
      stops: ["Main Gate", "Sports Complex", "Hostel Block A", "Hostel Block B", "Market Square"],
      schedule: [
        { time: "7:30 AM", status: "completed" },
        { time: "9:00 AM", status: "completed" },
        { time: "11:00 AM", status: "upcoming" },
        { time: "1:00 PM", status: "upcoming" },
        { time: "3:00 PM", status: "upcoming" },
        { time: "5:00 PM", status: "upcoming" },
        { time: "7:00 PM", status: "upcoming" }
      ],
      currentLocation: "Sports Complex",
      estimatedArrival: "12 mins",
      capacity: "28/35",
      driver: "Sarah Wilson",
      contact: "+1-555-0187"
    },
    {
      id: 3,
      routeNumber: "Route 3",
      routeName: "Campus - Airport Express",
      stops: ["Main Gate", "Admin Block", "Highway Junction", "Airport Terminal"],
      schedule: [
        { time: "6:00 AM", status: "completed" },
        { time: "10:00 AM", status: "upcoming" },
        { time: "2:00 PM", status: "upcoming" },
        { time: "6:00 PM", status: "upcoming" }
      ],
      currentLocation: "Highway Junction",
      estimatedArrival: "25 mins",
      capacity: "15/25",
      driver: "David Brown",
      contact: "+1-555-0198"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-muted-foreground bg-muted';
      case 'active':
        return 'text-success bg-success/10';
      case 'upcoming':
        return 'text-primary bg-primary/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'active':
        return 'Navigation';
      case 'upcoming':
        return 'Clock';
      default:
        return 'Circle';
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Bus" size={20} color="white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Transport Services</h2>
              <p className="text-sm text-muted-foreground">Live bus tracking and schedules</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="flex h-full">
          {/* Routes List */}
          <div className="w-1/3 border-r border-border p-4 max-h-96 overflow-y-auto">
            <h3 className="font-semibold text-foreground mb-4">Available Routes</h3>
            <div className="space-y-3">
              {busRoutes?.map((route) => (
                <div
                  key={route?.id}
                  onClick={() => setSelectedRoute(route)}
                  className={`p-4 rounded-lg border cursor-pointer transition-smooth ${
                    selectedRoute?.id === route?.id
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground">{route?.routeNumber}</h4>
                    <div className="flex items-center space-x-1 text-xs text-success">
                      <Icon name="Navigation" size={12} />
                      <span>{route?.estimatedArrival}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{route?.routeName}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Current: {route?.currentLocation}</span>
                    <span className="text-muted-foreground">Capacity: {route?.capacity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Route Details */}
          <div className="flex-1 p-6 max-h-96 overflow-y-auto">
            {selectedRoute ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{selectedRoute?.routeNumber}</h3>
                    <p className="text-muted-foreground">{selectedRoute?.routeName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">ETA</p>
                    <p className="text-lg font-semibold text-success">{selectedRoute?.estimatedArrival}</p>
                  </div>
                </div>

                {/* Live Status */}
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-medium text-foreground mb-3 flex items-center">
                    <Icon name="MapPin" size={16} className="mr-2" />
                    Live Status
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Current Location:</span>
                      <p className="font-medium">{selectedRoute?.currentLocation}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Capacity:</span>
                      <p className="font-medium">{selectedRoute?.capacity}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Driver:</span>
                      <p className="font-medium">{selectedRoute?.driver}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Contact:</span>
                      <p className="font-medium">{selectedRoute?.contact}</p>
                    </div>
                  </div>
                </div>

                {/* Route Stops */}
                <div>
                  <h4 className="font-medium text-foreground mb-3 flex items-center">
                    <Icon name="Route" size={16} className="mr-2" />
                    Route Stops
                  </h4>
                  <div className="space-y-2">
                    {selectedRoute?.stops?.map((stop, index) => (
                      <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50">
                        <div className={`w-3 h-3 rounded-full ${
                          stop === selectedRoute?.currentLocation ? 'bg-success' : 'bg-muted-foreground'
                        }`} />
                        <span className={`text-sm ${
                          stop === selectedRoute?.currentLocation ? 'font-medium text-foreground' : 'text-muted-foreground'
                        }`}>
                          {stop}
                        </span>
                        {stop === selectedRoute?.currentLocation && (
                          <span className="text-xs text-success bg-success/10 px-2 py-1 rounded-full">
                            Current
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Schedule */}
                <div>
                  <h4 className="font-medium text-foreground mb-3 flex items-center">
                    <Icon name="Clock" size={16} className="mr-2" />
                    Today's Schedule
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {selectedRoute?.schedule?.map((slot, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center space-x-2">
                          <Icon name={getStatusIcon(slot?.status)} size={16} className={getStatusColor(slot?.status)?.split(' ')?.[0]} />
                          <span className="text-sm font-medium">{slot?.time}</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(slot?.status)}`}>
                          {slot?.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button variant="default" iconName="Bell">
                    Set Reminder
                  </Button>
                  <Button variant="outline" iconName="Share">
                    Share Route
                  </Button>
                  <Button variant="outline" iconName="Phone">
                    Call Driver
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Icon name="Bus" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Select a route to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportSection;