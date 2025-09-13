import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const FeedbackSystem = ({ feedbacks, onSubmitFeedback, userRole }) => {
  const [selectedFeedbackType, setSelectedFeedbackType] = useState('course');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [feedbackData, setFeedbackData] = useState({
    type: 'course',
    subject: '',
    instructor: '',
    rating: 5,
    comments: '',
    suggestions: '',
    anonymous: true
  });

  const feedbackTypes = [
    { value: 'course', label: 'Course Evaluation', icon: 'BookOpen' },
    { value: 'instructor', label: 'Instructor Feedback', icon: 'User' },
    { value: 'facility', label: 'Facility Feedback', icon: 'Building' },
    { value: 'service', label: 'Service Feedback', icon: 'Settings' },
    { value: 'general', label: 'General Feedback', icon: 'MessageCircle' }
  ];

  const subjects = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Computer Science',
    'English Literature',
    'History',
    'Economics',
    'Biology'
  ];

  const instructors = [
    'Dr. Sarah Johnson',
    'Prof. Michael Chen',
    'Dr. Emily Davis',
    'Prof. Robert Wilson',
    'Dr. Lisa Anderson',
    'Prof. David Brown'
  ];

  const filteredFeedbacks = feedbacks?.filter(feedback => 
    selectedFeedbackType === 'all' || feedback?.type === selectedFeedbackType
  );

  const handleSubmitFeedback = () => {
    if (feedbackData?.type && feedbackData?.comments) {
      onSubmitFeedback({
        ...feedbackData,
        id: Date.now()?.toString(),
        submittedAt: new Date()?.toISOString(),
        submittedBy: feedbackData?.anonymous ? 'Anonymous' : 'Current User',
        status: 'submitted'
      });
      setFeedbackData({
        type: 'course',
        subject: '',
        instructor: '',
        rating: 5,
        comments: '',
        suggestions: '',
        anonymous: true
      });
      setIsSubmitModalOpen(false);
    }
  };

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < rating ? 'text-warning fill-current' : 'text-muted-foreground'}
      />
    ));
  };

  const getAverageRating = (feedbacks) => {
    if (feedbacks?.length === 0) return 0;
    const sum = feedbacks?.reduce((acc, feedback) => acc + feedback?.rating, 0);
    return (sum / feedbacks?.length)?.toFixed(1);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Feedback System</h2>
          <p className="text-sm text-muted-foreground">Share your thoughts and help us improve</p>
        </div>
        <Button 
          variant="default" 
          onClick={() => setIsSubmitModalOpen(true)}
          iconName="Plus"
          iconPosition="left"
        >
          Submit Feedback
        </Button>
      </div>
      {/* Feedback Types */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {feedbackTypes?.map(type => (
          <button
            key={type?.value}
            onClick={() => setSelectedFeedbackType(type?.value)}
            className={`p-4 rounded-lg border transition-smooth text-center ${
              selectedFeedbackType === type?.value
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card text-foreground hover:bg-muted'
            }`}
          >
            <Icon name={type?.icon} size={24} className="mx-auto mb-2" />
            <p className="text-sm font-medium">{type?.label}</p>
          </button>
        ))}
      </div>
      {/* Statistics */}
      {userRole === 'admin' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="MessageCircle" size={20} className="text-accent" />
              <h3 className="font-semibold text-foreground">Total Feedback</h3>
            </div>
            <p className="text-2xl font-bold text-foreground">{feedbacks?.length}</p>
            <p className="text-sm text-muted-foreground">All time submissions</p>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Star" size={20} className="text-warning" />
              <h3 className="font-semibold text-foreground">Average Rating</h3>
            </div>
            <div className="flex items-center space-x-2">
              <p className="text-2xl font-bold text-foreground">{getAverageRating(feedbacks)}</p>
              <div className="flex space-x-1">
                {getRatingStars(Math.round(getAverageRating(feedbacks)))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Based on all feedback</p>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="TrendingUp" size={20} className="text-success" />
              <h3 className="font-semibold text-foreground">This Month</h3>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {feedbacks?.filter(f => {
                const feedbackDate = new Date(f.submittedAt);
                const currentMonth = new Date()?.getMonth();
                return feedbackDate?.getMonth() === currentMonth;
              })?.length}
            </p>
            <p className="text-sm text-muted-foreground">New submissions</p>
          </div>
        </div>
      )}
      {/* Feedback List */}
      {userRole === 'admin' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Recent Feedback</h3>
          {filteredFeedbacks?.slice(0, 10)?.map(feedback => (
            <div key={feedback?.id} className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="px-2 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium">
                      {feedback?.type}
                    </span>
                    <div className="flex space-x-1">
                      {getRatingStars(feedback?.rating)}
                    </div>
                    <span className="text-sm text-muted-foreground">({feedback?.rating}/5)</span>
                  </div>
                  {feedback?.subject && (
                    <p className="text-sm text-muted-foreground mb-1">Subject: {feedback?.subject}</p>
                  )}
                  {feedback?.instructor && (
                    <p className="text-sm text-muted-foreground mb-2">Instructor: {feedback?.instructor}</p>
                  )}
                  <p className="text-sm text-foreground mb-2">{feedback?.comments}</p>
                  {feedback?.suggestions && (
                    <p className="text-sm text-muted-foreground">Suggestions: {feedback?.suggestions}</p>
                  )}
                </div>
                <div className="text-right ml-4">
                  <p className="text-sm text-muted-foreground">By {feedback?.submittedBy}</p>
                  <p className="text-sm text-muted-foreground">{formatDate(feedback?.submittedAt)}</p>
                </div>
              </div>
            </div>
          ))}
          
          {filteredFeedbacks?.length === 0 && (
            <div className="text-center py-12">
              <Icon name="MessageCircle" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No feedback found</h3>
              <p className="text-muted-foreground">No feedback submissions for this category yet.</p>
            </div>
          )}
        </div>
      )}
      {/* Submit Feedback Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Submit Feedback</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSubmitModalOpen(false)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Feedback Type</label>
                <select
                  value={feedbackData?.type}
                  onChange={(e) => setFeedbackData({...feedbackData, type: e?.target?.value})}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {feedbackTypes?.map(type => (
                    <option key={type?.value} value={type?.value}>
                      {type?.label}
                    </option>
                  ))}
                </select>
              </div>
              
              {(feedbackData?.type === 'course' || feedbackData?.type === 'instructor') && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Subject</label>
                  <select
                    value={feedbackData?.subject}
                    onChange={(e) => setFeedbackData({...feedbackData, subject: e?.target?.value})}
                    className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select subject</option>
                    {subjects?.map(subject => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              
              {feedbackData?.type === 'instructor' && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Instructor</label>
                  <select
                    value={feedbackData?.instructor}
                    onChange={(e) => setFeedbackData({...feedbackData, instructor: e?.target?.value})}
                    className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select instructor</option>
                    {instructors?.map(instructor => (
                      <option key={instructor} value={instructor}>
                        {instructor}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Rating</label>
                <div className="flex items-center space-x-2">
                  {Array.from({ length: 5 }, (_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setFeedbackData({...feedbackData, rating: index + 1})}
                      className="focus:outline-none"
                    >
                      <Icon
                        name="Star"
                        size={24}
                        className={index < feedbackData?.rating ? 'text-warning fill-current' : 'text-muted-foreground'}
                      />
                    </button>
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">({feedbackData?.rating}/5)</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Comments</label>
                <textarea
                  value={feedbackData?.comments}
                  onChange={(e) => setFeedbackData({...feedbackData, comments: e?.target?.value})}
                  placeholder="Share your detailed feedback..."
                  rows={4}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Suggestions (Optional)</label>
                <textarea
                  value={feedbackData?.suggestions}
                  onChange={(e) => setFeedbackData({...feedbackData, suggestions: e?.target?.value})}
                  placeholder="Any suggestions for improvement..."
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={feedbackData?.anonymous}
                  onChange={(e) => setFeedbackData({...feedbackData, anonymous: e?.target?.checked})}
                  className="rounded border-border text-primary focus:ring-ring"
                />
                <label htmlFor="anonymous" className="text-sm text-foreground">
                  Submit anonymously
                </label>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setIsSubmitModalOpen(false)}
                fullWidth
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={handleSubmitFeedback}
                fullWidth
              >
                Submit Feedback
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackSystem;