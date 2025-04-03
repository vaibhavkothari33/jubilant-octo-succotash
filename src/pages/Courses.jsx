import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { FaGraduationCap, FaEthereum, FaUserGraduate } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const Courses = ({ eduChain }) => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Blockchain Fundamentals",
      description: "Learn the core concepts of blockchain technology, including distributed ledgers, consensus mechanisms, and cryptography basics. Perfect for beginners!",
      instructor: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      price: "0.1",
      ipfsHash: "Qm...",
      isActive: true
    },
    {
      id: 2,
      title: "Smart Contract Development",
      description: "Master Solidity programming and learn to write, test, and deploy secure smart contracts. Includes real-world project development.",
      instructor: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      price: "0.2",
      ipfsHash: "Qm...",
      isActive: true
    },
    {
      id: 3,
      title: "DeFi Protocols & Applications",
      description: "Deep dive into Decentralized Finance. Learn about lending protocols, AMMs, yield farming, and how to integrate DeFi protocols into your applications.",
      instructor: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      price: "0.25",
      ipfsHash: "Qm...",
      isActive: true
    },
    {
      id: 4,
      title: "Web3 Development with React",
      description: "Build modern dApps using React and Web3 libraries. Learn to connect to wallets, interact with smart contracts, and create engaging user interfaces.",
      instructor: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      price: "0.15",
      ipfsHash: "Qm...",
      isActive: true
    },
    {
      id: 5,
      title: "NFT Development & Marketing",
      description: "Complete guide to creating and launching successful NFT projects. Covers smart contract development, metadata standards, and marketing strategies.",
      instructor: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      price: "0.3",
      ipfsHash: "Qm...",
      isActive: true
    },
    {
      id: 6,
      title: "Blockchain Security",
      description: "Learn to identify and prevent common smart contract vulnerabilities. Includes security best practices, auditing techniques, and threat mitigation.",
      instructor: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      price: "0.35",
      ipfsHash: "Qm...",
      isActive: true
    }
  ]);

  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  const enrollInCourse = async (courseId, price) => {
    alert(`Enrollment simulation for course ${courseId} at ${price} ETH`);
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
          <h1 className="text-4xl font-bold mb-4">Available Courses</h1>
          <p className={`${theme.text.secondary} max-w-2xl mx-auto`}>
            Explore our curated collection of blockchain courses taught by industry experts.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className={`${theme.card} rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 border ${theme.border}`}>
              <div className={`h-3 bg-gradient-to-r ${theme.primary}`}></div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-xl font-semibold flex-grow">{course.title}</h2>
                  <div className={`${theme.text.accent} bg-opacity-10 rounded-full p-2`}>
                    <FaGraduationCap className="text-xl" />
                  </div>
                </div>
                <p className={`${theme.text.secondary} mb-6 line-clamp-3`}>
                  {course.description}
                </p>
                <div className="space-y-4">
                  <div className={`flex items-center ${theme.text.secondary}`}>
                    <FaUserGraduate className="mr-2" />
                    <span>Instructor: {course.instructor.slice(0, 6)}...{course.instructor.slice(-4)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FaEthereum className={`mr-1 ${theme.text.accent}`} />
                      <span className="font-semibold">{course.price} ETH</span>
                    </div>
                    <Link
                      to={`/courses/${course.id}`}
                      className={`w-full bg-gradient-to-r ${theme.secondary} text-white px-6 py-2 rounded-lg hover:shadow-lg transform transition-all duration-200 hover:scale-105 text-center mt-4`}
                    >
                      View Details
                    </Link>
                    {/* <button
                      onClick={() => enrollInCourse(course.id, course.price)}
                      className={`bg-gradient-to-r ${theme.primary} text-white px-6 py-2 rounded-lg hover:shadow-lg transform transition-all duration-200 hover:scale-105`}
                    >
                      Enroll Now
                    </button> */}
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
      </div>
    </div>
  );
};

export default Courses; 