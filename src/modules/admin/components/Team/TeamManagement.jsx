import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdAdd, MdEdit, MdMoreHoriz, MdFilterList, MdFileDownload } from 'react-icons/md';
import './TeamManagement.scss';

const TABS = [
  { id: 'all', labelKey: 'tabs_all', count: 12 },
  { id: 'active', labelKey: 'tabs_active', count: 10 },
  { id: 'archived', labelKey: 'tabs_archived', count: 2 }
];

const INITIAL_TEAMS = [
  {
    id: '',
    name: 'Frontend',
    headCount: 15,
    techStack: ['React', 'TypeScript', 'GraphQL'],
    status: { state: 'Completed', progress: null },
    projects: 4,
    openRoles: 2,
    leader: { id: 'JS', name: 'Jane Smith', email: 'jane.smith@example.com' }
  },
  {
    id: '',
    name: 'Backend ',
    headCount: 12,
    techStack: ['Node.js', 'Python', 'MongoDB'],
    status: { state: 'In Progress', progress: { current: 3, total: 5 } },
    projects: 3,
    openRoles: 1,
    leader: { id: 'MJ', name: 'Michael Johnson', email: 'michael.j@example.com' }
  },
  {
    id: '',
    name: 'DevOps',
    headCount: 8,
    techStack: ['Kubernetes', 'Docker', 'AWS'],
    status: { state: 'Completed', progress: null },
    projects: 5,
    openRoles: 2,
    leader: { id: 'AK', name: 'Alex Kumar', email: 'alex.k@example.com' }
  }
];

const TeamManagement = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('all');
  const [teams] = useState(INITIAL_TEAMS);

  return (
    <div className="team-management">
      <header className="team-header">
        <h1>{t('team_title')}</h1>
        <div className="header-actions">
          <button className="btn btn-secondary">
            <MdFileDownload /> {t('export')}
          </button>
          <button className="btn btn-secondary">
            <MdFilterList /> {t('filter')}
          </button>
          <button className="btn btn-primary">
            <MdAdd /> {t('add')}
          </button>
        </div>
      </header>

      <section className="team-overview">
        <div className="section-header">
          <h2>{t('team_overview')}</h2>
        </div>

        <div className="tabs">
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {t(tab.labelKey)} ({tab.count})
            </button>
          ))}
        </div>

        <div className="teams-table">
          <table>
            <thead>
              <tr>
                <th>{t('table_no')}</th>
                <th>{t('table_team')}</th>
                <th>{t('table_leader')}</th>
                <th>{t('table_headcount')}</th>
                <th>{t('table_tech_stack')}</th>
                <th>{t('table_status')}</th>
                <th>{t('table_projects')}</th>
                <th>{t('table_open_roles')}</th>
                <th>{t('table_actions')}</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, index) => (
                <tr key={team.id}>
                  <td>{index + 1}</td>
                  <td className="team-info">
                    <span className="team-name">{team.name}</span>
                  </td>
                  <td className="team-leader">
                    <div className="member-item">
                      <div className="member-avatar" style={{ backgroundColor: '#4285f4', color: 'white' }}>
                        {team.leader.id}
                      </div>
                      <div className="member-info">
                        <div className="member-name">{team.leader.name}</div>
                        <div className="member-email">{team.leader.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{team.headCount}</td>
                  <td>{team.techStack.join(', ')}</td>
                  <td>
                    <span className={`status ${team.status.state.toLowerCase().replace(' ', '-')}`}>
                      {t(`status_${team.status.state.toLowerCase().replace(' ', '_')}`)}
                      {team.status.progress && ` (${team.status.progress.current}/${team.status.progress.total})`}
                    </span>
                  </td>
                  <td>{team.projects}</td>
                  <td>{team.openRoles}</td>
                  <td>
                    <div className="actions">
                      <button className="action-btn" title={t('edit')}>
                        <MdEdit size={20} />
                      </button>
                      <button className="action-btn" title={t('more')}>
                        <MdMoreHoriz size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default TeamManagement;
