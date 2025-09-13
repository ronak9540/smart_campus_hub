import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const QueryTicketSystem = ({ tickets, onCreateTicket, onUpdateTicket, userRole }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [newTicket, setNewTicket] = useState({
    title: '',
    category: '',
    priority: 'medium',
    description: ''
  });

  const categories = [
    { value: 'academic', label: 'Academic Issues' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'administrative', label: 'Administrative' },
    { value: 'library', label: 'Library Services' },
    { value: 'hostel', label: 'Hostel Issues' },
    { value: 'transport', label: 'Transport' },
    { value: 'other', label: 'Other' }
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: 'bg-muted text-muted-foreground' },
    { value: 'medium', label: 'Medium', color: 'bg-warning text-warning-foreground' },
    { value: 'high', label: 'High', color: 'bg-error text-error-foreground' }
  ];

  const statuses = [
    { value: 'open', label: 'Open', color: 'bg-accent text-accent-foreground' },
    { value: 'in-progress', label: 'In Progress', color: 'bg-warning text-warning-foreground' },
    { value: 'resolved', label: 'Resolved', color: 'bg-success text-success-foreground' },
    { value: 'closed', label: 'Closed', color: 'bg-muted text-muted-foreground' }
  ];

  const filteredTickets = tickets?.filter(ticket => {
    const matchesStatus = filterStatus === 'all' || ticket?.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || ticket?.priority === filterPriority;
    return matchesStatus && matchesPriority;
  });

  const handleCreateTicket = () => {
    if (newTicket?.title && newTicket?.category && newTicket?.description) {
      onCreateTicket({
        ...newTicket,
        id: Date.now()?.toString(),
        status: 'open',
        createdAt: new Date()?.toISOString(),
        createdBy: 'Current User',
        responses: []
      });
      setNewTicket({ title: '', category: '', priority: 'medium', description: '' });
      setIsCreateModalOpen(false);
    }
  };

  const getStatusColor = (status) => {
    return statuses?.find(s => s?.value === status)?.color || 'bg-muted text-muted-foreground';
  };

  const getPriorityColor = (priority) => {
    return priorities?.find(p => p?.value === priority)?.color || 'bg-muted text-muted-foreground';
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Query Tickets</h2>
          <p className="text-sm text-muted-foreground">Submit and track your queries</p>
        </div>
        <Button 
          variant="default" 
          onClick={() => setIsCreateModalOpen(true)}
          iconName="Plus"
          iconPosition="left"
        >
          Create Ticket
        </Button>
      </div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="sm:w-48">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e?.target?.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Status</option>
            {statuses?.map(status => (
              <option key={status?.value} value={status?.value}>
                {status?.label}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:w-48">
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e?.target?.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Priority</option>
            {priorities?.map(priority => (
              <option key={priority?.value} value={priority?.value}>
                {priority?.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Tickets List */}
      <div className="space-y-4">
        {filteredTickets?.map(ticket => (
          <div key={ticket?.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-elevated transition-smooth">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold text-foreground">#{ticket?.id} - {ticket?.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket?.status)}`}>
                    {ticket?.status}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket?.priority)}`}>
                    {ticket?.priority}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{ticket?.category} • Created by {ticket?.createdBy}</p>
                <p className="text-sm text-foreground line-clamp-2">{ticket?.description}</p>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <Icon name="Calendar" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{formatDate(ticket?.createdAt)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {ticket?.assignedTo && (
                  <div className="flex items-center space-x-1">
                    <Icon name="User" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Assigned to {ticket?.assignedTo}</span>
                  </div>
                )}
                {ticket?.responses && ticket?.responses?.length > 0 && (
                  <div className="flex items-center space-x-1">
                    <Icon name="MessageCircle" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{ticket?.responses?.length} responses</span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setSelectedTicket(ticket)}
                >
                  View Details
                </Button>
                {userRole === 'admin' && ticket?.status !== 'closed' && (
                  <Button 
                    variant="default" 
                    size="sm" 
                    onClick={() => onUpdateTicket(ticket?.id, { status: 'resolved' })}
                  >
                    Mark Resolved
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredTickets?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="HelpCircle" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No tickets found</h3>
          <p className="text-muted-foreground">Create a new ticket to get help with your queries.</p>
        </div>
      )}
      {/* Create Ticket Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Create New Ticket</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCreateModalOpen(false)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
            
            <div className="space-y-4">
              <Input
                label="Title"
                type="text"
                placeholder="Brief description of your issue"
                value={newTicket?.title}
                onChange={(e) => setNewTicket({...newTicket, title: e?.target?.value})}
                required
              />
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Category</label>
                <select
                  value={newTicket?.category}
                  onChange={(e) => setNewTicket({...newTicket, category: e?.target?.value})}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                >
                  <option value="">Select category</option>
                  {categories?.map(category => (
                    <option key={category?.value} value={category?.value}>
                      {category?.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Priority</label>
                <select
                  value={newTicket?.priority}
                  onChange={(e) => setNewTicket({...newTicket, priority: e?.target?.value})}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {priorities?.map(priority => (
                    <option key={priority?.value} value={priority?.value}>
                      {priority?.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Description</label>
                <textarea
                  value={newTicket?.description}
                  onChange={(e) => setNewTicket({...newTicket, description: e?.target?.value})}
                  placeholder="Provide detailed information about your issue"
                  rows={4}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  required
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setIsCreateModalOpen(false)}
                fullWidth
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={handleCreateTicket}
                fullWidth
              >
                Create Ticket
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Ticket Details Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Ticket #{selectedTicket?.id}</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedTicket(null)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-foreground mb-2">{selectedTicket?.title}</h4>
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedTicket?.status)}`}>
                    {selectedTicket?.status}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedTicket?.priority)}`}>
                    {selectedTicket?.priority}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{selectedTicket?.category} • Created {formatDate(selectedTicket?.createdAt)}</p>
                <p className="text-sm text-foreground">{selectedTicket?.description}</p>
              </div>
              
              {selectedTicket?.responses && selectedTicket?.responses?.length > 0 && (
                <div>
                  <h5 className="font-medium text-foreground mb-2">Responses</h5>
                  <div className="space-y-3">
                    {selectedTicket?.responses?.map((response, index) => (
                      <div key={index} className="bg-muted p-3 rounded-md">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-foreground">{response?.author}</span>
                          <span className="text-xs text-muted-foreground">{formatDate(response?.timestamp)}</span>
                        </div>
                        <p className="text-sm text-foreground">{response?.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QueryTicketSystem;