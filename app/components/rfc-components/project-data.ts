export interface ProjectData {
  id: string;
  name: string;
  description: string;
  tech: string[];
  maintainerUsernames: string[];
  url?: string;
  owner: string;
  pdfLink?: string;
  repo_name: string;
}

export const projects: ProjectData[] = [
  {
    id: 'ASOC1',
    name: 'Project Proposals',
    description:
      'Multiple projects, see PDF for details (To-Do List, Chair Booking, Raw Material Management, Recipe Management, Employee Management)',
    tech: [],
    maintainerUsernames: ['acm-avv'],
    owner: 'acm-avv',
    pdfLink:
      'https://drive.google.com/file/d/1xBzS92xe4Jtr61vBODo_MtxauMrtHHDb/view?usp=sharing',
    repo_name: '',
  },
  {
    id: 'ASOC1A',
    name: 'To-Do List and Employee Collaboration Application',
    description: 'Details in the Project Proposals PDF.',
    tech: [],
    maintainerUsernames: ['acm-avv'],
    url: 'https://github.com/acm-avv/iceberg.rfc',
    owner: 'acm-avv',
    pdfLink:
      'https://drive.google.com/file/d/1xBzS92xe4Jtr61vBODo_MtxauMrtHHDb/view?usp=sharing',
    repo_name: 'iceberg.rfc',
  },
  {
    id: 'ASOC1B',
    name: 'Chair Booking System',
    description: 'Details in the Project Proposals PDF.',
    tech: [],
    maintainerUsernames: ['acm-avv'],
    url: 'https://github.com/acm-avv/bookmychair.rfc',
    owner: 'acm-avv',
    pdfLink:
      'https://drive.google.com/file/d/1xBzS92xe4Jtr61vBODo_MtxauMrtHHDb/view?usp=sharing',
    repo_name: 'bookmychair.rfc',
  },
  {
    id: 'ASOC1C',
    name: 'Raw Material Management System',
    description: 'Details in the Project Proposals PDF.',
    tech: [],
    maintainerUsernames: ['acm-avv'],
    url: 'https://github.com/acm-avv/lumberjack.rfc',
    owner: 'acm-avv',
    pdfLink:
      'https://drive.google.com/file/d/1xBzS92xe4Jtr61vBODo_MtxauMrtHHDb/view?usp=sharing',
    repo_name: 'lumberjack.rfc',
  },
  {
    id: 'ASOC1D',
    name: 'Recipe Management System',
    description: 'Details in the Project Proposals PDF.',
    tech: [],
    maintainerUsernames: ['acm-avv'],
    url: 'https://github.com/acm-avv/gourmet.rfc',
    owner: 'acm-avv',
    pdfLink:
      'https://drive.google.com/file/d/1xBzS92xe4Jtr61vBODo_MtxauMrtHHDb/view?usp=sharing',
    repo_name: 'gourmet.rfc',
  },
  {
    id: 'ASOC1E',
    name: 'Employee Management System',
    description: 'Details in the Project Proposals PDF.',
    tech: [],
    maintainerUsernames: ['acm-avv'],
    url: 'https://github.com/acm-avv/crewlocity.rfc',
    owner: 'acm-avv',
    pdfLink:
      'https://drive.google.com/file/d/1xBzS92xe4Jtr61vBODo_MtxauMrtHHDb/view?usp=sharing',
    repo_name: 'crewlocity.rfc',
  },
  {
    id: 'ASOC2',
    name: 'Local-First Desktop App To Ease Ops with Cloudflare',
    description:
      'Desktop app for Cloudflare operations using a local-first approach, no backend servers, facilitating secure development.',
    tech: ['React', 'Tauri', 'Rust', 'Cloudflare Sdks', 'cURL'],
    maintainerUsernames: ['acm-avv'],
    url: 'https://github.com/acm-avv/localflare.rfc',
    owner: 'acm-avv',
    repo_name: 'localflare.rfc',
  },
  {
    id: 'ASOC3',
    name: 'Self-Hostable Podcasting Platform',
    description:
      'A platform similar to Riverside.fm, supporting podcast creation with distributed system management.',
    tech: [
      'React',
      'Typescript',
      'Shadcn',
      'Tanstack Router',
      'Express',
      'Drizzleorm',
      'Zod',
      'Postgresql',
      'FFMPEG',
      'Webrtc',
      'Websockets',
      'Minio',
      'Podman',
      'Nomad',
      'Turborepo',
    ],
    maintainerUsernames: ['acm-avv'],
    url: 'https://github.com/acm-avv/riverpod.rfc',
    owner: 'acm-avv',
    repo_name: 'riverpod.rfc',
  },
  {
    id: 'ASOC4',
    name: 'Ads Exchange',
    description:
      'Decentralized ad-space marketplace with UI components, frontend, and Solana blockchain integration.',
    tech: ['Solana'],
    maintainerUsernames: ['acm-avv'],
    url: 'https://github.com/acm-avv/sol-ads.rfc',
    owner: 'acm-avv',
    repo_name: 'sol-ads.rfc',
  },
  {
    id: 'ASOC5',
    name: 'Lost and Found Mobile App',
    description:
      'Mobile app for reporting and claiming lost items in various campus blocks, with Microsoft oAuth.',
    tech: ['Flutter', 'Microsoft Oauth'],
    maintainerUsernames: ['acm-avv'],
    url: 'https://github.com/acm-avv/crow-nest.rfc',
    owner: 'acm-avv',
    repo_name: 'crow-nest.rfc',
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
      'Postgresql',
      'Sqlc',
      'Ozzo-Validation',
      'Kafka',
      'Github Apis',
    ],
    maintainerUsernames: ['acm-avv'],
    url: 'https://github.com/acm-avv/swipe-a-dev.rfc',
    owner: 'acm-avv',
    repo_name: 'swipe-a-dev.rfc',
  },
  {
    id: 'ASOC7',
    name: 'CLI-based Tool for WebSocket Load Testing',
    description:
      'CLI tool for WebSocket load testing, addressing the lack of maintained alternatives.',
    tech: ['Golang'],
    maintainerUsernames: ['acm-avv'],
    url: 'https://github.com/acm-avv/mjolnir.rfc',
    owner: 'acm-avv',
    repo_name: 'mjolnir.rfc',
  },
  {
    id: 'ASOC8',
    name: 'FFMPEG-based Simple Video Editing Tool',
    description:
      'TUI-based video editing tool using FFMPEG, lightweight for Linux users.',
    tech: ['Golang', 'FFMPEG', 'Charm'],
    maintainerUsernames: ['acm-avv'],
    url: 'https://github.com/acm-avv/snipper.rfc',
    owner: 'acm-avv',
    repo_name: 'snipper.rfc',
  },
  {
    id: 'ASOC9',
    name: 'Rust SDK for Cloudflare v4 REST APIs',
    description: 'SDK for interacting with Cloudflare v4 REST APIs in Rust.',
    tech: ['Rust', 'Cloudflare Apis'],
    maintainerUsernames: ['acm-avv'],
    url: 'https://github.com/acm-avv/rustflare.rfc',
    owner: 'acm-avv',
    repo_name: 'rustflare.rfc',
  },
  {
    id: 'ASOC10',
    name: 'Cursor for Whiteboarding with Native-Git Integration',
    description:
      'Local-first whiteboarding app with AI diagram generation and git integration.',
    tech: ['Reactflow', 'React', 'Tauri', 'Gemini Api', 'Git'],
    maintainerUsernames: ['acm-avv'],
    url: 'https://github.com/acm-avv/ivory.rfc',
    owner: 'acm-avv',
    repo_name: 'ivory.rfc',
  },
  {
    id: 'ASOC11',
    name: 'YouTube Video Chatbot',
    description:
      'Chatbot that converses with YouTube video transcripts using RAG.',
    tech: ['Yt-Dlp', 'Turborepo'],
    maintainerUsernames: ['acm-avv'],
    url: 'https://github.com/acm-avv/onlychats.rfc',
    owner: 'acm-avv',
    repo_name: 'onlychats.rfc',
  },
  {
    id: 'ASOC12',
    name: 'Digital Collectibles / NFT Platform',
    description:
      'Platform for creating and showcasing digital collectible badges as NFTs.',
    tech: ['Holopin', 'Metaplex', 'Solana', 'Nfts'],
    maintainerUsernames: ['acm-avv'],
    url: 'https://github.com/acm-avv/dCollect.rfc',
    owner: 'acm-avv',
    repo_name: 'dCollect.rfc',
  },
  {
    id: 'ASOC13',
    name: 'Gamified 2D Metaverse Working Space',
    description:
      '2D metaverse workspace with animated components and real-time collaboration.',
    tech: [
      'Phasorjs',
      'Websockets',
      'Webrtc',
      'React.js',
      'Tanstack',
      'Golang',
      'Gorilla/Websockets',
      'Pion/Webrtc',
      'Gin-Gonic',
      'Mongodb',
      'Cassandra',
      'Postgresql',
    ],
    maintainerUsernames: ['acm-avv'],
    url: 'https://github.com/acm-avv/grokverse.rfc',
    owner: 'acm-avv',
    repo_name: 'grokverse.rfc',
  },
  {
    id: 'ASOC14',
    name: 'Drag-n-Drop and HTML Email Template Builder',
    description:
      'Browser-based drag-and-drop email template builder using localStorage.',
    tech: ['Localstorage', 'Browser Apis'],
    maintainerUsernames: ['acm-avv'],
    url: 'https://github.com/acm-avv/mailify.rfc',
    owner: 'acm-avv',
    repo_name: 'mailify.rfc',
  },
  {
    id: 'ASOC15',
    name: 'Fully Anonymous Idea Validation Platform',
    description:
      'Platform for anonymous idea posting and feedback, with content filtering.',
    tech: [],
    maintainerUsernames: ['acm-avv'],
    url: 'https://github.com/acm-avv/oracle-ai.rfc',
    owner: 'acm-avv',
    repo_name: 'oracle-ai.rfc',
  },
  {
    id: 'ASOC16',
    name: 'CareConnect',
    description: 'Details in the PDF.',
    tech: [],
    maintainerUsernames: ['acm-avv'],
    url: 'https://github.com/acm-avv/care-connect.rfc',
    owner: 'acm-avv',
    pdfLink:
      'https://drive.google.com/open?id=1dAGHKLBjGCMMXSh89cx7p5PX7Z2Ianqz',
    repo_name: 'care-connect.rfc',
  },
  {
    id: 'ASOC17',
    name: 'HTTP-SSH-APP',
    description:
      'Web-based app for executing shell commands on a remote server via HTTP.',
    tech: ['Http', 'Html', 'Js', 'Cpp'],
    maintainerUsernames: ['acm-avv'],
    url: 'https://github.com/acm-avv/http-ssh.rfc',
    owner: 'acm-avv',
    repo_name: 'http-ssh.rfc',
  },
];
