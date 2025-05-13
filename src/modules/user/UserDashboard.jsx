import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineMessage } from 'react-icons/md';
import { IoChevronForward } from 'react-icons/io5';
import { FaTasks, FaCheckCircle, FaRegClock, FaRegCalendarAlt } from 'react-icons/fa';
import { BsCalendar, BsArrowRight, BsClock, BsGeoAlt } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import { LanguageToggle } from '../../components/common/LanguageToggle';
import robotImage from '../../assets/images/robot.png';
import './UserDashboard.scss';

const UserDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');

  const progressStages = [
    { id: 'pre-boarding', label: t('pre_boarding'), status: 'complete', date: 'Apr 10, 2025' },
    { id: 'day-1', label: t('day_1'), status: 'complete', date: 'Apr 12, 2025' },
    { id: 'first-week', label: t('first_week'), status: 'in-progress', date: 'Apr 19, 2025' },
    { id: 'probation-end', label: t('probation_end'), status: 'not-started', date: 'Jul 12, 2025' }
  ];

  const tasks = [
    { id: 1, title: t('task_about_me'), description: t('desc_about_me'), department: 'HR', dueDate: 'Apr 12, 2025', status: 'completed', priority: 'high' },
    { id: 2, title: t('task_github_access'), description: t('desc_github_access'), department: 'IT', dueDate: 'Apr 13, 2025', status: 'completed', priority: 'high' },
    { id: 3, title: t('task_code_guide'), description: t('desc_code_guide'), department: 'Engineering', dueDate: 'Apr 14, 2025', status: 'pending', priority: 'medium' },
    { id: 4, title: t('task_security'), description: t('desc_security'), department: 'IT', dueDate: 'Apr 16, 2025', status: 'pending', priority: 'high' },
    { id: 5, title: t('task_setup_env'), description: t('desc_setup_env'), department: 'Engineering', dueDate: 'Apr 18, 2025', status: 'pending', priority: 'high' },
    { id: 6, title: t('task_schedule_meeting'), description: t('desc_schedule_meeting'), department: 'Engineering', dueDate: 'Apr 15, 2025', status: 'overdue', priority: 'medium' }
  ];

  const filteredTasks = tasks.filter(task => activeFilter === 'all' || task.status === activeFilter);
  const completedTasksCount = tasks.filter(task => task.status === 'completed').length;
  const pendingTasksCount = tasks.filter(task => task.status === 'pending').length;
  const overdueTasksCount = tasks.filter(task => task.status === 'overdue').length;
  const completionPercentage = Math.round((completedTasksCount / tasks.length) * 100);

  const keyContacts = [
    { id: 1, name: 'Sarah Johnson', role: t('eng_manager'), avatar: '🧑‍💼' },
    { id: 2, name: 'Mike Chen', role: t('onboard_buddy'), avatar: '👨‍💻' },
    { id: 3, name: 'Julie Martinez', role: t('hr_rep'), avatar: '👩‍💼' }
  ];

  const upcomingEvents = [
    { id: 1, title: t('event_standup'), time: '9:30 AM', date: t('today'), location: 'Zoom - A' },
    { id: 2, title: t('event_allhands'), time: '11:00 AM', date: t('tomorrow'), location: t('main_conference') },
    { id: 3, title: t('event_demo'), time: '2:00 PM', date: 'Apr 16, 2025', location: t('client_room') }
  ];

  const resources = [
    { id: 1, title: t('res_handbook'), type: 'PDF', link: '#' },
    { id: 2, title: t('res_wiki'), type: 'Website', link: '#' },
    { id: 3, title: t('res_guide'), type: 'Document', link: '#' },
    { id: 4, title: t('res_benefits'), type: 'Presentation', link: '#' }
  ];

  return (
    <div className="user-dashboard">
      <div className="dashboard-content">
        <section className="welcome-section">
          <div className="welcome-header">
            <div className="welcome-title">
              <h1>{t("welcome_title")}</h1>
              <p>{t("welcome_sub")}</p>
            </div>
            <div className="welcome-robot">
              <img src={robotImage} alt="Welcome Robot" className="robot-image" />
            </div>
          </div>
          <div className="welcome-footer">
            <div className="language-selector">
              <LanguageToggle />
            </div>
            <div className="welcome-stats">
              <div className="stat-item">
                <span className="stat-value">{completionPercentage}%</span>
                <span className="stat-label">Completed</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">Day 3</span>
                <span className="stat-label">of 30</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{completedTasksCount}/{tasks.length}</span>
                <span className="stat-label">Tasks Done</span>
              </div>
            </div>
          </div>
        </section>

        <div className="dashboard-grid">
          <div className="main-column">
            <section className="timeline-section">
              <div className="section-header">
                <h2>{t("timeline_title")}</h2>
                <button className="view-all" onClick={() => navigate("/user/timeline")}>{t("view_all")} <IoChevronForward /></button>
              </div>
              <div className="timeline">
                {progressStages.map((stage, index) => (
                  <div key={stage.id} className="timeline-stage">
                    <div className={`stage-indicator ${stage.status}`}>
                      <div className="stage-point"></div>
                      {index < progressStages.length - 1 && <div className="stage-line"></div>}
                    </div>
                    <div className="stage-details">
                      <h3>{stage.label}</h3>
                      <p className="stage-date">{stage.date}</p>
                      <p className="stage-status">
                        {stage.status === 'complete' ? t('complete') :
                         stage.status === 'in-progress' ? t('in_progress') : t('not_started')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="tasks-section">
              <div className="section-header">
                <div className="header-left">
                  <h2>{t("my_tasks")}</h2>
                  <div className="task-stats">
                    <span className="pending">{pendingTasksCount} {t("pending")}</span>
                    <span className="overdue">{overdueTasksCount} {t("overdue")}</span>
                  </div>
                </div>
                <div className="task-filters">
                  {["all", "pending", "completed"].map(key => (
                    <button key={key} className={`filter ${activeFilter === key ? 'active' : ''}`} onClick={() => setActiveFilter(key)}>
                      {t(key + (key === "all" ? "_tasks" : ""))}
                    </button>
                  ))}
                </div>
              </div>
              <div className="tasks-list">
                {filteredTasks.map(task => (
                  <div key={task.id} className={`task-item ${task.status}`}>
                    <div className={`task-status-icon ${task.status}`}>
                      {task.status === 'completed' ? <FaCheckCircle /> : task.status === 'overdue' ? <FaRegClock /> : <FaTasks />}
                    </div>
                    <div className="task-info">
                      <h3>{task.title}</h3>
                      <p className="task-description">{task.description}</p>
                      <div className="task-meta">
                        <div className="meta-row">
                          <span className="due-date"><FaRegCalendarAlt /> {task.dueDate}</span>
                          <span className="department">{task.department}</span>
                          <div className={`status-badge ${task.status}`}>{t(task.status)}</div>
                          <span className={`priority ${task.priority}`}>{t(task.priority)} {t("priority")}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="side-column">
            <section className="events-section">
              <div className="section-header">
                <h2>{t("upcoming_events")}</h2>
                <button className="view-all" onClick={() => navigate("/user/schedule")}>
                  {t("calendar")} <BsArrowRight />
                </button>
              </div>
              <div className="events-list">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="event-card">
                    <div className="event-date-badge">
                      <span className="date-label">{event.date}</span>
                      <span className="time">{event.time}</span>
                    </div>
                    <div className="event-content">
                      <h3 className="event-title">{event.title}</h3>
                      <div className="event-details">
                        <div className="event-location">
                          <BsGeoAlt className="icon" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="contacts-section">
              <div className="section-header">
                <h2>{t("key_contacts")}</h2>
                <button className="view-all" onClick={() => navigate("/user/team-directory")}>{t("team_directory")} <IoChevronForward /></button>
              </div>
              <div className="contacts-list">
                {keyContacts.map(contact => (
                  <div key={contact.id} className="contact-card">
                    <div className="contact-avatar">{contact.avatar}</div>
                    <div className="contact-info"><h3>{contact.name}</h3><p>{contact.role}</p></div>
                    <button className="message-button"><MdOutlineMessage /></button>
                  </div>
                ))}
              </div>
            </section>

            <section className="resources-section">
              <div className="section-header">
                <h2>{t("helpful_resources")}</h2>
                <button className="view-all" onClick={() => navigate("/user/blog")}>{t("all_resources")} <IoChevronForward /></button>
              </div>
              <div className="resources-list">
                {resources.map(res => (
                  <a href={res.link} key={res.id} className="resource-item">
                    <div className="resource-icon">
                      {res.type === 'PDF' ? '📄' : res.type === 'Website' ? '🌐' : res.type === 'Document' ? '📝' : '📊'}
                    </div>
                    <div className="resource-info"><h3>{res.title}</h3><span className="resource-type">{res.type}</span></div>
                  </a>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
