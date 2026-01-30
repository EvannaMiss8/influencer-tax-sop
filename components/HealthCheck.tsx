import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertTriangle, XCircle, RefreshCw, AlertOctagon } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../constants';
import { RiskResult } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface HealthCheckProps {
  onComplete: (result: any) => void;
  onRetake: () => void;
  onContact: () => void;
}

const HealthCheck: React.FC<HealthCheckProps> = ({ onContact, onRetake }) => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (val: number) => {
    const newAnswers = { ...answers, [QUIZ_QUESTIONS[currentQuestionIdx].id]: val };
    setAnswers(newAnswers);

    if (currentQuestionIdx < QUIZ_QUESTIONS.length - 1) {
      setTimeout(() => setCurrentQuestionIdx(currentQuestionIdx + 1), 300);
    } else {
      setShowResult(true);
    }
  };

  const calculateResult = (): RiskResult => {
    let totalScore = 0;
    Object.values(answers).forEach(v => totalScore += v);
    
    // Logic based on weighted answers
    const hasRedFlag = Object.values(answers).some(v => v === 2);
    
    if (hasRedFlag || totalScore >= 4) {
      return { score: totalScore, level: 'High', color: '#EF4444', recommendation: '严重风险：请立即联系税务顾问整改 (Urgent Action Required)' };
    } else if (totalScore >= 1) {
      return { score: totalScore, level: 'Medium', color: '#F59E0B', recommendation: '中等风险：需优化报税流程 (Process Optimization Needed)' };
    } else {
      return { score: totalScore, level: 'Low', color: '#10B981', recommendation: '合规状况良好 (Compliant)' };
    }
  };

  if (showResult) {
    const result = calculateResult();
    const data = [
      { name: 'Risk', value: result.score > 0 ? result.score : 0.5 }, // Minimal value for visual if 0
      { name: 'Safety', value: 8 - result.score },
    ];
    
    return (
      <div className="bg-white rounded-xl shadow-lg border-t-4 border-orange-500 p-8 animate-in zoom-in duration-300">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">检查结果 Risk Assessment</h2>
          <div className={`inline-flex items-center px-6 py-3 rounded-full mt-4 shadow-sm ${
            result.level === 'High' ? 'bg-red-50 text-red-700 border border-red-200' :
            result.level === 'Medium' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
            'bg-green-50 text-green-700 border border-green-200'
          }`}>
            {result.level === 'High' && <AlertOctagon className="mr-2" />}
            {result.level === 'Medium' && <AlertTriangle className="mr-2" />}
            {result.level === 'Low' && <CheckCircle2 className="mr-2" />}
            <span className="font-bold text-lg">{result.level === 'High' ? '高风险 (High Risk)' : result.level === 'Medium' ? '中等风险 (Medium Risk)' : '低风险 (Low Risk)'}</span>
          </div>
        </div>

        <div className="h-64 w-full mb-8 relative">
           <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                startAngle={180}
                endAngle={0}
              >
                <Cell fill={result.color} />
                <Cell fill="#e5e7eb" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
           <div className="absolute inset-0 flex items-center justify-center pt-16">
            <span className={`text-4xl font-bold ${
              result.level === 'High' ? 'text-red-600' : result.level === 'Medium' ? 'text-amber-500' : 'text-green-600'
            }`}>
              {result.level}
            </span>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <h3 className="font-bold text-gray-900 border-b border-gray-200 pb-2">风险分析 Analysis:</h3>
          {QUIZ_QUESTIONS.map(q => {
            const userAns = answers[q.id];
            if (userAns > 0) {
              return (
                <div key={q.id} className={`p-4 rounded-lg text-sm border-l-4 ${userAns === 2 ? 'bg-red-50 border-red-500' : 'bg-amber-50 border-amber-400'}`}>
                  <p className="font-semibold text-gray-800 mb-2">{q.question}</p>
                  <p className={`${userAns === 2 ? 'text-red-700' : 'text-amber-700'} flex items-start`}>
                    <AlertTriangle size={14} className="mr-2 mt-0.5 shrink-0" />
                    {q.advice}
                  </p>
                </div>
              );
            }
            return null;
          })}
          {result.score === 0 && <p className="text-green-700 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center"><CheckCircle2 className="mr-2"/> 恭喜！您似乎符合 LHDN 的合规要求。 (No significant risks found.)</p>}
        </div>

        <div className="flex flex-col gap-3">
          <button onClick={onContact} className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-4 px-4 rounded-xl shadow-lg transition-transform active:scale-95">
            获取专业整改方案 (Get Professional Advice)
          </button>
          <button onClick={() => {
            setAnswers({});
            setCurrentQuestionIdx(0);
            setShowResult(false);
            onRetake();
          }} className="w-full bg-white border-2 border-gray-200 text-gray-600 font-bold py-3 px-4 rounded-xl hover:bg-gray-50 hover:border-gray-300 flex items-center justify-center transition-colors">
            <RefreshCw size={18} className="mr-2"/> 重新测试 (Retake)
          </button>
        </div>
      </div>
    );
  }

  const question = QUIZ_QUESTIONS[currentQuestionIdx];

  return (
    <div className="max-w-xl mx-auto py-8">
      <div className="mb-6 flex justify-between items-center text-sm font-medium text-gray-500">
        <span>问题 {currentQuestionIdx + 1} / {QUIZ_QUESTIONS.length}</span>
        <span>{Math.round(((currentQuestionIdx) / QUIZ_QUESTIONS.length) * 100)}% 完成</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-3 mb-8 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-yellow-400 to-red-500 h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${((currentQuestionIdx) / QUIZ_QUESTIONS.length) * 100}%` }}
        />
      </div>

      <div className="bg-white rounded-xl shadow-lg border-b-4 border-orange-500 p-8 min-h-[400px] flex flex-col justify-between">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          <h2 className="text-xl font-bold text-gray-900 mb-3 leading-snug">{question.question}</h2>
          <p className="text-gray-500 italic mb-8 border-l-2 border-gray-300 pl-3">{question.subQuestion}</p>

          <div className="space-y-3">
            {question.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(opt.value)}
                className="w-full text-left p-5 rounded-lg border-2 border-gray-100 hover:border-orange-500 hover:bg-orange-50 transition-all flex justify-between items-center group shadow-sm hover:shadow-md"
              >
                <span className="font-medium text-gray-700 group-hover:text-orange-900">{opt.label}</span>
                <ArrowRight className="text-gray-300 group-hover:text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" size={20} />
              </button>
            ))}
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-gray-100 text-xs text-gray-400 text-center flex items-center justify-center">
           <AlertOctagon size={12} className="mr-1"/> 数据仅用于风险初步筛查
        </div>
      </div>
    </div>
  );
};

export default HealthCheck;