export interface Project {
  id: string;
  number: string;
  category: string;
  title: string;
  headline: string;
  description: string;
  stack: string[];
  githubUrl: string;
  assetUrl: string;
  accentColor?: string;
  hasBotMascot?: boolean;
  isAssetGap?: boolean;
  secondaryAssetUrl?: string | null;
  summary?: string;
  challenge?: string;
  architecture?: string;
  highlights?: { label: string; value: string }[];
}

export const REAL_PROJECTS: Project[] = [
  {
    id: 'telegram-concurrency',
    number: '01',
    category: '01 — TELEGRAM',
    title: 'Telegram Concurrency & Automation Bots',
    headline: 'Multiple Telegram sessions, one automation engine.',
    description: 'Automating messages, tasks, and multiple Telegram sessions.',
    stack: ['Python', 'Telethon', 'Asyncio'],
    githubUrl: 'https://github.com/StylixXD/tg-bot',
    assetUrl: '/images/processed/telegram-clean.png',
    accentColor: '#2AABEE',
    hasBotMascot: true,
  },
  {
    id: 'discord-security-bot',
    number: '02',
    category: '02 — DISCORD',
    title: 'Discord Security & Moderation Bot',
    headline: 'Security and moderation without babysitting the server.',
    description:
      'A powerful security and moderation bot built to detect and respond to raids, spam, mass actions, webhook abuse, permission abuse, and other common threats.',
    stack: ['Python', 'Discord.py', 'Discord APIs'],
    githubUrl: 'https://github.com/StylixXD/moderation-bot',
    assetUrl: '/images/processed/discord-clean.png',
    accentColor: '#5865F2',
    hasBotMascot: true,
  },
  {
    id: 'xbox-auth-validator',
    number: '03',
    category: '03 — XBOX / MICROSOFT',
    title: 'Xbox & Microsoft Authentication Tool',
    headline: "Learning Microsoft's authentication flow the hard way.",
    description:
      'A tool for automating Microsoft/Xbox authentication flows and repetitive account or service checks.',
    stack: ['Python', 'OAuth', 'Microsoft/Xbox APIs'],
    githubUrl: 'https://github.com/StylixXD/vadilator-ms',
    assetUrl: '/images/processed/xbox-clean.png',
    accentColor: '#107C10',
    hasBotMascot: true,
  },
  {
    id: 'storageiq',
    number: '04',
    category: '04 — ANDROID',
    title: 'StorageIQ',
    headline: "Because finding a file shouldn't feel like a side quest.",
    description:
      "A smarter Android file manager for finding, organizing, cleaning, and actually understanding what's taking up your storage.",
    stack: ['Android', 'Kotlin', 'Storage APIs'],
    githubUrl: 'https://github.com/StylixXD/Storageiq',
    assetUrl: '/images/processed/storageiq-clean.png',
    accentColor: '#3DDC84',
    hasBotMascot: false,
  },
  {
    id: 'automation-tooling-ecosystem',
    number: '05',
    category: '05 — AUTOMATION',
    title: 'Automation Tooling & Scripts',
    headline: "If I have to do it twice, I'm probably automating it.",
    description:
      'A collection of scripts and tools for validation, data collection, scraping, statistics, extraction, reporting, notifications, and other repetitive workflows.',
    stack: ['Python', 'APIs', 'Automation', 'Data Extraction'],
    githubUrl: 'https://github.com/StylixXD/auto-scrap',
    assetUrl: '/images/processed/robot-arm-clean.png',
    accentColor: '#F06565',
    hasBotMascot: false,
  },
];
