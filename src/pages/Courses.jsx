import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { FaGraduationCap, FaEthereum, FaUserGraduate, FaBookOpen, FaClock, FaStar } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const Courses = ({ eduChain }) => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Blockchain Fundamentals",
      description: "Learn the core concepts of blockchain technology, including distributed ledgers, consensus mechanisms, and cryptography basics. Perfect for beginners!",
      instructor: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      instructorName: "Alex Johnson",
      price: "0.1",
      ipfsHash: "Qm...",
      isActive: true,
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1000",
      duration: "6 weeks",
      rating: 4.8,
      students: 1245
    },
    {
      id: 2,
      title: "Smart Contract Development",
      description: "Master Solidity programming and learn to write, test, and deploy secure smart contracts. Includes real-world project development.",
      instructor: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      instructorName: "Sophia Chen",
      price: "0.2",
      ipfsHash: "Qm...",
      isActive: true,
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1000",
      duration: "8 weeks",
      rating: 4.9,
      students: 978
    },
    {
      id: 3,
      title: "DeFi Protocols & Applications",
      description: "Deep dive into Decentralized Finance. Learn about lending protocols, AMMs, yield farming, and how to integrate DeFi protocols into your applications.",
      instructor: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      instructorName: "Marcus Williams",
      price: "0.25",
      ipfsHash: "Qm...",
      isActive: true,
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1000",
      duration: "10 weeks",
      rating: 4.7,
      students: 756
    },
    {
      id: 4,
      title: "Web3 Development with React",
      description: "Build modern dApps using React and Web3 libraries. Learn to connect to wallets, interact with smart contracts, and create engaging user interfaces.",
      instructor: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      instructorName: "Emma Rodriguez",
      price: "0.15",
      ipfsHash: "Qm...",
      isActive: true,
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1000",
      duration: "8 weeks",
      rating: 4.6,
      students: 1089
    },
    {
      id: 5,
      title: "NFT Development & Marketing",
      description: "Complete guide to creating and launching successful NFT projects. Covers smart contract development, metadata standards, and marketing strategies.",
      instructor: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      instructorName: "Jamal Thompson",
      price: "0.3",
      ipfsHash: "Qm...",
      isActive: true,
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1000",
      duration: "7 weeks",
      rating: 4.9,
      students: 1567
    },
    {
      id: 6,
      title: "Blockchain Security",
      description: "Learn to identify and prevent common smart contract vulnerabilities. Includes security best practices, auditing techniques, and threat mitigation.",
      instructor: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      instructorName: "Olivia Martinez",
      price: "0.35",
      ipfsHash: "Qm...",
      isActive: true,
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1000",
      duration: "9 weeks",
      rating: 4.8,
      students: 832
    }
  ]);

  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const { theme } = useTheme();

  const enrollInCourse = async (courseId, price) => {
    alert(`Enrollment simulation for course ${courseId} at ${price} ETH`);
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <FaStar 
            key={i} 
            className={`${i < Math.floor(rating) ? theme.text.accent : 'text-gray-300'} text-sm`} 
          />
        ))}
        <span className="ml-2 text-sm font-medium">{rating.toFixed(1)}</span>
      </div>
    );
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
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Explore Blockchain Courses</h1>
          <p className={`${theme.text.secondary} max-w-2xl mx-auto`}>
            Master blockchain technology with our curated collection of courses taught by industry experts
          </p>
          
          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center mt-8 gap-2">
            <button 
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === 'all' 
                ? `bg-gradient-to-r ${theme.primary} text-white` 
                : `bg-opacity-20 bg-gray-200 dark:bg-gray-700 ${theme.text.secondary}`}`}
            >
              All Courses
            </button>
            <button 
              onClick={() => setFilter('beginner')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === 'beginner' 
                ? `bg-gradient-to-r ${theme.primary} text-white` 
                : `bg-opacity-20 bg-gray-200 dark:bg-gray-700 ${theme.text.secondary}`}`}
            >
              For Beginners
            </button>
            <button 
              onClick={() => setFilter('advanced')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === 'advanced' 
                ? `bg-gradient-to-r ${theme.primary} text-white` 
                : `bg-opacity-20 bg-gray-200 dark:bg-gray-700 ${theme.text.secondary}`}`}
            >
              Advanced
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className={`${theme.card} rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 border ${theme.border} flex flex-col`}>
              {/* Course image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {course.price} ETH
                </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100">
                    Blockchain
                  </span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${course.price < 0.2 
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100' 
                    : 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100'}`}
                  >
                    {course.price < 0.2 ? 'Beginner' : 'Advanced'}
                  </span>
                </div>
                
                <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
                
                <p className={`${theme.text.secondary} mb-4 line-clamp-3 text-sm flex-grow`}>
                  {course.description}
                </p>
                
                <div className="space-y-3 mt-auto">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img 
                        src={`/api/placeholder/32/32`} 
                        className="w-6 h-6 rounded-full mr-2" 
                        alt={course.instructorName} 
                      />
                      <span className="text-sm">{course.instructorName}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <FaUserGraduate className="mr-1" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    {renderStars(course.rating)}
                    <div className="flex items-center text-sm">
                      <FaClock className="mr-1" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 mt-2 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <div className="flex items-center">
                      <FaEthereum className={`mr-1 ${theme.text.accent} text-lg`} />
                      <span className="font-bold">{course.price} ETH</span>
                    </div>
                    <Link
                      to={`/courses/${course.id}`}
                      className={`bg-gradient-to-r ${theme.primary} text-white px-4 py-2 rounded-lg hover:shadow-lg transform transition-all duration-200 hover:scale-105 text-center flex-shrink-0`}
                    >
                      View Course
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {courses.length === 0 && (
          <div className={`text-center py-16 ${theme.text.secondary}`}>
            <FaGraduationCap className="text-5xl mx-auto mb-4 opacity-50" />
            <p className="text-xl">No courses available at the moment.</p>
          </div>
        )}
        
        {/* Featured Section */}
        <div className="mt-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Why Learn With Us?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`${theme.card} rounded-xl p-6 text-center`}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-900">
                <FaGraduationCap className="text-2xl text-blue-600 dark:text-blue-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
              <p className={`${theme.text.secondary}`}>Learn from industry professionals with years of blockchain experience</p>
            </div>
            
            <div className={`${theme.card} rounded-xl p-6 text-center`}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-green-100 dark:bg-green-900">
                <FaBookOpen className="text-2xl text-green-600 dark:text-green-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Comprehensive Content</h3>
              <p className={`${theme.text.secondary}`}>In-depth courses covering everything from basics to advanced topics</p>
            </div>
            
            <div className={`${theme.card} rounded-xl p-6 text-center`}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-purple-100 dark:bg-purple-900">
                <FaEthereum className="text-2xl text-purple-600 dark:text-purple-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Web3 Native</h3>
              <p className={`${theme.text.secondary}`}>Access all courses with ETH payments and verifiable on-chain credentials</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;