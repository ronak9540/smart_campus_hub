import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AnnouncementCard = ({ announcements }) => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpanded = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const posted = new Date(timestamp);
    const diffMs = now - posted;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return 'AlertTriangle';
      case 'medium': return 'Info';
      default: return 'Bell';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      default: return 'text-accent';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Announcements</h3>
        <div className="flex items-center space-x-2">
          {announcements?.filter(a => !a?.read)?.length > 0 && (
            <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full">
              {announcements?.filter(a => !a?.read)?.length} new
            </span>
          )}
          <Icon name="Megaphone" size={20} className="text-muted-foreground" />
        </div>
      </div>
      <div className="space-y-4">
        {announcements?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Megaphone" size={48} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">No announcements yet</p>
          </div>
        ) : (
          <>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {announcements?.slice(0, 5)?.map((announcement) => (
                <div key={announcement?.id} className={`border rounded-lg p-4 transition-smooth ${
                  !announcement?.read ? 'bg-accent/5 border-accent/20' : 'bg-background'
                }`}>
                  <div className="flex items-start space-x-3">
                    <Icon 
                      name={getPriorityIcon(announcement?.priority)} 
                      size={18} 
                      className={`mt-1 ${getPriorityColor(announcement?.priority)}`} 
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className={`font-medium ${!announcement?.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {announcement?.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            By {announcement?.author} • {getTimeAgo(announcement?.timestamp)}
                          </p>
                        </div>
                        {!announcement?.read && (
                          <div className="w-2 h-2 bg-accent rounded-full ml-2 mt-2" />
                        )}
                      </div>
                      
                      <div className="mt-2">
                        <p className="text-sm text-muted-foreground">
                          {expandedId === announcement?.id ? 
                            announcement?.content : 
                            `${announcement?.content?.substring(0, 100)}${announcement?.content?.length > 100 ? '...' : ''}`
                          }
                        </p>
                        
                        {announcement?.content?.length > 100 && (
                          <button
                            onClick={() => toggleExpanded(announcement?.id)}
                            className="text-xs text-accent hover:text-accent/80 mt-1 transition-smooth"
                          >
                            {expandedId === announcement?.id ? 'Show less' : 'Read more'}
                          </button>
                        )}
                      </div>

                      {announcement?.attachments && announcement?.attachments?.length > 0 && (
                        <div className="flex items-center space-x-2 mt-2">
                          <Icon name="Paperclip" size={14} className="text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {announcement?.attachments?.length} attachment{announcement?.attachments?.length > 1 ? 's' : ''}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {announcements?.length > 5 && (
              <div className="text-center pt-2 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  +{announcements?.length - 5} more announcements
                </p>
              </div>
            )}
          </>
        )}

        <Link to="/academic-interactions">
          <Button variant="outline" size="sm" fullWidth iconName="Megaphone" iconPosition="left">
            View All Announcements
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AnnouncementCard;