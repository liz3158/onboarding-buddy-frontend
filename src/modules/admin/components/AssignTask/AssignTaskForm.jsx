import React, { useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../../../contexts/ThemeContext';
import './AssignTaskForm.scss';

export default function OnboardingTaskAssignment() {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);

  const [selectedEngineer, setSelectedEngineer] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [description, setDescription] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState('');

  const newHires = [
    { id: 1, name: 'John Tan', role: 'Backend Developer' },
    { id: 2, name: 'Sarah Johnson', role: 'Frontend Developer' },
    { id: 3, name: 'Miguel Gonzalez', role: 'DevOps Engineer' },
    { id: 4, name: 'Priya Patel', role: 'Mobile Developer' },
    { id: 5, name: 'Alex Wong', role: 'Full Stack Developer' }
  ];

  const teams = [
    { id: 1, name: 'Platform Team' },
    { id: 2, name: 'Mobile Team' },
    { id: 3, name: 'QA Team' },
    { id: 4, name: 'DevOps Team' },
    { id: 5, name: 'Product Team' }
  ];

  const taskCategories = [
    {
      category: t('task_category_development'),
      tasks: [
        { id: 'dev1', name: t('task_setup_github') },
        { id: 'dev2', name: t('task_setup_env') },
        { id: 'dev3', name: t('task_install_sdks') },
        { id: 'dev4', name: t('task_configure_ide') }
      ]
    },
    {
      category: t('task_category_learning'),
      tasks: [
        { id: 'learn1', name: t('task_review_guide') },
        { id: 'learn2', name: t('task_coding_challenge') },
        { id: 'learn3', name: t('task_read_docs') },
        { id: 'learn4', name: t('task_online_training') }
      ]
    },
    {
      category: t('task_category_team_integration'),
      tasks: [
        { id: 'team1', name: t('task_meet_lead') },
        { id: 'team2', name: t('task_attend_standup') },
        { id: 'team3', name: t('task_1on1s') },
        { id: 'team4', name: t('task_join_channels') }
      ]
    },
    {
      category: t('task_category_project'),
      tasks: [
        { id: 'proj1', name: t('task_clone_repo') },
        { id: 'proj2', name: t('task_run_tests') },
        { id: 'proj3', name: t('task_review_board') },
        { id: 'proj4', name: t('task_pull_request') }
      ]
    },
    {
      category: t('task_category_security'),
      tasks: [
        { id: 'sec1', name: t('task_security_training') },
        { id: 'sec2', name: t('task_setup_mfa') },
        { id: 'sec3', name: t('task_data_guidelines') },
        { id: 'sec4', name: t('task_access_systems') }
      ]
    }
  ];

  const priorityLevels = ['Low', 'Medium', 'High', 'Urgent'];

  const handleTaskToggle = (taskId) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId) ? prev.filter(id => id !== taskId) : [...prev, taskId]
    );
  };

  const handleEngineerChange = (engineerId) => {
    setSelectedEngineer(engineerId);
    const engineer = newHires.find(e => e.id === parseInt(engineerId));
    if (engineer) setSelectedRole(engineer.role);
  };

  const generateDefaultTasks = () => {
    const tasksForRole = ['dev1', 'team1', 'team4', 'sec2'];
    switch (selectedRole) {
      case 'Backend Developer':
        tasksForRole.push('dev2', 'learn1', 'proj1'); break;
      case 'Frontend Developer':
        tasksForRole.push('dev3', 'learn1', 'learn4'); break;
      case 'DevOps Engineer':
        tasksForRole.push('dev2', 'dev3', 'sec1', 'sec4'); break;
      case 'Mobile Developer':
        tasksForRole.push('dev3', 'dev4', 'proj2'); break;
      case 'Full Stack Developer':
        tasksForRole.push('dev2', 'dev3', 'learn1', 'proj1'); break;
    }
    setSelectedTasks(tasksForRole);
  };

  const setDefaultDueDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 14);
    setDueDate(date.toISOString().split('T')[0]);
  };

  useEffect(() => {
    if (selectedRole) {
      generateDefaultTasks();
      setDefaultDueDate();
    }
  }, [selectedRole]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleReset = () => {
    setSelectedEngineer('');
    setSelectedRole('');
    setSelectedTasks([]);
    setDueDate('');
    setPriority('Medium');
    setDescription('');
    setShowSuccessMessage(false);
  };

  const getSelectedEngineerName = () => {
    const engineer = newHires.find(e => e.id === parseInt(selectedEngineer));
    return engineer ? engineer.name : '';
  };

  return (
    <div className="assign-task-container" data-theme={theme}>
      <h1 className="assign-task-title">{t("assign_title")}</h1>

      {showSuccessMessage && (
        <div className="success-message">
          {t("assign_success", { name: getSelectedEngineerName() })}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>{t("assign_team")}</label>
          <select value={selectedTeam} onChange={e => setSelectedTeam(e.target.value)} required>
            <option value="">{t("assign_team_select")}</option>
            {teams.map(team => (
              <option key={team.id} value={team.id}>{team.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>{t("assign_new_hire")}</label>
          <select value={selectedEngineer} onChange={e => handleEngineerChange(e.target.value)} required>
            <option value="">{t("assign_engineer_select")}</option>
            {newHires.map(engineer => (
              <option key={engineer.id} value={engineer.id}>
                {engineer.name} - {engineer.role}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>{t("assign_tasks")}</label>
          <div className="task-category-list">
            {taskCategories.map((category) => (
              <div key={category.category} className="task-category">
                <h3>{category.category}</h3>
                <div className="task-list">
                  {category.tasks.map((task) => (
                    <div key={task.id} className={`task-checkbox${selectedTasks.includes(task.id) ? ' selected' : ''}`}>
                      <input
                        type="checkbox"
                        id={task.id}
                        checked={selectedTasks.includes(task.id)}
                        onChange={() => handleTaskToggle(task.id)}
                      />
                      <label htmlFor={task.id}>{task.name}</label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>{t("assign_due_date")}</label>
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>{t("assign_priority")}</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            {priorityLevels.map(level => (
              <option key={level} value={level}>{t(`priority_${level.toLowerCase()}`)}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>{t("assign_description")}</label>
          <textarea
            placeholder={t("assign_description_placeholder")}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={handleReset}>
            {t("assign_clear")}
          </button>
          <button type="submit" disabled={selectedTasks.length === 0}>
            {t("assign_submit")}
          </button>
        </div>
      </form>
    </div>
  );
}
