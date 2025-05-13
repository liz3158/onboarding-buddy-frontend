import React from 'react';
import { BsPerson, BsCodeSlash, BsLaptop, BsGearWideConnected } from 'react-icons/bs';
import './ProfilePanel.css';

const ProfilePanel = ({ userProfile = {} }) => {
  const defaultProfile = {
    name: 'New Engineer',
    role: 'Software Engineer',
    team: 'Engineering',
    startDate: new Date().toISOString().split('T')[0],
    skills: ['React', 'JavaScript'],
    interests: ['Frontend', 'Performance'],
    mentor: 'Alex Johnson',
    buddy: 'Sam Chen',
    completedTasks: 0,
    totalTasks: 0,
    ...userProfile
  };

  const profile = { ...defaultProfile, ...userProfile };
  
  // Calculate onboarding progress
  const progressPercentage = profile.totalTasks > 0 
    ? Math.round((profile.completedTasks / profile.totalTasks) * 100) 
    : 0;
  
  // Calculate days since start
  const daysSinceStart = () => {
    const startDate = new Date(profile.startDate);
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="profile-panel">
      <div className="profile-header">
        <div className="profile-avatar">
          {profile.avatarUrl ? (
            <img src={profile.avatarUrl} alt={profile.name} />
          ) : (
            <BsPerson className="avatar-icon" />
          )}
        </div>
        <div className="profile-info">
          <h3>{profile.name}</h3>
          <p>{profile.role} · {profile.team}</p>
        </div>
      </div>
      
      <div className="profile-progress">
        <div className="progress-label">
          <span>Onboarding Progress</span>
          <span>{progressPercentage}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="progress-days">
          Day {daysSinceStart()} of onboarding
        </div>
      </div>
      
      <div className="profile-sections">
        <div className="profile-section">
          <h4>Your Expertise</h4>
          <div className="tags">
            {profile.skills.map((skill, index) => (
              <span key={`skill-${index}`} className="tag">
                <BsCodeSlash /> {skill}
              </span>
            ))}
          </div>
        </div>
        
        <div className="profile-section">
          <h4>Learning Interests</h4>
          <div className="tags">
            {profile.interests.map((interest, index) => (
              <span key={`interest-${index}`} className="tag">
                <BsLaptop /> {interest}
              </span>
            ))}
          </div>
        </div>
        
        <div className="profile-section">
          <h4>Your Support Team</h4>
          <div className="support-team">
            <div className="support-member">
              <span className="support-role">Mentor:</span>
              <span className="support-name">{profile.mentor}</span>
            </div>
            <div className="support-member">
              <span className="support-role">Buddy:</span>
              <span className="support-name">{profile.buddy}</span>
            </div>
          </div>
        </div>
        
        <div className="profile-section">
          <h4>Personalized Learning Path</h4>
          <div className="learning-path">
            <div className="learning-item">
              <BsGearWideConnected className="learning-icon" />
              <div>
                <h5>System Architecture</h5>
                <p>Recommended based on your role</p>
              </div>
            </div>
            <div className="learning-item">
              <BsCodeSlash className="learning-icon" />
              <div>
                <h5>Frontend Performance</h5>
                <p>Matches your listed interests</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePanel;