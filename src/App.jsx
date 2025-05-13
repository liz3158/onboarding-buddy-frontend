import { useContext, useEffect } from "react";
import "./App.scss";
import { ThemeContext, ThemeProvider } from "./contexts/ThemeContext";
import { DARK_THEME, LIGHT_THEME } from "./constants/themeConstants";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MoonIcon from "./assets/icons/moon.svg";
import SunIcon from "./assets/icons/sun.svg";
import BaseLayout from "./components/layout/BaseLayout";
import UserLayout from "./modules/user/layout/UserLayout";
import Dashboard from "./modules/admin/AdminDashboard";
import UploadGuidebook from "./modules/admin/components/Guidebook/UploadGuidebook";
import AssignTaskForm from "./modules/admin/components/AssignTask/AssignTaskForm";
import TeamManagement from "./modules/admin/components/Team/TeamManagement";
import EngineeringRoles from "./modules/admin/components/Roles/EngineeringRoles";
import MembersControlCenter from "./modules/admin/components/Members/MembersControlCenter";
import LandingPage from "./pages/LandingPage";
import UserDashboard from "./modules/user/UserDashboard";
import TimelineView from "./modules/timeline/TimelineView";
import BlogPage from "./pages/BlogPage";
import FAQCenter from "./pages/FAQCenter";
import SchedulePage from "./modules/schedule/SchedulePage";
import TaskReportPage from "./modules/admin/components/report/TaskReportPage";
import FAQCoding from "./pages/FAQCoding";
import ChatboxAI from "./modules/help/helpchatbox/ChatboxAI";
import VirtualMentor from "./modules/virtualMentor/VirtualMentor";
import AboutMe from "./modules/user/AboutMe";
import UserSettings from "./modules/user/settings/UserSettings";
import AdminSettings from "./modules/admin/settings/AdminSettings";
import MyTask from "./modules/user/mytask";
import { ChallengeProvider } from "./contexts/ChallengeContext";
import MyTasksPage from "./pages/MyTasksPage";
import MyTeamPage from "./pages/MyTeamPage";
import MyProjectsPage from "./pages/MyProjectsPage";
import AMHelpCenter from "./modules/help/AMHelpCenter";
import UserGuidebook from "./modules/user/guidebook/UserGuidebook";
import AdminSchedulePage from "./modules/admin/schedule/AdminSchedulePage";


function AppContent() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  // adding dark-mode class if the dark mode is set on to the body tag
  useEffect(() => {
    if (theme === DARK_THEME) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  return (
    <div className={`page-wrapper ${theme === DARK_THEME ? 'dark-theme' : ''}`}>
      <Router>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<BaseLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="members" element={<MembersControlCenter />} />
            <Route path="guidebooks" element={<UploadGuidebook />} />
            <Route path="tasks" element={<AssignTaskForm />} />
            <Route path="teams" element={<TeamManagement />} />
            <Route path="roles" element={<EngineeringRoles />} />
            <Route path="reports" element={<TaskReportPage />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="schedule" element={<AdminSchedulePage />} />

          </Route>

          {/* User Routes */}
          <Route path="/user" element={<UserLayout />}>
            <Route index element={<Navigate to="/user/dashboard" replace />} />
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="tasks" element={<MyTasksPage />} />
            <Route path="timeline" element={<TimelineView />} />
            <Route path="project-directory" element={<MyProjectsPage />} />
            <Route path="team-directory" element={<MyTeamPage />} />
            <Route path="about-me" element={<AboutMe />} />
            <Route path="coding-challenges" element={
              <ChallengeProvider>
                <FAQCoding />
              </ChallengeProvider>
            } />      
          
        
            <Route path="tasks" element={<UserDashboard />} />
            <Route path="schedule" element={<SchedulePage />} />
            <Route path="timeline" element={<TimelineView />} />
            <Route path="team-directory" element={<TeamManagement />} />
            <Route path="about-me" element={<AboutMe />} />
            <Route path="coding-challenges" element={<UserDashboard />} />
            <Route path="faq" element={<FAQCenter />} />
            <Route path="virtual-mentor" element={<VirtualMentor />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="reports" element={<TaskReportPage />} />
            <Route path="help-center" element={<AMHelpCenter />} />
            <Route path="settings" element={<UserSettings />} />
            <Route path="guidebook" element={<UserGuidebook />} />
          </Route>
        </Routes>

        <button
          type="button"
          className="theme-toggle-btn"
          onClick={toggleTheme}
        >
          <img
            className="theme-icon"
            src={theme === LIGHT_THEME ? SunIcon : MoonIcon}
            alt={theme === LIGHT_THEME ? "Light mode" : "Dark mode"}
          />
        </button>

        {/* Add ChatboxAI component */}
        <ChatboxAI onboardingPhase="orientation" />
      </Router>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
