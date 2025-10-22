'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCreditCard, FaArrowUp, FaArrowDown, FaCheckCircle, FaExclamationTriangle, FaLightbulb } from 'react-icons/fa';

export default function CreditBuilderPage() {
  const [creditScore, setCreditScore] = useState(680);
  const previousScore = 650;
  const scoreChange = creditScore - previousScore;

  const creditFactors = [
    { name: 'Payment History', percentage: 85, status: 'good', impact: 35 },
    { name: 'Credit Utilization', percentage: 45, status: 'excellent', impact: 30 },
    { name: 'Credit Age', percentage: 60, status: 'fair', impact: 15 },
    { name: 'Credit Mix', percentage: 70, status: 'good', impact: 10 },
    { name: 'New Credit', percentage: 80, status: 'good', impact: 10 },
  ];

  const tasks = [
    { id: 1, title: 'Pay off credit card balance', completed: true, points: 50 },
    { id: 2, title: 'Dispute error on credit report', completed: false, points: 75 },
    { id: 3, title: 'Set up autopay for loans', completed: false, points: 30 },
    { id: 4, title: 'Reduce credit utilization below 30%', completed: false, points: 100 },
  ];

  const tips = [
    {
      title: 'Keep Credit Utilization Low',
      description: 'Try to use less than 30% of your available credit to boost your score.',
      icon: FaLightbulb,
    },
    {
      title: 'Pay Bills On Time',
      description: 'Payment history is the most important factor affecting your credit score.',
      icon: FaCheckCircle,
    },
    {
      title: 'Monitor Your Credit Report',
      description: 'Check your credit report regularly for errors and dispute them promptly.',
      icon: FaExclamationTriangle,
    },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 750) return 'text-green-500';
    if (score >= 670) return 'text-amber';
    return 'text-red-500';
  };

  const getStatusColor = (status: string) => {
    if (status === 'excellent') return 'bg-green-500';
    if (status === 'good') return 'bg-amber';
    return 'bg-yellow-500';
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-secondary mb-4 font-serif">
            Credit Builder Dashboard
          </h1>
          <p className="text-xl text-darkwood">
            Track your credit journey and build a stronger financial future
          </p>
        </motion.div>

        {/* Credit Score Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="frosted-glass rounded-2xl p-8 shadow-2xl mb-8 bg-gradient-to-br from-primary to-secondary"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-white mb-6 md:mb-0">
              <div className="flex items-center space-x-3 mb-4">
                <FaCreditCard className="text-5xl text-accent" />
                <div>
                  <h2 className="text-2xl font-bold font-serif">Your Credit Score</h2>
                  <p className="text-accent">Updated today</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                className={`text-7xl font-bold ${getScoreColor(creditScore)} mb-2`}
              >
                {creditScore}
              </motion.div>
              <div className={`flex items-center justify-center space-x-2 text-lg ${scoreChange >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                {scoreChange >= 0 ? <FaArrowUp /> : <FaArrowDown />}
                <span>{Math.abs(scoreChange)} points this month</span>
              </div>
              <div className="mt-4 text-accent text-sm">
                Range: 300 - 850
              </div>
            </div>

            <div className="mt-6 md:mt-0">
              <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-accent text-sm mb-2">Credit Rating</div>
                <div className="text-white text-2xl font-bold">
                  {creditScore >= 750 ? 'Excellent' : creditScore >= 670 ? 'Good' : 'Fair'}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Credit Factors */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="frosted-glass rounded-2xl p-8 shadow-xl"
          >
            <h3 className="text-2xl font-bold text-secondary mb-6 font-serif">
              Credit Factors
            </h3>
            <div className="space-y-6">
              {creditFactors.map((factor, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-secondary">{factor.name}</span>
                    <span className="text-primary">{factor.percentage}%</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${factor.percentage}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className={`${getStatusColor(factor.status)} h-3 rounded-full`}
                      />
                    </div>
                    <span className={`text-sm capitalize px-3 py-1 rounded-full ${
                      factor.status === 'excellent' ? 'bg-green-100 text-green-700' :
                      factor.status === 'good' ? 'bg-amber bg-opacity-20 text-primary' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {factor.status}
                    </span>
                  </div>
                  <div className="text-xs text-darkwood mt-1">
                    Impact: {factor.impact}% of score
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Personalized Tasks */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="frosted-glass rounded-2xl p-8 shadow-xl"
          >
            <h3 className="text-2xl font-bold text-secondary mb-6 font-serif">
              Your Action Plan
            </h3>
            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    task.completed
                      ? 'bg-green-50 border-green-300'
                      : 'bg-white border-amber hover:border-primary cursor-pointer'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      {task.completed ? (
                        <FaCheckCircle className="text-green-500 text-xl mt-1" />
                      ) : (
                        <div className="w-5 h-5 border-2 border-primary rounded-full mt-1" />
                      )}
                      <div>
                        <p className={`font-medium ${task.completed ? 'text-green-700 line-through' : 'text-secondary'}`}>
                          {task.title}
                        </p>
                        <p className="text-sm text-primary mt-1">+{task.points} points</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-primary to-amber rounded-lg text-white text-center">
              <div className="text-3xl font-bold mb-1">
                {tasks.filter(t => t.completed).length} / {tasks.length}
              </div>
              <div className="text-sm">Tasks Completed</div>
            </div>
          </motion.div>
        </div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="frosted-glass rounded-2xl p-8 shadow-xl"
        >
          <h3 className="text-2xl font-bold text-secondary mb-6 font-serif">
            Expert Tips
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {tips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
                  <Icon className="text-4xl text-primary mb-4" />
                  <h4 className="text-lg font-bold text-secondary mb-2">{tip.title}</h4>
                  <p className="text-darkwood text-sm">{tip.description}</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
