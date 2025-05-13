import React, { useState, useContext } from 'react';
import { ThemeContext } from "../../../contexts/ThemeContext";
import { 
  MdSearch, 
  MdMenuBook, 
  MdCodeOff, 
  MdDesignServices, 
  MdPeopleAlt, 
  MdSecurity, 
  MdPerson,
  MdDownload,
  MdOutlineVisibility
} from 'react-icons/md';
import { useTranslation } from "react-i18next";
import "./UserGuidebook.scss";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="guidebook-modal-overlay" onClick={onClose}>
      <div className="guidebook-modal-content" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

const UserGuidebook = () => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedGuidebook, setSelectedGuidebook] = useState(null);

  const dummyGuidebooks = [
    {
      id: 1,
      title: 'Getting Started Guide',
      description: t('guidebook_desc_getting_started'),
      date: 'Apr 10, 2025',
      size: '8MB',
      category: 'Onboarding',
      icon: <MdPerson size={24} />
    },
    {
      id: 2,
      title: 'Coding Standards & Practices',
      description: t('guidebook_desc_coding_standards'),
      date: 'Mar 28, 2025',
      size: '12MB',
      category: 'Development',
      icon: <MdCodeOff size={24} />
    },
    {
      id: 3,
      title: 'Architecture Overview',
      description: t('guidebook_desc_architecture_overview'),
      date: 'Apr 2, 2025',
      size: '15MB',
      category: 'Development',
      icon: <MdCodeOff size={24} />
    },
    {
      id: 4,
      title: 'Development Workflow',
      description: t('guidebook_desc_development_workflow'),
      date: 'Apr 12, 2025',
      size: '10MB',
      category: 'Development',
      icon: <MdCodeOff size={24} />
    },
    {
      id: 5,
      title: 'Security Protocols',
      description: t('guidebook_desc_security_protocols'),
      date: 'Mar 15, 2025',
      size: '9MB',
      category: 'Security',
      icon: <MdSecurity size={24} />
    },
    {
      id: 6,
      title: 'Team Collaboration Guide',
      description: t('guidebook_desc_team_collaboration'),
      date: 'Apr 5, 2025',
      size: '7MB',
      category: 'Team',
      icon: <MdPeopleAlt size={24} />
    },
    {
      id: 7,
    title: 'Design System Documentation',
    description: t('guidebook_desc_design_system'),
      date: 'Mar 20, 2025',
      size: '14MB',
      category: 'Design',
      icon: <MdDesignServices size={24} />
    },
    {
      id: 8,
    title: 'New Employee Handbook',
    description: t('guidebook_desc_new_employee_handbook'),
      date: 'Apr 8, 2025',
      size: '11MB',
      category: 'Onboarding',
      icon: <MdPerson size={24} />
    }
  ];

  const categories = [
    { id: 'all', name: t('category_all'), icon: <MdMenuBook size={20} /> },
    { id: 'onboarding', name: t('category_onboarding'), icon: <MdPerson size={20} /> },
    { id: 'development', name: t('category_development'), icon: <MdCodeOff size={20} /> },
    { id: 'design', name: t('category_design'), icon: <MdDesignServices size={20} /> },
    { id: 'team', name: t('category_team'), icon: <MdPeopleAlt size={20} /> },
    { id: 'security', name: t('category_security'), icon: <MdSecurity size={20} /> }
  ];

  const filteredGuidebooks = dummyGuidebooks.filter(guidebook => {
    const matchesQuery = guidebook.title.toLowerCase().includes(query.toLowerCase()) || 
                         guidebook.description.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                             guidebook.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesQuery && matchesCategory;
  });

  const handlePreview = (guidebook) => {
    setSelectedGuidebook(guidebook);
    setIsPreviewModalOpen(true);
  };

  return (
    <div className="user-guidebook" data-theme={theme}>
      <div className="user-guidebook__header">
        <h1>{t('page_title_guidebooks')}</h1>
        <div className="search-container">
          <MdSearch size={20} className="search-icon" />
          <input
            type="text"
            placeholder={t('search_placeholder')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="user-guidebook__content">
        <div className="user-guidebook__sidebar">
          <div className="card">
            <h2>{t('sidebar_categories')}</h2>
            <ul className="categories-list">
              {categories.map(category => (
                <li 
                  key={category.id}
                  className={`category-item ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span className="category-icon">{category.icon}</span>
                  <span className="category-name">{category.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card">
            <h2>{t('sidebar_recent')}</h2>
            <ul className="recent-list">
              <li className="recent-item">
                <span className="recent-icon"><MdCodeOff size={16} /></span>
                <span className="recent-name">{t('recent_coding_standards')}</span>
              </li>
              <li className="recent-item">
                <span className="recent-icon"><MdPerson size={16} /></span>
                <span className="recent-name">{t('recent_employee_handbook')}</span>
              </li>
              <li className="recent-item">
                <span className="recent-icon"><MdSecurity size={16} /></span>
                <span className="recent-name">{t('recent_security_protocols')}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="user-guidebook__grid">
          {filteredGuidebooks.length > 0 ? (
            <div className="grid-container">
              {filteredGuidebooks.map(guidebook => (
                <div key={guidebook.id} className="guidebook-card">
                  <div className="guidebook-card__icon">
                    {guidebook.icon}
                  </div>
                  <div className="guidebook-card__content">
                    <h3 className="guidebook-title">{guidebook.title}</h3>
                    <p className="guidebook-description">{guidebook.description}</p>
                    <div className="guidebook-meta">
                      <span className="guidebook-date">{guidebook.date}</span>
                      <span className="guidebook-size">{guidebook.size}</span>
                    </div>
                  </div>
                  <div className="guidebook-card__actions">
                    <button className="action-btn preview" onClick={() => handlePreview(guidebook)}>
                      <MdOutlineVisibility size={18} />
                      <span>{t('button_preview')}</span>
                    </button>
                    <button className="action-btn download">
                      <MdDownload size={18} />
                      <span>{t('button_download')}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <MdMenuBook size={48} />
              <h3>{t('no_results_title')}</h3>
              <p>{t('no_results_subtitle')}</p>
            </div>
          )}
        </div>
      </div>

      <Modal isOpen={isPreviewModalOpen} onClose={() => setIsPreviewModalOpen(false)}>
        {selectedGuidebook && (
          <div className="guidebook-preview">
            <div className="guidebook-preview__header">
              <h2>{selectedGuidebook.title}</h2>
              <button onClick={() => setIsPreviewModalOpen(false)}>×</button>
            </div>
            <div className="guidebook-preview__meta">
              <span className="preview-category">
                {selectedGuidebook.icon}
                <span>{selectedGuidebook.category}</span>
              </span>
              <span className="preview-date">{t('published_on')}: {selectedGuidebook.date}</span>
              <span className="preview-size">{t('file_size')}: {selectedGuidebook.size}</span>
            </div>
            <div className="guidebook-preview__content">
              <div className="preview-placeholder">
                <p>{t('preview_intro', { title: selectedGuidebook.title })}</p>
                <p>{selectedGuidebook.description}</p>
              </div>
            </div>
            <div className="guidebook-preview__actions">
              <button className="action-btn download">
                <MdDownload size={18} />
                <span>{t('button_download_full')}</span>
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserGuidebook;
