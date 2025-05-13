import React from 'react';

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(30, 32, 38, 0.55)',
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const modalContentStyle = {
  background: '#fff',
  borderRadius: '1rem',
  boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)',
  padding: '2rem',
  minWidth: '350px',
  maxWidth: '90vw',
  maxHeight: '80vh',
  overflowY: 'auto',
  position: 'relative',
  color: '#222',
};

const closeBtnStyle = {
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  background: 'none',
  border: 'none',
  fontSize: '1.5rem',
  cursor: 'pointer',
  color: '#888',
};

const previewImgStyle = {
  width: '100%',
  maxHeight: '180px',
  objectFit: 'cover',
  borderRadius: '0.5rem',
  marginBottom: '1rem',
  background: '#f3f3f3',
};

const downloadBtnStyle = {
  marginTop: '1.5rem',
  padding: '0.7rem 2rem',
  borderRadius: '0.5rem',
  background: '#475be8',
  color: '#fff',
  border: 'none',
  fontWeight: 600,
  fontSize: '1rem',
  cursor: 'pointer',
};

export const Modal = ({ isOpen, onClose, children, showGuidebookPreview }) => {
  if (!isOpen) return null;

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <button style={closeBtnStyle} onClick={onClose} aria-label="Close">×</button>
        {showGuidebookPreview ? (
          <div>
            <h2 style={{marginBottom: '0.5rem'}}>Getting Started Guide</h2>
            <div style={{color: '#475be8', fontWeight: 500, marginBottom: '1rem'}}>Essential setup instructions for development environment, tools, and access permissions</div>
            <img style={previewImgStyle} src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80" alt="Guidebook Preview" />
            <div style={{fontSize: '1rem', lineHeight: 1.6, maxHeight: '120px', overflowY: 'auto', color: '#444', background: '#f7f8fa', borderRadius: '0.5rem', padding: '1rem'}}>
              Welcome to the team! This guide will walk you through the essential steps to set up your development environment, gain access to all necessary tools, and understand our onboarding process. <br /><br />
              <b>Topics covered:</b>
              <ul style={{margin: '0.5rem 0 0 1.2rem'}}>
                <li>Account setup & permissions</li>
                <li>Development tools installation</li>
                <li>Code repository access</li>
                <li>First project walkthrough</li>
              </ul>
              <br />
              For more details, download the full guidebook below.
            </div>
            <button style={downloadBtnStyle}>Download PDF</button>
          </div>
        ) : children}
      </div>
    </div>
  );
};