import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowRight, AlertOctagon } from 'lucide-react';
import { SOP_STEPS } from '../constants';

interface DashboardProps {
  onStartQuiz: () => void;
  onContact: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onStartQuiz, onContact }) => {
  const [openStep, setOpenStep] = useState<string | null>('identity');

  const toggleStep = (id: string) => {
    setOpenStep(openStep === id ? null : id);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">网红税务合规 SOP 概览</h2>
            <p className="text-orange-100 text-sm">Influencer Tax Compliance Standard Operating Procedure</p>
          </div>
          <AlertOctagon className="text-orange-200 w-12 h-12 opacity-80" />
        </div>
        <p className="mt-4 text-white/90 leading-relaxed text-sm bg-white/10 p-3 rounded-lg border border-white/20">
          <strong>LHDN 官方通告:</strong> 网红收入 (Youtube, TikTok, etc.) 属于应税收入。
          忽视报税可能导致最高 100% 的罚款及禁止出境。
        </p>
      </div>

      <div className="space-y-4">
        {SOP_STEPS.map((step) => {
          const isOpen = openStep === step.id;
          const Icon = step.icon;
          return (
            <div 
              key={step.id} 
              className={`bg-white rounded-xl shadow-sm border transition-all duration-200 overflow-hidden ${
                isOpen ? 'border-orange-400 ring-2 ring-orange-100' : 'border-gray-200 hover:border-orange-300'
              }`}
            >
              <button
                onClick={() => toggleStep(step.id)}
                className="w-full flex items-center justify-between p-5 text-left focus:outline-none bg-white hover:bg-orange-50/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${isOpen ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-500'}`}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className={`font-bold text-lg ${isOpen ? 'text-orange-900' : 'text-gray-800'}`}>{step.title}</h3>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">{step.subTitle}</p>
                  </div>
                </div>
                {isOpen ? <ChevronUp className="text-orange-500" /> : <ChevronDown className="text-gray-400" />}
              </button>
              
              {isOpen && (
                <div className="px-5 pb-6 pt-2 bg-white">
                  <div className="h-px bg-orange-100 w-full mb-4" />
                  {step.content}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-gray-900 rounded-xl p-8 text-center shadow-xl border-b-4 border-orange-500">
        <h3 className="text-xl font-bold text-white mb-2">您的税务健康状况如何？</h3>
        <p className="text-gray-400 mb-6 text-sm">通过我们的“红绿灯”测试，3分钟内发现潜在税务风险。</p>
        <button 
          onClick={onStartQuiz}
          className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-orange-500/20 transition-all flex items-center justify-center mx-auto transform hover:scale-105"
        >
          开始健康检查 (Start Risk Check) <ArrowRight className="ml-2" size={18} />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;