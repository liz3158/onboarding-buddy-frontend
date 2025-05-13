import React, { useState, useContext } from 'react';
import { ThemeContext } from "../../../contexts/ThemeContext";
import { useTranslation } from 'react-i18next';
import '../components/AssignTask/AssignTaskForm.scss';

export default function AdminSchedulePage() {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  const [selectedSchedule, setSelectedSchedule] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [status, setStatus] = useState('uncompleted');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const schedules = [
    { id: 1, name: t('schedule_meeting') },
    { id: 2, name: t('schedule_deployment') },
    { id: 3, name: t('schedule_review') },
    { id: 4, name: t('schedule_brainstorm') }
  ];

  const users = [
    { id: 1, name: 'John Tan' },
    { id: 2, name: 'Sarah Johnson' },
    { id: 3, name: 'Miguel Gonzalez' },
    { id: 4, name: 'Priya Patel' },
    { id: 5, name: 'Alex Wong' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleReset = () => {
    setSelectedSchedule('');
    setSelectedUser('');
    setSelectedDate('');
    setSelectedTime('');
    setStatus('uncompleted');
    setShowSuccessMessage(false);
  };

  return (
    <div className="assign-task-container" data-theme={theme}>
      <h1 className="assign-task-title">{t('schedule_page_title')}</h1>

      {showSuccessMessage && (
        <div className="success-message">
          {t('schedule_success')}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>{t('schedule_select_schedule')}</label>
          <select value={selectedSchedule} onChange={(e) => setSelectedSchedule(e.target.value)} required>
            <option value="">{t('schedule_select_schedule_placeholder')}</option>
            {schedules.map(schedule => (
              <option key={schedule.id} value={schedule.id}>{schedule.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>{t('schedule_select_user')}</label>
          <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} required>
            <option value="">{t('schedule_select_user_placeholder')}</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>{t('schedule_select_date')}</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>{t('schedule_select_time')}</label>
          <input
            type="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>{t('schedule_select_status')}</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="uncompleted">{t('schedule_status_uncompleted')}</option>
            <option value="completed">{t('schedule_status_completed')}</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={handleReset}>
            {t('schedule_clear')}
          </button>
          <button type="submit">
            {t('schedule_submit')}
          </button>
        </div>
      </form>
    </div>
  );
}
