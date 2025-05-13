// FeedbackBox
import React, { useState, forwardRef } from 'react';
import { useChallenge } from '../../contexts/ChallengeContext';

const FeedbackBox = forwardRef((props, ref) => {
  const { currentChallenge, userCode } = useChallenge();
  const [feedback, setFeedback] = useState(null);
  const [isChecking, setIsChecking] = useState(false);

  // Add reset function
  const resetFeedback = () => {
    setFeedback(null);
    setIsChecking(false);
  };

  // Expose resetFeedback to parent components
  React.useImperativeHandle(
    ref,
    () => ({
      resetFeedback
    }),
    []
  );

  const checkSolution = async () => {
    if (!userCode || !currentChallenge) {
      setFeedback({
        status: 'error',
        message: 'Please write some code before checking the solution.'
      });
      return;
    }

    setIsChecking(true);
    try {
      // Simulate checking the solution
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Basic code validation
      if (userCode.length < 10) {
        setFeedback({
          status: 'error',
          message: 'Your solution seems too short. Try writing a more complete solution.'
        });
        return;
      }

      // Simple test cases check (you can expand this)
      const testResults = currentChallenge.testCases.map(test => {
        try {
          // This is a basic simulation - you'll want to implement proper test running
          return {
            passed: true,
            input: test.input,
            expected: test.expectedOutput,
            actual: 'Test output'
          };
        } catch (error) {
          return {
            passed: false,
            input: test.input,
            expected: test.expectedOutput,
            error: error.message
          };
        }
      });

      const allPassed = testResults.every(result => result.passed);

      setFeedback({
        status: allPassed ? 'success' : 'partial',
        message: allPassed 
          ? 'Great job! All test cases passed!' 
          : 'Some test cases failed. Keep trying!',
        testResults
      });

    } catch (error) {
      setFeedback({
        status: 'error',
        message: 'Error checking your solution: ' + error.message
      });
    } finally {
      setIsChecking(false);
    }
  };

  const getFeedbackColor = (status) => {
    switch (status) {
      case 'success': return 'bg-green-50 text-green-800 border-green-200';
      case 'error': return 'bg-red-50 text-red-800 border-red-200';
      case 'partial': return 'bg-yellow-50 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-50 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">Feedback</h3>
        <button
          onClick={checkSolution}
          disabled={isChecking || !currentChallenge}
          className={`px-4 py-2 rounded-md ${
            isChecking || !currentChallenge
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isChecking ? 'Checking...' : 'Check Solution'}
        </button>
      </div>

      {feedback && (
        <div className={`p-4 rounded-md border ${getFeedbackColor(feedback.status)}`}>
          <p className="font-medium">{feedback.message}</p>
          
          {feedback.testResults && (
            <div className="mt-4 space-y-2">
              <h4 className="font-medium">Test Results:</h4>
              {feedback.testResults.map((result, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-md ${
                    result.passed
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  <p>Test Case {index + 1}: {result.passed ? 'Passed ✓' : 'Failed ✗'}</p>
                  <p className="text-sm">Input: {result.input}</p>
                  <p className="text-sm">Expected: {result.expected}</p>
                  {!result.passed && result.error && (
                    <p className="text-sm text-red-600">Error: {result.error}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {feedback.status === 'success' && (
            <div className="mt-4 p-4 bg-green-100 rounded-md">
              <h4 className="font-medium text-green-800">🎉 Challenge Completed!</h4>
              <p className="mt-2 text-green-700">
                Ready for the next challenge? Try generating a new one or select from the list.
              </p>
            </div>
          )}
        </div>
      )}

      {!currentChallenge && (
        <div className="p-4 bg-gray-50 rounded-md text-gray-600">
          Select or generate a challenge to get started.
        </div>
      )}
    </div>
  );
});

export default FeedbackBox;

