export type TabView = 'sop' | 'check' | 'contact';

export interface SOPStep {
  id: string;
  title: string;
  subTitle: string;
  icon: React.ElementType;
  content: React.ReactNode;
  riskPoints?: string[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  subQuestion: string;
  options: {
    label: string;
    value: number; // Risk score: 0 = Safe, 1 = Warning, 2 = Danger
    riskLevel: 'green' | 'yellow' | 'red';
  }[];
  advice: string;
}

export interface RiskResult {
  score: number;
  level: 'Low' | 'Medium' | 'High';
  color: string;
  recommendation: string;
}