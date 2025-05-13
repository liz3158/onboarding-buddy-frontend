import React, { useState } from 'react';
import { BsPerson, BsCodeSlash, BsLaptop, BsBuilding, BsStars, BsPeople, BsAward, BsBarChart } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import './AboutMe.scss';

const AboutMe = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('overview');

  const profile = {
    name: "John Doe",
    role: t('role'),
    team: t('team'),
    department: t('department'),
    email: 'john.doe@company.com',
    location: 'New York, USA',
    startDate: new Date().toISOString().split('T')[0],
    bio: t('bio'),
    skills: [t('skill1'), t('skill2'), 'JavaScript', 'React', 'TypeScript', 'Node.js'],
    interests: [t('interest1'), t('interest2'), 'UI/UX Design', 'Cloud Technologies', 'Mobile Development'],
    mentor: t('mentor'),
    buddy: t('buddy'),
    completedTasks: 12,
    totalTasks: 20,
    achievements: [
      { title: t('achievement_title_1'), description: t('achievement_desc_1'), date: '2023-05-15' },
      { title: t('achievement_title_2'), description: t('achievement_desc_2'), date: '2023-05-22' }
    ]
  };

  const progressPercentage = profile.totalTasks > 0 
    ? Math.round((profile.completedTasks / profile.totalTasks) * 100) 
    : 0;

  const daysSinceStart = () => {
    const startDate = new Date(profile.startDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const renderOverview = () => (
    <div className="profile-overview">
      <div className="profile-summary-card">
        <div className="summary-stat">
          <BsBarChart className="summary-icon" />
          <div className="stat-details">
            <span className="stat-value">{daysSinceStart()}</span>
            <span className="stat-label">{t('daysAtCompany')}</span>
          </div>
        </div>
        <div className="summary-stat">
          <BsBarChart className="summary-icon" />
          <div className="stat-details">
            <span className="stat-value">{progressPercentage}%</span>
            <span className="stat-label">{t('onboardingProgress')}</span>
          </div>
        </div>
        <div className="summary-stat">
          <BsAward className="summary-icon" />
          <div className="stat-details">
            <span className="stat-value">{profile.achievements.length}</span>
            <span className="stat-label">{t('achievements')}</span>
          </div>
        </div>
      </div>

      <div className="profile-bio-card">
        <h4><BsStars /> {t('aboutMe')}</h4>
        <p>{profile.bio}</p>
      </div>

      <div className="profile-grid">
        <div className="profile-card">
          <h4><BsCodeSlash /> {t('expertise')}</h4>
          <div className="tags">
            {profile.skills.map((skill, index) => (
              <span key={`skill-${index}`} className="tag">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="profile-card">
          <h4><BsLaptop /> {t('learningInterests')}</h4>
          <div className="tags">
            {profile.interests.map((interest, index) => (
              <span key={`interest-${index}`} className="tag">
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="profile-card support-card">
        <h4><BsPeople /> {t('supportTeam')}</h4>
        <div className="support-team">
          <div className="support-member">
            <div className="support-avatar mentor-avatar">M</div>
            <div className="support-details">
              <span className="support-name">{profile.mentor}</span>
              <span className="support-role">{t('mentorLabel')}</span>
            </div>
          </div>
          <div className="support-member">
            <div className="support-avatar buddy-avatar">B</div>
            <div className="support-details">
              <span className="support-name">{profile.buddy}</span>
              <span className="support-role">{t('buddyLabel')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAchievements = () => (
    <div className="achievements-container">
      <div className="achievements-header">
        <h4><BsAward /> {t('yourAchievements')}</h4>
        <p>{t('achievementsSubtitle')}</p>
      </div>
      
      <div className="achievements-list">
        {profile.achievements.map((achievement, index) => (
          <div key={`achievement-${index}`} className="achievement-card">
            <div className="achievement-icon">
              <BsAward />
            </div>
            <div className="achievement-details">
              <h5>{achievement.title}</h5>
              <p>{achievement.description}</p>
              <span className="achievement-date">{achievement.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="about-me">
      <div className="about-me-container">
        <div className="profile-header">
          <div className="profile-backdrop"></div>
          <div className="profile-avatar-wrapper">
            <div className="profile-avatar">
              <BsPerson className="avatar-icon" />
            </div>
          </div>
          <div className="profile-details">
            <h2>{profile.name}</h2>
            <div className="profile-meta">
              <span><BsBuilding /> {profile.department} · {profile.role}</span>
              <span><BsPeople /> {profile.team}</span>
            </div>
          </div>
        </div>

        <div className="profile-tabs">
          <button 
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            {t('overview')}
          </button>
          <button 
            className={`tab-button ${activeTab === 'achievements' ? 'active' : ''}`}
            onClick={() => setActiveTab('achievements')}
          >
            {t('achievements')}
          </button>
        </div>

        <div className="profile-content">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'achievements' && renderAchievements()}
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
