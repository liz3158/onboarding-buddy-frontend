import React, { useContext, useState } from "react";
import { 
  FiUsers, 
  FiPieChart, 
  FiCheckSquare, 
  FiSearch, 
  FiPlus, 
  FiFilter, 
  FiMail, 
  FiPhone, 
  FiMessageSquare, 
  FiCalendar,
  FiAward,
  FiBriefcase,
  FiMapPin,
  FiClock,
  FiStar
} from "react-icons/fi";
import { ThemeContext } from "../contexts/ThemeContext";
import { DARK_THEME } from "../constants/themeConstants";
import { useTranslation } from "react-i18next";
import "./MyTeamPage.css";

const MyTeamPage = () => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === DARK_THEME;
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [showContactInfo, setShowContactInfo] = useState({});

  // Enhanced team members data with more information
  const teamMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: t("lead_designer"),
      department: t("design"),
      avatar: "SJ",
      email: "sarah.johnson@example.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      activeTasks: 3,
      completedTasks: 27,
      expertise: [t("expertise_uiux"), t("expertise_wireframing"), t("expertise_design_systems")],
      joinedDate: "2021-05-12",
      availability: t("availability_available"),
      projects: [t("project_dashboard_redesign"), t("project_mobile_app")]
    },
    {
      id: 2,
      name: "Michael Chen",
      role: t("senior_developer"),
      department: t("engineering"),
      avatar: "MC",
      email: "michael.chen@example.com",
      phone: "+1 (555) 234-5678",
      location: "Seattle, WA",
      activeTasks: 2,
      completedTasks: 42,
      expertise: [t("expertise_react"), t("expertise_nodejs"), t("expertise_typescript")],
      joinedDate: "2020-11-03",
      availability: t("availability_meeting"),
      projects: [t("project_api_development"), t("project_security_audit")]
    },
    {
      id: 3,
      name: "Jessica Miller",
      role: t("technical_writer"),
      department: t("documentation"),
      avatar: "JM",
      email: "jessica.miller@example.com",
      phone: "+1 (555) 345-6789",
      location: "Chicago, IL",
      activeTasks: 2,
      completedTasks: 19,
      expertise: [t("expertise_api_docs"), t("expertise_tutorials"), t("expertise_kb")],
      joinedDate: "2022-01-15",
      availability: t("availability_available"),
      projects: [t("project_content_migration"), t("project_docs_portal")]
    },
    {
      id: 4,
      name: "David Wilson",
      role: t("product_manager"),
      department: t("product"),
      avatar: "DW",
      email: "david.wilson@example.com",
      phone: "+1 (555) 456-7890",
      location: "New York, NY",
      activeTasks: 5,
      completedTasks: 34,
      expertise: [t("expertise_roadmapping"), t("expertise_user_research"), t("expertise_agile")],
      joinedDate: "2021-03-20",
      availability: t("availability_away"),
      projects: [t("project_mobile_app_launch"), t("project_analytics_platform")]
    },
    {
      id: 5,
      name: "Emily Rodriguez",
      role: t("qa_engineer"),
      department: t("engineering"),
      avatar: "ER",
      email: "emily.rodriguez@example.com",
      phone: "+1 (555) 567-8901",
      location: "Austin, TX",
      activeTasks: 4,
      completedTasks: 31,
      expertise: [t("expertise_test_automation"), t("expertise_performance_testing"), t("expertise_regression")],
      joinedDate: "2021-09-05",
      availability: t("availability_available"),
      projects: [t("project_api_development"), t("project_mobile_app_launch")]
    },
    {
      id: 6,
      name: "Robert Kim",
      role: t("ux_researcher"),
      department: t("design"),
      avatar: "RK",
      email: "robert.kim@example.com",
      phone: "+1 (555) 678-9012",
      location: "Los Angeles, CA",
      activeTasks: 1,
      completedTasks: 14,
      expertise: [t("expertise_user_testing"), t("expertise_interviews"), t("expertise_usability")],
      joinedDate: "2022-04-10",
      availability: t("availability_office"),
      projects: [t("project_dashboard_redesign")]
    },
    {
      id: 7,
      name: "Lisa Martinez",
      role: t("frontend_developer"),
      department: t("engineering"),
      avatar: "LM",
      email: "lisa.martinez@example.com",
      phone: "+1 (555) 789-0123",
      location: "Denver, CO",
      activeTasks: 3,
      completedTasks: 28,
      expertise: [t("expertise_react"), t("expertise_css"), t("expertise_accessibility")],
      joinedDate: "2021-07-22",
      availability: t("availability_available"),
      projects: [t("project_dashboard_redesign"), t("project_mobile_app_launch")]
    },
    {
      id: 8,
      name: "Kevin Singh",
      role: t("security_specialist"),
      department: t("engineering"),
      avatar: "KS",
      email: "kevin.singh@example.com",
      phone: "+1 (555) 890-1234",
      location: "Boston, MA",
      activeTasks: 2,
      completedTasks: 16,
      expertise: [t("expertise_pen_test"), t("expertise_vuln_assess"), t("expertise_oauth")],
      joinedDate: "2022-02-14",
      availability: t("availability_available"),
      projects: [t("project_security_audit")]
    }
  ];
  

  // Filter team members based on search term and department filter
  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.expertise.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (departmentFilter === "all") return matchesSearch;
    return matchesSearch && member.department === departmentFilter;
  });

  // Calculate team statistics
  const totalMembers = teamMembers.length;
  const totalActiveTasks = teamMembers.reduce((sum, member) => sum + member.activeTasks, 0);
  const totalCompletedTasks = teamMembers.reduce((sum, member) => sum + member.completedTasks, 0);
  const departments = [...new Set(teamMembers.map(member => member.department))];

  // Toggle contact information display
  const toggleContactInfo = (memberId) => {
    setShowContactInfo(prev => ({
      ...prev,
      [memberId]: !prev[memberId]
    }));
  };

  // Get availability status color
  const getAvailabilityColor = (status) => {
    if (status === "Available") return "available";
    if (status === "In a meeting") return "busy";
    if (status.includes("Away")) return "away";
    return "offline";
  };

  return (
    <div className={`team-container-wrapper ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <div className="team-main-content">
        <div className="team-directory-header">
          <h1>{t("team")}</h1>

          <div className="team-actions">
            <div className="team-search-container">
              <FiSearch className="team-search-icon" />
              <input 
                type="text" 
                className="team-search-input" 
                placeholder={t("search team members")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button className="add-team-member-btn">
              <FiPlus /> {t("add team member")}
            </button>
          </div>
        </div>

        <div className="team-dashboard">
          <div className="dashboard-stats">
            <div className="stat-card team-overview">
              <div className="stat-icon"><FiUsers /></div>
              <div className="stat-info">
                <span className="stat-value">{totalMembers}</span>
                <span className="stat-label">{t("team members")}</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon"><FiBriefcase /></div>
              <div className="stat-info">
                <span className="stat-value">{departments.length}</span>
                <span className="stat-label">{t("departments")}</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon"><FiCheckSquare /></div>
              <div className="stat-info">
                <span className="stat-value">{totalActiveTasks}</span>
                <span className="stat-label">{t("active tasks")}</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon"><FiAward /></div>
              <div className="stat-info">
                <span className="stat-value">{totalCompletedTasks}</span>
                <span className="stat-label">{t("completed tasks")}</span>
              </div>
            </div>
          </div>
          
          <div className="filters-row">
            <div className="filter-label">
              <FiFilter /> {t("filter by department")}:
            </div>
            <div className="filter-options">
              <button 
                className={`filter-option ${departmentFilter === "all" ? "active" : ""}`}
                onClick={() => setDepartmentFilter("all")}
              >
                {t("all")}
              </button>
              {departments.map(department => (
                <button 
                  key={department}
                  className={`filter-option ${departmentFilter === department ? "active" : ""}`}
                  onClick={() => setDepartmentFilter(department)}
                >
                  {department}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="team-container">
          {filteredMembers.length > 0 ? (
            filteredMembers.map(member => (
              <div key={member.id} className="team-member-card">
                <div className={`member-availability ${getAvailabilityColor(member.availability)}`}>
                  <span className="availability-indicator"></span>
                  <span className="availability-text">{member.availability}</span>
                </div>
                
                <div className="member-avatar">{member.avatar}</div>
                
                <div className="member-title">
                  <h3 className="member-name">{member.name}</h3>
                  <span className="member-role">{member.role}</span>
                  <span className="member-department">{member.department}</span>
                </div>
                
                <div className="member-expertise">
                  {member.expertise.map((skill, index) => (
                    <span key={index} className="expertise-tag">{skill}</span>
                  ))}
                </div>
                
                <div className="member-stats">
                  <div className="member-stat">
                    <FiCheckSquare />
                    <span>{member.activeTasks} {t("active")}</span>
                  </div>
                  <div className="member-stat">
                    <FiAward />
                    <span>{member.completedTasks} {t("completed")}</span>
                  </div>
                  <div className="member-stat">
                    <FiClock />
                    <span>{new Date(member.joinedDate).getFullYear()}</span>
                  </div>
                </div>
                
                <div className="member-projects">
                  <div className="projects-label">
                    <FiStar /> {t("projects")}
                  </div>
                  <div className="projects-list">
                    {member.projects.map((project, index) => (
                      <span key={index} className="project-tag">{project}</span>
                    ))}
                  </div>
                </div>
                
                {showContactInfo[member.id] && (
                  <div className="member-contact-info">
                    <div className="contact-item">
                      <FiMail />
                      <a href={`mailto:${member.email}`}>{member.email}</a>
                    </div>
                    <div className="contact-item">
                      <FiPhone />
                      <a href={`tel:${member.phone}`}>{member.phone}</a>
                    </div>
                    <div className="contact-item">
                      <FiMapPin />
                      <span>{member.location}</span>
                    </div>
                  </div>
                )}
                
                <div className="member-actions">
                  <button 
                    className="action-btn message-btn" 
                    title={t("send message")}
                    onClick={() => alert(`${t("send message")} ${member.name}`)}
                  >
                    <FiMessageSquare />
                  </button>
                  <button 
                    className="action-btn" 
                    title={t("view contact details")}
                    onClick={() => toggleContactInfo(member.id)}
                  >
                    <FiMail />
                  </button>
                  <button 
                    className="action-btn schedule-btn" 
                    title={t("schedule meeting")}
                    onClick={() => alert(`${t("schedule meeting")} ${member.name}`)}
                  >
                    <FiCalendar />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-team-members">
              <FiUsers size={48} />
              <h3>{t("no team members found")}</h3>
              <p>{t("try different search")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyTeamPage;
