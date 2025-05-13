// Code Editor Box
import React from 'react';
import MonacoEditor from '@monaco-editor/react';
import { useChallenge } from '../../contexts/ChallengeContext';

const CodeEditorBox = () => {
  const { currentChallenge, userCode, setUserCode } = useChallenge();

  const handleEditorChange = (value) => {
    setUserCode(value);
  };

  const brightTextStyle = { color: '#D6E4F0' }; // Bright blue-white color for all text

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-6 bg-gray-900 p-4 rounded-lg border border-gray-700">
        <h2 className="text-2xl font-bold mb-2" style={brightTextStyle}>Code Challenge</h2>
        {currentChallenge?.title && (
          <h3 className="text-xl mb-2" style={brightTextStyle}>{currentChallenge.title}</h3>
        )}
        {currentChallenge?.description && (
          <p className="mb-4" style={brightTextStyle}>{currentChallenge.description}</p>
        )}
      </div>

      {currentChallenge && (
        <div className="mb-6 bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="text-lg font-bold mb-4" style={brightTextStyle}>Instructions:</h3>
          <ul className="list-none space-y-3">
            {Array.isArray(currentChallenge.instructions) ? (
              currentChallenge.instructions.map((instruction, index) => (
                <li key={index} className="flex items-start">
                  <span style={{ color: '#FFD700' }} className="mr-2">•</span>
                  <span style={brightTextStyle}>{instruction}</span>
                </li>
              ))
            ) : (
              <li style={brightTextStyle}>
                {String(currentChallenge.instructions || 'No instructions available')}
              </li>
            )}
          </ul>
        </div>
      )}

      <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
        <MonacoEditor
          height="400px"
          language="javascript"
          theme="vs-dark"
          value={userCode || currentChallenge?.initialCode || "// Start coding here..."}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            fontSize: 16,
            lineNumbers: 'on',
            automaticLayout: true,
            padding: { top: 20 },
            scrollBeyondLastLine: false,
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditorBox;


