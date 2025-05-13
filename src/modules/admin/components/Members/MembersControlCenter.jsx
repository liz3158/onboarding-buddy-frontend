import React, { useState, useContext } from 'react';
import {
  MdPerson,
  MdAssignment,
  MdFileUpload,
  MdSettings,
  MdApps,
  MdDescription,
  MdPersonAdd,
  MdWork,
  MdFilterList,
  MdCalendarToday
} from 'react-icons/md';
import { BsPeopleFill } from 'react-icons/bs';
import { ThemeContext } from '../../../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import './MembersControlCenter.scss';

const getProgressBarClass = (progress) => {
  if (progress === 100) return 'red';
  if (progress >= 80) return 'green';
  if (progress >= 50) return 'blue';
  return 'yellow';
};

const MembersControlCenter = () => {
  const [activeTab, setActiveTab] = useState('invite');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchRoles, setSearchRoles] = useState('');
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const isDarkTheme = theme === 'dark';

  const members = [
    { id: 1, initials: 'RB', name: 'Rick Brane', role: 'Senior Frontend Developer', location: 'Tempe, Arizona, United States', color: '#4285f4' },
    { id: 2, initials: 'MB', name: 'Marcus Brown', role: 'Backend Engineer', location: 'San Francisco, United States', color: '#34a853' },
    { id: 3, initials: 'MBu', name: 'Michael Burns', role: 'Mobile Developer', location: 'United States', color: '#fbbc05' },
    { id: 4, initials: 'CC', name: 'Christie Carbone', role: 'UX Engineer', location: 'Austin, United States', color: '#9c27b0' },
    { id: 5, initials: 'BC', name: 'Brian Crabtree', role: 'DevOps Engineer', location: 'San Francisco, United States', color: '#009688' },
    { id: 6, initials: 'JD', name: 'Jarred Degeyter', role: 'Full Stack Developer', location: 'New Orleans, United States', color: '#f44336' },
    { id: 7, initials: 'DF', name: 'David Foster', role: 'Database Engineer', location: 'Member', color: '#ffa000' },
    { id: 8, initials: 'KG', name: 'Kali Gonzalez', role: 'Cloud Engineer', location: 'Tempe, United States', color: '#e91e63' }
  ];

  const roles = [
    { id: 1, title: 'Software Developer - Level 1', expiry: '4/15/21', progress: 50, color: '#4285f4', stats: '3 apps | Used: 3/20 | Expires: 7/5/21' },
    { id: 2, title: 'Senior Backend Engineer', expiry: '6/30/25', progress: 80, color: '#34a853', stats: '5 apps | Used: 4/10 | Expires: 8/15/25' },
    { id: 3, title: 'Junior Frontend Developer', expiry: '12/15/25', progress: 25, color: '#fbbc05', stats: '2 apps | Used: 1/5 | Expires: 1/10/26' },
    { id: 4, title: 'DevOps Engineer', expiry: '4/20/25', progress: 100, color: '#ea4335', stats: '8 apps | Used: 8/8 | Expires: 5/1/25' }
  ];

  const tabs = [
    { id: 'invite', label: t('tab_invite'), icon: MdPerson },
    { id: 'requests', label: t('tab_requests'), icon: MdAssignment },
    { id: 'import', label: t('tab_import'), icon: MdFileUpload },
    { id: 'configure', label: t('tab_configure'), icon: MdSettings },
    { id: 'apps', label: t('tab_apps'), icon: MdApps },
    { id: 'logs', label: t('tab_logs'), icon: MdDescription }
  ];

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`members-control-center ${isDarkTheme ? 'dark-theme' : ''}`}>
      <div className="page-title">
        <BsPeopleFill className="title-icon" />
        <span className="title-text">{t('member_control_title')}</span>
      </div>

      <nav className="control-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon className="tab-icon" />
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="members-section">
        <div className="members-header">
          <div className="members-count">
            <MdPerson className="members-icon" />
            <span>{t('members')}</span>
            <span className="count">18</span>
          </div>
          <div className="header-actions">
            <input
              type="text"
              placeholder={t('search_members')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button className="invite-members-btn">
              <MdPersonAdd />
              {t('invite_members')}
            </button>
          </div>
        </div>

        <div className="members-grid">
          {filteredMembers.map((member) => (
            <div key={member.id} className="member-card">
              <div className="member-info">
                <div className="member-avatar" style={{ backgroundColor: member.color }}>
                  {member.initials}
                </div>
                <div className="member-details">
                  <h3>{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                  <p className="member-location">{member.location}</p>
                </div>
              </div>
              <button className="member-action">
                <span className="action-dot"></span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="roles-section">
        <div className="roles-header">
          <div className="roles-count">
            <MdWork className="roles-icon" />
            <span>{t('roles')}</span>
            <span className="count">25</span>
          </div>
          <div className="roles-actions">
            <div className="search-wrapper">
              <input
                type="text"
                placeholder={t('search_roles')}
                value={searchRoles}
                onChange={(e) => setSearchRoles(e.target.value)}
                className="search-input"
              />
              <button className="icon-button">
                <MdFilterList />
              </button>
              <button className="icon-button">
                <MdCalendarToday />
              </button>
            </div>
          </div>
        </div>

        <div className="roles-grid">
          {roles.map((role) => (
            <div key={role.id} className="role-card">
              <div className="role-progress">
                <div
                  className={`progress-bar ${getProgressBarClass(role.progress)}`}
                  style={{ width: `${role.progress}%` }}
                >
                  {role.progress}%
                </div>
              </div>
              <div className="role-info">
                <h3>{role.title}</h3>
                <p className="role-expiry">{t('expires')}: {role.expiry}</p>
                <p className="role-stats">{role.stats}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MembersControlCenter;
