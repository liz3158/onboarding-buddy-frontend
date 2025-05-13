import React, { useState, useEffect, useContext } from "react";
import { FiClock, FiUser, FiFileText } from "react-icons/fi";
import { ThemeContext } from "../contexts/ThemeContext";
import { DARK_THEME } from "../constants/themeConstants";
import { useTranslation } from "react-i18next";
import "../modules/user/mytask.css";

const MyTasksPage = () => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === DARK_THEME;
  const { t } = useTranslation();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [filteredTasks, setFilteredTasks] = useState([]);

  const tasks = [
    {
      id: 1,
      title: t("task_title_frontend_design"),
      status: "todo",
      priority: "high",
      dueDate: "2023-12-15",
      assignedBy: t("assigned_by_sarah"),
      description: t("task_desc_frontend_design")
    },
    {
      id: 2,
      title: t("task_title_backend_api"),
      status: "progress",
      priority: "high",
      dueDate: "2023-12-10",
      assignedBy: t("assigned_by_michael"),
      description: t("task_desc_backend_api")
    },
    {
      id: 3,
      title: t("task_title_db_optimization"),
      status: "completed",
      priority: "medium",
      dueDate: "2023-12-05",
      assignedBy: t("assigned_by_alex"),
      description: t("task_desc_db_optimization")
    },
    {
      id: 4,
      title: t("task_title_write_docs"),
      status: "todo",
      priority: "low",
      dueDate: "2023-12-20",
      assignedBy: t("assigned_by_jessica"),
      description: t("task_desc_write_docs")
    },
    {
      id: 5,
      title: t("task_title_user_testing"),
      status: "progress",
      priority: "medium",
      dueDate: "2023-12-18",
      assignedBy: t("assigned_by_david"),
      description: t("task_desc_user_testing")
    },
    {
      id: 6,
      title: t("task_title_bug_fixes"),
      status: "todo",
      priority: "high",
      dueDate: "2023-12-08",
      assignedBy: t("assigned_by_emily"),
      description: t("task_desc_bug_fixes")
    }
  ];

  useEffect(() => {
    let result = [...tasks];
    if (searchTerm) {
      result = result.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (statusFilter !== "all") {
      result = result.filter(task => task.status === statusFilter);
    }
    if (priorityFilter !== "all") {
      result = result.filter(task => task.priority === priorityFilter);
    }
    setFilteredTasks(result);
  }, [searchTerm, statusFilter, priorityFilter, t, tasks]);

  const getStatusClass = (status) => ({
    todo: "status-todo",
    progress: "status-progress",
    completed: "status-completed"
  }[status] || "");

  const getPriorityClass = (priority) => ({
    high: "priority-high",
    medium: "priority-medium",
    low: "priority-low"
  }[priority] || "");

  return (
    <div className={`mytask-container ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <div className="mytask-main-content">
        <h1>{t("my_tasks")}</h1>

        <div className="filters-container">
          <div className="filter-group">
            <label>{t("status")}</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">{t("all")}</option>
              <option value="todo">{t("to_do")}</option>
              <option value="progress">{t("in_progress")}</option>
              <option value="completed">{t("completed")}</option>
            </select>
          </div>

          <div className="filter-group">
            <label>{t("priority")}</label>
            <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
              <option value="all">{t("all")}</option>
              <option value="high">{t("high")}</option>
              <option value="medium">{t("medium")}</option>
              <option value="low">{t("low")}</option>
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
                    <span className={`task-status ${getStatusClass(task.status)}`}>{t(task.status)}</span>
                    <span className={`task-priority ${getPriorityClass(task.priority)}`}>{t(task.priority)}</span>
                  </div>
                  <div className="task-info">
                    <span className="task-due-date"><FiClock /> {t("due")}: {task.dueDate}</span>
                    <span className="task-assigned-by"><FiUser /> {task.assignedBy}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-tasks">
              <FiFileText size={48} />
              <h3>{t("no_tasks_found")}</h3>
              <p>{t("adjust_filters_search")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyTasksPage;
