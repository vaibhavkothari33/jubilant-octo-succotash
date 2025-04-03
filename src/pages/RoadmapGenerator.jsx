import { useState,useEffect, useCallback, useRef } from 'react';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  Panel
} from 'reactflow';
import { motion } from 'framer-motion';
import { FaRobot, FaSpinner, FaDownload, FaShare, FaExpand } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { generateRoadmapWithGemini } from '../config/gemini';
import StepNode from '../components/nodes/StepNode';
import AnimatedEdge from '../components/edges/AnimatedEdge';
import ProgressIndicator from '../components/roadmap/ProgressIndicator';
import 'reactflow/dist/style.css';
import '../styles/roadmap.css';

const nodeTypes = {
  stepNode: StepNode,
};

const edgeTypes = {
  animated: AnimatedEdge,
};

const RoadmapGenerator = () => {
  const { theme } = useTheme();
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState(null);
  const [error, setError] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const flowRef = useRef(null);

  // Sample categories for quick selection
  const categories = [
    "Blockchain Development",
    "Smart Contract Security",
    "DeFi Protocols",
    "Web3 Frontend",
    "Solidity Programming",
    "Crypto Trading",
    "NFT Development",
    "DAO Governance"
  ];

  const sampleRoadmap = {
    title: "Sample Roadmap",
    description: "This is a sample roadmap while the API is being configured.",
    stages: [
      {
        title: "Getting Started",
        status: "required",
        steps: [
          {
            title: "Introduction",
            description: "Basic concepts and setup",
            duration: "1-2 hours",
            type: "concept",
            topics: ["Overview", "Setup"],
            resources: [
              {
                name: "Getting Started Guide",
                url: "https://example.com/guide",
                type: "concept"
              }
            ]
          }
        ]
      }
    ]
  };

  const createNodesAndEdges = (roadmap) => {
    const newNodes = [];
    const newEdges = [];
    const levelSpacing = 200;
    const nodeSpacing = 300;

    // Calculate total steps
    const totalStepsCount = roadmap.stages.reduce((total, stage) => total + stage.steps.length, 0);
    setTotalSteps(totalStepsCount);
    setCurrentStep(0);

    roadmap.stages.forEach((stage, stageIndex) => {
      const stageNodes = stage.steps.map((step, stepIndex) => ({
        id: `node-${stageIndex}-${stepIndex}`,
        type: 'stepNode',
        position: {
          x: stepIndex * nodeSpacing,
          y: stageIndex * levelSpacing,
        },
        data: {
          ...step,
          status: stage.status,
        },
      }));

      newNodes.push(...stageNodes);

      // Create edges between nodes in the same stage
      for (let i = 0; i < stageNodes.length - 1; i++) {
        newEdges.push({
          id: `edge-${stageIndex}-${i}`,
          source: stageNodes[i].id,
          target: stageNodes[i + 1].id,
          type: 'animated',
        });
      }

      // Create edges to next stage
      if (stageIndex < roadmap.stages.length - 1) {
        stageNodes.forEach((node) => {
          newEdges.push({
            id: `edge-${node.id}-next`,
            source: node.id,
            target: `node-${stageIndex + 1}-0`,
            type: 'animated',
          });
        });
      }
    });

    setNodes(newNodes);
    setEdges(newEdges);
  };

  const generateRoadmap = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!import.meta.env.VITE_GEMINI_API_KEY) {
        throw new Error('Gemini API key is not configured. Please check your environment variables.');
      }
      const generatedRoadmap = await generateRoadmapWithGemini(prompt);
      
      // Validate the roadmap structure
      if (!generatedRoadmap.title || !generatedRoadmap.stages || !Array.isArray(generatedRoadmap.stages)) {
        throw new Error('Invalid roadmap format received. Please try again.');
      }
      
      createNodesAndEdges(generatedRoadmap);
      setRoadmap(generatedRoadmap);
    } catch (error) {
      console.error('Error generating roadmap:', error);
      setError(error.message || 'Failed to generate roadmap. Please try again.');
      
      if (error.message.includes('JSON')) {
        setError('Failed to generate a valid roadmap format. Please try again with a different prompt.');
      } else if (error.message.includes('API key')) {
        setError('API key configuration error. Please contact the administrator.');
      }
    } finally {
      setLoading(false);
    }
  };

  const onDownloadImage = useCallback(() => {
    if (flowRef.current) {
      const dataUrl = flowRef.current.toImage();
      const link = document.createElement('a');
      link.download = 'roadmap.png';
      link.href = dataUrl;
      link.click();
    }
  }, []);

  const onNodeClick = useCallback((event, node) => {
    const nodeIndex = parseInt(node.id.split('-')[2]);
    const stageIndex = parseInt(node.id.split('-')[1]);
    const stepNumber = roadmap.stages.slice(0, stageIndex).reduce(
      (total, stage) => total + stage.steps.length,
      0
    ) + nodeIndex;
    setCurrentStep(stepNumber);
  }, [roadmap]);

  // Add a development mode warning if API key is missing
  useEffect(() => {
    if (import.meta.env.DEV && !import.meta.env.VITE_GEMINI_API_KEY) {
      console.warn('Gemini API key is not configured. Add VITE_GEMINI_API_KEY to your .env.local file');
    }
  }, []);

  return (
    <div className={`min-h-screen bg-gradient-to-b ${theme.background} ${theme.text.primary} py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Learning Roadmap Generator</h1>
          <p className={`${theme.text.secondary} max-w-2xl mx-auto`}>
            Describe what you want to learn, and we'll create a personalized learning roadmap using AI.
          </p>
        </div>

        {/* Input Section */}
        <div className={`${theme.card} rounded-xl shadow-lg p-6 mb-8`}>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">What would you like to learn?</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border ${theme.border} bg-transparent focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
              rows="4"
              placeholder="E.g., I want to learn blockchain development with a focus on DeFi protocols..."
            />
          </div>

          {/* Quick Categories */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Quick Categories:</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setPrompt(category)}
                  className={`px-4 py-2 rounded-full text-sm ${theme.text.secondary} border ${theme.border} hover:${theme.hover.background} transition-colors duration-200`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={generateRoadmap}
            disabled={!prompt || loading}
            className={`w-full bg-gradient-to-r ${theme.primary} text-white py-3 rounded-lg hover:shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Generating Roadmap...
              </>
            ) : (
              <>
                <FaRobot className="mr-2" />
                Generate Roadmap
              </>
            )}
          </button>
        </div>

        {error && (
          <div className={`${theme.card} rounded-xl shadow-lg p-4 mb-8 border border-red-500`}>
            <p className="text-red-500 flex items-center">
              <span className="mr-2">⚠️</span>
              {error}
            </p>
          </div>
        )}

        {/* Flow Canvas */}
        {nodes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative h-[800px] mt-8"
          >
            <ReactFlowProvider>
              <ReactFlow
                ref={flowRef}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodeClick={onNodeClick}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                fitView
                className={`${theme.card} rounded-xl shadow-xl`}
              >
                <Background
                  color={theme.darkMode ? '#374151' : '#E5E7EB'}
                  gap={32}
                  size={1}
                />
                <Controls
                  className={`${theme.card} border ${theme.border}`}
                />
                <Panel position="top-right" className="space-x-2">
                  <button
                    onClick={onDownloadImage}
                    className={`p-2 rounded-lg ${theme.text.accent} hover:${theme.hover.background}`}
                    title="Download as image"
                  >
                    <FaDownload />
                  </button>
                  <button
                    onClick={() => flowRef.current?.fitView()}
                    className={`p-2 rounded-lg ${theme.text.accent} hover:${theme.hover.background}`}
                    title="Fit view"
                  >
                    <FaExpand />
                  </button>
                </Panel>
              </ReactFlow>
            </ReactFlowProvider>
            
            {roadmap && (
              <ProgressIndicator
                currentStep={currentStep}
                totalSteps={totalSteps}
                stages={roadmap.stages}
              />
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RoadmapGenerator;
