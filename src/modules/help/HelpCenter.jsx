import React from 'react';
import ChatboxAI from './helpchatbox/ChatboxAI';
import { useTranslation } from 'react-i18next';
import './HelpCenter.scss';

const HelpCenter = () => {
  const { t } = useTranslation();

  return (
    <div className="help-center">
      <div className="help-center-content">
        <div className="help-center-features">
          <div className="help-center-header">
            <h1>{t('help_center_title')}</h1>
            <p>{t('help_center_subtitle')}</p>
          </div>

          <div className="feature-cards">
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>{t('feature_quick_search')}</h3>
              <p>{t('feature_quick_search_desc')}</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>{t('feature_knowledge_base')}</h3>
              <p>{t('feature_knowledge_base_desc')}</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>{t('feature_live_support')}</h3>
              <p>{t('feature_live_support_desc')}</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>{t('feature_ai_assistant')}</h3>
              <p>{t('feature_ai_assistant_desc')}</p>
            </div>
          </div>
        </div>

        <div className="chat-container">
          <ChatboxAI initialOpen={true} onboardingPhase="help" />
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
