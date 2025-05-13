import React, { useContext, useState } from "react";
import { FiBarChart2, FiCheckSquare, FiAlertCircle, FiCalendar, FiPlus, FiSearch, FiFilter, FiUsers, FiActivity, FiFileText } from "react-icons/fi";
import { ThemeContext } from "../contexts/ThemeContext";
import { DARK_THEME } from "../constants/themeConstants";
import { useTranslation } from "react-i18next";
import "./MyProjectsPage.css";

const MyProjectsPage = () => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === DARK_THEME;
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const projects = [
    {
      id: 1,
      name: "Dashboard Redesign",
      description: t("project_desc_dashboard_redesign"),
      progress: 75,
      dueDate: "2023-12-30",
      teamMembers: ["Sarah J.", "Michael C.", "Alex W."],
      tasks: 12,
      completedTasks: 9,
      category: t("category_design"),
      priority: t("priority_high"),
      status: t("status_in_progress")
    },
    {
      id: 2,
      name: "API Development",
      description: t("project_desc_api_development"),
      progress: 50,
      dueDate: "2024-01-15",
      teamMembers: ["Jessica M.", "David B."],
      tasks: 8,
      completedTasks: 4,
      category: t("category_backend"),
      priority: t("priority_high"),
      status: t("status_in_progress")
    },
    {
      id: 3,
      name: "Mobile App Launch",
      description: t("project_desc_mobile_app"),
      progress: 90,
      dueDate: "2023-12-10",
      teamMembers: ["Robert K.", "Emily P.", "John D.", "Lisa M."],
      tasks: 15,
      completedTasks: 13,
      category: t("category_mobile"),
      priority: t("priority_critical"),
      status: t("status_testing")
    },
    {
      id: 4,
      name: "Security Audit",
      description: t("project_desc_security_audit"),
      progress: 30,
      dueDate: "2024-02-28",
      teamMembers: ["Kevin S.", "Natalie R."],
      tasks: 10,
      completedTasks: 3,
      category: t("category_security"),
      priority: t("priority_medium"),
      status: t("status_planning")
    },
    {
      id: 5,
      name: "Content Migration",
      description: t("project_desc_content_migration"),
      progress: 65,
      dueDate: "2024-01-20",
      teamMembers: ["Chris H.", "Amanda J.", "Tyler B."],
      tasks: 18,
      completedTasks: 12,
      category: t("category_content"),
      priority: t("priority_low"),
      status: t("status_in_progress")
    },
    {
      id: 6,
      name: "Analytics Platform",
      description: t("project_desc_analytics_platform"),
      progress: 15,
      dueDate: "2024-03-15",
      teamMembers: ["Daniel M.", "Sophie L."],
      tasks: 14,
      completedTasks: 2,
      category: t("category_data"),
      priority: t("priority_medium"),
      status: t("status_research")
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterType === "all") return matchesSearch;
    return matchesSearch && project.status.toLowerCase() === filterType.toLowerCase();
  });

  const totalTasks = projects.reduce((sum, p) => sum + p.tasks, 0);
  const completedTasks = projects.reduce((sum, p) => sum + p.completedTasks, 0);
  const pendingTasks = totalTasks - completedTasks;
  const overallProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className={`projects-container-wrapper ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <div className="projects-main-content">
        <div className="project-directory-header">
          <h1>{t("projects")}</h1>
          
          <div className="project-actions">
            <div className="projects-search-container">
              <FiSearch className="projects-search-icon" />
              <input 
                type="text" 
                className="projects-search-input" 
                placeholder={t("search_projects")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="add-project-btn">
              <FiPlus /> {t("new_project")}
            </button>
          </div>
        </div>

        <div className="project-dashboard">
          <div className="dashboard-stats">
            <div className="stat-card overall-progress">
              <div className="stat-icon"><FiActivity /></div>
              <div className="stat-info">
                <span className="stat-value">{overallProgress}%</span>
                <span className="stat-label">{t("overall_progress")}</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon"><FiBarChart2 /></div>
              <div className="stat-info">
                <span className="stat-value">{projects.length}</span>
                <span className="stat-label">{t("active_projects")}</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon"><FiFileText /></div>
              <div className="stat-info">
                <span className="stat-value">{totalTasks}</span>
                <span className="stat-label">{t("total_tasks")}</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon"><FiCheckSquare /></div>
              <div className="stat-info">
                <span className="stat-value">{completedTasks}</span>
                <span className="stat-label">{t("completed_tasks")}</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon"><FiAlertCircle /></div>
              <div className="stat-info">
                <span className="stat-value">{pendingTasks}</span>
                <span className="stat-label">{t("pending_tasks")}</span>
              </div>
            </div>
          </div>

          <div className="filters-row">
            <div className="filter-label">
              <FiFilter /> {t("filter_by")}:
            </div>
            <div className="filter-options">
              <button className={`filter-option ${filterType === "all" ? "active" : ""}`} onClick={() => setFilterType("all")}>
                {t("all")}
              </button>
              <button className={`filter-option ${filterType === "Planning" ? "active" : ""}`} onClick={() => setFilterType("Planning")}>
                {t("planning")}
              </button>
              <button className={`filter-option ${filterType === "In Progress" ? "active" : ""}`} onClick={() => setFilterType("In Progress")}>
                {t("in_progress")}
              </button>
              <button className={`filter-option ${filterType === "Testing" ? "active" : ""}`} onClick={() => setFilterType("Testing")}>
                {t("testing")}
              </button>
              <button className={`filter-option ${filterType === "Completed" ? "active" : ""}`} onClick={() => setFilterType("Completed")}>
                {t("completed")}
              </button>
            </div>
          </div>
        </div>

        <div className="projects-container">
          {filteredProjects.length > 0 ? (
            filteredProjects.map(project => (
              <div key={project.id} className="project-card">
                <div className="project-header">
                <span className={`project-category ${project.category.toLowerCase()}`}>
                    {project.category}
                  </span>
                  <span className={`project-priority ${project.priority.toLowerCase()}`}>
                    {project.priority}
                  </span>
 </div>

                <h3 className="project-title">{project.name}</h3>
                <p className="project-description">{project.description}</p>

                <div className="project-progress">
                  <div className="progress-label">
                    <span>{t("progress")}</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className={`progress-fill priority-${project.priority.toLowerCase()}`} 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="project-meta">
                  <div className="project-status">
                  <span className={`status-pill ${project.status.toLowerCase().replace(" ", "-")}`}>
                      {project.status}
                    </span>


                  </div>

                  <div className="project-details">
                    <div className="project-tasks">
                      <FiCheckSquare />
                      <span>{project.completedTasks}/{project.tasks} {t("tasks")}</span>
                    </div>
                    <div className="project-due-date">
                      <FiCalendar />
                      <span>{t("due")}: {project.dueDate}</span>
                    </div>
                  </div>
                </div>

                <div className="project-footer">
                  <div className="project-team">
                    <FiUsers className="team-icon" />
                    <div className="team-avatars">
                      {project.teamMembers.slice(0, 3).map((m, i) => (
                        <span key={i} className="team-avatar">{m[0]}{m.split(" ")[1]?.[0]}</span>
                      ))}
                      {project.teamMembers.length > 3 && (
                        <span className="team-avatar-more">+{project.teamMembers.length - 3}</span>
                      )}
                    </div>
                  </div>

                  <button className="project-view-btn">{t("view_details")}</button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-projects">
              <FiFileText size={48} />
              <h3>{t("no_projects_found")}</h3>
              <p>{t("try_different_search")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProjectsPage;
