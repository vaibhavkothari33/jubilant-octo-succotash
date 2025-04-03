import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaPlay, FaUser, FaClock, FaBook, FaCertificate, FaChalkboardTeacher, 
         FaStar, FaEthereum, FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const CourseDetails = () => {
  const { courseId } = useParams();
  const { theme } = useTheme();
  const navigate = useNavigate();

  // Sample course data - this would normally come from your blockchain or API
  const courseData = {
    1: {
      id: 1,
      title: "Blockchain Fundamentals",
      description: "A comprehensive introduction to blockchain technology, covering everything from basic cryptography to advanced consensus mechanisms.",
      price: "0.1",
      instructor: {
        name: "Dr. Sarah Johnson",
        title: "Blockchain Research Scientist",
        bio: "Ph.D. in Distributed Systems with 10+ years of experience in blockchain development and research.",
        avatar: `https://ui-avatars.com/api/?name=Sarah+Johnson&background=random`
      },
      duration: "8 weeks",
      level: "Beginner",
      rating: 4.8,
      students: 1234,
      lastUpdated: "2024-03-01",
      topics: [
        "Introduction to Blockchain",
        "Cryptography Basics",
        "Consensus Mechanisms",
        "Smart Contracts"
      ]
    },
    2: {
      id: 2,
      title: "Smart Contract Development",
      description: "Master Solidity programming and learn to write, test, and deploy secure smart contracts.",
      price: "0.2",
      instructor: {
        name: "Alex Chen",
        title: "Senior Smart Contract Developer",
        bio: "15+ years in software development, specialized in blockchain since 2016.",
        avatar: `https://ui-avatars.com/api/?name=Alex+Chen&background=random`
      },
      duration: "10 weeks",
      level: "Intermediate",
      rating: 4.9,
      students: 856,
      lastUpdated: "2024-03-15",
      topics: [
        "Solidity Basics",
        "Smart Contract Security",
        "Testing & Deployment",
        "DApp Integration"
      ]
    }
  };

  const course = courseData[courseId];

  if (!course) {
    return (
      <div className={`min-h-screen ${theme.background} ${theme.text.primary} flex flex-col items-center justify-center`}>
        <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
        <button 
          onClick={() => navigate('/courses')}
          className={`bg-gradient-to-r ${theme.primary} text-white px-6 py-2 rounded-lg`}
        >
          Return to Courses
        </button>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme.background} ${theme.text.primary} py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-7xl mx-auto">
        {/* Navigation */}
        <div className="mb-8">
          <Link 
            to="/courses" 
            className={`${theme.text.secondary} hover:${theme.text.accent} flex items-center`}
          >
            ← Back to Courses
          </Link>
        </div>

        {/* Course Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
            <p className={`${theme.text.secondary} text-lg mb-6`}>
              {course.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <span className={`flex items-center ${theme.text.secondary}`}>
                <FaUser className="mr-2" /> {course.students} students
              </span>
              <span className={`flex items-center ${theme.text.secondary}`}>
                <FaClock className="mr-2" /> {course.duration}
              </span>
              <span className={`flex items-center ${theme.text.secondary}`}>
                <FaBook className="mr-2" /> {course.level}
              </span>
              <span className={`flex items-center ${theme.text.accent}`}>
                <FaStar className="mr-2" /> {course.rating}/5.0
              </span>
            </div>
          </div>

          {/* Enrollment Card */}
          <div className={`${theme.card} rounded-xl shadow-lg p-6 border ${theme.border}`}>
            <div className="text-center mb-6">
              <div className="flex items-center justify-center mb-4">
                <FaEthereum className={`text-2xl ${theme.text.accent} mr-2`} />
                <span className="text-3xl font-bold">{course.price} ETH</span>
              </div>
              <button 
                className={`w-full bg-gradient-to-r ${theme.primary} text-white py-3 rounded-lg hover:shadow-lg transform transition-all duration-200 hover:scale-105`}
              >
                Enroll Now
              </button>
            </div>
            <div className={`border-t ${theme.border} pt-4`}>
              <h3 className="font-semibold mb-3">Course Topics:</h3>
              <ul className={`space-y-2 ${theme.text.secondary}`}>
                {course.topics.map((topic, index) => (
                  <li key={index} className="flex items-center">
                    <FaCertificate className="mr-2" />
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Instructor Section */}
        <div className={`${theme.card} rounded-xl p-6 border ${theme.border} mb-12`}>
          <h2 className="text-2xl font-bold mb-6">Instructor</h2>
          <div className="flex items-center space-x-4">
            <img 
              src={course.instructor.avatar}
              alt={course.instructor.name}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="font-semibold">{course.instructor.name}</h3>
              <p className={theme.text.secondary}>{course.instructor.title}</p>
              <p className={`${theme.text.secondary} mt-2`}>{course.instructor.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
