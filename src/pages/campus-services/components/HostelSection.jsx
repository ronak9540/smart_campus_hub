import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const HostelSection = ({ isVisible, onClose }) => {
  const [activeTab, setActiveTab] = useState('room');
  const [maintenanceRequest, setMaintenanceRequest] = useState('');

  const hostelInfo = {
    roomNumber: "A-204",
    block: "A Block",
    floor: "2nd Floor",
    roommates: ["John Doe", "Mike Johnson"],
    warden: "Dr. Sarah Wilson",
    contact: "+1-555-0123"
  };

  const mealSchedule = [
    { meal: "Breakfast", time: "7:00 AM - 9:00 AM", menu: "Oatmeal, Toast, Fruits, Coffee/Tea" },
    { meal: "Lunch", time: "12:00 PM - 2:00 PM", menu: "Rice, Dal, Vegetables, Roti, Salad" },
    { meal: "Snacks", time: "4:00 PM - 5:00 PM", menu: "Samosa, Tea/Coffee" },
    { meal: "Dinner", time: "7:00 PM - 9:00 PM", menu: "Rice/Roti, Curry, Vegetables, Dessert" }
  ];

  const maintenanceRequests = [
    {
      id: 1,
      type: "Plumbing",
      description: "Leaky faucet in bathroom",
      status: "In Progress",
      date: "2025-09-10",
      priority: "Medium"
    },
    {
      id: 2,
      type: "Electrical",
      description: "Fan not working properly",
      status: "Completed",
      date: "2025-09-08",
      priority: "High"
    }
  ];

  const visitors = [
    {
      id: 1,
      name: "Robert Smith",
      relation: "Father",
      visitDate: "2025-09-12",
      visitTime: "2:00 PM",
      status: "Approved"
    },
    {
      id: 2,
      name: "Emily Davis",
      relation: "Friend",
      visitDate: "2025-09-15",
      visitTime: "4:00 PM",
      status: "Pending"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
      case 'Approved':
        return 'text-success bg-success/10';
      case 'In Progress': case'Pending':
        return 'text-warning bg-warning/10';
      case 'Rejected':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'text-error bg-error/10';
      case 'Medium':
        return 'text-warning bg-warning/10';
      case 'Low':
        return 'text-success bg-success/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const handleMaintenanceSubmit = () => {
    if (maintenanceRequest?.trim()) {
      // Mock submission
      setMaintenanceRequest('');
      alert('Maintenance request submitted successfully!');
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-5xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Building" size={20} color="white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Hostel Management</h2>
              <p className="text-sm text-muted-foreground">Room {hostelInfo?.roomNumber} - {hostelInfo?.block}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="flex border-b border-border">
          {[
            { id: 'room', label: 'Room Info', icon: 'Home' },
            { id: 'meals', label: 'Meal Schedule', icon: 'Utensils' },
            { id: 'maintenance', label: 'Maintenance', icon: 'Wrench' },
            { id: 'visitors', label: 'Visitors', icon: 'Users' }
          ]?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-smooth ${
                activeTab === tab?.id
                  ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>

        <div className="p-6 max-h-96 overflow-y-auto">
          {activeTab === 'room' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center">
                    <Icon name="MapPin" size={16} className="mr-2" />
                    Room Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Room Number:</span>
                      <span className="font-medium">{hostelInfo?.roomNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Block:</span>
                      <span className="font-medium">{hostelInfo?.block}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Floor:</span>
                      <span className="font-medium">{hostelInfo?.floor}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center">
                    <Icon name="Users" size={16} className="mr-2" />
                    Roommates
                  </h3>
                  <div className="space-y-2">
                    {hostelInfo?.roommates?.map((roommate, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <Icon name="User" size={12} color="white" />
                        </div>
                        <span className="text-sm">{roommate}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-3 flex items-center">
                  <Icon name="Phone" size={16} className="mr-2" />
                  Contact Information
                </h3>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Warden:</span>
                    <p className="font-medium">{hostelInfo?.warden}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Contact:</span>
                    <p className="font-medium">{hostelInfo?.contact}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'meals' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground mb-4">Today's Meal Schedule</h3>
              {mealSchedule?.map((meal, index) => (
                <div key={index} className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground">{meal?.meal}</h4>
                    <span className="text-sm text-muted-foreground">{meal?.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{meal?.menu}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'maintenance' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-4">Submit New Request</h3>
                <div className="space-y-4">
                  <Input
                    label="Describe the issue"
                    type="text"
                    placeholder="e.g., Broken light bulb in room"
                    value={maintenanceRequest}
                    onChange={(e) => setMaintenanceRequest(e?.target?.value)}
                  />
                  <Button onClick={handleMaintenanceSubmit} iconName="Send">
                    Submit Request
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-4">Previous Requests</h3>
                <div className="space-y-3">
                  {maintenanceRequests?.map((request) => (
                    <div key={request?.id} className="bg-muted/50 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-foreground">{request?.type}</h4>
                          <p className="text-sm text-muted-foreground">{request?.description}</p>
                        </div>
                        <div className="flex flex-col items-end space-y-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request?.status)}`}>
                            {request?.status}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request?.priority)}`}>
                            {request?.priority}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">Submitted: {request?.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'visitors' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-4">Register New Visitor</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Visitor Name" type="text" placeholder="Enter visitor name" />
                  <Input label="Relation" type="text" placeholder="e.g., Father, Friend" />
                  <Input label="Visit Date" type="date" />
                  <Input label="Visit Time" type="time" />
                </div>
                <div className="mt-4">
                  <Button iconName="UserPlus">Register Visitor</Button>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-4">Upcoming Visits</h3>
                <div className="space-y-3">
                  {visitors?.map((visitor) => (
                    <div key={visitor?.id} className="bg-muted/50 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-foreground">{visitor?.name}</h4>
                          <p className="text-sm text-muted-foreground">{visitor?.relation}</p>
                          <p className="text-sm text-muted-foreground">
                            {visitor?.visitDate} at {visitor?.visitTime}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(visitor?.status)}`}>
                          {visitor?.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HostelSection;