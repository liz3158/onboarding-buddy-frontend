import {  useContext } from 'react';
import { MdAdd, MdEdit } from 'react-icons/md';
import { ThemeContext } from '../../../../contexts/ThemeContext';
import { DARK_THEME } from '../../../../constants/themeConstants';
import { useTranslation } from 'react-i18next';
import './EngineeringRoles.scss';

const EngineeringRoles = () => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === DARK_THEME;
  const { t } = useTranslation();

  return (
    <div className={`engineering-roles ${isDarkMode ? 'dark-theme' : ''}`}>
      <div className="roles-container">
        <div className="section-header">
          <h2>{t('engineering_roles_title')}</h2>
          <button className="btn btn-primary">
            <MdAdd /> {t('create_custom_role')}
          </button>
        </div>

        <div className="roles-list">
          <div className="role-card">
            <div className="role-header">
              <h3>{t('role_senior_fullstack')}</h3>
              <span className="engineer-count">{t('engineers_count', { count: 8 })}</span>
            </div>

            <div className="role-content">
              <div className="access-section">
                <h4>{t('access_level')}</h4>
                <p>{t('access_full_codebase')}</p>
              </div>

              <div className="license-section">
                <div className="license-header">
                  <h4>{t('license_usage')}</h4>
                  <span>{t('licenses_used', { used: 8, total: 10 })}</span>
                </div>
                <div className="license-bar">
                  <div className="license-progress" style={{ width: '80%' }}></div>
                </div>
              </div>

              <div className="role-actions">
                <button className="btn-text">
                  <MdEdit /> {t('edit_role')}
                </button>
                <button className="btn-text">
                  <span className="icon-user"></span> {t('assign_engineers')}
                </button>
              </div>
            </div>
          </div>

          <div className="role-card">
            <div className="role-header">
              <h3>{t('role_backend')}</h3>
              <span className="engineer-count">{t('engineers_count', { count: 6 })}</span>
            </div>

            <div className="role-content">
              <div className="access-section">
                <h4>{t('access_level')}</h4>
                <p>{t('access_backend_services')}</p>
              </div>

              <div className="license-section">
                <div className="license-header">
                  <h4>{t('license_usage')}</h4>
                  <span>{t('licenses_used', { used: 6, total: 8 })}</span>
                </div>
                <div className="license-bar">
                  <div className="license-progress" style={{ width: '75%' }}></div>
                </div>
              </div>

              <div className="role-actions">
                <button className="btn-text">
                  <MdEdit /> {t('edit_role')}
                </button>
                <button className="btn-text">
                  <span className="icon-user"></span> {t('assign_engineers')}
                </button>
              </div>
            </div>
          </div>

          <div className="role-card">
            <div className="role-header">
              <h3>{t('role_frontend')}</h3>
              <span className="engineer-count">{t('engineers_count', { count: 10 })}</span>
            </div>

            <div className="role-content">
              <div className="access-section">
                <h4>{t('access_level')}</h4>
                <p>{t('access_frontend_libraries')}</p>
              </div>

              <div className="license-section">
                <div className="license-header">
                  <h4>{t('license_usage')}</h4>
                  <span>{t('licenses_used', { used: 10, total: 12 })}</span>
                </div>
                <div className="license-bar">
                  <div className="license-progress" style={{ width: '83%' }}></div>
                </div>
              </div>

              <div className="role-actions">
                <button className="btn-text">
                  <MdEdit /> {t('edit_role')}
                </button>
                <button className="btn-text">
                  <span className="icon-user"></span> {t('assign_engineers')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngineeringRoles;
