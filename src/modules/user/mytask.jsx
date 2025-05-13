import React, { useState, useEffect, useContext } from "react";
import { 
  FiSearch, FiSun, FiMoon, FiFolder, FiUser, FiSettings, FiList, 
  FiCalendar, FiClock, FiFileText, FiCheckSquare, FiAlertCircle,
  FiBarChart2, FiPlus, FiUsers, FiPieChart
} from "react-icons/fi";
import { ThemeContext } from "../../contexts/ThemeContext";
import { DARK_THEME, LIGHT_THEME } from "../../constants/themeConstants";
import "./mytask.css";
import { Link } from "react-router-dom";

const MyTask = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("tasks");
  
  // Determine if dark mode is active
  const isDarkMode = theme === DARK_THEME;

  // Mock data for tasks
  useEffect(() => {
    const mockTasks = [
      {
        id: 1,
        title: "Complete Frontend Design",
        status: "todo",
        priority: "high",
        dueDate: "2023-12-15",
        assignedBy: "Sarah Johnson",
        description: "Finish designing the user interface for the new dashboard features."
      },
      {
        id: 2,
        title: "Backend API Integration",
        status: "progress",
        priority: "high",
        dueDate: "2023-12-10",
        assignedBy: "Michael Chen",
        description: "Implement the API integration for user authentication and data retrieval."
      },
      {
        id: 3,
        title: "Database Optimization",
        status: "completed",
        priority: "medium",
        dueDate: "2023-12-05",
        assignedBy: "Alex Wong",
        description: "Optimize database queries for improved performance on high-traffic pages."
      },
      {
        id: 4,
        title: "Write Documentation",
        status: "todo",
        priority: "low",
        dueDate: "2023-12-20",
        assignedBy: "Jessica Miller",
        description: "Create comprehensive documentation for the new features and API endpoints."
      },
      {
        id: 5,
        title: "User Testing",
        status: "progress",
        priority: "medium",
        dueDate: "2023-12-18",
        assignedBy: "David Brown",
        description: "Conduct user testing sessions for the new dashboard interface."
      },
      {
        id: 6,
        title: "Bug Fixes",
        status: "todo",
        priority: "high",
        dueDate: "2023-12-08",
        assignedBy: "Emily Clark",
        description: "Address critical bugs reported in the latest release."
      }
    ];
    
    setTasks(mockTasks);
    setFilteredTasks(mockTasks);
  }, []);

  // Mock data for projects
  const projects = [
    {
      id: 1,
      name: "Dashboard Redesign",
      progress: 75,
      dueDate: "2023-12-30",
      teamMembers: ["Sarah J.", "Michael C.", "Alex W."],
      tasks: 12,
      completedTasks: 9
    },
    {
      id: 2,
      name: "API Development",
      progress: 50,
      dueDate: "2024-01-15",
      teamMembers: ["Jessica M.", "David B."],
      tasks: 8,
      completedTasks: 4
    },
    {
      id: 3,
      name: "Mobile App Launch",
      progress: 30,
      dueDate: "2024-02-10",
      teamMembers: ["Emily C.", "Sarah J.", "Alex W."],
      tasks: 15,
      completedTasks: 5
    },
    {
      id: 4,
      name: "User Documentation",
      progress: 90,
      dueDate: "2023-12-12",
      teamMembers: ["Jessica M."],
      tasks: 5,
      completedTasks: 4
    }
  ];

  // Mock data for team members
  const teamMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Lead Designer",
      avatar: "SJ",
      email: "sarah.johnson@example.com",
      activeTasks: 3
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Senior Developer",
      avatar: "MC",
      email: "michael.chen@example.com",
      activeTasks: 2
    },
    {
      id: 3,
      name: "Alex Wong",
      role: "Database Engineer",
      avatar: "AW",
      email: "alex.wong@example.com",
      activeTasks: 1
    },
    {
      id: 4,
      name: "Jessica Miller",
      role: "Technical Writer",
      avatar: "JM",
      email: "jessica.miller@example.com",
      activeTasks: 2
    },
    {
      id: 5,
      name: "David Brown",
      role: "QA Engineer",
      avatar: "DB",
      email: "david.brown@example.com",
      activeTasks: 1
    },
    {
      id: 6,
      name: "Emily Clark",
      role: "Frontend Developer",
      avatar: "EC",
      email: "emily.clark@example.com",
      activeTasks: 2
    }
  ];

  // Calendar events
  const calendarEvents = [
    {
      id: 1,
      title: "Team Standup",
      date: "2023-12-05",
      time: "09:00 - 09:30",
      participants: ["All Team Members"],
      location: "Virtual - Zoom"
    },
    {
      id: 2,
      title: "Project Review",
      date: "2023-12-08",
      time: "14:00 - 15:00",
      participants: ["Sarah Johnson", "Michael Chen", "Alex Wong"],
      location: "Conference Room B"
    },
    {
      id: 3,
      title: "Client Meeting",
      date: "2023-12-10",
      time: "10:00 - 11:30",
      participants: ["Sarah Johnson", "Jessica Miller"],
      location: "Virtual - Teams"
    },
    {
      id: 4,
      title: "Sprint Planning",
      date: "2023-12-12",
      time: "13:00 - 14:30",
      participants: ["All Team Members"],
      location: "Main Conference Room"
    },
    {
      id: 5,
      title: "UX Design Workshop",
      date: "2023-12-15",
      time: "11:00 - 12:30",
      participants: ["Sarah Johnson", "Emily Clark"],
      location: "Design Lab"
    }
  ];

  // Apply filters and search
  useEffect(() => {
    let result = [...tasks];
    
    // Apply search term
    if (searchTerm) {
      result = result.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter(task => task.status === statusFilter);
    }
    
    // Apply priority filter
    if (priorityFilter !== "all") {
      result = result.filter(task => task.priority === priorityFilter);
    }
    
    setFilteredTasks(result);
  }, [tasks, statusFilter, priorityFilter, searchTerm]);

  const getStatusClass = (status) => {
    switch (status) {
      case "todo":
        return "status-todo";
      case "progress":
        return "status-progress";
      case "completed":
        return "status-completed";
      default:
        return "";
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "high":
        return "priority-high";
      case "medium":
        return "priority-medium";
      case "low":
        return "priority-low";
      default:
        return "";
    }
  };

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "tasks":
        return (
          <>
            <h1>My Tasks</h1>
            
            <div className="filters-container">
              <div className="filter-group">
                <label>Status:</label>
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="todo">To Do</option>
                  <option value="progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label>Priority:</label>
                <select 
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
            
            <div className="tasks-container">
              {filteredTasks.length > 0 ? (
                filteredTasks.map(task => (
                  <div key={task.id} className="task-card">
                    <h3 className="task-title">{task.title}</h3>
                    <p className="task-description">{task.description}</p>
                    
                    <div className="task-meta">
                      <div className="task-info">
                        <span className={`task-status ${getStatusClass(task.status)}`}>
                          {task.status === "todo" ? "To Do" : 
                          task.status === "progress" ? "In Progress" : 
                          "Completed"}
                        </span>
                        <span className={`task-priority ${getPriorityClass(task.priority)}`}>
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </span>
                      </div>
                      
                      <div className="task-info">
                        <span className="task-due-date">
                          <FiClock /> Due: {task.dueDate}
                        </span>
                        <span className="task-assigned-by">
                          <FiUser /> {task.assignedBy}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-tasks">
                  <FiFileText size={48} />
                  <h3>No tasks found</h3>
                  <p>Try adjusting your filters or search term</p>
                </div>
              )}
            </div>
          </>
        );
      
      case "calendar":
        return (
          <>
            <h1>Calendar</h1>
            <div className="calendar-container">
              <div className="calendar-header">
                <div className="calendar-nav">
                  <button className="calendar-nav-btn">Previous</button>
                  <h2>December 2023</h2>
                  <button className="calendar-nav-btn">Next</button>
                </div>
                <button className="calendar-add-btn">
                  <FiPlus /> Add Event
                </button>
              </div>

              <div className="calendar-events">
                {calendarEvents.map(event => (
                  <div key={event.id} className="calendar-event-card">
                    <div className="event-date">
                      <FiCalendar />
                      <span>{event.date}</span>
                    </div>
                    <h3 className="event-title">{event.title}</h3>
                    <div className="event-time">
                      <FiClock />
                      <span>{event.time}</span>
                    </div>
                    <div className="event-location">
                      <span>{event.location}</span>
                    </div>
                    <div className="event-participants">
                      <span>{event.participants.length} participants</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        );
      
      case "projects":
        return (
          <>
            <h1>Projects</h1>
            <div className="projects-header">
              <div className="projects-summary">
                <div className="summary-card">
                  <FiBarChart2 size={24} />
                  <span className="summary-value">{projects.length}</span>
                  <span className="summary-label">Active Projects</span>
                </div>
                <div className="summary-card">
                  <FiCheckSquare size={24} />
                  <span className="summary-value">
                    {projects.reduce((sum, project) => sum + project.completedTasks, 0)}
                  </span>
                  <span className="summary-label">Completed Tasks</span>
                </div>
                <div className="summary-card">
                  <FiAlertCircle size={24} />
                  <span className="summary-value">
                    {projects.reduce((sum, project) => sum + (project.tasks - project.completedTasks), 0)}
                  </span>
                  <span className="summary-label">Pending Tasks</span>
                </div>
              </div>
              <button className="add-project-btn">
                <FiPlus /> New Project
              </button>
            </div>

            <div className="projects-container">
              {projects.map(project => (
                <div key={project.id} className="project-card">
                  <h3 className="project-title">{project.name}</h3>
                  
                  <div className="project-progress">
                    <div className="progress-label">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="project-details">
                    <div className="project-tasks">
                      <FiCheckSquare />
                      <span>{project.completedTasks}/{project.tasks} tasks</span>
                    </div>
                    <div className="project-due-date">
                      <FiCalendar />
                      <span>Due: {project.dueDate}</span>
                    </div>
                  </div>
                  
                  <div className="project-team">
                    <div className="team-avatars">
                      {project.teamMembers.slice(0, 3).map((member, index) => (
                        <span key={index} className="team-avatar">{member.split(' ')[0][0]}{member.split(' ')[1][0]}</span>
                      ))}
                      {project.teamMembers.length > 3 && (
                        <span className="team-avatar-more">+{project.teamMembers.length - 3}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        );
      
      case "team":
        return (
          <>
            <h1>Team</h1>
            <div className="team-header">
              <div className="team-summary">
                <div className="summary-card">
                  <FiUsers size={24} />
                  <span className="summary-value">{teamMembers.length}</span>
                  <span className="summary-label">Team Members</span>
                </div>
                <div className="summary-card">
                  <FiPieChart size={24} />
                  <span className="summary-value">
                    {teamMembers.reduce((sum, member) => sum + member.activeTasks, 0)}
                  </span>
                  <span className="summary-label">Active Tasks</span>
                </div>
              </div>
              <button className="add-member-btn">
                <FiPlus /> Add Member
              </button>
            </div>

            <div className="team-container">
              {teamMembers.map(member => (
                <div key={member.id} className="team-member-card">
                  <div className="member-avatar">{member.avatar}</div>
                  <h3 className="member-name">{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                  
                  <div className="member-details">
                    <div className="member-email">
                      <span>{member.email}</span>
                    </div>
                    <div className="member-tasks">
                      <FiCheckSquare />
                      <span>{member.activeTasks} active tasks</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`mytask-container ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <div className="mytask-content-full">
        <div className="mytask-header">
          <div className="mytask-app-title">
            <h2>My Dashboard</h2>
            <button 
              className="theme-toggle" 
              onClick={toggleTheme} 
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <FiSun /> : <FiMoon />}
            </button>
          </div>
          
          <div className="mytask-nav">
            <div 
              className={`nav-item ${activeTab === "tasks" ? "active" : ""}`} 
              onClick={() => setActiveTab("tasks")}
            >
              <FiList /> My Tasks
            </div>
            <div 
              className={`nav-item ${activeTab === "calendar" ? "active" : ""}`} 
              onClick={() => setActiveTab("calendar")}
            >
              <FiCalendar /> Calendar
            </div>
            <div 
              className={`nav-item ${activeTab === "projects" ? "active" : ""}`} 
              onClick={() => setActiveTab("projects")}
            >
              <FiFolder /> Projects
            </div>
            <div 
              className={`nav-item ${activeTab === "team" ? "active" : ""}`} 
              onClick={() => setActiveTab("team")}
            >
              <FiUser /> Team
            </div>
            <Link to="/user/settings" className="nav-item">
              <FiSettings /> Settings
            </Link>
            <Link to="/user/guidebook" className="nav-item">
              <FiList /> Guidebooks
            </Link>
          </div>
          
          <div className="search-container">
            <FiSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="mytask-main-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default MyTask;
