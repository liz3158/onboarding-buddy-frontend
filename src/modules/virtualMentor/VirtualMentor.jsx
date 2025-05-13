import React, { useContext } from 'react';
import AMChatboxAI from './chatbox/AMChatboxAI';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../contexts/ThemeContext';
import { DARK_THEME } from '../../constants/themeConstants';
import './VirtualMentor.scss';

const VirtualMentor = () => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`virtual-mentor ${theme === DARK_THEME ? 'dark-mode' : 'light-mode'}`}>
      <div className="virtual-mentor-content">
        <div className="virtual-mentor-features">
          <div className="virtual-mentor-header">
            <h1>{t("virtual_mentor")}</h1>
            <p>{t("virtual_mentor_subtitle")}</p>
          </div>
          
          <div className="feature-cards">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>{t("personalized_guidance_title")}</h3>
              <p>{t("personalized_guidance_desc")}</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>{t("resource_navigation_title")}</h3>
              <p>{t("resource_navigation_desc")}</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">💡</div>
              <h3>{t("quick_problem_solving_title")}</h3>
              <p>{t("quick_problem_solving_desc")}</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>{t("best_practices_title")}</h3>
              <p>{t("best_practices_desc")}</p>
            </div>
          </div>
        </div>

        <div className="chat-container">
          <AMChatboxAI initialOpen={true} onboardingPhase="orientation" />
        </div>
      </div>
    </div>
  );
};

export default VirtualMentor;
