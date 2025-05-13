import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './LandingPage.scss';

const LandingPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleAdminLogin = () => {
    navigate('/admin/dashboard');
  };

  const handleUserLogin = () => {
    navigate('/user/dashboard');
  };

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="nav-logo">
          <h1>{t('landing_logo_prefix')} <span className="gradient-text">{t('landing_logo_suffix')}</span></h1>
        </div>
        <div className="nav-links">
          <a href="#why-choose" className="nav-link">{t('landing_nav_features')}</a>
          <a href="#benefits" className="nav-link">{t('landing_nav_benefits')}</a>
          <a href="#resources" className="nav-link">{t('landing_nav_resources')}</a>
          <a href="#pricing" className="nav-link">{t('landing_nav_pricing')}</a>
        </div>
        <div className="nav-auth">
          <button className="btn-secondary">{t('landing_login')}</button>
          <button className="btn-primary">{t('landing_signup')}</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            {t('landing_hero_title_prefix')} <span className="gradient-text">{t('landing_hero_title_highlight')}</span> {t('landing_hero_title_suffix')}
          </h1>
          <p className="hero-subtitle">{t('landing_hero_subtitle')}</p>
          <div className="cta-buttons">
            <button className="btn-primary">{t('landing_get_started')}</button>
            <button className="btn-secondary">{t('landing_learn_more')}</button>
          </div>
        </div>

        <div className="login-cards">
          <div className="login-card" onClick={handleUserLogin}>
            <div className="card-icon user-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
              </svg>
            </div>
            <h2>{t('landing_user_login_title')}</h2>
            <p>{t('landing_user_login_desc')}</p>
            <button className="login-button">{t('landing_continue_user')}</button>
          </div>

          <div className="login-card" onClick={handleAdminLogin}>
            <div className="card-icon admin-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" fill="currentColor"/>
              </svg>
            </div>
            <h2>{t('landing_admin_login_title')}</h2>
            <p>{t('landing_admin_login_desc')}</p>
            <button className="login-button">{t('landing_continue_admin')}</button>
          </div>
        </div>

        <div className="dashboard-preview">
          <div className="robot-container">
            <img src="/src/assets/images/robot.png" alt={t('landing_robot_alt')} className="robot" />
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section id="why-choose" className="why-choose-section">
        <h2 className="section-title">
          <span className="emoji">🧠</span> {t('landing_why_choose_prefix')} <span className="gradient-text">{t('landing_logo_suffix')}</span>?
        </h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <span className="emoji">🤖</span>
            </div>
            <h3>{t('feature_virtual_mentor_title')}</h3>
            <p>{t('feature_virtual_mentor_desc')}</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <span className="emoji">💡</span>
            </div>
            <h3>{t('feature_adaptive_onboarding_title')}</h3>
            <p>{t('feature_adaptive_onboarding_desc')}</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <span className="emoji">📊</span>
            </div>
            <h3>{t('feature_progress_insights_title')}</h3>
            <p>{t('feature_progress_insights_desc')}</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <span className="emoji">💬</span>
            </div>
            <h3>{t('feature_coding_faq_title')}</h3>
            <p>{t('feature_coding_faq_desc')}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
