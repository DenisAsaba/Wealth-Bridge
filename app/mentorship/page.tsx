'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaStar, FaCalendarAlt, FaFilter, FaLinkedin, FaEnvelope } from 'react-icons/fa';

interface Mentor {
  id: number;
  name: string;
  title: string;
  expertise: string[];
  rating: number;
  sessions: number;
  availability: string;
  bio: string;
  image: string;
}

export default function MentorshipPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);

  const categories = ['all', 'Credit Building', 'Investing', 'Budgeting', 'Real Estate', 'Entrepreneurship'];

  const mentors: Mentor[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      title: 'Credit Score Specialist',
      expertise: ['Credit Building', 'Debt Management'],
      rating: 4.9,
      sessions: 150,
      availability: 'Mon-Fri, 9am-5pm',
      bio: 'Helped over 500 clients improve their credit scores by an average of 100 points.',
      image: '👩‍💼',
    },
    {
      id: 2,
      name: 'Michael Chen',
      title: 'Investment Strategist',
      expertise: ['Investing', 'Portfolio Management'],
      rating: 4.8,
      sessions: 200,
      availability: 'Tue-Sat, 10am-6pm',
      bio: '15 years of experience in wealth management and helping beginners start investing.',
      image: '👨‍💼',
    },
    {
      id: 3,
      name: 'Aisha Williams',
      title: 'Financial Planning Expert',
      expertise: ['Budgeting', 'Savings Strategy'],
      rating: 5.0,
      sessions: 180,
      availability: 'Mon-Wed, 1pm-8pm',
      bio: 'Passionate about helping families achieve financial stability through smart budgeting.',
      image: '👩‍🎓',
    },
    {
      id: 4,
      name: 'David Martinez',
      title: 'Real Estate Investor',
      expertise: ['Real Estate', 'Investing'],
      rating: 4.7,
      sessions: 95,
      availability: 'Thu-Sat, 2pm-7pm',
      bio: 'Built a portfolio of 20+ properties. Teaching others to invest in real estate.',
      image: '👨‍🏫',
    },
    {
      id: 5,
      name: 'Emily Thompson',
      title: 'Small Business Coach',
      expertise: ['Entrepreneurship', 'Business Finance'],
      rating: 4.9,
      sessions: 120,
      availability: 'Mon-Fri, 11am-4pm',
      bio: 'Helped 50+ entrepreneurs launch and scale their businesses successfully.',
      image: '👩‍💻',
    },
    {
      id: 6,
      name: 'James Robinson',
      title: 'Retirement Planning Advisor',
      expertise: ['Investing', 'Retirement Planning'],
      rating: 4.8,
      sessions: 140,
      availability: 'Tue-Thu, 9am-3pm',
      bio: 'Specializing in helping young professionals plan for a comfortable retirement.',
      image: '👨‍⚕️',
    },
  ];

  const filteredMentors = selectedCategory === 'all'
    ? mentors
    : mentors.filter((mentor) => mentor.expertise.includes(selectedCategory));

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
            Mentorship Hub
          </h1>
          <p className="text-xl text-darkwood">
            Connect with experienced financial mentors who understand your journey
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="frosted-glass rounded-xl p-6 shadow-lg mb-8"
        >
          <div className="flex items-center space-x-4 mb-4">
            <FaFilter className="text-2xl text-primary" />
            <h3 className="text-lg font-bold text-secondary">Filter by Expertise</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-white text-secondary hover:bg-amber hover:text-white'
                }`}
              >
                {category === 'all' ? 'All Mentors' : category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Mentors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMentors.map((mentor, index) => (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="frosted-glass rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all cursor-pointer"
              onClick={() => setSelectedMentor(mentor)}
            >
              {/* Mentor Avatar */}
              <div className="text-center mb-4">
                <div className="bg-gradient-to-br from-primary to-secondary w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-5xl">
                  {mentor.image}
                </div>
                <h3 className="text-xl font-bold text-secondary font-serif">
                  {mentor.name}
                </h3>
                <p className="text-sm text-darkwood">{mentor.title}</p>
              </div>

              {/* Rating & Sessions */}
              <div className="flex justify-center items-center space-x-6 mb-4">
                <div className="flex items-center space-x-1">
                  <FaStar className="text-amber" />
                  <span className="font-bold text-secondary">{mentor.rating}</span>
                </div>
                <div className="text-sm text-darkwood">
                  {mentor.sessions} sessions
                </div>
              </div>

              {/* Expertise Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {mentor.expertise.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-amber bg-opacity-20 text-primary text-xs font-medium rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Bio */}
              <p className="text-sm text-darkwood mb-4 line-clamp-2">
                {mentor.bio}
              </p>

              {/* Availability */}
              <div className="flex items-center space-x-2 text-sm text-secondary mb-4">
                <FaCalendarAlt className="text-primary" />
                <span>{mentor.availability}</span>
              </div>

              {/* CTA Button */}
              <button className="w-full bg-primary hover:bg-amber text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105">
                Schedule Session
              </button>
            </motion.div>
          ))}
        </div>

        {/* Mentor Detail Modal */}
        {selectedMentor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedMentor(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-br from-primary to-secondary w-20 h-20 rounded-full flex items-center justify-center text-4xl">
                    {selectedMentor.image}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-secondary font-serif">
                      {selectedMentor.name}
                    </h2>
                    <p className="text-lg text-darkwood">{selectedMentor.title}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMentor(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-amber bg-opacity-10 rounded-lg">
                  <FaStar className="text-3xl text-amber mx-auto mb-2" />
                  <div className="text-2xl font-bold text-secondary">{selectedMentor.rating}</div>
                  <div className="text-sm text-darkwood">Rating</div>
                </div>
                <div className="text-center p-4 bg-primary bg-opacity-10 rounded-lg">
                  <FaUsers className="text-3xl text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-secondary">{selectedMentor.sessions}</div>
                  <div className="text-sm text-darkwood">Sessions</div>
                </div>
                <div className="text-center p-4 bg-secondary bg-opacity-10 rounded-lg">
                  <FaCalendarAlt className="text-3xl text-secondary mx-auto mb-2" />
                  <div className="text-sm font-bold text-secondary mt-2">Available</div>
                  <div className="text-xs text-darkwood">{selectedMentor.availability}</div>
                </div>
              </div>

              {/* Expertise */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-secondary mb-3 font-serif">Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedMentor.expertise.map((skill, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-gradient-to-r from-primary to-amber text-white font-medium rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bio */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-secondary mb-3 font-serif">About</h3>
                <p className="text-darkwood leading-relaxed">{selectedMentor.bio}</p>
              </div>

              {/* Contact Options */}
              <div className="space-y-3">
                <button className="w-full bg-primary hover:bg-amber text-white font-bold py-4 px-6 rounded-lg transition-all flex items-center justify-center space-x-3">
                  <FaCalendarAlt />
                  <span>Schedule 1-on-1 Session</span>
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all flex items-center justify-center space-x-2">
                    <FaLinkedin />
                    <span>LinkedIn</span>
                  </button>
                  <button className="bg-secondary hover:bg-darkwood text-white font-medium py-3 px-4 rounded-lg transition-all flex items-center justify-center space-x-2">
                    <FaEnvelope />
                    <span>Email</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
