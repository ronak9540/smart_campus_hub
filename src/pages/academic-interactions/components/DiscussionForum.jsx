import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DiscussionForum = ({ discussions, onCreateDiscussion, onReply, userRole }) => {
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [newDiscussion, setNewDiscussion] = useState({
    title: '',
    category: '',
    content: '',
    tags: ''
  });
  const [replyContent, setReplyContent] = useState('');

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'general', label: 'General Discussion' },
    { value: 'assignments', label: 'Assignments Help' },
    { value: 'projects', label: 'Project Collaboration' },
    { value: 'study-groups', label: 'Study Groups' },
    { value: 'career', label: 'Career Guidance' },
    { value: 'technical', label: 'Technical Discussion' }
  ];

  const filteredDiscussions = discussions?.filter(discussion => {
    const matchesSearch = discussion?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         discussion?.content?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesCategory = filterCategory === 'all' || discussion?.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreateDiscussion = () => {
    if (newDiscussion?.title && newDiscussion?.category && newDiscussion?.content) {
      const tags = newDiscussion?.tags?.split(',')?.map(tag => tag?.trim())?.filter(tag => tag);
      onCreateDiscussion({
        ...newDiscussion,
        id: Date.now()?.toString(),
        author: 'Current User',
        createdAt: new Date()?.toISOString(),
        replies: [],
        views: 0,
        likes: 0,
        tags
      });
      setNewDiscussion({ title: '', category: '', content: '', tags: '' });
      setIsCreateModalOpen(false);
    }
  };

  const handleReply = (discussionId) => {
    if (replyContent?.trim()) {
      onReply(discussionId, {
        id: Date.now()?.toString(),
        author: 'Current User',
        content: replyContent,
        createdAt: new Date()?.toISOString(),
        likes: 0
      });
      setReplyContent('');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return formatDate(dateString);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Discussion Forum</h2>
          <p className="text-sm text-muted-foreground">Connect and collaborate with your peers</p>
        </div>
        <Button 
          variant="default" 
          onClick={() => setIsCreateModalOpen(true)}
          iconName="Plus"
          iconPosition="left"
        >
          Start Discussion
        </Button>
      </div>
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search discussions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-full"
          />
        </div>
        <div className="sm:w-48">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e?.target?.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {categories?.map(category => (
              <option key={category?.value} value={category?.value}>
                {category?.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Discussions List */}
      <div className="space-y-4">
        {filteredDiscussions?.map(discussion => (
          <div key={discussion?.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-elevated transition-smooth">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold text-foreground cursor-pointer hover:text-accent" 
                      onClick={() => setSelectedDiscussion(discussion)}>
                    {discussion?.title}
                  </h3>
                  <span className="px-2 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium">
                    {discussion?.category}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">By {discussion?.author} • {getTimeAgo(discussion?.createdAt)}</p>
                <p className="text-sm text-foreground line-clamp-2 mb-3">{discussion?.content}</p>
                
                {discussion?.tags && discussion?.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {discussion?.tags?.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Icon name="MessageCircle" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{discussion?.replies?.length || 0} replies</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Eye" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{discussion?.views} views</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Heart" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{discussion?.likes} likes</span>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setSelectedDiscussion(discussion)}
              >
                View Discussion
              </Button>
            </div>
          </div>
        ))}
      </div>
      {filteredDiscussions?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="MessageCircle" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No discussions found</h3>
          <p className="text-muted-foreground">Start a new discussion to connect with your peers.</p>
        </div>
      )}
      {/* Create Discussion Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Start New Discussion</h3>
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
                placeholder="What would you like to discuss?"
                value={newDiscussion?.title}
                onChange={(e) => setNewDiscussion({...newDiscussion, title: e?.target?.value})}
                required
              />
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Category</label>
                <select
                  value={newDiscussion?.category}
                  onChange={(e) => setNewDiscussion({...newDiscussion, category: e?.target?.value})}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                >
                  <option value="">Select category</option>
                  {categories?.slice(1)?.map(category => (
                    <option key={category?.value} value={category?.value}>
                      {category?.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Content</label>
                <textarea
                  value={newDiscussion?.content}
                  onChange={(e) => setNewDiscussion({...newDiscussion, content: e?.target?.value})}
                  placeholder="Share your thoughts, questions, or ideas..."
                  rows={6}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  required
                />
              </div>
              
              <Input
                label="Tags (optional)"
                type="text"
                placeholder="Separate tags with commas (e.g., javascript, react, help)"
                value={newDiscussion?.tags}
                onChange={(e) => setNewDiscussion({...newDiscussion, tags: e?.target?.value})}
              />
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
                onClick={handleCreateDiscussion}
                fullWidth
              >
                Start Discussion
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Discussion Details Modal */}
      {selectedDiscussion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">{selectedDiscussion?.title}</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedDiscussion(null)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
            
            <div className="space-y-6">
              {/* Original Post */}
              <div className="border-b border-border pb-6">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="px-2 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium">
                    {selectedDiscussion?.category}
                  </span>
                  <span className="text-sm text-muted-foreground">By {selectedDiscussion?.author}</span>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{formatDate(selectedDiscussion?.createdAt)}</span>
                </div>
                <p className="text-foreground mb-4">{selectedDiscussion?.content}</p>
                
                {selectedDiscussion?.tags && selectedDiscussion?.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {selectedDiscussion?.tags?.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Icon name="Eye" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{selectedDiscussion?.views} views</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Heart" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{selectedDiscussion?.likes} likes</span>
                  </div>
                </div>
              </div>
              
              {/* Replies */}
              <div>
                <h4 className="font-medium text-foreground mb-4">
                  Replies ({selectedDiscussion?.replies?.length || 0})
                </h4>
                
                {selectedDiscussion?.replies && selectedDiscussion?.replies?.length > 0 ? (
                  <div className="space-y-4 mb-6">
                    {selectedDiscussion?.replies?.map(reply => (
                      <div key={reply?.id} className="bg-muted p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-foreground">{reply?.author}</span>
                          <span className="text-xs text-muted-foreground">{getTimeAgo(reply?.createdAt)}</span>
                        </div>
                        <p className="text-sm text-foreground mb-2">{reply?.content}</p>
                        <div className="flex items-center space-x-1">
                          <Icon name="Heart" size={14} className="text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{reply?.likes} likes</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground mb-6">No replies yet. Be the first to reply!</p>
                )}
                
                {/* Reply Form */}
                <div className="space-y-3">
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e?.target?.value)}
                    placeholder="Write your reply..."
                    rows={3}
                    className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  />
                  <div className="flex justify-end">
                    <Button
                      variant="default"
                      onClick={() => handleReply(selectedDiscussion?.id)}
                      disabled={!replyContent?.trim()}
                    >
                      Post Reply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscussionForum;