import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ServiceRequestSection = ({ isVisible, onClose }) => {
  const [requestType, setRequestType] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');

  const requestTypes = [
    { value: 'maintenance', label: 'Maintenance Request' },
    { value: 'facility', label: 'Facility Booking' },
    { value: 'it_support', label: 'IT Support' },
    { value: 'academic', label: 'Academic Support' },
    { value: 'administrative', label: 'Administrative Request' },
    { value: 'other', label: 'Other' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'urgent', label: 'Urgent' }
  ];

  const serviceRequests = [
    {
      id: 1,
      type: "IT Support",
      title: "WiFi connectivity issues in library",
      description: "Unable to connect to campus WiFi in the library area. Connection keeps dropping.",
      priority: "High",
      status: "In Progress",
      submittedDate: "2025-09-10",
      assignedTo: "IT Department",
      estimatedResolution: "2025-09-12"
    },
    {
      id: 2,
      type: "Facility Booking",
      title: "Conference room booking for project presentation",
      description: "Need to book Conference Room A for final year project presentation on September 20th.",
      priority: "Medium",
      status: "Approved",
      submittedDate: "2025-09-08",
      assignedTo: "Facility Management",
      estimatedResolution: "2025-09-20"
    },
    {
      id: 3,
      type: "Maintenance",
      title: "Broken projector in Classroom 301",
      description: "The projector in Classroom 301 is not working. Display is flickering and audio is distorted.",
      priority: "High",
      status: "Pending",
      submittedDate: "2025-09-09",
      assignedTo: "Maintenance Team",
      estimatedResolution: "2025-09-13"
    },
    {
      id: 4,
      type: "Academic Support",
      title: "Request for additional study materials",
      description: "Need access to advanced algorithms textbooks for research project.",
      priority: "Low",
      status: "Completed",
      submittedDate: "2025-09-05",
      assignedTo: "Library Department",
      estimatedResolution: "2025-09-07"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'text-success bg-success/10';
      case 'In Progress':
        return 'text-primary bg-primary/10';
      case 'Approved':
        return 'text-success bg-success/10';
      case 'Pending':
        return 'text-warning bg-warning/10';
      case 'Rejected':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Urgent':
        return 'text-error bg-error/10';
      case 'High':
        return 'text-warning bg-warning/10';
      case 'Medium':
        return 'text-primary bg-primary/10';
      case 'Low':
        return 'text-success bg-success/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const handleSubmitRequest = () => {
    if (requestType && description && priority) {
      // Mock submission
      alert('Service request submitted successfully! You will receive updates via email.');
      setRequestType('');
      setDescription('');
      setPriority('');
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Headphones" size={20} color="white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Service Request Center</h2>
              <p className="text-sm text-muted-foreground">Submit and track your service requests</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="flex h-full">
          {/* New Request Form */}
          <div className="w-1/2 border-r border-border p-6 max-h-96 overflow-y-auto">
            <h3 className="font-semibold text-foreground mb-6">Submit New Request</h3>
            
            <div className="space-y-4">
              <Select
                label="Request Type"
                options={requestTypes}
                value={requestType}
                onChange={setRequestType}
                placeholder="Select request type"
                required
              />

              <Input
                label="Request Title"
                type="text"
                placeholder="Brief title for your request"
                required
              />

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description <span className="text-error">*</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e?.target?.value)}
                  placeholder="Provide detailed description of your request..."
                  rows={4}
                  className="w-full px-3 py-2 border border-border rounded-md text-sm text-foreground bg-input placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                  required
                />
              </div>

              <Select
                label="Priority Level"
                options={priorityOptions}
                value={priority}
                onChange={setPriority}
                placeholder="Select priority level"
                required
              />

              <Input
                label="Contact Number (Optional)"
                type="tel"
                placeholder="Your contact number"
              />

              <Input
                label="Preferred Resolution Date"
                type="date"
              />

              <div className="flex gap-3 pt-4">
                <Button onClick={handleSubmitRequest} iconName="Send">
                  Submit Request
                </Button>
                <Button variant="outline" onClick={() => {
                  setRequestType('');
                  setDescription('');
                  setPriority('');
                }}>
                  Clear Form
                </Button>
              </div>
            </div>
          </div>

          {/* Request History */}
          <div className="w-1/2 p-6 max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-foreground">Your Requests</h3>
              <Button variant="outline" size="sm" iconName="Filter">
                Filter
              </Button>
            </div>

            <div className="space-y-4">
              {serviceRequests?.map((request) => (
                <div key={request?.id} className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-foreground">{request?.title}</h4>
                      <p className="text-sm text-muted-foreground">{request?.type}</p>
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

                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {request?.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground mb-3">
                    <div>
                      <span className="font-medium">Submitted:</span>
                      <p>{request?.submittedDate}</p>
                    </div>
                    <div>
                      <span className="font-medium">Assigned to:</span>
                      <p>{request?.assignedTo}</p>
                    </div>
                    <div>
                      <span className="font-medium">Est. Resolution:</span>
                      <p>{request?.estimatedResolution}</p>
                    </div>
                    <div>
                      <span className="font-medium">Request ID:</span>
                      <p>REQ{request?.id?.toString()?.padStart(6, '0')}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" iconName="MessageCircle">
                      Add Comment
                    </Button>
                    <Button variant="outline" size="sm" iconName="Eye">
                      View Details
                    </Button>
                    {request?.status === 'Pending' && (
                      <Button variant="outline" size="sm" iconName="X">
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {serviceRequests?.length === 0 && (
              <div className="text-center py-8">
                <Icon name="Inbox" size={48} className="text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No service requests found</p>
                <p className="text-sm text-muted-foreground">Submit your first request to get started</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceRequestSection;