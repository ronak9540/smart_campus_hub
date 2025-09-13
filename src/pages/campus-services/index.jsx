import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ServiceCard from './components/ServiceCard';
import LibrarySection from './components/LibrarySection';
import HostelSection from './components/HostelSection';
import TransportSection from './components/TransportSection';
import FeePaymentSection from './components/FeePaymentSection';
import ExamPortalSection from './components/ExamPortalSection';
import ServiceRequestSection from './components/ServiceRequestSection';

const CampusServices = () => {
  const [activeSection, setActiveSection] = useState(null);

  const services = [
    {
      id: 'library',
      title: 'Library Services',
      subtitle: 'Digital & Physical Resources',
      description: 'Access digital library, search books, reserve materials, and manage your reading list with our comprehensive library management system.',
      icon: 'BookOpen',
      bgColor: 'bg-blue-500',
      status: 'available',
      stats: [
        { value: '15,000+', label: 'Books' },
        { value: '2,500+', label: 'E-Books' },
        { value: '150+', label: 'Journals' }
      ]
    },
    {
      id: 'hostel',
      title: 'Hostel Management',
      subtitle: 'Accommodation Services',
      description: 'Manage room assignments, meal schedules, maintenance requests, and visitor registrations through our integrated hostel portal.',
      icon: 'Building',
      bgColor: 'bg-green-500',
      status: 'available',
      stats: [
        { value: 'A-204', label: 'Your Room' },
        { value: '2', label: 'Roommates' },
        { value: '1', label: 'Pending Requests' }
      ]
    },
    {
      id: 'transport',
      title: 'Transport Services',
      subtitle: 'Campus Shuttle System',
      description: 'Track bus locations in real-time, view schedules, set reminders, and plan your campus commute efficiently.',
      icon: 'Bus',
      bgColor: 'bg-purple-500',
      status: 'available',
      stats: [
        { value: '3', label: 'Active Routes' },
        { value: '12', label: 'Daily Trips' },
        { value: '5 mins', label: 'Next Bus' }
      ]
    },
    {
      id: 'fees',
      title: 'Fee Payment',
      subtitle: 'Secure Payment Gateway',
      description: 'Pay tuition fees, hostel charges, and other expenses securely online with multiple payment options and instant receipts.',
      icon: 'CreditCard',
      bgColor: 'bg-orange-500',
      status: 'available',
      stats: [
        { value: '$3,450', label: 'Pending' },
        { value: '3', label: 'Due Items' },
        { value: 'Sep 30', label: 'Next Due' }
      ]
    },
    {
      id: 'exam',
      title: 'Exam Portal',
      subtitle: 'Examination Management',
      description: 'Access exam schedules, download hall tickets, view results, and track your academic performance through our exam portal.',
      icon: 'FileText',
      bgColor: 'bg-red-500',
      status: 'available',
      stats: [
        { value: '3', label: 'Upcoming' },
        { value: '8.5', label: 'Current GPA' },
        { value: 'Sep 20', label: 'Next Exam' }
      ]
    },
    {
      id: 'support',
      title: 'Service Requests',
      subtitle: 'Help & Support Center',
      description: 'Submit maintenance requests, facility bookings, IT support tickets, and track the status of your service requests.',
      icon: 'Headphones',
      bgColor: 'bg-teal-500',
      status: 'available',
      stats: [
        { value: '2', label: 'Active Requests' },
        { value: '1', label: 'In Progress' },
        { value: '5', label: 'Completed' }
      ]
    }
  ];

  const emergencyContacts = [
    { title: 'Campus Security', number: '+1-555-0911', icon: 'Shield' },
    { title: 'Medical Emergency', number: '+1-555-0912', icon: 'Heart' },
    { title: 'IT Helpdesk', number: '+1-555-0913', icon: 'Monitor' },
    { title: 'Student Affairs', number: '+1-555-0914', icon: 'Users' }
  ];

  const quickActions = [
    { title: 'Campus Map', icon: 'Map', action: () => window.open('https://www.google.com/maps?q=40.7128,-74.0060&z=15&output=embed', '_blank') },
    { title: 'Academic Calendar', icon: 'Calendar', action: () => alert('Academic calendar will open') },
    { title: 'Student Handbook', icon: 'Book', action: () => alert('Student handbook will download') },
    { title: 'Contact Directory', icon: 'Phone', action: () => alert('Contact directory will open') }
  ];

  const handleServiceClick = (service) => {
    setActiveSection(service?.id);
  };

  const closeSection = () => {
    setActiveSection(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Building" size={24} color="white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Campus Services</h1>
              <p className="text-muted-foreground">Centralized access to all campus facilities and services</p>
            </div>
          </div>
        </div>

        {/* Service Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {services?.map((service) => (
            <ServiceCard
              key={service?.id}
              service={service}
              onServiceClick={handleServiceClick}
            />
          ))}
        </div>

        {/* Quick Actions & Emergency Contacts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Quick Actions */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
              <Icon name="Zap" size={20} className="mr-2" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {quickActions?.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={action?.action}
                  className="h-16 flex-col space-y-2"
                >
                  <Icon name={action?.icon} size={20} />
                  <span className="text-xs">{action?.title}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
              <Icon name="Phone" size={20} className="mr-2" />
              Emergency Contacts
            </h2>
            <div className="space-y-3">
              {emergencyContacts?.map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-error rounded-lg flex items-center justify-center">
                      <Icon name={contact?.icon} size={16} color="white" />
                    </div>
                    <span className="font-medium text-foreground">{contact?.title}</span>
                  </div>
                  <a
                    href={`tel:${contact?.number}`}
                    className="text-primary hover:text-primary/80 font-medium"
                  >
                    {contact?.number}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Campus Map */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
            <Icon name="MapPin" size={20} className="mr-2" />
            Campus Location
          </h2>
          <div className="w-full h-64 rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="Smart Campus Hub Location"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=40.7128,-74.0060&z=15&output=embed"
              className="border-0"
            />
          </div>
        </div>
      </main>
      {/* Service Sections */}
      <LibrarySection isVisible={activeSection === 'library'} onClose={closeSection} />
      <HostelSection isVisible={activeSection === 'hostel'} onClose={closeSection} />
      <TransportSection isVisible={activeSection === 'transport'} onClose={closeSection} />
      <FeePaymentSection isVisible={activeSection === 'fees'} onClose={closeSection} />
      <ExamPortalSection isVisible={activeSection === 'exam'} onClose={closeSection} />
      <ServiceRequestSection isVisible={activeSection === 'support'} onClose={closeSection} />
    </div>
  );
};

export default CampusServices;