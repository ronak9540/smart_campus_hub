import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const LibrarySection = ({ isVisible, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const libraryBooks = [
    {
      id: 1,
      title: "Data Structures and Algorithms",
      author: "Thomas H. Cormen",
      isbn: "978-0262033848",
      category: "Computer Science",
      availability: "Available",
      location: "CS Section - Shelf A3",
      dueDate: null,
      rating: 4.8
    },
    {
      id: 2,
      title: "Introduction to Machine Learning",
      author: "Ethem Alpaydin",
      isbn: "978-0262028189",
      category: "Computer Science",
      availability: "Borrowed",
      location: "CS Section - Shelf B2",
      dueDate: "2025-09-18",
      rating: 4.6
    },
    {
      id: 3,
      title: "Digital Signal Processing",
      author: "John G. Proakis",
      isbn: "978-0131873742",
      category: "Electronics",
      availability: "Available",
      location: "ECE Section - Shelf C1",
      dueDate: null,
      rating: 4.5
    },
    {
      id: 4,
      title: "Fundamentals of Physics",
      author: "David Halliday",
      isbn: "978-1118230718",
      category: "Physics",
      availability: "Reserved",
      location: "Physics Section - Shelf D4",
      dueDate: "2025-09-15",
      rating: 4.7
    }
  ];

  const categories = ['all', 'Computer Science', 'Electronics', 'Physics', 'Mathematics'];

  const filteredBooks = libraryBooks?.filter(book => {
    const matchesSearch = book?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         book?.author?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || book?.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'Available':
        return 'text-success bg-success/10';
      case 'Borrowed':
        return 'text-error bg-error/10';
      case 'Reserved':
        return 'text-warning bg-warning/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="BookOpen" size={20} color="white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Library Portal</h2>
              <p className="text-sm text-muted-foreground">Search and manage your books</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                type="search"
                placeholder="Search books by title or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories?.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === 'all' ? 'All Categories' : category}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 max-h-96 overflow-y-auto">
            {filteredBooks?.map((book) => (
              <div key={book?.id} className="bg-muted/50 border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{book?.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">by {book?.author}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>ISBN: {book?.isbn}</span>
                      <span>Category: {book?.category}</span>
                      <span>Location: {book?.location}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(book?.availability)}`}>
                      {book?.availability}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={12} className="text-warning fill-current" />
                      <span className="text-xs text-muted-foreground">{book?.rating}</span>
                    </div>
                  </div>
                </div>

                {book?.dueDate && (
                  <div className="mb-3">
                    <p className="text-xs text-muted-foreground">
                      Due Date: <span className="font-medium">{book?.dueDate}</span>
                    </p>
                  </div>
                )}

                <div className="flex gap-2">
                  {book?.availability === 'Available' && (
                    <>
                      <Button variant="outline" size="sm" iconName="BookmarkPlus">
                        Reserve
                      </Button>
                      <Button variant="default" size="sm" iconName="Download">
                        E-Book
                      </Button>
                    </>
                  )}
                  {book?.availability === 'Borrowed' && (
                    <Button variant="outline" size="sm" iconName="RotateCcw">
                      Renew
                    </Button>
                  )}
                  {book?.availability === 'Reserved' && (
                    <Button variant="outline" size="sm" iconName="Clock">
                      View Queue
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredBooks?.length === 0 && (
            <div className="text-center py-8">
              <Icon name="BookOpen" size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No books found matching your search criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LibrarySection;