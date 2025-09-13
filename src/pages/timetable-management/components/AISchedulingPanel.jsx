import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const AISchedulingPanel = ({ onGenerateSchedule, isGenerating }) => {
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState([]);
  const [schedulingPreferences, setSchedulingPreferences] = useState({
    avoidEarlyMorning: false,
    avoidLateEvening: false,
    balanceWorkload: true,
    prioritizeLabSessions: true,
    minimizeGaps: true
  });

  const batchOptions = [
    { value: 'cs-a', label: 'CS-A (Computer Science A)' },
    { value: 'cs-b', label: 'CS-B (Computer Science B)' },
    { value: 'cs-c', label: 'CS-C (Computer Science C)' },
    { value: 'it-a', label: 'IT-A (Information Technology A)' },
    { value: 'it-b', label: 'IT-B (Information Technology B)' },
    { value: 'ece-a', label: 'ECE-A (Electronics A)' },
    { value: 'ece-b', label: 'ECE-B (Electronics B)' }
  ];

  const facultyOptions = [
    { value: 'dr-smith', label: 'Dr. Smith (Data Structures, Algorithms)' },
    { value: 'prof-johnson', label: 'Prof. Johnson (Algorithms, Database)' },
    { value: 'dr-brown', label: 'Dr. Brown (Database Systems, SQL)' },
    { value: 'ms-davis', label: 'Ms. Davis (Web Development, UI/UX)' },
    { value: 'dr-wilson', label: 'Dr. Wilson (Machine Learning, AI)' },
    { value: 'prof-miller', label: 'Prof. Miller (Software Engineering)' },
    { value: 'dr-taylor', label: 'Dr. Taylor (Operating Systems)' },
    { value: 'prof-anderson', label: 'Prof. Anderson (Computer Networks)' }
  ];

  const constraintOptions = [
    { value: 'room-capacity', label: 'Room Capacity Constraints' },
    { value: 'lab-availability', label: 'Lab Availability' },
    { value: 'faculty-preferences', label: 'Faculty Time Preferences' },
    { value: 'student-load', label: 'Student Workload Balance' },
    { value: 'break-times', label: 'Mandatory Break Times' }
  ];

  const handlePreferenceChange = (key, value) => {
    setSchedulingPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleGenerateSchedule = () => {
    const scheduleConfig = {
      batches: selectedBatches,
      faculty: selectedFaculty,
      preferences: schedulingPreferences,
      timestamp: new Date()?.toISOString()
    };
    
    if (onGenerateSchedule) {
      onGenerateSchedule(scheduleConfig);
    }
  };

  const aiSuggestions = [
    {
      id: 1,
      type: 'optimization',
      title: 'Workload Balance Suggestion',
      description: 'Dr. Smith has 18 hours/week while Prof. Johnson has 12 hours/week. Consider redistributing courses.',
      priority: 'medium',
      action: 'Rebalance'
    },
    {
      id: 2,
      type: 'conflict',
      title: 'Room Conflict Detected',
      description: 'CS-101 is double-booked on Monday 10:00-11:00. Lab-1 is available as alternative.',
      priority: 'high',
      action: 'Resolve'
    },
    {
      id: 3,
      type: 'improvement',
      title: 'Schedule Optimization',
      description: 'Moving Machine Learning to Wednesday 2:00 PM would reduce student travel time by 15%.',
      priority: 'low',
      action: 'Apply'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center">
            <Icon name="Brain" size={18} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">AI Scheduling Assistant</h3>
            <p className="text-sm text-muted-foreground">Intelligent timetable generation and optimization</p>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-6">
        {/* Batch Selection */}
        <div>
          <Select
            label="Select Batches"
            description="Choose batches to include in schedule generation"
            multiple
            searchable
            options={batchOptions}
            value={selectedBatches}
            onChange={setSelectedBatches}
            placeholder="Select batches..."
          />
        </div>

        {/* Faculty Selection */}
        <div>
          <Select
            label="Available Faculty"
            description="Select faculty members for scheduling"
            multiple
            searchable
            options={facultyOptions}
            value={selectedFaculty}
            onChange={setSelectedFaculty}
            placeholder="Select faculty..."
          />
        </div>

        {/* Scheduling Preferences */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Scheduling Preferences</h4>
          <div className="space-y-3">
            <Checkbox
              label="Avoid early morning slots (before 9:00 AM)"
              checked={schedulingPreferences?.avoidEarlyMorning}
              onChange={(e) => handlePreferenceChange('avoidEarlyMorning', e?.target?.checked)}
            />
            <Checkbox
              label="Avoid late evening slots (after 5:00 PM)"
              checked={schedulingPreferences?.avoidLateEvening}
              onChange={(e) => handlePreferenceChange('avoidLateEvening', e?.target?.checked)}
            />
            <Checkbox
              label="Balance faculty workload automatically"
              checked={schedulingPreferences?.balanceWorkload}
              onChange={(e) => handlePreferenceChange('balanceWorkload', e?.target?.checked)}
            />
            <Checkbox
              label="Prioritize lab sessions scheduling"
              checked={schedulingPreferences?.prioritizeLabSessions}
              onChange={(e) => handlePreferenceChange('prioritizeLabSessions', e?.target?.checked)}
            />
            <Checkbox
              label="Minimize gaps between classes"
              checked={schedulingPreferences?.minimizeGaps}
              onChange={(e) => handlePreferenceChange('minimizeGaps', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Generate Button */}
        <div className="pt-4 border-t border-border">
          <Button
            variant="default"
            fullWidth
            loading={isGenerating}
            iconName="Sparkles"
            iconPosition="left"
            onClick={handleGenerateSchedule}
            disabled={selectedBatches?.length === 0}
          >
            {isGenerating ? 'Generating Schedule...' : 'Generate AI Schedule'}
          </Button>
        </div>

        {/* AI Suggestions */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">AI Suggestions</h4>
          <div className="space-y-3">
            {aiSuggestions?.map((suggestion) => (
              <div
                key={suggestion?.id}
                className={`p-3 rounded-md border ${
                  suggestion?.priority === 'high' ?'border-error bg-error/5'
                    : suggestion?.priority === 'medium' ?'border-warning bg-warning/5' :'border-accent bg-accent/5'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <Icon
                        name={
                          suggestion?.type === 'conflict' ?'AlertTriangle'
                            : suggestion?.type === 'optimization' ?'TrendingUp' :'Lightbulb'
                        }
                        size={14}
                        className={
                          suggestion?.priority === 'high' ?'text-error'
                            : suggestion?.priority === 'medium' ?'text-warning' :'text-accent'
                        }
                      />
                      <span className="text-sm font-medium text-foreground">
                        {suggestion?.title}
                      </span>
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full ${
                          suggestion?.priority === 'high' ?'bg-error text-error-foreground'
                            : suggestion?.priority === 'medium' ?'bg-warning text-warning-foreground' :'bg-accent text-accent-foreground'
                        }`}
                      >
                        {suggestion?.priority}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {suggestion?.description}
                    </p>
                  </div>
                  <Button variant="ghost" size="xs">
                    {suggestion?.action}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISchedulingPanel;