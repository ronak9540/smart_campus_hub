import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import Select from '../../../components/ui/Select';

const ManualOverridePanel = ({ onClose, onSave }) => {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [action, setAction] = useState('');
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');

  const students = [
    { value: 'john_doe', label: 'John Doe - CS2021001' },
    { value: 'jane_smith', label: 'Jane Smith - CS2021002' },
    { value: 'mike_johnson', label: 'Mike Johnson - CS2021003' },
    { value: 'sarah_wilson', label: 'Sarah Wilson - CS2021004' },
    { value: 'david_brown', label: 'David Brown - CS2021005' }
  ];

  const actions = [
    { value: 'mark_present', label: 'Mark as Present' },
    { value: 'mark_absent', label: 'Mark as Absent' },
    { value: 'remove_record', label: 'Remove Attendance Record' },
    { value: 'update_time', label: 'Update Check-in Time' }
  ];

  const reasons = [
    { value: 'technical_issue', label: 'Technical Issue with Scanner' },
    { value: 'late_arrival', label: 'Student Arrived Late' },
    { value: 'early_departure', label: 'Student Left Early' },
    { value: 'medical_emergency', label: 'Medical Emergency' },
    { value: 'system_error', label: 'System Error' },
    { value: 'proxy_correction', label: 'Proxy Attendance Correction' },
    { value: 'other', label: 'Other (specify in notes)' }
  ];

  const handleSave = () => {
    if (!selectedStudent || !action || !reason) {
      return;
    }

    const overrideData = {
      studentId: selectedStudent,
      action,
      reason,
      notes,
      timestamp: new Date(),
      authorizedBy: 'Current User' // In real app, this would be the logged-in user
    };

    onSave(overrideData);
  };

  const isFormValid = selectedStudent && action && reason;

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevated">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center">
            <Icon name="Edit" size={20} className="text-warning" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Manual Attendance Override</h3>
            <p className="text-sm text-muted-foreground">Make corrections to attendance records</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <Icon name="X" size={20} />
        </Button>
      </div>
      <div className="space-y-6">
        {/* Warning Notice */}
        <div className="bg-warning/10 border border-warning rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="AlertTriangle" size={20} className="text-warning flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-warning">Authorization Required</p>
              <p className="text-xs text-muted-foreground mt-1">
                Manual overrides are logged and require proper authorization. All changes are auditable.
              </p>
            </div>
          </div>
        </div>

        {/* Student Selection */}
        <Select
          label="Select Student"
          placeholder="Choose a student..."
          options={students}
          value={selectedStudent}
          onChange={setSelectedStudent}
          searchable
          required
        />

        {/* Action Selection */}
        <Select
          label="Action"
          placeholder="Select action to perform..."
          options={actions}
          value={action}
          onChange={setAction}
          required
        />

        {/* Reason Selection */}
        <Select
          label="Reason for Override"
          placeholder="Select reason..."
          options={reasons}
          value={reason}
          onChange={setReason}
          required
        />

        {/* Additional Notes */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Additional Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e?.target?.value)}
            placeholder="Provide additional details about this override..."
            className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
            rows={4}
          />
        </div>

        {/* Current Override Summary */}
        {isFormValid && (
          <div className="bg-muted rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-3">Override Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Student:</span>
                <span className="text-foreground">
                  {students?.find(s => s?.value === selectedStudent)?.label}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Action:</span>
                <span className="text-foreground">
                  {actions?.find(a => a?.value === action)?.label}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Reason:</span>
                <span className="text-foreground">
                  {reasons?.find(r => r?.value === reason)?.label}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Timestamp:</span>
                <span className="text-foreground">
                  {new Date()?.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4 border-t border-border">
          <Button 
            onClick={handleSave}
            disabled={!isFormValid}
            className="flex-1"
            iconName="Save"
          >
            Apply Override
          </Button>
          <Button 
            variant="outline" 
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>

        {/* Audit Trail Notice */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            This action will be recorded in the audit trail with your user ID and timestamp
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManualOverridePanel;