import React, { createContext, useState, useEffect, useContext } from 'react';
import { QUESTIONS } from '../data/questions';
import { getDoshaRecommendations } from '../data/recommendations';
import { useAuth } from './AuthContext';

const DoshaContext = createContext();

export const DoshaProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { 1: 'A', 2: 'B', ... }
  const [activeResult, setActiveResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [recommendations, setRecommendations] = useState(null);

  // Load results whenever currentUser changes
  useEffect(() => {
    if (currentUser) {
      loadUserResults(currentUser.id);
    } else {
      setActiveResult(null);
      setHistory([]);
      setRecommendations(null);
    }
  }, [currentUser]);

  const loadUserResults = (userId) => {
    try {
      const allResults = JSON.parse(localStorage.getItem('ayurveda_results') || '[]');
      const userRes = allResults.filter(r => r.userId === userId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      setHistory(userRes);
      if (userRes.length > 0) {
        const latest = userRes[0];
        setActiveResult(latest);
        const recs = getDoshaRecommendations(latest.vataScore, latest.pittaScore, latest.kaphaScore);
        setRecommendations(recs);
      } else {
        setActiveResult(null);
        setRecommendations(null);
      }
    } catch (e) {
      console.error('Error loading dosha results:', e);
    }
  };

  const handleSelectAnswer = (questionId, optionKey) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: optionKey
    }));
  };

  const calculateAndSaveResult = () => {
    if (!currentUser) return null;

    let vataCount = 0;
    let pittaCount = 0;
    let kaphaCount = 0;

    QUESTIONS.forEach(q => {
      const ansKey = userAnswers[q.id];
      if (ansKey === 'A') vataCount++;
      else if (ansKey === 'B') pittaCount++;
      else if (ansKey === 'C') kaphaCount++;
    });

    const total = QUESTIONS.length; // 15
    const vataScore = Math.round((vataCount / total) * 100);
    const pittaScore = Math.round((pittaCount / total) * 100);
    const kaphaScore = Math.round((kaphaCount / total) * 100);

    const recs = getDoshaRecommendations(vataScore, pittaScore, kaphaScore);

    const newResult = {
      id: 'res_' + Date.now(),
      userId: currentUser.id,
      vataScore,
      pittaScore,
      kaphaScore,
      dominantDosha: recs.doshaType,
      answers: userAnswers,
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    const allResults = JSON.parse(localStorage.getItem('ayurveda_results') || '[]');
    allResults.push(newResult);
    localStorage.setItem('ayurveda_results', JSON.stringify(allResults));

    setActiveResult(newResult);
    setRecommendations(recs);
    setHistory(prev => [newResult, ...prev]);

    return newResult;
  };

  const retakeAssessment = () => {
    setUserAnswers({});
    setCurrentQuestionIndex(0);
  };

  return (
    <DoshaContext.Provider value={{
      questions: QUESTIONS,
      currentQuestionIndex,
      setCurrentQuestionIndex,
      userAnswers,
      handleSelectAnswer,
      calculateAndSaveResult,
      activeResult,
      recommendations,
      history,
      retakeAssessment
    }}>
      {children}
    </DoshaContext.Provider>
  );
};

export const useDosha = () => useContext(DoshaContext);
