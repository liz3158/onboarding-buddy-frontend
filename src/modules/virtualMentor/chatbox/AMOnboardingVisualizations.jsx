import React, { useState } from 'react';
import {
  BsBarChart,
  BsPieChart,
  BsGraphUp,
  BsClock,
  BsPeople,
  BsCodeSlash,
  BsBook,
  BsExclamationTriangle,
  BsSpeedometer2,
  BsClipboardCheck,
  BsLightbulb,
  BsExclamationCircle,
  BsArrowRight
} from 'react-icons/bs';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
  Area
} from 'recharts';
import ChartVisualization from './AMChartVisualization';
import './AMOnboardingVisualizations.css';

// Mock data for visualizations
const progressData = [
  { phase: 'Orientation', progress: 100 },
  { phase: 'Training', progress: 75 },
  { phase: 'Integration', progress: 45 },
  { phase: 'Contribution', progress: 20 }
];

const skillAcquisition = [
  { skill: 'Git', progress: 90 },
  { skill: 'React', progress: 75 },
  { skill: 'Node.js', progress: 60 },
  { skill: 'TypeScript', progress: 85 },
  { skill: 'Testing', progress: 70 }
];

const timeSpent = [
  { activity: 'Code Reviews', hours: 15 },
  { activity: 'Documentation', hours: 8 },
  { activity: 'Pair Programming', hours: 12 },
  { activity: 'Learning', hours: 20 },
  { activity: 'Team Meetings', hours: 10 }
];

const teamInteractions = [
  { team: 'Frontend', interactions: 25 },
  { team: 'Backend', interactions: 18 },
  { team: 'DevOps', interactions: 12 },
  { team: 'Design', interactions: 8 },
  { team: 'Product', interactions: 15 }
];

const codeContributions = [
  { week: 'Week 1', commits: 5, pullRequests: 2 },
  { week: 'Week 2', commits: 12, pullRequests: 4 },
  { week: 'Week 3', commits: 8, pullRequests: 3 },
  { week: 'Week 4', commits: 15, pullRequests: 6 },
  { week: 'Week 5', commits: 20, pullRequests: 8 }
];

const resourceUsage = [
  { resource: 'Documentation', usage: 35 },
  { resource: 'Code Examples', usage: 25 },
  { resource: 'Tutorials', usage: 20 },
  { resource: 'Team Support', usage: 15 },
  { resource: 'External Resources', usage: 5 }
];

const challenges = [
  { challenge: 'Codebase Understanding', difficulty: 4 },
  { challenge: 'Tool Setup', difficulty: 2 },
  { challenge: 'Team Communication', difficulty: 3 },
  { challenge: 'Process Adherence', difficulty: 3 },
  { challenge: 'Technical Skills', difficulty: 4 }
];

const performanceMetrics = [
  { metric: 'Code Quality', score: 85 },
  { metric: 'Productivity', score: 75 },
  { metric: 'Collaboration', score: 90 },
  { metric: 'Learning Speed', score: 80 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

// New mock data for summarization
const summarizationData = {
  taskCompletions: [
    { category: 'Setup', completed: 8, total: 10 },
    { category: 'Training', completed: 12, total: 15 },
    { category: 'Documentation', completed: 5, total: 7 },
    { category: 'Code Reviews', completed: 3, total: 5 },
    { category: 'Team Integration', completed: 4, total: 6 }
  ],
  learningProgress: [
    { week: 'Week 1', technical: 60, process: 40, team: 30 },
    { week: 'Week 2', technical: 75, process: 60, team: 50 },
    { week: 'Week 3', technical: 85, process: 75, team: 70 },
    { week: 'Week 4', technical: 90, process: 85, team: 80 },
    { week: 'Week 5', technical: 95, process: 90, team: 85 }
  ],
  blockers: [
    { blocker: 'Environment Setup', impact: 3, status: 'Resolved' },
    { blocker: 'Access Permissions', impact: 2, status: 'In Progress' },
    { blocker: 'Documentation Gaps', impact: 4, status: 'Pending' },
    { blocker: 'Team Availability', impact: 3, status: 'Resolved' },
    { blocker: 'Technical Dependencies', impact: 5, status: 'In Progress' }
  ],
  nextSteps: [
    { step: 'Complete Advanced Training', priority: 'High', timeline: 'This Week' },
    { step: 'Submit First PR', priority: 'High', timeline: 'Today' },
    { step: 'Team Knowledge Share', priority: 'Medium', timeline: 'Next Week' },
    { step: 'Documentation Review', priority: 'Medium', timeline: 'This Week' },
    { step: 'Code Review Practice', priority: 'Low', timeline: 'Next Week' }
  ]
};

const AMOnboardingVisualizations = () => {
  const [activeTab, setActiveTab] = useState('progress');

  const tabs = [
    { id: 'progress', label: 'Progress', icon: <BsBarChart /> },
    { id: 'skills', label: 'Skills', icon: <BsCodeSlash /> },
    { id: 'time', label: 'Time', icon: <BsClock /> },
    { id: 'team', label: 'Team', icon: <BsPeople /> },
    { id: 'code', label: 'Code', icon: <BsGraphUp /> },
    { id: 'resources', label: 'Resources', icon: <BsBook /> },
    { id: 'challenges', label: 'Challenges', icon: <BsExclamationTriangle /> },
    { id: 'performance', label: 'Performance', icon: <BsSpeedometer2 /> },
    { id: 'summary', label: 'Summary', icon: <BsClipboardCheck /> }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'progress':
        return (
          <ChartVisualization
            type="bar"
            data={{
              labels: ['Orientation', 'Training', 'Integration', 'Contribution'],
              datasets: [{
                label: 'Onboarding Progress',
                data: progressData.map(data => data.progress),
                backgroundColor: COLORS,
                borderColor: COLORS,
                borderWidth: 1
              }]
            }}
          />
        );
      case 'skills':
        return (
          <ChartVisualization
            type="bar"
            data={{
              labels: skillAcquisition.map(data => data.skill),
              datasets: [{
                label: 'Skill Acquisition',
                data: skillAcquisition.map(data => data.progress),
                backgroundColor: COLORS,
                borderColor: COLORS,
                borderWidth: 1
              }]
            }}
          />
        );
      case 'time':
        return (
          <ChartVisualization
            type="pie"
            data={{
              labels: timeSpent.map(data => data.activity),
              datasets: [{
                data: timeSpent.map(data => data.hours),
                backgroundColor: COLORS,
                borderColor: COLORS,
                borderWidth: 1
              }]
            }}
          />
        );
      case 'team':
        return (
          <ChartVisualization
            type="bar"
            data={{
              labels: teamInteractions.map(data => data.team),
              datasets: [{
                label: 'Team Interactions',
                data: teamInteractions.map(data => data.interactions),
                backgroundColor: COLORS,
                borderColor: COLORS,
                borderWidth: 1
              }]
            }}
          />
        );
      case 'code':
        return (
          <ChartVisualization
            type="line"
            data={{
              labels: codeContributions.map(data => data.week),
              datasets: [{
                label: 'Code Contributions',
                data: [codeContributions[0].commits, codeContributions[1].commits, codeContributions[2].commits, codeContributions[3].commits, codeContributions[4].commits],
                fill: false,
                borderColor: '#8884d8',
                tension: 0.1
              }, {
                label: 'Pull Requests',
                data: [codeContributions[0].pullRequests, codeContributions[1].pullRequests, codeContributions[2].pullRequests, codeContributions[3].pullRequests, codeContributions[4].pullRequests],
                fill: false,
                borderColor: '#82ca9d',
                tension: 0.1
              }]
            }}
          />
        );
      case 'resources':
        return (
          <ChartVisualization
            type="pie"
            data={{
              labels: resourceUsage.map(data => data.resource),
              datasets: [{
                data: resourceUsage.map(data => data.usage),
                backgroundColor: COLORS,
                borderColor: COLORS,
                borderWidth: 1
              }]
            }}
          />
        );
      case 'challenges':
        return (
          <ChartVisualization
            type="bar"
            data={{
              labels: challenges.map(data => data.challenge),
              datasets: [{
                label: 'Onboarding Challenges',
                data: challenges.map(data => data.difficulty),
                backgroundColor: '#ff7300',
                borderColor: '#ff7300',
                borderWidth: 1
              }]
            }}
          />
        );
      case 'performance':
        return (
          <ChartVisualization
            type="radar"
            data={{
              labels: performanceMetrics.map(data => data.metric),
              datasets: [{
                label: 'Performance Metrics',
                data: performanceMetrics.map(data => data.score),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
              }]
            }}
          />
        );
      case 'summary':
        return (
          <div className="visualization-container summarization-dashboard">
            <div className="dashboard-grid">
              {/* Task Completions */}
              <div className="dashboard-item">
                <h3>
                  <BsClipboardCheck className="dashboard-icon" />
                  Task Completions
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <ComposedChart data={summarizationData.taskCompletions}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="completed" fill="#82ca9d" name="Completed" />
                    <Bar dataKey="total" fill="#8884d8" name="Total" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              {/* Learning Progress */}
              <div className="dashboard-item">
                <h3>
                  <BsLightbulb className="dashboard-icon" />
                  Learning Progress
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={summarizationData.learningProgress}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="technical" stroke="#8884d8" name="Technical" />
                    <Line type="monotone" dataKey="process" stroke="#82ca9d" name="Process" />
                    <Line type="monotone" dataKey="team" stroke="#ffc658" name="Team" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Blockers */}
              <div className="dashboard-item">
                <h3>
                  <BsExclamationCircle className="dashboard-icon" />
                  Blockers
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={summarizationData.blockers}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="blocker" />
                    <YAxis domain={[0, 5]} />
                    <Tooltip />
                    <Legend />
                    <Bar 
                      dataKey="impact" 
                      fill={(entry) => {
                        switch(entry.status) {
                          case 'Resolved': return '#82ca9d';
                          case 'In Progress': return '#ffc658';
                          default: return '#ff7300';
                        }
                      }}
                      name="Impact Level"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Next Steps */}
              <div className="dashboard-item">
                <h3>
                  <BsArrowRight className="dashboard-icon" />
                  Next Steps
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <ComposedChart data={summarizationData.nextSteps}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="step" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar 
                      dataKey="priority" 
                      fill={(entry) => {
                        switch(entry.priority) {
                          case 'High': return '#ff7300';
                          case 'Medium': return '#ffc658';
                          default: return '#82ca9d';
                        }
                      }}
                      name="Priority"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="onboarding-visualizations">
      <div className="visualization-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
      <div className="visualization-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default AMOnboardingVisualizations; 