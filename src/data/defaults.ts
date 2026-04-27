import { ColorTheme, ResumeData, ResumeSettings } from '../types/resume';

export const COLOR_THEMES: ColorTheme[] = [
  {
    id: 'blue',
    name: '经典蓝',
    primary: '#2563eb',
    secondary: '#1e40af',
    accent: '#dbeafe',
    text: '#1e293b',
    background: '#ffffff',
  },
  {
    id: 'teal',
    name: '青碧绿',
    primary: '#0d9488',
    secondary: '#0f766e',
    accent: '#ccfbf1',
    text: '#134e4a',
    background: '#ffffff',
  },
  {
    id: 'purple',
    name: '典雅紫',
    primary: '#7c3aed',
    secondary: '#6d28d9',
    accent: '#ede9fe',
    text: '#1e1b4b',
    background: '#ffffff',
  },
  {
    id: 'slate',
    name: '商务灰',
    primary: '#475569',
    secondary: '#334155',
    accent: '#e2e8f0',
    text: '#0f172a',
    background: '#ffffff',
  },
  {
    id: 'rose',
    name: '玫瑰红',
    primary: '#e11d48',
    secondary: '#be123c',
    accent: '#ffe4e6',
    text: '#1f0a0f',
    background: '#ffffff',
  },
  {
    id: 'amber',
    name: '琥珀金',
    primary: '#d97706',
    secondary: '#b45309',
    accent: '#fef3c7',
    text: '#1c1917',
    background: '#ffffff',
  },
];

export const DEFAULT_RESUME_DATA: ResumeData = {
  personal: {
    name: '张伟',
    title: '高级前端工程师',
    email: 'zhangwei@example.com',
    phone: '138-0000-0000',
    location: '北京市朝阳区',
    website: 'https://zhangwei.dev',
    linkedin: 'linkedin.com/in/zhangwei',
    github: 'github.com/zhangwei',
    summary:
      '拥有 6 年前端开发经验，专注于构建高性能、用户体验优秀的 Web 应用。熟练掌握 React、Vue 生态，具备完整的工程化能力，善于团队协作与技术分享。',
    avatar: '',
  },
  workExperience: [
    {
      id: 'w1',
      company: '字节跳动',
      position: '高级前端工程师',
      startDate: '2021-03',
      endDate: '',
      current: true,
      description: '负责抖音 Web 端核心功能开发，参与架构设计与技术选型。',
      achievements: [
        '主导重构了直播间渲染架构，性能提升 40%，日活用户体验显著改善',
        '设计并实现低代码平台核心模块，支持 50+ 业务团队快速搭建页面',
        '推动前端工程化规范落地，代码评审通过率提升至 95%',
      ],
    },
    {
      id: 'w2',
      company: '阿里巴巴',
      position: '前端工程师',
      startDate: '2018-07',
      endDate: '2021-02',
      current: false,
      description: '参与淘宝商品详情页和购物车核心功能开发。',
      achievements: [
        '优化商品详情页加载速度，首屏时间从 3.2s 降至 1.8s',
        '参与设计并实现 A/B 测试框架，支持多个业务线并发实验',
      ],
    },
  ],
  education: [
    {
      id: 'e1',
      school: '北京大学',
      degree: '本科',
      major: '计算机科学与技术',
      startDate: '2014-09',
      endDate: '2018-06',
      gpa: '3.8/4.0',
      description: '优秀毕业生，连续三年获国家奖学金',
    },
  ],
  skills: [
    {
      id: 's1',
      category: '前端技术',
      items: ['React', 'Vue 3', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    },
    {
      id: 's2',
      category: '工程化',
      items: ['Webpack', 'Vite', 'Git', 'Docker', 'CI/CD'],
    },
    {
      id: 's3',
      category: '后端 & 数据库',
      items: ['Node.js', 'Express', 'PostgreSQL', 'Redis'],
    },
  ],
  projects: [
    {
      id: 'p1',
      name: '低代码平台 LowCoder',
      role: '技术负责人',
      startDate: '2022-06',
      endDate: '2023-12',
      description:
        '从零设计并主导开发企业级低代码平台，支持拖拽搭建、数据绑定、自动化工作流等核心功能。',
      technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
      link: 'https://github.com/lowcoder-demo',
    },
  ],
  certificates: [
    {
      id: 'c1',
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2022-08',
      link: '',
    },
  ],
  languages: [
    { id: 'l1', name: '中文', level: '母语' },
    { id: 'l2', name: '英语', level: 'CET-6（564分）' },
  ],
  customSections: [],
};

export const DEFAULT_SETTINGS: ResumeSettings = {
  templateId: 'modern',
  colorTheme: COLOR_THEMES[0],
  fontSize: 'medium',
  fontFamily: 'sans',
  showAvatar: false,
  pageFormat: 'A4',
  sectionOrder: [
    'workExperience',
    'education',
    'skills',
    'projects',
    'certificates',
    'languages',
  ],
};
