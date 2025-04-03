import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaCertificate, FaRobot, FaArrowRight } from 'react-icons/fa';
import WalletConnect from '../components/WalletConnect';
import Aurora from './Aurora';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const [connectedAccount, setConnectedAccount] = useState('');
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white' : 'bg-gradient-to-b from-blue-50 via-white to-blue-50 text-gray-900'}`}>
      <Aurora 
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={3.0}
        speed={0.5}
      />  
      

      {/* Hero Section */}
      <section className="text-center py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5"></div>
        <div className="max-w-4xl mx-auto relative">
          <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${darkMode 
            ? 'bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400' 
            : 'bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600'} animate-gradient`}>
            Learn, Earn & Grow
          </h1>
          <p className={`text-xl mb-8 max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Welcome to EduChain - Where blockchain meets education. Learn from experts, 
            earn verifiable certificates, and showcase your achievements on the blockchain.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
            {!connectedAccount && <WalletConnect onConnect={setConnectedAccount} />}
            <Link
              to="/courses"
              className={`${darkMode 
                ? 'bg-gray-800 text-blue-400 border-2 border-blue-500 hover:bg-gray-700 hover:border-blue-400' 
                : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 hover:border-blue-500'} 
                px-8 py-3 rounded-full transform hover:scale-105 transition-all duration-200 inline-flex items-center group`}
            >
              <FaGraduationCap className="mr-2 group-hover:rotate-12 transition-transform duration-200" />
              Explore Courses
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <h2 className={`text-3xl font-bold text-center mb-12 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Why Choose EduChain?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <FaGraduationCap className={`text-3xl ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />,
              title: "Expert-Led Courses",
              description: "Learn from industry experts and gain practical knowledge in blockchain technology.",
              bgColor: darkMode ? 'bg-gray-800/50 backdrop-blur-sm' : 'bg-white/50 backdrop-blur-sm',
              iconBg: darkMode ? 'bg-gray-700' : 'bg-blue-100'
            },
            {
              icon: <FaCertificate className={`text-3xl ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />,
              title: "NFT Certificates",
              description: "Earn unique NFT certificates that prove your skills on the blockchain.",
              bgColor: darkMode ? 'bg-gray-800/50 backdrop-blur-sm' : 'bg-white/50 backdrop-blur-sm',
              iconBg: darkMode ? 'bg-gray-700' : 'bg-purple-100'
            },
            {
              icon: <FaRobot className={`text-3xl ${darkMode ? 'text-green-400' : 'text-green-600'}`} />,
              title: "AI Support",
              description: "Get 24/7 AI-powered support and personalized learning roadmaps.",
              bgColor: darkMode ? 'bg-gray-800/50 backdrop-blur-sm' : 'bg-white/50 backdrop-blur-sm',
              iconBg: darkMode ? 'bg-gray-700' : 'bg-green-100'
            }
          ].map((feature, index) => (
            <div key={index} className={`${feature.bgColor} p-8 rounded-2xl ${darkMode ? 'shadow-lg shadow-gray-800/50' : 'shadow-lg'} hover:shadow-xl transition-all duration-300 transform hover:scale-105 border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className={`${feature.iconBg} w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto transform group-hover:scale-110 transition-transform duration-200`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">{feature.title}</h3>
              <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-16 ${darkMode 
        ? 'bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900' 
        : 'bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600'} text-white relative overflow-hidden`}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzYuMzQzIDM2LjM0M2E2IDYgMCAxMS04LjQ4NS04LjQ4NCA2IDYgMCAwMTguNDg1IDguNDg0eiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMSIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
        <div className="max-w-6xl mx-auto px-4 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { number: "1000+", label: "Active Students" },
              { number: "50+", label: "Expert Instructors" },
              { number: "100+", label: "Courses Available" }
            ].map((stat, index) => (
              <div key={index} className="transform hover:scale-105 transition-transform duration-300 p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                <h3 className="text-4xl font-bold mb-2">{stat.number}</h3>
                <p className={darkMode ? 'text-blue-200' : 'text-blue-100'}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={`py-16 px-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl font-bold text-center mb-12 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            What Our Students Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                quote: "EduChain transformed my career in blockchain development. The NFT certificate helped me land my dream job!",
                author: "Alex Johnson",
                role: "Blockchain Developer"
              },
              {
                quote: "The AI support feature is incredible. I got personalized help whenever I needed it, even at 3 AM!",
                author: "Maria Garcia",
                role: "Student"
              }
            ].map((testimonial, index) => (
              <div key={index} className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700/50 backdrop-blur-sm' : 'bg-white/50 backdrop-blur-sm'} shadow-lg border ${darkMode ? 'border-gray-600' : 'border-gray-200'} transform hover:scale-105 transition-all duration-300`}>
                <p className={`text-lg mb-4 italic ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full ${darkMode ? 'bg-blue-800' : 'bg-blue-100'} flex items-center justify-center mr-3`}>
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 dark:from-blue-500/5 dark:to-purple-500/5"></div>
        <div className="max-w-4xl mx-auto px-4 relative">
          <h2 className={`text-4xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Ready to Start Learning?
          </h2>
          <p className={`text-xl mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Join thousands of students already learning on EduChain
          </p>
          {!connectedAccount ? (
            <WalletConnect onConnect={setConnectedAccount} />
          ) : (
            <Link
              to="/courses"
              className={`${darkMode 
                ? 'bg-gradient-to-r from-blue-700 via-purple-700 to-blue-700' 
                : 'bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500'} 
                text-white px-8 py-3 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200 inline-flex items-center group`}
            >
              <FaGraduationCap className="mr-2 group-hover:rotate-12 transition-transform duration-200" />
              Get Started Now
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          )}
        </div>
      </section>

     
        </div>
    
  );
};

export default Home;