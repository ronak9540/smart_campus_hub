import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ClassroomAvailability = ({ onRoomBook, onRoomRelease }) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('all');
  const [selectedCapacity, setSelectedCapacity] = useState('all');

  const timeSlotOptions = [
    { value: '08:00-09:00', label: '08:00 - 09:00 AM' },
    { value: '09:00-10:00', label: '09:00 - 10:00 AM' },
    { value: '10:00-11:00', label: '10:00 - 11:00 AM' },
    { value: '11:00-12:00', label: '11:00 - 12:00 PM' },
    { value: '12:00-13:00', label: '12:00 - 01:00 PM' },
    { value: '13:00-14:00', label: '01:00 - 02:00 PM' },
    { value: '14:00-15:00', label: '02:00 - 03:00 PM' },
    { value: '15:00-16:00', label: '03:00 - 04:00 PM' },
    { value: '16:00-17:00', label: '04:00 - 05:00 PM' }
  ];

  const floorOptions = [
    { value: 'all', label: 'All Floors' },
    { value: 'ground', label: 'Ground Floor' },
    { value: 'first', label: 'First Floor' },
    { value: 'second', label: 'Second Floor' },
    { value: 'third', label: 'Third Floor' }
  ];

  const capacityOptions = [
    { value: 'all', label: 'All Capacities' },
    { value: 'small', label: 'Small (1-30)' },
    { value: 'medium', label: 'Medium (31-60)' },
    { value: 'large', label: 'Large (61-100)' },
    { value: 'auditorium', label: 'Auditorium (100+)' }
  ];

  const mockRooms = [
    {
      id: 'cs-101',
      name: 'CS-101',
      type: 'Classroom',
      floor: 'first',
      capacity: 45,
      features: ['Projector', 'Whiteboard', 'AC', 'WiFi'],
      availability: {
        '08:00-09:00': 'occupied',
        '09:00-10:00': 'occupied',
        '10:00-11:00': 'available',
        '11:00-12:00': 'occupied',
        '12:00-13:00': 'available',
        '13:00-14:00': 'occupied',
        '14:00-15:00': 'occupied',
        '15:00-16:00': 'available',
        '16:00-17:00': 'occupied'
      },
      currentBooking: {
        subject: 'Data Structures',
        faculty: 'Dr. Smith',
        batch: 'CS-A',
        timeSlot: '08:00-09:00'
      }
    },
    {
      id: 'cs-102',
      name: 'CS-102',
      type: 'Classroom',
      floor: 'first',
      capacity: 50,
      features: ['Smart Board', 'Projector', 'AC', 'WiFi', 'Sound System'],
      availability: {
        '08:00-09:00': 'available',
        '09:00-10:00': 'occupied',
        '10:00-11:00': 'occupied',
        '11:00-12:00': 'available',
        '12:00-13:00': 'available',
        '13:00-14:00': 'available',
        '14:00-15:00': 'occupied',
        '15:00-16:00': 'occupied',
        '16:00-17:00': 'available'
      },
      currentBooking: {
        subject: 'Algorithms',
        faculty: 'Prof. Johnson',
        batch: 'CS-B',
        timeSlot: '09:00-10:00'
      }
    },
    {
      id: 'lab-1',
      name: 'Lab-1',
      type: 'Computer Lab',
      floor: 'ground',
      capacity: 30,
      features: ['30 Computers', 'Projector', 'AC', 'WiFi', 'Server Access'],
      availability: {
        '08:00-09:00': 'maintenance',
        '09:00-10:00': 'occupied',
        '10:00-11:00': 'occupied',
        '11:00-12:00': 'occupied',
        '12:00-13:00': 'occupied',
        '13:00-14:00': 'available',
        '14:00-15:00': 'occupied',
        '15:00-16:00': 'occupied',
        '16:00-17:00': 'available'
      },
      currentBooking: {
        subject: 'Programming Lab',
        faculty: 'Dr. Smith',
        batch: 'CS-A',
        timeSlot: '09:00-10:00'
      }
    },
    {
      id: 'lab-2',
      name: 'Lab-2',
      type: 'Computer Lab',
      floor: 'ground',
      capacity: 35,
      features: ['35 Computers', 'Smart Board', 'AC', 'WiFi', 'Specialized Software'],
      availability: {
        '08:00-09:00': 'available',
        '09:00-10:00': 'available',
        '10:00-11:00': 'occupied',
        '11:00-12:00': 'occupied',
        '12:00-13:00': 'available',
        '13:00-14:00': 'available',
        '14:00-15:00': 'available',
        '15:00-16:00': 'occupied',
        '16:00-17:00': 'occupied'
      },
      currentBooking: {
        subject: 'Database Lab',
        faculty: 'Dr. Brown',
        batch: 'CS-B',
        timeSlot: '10:00-11:00'
      }
    },
    {
      id: 'auditorium',
      name: 'Main Auditorium',
      type: 'Auditorium',
      floor: 'ground',
      capacity: 200,
      features: ['Stage', 'Sound System', 'Lighting', 'AC', 'Recording Equipment'],
      availability: {
        '08:00-09:00': 'available',
        '09:00-10:00': 'available',
        '10:00-11:00': 'available',
        '11:00-12:00': 'occupied',
        '12:00-13:00': 'available',
        '13:00-14:00': 'available',
        '14:00-15:00': 'available',
        '15:00-16:00': 'available',
        '16:00-17:00': 'occupied'
      },
      currentBooking: {
        subject: 'Guest Lecture',
        faculty: 'External Speaker',
        batch: 'All Batches',
        timeSlot: '11:00-12:00'
      }
    }
  ];

  const getAvailabilityStatus = (room, timeSlot) => {
    if (!timeSlot) return 'unknown';
    return room?.availability?.[timeSlot] || 'available';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-success text-success-foreground';
      case 'occupied':
        return 'bg-error text-error-foreground';
      case 'maintenance':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available':
        return 'CheckCircle';
      case 'occupied':
        return 'XCircle';
      case 'maintenance':
        return 'Wrench';
      default:
        return 'Clock';
    }
  };

  const filteredRooms = mockRooms?.filter(room => {
    if (selectedFloor !== 'all' && room?.floor !== selectedFloor) return false;
    if (selectedCapacity !== 'all') {
      const capacity = room?.capacity;
      switch (selectedCapacity) {
        case 'small':
          return capacity <= 30;
        case 'medium':
          return capacity > 30 && capacity <= 60;
        case 'large':
          return capacity > 60 && capacity <= 100;
        case 'auditorium':
          return capacity > 100;
        default:
          return true;
      }
    }
    return true;
  });

  const handleBookRoom = (roomId) => {
    if (onRoomBook) {
      onRoomBook(roomId, selectedTimeSlot);
    }
  };

  const handleReleaseRoom = (roomId) => {
    if (onRoomRelease) {
      onRoomRelease(roomId, selectedTimeSlot);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <Icon name="Building" size={18} color="white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Classroom Availability</h3>
              <p className="text-sm text-muted-foreground">Real-time room utilization and booking</p>
            </div>
          </div>
          <Button variant="outline" size="sm" iconName="RefreshCw">
            Refresh
          </Button>
        </div>
      </div>
      <div className="p-6">
        {/* Filters */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Select
            label="Time Slot"
            options={timeSlotOptions}
            value={selectedTimeSlot}
            onChange={setSelectedTimeSlot}
            placeholder="Select time slot"
          />
          <Select
            label="Floor"
            options={floorOptions}
            value={selectedFloor}
            onChange={setSelectedFloor}
          />
          <Select
            label="Capacity"
            options={capacityOptions}
            value={selectedCapacity}
            onChange={setSelectedCapacity}
          />
        </div>

        {/* Room Grid */}
        <div className="grid lg:grid-cols-2 gap-4">
          {filteredRooms?.map((room) => {
            const status = getAvailabilityStatus(room, selectedTimeSlot);
            return (
              <div key={room?.id} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-lg font-semibold text-foreground">{room?.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {room?.type} • Floor {room?.floor} • Capacity: {room?.capacity}
                    </p>
                  </div>
                  {selectedTimeSlot && (
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(status)}`}>
                      <Icon name={getStatusIcon(status)} size={12} className="inline mr-1" />
                      {status?.charAt(0)?.toUpperCase() + status?.slice(1)}
                    </span>
                  )}
                </div>
                {/* Features */}
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {room?.features?.map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Current Booking */}
                {status === 'occupied' && room?.currentBooking && (
                  <div className="mb-3 p-3 bg-error/5 border border-error/20 rounded-md">
                    <h5 className="text-sm font-medium text-foreground mb-1">Current Booking</h5>
                    <div className="text-sm text-muted-foreground">
                      <p>{room?.currentBooking?.subject}</p>
                      <p>{room?.currentBooking?.faculty} • {room?.currentBooking?.batch}</p>
                      <p>Time: {room?.currentBooking?.timeSlot}</p>
                    </div>
                  </div>
                )}
                {/* Availability Timeline */}
                {selectedTimeSlot && (
                  <div className="mb-3">
                    <h5 className="text-sm font-medium text-foreground mb-2">Today's Schedule</h5>
                    <div className="grid grid-cols-9 gap-1">
                      {timeSlotOptions?.map((slot) => {
                        const slotStatus = room?.availability?.[slot?.value];
                        return (
                          <div
                            key={slot?.value}
                            className={`h-6 rounded text-xs flex items-center justify-center ${
                              slotStatus === 'available' ?'bg-success/20 text-success'
                                : slotStatus === 'occupied' ?'bg-error/20 text-error'
                                : slotStatus === 'maintenance' ?'bg-warning/20 text-warning' :'bg-muted/20 text-muted-foreground'
                            }`}
                            title={`${slot?.label}: ${slotStatus || 'available'}`}
                          >
                            {slot?.value?.split('-')?.[0]?.slice(0, 2)}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                {/* Actions */}
                {selectedTimeSlot && (
                  <div className="flex space-x-2">
                    {status === 'available' && (
                      <Button
                        variant="default"
                        size="sm"
                        iconName="Calendar"
                        onClick={() => handleBookRoom(room?.id)}
                      >
                        Book Room
                      </Button>
                    )}
                    {status === 'occupied' && (
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="X"
                        onClick={() => handleReleaseRoom(room?.id)}
                      >
                        Release
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" iconName="Eye">
                      View Details
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredRooms?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Building" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-medium text-foreground mb-2">No Rooms Found</h4>
            <p className="text-sm text-muted-foreground">
              Try adjusting your filters to see available rooms.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassroomAvailability;