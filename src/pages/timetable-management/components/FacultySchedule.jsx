import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const FacultySchedule = ({ onScheduleUpdate }) => {
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [selectedWeek, setSelectedWeek] = useState('current');

  const facultyOptions = [
    { value: 'dr-smith', label: 'Dr. Smith (Computer Science)' },
    { value: 'prof-johnson', label: 'Prof. Johnson (Algorithms)' },
    { value: 'dr-brown', label: 'Dr. Brown (Database Systems)' },
    { value: 'ms-davis', label: 'Ms. Davis (Web Development)' },
    { value: 'dr-wilson', label: 'Dr. Wilson (Machine Learning)' },
    { value: 'prof-miller', label: 'Prof. Miller (Software Engineering)' },
    { value: 'dr-taylor', label: 'Dr. Taylor (Operating Systems)' },
    { value: 'prof-anderson', label: 'Prof. Anderson (Computer Networks)' }
  ];

  const weekOptions = [
    { value: 'previous', label: 'Previous Week' },
    { value: 'current', label: 'Current Week' },
    { value: 'next', label: 'Next Week' }
  ];

  const mockFacultyData = {
    'dr-smith': {
      name: 'Dr. Smith',
      department: 'Computer Science',
      email: 'dr.smith@college.edu',
      phone: '+1 (555) 123-4567',
      office: 'CS-201',
      totalHours: 18,
      maxHours: 20,
      subjects: ['Data Structures', 'Algorithms', 'Programming Fundamentals'],
      schedule: {
        'Monday': [
          { time: '08:00-09:00', subject: 'Data Structures', batch: 'CS-A', room: 'CS-101' },
          { time: '10:00-11:00', subject: 'Programming Lab', batch: 'CS-A', room: 'Lab-1' },
          { time: '11:00-12:00', subject: 'Programming Lab', batch: 'CS-A', room: 'Lab-1' }
        ],
        'Tuesday': [
          { time: '09:00-10:00', subject: 'Algorithms', batch: 'CS-B', room: 'CS-102' },
          { time: '14:00-15:00', subject: 'Data Structures', batch: 'CS-C', room: 'CS-103' }
        ],
        'Wednesday': [
          { time: '08:00-09:00', subject: 'Programming Fundamentals', batch: 'CS-A', room: 'CS-101' },
          { time: '15:00-16:00', subject: 'Data Structures', batch: 'CS-B', room: 'CS-102' }
        ],
        'Thursday': [
          { time: '10:00-11:00', subject: 'Algorithms', batch: 'CS-A', room: 'CS-101' },
          { time: '13:00-14:00', subject: 'Programming Fundamentals', batch: 'CS-C', room: 'CS-103' }
        ],
        'Friday': [
          { time: '09:00-10:00', subject: 'Data Structures', batch: 'CS-B', room: 'CS-102' },
          { time: '11:00-12:00', subject: 'Algorithms', batch: 'CS-C', room: 'CS-103' }
        ],
        'Saturday': [
          { time: '09:00-10:00', subject: 'Lab Session', batch: 'CS-A', room: 'Lab-1' },
          { time: '10:00-11:00', subject: 'Lab Session', batch: 'CS-A', room: 'Lab-1' }
        ]
      },
      availability: {
        'Monday': { available: ['08:00-12:00', '14:00-17:00'], unavailable: ['12:00-14:00'] },
        'Tuesday': { available: ['08:00-17:00'], unavailable: [] },
        'Wednesday': { available: ['08:00-17:00'], unavailable: [] },
        'Thursday': { available: ['08:00-17:00'], unavailable: [] },
        'Friday': { available: ['08:00-17:00'], unavailable: [] },
        'Saturday': { available: ['09:00-13:00'], unavailable: ['13:00-17:00'] }
      },
      leaveRequests: [
        {
          id: 1,
          date: '2025-09-15',
          reason: 'Conference Attendance',
          status: 'approved',
          substitute: 'Prof. Johnson'
        }
      ]
    }
  };

  const selectedFacultyData = selectedFaculty ? mockFacultyData?.[selectedFaculty] : null;

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const getWorkloadPercentage = (totalHours, maxHours) => {
    return Math.round((totalHours / maxHours) * 100);
  };

  const getWorkloadColor = (percentage) => {
    if (percentage >= 90) return 'text-error';
    if (percentage >= 75) return 'text-warning';
    return 'text-success';
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-secondary rounded-md flex items-center justify-center">
              <Icon name="Users" size={18} color="white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Faculty Schedule</h3>
              <p className="text-sm text-muted-foreground">Individual faculty timetable and workload</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Download">
              Export
            </Button>
            <Button variant="outline" size="sm" iconName="Settings">
              Preferences
            </Button>
          </div>
        </div>
      </div>
      <div className="p-6">
        {/* Faculty Selection */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <Select
            label="Select Faculty"
            options={facultyOptions}
            value={selectedFaculty}
            onChange={setSelectedFaculty}
            placeholder="Choose faculty member..."
            searchable
          />
          <Select
            label="Week"
            options={weekOptions}
            value={selectedWeek}
            onChange={setSelectedWeek}
          />
        </div>

        {selectedFacultyData ? (
          <div className="space-y-6">
            {/* Faculty Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Faculty Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name:</span>
                      <span className="text-foreground">{selectedFacultyData?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Department:</span>
                      <span className="text-foreground">{selectedFacultyData?.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email:</span>
                      <span className="text-foreground">{selectedFacultyData?.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Office:</span>
                      <span className="text-foreground">{selectedFacultyData?.office}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-foreground mb-2">Subjects Teaching</h5>
                  <div className="flex flex-wrap gap-1">
                    {selectedFacultyData?.subjects?.map((subject, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-primary/10 text-primary rounded"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Workload Analysis</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Weekly Hours:</span>
                      <span className="text-sm font-medium text-foreground">
                        {selectedFacultyData?.totalHours}/{selectedFacultyData?.maxHours} hours
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          getWorkloadPercentage(selectedFacultyData?.totalHours, selectedFacultyData?.maxHours) >= 90
                            ? 'bg-error'
                            : getWorkloadPercentage(selectedFacultyData?.totalHours, selectedFacultyData?.maxHours) >= 75
                            ? 'bg-warning' :'bg-success'
                        }`}
                        style={{
                          width: `${getWorkloadPercentage(selectedFacultyData?.totalHours, selectedFacultyData?.maxHours)}%`
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">0 hours</span>
                      <span
                        className={`font-medium ${getWorkloadColor(
                          getWorkloadPercentage(selectedFacultyData?.totalHours, selectedFacultyData?.maxHours)
                        )}`}
                      >
                        {getWorkloadPercentage(selectedFacultyData?.totalHours, selectedFacultyData?.maxHours)}%
                      </span>
                      <span className="text-muted-foreground">{selectedFacultyData?.maxHours} hours</span>
                    </div>
                  </div>
                </div>

                {/* Leave Requests */}
                {selectedFacultyData?.leaveRequests?.length > 0 && (
                  <div>
                    <h5 className="text-sm font-medium text-foreground mb-2">Upcoming Leave</h5>
                    <div className="space-y-2">
                      {selectedFacultyData?.leaveRequests?.map((leave) => (
                        <div key={leave?.id} className="p-2 bg-warning/10 border border-warning/20 rounded-md">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-foreground">{leave?.date}</span>
                            <span className={`px-2 py-0.5 text-xs rounded-full ${
                              leave?.status === 'approved' ? 'bg-success text-success-foreground' : 'bg-warning text-warning-foreground'
                            }`}>
                              {leave?.status}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{leave?.reason}</p>
                          {leave?.substitute && (
                            <p className="text-xs text-muted-foreground">Substitute: {leave?.substitute}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Weekly Schedule */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-4">Weekly Schedule</h4>
              <div className="space-y-4">
                {weekDays?.map((day) => (
                  <div key={day} className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="text-sm font-semibold text-foreground">{day}</h5>
                      <span className="text-xs text-muted-foreground">
                        {selectedFacultyData?.schedule?.[day]?.length || 0} classes
                      </span>
                    </div>

                    {selectedFacultyData?.schedule?.[day]?.length > 0 ? (
                      <div className="space-y-2">
                        {selectedFacultyData?.schedule?.[day]?.map((class_, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-primary/5 border border-primary/20 rounded-md"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="text-sm font-medium text-foreground">
                                {class_?.time}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {class_?.subject} • {class_?.batch} • {class_?.room}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="xs" iconName="Edit">
                                Edit
                              </Button>
                              <Button variant="ghost" size="xs" iconName="X">
                                Remove
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4 text-sm text-muted-foreground">
                        No classes scheduled
                      </div>
                    )}

                    {/* Availability */}
                    <div className="mt-3 pt-3 border-t border-border/50">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Available:</span>
                        <span className="text-success">
                          {selectedFacultyData?.availability?.[day]?.available?.join(', ') || 'Not specified'}
                        </span>
                      </div>
                      {selectedFacultyData?.availability?.[day]?.unavailable?.length > 0 && (
                        <div className="flex items-center justify-between text-xs mt-1">
                          <span className="text-muted-foreground">Unavailable:</span>
                          <span className="text-error">
                            {selectedFacultyData?.availability?.[day]?.unavailable?.join(', ')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-medium text-foreground mb-2">Select Faculty Member</h4>
            <p className="text-sm text-muted-foreground">
              Choose a faculty member to view their schedule and workload details.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultySchedule;