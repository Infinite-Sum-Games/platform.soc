export interface ProjectData {
  id: string;
  name: string;
  description: string;
  tech: string[];
  maintainerUsernames: string[];
  url?: string;
  owner: string;
  pdfLink?: string;
}

export const projects: ProjectData[] = [
  {
    id: 'ASOC1',
    name: 'Project Proposals',
    description:
      'Multiple projects, see PDF for details (To-Do List, Chair Booking, Raw Material Management, Recipe Management, Employee Management)',
    tech: ['TBD'],
    maintainerUsernames: ['acm-avv'],
    owner: 'acm-avv',
    pdfLink:
      'https://drive.google.com/file/d/1xBzS92xe4Jtr61vBODo_MtxauMrtHHDb/view?usp=sharing',
  },
  {
    id: 'ASOC2',
    name: 'Local-First Desktop App To Ease Ops with Cloudflare',
    description:
      'Desktop app for Cloudflare operations using a local-first approach, no backend servers, facilitating secure development.',
    tech: ['React', 'Tauri', 'Rust', 'Cloudflare SDKs', 'cURL'],
    maintainerUsernames: ['acm-avv'],
    url: 'https://github.com/acm-avv/local-first-cloudflare-app',
    owner: 'acm-avv',
  },
  {
    id: 'ASOC3',
    name: 'Self-Hostable Podcasting Platform',
    description:
      'A platform similar to Riverside.fm, supporting podcast creation with distributed system management.',
    tech: [
      'React',
      'TypeScript',
      'ShadCN',
      'Tanstack Router',
      'Express',
      'DrizzleORM',
      'Zod',
      'PostgreSQL',
      'FFMPEG',
      'WebRTC',
      'WebSockets',
      'Minio',
      'Podman',
      'Nomad',
      'TurboRepo',
    ],
    maintainerUsernames: ['acm-avv'],
    url: 'https://github.com/acm-avv/podcasting-platform',
    owner: 'acm-avv',
  },
  {
    id: 'ASOC4',
    name: 'Ads Exchange',
    description:
      'Decentralized ad-space marketplace with UI components, frontend, and Solana blockchain integration.',
    tech: ['Solana'],
    maintainerUsernames: ['acm-avv'],
    url: 'https://github.com/acm-avv/ads-exchange',
    owner: 'acm-avv',
  },
  {
    id: 'ASOC5',
    name: 'Lost and Found Mobile App',
    description:
      'Mobile app for reporting and claiming lost items in various campus blocks, with Microsoft oAuth.',
    tech: ['Flutter', 'Microsoft oAuth'],
    maintainerUsernames: ['acm-avv'],
    url: 'https://github.com/acm-avv/lost-and-found-app',
    owner: 'acm-avv',
  },
  {
    id: 'ASOC6',
    name: 'Swipe a Dev - Mobile App',
    description:
      'Mobile app for matching developers with projects, featuring a dating-app-like swipe interface.',
    tech: [
      'React Native',
      'Flutter',
      'Golang',
      'PostgreSQL',
      'sqlc',
      'ozzo-validation',
      'Kafka',
      'GitHub APIs',
    ],
    maintainerUsernames: ['acm-avv'],
    url: 'https://github.com/acm-avv/swipe-a-dev',
    owner: 'acm-avv',
  },
  {
    id: 'ASOC7',
    name: 'CLI-based Tool for WebSocket Load Testing',
    description:
      'CLI tool for WebSocket load testing, addressing the lack of maintained alternatives.',
    tech: ['Golang'],
    maintainerUsernames: ['acm-avv'],
    url: 'https://github.com/acm-avv/websocket-load-tester',
    owner: 'acm-avv',
  },
  {
    id: 'ASOC8',
    name: 'FFMPEG-based Simple Video Editing Tool',
    description:
      'TUI-based video editing tool using FFMPEG, lightweight for Linux users.',
    tech: ['Golang', 'FFMPEG', 'Charm'],
    maintainerUsernames: ['acm-avv'],
    url: 'https://github.com/acm-avv/video-editor',
    owner: 'acm-avv',
  },
  {
    id: 'ASOC9',
    name: 'Rust SDK for Cloudflare v4 REST APIs',
    description: 'SDK for interacting with Cloudflare v4 REST APIs in Rust.',
    tech: ['Rust', 'Cloudflare APIs'],
    maintainerUsernames: ['acm-avv'],
    url: 'https://github.com/acm-avv/cloudflare-rust-sdk',
    owner: 'acm-avv',
  },
  {
    id: 'ASOC10',
    name: 'Cursor for Whiteboarding with Native-Git Integration',
    description:
      'Local-first whiteboarding app with AI diagram generation and git integration.',
    tech: ['Reactflow', 'React', 'Tauri', 'Gemini API', 'git'],
    maintainerUsernames: ['acm-avv'],
    url: 'https://github.com/acm-avv/whiteboard-cursor',
    owner: 'acm-avv',
  },
  {
    id: 'ASOC11',
    name: 'YouTube Video Chatbot',
    description:
      'Chatbot that converses with YouTube video transcripts using RAG.',
    tech: ['yt-dlp', 'TurboRepo'],
    maintainerUsernames: ['acm-avv'],
    url: 'https://github.com/acm-avv/youtube-chatbot',
    owner: 'acm-avv',
  },
  {
    id: 'ASOC12',
    name: 'Digital Collectibles / NFT Platform',
    description:
      'Platform for creating and showcasing digital collectible badges as NFTs.',
    tech: ['Holopin', 'Metaplex', 'Solana', 'NFTs'],
    maintainerUsernames: ['acm-avv'],
    url: 'https://github.com/acm-avv/nft-platform',
    owner: 'acm-avv',
  },
  {
    id: 'ASOC13',
    name: 'Gamified 2D Metaverse Working Space',
    description:
      '2D metaverse workspace with animated components and real-time collaboration.',
    tech: [
      'PhasorJS',
      'WebSockets',
      'WebRTC',
      'React.js',
      'Tanstack',
      'Golang',
      'Gorilla/websockets',
      'pion/webrtc',
      'gin-gonic',
      'MongoDB',
      'Cassandra',
      'PostgreSQL',
    ],
    maintainerUsernames: ['acm-avv'],
    url: 'https://github.com/acm-avv/metaverse-workspace',
    owner: 'acm-avv',
  },
  {
    id: 'ASOC14',
    name: 'Drag-n-Drop and HTML Email Template Builder',
    description:
      'Browser-based drag-and-drop email template builder using localStorage.',
    tech: ['localStorage', 'Browser APIs'],
    maintainerUsernames: ['acm-avv'],
    url: 'https://github.com/acm-avv/email-template-builder',
    owner: 'acm-avv',
  },
  {
    id: 'ASOC15',
    name: 'Fully Anonymous Idea Validation Platform',
    description:
      'Platform for anonymous idea posting and feedback, with content filtering.',
    tech: ['TBD'],
    maintainerUsernames: ['acm-avv'],
    url: 'https://github.com/acm-avv/idea-validation',
    owner: 'acm-avv',
  },
  {
    id: 'ASOC16',
    name: 'CareConnect',
    description: 'Details in the PDF.',
    tech: ['TBD'],
    maintainerUsernames: ['acm-avv'],
    owner: 'acm-avv',
    pdfLink:
      'https://drive.google.com/open?id=1dAGHKLBjGCMMXSh89cx7p5PX7Z2Ianqz',
  },
  {
    id: 'ASOC17',
    name: 'HTTP-SSH-APP',
    description:
      'Web-based app for executing shell commands on a remote server via HTTP.',
    tech: ['HTTP', 'HTML', 'JS', 'CPP'],
    maintainerUsernames: ['acm-avv'],
    url: 'https://github.com/acm-avv/http-ssh-app',
    owner: 'acm-avv',
  },
];
