// src/pages/AIAssignment.jsx
import React from 'react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { useChat } from '../hooks/useAgent';
import { FaSpinner } from 'react-icons/fa';
import { FaArrowDown } from 'react-icons/fa';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h2 className="text-red-600 font-semibold">Something went wrong</h2>
          <p className="text-red-500 mt-2">{this.state.error?.message}</p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const AIAssignment = () => {
  const { darkMode } = useTheme();
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [solution, setSolution] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const outputRef = useRef(null);
  
  // Use the useChat hook for bot functionality
  const {
    messages,
    isConnected,
    error,
    logProgress,
    logProgressActive,
    sendMessage
  } = useChat();

  // Check if should show scroll button when messages change
  useEffect(() => {
    if (outputRef.current) {
      const { scrollHeight, scrollTop, clientHeight } = outputRef.current;
      const isNotAtBottom = scrollHeight - scrollTop - clientHeight > 100;
      setShowScrollButton(isNotAtBottom);
    }
  }, [messages]);

  // Handle scroll to bottom
  const scrollToBottom = () => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
      setShowScrollButton(false);
    }
  };

  // Memoize the renderAIResponse function to prevent unnecessary re-renders
  const renderAIResponse = useCallback((message) => {
    if (!message || !message.content) {
      return null;
    }

    if (message.isAgentZero) {
      return (
        <div className={`flex items-start space-x-3 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
          <div className="flex-shrink-0">
            <img
              src="https://i.ibb.co/v66QRQXd/Screenshot-2025-04-05-014242.png"
              alt="Agent Zero"
              className="w-8 h-8 rounded-full"
            />
          </div>
          <div className="w-full">
            <p className="font-semibold mb-1">Agent Zero</p>
            
            {message.isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-pulse h-2 w-2 bg-blue-500 rounded-full"></div>
                <div className="animate-pulse h-2 w-2 bg-blue-500 rounded-full" style={{animationDelay: '0.2s'}}></div>
                <div className="animate-pulse h-2 w-2 bg-blue-500 rounded-full" style={{animationDelay: '0.4s'}}></div>
                <span className="ml-2 text-sm text-gray-500">Processing your request...</span>
              </div>
            ) : (
              <div className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {typeof message.content === 'string' 
                  ? message.content 
                  : typeof message.content === 'object' && message.content.content 
                    ? message.content.content
                    : JSON.stringify(message.content)}
              </div>
            )}
          </div>
        </div>
      );
    }
    
    if (typeof message.content === 'string') {
      return message.content;
    }

    if (message.content && typeof message.content === 'object') {
      // Handle error messages
      if (message.type === 'error') {
        return (
          <div className="text-red-500">
            {message.content.message || message.content.toString()}
          </div>
        );
      }
    
      // Handle normal object responses
      return (
        <div className="space-y-4">
          {message.content.title && (
            <h3 className={`font-bold text-lg ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              {message.content.title}
            </h3>
          )}
  
          {message.content.description && (
            <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
              {message.content.description}
            </p>
          )}

          {message.content.requirements?.length > 0 && (
            <div>
              <h4 className={`font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                Requirements:
              </h4>
              <ul className="list-disc pl-5">
                {message.content.requirements.map((req, index) => (
                  <li key={index} className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {message.content.hints?.length > 0 && (
            <div>
              <h4 className={`font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                Hints:
              </h4>
              <ul className="list-disc pl-5">
                {message.content.hints.map((hint, index) => (
                  <li key={index} className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                    {hint}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {message.content.estimatedTime && (
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Estimated Time: {message.content.estimatedTime}
            </p>
          )}

          {/* Fallback for other object properties */}
          {!message.content.title && !message.content.description && (
            <pre className={`whitespace-pre-wrap ${darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
              {JSON.stringify(message.content, null, 2)}
            </pre>
          )}
        </div>
      );
    }

    // Fallback for any other type of content
    return (
      <pre className={`whitespace-pre-wrap ${darkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
        {String(message.content)}
      </pre>
    );
  }, [darkMode]);

  // Memoize the handleSolutionSubmit function
  const handleSolutionSubmit = useCallback(async () => {
    if (!isConnected) {
      return;
    }
  
    setSubmitting(true);
    try {
      // Send the solution using the useChat hook
      await sendMessage(solution);
      
      // Clear solution after submission
      setSolution('');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setSubmitting(false);
    }
  }, [isConnected, sendMessage, solution]);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto py-6 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bot Output Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Bot Output Card */}
            <div className={`rounded-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'
              } shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              {/* Header with Status */}
              <div className={`p-4 border-b ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
                }`}>
                <div className="flex items-center justify-between">
                  <h2 className={`text-xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'
                    }`}>
                    AI Assignment Assistant
                  </h2>
                  <div className="flex items-center space-x-2">
                    <div className={`px-3 py-1 rounded-full text-sm flex items-center ${isConnected
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                      }`}>
                      <div className={`w-2 h-2 rounded-full mr-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'
                        }`} />
                      {isConnected ? 'Connected' : 'Disconnected'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bot Output Messages */}
              <div className="relative">
                <div className="h-[500px] overflow-y-auto p-4 space-y-4" ref={outputRef}>
                  <ErrorBoundary>
                    {messages.map((message) => (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={message.id}
                        className={`flex ${message.type === 'user'
                            ? 'justify-end'
                            : message.isAgentZero
                              ? 'justify-start bg-blue-50 dark:bg-blue-900/20'
                              : 'justify-start'
                          }`}
                      >
                        <div className={`max-w-[80%] rounded-2xl p-4 ${message.type === 'user'
                            ? 'bg-blue-600 text-white'
                            : message.isAgentZero
                              ? darkMode
                                ? 'bg-blue-900/50 text-blue-100'
                                : 'bg-blue-50 text-blue-900'
                              : darkMode
                                ? 'bg-gray-700 text-gray-100'
                                : 'bg-gray-100 text-gray-900'
                          }`}>
                          {renderAIResponse(message)}
                        </div>
                      </motion.div>
                    ))}
                  </ErrorBoundary>
                  
                  {/* Progress Bar */}
                  {logProgressActive && (
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${logProgress}%` }}
                      ></div>
                    </div>
                  )}
                  
                  {/* Error Message */}
                  {error && (
                    <div className="p-3 bg-red-100 text-red-800 rounded-lg">
                      {error}
                    </div>
                  )}
                </div>

                {/* Scroll to Bottom Button */}
                {showScrollButton && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={scrollToBottom}
                    className="absolute bottom-4 right-4 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                  >
                    <FaArrowDown className="w-4 h-4" />
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Solution Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Current Assignment Card */}
            <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'
              } shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'
              }`}>
              <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>
                Current Assignment
              </h2>
              {selectedAssignment ? (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-blue-600">
                    {selectedAssignment.title}
                  </h3>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                    {selectedAssignment.description}
                  </p>
                  <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>
                    <span className="text-sm font-medium">
                      Estimated Time: {selectedAssignment.estimatedTime}
                    </span>
                  </div>
                </div>
              ) : (
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                  <p className="text-center text-gray-500">
                    No assignment selected
                  </p>
                </div>
              )}
            </div>

            {/* Solution Editor Card */}
            <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'
              } shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'
              }`}>
              <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>
                Your Solution
              </h2>
              <div className="space-y-4">
                <textarea
                  value={solution}
                  onChange={(e) => setSolution(e.target.value)}
                  placeholder="Write your solution here..."
                  className={`w-full h-48 p-4 rounded-xl resize-none transition-colors ${darkMode
                      ? 'bg-gray-700 text-gray-100 placeholder-gray-400'
                      : 'bg-gray-50 text-gray-900 placeholder-gray-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSolutionSubmit}
                  disabled={!solution.trim() || submitting || !isConnected}
                  className={`w-full py-3 rounded-xl transition-colors ${submitting || !isConnected
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                    } text-white font-semibold shadow-lg`}
                >
                  {submitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <FaSpinner className="animate-spin h-5 w-5 text-white" />
                      <span>Submitting...</span>
                    </div>
                  ) : !isConnected ? 'Not Connected' : 'Submit Solution'}
                </motion.button>
              </div>
            </div>

            {/* Resources Card */}
            <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'
              } shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'
              }`}>
              <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>
                Resources & Tips
              </h2>
              <div className="space-y-4">
                {[
                  { icon: '📚', text: 'Review the documentation' },
                  { icon: '🧪', text: 'Test your solution thoroughly' },
                  { icon: '💡', text: 'Include detailed comments' },
                  { icon: '🔍', text: 'Check edge cases' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                    className={`flex items-center space-x-3 p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'
                      } cursor-pointer transition-colors hover:bg-blue-50`}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                      {item.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AIAssignment;