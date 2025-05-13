import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FAQList from '../modules/faq-coding/FAQList';
import FAQSearchBar from '../modules/faq-coding/FAQSearchBar';
import ChallengePanel from '../modules/faq-coding/ChallengePanel';
import CodeEditorBox from '../modules/faq-coding/CodeEditorBox';
import FeedbackBox from '../modules/faq-coding/FeedbackBox';
import { faqs } from '../data/faqs';
import { useChallenge } from '../contexts/ChallengeContext';
import useChallengePrompt from '../hooks/useChallengePrompt';
import { useTranslation } from 'react-i18next';
import '../styles/coding-challenges.css';
import '../styles/faq.css';

const FAQCoding = () => {
  const { t } = useTranslation();
  const { updateChallenge } = useChallenge();
  const { generateChallenge, loading } = useChallengePrompt();
  const [activeTab, setActiveTab] = useState('FAQ');
  const [selectedDifficulty, setSelectedDifficulty] = useState('beginner');
  const feedbackRef = useRef();
  const location = useLocation();

  const faqSectionRef = useRef(null);
  const codingSectionRef = useRef(null);

  useEffect(() => {
    if (location.pathname.includes('coding-challenges')) {
      setActiveTab('Coding');
      codingSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (location.pathname.includes('faq')) {
      setActiveTab('FAQ');
      faqSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.pathname]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'FAQ') {
      faqSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      codingSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGenerateChallenge = async () => {
    feedbackRef.current?.resetFeedback();

    const editor = document.querySelector('.code-editor-section');
    const feedback = document.querySelector('.feedback-section');
    editor?.classList.add('refreshing');
    feedback?.classList.add('refreshing');

    const loadingOverlay = document.querySelector('.loading-overlay');
    loadingOverlay?.classList.add('active');

    const categories = ['JavaScript Basics', 'Arrays', 'Functions', 'Async Programming'];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];

    const newChallenge = await generateChallenge(randomCategory, selectedDifficulty);

    if (newChallenge) {
      updateChallenge({
        ...newChallenge,
        instructions: [
          `${t('difficulty')}: ${newChallenge.difficulty}`,
          `${t('time_limit')}: ${newChallenge.timeLimit}`,
          `${t('description')}: ${newChallenge.description}`,
          ...newChallenge.hints.map(hint => `${t('hint')}: ${hint}`),
          `${t('test_cases')}:`,
          ...newChallenge.testCases.map(test =>
            `Input: ${test.input} → Expected Output: ${test.expectedOutput}`
          )
        ]
      });
    }

    setTimeout(() => {
      editor?.classList.remove('refreshing');
      feedback?.classList.remove('refreshing');
      loadingOverlay?.classList.remove('active');
    }, 300);
  };

  return (
    <div className="faq-coding-page">
      <header className="faq-header">
        <h1>{t('coding_header_title')}</h1>
        <h2>{t('coding_header_subtitle')}</h2>
      </header>

      <main className="flex-grow w-full relative" style={{ padding: '0 10%' }}>
        <div className="w-full max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8" style={{ minWidth: '800px' }}>
          <div className="tab-buttons">
            <button
              onClick={() => handleTabChange('FAQ')}
              style={{ display: 'none' }}
              className={`tab-button ${activeTab === 'FAQ' ? 'active' : ''}`}
            >
              {t('tab_faq')}
            </button>
            <button
              onClick={() => handleTabChange('Coding')}
              className={`tab-button ${activeTab === 'Coding' ? 'active' : ''}`}
            >
              {t('tab_coding')}
            </button>
          </div>

          <div className="w-full">
            <div ref={faqSectionRef}>
              {activeTab === 'FAQ' && (
                <div className="chat-container bg-white rounded-lg shadow-md overflow-hidden h-[calc(100vh-16rem)] max-w-3xl mx-auto">
                  <div className="bg-blue-600 text-white p-4 text-center">
                    <h2 className="text-xl font-semibold">{t('assistant_title')}</h2>
                    <p className="text-sm opacity-90">{t('assistant_status')}</p>
                  </div>
                  <FAQList faqs={faqs} />
                </div>
              )}
            </div>

            <div ref={codingSectionRef}>
              {activeTab === 'Coding' && (
                <div className="challenges-container h-[calc(100vh-16rem)]">
                  <div className="challenge-panel">
                    <h2 className="text-xl font-bold mb-4">{t('generate_challenge')}</h2>
                    <div className="flex flex-col items-start gap-4">
                      <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('select_difficulty')}:
                        </label>
                        <select
                          value={selectedDifficulty}
                          onChange={(e) => setSelectedDifficulty(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md bg-white shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="beginner">{t('beginner')}</option>
                          <option value="intermediate">{t('intermediate')}</option>
                          <option value="advanced">{t('advanced')}</option>
                        </select>
                      </div>

                      <button
                        className="generate-button px-4 py-2 text-sm flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
                        onClick={handleGenerateChallenge}
                        disabled={loading}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                        </svg>
                        {loading ? t('generating') : t('generate_button')}
                      </button>

                      <p className="text-sm text-gray-600 mt-4">
                        {t('generate_info')}
                      </p>
                    </div>
                  </div>

                  <div className="code-editor-section">
                    <div className="code-editor">
                      <div className="code-editor-header">
                        <h3>{t('code_editor')}</h3>
                      </div>
                      <div className="code-editor-content">
                        <CodeEditorBox />
                        <div className="loading-overlay">
                          <div className="loading-spinner"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="feedback-section">
                    <div className="feedback-box">
                      <FeedbackBox ref={feedbackRef} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default FAQCoding;
