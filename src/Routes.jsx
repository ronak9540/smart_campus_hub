import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AcademicInteractions from './pages/academic-interactions';
import CampusServices from './pages/campus-services';
import AttendanceTracking from './pages/attendance-tracking';
import TimetableManagement from './pages/timetable-management';
import SmartCalendar from './pages/smart-calendar';
import StudentDashboard from './pages/student-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AcademicInteractions />} />
        <Route path="/academic-interactions" element={<AcademicInteractions />} />
        <Route path="/campus-services" element={<CampusServices />} />
        <Route path="/attendance-tracking" element={<AttendanceTracking />} />
        <Route path="/timetable-management" element={<TimetableManagement />} />
        <Route path="/smart-calendar" element={<SmartCalendar />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
