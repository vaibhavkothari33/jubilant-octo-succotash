import { useState } from 'react';
import { ethers } from 'ethers';
import { create } from 'ipfs-http-client';
import { FaCloudUploadAlt, FaSpinner } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const CreateCourse = ({ eduChain }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    courseContent: null
  });
  const [loading, setLoading] = useState(false);
  const [ipfsHash, setIpfsHash] = useState('');
  const { theme } = useTheme();

  const ipfs = create({ url: 'https://ipfs.infura.io:5001/api/v0' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      courseContent: e.target.files[0]
    }));
  };

  const uploadToIPFS = async () => {
    try {
      const file = formData.courseContent;
      const added = await ipfs.add(file);
      setIpfsHash(added.path);
      return added.path;
    } catch (error) {
      console.error('Error uploading to IPFS:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload course content to IPFS
      const contentHash = await uploadToIPFS();

      // Create course on blockchain
      const tx = await eduChain.createCourse(
        formData.title,
        formData.description,
        ethers.parseEther(formData.price),
        contentHash
      );

      await tx.wait();
      alert('Course created successfully!');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        price: '',
        courseContent: null
      });
      setIpfsHash('');
    } catch (error) {
      console.error('Error creating course:', error);
      alert('Failed to create course. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b ${theme.background} ${theme.text.primary} py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Create New Course</h1>
          <p className={`${theme.text.secondary} max-w-2xl mx-auto`}>
            Share your knowledge with the world by creating a new course on EduChain.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className={`${theme.card} rounded-xl shadow-lg p-8 border ${theme.border}`}>
            <div className="space-y-6">
              <div>
                <label className={`block ${theme.text.secondary} mb-2 font-medium`}>Course Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text.primary} focus:ring-2 focus:ring-opacity-50 focus:ring-indigo-500 focus:border-indigo-500`}
                  placeholder="Enter course title"
                />
              </div>

              <div>
                <label className={`block ${theme.text.secondary} mb-2 font-medium`}>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text.primary} focus:ring-2 focus:ring-opacity-50 focus:ring-indigo-500 focus:border-indigo-500`}
                  placeholder="Describe your course"
                />
              </div>

              <div>
                <label className={`block ${theme.text.secondary} mb-2 font-medium`}>Price (ETH)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  step="0.01"
                  min="0"
                  className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text.primary} focus:ring-2 focus:ring-opacity-50 focus:ring-indigo-500 focus:border-indigo-500`}
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className={`block ${theme.text.secondary} mb-2 font-medium`}>Course Content</label>
                <div className={`border-2 border-dashed ${theme.border} rounded-lg p-8 text-center`}>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    required
                    className="hidden"
                    id="courseContent"
                  />
                  <label htmlFor="courseContent" className="cursor-pointer">
                    <FaCloudUploadAlt className={`text-4xl ${theme.text.accent} mx-auto mb-4`} />
                    <p className={theme.text.secondary}>
                      Drag and drop your course content here, or click to select
                    </p>
                  </label>
                </div>
              </div>

              {ipfsHash && (
                <div className={`text-sm ${theme.text.secondary} bg-opacity-50 rounded-lg p-4`}>
                  <p>IPFS Hash: {ipfsHash}</p>
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gradient-to-r ${theme.primary} text-white py-3 rounded-lg hover:shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Creating Course...
              </>
            ) : (
              'Create Course'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse; 