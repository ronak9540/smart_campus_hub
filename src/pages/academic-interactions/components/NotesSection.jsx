import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const NotesSection = ({ notes, onUpload, onDownload, onDelete, userRole }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadData, setUploadData] = useState({
    title: '',
    category: '',
    description: '',
    file: null
  });

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'lecture', label: 'Lecture Notes' },
    { value: 'assignment', label: 'Assignment Solutions' },
    { value: 'reference', label: 'Reference Materials' },
    { value: 'project', label: 'Project Resources' }
  ];

  const filteredNotes = notes?.filter(note => {
    const matchesSearch = note?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         note?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || note?.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleUpload = () => {
    if (uploadData?.title && uploadData?.category && uploadData?.file) {
      onUpload(uploadData);
      setUploadData({ title: '', category: '', description: '', file: null });
      setIsUploadModalOpen(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const getFileIcon = (fileType) => {
    if (fileType?.includes('pdf')) return 'FileText';
    if (fileType?.includes('doc')) return 'FileText';
    if (fileType?.includes('image')) return 'Image';
    if (fileType?.includes('video')) return 'Video';
    return 'File';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Notes & Resources</h2>
          <p className="text-sm text-muted-foreground">Share and access study materials</p>
        </div>
        {(userRole === 'teacher' || userRole === 'student') && (
          <Button 
            variant="default" 
            onClick={() => setIsUploadModalOpen(true)}
            iconName="Upload"
            iconPosition="left"
          >
            Upload Notes
          </Button>
        )}
      </div>
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-full"
          />
        </div>
        <div className="sm:w-48">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e?.target?.value)}
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
      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes?.map(note => (
          <div key={note?.id} className="bg-card border border-border rounded-lg p-4 hover:shadow-elevated transition-smooth">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Icon name={getFileIcon(note?.fileType)} size={20} className="text-accent" />
                <div>
                  <h3 className="font-medium text-foreground text-sm">{note?.title}</h3>
                  <p className="text-xs text-muted-foreground">{note?.category}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDownload(note?.id)}
                  className="h-8 w-8"
                >
                  <Icon name="Download" size={16} />
                </Button>
                {(userRole === 'teacher' || note?.uploadedBy === 'current-user') && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(note?.id)}
                    className="h-8 w-8 text-error hover:text-error"
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                )}
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{note?.description}</p>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{formatFileSize(note?.fileSize)}</span>
              <span>By {note?.uploadedBy}</span>
            </div>
            
            <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
              <span>{new Date(note.uploadDate)?.toLocaleDateString()}</span>
              <div className="flex items-center space-x-1">
                <Icon name="Download" size={12} />
                <span>{note?.downloadCount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredNotes?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No notes found</h3>
          <p className="text-muted-foreground">Try adjusting your search or upload some notes to get started.</p>
        </div>
      )}
      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Upload Notes</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsUploadModalOpen(false)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
            
            <div className="space-y-4">
              <Input
                label="Title"
                type="text"
                placeholder="Enter note title"
                value={uploadData?.title}
                onChange={(e) => setUploadData({...uploadData, title: e?.target?.value})}
                required
              />
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Category</label>
                <select
                  value={uploadData?.category}
                  onChange={(e) => setUploadData({...uploadData, category: e?.target?.value})}
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
              
              <Input
                label="Description"
                type="text"
                placeholder="Brief description (optional)"
                value={uploadData?.description}
                onChange={(e) => setUploadData({...uploadData, description: e?.target?.value})}
              />
              
              <Input
                label="File"
                type="file"
                onChange={(e) => setUploadData({...uploadData, file: e?.target?.files?.[0]})}
                required
              />
            </div>
            
            <div className="flex space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setIsUploadModalOpen(false)}
                fullWidth
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={handleUpload}
                fullWidth
              >
                Upload
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesSection;