export interface ArchitectureStep {
  label: string;
  sublabel: string;
  detail: string;
}

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
  accentColor: string;
  isAssetGap?: boolean;
  secondaryAssetUrl?: string | null;
  summary?: string;
  challenge?: string;
  architecture?: string;
  purpose: string;
  whyExists: string;
  implementationDetails: string[];
  architectureFlow: ArchitectureStep[];
  highlights: { label: string; value: string }[];
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
    accentColor: '#38BDF8',
    purpose: 'Runs concurrent Telegram user accounts and tasks asynchronously without session conflicts or rate-limit blocks.',
    whyExists: 'Managing multiple sessions manually is repetitive and prone to flood-wait bans; an async engine handles task queuing and backoff automatically.',
    implementationDetails: [
      'Built on Python Telethon over Telegram MTProto protocol',
      'Non-blocking asyncio worker queue managing task distribution',
      'Session string storage with automated reconnection handling',
      'Configurable task intervals with randomized backoff to prevent rate limits',
    ],
    architectureFlow: [
      { label: 'Session Pool', sublabel: 'Telethon MTProto', detail: 'Manages authenticated user session strings' },
      { label: 'Task Queue', sublabel: 'Asyncio Workers', detail: 'Distributes tasks to background event loop' },
      { label: 'Throttler', sublabel: 'Rate Limiter', detail: 'Calculates dynamic backoff on flood-wait triggers' },
      { label: 'Telegram API', sublabel: 'Network Layer', detail: 'Dispatches actions and parses responses' },
    ],
    highlights: [
      { label: 'Core Protocol', value: 'MTProto API' },
      { label: 'Concurrency', value: 'Asyncio Event Loop' },
      { label: 'Engine', value: 'Python Telethon' },
    ],
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
    purpose: 'Monitors Discord gateway events in real time to mitigate join raids, repetitive spam, and rogue webhook actions.',
    whyExists: 'Community server incidents escalate within seconds; automated gatekeeping protects members before human staff can intervene.',
    implementationDetails: [
      'Event-driven Python architecture utilizing Discord.py',
      'Sliding-window counter for per-user message velocity tracking',
      'Audit log monitoring to detect suspicious role and permission modifications',
      'Configurable action tiers: purge messages, apply timeouts, and log events',
    ],
    architectureFlow: [
      { label: 'Gateway Ingestion', sublabel: 'Discord WebSocket', detail: 'Streams real-time messages and member events' },
      { label: 'Sliding Window', sublabel: 'Rate Counter', detail: 'Measures action frequency across time buckets' },
      { label: 'Rule Evaluator', sublabel: 'Threshold Logic', detail: 'Evaluates anti-raid and webhook integrity rules' },
      { label: 'Action Dispatcher', sublabel: 'Discord REST API', detail: 'Executes purges, timeouts, and staff notifications' },
    ],
    highlights: [
      { label: 'Event Engine', value: 'Discord Gateway' },
      { label: 'Protection', value: 'Anti-Raid & Webhooks' },
      { label: 'Stack', value: 'Python / Discord.py' },
    ],
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
    purpose: 'Automates the multi-step OAuth 2.0 PKCE and XSTS token handshake required to access Xbox Live services.',
    whyExists: "Microsoft's OAuth involves separate token transitions across live.com and xboxlive.com; testing and validating accounts manually is cumbersome.",
    implementationDetails: [
      'Python script handling MSA login and OAuth 2.0 PKCE challenge response',
      'Sequential token exchange: MSA token to user token, user token to XSTS token',
      'Header and signature generation for Xbox Live REST API endpoints',
      'Batch account status checks with structured validation reporting',
    ],
    architectureFlow: [
      { label: 'MSA Auth', sublabel: 'OAuth 2.0 PKCE', detail: 'Authenticates Microsoft account credentials' },
      { label: 'User Token Exchange', sublabel: 'auth.xboxlive.com', detail: 'Exchanges MSA access token for Xbox user token' },
      { label: 'XSTS Handshake', sublabel: 'xsts.auth.xboxlive.com', detail: 'Acquires Xbox Security Token with claim hash' },
      { label: 'Live Service Call', sublabel: 'Xbox REST Endpoints', detail: 'Validates gamertag profile and service entitlement' },
    ],
    highlights: [
      { label: 'Auth Flow', value: 'OAuth 2.0 PKCE' },
      { label: 'Protocol', value: 'Xbox XSTS Handshake' },
      { label: 'Target', value: 'Microsoft / Xbox Live' },
    ],
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
    purpose: 'Analyzes Android storage space, classifies media and cache, and surfaces large or orphaned files cleanly.',
    whyExists: 'Stock Android file explorers bury deep storage consumers in nested directories; StorageIQ provides direct insight into storage usage.',
    implementationDetails: [
      'Native Android application built in Kotlin',
      'Utilizes Storage Access Framework (SAF) for scoped storage permissions',
      'Background coroutine worker scanning filesystem directories recursively without UI lag',
      'Aggregates file sizes by MIME category (media, archives, APKs, cache)',
    ],
    architectureFlow: [
      { label: 'Storage Access', sublabel: 'Android SAF', detail: 'Requests URI permission for internal/external storage trees' },
      { label: 'Coroutine Indexer', sublabel: 'Kotlin Coroutines', detail: 'Recursively traverses directories on background threads' },
      { label: 'MIME Aggregator', sublabel: 'Analysis Engine', detail: 'Groups files by size tiers, duplicates, and extensions' },
      { label: 'Storage Visualizer', sublabel: 'Clean Interface', detail: 'Renders category charts and one-tap directory actions' },
    ],
    highlights: [
      { label: 'Platform', value: 'Native Android' },
      { label: 'Language', value: 'Kotlin' },
      { label: 'Filesystem', value: 'Scoped Storage SAF' },
    ],
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
    accentColor: '#38BDF8',
    purpose: 'Automates web scraping, content parsing, data transformation, and scheduled notifications.',
    whyExists: 'Manual data harvesting from dynamic websites and APIs is slow and error-prone; automated scripts turn hours of clicking into seconds.',
    implementationDetails: [
      'Python automation scripts using requests, httpx, and BeautifulSoup4',
      'Robust error recovery with configurable request retry logic and rate spacing',
      'Modular regex and CSS selector parsing pipeline for structured entity extraction',
      'Automated output writers for JSON, CSV, and formatted notification webhooks',
    ],
    architectureFlow: [
      { label: 'Source Ingestion', sublabel: 'HTTP / API Client', detail: 'Handles request headers, sessions, and paginated crawls' },
      { label: 'DOM Parsing', sublabel: 'BeautifulSoup4', detail: 'Extracts targeted data points via CSS selectors and regex' },
      { label: 'Data Cleaning', sublabel: 'Transformer', detail: 'Normalizes types, strips whitespace, validates schemas' },
      { label: 'Structured Output', sublabel: 'JSON / CSV Export', detail: 'Generates report files or dispatches event alerts' },
    ],
    highlights: [
      { label: 'Ecosystem', value: 'Python Automation' },
      { label: 'Parser', value: 'BeautifulSoup4 / Regex' },
      { label: 'Export Formats', value: 'JSON / CSV / Webhooks' },
    ],
  },
];
