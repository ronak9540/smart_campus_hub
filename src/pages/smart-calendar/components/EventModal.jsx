import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const EventModal = ({ 
  isOpen, 
  onClose, 
  event, 
  onSave, 
  onDelete, 
  mode = 'create' 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    endTime: '',
    type: 'personal',
    location: '',
    reminder: '15',
    repeat: 'none'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (event && mode === 'edit') {
      const eventDate = new Date(event.date);
      setFormData({
        title: event?.title || '',
        description: event?.description || '',
        date: eventDate?.toISOString()?.split('T')?.[0],
        time: event?.time || '',
        endTime: event?.endTime || '',
        type: event?.type || 'personal',
        location: event?.location || '',
        reminder: event?.reminder || '15',
        repeat: event?.repeat || 'none'
      });
    } else if (mode === 'create') {
      const today = new Date();
      setFormData({
        title: '',
        description: '',
        date: today?.toISOString()?.split('T')?.[0],
        time: '',
        endTime: '',
        type: 'personal',
        location: '',
        reminder: '15',
        repeat: 'none'
      });
    }
  }, [event, mode, isOpen]);

  const eventTypes = [
    { value: 'personal', label: 'Personal', color: 'bg-purple-500' },
    { value: 'class', label: 'Class', color: 'bg-blue-500' },
    { value: 'assignment', label: 'Assignment', color: 'bg-orange-500' },
    { value: 'exam', label: 'Exam', color: 'bg-red-500' },
    { value: 'event', label: 'College Event', color: 'bg-green-500' }
  ];

  const reminderOptions = [
    { value: '0', label: 'No reminder' },
    { value: '5', label: '5 minutes before' },
    { value: '15', label: '15 minutes before' },
    { value: '30', label: '30 minutes before' },
    { value: '60', label: '1 hour before' },
    { value: '1440', label: '1 day before' }
  ];

  const repeatOptions = [
    { value: 'none', label: 'Does not repeat' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.title?.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData?.date) {
      newErrors.date = 'Date is required';
    }

    if (formData?.time && formData?.endTime) {
      const startTime = new Date(`2000-01-01T${formData.time}`);
      const endTime = new Date(`2000-01-01T${formData.endTime}`);
      if (endTime <= startTime) {
        newErrors.endTime = 'End time must be after start time';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const eventData = {
      ...formData,
      id: event?.id || Date.now()?.toString(),
      date: new Date(formData.date),
      icon: getEventIcon(formData?.type)
    };

    onSave(eventData);
    onClose();
  };

  const handleDelete = () => {
    if (event && onDelete) {
      onDelete(event?.id);
      onClose();
    }
  };

  const getEventIcon = (type) => {
    const icons = {
      'personal': 'User',
      'class': 'BookOpen',
      'assignment': 'FileText',
      'exam': 'ClipboardCheck',
      'event': 'Calendar'
    };
    return icons?.[type] || 'Calendar';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">
            {mode === 'create' ? 'Create Event' : 'Edit Event'}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="w-8 h-8"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title */}
          <Input
            label="Event Title"
            type="text"
            value={formData?.title}
            onChange={(e) => handleInputChange('title', e?.target?.value)}
            placeholder="Enter event title"
            error={errors?.title}
            required
          />

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description
            </label>
            <textarea
              value={formData?.description}
              onChange={(e) => handleInputChange('description', e?.target?.value)}
              placeholder="Enter event description (optional)"
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Date"
              type="date"
              value={formData?.date}
              onChange={(e) => handleInputChange('date', e?.target?.value)}
              error={errors?.date}
              required
            />
            <Input
              label="Start Time"
              type="time"
              value={formData?.time}
              onChange={(e) => handleInputChange('time', e?.target?.value)}
              placeholder="Optional"
            />
          </div>

          {/* End Time */}
          {formData?.time && (
            <Input
              label="End Time"
              type="time"
              value={formData?.endTime}
              onChange={(e) => handleInputChange('endTime', e?.target?.value)}
              error={errors?.endTime}
              placeholder="Optional"
            />
          )}

          {/* Event Type */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Event Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {eventTypes?.map((type) => (
                <label
                  key={type?.value}
                  className={`flex items-center space-x-2 p-3 border rounded-md cursor-pointer transition-smooth ${
                    formData?.type === type?.value
                      ? 'border-primary bg-primary/5' :'border-border hover:bg-muted'
                  }`}
                >
                  <input
                    type="radio"
                    name="eventType"
                    value={type?.value}
                    checked={formData?.type === type?.value}
                    onChange={(e) => handleInputChange('type', e?.target?.value)}
                    className="sr-only"
                  />
                  <div className={`w-3 h-3 rounded-full ${type?.color}`} />
                  <span className="text-sm text-foreground">{type?.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Location */}
          <Input
            label="Location"
            type="text"
            value={formData?.location}
            onChange={(e) => handleInputChange('location', e?.target?.value)}
            placeholder="Enter location (optional)"
          />

          {/* Reminder */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Reminder
            </label>
            <select
              value={formData?.reminder}
              onChange={(e) => handleInputChange('reminder', e?.target?.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {reminderOptions?.map((option) => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
          </div>

          {/* Repeat */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Repeat
            </label>
            <select
              value={formData?.repeat}
              onChange={(e) => handleInputChange('repeat', e?.target?.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {repeatOptions?.map((option) => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            {mode === 'edit' && (
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                iconName="Trash2"
                iconPosition="left"
                iconSize={16}
                className="sm:w-auto"
              >
                Delete
              </Button>
            )}
            <div className="flex gap-3 sm:ml-auto">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="default"
                iconName="Save"
                iconPosition="left"
                iconSize={16}
              >
                {mode === 'create' ? 'Create' : 'Save'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;