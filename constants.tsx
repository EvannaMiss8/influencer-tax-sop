import React from 'react';
import { User, DollarSign, Globe, FileText, AlertTriangle, ShieldCheck, Plane } from 'lucide-react';
import { SOPStep, QuizQuestion } from './types';

export const SOP_STEPS: SOPStep[] = [
  {
    id: 'identity',
    title: '1. 职业性质与类别',
    subTitle: 'Profession Classification',
    icon: User,
    content: (
      <div className="space-y-4 text-gray-700">
        <p>
          根据 LHDN 指南，网红活动被视为<strong>职业 (Profession)</strong>，收入属于 ITA Section 4(a) 商业收入。
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-orange-200 p-4 rounded-lg bg-orange-50">
            <h4 className="font-bold text-orange-900">个人网红 (Individual)</h4>
            <p className="text-sm mt-1">包括 Youtuber、Tiktoker、模特、博主。</p>
            <ul className="text-xs text-gray-600 mt-2 list-disc pl-4">
              <li>须填写 Form B (有商业收入)</li>
              <li>非 Form BE (纯打工族)</li>
            </ul>
          </div>
          <div className="border border-red-200 p-4 rounded-lg bg-red-50">
            <h4 className="font-bold text-red-900">虚拟/对象网红 (Object-based)</h4>
            <p className="text-sm mt-1">例如: Upin & Ipin, 虚拟角色。</p>
            <p className="text-xs text-gray-600 mt-2">收入归属于版权持有者/公司。</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'income',
    title: '2. 实物与非现金收入',
    subTitle: 'Benefits-in-Kind & Barter',
    icon: DollarSign,
    content: (
      <div className="space-y-3 text-gray-700">
        <div className="bg-amber-50 border-l-4 border-amber-500 p-3 text-sm">
          <strong>LHDN 重点打击对象:</strong> 很多网红误以为“没收到钱”就不用报税。
        </div>
        <p className="text-sm font-semibold">必须申报的市场价值 (Market Value):</p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
          <li>
            <span className="text-red-600 font-bold">产品/礼物:</span> 商家赠送的手袋、化妆品、电子产品 (若用于推广)。
          </li>
          <li>
            <span className="text-red-600 font-bold">服务交换:</span> 免费获得的医美疗程、酒店住宿、旅游配套 (Sponsored Travel)。
          </li>
          <li>
            <span className="text-red-600 font-bold">虚拟礼物:</span> TikTok Coins, Stars, Emojis (需转换为法币价值)。
          </li>
        </ul>
      </div>
    )
  },
  {
    id: 'wht',
    title: '3. 预扣税 (Withholding Tax)',
    subTitle: 'Public Ruling 6/2017 Risk',
    icon: Globe,
    content: (
      <div className="space-y-3 text-gray-700">
        <p className="text-sm">
          若您邀请<strong>非马来西亚居民 (Non-Resident)</strong> 网红/嘉宾参与视频拍摄或直播：
        </p>
        <div className="border border-red-200 bg-red-50 rounded p-3">
          <h4 className="font-bold text-red-800 text-sm">您有责任扣除 15% 税款</h4>
          <p className="text-xs mt-1 text-red-700">
            根据 Section 109A ITA，任何给非居民“公共演艺人员 (Public Entertainer)”的报酬，支付方必须代扣 15% 并上缴 LHDN。
          </p>
        </div>
        <p className="text-xs text-gray-500 italic">
          案例：邀请新加坡 Youtuber 来吉隆坡合拍视频并支付出场费/承担其旅费，这笔费用需扣税。
        </p>
      </div>
    )
  },
  {
    id: 'expenses',
    title: '4. 私人 vs 商业开销',
    subTitle: 'Deductible Expenses',
    icon: FileText,
    content: (
      <div className="space-y-3 text-gray-700">
        <p className="text-sm">仅有 "Wholly and Exclusively" (Section 33) 用于产生收入的费用可扣除。</p>
        <div className="grid grid-cols-1 gap-2 text-sm">
          <div className="flex items-start">
            <ShieldCheck size={16} className="text-green-600 mr-2 mt-1 min-w-[16px]"/> 
            <span><strong>可扣除:</strong> 视频剪辑软件费、拍摄场地租金、给助理的薪水、推广用样品成本。</span>
          </div>
          <div className="flex items-start">
            <AlertTriangle size={16} className="text-red-600 mr-2 mt-1 min-w-[16px]"/> 
            <span><strong>不可扣除 (Section 39):</strong> 用于打造个人形象的置装费 (除非是特定戏服)、美容整形费、家庭度假顺便拍摄的非商务部分。</span>
          </div>
        </div>
      </div>
    )
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "您收到了品牌方赠送的 RM5,000 手表作为推广报酬，您如何处理？",
    subQuestion: "Received a RM5k watch as sponsorship payment. How do you treat it?",
    options: [
      { label: "不申报，因为没有收到现金 (No cash received)", value: 2, riskLevel: 'red' },
      { label: "作为收入申报 RM5,000 (Declare RM5k as income)", value: 0, riskLevel: 'green' },
      { label: "仅申报一半价值 (Declare 50%)", value: 2, riskLevel: 'red' },
    ],
    advice: "高风险：根据指南 Paragraph 3.3.2，非现金收益 (Non-cash benefit) 必须按市场价值申报为商业收入。"
  },
  {
    id: 2,
    question: "您邀请了一位外国网红来马合作拍摄，并支付了 RM2,000 酬劳。",
    subQuestion: "Paid RM2k to a foreign influencer for a collab video in Malaysia.",
    options: [
      { label: "直接支付 RM2,000 (Paid full amount)", value: 2, riskLevel: 'red' },
      { label: "扣除 15% 预扣税并上缴 LHDN (Withhold 15% WHT)", value: 0, riskLevel: 'green' },
    ],
    advice: "合规警告：根据 Public Ruling 6/2017，支付给在马演出的非居民演艺人员 (Public Entertainer) 需扣除 15% Withholding Tax，否则该支出不可扣税且会被罚款。"
  },
  {
    id: 3,
    question: "您购买了日常穿着的时尚衣物，并在 Instagram 上发布了照片。",
    subQuestion: "Bought fashion clothes for daily wear and posted on IG.",
    options: [
      { label: "放入公司账目扣税 (Claim as business expense)", value: 1, riskLevel: 'yellow' },
      { label: "视为私人开销 (Personal expense)", value: 0, riskLevel: 'green' },
    ],
    advice: "黄灯风险：LHDN 严格审查置装费。除非是“特定戏服”或具有明显商业用途且无法日常穿著的，否则属于 Section 39 私人开销。"
  },
  {
    id: 4,
    question: "您从 Google Adsense (Singapore) 收到了 YouTube 广告收入。",
    subQuestion: "Received YouTube income from Singapore entity.",
    options: [
      { label: "这是海外收入，在马免税 (Exempt Foreign Income)", value: 2, riskLevel: 'red' },
      { label: "这是源自马来西亚的收入，需报税 (Derivation Rule)", value: 0, riskLevel: 'green' },
    ],
    advice: "核心误区：根据 Derivation Rule，只要内容创作活动在马来西亚进行，即使付款方在新加坡，该收入也被视为“源自马来西亚 (Derived from Malaysia)”，必须纳税。"
  },
];