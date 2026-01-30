import React, { useState } from 'react';
import { LayoutDashboard, Stethoscope, Contact, Menu, X, Calculator, Phone, Mail } from 'lucide-react';
import Dashboard from './components/Dashboard';
import HealthCheck from './components/HealthCheck';
import LeadForm from './components/LeadForm';
import { TabView } from './types';

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<TabView>('sop');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (currentTab) {
      case 'sop':
        return <Dashboard onStartQuiz={() => setCurrentTab('check')} onContact={() => setCurrentTab('contact')} />;
      case 'check':
        return <HealthCheck onContact={() => setCurrentTab('contact')} onRetake={() => {}} onComplete={() => {}} />;
      case 'contact':
        return <LeadForm />;
      default:
        return <Dashboard onStartQuiz={() => setCurrentTab('check')} onContact={() => setCurrentTab('contact')} />;
    }
  };

  const NavItem = ({ tab, label, subLabel, icon: Icon }: { tab: TabView; label: string; subLabel: string; icon: any }) => (
    <button
      onClick={() => {
        setCurrentTab(tab);
        setIsMobileMenuOpen(false);
      }}
      className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors w-full md:w-auto ${
        currentTab === tab 
          ? 'bg-yellow-100 text-red-700 font-bold border-b-4 border-red-600' 
          : 'text-gray-600 hover:bg-yellow-50 hover:text-orange-700'
      }`}
    >
      <Icon size={20} className={currentTab === tab ? "text-red-600" : "text-gray-400"} />
      <div className="text-left">
        <div className="leading-none">{label}</div>
        <div className="text-[10px] uppercase tracking-wider opacity-70 mt-1 font-semibold">{subLabel}</div>
      </div>
    </button>
  );

  return (
    <div className="min-h-screen bg-orange-50/30 flex flex-col font-sans">
      {/* Header with Yellow-Orange-Red Theme */}
      <header className="bg-white shadow-md sticky top-0 z-50 border-t-4 border-yellow-400">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Area */}
            <div className="flex items-center">
              <div className="bg-red-600 p-2 rounded mr-3 shadow-md transform -rotate-2">
                 <Calculator className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">Influencer Tax Health Check SOP</h1>
                <p className="text-xs text-red-600 font-bold tracking-wide">网红税务 Influencer Tax</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-2">
              <NavItem tab="sop" label="SOP 指南" subLabel="Guide" icon={LayoutDashboard} />
              <NavItem tab="check" label="健康检查" subLabel="Health Check" icon={Stethoscope} />
              <NavItem tab="contact" label="咨询专家" subLabel="Contact" icon={Contact} />
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-gray-500 rounded-lg hover:bg-yellow-100 hover:text-red-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg px-4 pt-2 pb-4 space-y-2 absolute w-full z-50">
            <NavItem tab="sop" label="SOP 指南" subLabel="Guide" icon={LayoutDashboard} />
            <NavItem tab="check" label="健康检查" subLabel="Health Check" icon={Stethoscope} />
            <NavItem tab="contact" label="咨询专家" subLabel="Contact" icon={Contact} />
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          
          {/* Learnabee Logo / Developer Badge */}
          <div className="mb-10 flex flex-col items-center">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">AI Tool Developer</span>
            <img 
              src="https://uploads.teachablecdn.com/attachments/eacc456fe24048b6aa8fac8a9cdd1269.jpg" 
              alt="Learnabee Logo" 
              className="h-16 w-auto object-contain mix-blend-multiply opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>

          <h3 className="text-gray-900 font-bold uppercase mb-3 tracking-wide text-sm">Disclaimer</h3>
          <p className="text-gray-600 text-sm mb-6 leading-relaxed max-w-2xl mx-auto">
            This AI-enhanced tool is for information and educational purposes only and is not intended as legal, tax, or professional advice. Users should consult with qualified tax professionals or legal advisors for specific cases.
          </p>
          <p className="text-gray-400 text-xs italic mb-8">
            All rights reserved Learnabee International Sdn Bhd 2026. Written permission is required for commercial purposes.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <div className="bg-slate-100 text-slate-900 font-bold py-3 px-6 rounded-lg border border-slate-200">
              Contact Learnabee
            </div>
            <a 
              href="https://wa.me/60102638046"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-700 bg-white border border-gray-300 py-3 px-6 rounded-full hover:bg-green-50 hover:border-green-200 hover:text-green-700 transition-all shadow-sm font-medium group"
            >
              <Phone size={18} className="mr-2 text-green-600 group-hover:scale-110 transition-transform" />
              +6010 263 8046
            </a>
             <a href="mailto:evanna@learnabee.com" className="flex items-center text-gray-700 bg-white border border-gray-300 py-3 px-6 rounded-full hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-all shadow-sm font-medium group">
              <Mail size={18} className="mr-2 text-blue-600 group-hover:scale-110 transition-transform" />
              evanna@learnabee.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;