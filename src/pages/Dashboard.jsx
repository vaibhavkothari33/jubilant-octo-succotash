import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { FaGraduationCap, FaCertificate, FaChartLine } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Dashboard = ({ eduChain, certificateNFT, account }) => {
  const [enrolledCourses, setEnrolledCourses] = useState([
    {
      id: 1,
      title: "Blockchain Fundamentals",
      progress: 75,
      hasCompleted: false
    },
    {
      id: 2,
      title: "Smart Contract Development",
      progress: 100,
      hasCompleted: true
    },
    {
      id: 3,
      title: "DeFi Protocols & Applications",
      progress: 30,
      hasCompleted: false
    },
    {
      id: 4,
      title: "Web3 Development with React",
      progress: 60,
      hasCompleted: false
    }
  ]);

  const [certificates, setCertificates] = useState([
    {
      tokenId: "NFT-001",
      courseId: "CERT-BF-101",
      studentName: "John Doe",
      completionDate: "2024-03-15",
      score: "95"
    },
    {
      tokenId: "NFT-002",
      courseId: "CERT-SC-201",
      studentName: "John Doe",
      completionDate: "2024-03-20",
      score: "88"
    }
  ]);

  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  const updateProgress = async (courseId, newProgress) => {
    setEnrolledCourses(prev => prev.map(course => 
      course.id === courseId 
        ? { ...course, progress: Math.min(newProgress, 100) } 
        : course
    ));
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${theme.background} ${theme.text.primary} flex items-center justify-center`}>
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-current border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-b ${theme.background} ${theme.text.primary} py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Enrolled Courses Section */}
        <section>
          <div className="flex items-center mb-8">
            <FaGraduationCap className={`text-2xl mr-3 ${theme.text.accent}`} />
            <h2 className="text-3xl font-bold">My Courses</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <div key={course.id} className={`${theme.card} rounded-xl shadow-lg p-6 border ${theme.border} transition-transform duration-300 hover:scale-105`}>
                <h3 className="text-xl font-semibold mb-4">{course.title}</h3>
                <div className="mb-6">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className={`bg-gradient-to-r ${theme.primary} h-3 rounded-full transition-all duration-500`}
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <p className={`text-sm ${theme.text.secondary} mt-2`}>
                    Progress: {course.progress}%
                  </p>
                </div>
                {course.progress < 100 && (
                  <button
                    onClick={() => updateProgress(course.id, course.progress + 10)}
                    className={`bg-gradient-to-r ${theme.primary} text-white px-4 py-2 rounded-lg hover:shadow-lg transform transition-all duration-200 hover:scale-105 w-full`}
                  >
                    Update Progress
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Certificates Section */}
        <section>
          <div className="flex items-center mb-8">
            <FaCertificate className={`text-2xl mr-3 ${theme.text.accent}`} />
            <h2 className="text-3xl font-bold">My Certificates</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <div key={cert.tokenId} className={`${theme.card} rounded-xl shadow-lg p-6 border ${theme.border} transition-transform duration-300 hover:scale-105`}>
                <div className={`text-4xl ${theme.text.accent} mb-4 flex justify-center`}>
                  <FaCertificate />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">Certificate #{cert.tokenId}</h3>
                <div className="space-y-3">
                  <p className={`${theme.text.secondary}`}>
                    <span className="font-medium">Course:</span> {cert.courseId}
                  </p>
                  <p className={`${theme.text.secondary}`}>
                    <span className="font-medium">Student:</span> {cert.studentName}
                  </p>
                  <p className={`${theme.text.secondary}`}>
                    <span className="font-medium">Completed:</span> {cert.completionDate}
                  </p>
                  <div className={`flex items-center justify-between ${theme.text.secondary}`}>
                    <span className="font-medium">Score:</span>
                    <span className={`text-lg font-bold ${theme.text.accent}`}>{cert.score}/100</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard; 