import React, { useState, useRef, useContext } from 'react';
import { ThemeContext } from "../../../../contexts/ThemeContext";
import { useTranslation } from 'react-i18next';
import "./GuidebookLibrary.scss";

const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const PDFIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

const PreviewIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const dummyGuidebooks = [
  {
    id: 1,
    title: 'Getting Started Guide',
    description: 'Essential setup instructions for development environment, tools, and access permissions',
    date: 'Apr 10, 2025',
    size: '8MB'
  },
  {
    id: 2,
    title: 'Coding Standards & Practices',
    description: 'Company-wide coding conventions, git workflow, and code review processes',
    date: 'Mar 28, 2025',
    size: '12MB'
  },
  {
    id: 3,
    title: 'Architecture Overview',
    description: 'Comprehensive guide to our system architecture, microservices, and data flow',
    date: 'Apr 2, 2025',
    size: '15MB'
  },
  {
    id: 4,
    title: 'Development Workflow',
    description: 'Step-by-step guide to local development, testing, and deployment procedures',
    date: 'Apr 12, 2025',
    size: '10MB'
  },
  {
    id: 5,
    title: 'Security Protocols',
    description: 'Security best practices, authentication flows, and data protection guidelines',
    date: 'Mar 15, 2025',
    size: '9MB'
  },
  {
    id: 6,
    title: 'Team Collaboration Guide',
    description: 'Overview of communication tools, agile processes, and team ceremonies',
    date: 'Apr 5, 2025',
    size: '7MB'
  }
];
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default function GuidebookLibrary() {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [guidebooks, setGuidebooks] = useState(dummyGuidebooks);
  const [isDragging, setIsDragging] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [documentDetails, setDocumentDetails] = useState({
    title: '',
    department: 'Design',
    effectiveDate: '',
    version: '',
    visibleToNewHires: true,
    requireAcknowledgment: true,
    category: 'All Resources'
  });
  const fileInputRef = useRef(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(t('confirm_delete_guidebook'));
    if (confirmDelete) {
      setGuidebooks(prevGuidebooks => prevGuidebooks.filter(book => book.id !== id));
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = [...e.dataTransfer.files];
    handleFiles(files);
  };

  const handleFileInput = (e) => {
    const files = [...e.target.files];
    handleFiles(files);
  };
  const handleFiles = (files) => {
    const validFiles = files.filter(file => {
      const isValidType = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type);
      const isValidSize = file.size <= 10 * 1024 * 1024;
      return isValidType && isValidSize;
    });

    if (validFiles.length !== files.length) {
      alert(t('some_files_rejected'));
    }

    if (validFiles.length > 0) {
      const newFiles = validFiles.map(file => ({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(1),
        uploadTime: t('uploaded_just_now'),
        type: file.type,
        category: 'All Resources'
      }));
      setUploadedFiles([...newFiles]);
      const suggestedTitle = newFiles[0].name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ");
      setDocumentDetails(prev => ({ ...prev, title: suggestedTitle }));
      setIsModalOpen(true);
    }
  };
  const handleDocumentDetailsSubmit = (e) => {
    e.preventDefault();
    setUploadedFiles(prevFiles => prevFiles.map((file) => ({
      ...file,
      name: documentDetails.title + (file.name.match(/\.[^/.]+$/) || ['.pdf'])[0],
      department: documentDetails.department,
      effectiveDate: documentDetails.effectiveDate,
      version: documentDetails.version || '1.0',
      visibleToNewHires: documentDetails.visibleToNewHires,
      requireAcknowledgment: documentDetails.requireAcknowledgment
    })));
    setIsModalOpen(false);
    setDocumentDetails({
      title: '',
      department: 'Design',
      effectiveDate: '',
      version: '',
      visibleToNewHires: true,
      requireAcknowledgment: true,
      category: 'All Resources'
    });
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handlePreview = (fileName) => {
    const file = uploadedFiles.find(f => f.name === fileName);
    if (file) {
      setPreviewFile(file);
      setIsPreviewModalOpen(true);
    }
  };

  const handleFileDelete = (fileName) => {
    setUploadedFiles(files => files.filter(file => file.name !== fileName));
  };
  const handleAddToLibrary = (file) => {
    const newGuidebook = {
      id: guidebooks.length + 1,
      title: file.name.replace(/\.[^/.]+$/, ""),
      description: `${file.department} ${t('department_guidebook_version')} ${file.version}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      size: `${file.size}MB`,
      category: file.category
    };
    setGuidebooks(prev => [...prev, newGuidebook]);
    setUploadedFiles([]);
  };

  return (
    <div className="guidebook-library" data-theme={theme}>
      <div className="guidebook-library__header">
        <h1>{t('guidebook_library_title')}</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder={t('search_guidebooks_placeholder')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button>{t('search_button')}</button>
        </div>
      </div>
      <div className="guidebook-library__content">
        <div className="guidebook-library__sidebar">
          <div className="card">
            <h2>{t('categories_title')}</h2>
            <ul className="categories-list">
              <li>
                <label>
                  <input type="checkbox" defaultChecked />
                  {t('category_all_resources')}
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" />
                  {t('category_getting_started')}
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" />
                  {t('category_development')}
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" />
                  {t('category_architecture')}
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" />
                  {t('category_security')}
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" />
                  {t('category_others')}
                </label>
              </li>
            </ul>
          </div>
          <div className="card">
            <h2>{t('add_new_guidebook')}</h2>
            {uploadedFiles.length > 0 ? (
              <div className="uploaded-files">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="uploaded-file">
                    <div className="file-icon">
                      <PDFIcon />
                    </div>
                    <div className="file-info">
                      <div className="file-name">{file.name}</div>
                      <div className="file-meta">
                        {file.size} MB • {file.department} • {t('version_label')} {file.version}
                      </div>
                      <div className="file-meta">
                        {t('effective_from_label')}: {new Date(file.effectiveDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="file-actions">
                      <button
                        className="preview-button"
                        onClick={() => handlePreview(file.name)}
                        title={t('preview_file')}
                      >
                        <PreviewIcon />
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleFileDelete(file.name)}
                        title={t('delete_file')}
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>
                ))}
                <button 
                  className="add-to-library-button" 
                  onClick={() => handleAddToLibrary(uploadedFiles[0])}
                >
                  {t('add_to_library')}
                </button>
              </div>
            ) : (
              <div
                className={`upload-area ${isDragging ? 'drag-active' : ''}`}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleUploadClick}
              >
                <div className="upload-icon">
                  <UploadIcon />
                </div>
                <div className="upload-text">
                  {t('drag_drop_text')}
                </div>
                <div className="upload-subtext">
                  {t('drag_drop_subtext')}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleFileInput}
                  style={{ display: 'none' }}
                />
              </div>
            )}
            {!uploadedFiles.length && (
              <button className="upload-button" onClick={handleUploadClick}>
                {t('upload_guidebook_button')}
              </button>
            )}
          </div>
        </div>
        <div className="guidebook-library__grid">
          <div className="grid-container">
            {guidebooks.map((book) => (
              <div key={book.id} className="guidebook-card">
                <button
                  className="delete-button"
                  onClick={() => handleDelete(book.id)}
                  title={t('delete_guidebook')}
                >
                  <DeleteIcon />
                </button>
                <img
                  src={
                    book.id === 1 ? 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80' :
                    book.id === 2 ? 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&q=80' :
                    book.id === 3 ? 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&q=80' :
                    book.id === 4 ? 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80' :
                    book.id === 5 ? 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&q=80' :
                    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&q=80'
                  }
                  alt={book.title}
                  className="guidebook-image"
                />
                <div className="card-content">
                  <h3>{book.title}</h3>
                  <p>{book.description}</p>
                  <div className="card-footer">
                    <span>{t('added_on')}: {book.date}</span>
                    <span>{t('file_type_pdf')} • {book.size}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="guidebook-library__pagination">
            <div className="pagination-container">
              <button>«</button>
              <button className="active">1</button>
              <button>2</button>
              <button>3</button>
              <button>»</button>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleDocumentDetailsSubmit} className="document-details-form">
          <h2>{t('document_details_title')}</h2>

          <div className="form-group">
            <label htmlFor="title">{t('document_title')}</label>
            <input
              type="text"
              id="title"
              value={documentDetails.title}
              onChange={(e) => setDocumentDetails(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="department">{t('assign_department')}</label>
            <select
              id="department"
              value={documentDetails.department}
              onChange={(e) => setDocumentDetails(prev => ({ ...prev, department: e.target.value }))}
            >
              <option value="Design">Design</option>
              <option value="Engineering">Engineering</option>
              <option value="Product">Product</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="category">{t('category')}</label>
            <select
              id="category"
              value={documentDetails.category}
              onChange={(e) => setDocumentDetails(prev => ({ ...prev, category: e.target.value }))}
            >
              <option value="All Resources">{t('category_all_resources')}</option>
              <option value="Getting Started">{t('category_getting_started')}</option>
              <option value="Development">{t('category_development')}</option>
              <option value="Architecture">{t('category_architecture')}</option>
              <option value="Security & Access">{t('category_security')}</option>
              <option value="Others">{t('category_others')}</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="effectiveDate">{t('effective_from_label')}</label>
            <input
              type="date"
              id="effectiveDate"
              value={documentDetails.effectiveDate}
              onChange={(e) => setDocumentDetails(prev => ({ ...prev, effectiveDate: e.target.value }))}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="version">{t('document_version_label')}</label>
            <input
              type="text"
              id="version"
              placeholder={t('leave_blank_auto_version')}
              value={documentDetails.version}
              onChange={(e) => setDocumentDetails(prev => ({ ...prev, version: e.target.value }))}
            />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={documentDetails.visibleToNewHires}
                onChange={(e) => setDocumentDetails(prev => ({ ...prev, visibleToNewHires: e.target.checked }))}
              />
              {t('visible_to_new_hires')}
            </label>
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={documentDetails.requireAcknowledgment}
                onChange={(e) => setDocumentDetails(prev => ({ ...prev, requireAcknowledgment: e.target.checked }))}
              />
              {t('require_acknowledgment')}
            </label>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={() => setIsModalOpen(false)}>
              {t('cancel_button')}
            </button>
            <button type="submit" className="submit-button">
              {t('save_changes_button')}
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isPreviewModalOpen} onClose={() => setIsPreviewModalOpen(false)}>
        <div className="preview-modal">
          <h2>{t('document_preview_title')}</h2>

          {previewFile && (
            <div className="preview-content">
              <div className="preview-header">
                <div className="preview-icon">
                  <PDFIcon />
                </div>
                <div className="preview-title">
                  <h3>{previewFile.name}</h3>
                  <p className="file-size">{previewFile.size} MB</p>
                </div>
              </div>

              <div className="preview-details">
                <div className="detail-group">
                  <label>{t('department_label')}</label>
                  <p>{previewFile.department}</p>
                </div>

                <div className="detail-group">
                  <label>{t('version_label')}</label>
                  <p>{previewFile.version}</p>
                </div>

                <div className="detail-group">
                  <label>{t('effective_from_label')}</label>
                  <p>{new Date(previewFile.effectiveDate).toLocaleDateString()}</p>
                </div>

                <div className="detail-group">
                  <label>{t('category_label')}</label>
                  <p>{previewFile.category}</p>
                </div>

                <div className="detail-group">
                  <label>{t('settings_label')}</label>
                  <div className="settings-list">
                    <p>
                      <span className="bullet">•</span>
                      {previewFile.visibleToNewHires ? t('visible_to_new_hires') : t('hidden_from_new_hires')}
                    </p>
                    <p>
                      <span className="bullet">•</span>
                      {previewFile.requireAcknowledgment ? t('requires_acknowledgment') : t('no_acknowledgment_required')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="preview-actions">
                <button className="close-button" onClick={() => setIsPreviewModalOpen(false)}>
                  {t('close_button')}
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
