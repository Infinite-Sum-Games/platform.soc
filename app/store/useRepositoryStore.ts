import { create } from 'zustand';
import { make_api_call } from '../lib/api';

export interface IssuesData {
  id: string;
  title: string;
  url: string;
  language: string[];
  bounty: number;
  difficulty: string;
  isClaimed: boolean;
  claimedByList: string[];
  multiplierActive: boolean;
  multiplierValue: number | null;
  completionStatus: boolean;
  PRsActive: number;
}

export interface TimeSeriesDataPoint {
  value: number;
  timestamp: string;
}

export interface ReposData {
  id: string;
  name: string;
  url: string;
  maintainerUsernames: string[];
  description: string;
  tech: string[];
  openIssues: number;
  completedIssues: number;
  openCount: number;
  completedCount: number;
  multiplierActive: boolean;
  PROpenTimeSeriesData: TimeSeriesDataPoint[];
  IssueCompletionTimeSeriesData: TimeSeriesDataPoint[];
  Issues: IssuesData[];
}

export interface ReposDataAPI {
  id: string;
  name: string;
  maintainers: string[];
  tags: string[];
  url: string;
  description: string;
}

export interface IssueDataAPI {
  issue_id: string;
  title: string;
  issue_url: string;
  claimants?: Array<{ username: string }>;
}

interface RepositoryState {
  repos: ReposData[];
  setRepos: (repos: ReposData[]) => void;
  fetchAllReposAndIssues: () => Promise<void>;
}

export const useRepositoryStore = create<RepositoryState>((set, get) => ({
  repos: [],

  setRepos: (newRepos: ReposData[]) => set({ repos: newRepos }),

  fetchAllReposAndIssues: async () => {
    const {
      success: reposSuccess,
      data: reposData,
      error: reposError,
    } = await make_api_call<{
      message: string;
      projects: ReposDataAPI[];
    }>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/projects`,
    });

    if (!reposSuccess || !reposData) {
      console.error('Failed to fetch repos:', reposError);
      return;
    }

    const fetchedRepos: ReposData[] = reposData.projects.map(
      (project: ReposDataAPI) => ({
        ...project,
        maintainerUsernames: project.maintainers,
        tech: project.tags,
        openIssues: 0,
        completedIssues: 0,
        openCount: 0,
        completedCount: 0,
        multiplierActive: false,
        PROpenTimeSeriesData: [],
        IssueCompletionTimeSeriesData: [],
        Issues: [],
      }),
    );

    const issueFetchPromises = fetchedRepos.map(async (repo) => {
      const {
        success: issuesSuccess,
        data: issuesData,
        error: issuesError,
      } = await make_api_call<{
        message: string;
        issues: IssueDataAPI[];
      }>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/issues/${repo.id}`,
      });

      if (!issuesSuccess || !issuesData) {
        console.error(`Failed to fetch issues for ${repo.id}:`, issuesError);
        return { repoId: repo.id, issues: [], openCount: 0, completedCount: 0 };
      }

      const issues: IssuesData[] = (issuesData.issues || []).map(
        (issue: IssueDataAPI) => ({
          id: issue.issue_id,
          title: issue.title,
          url: issue.issue_url,
          language: [],
          bounty: 0,
          difficulty: '',
          isClaimed: (issue.claimants && issue.claimants.length > 0) || false,
          claimedByList:
            issue.claimants?.map((c: { username: string }) => c.username) || [],
          multiplierActive: false,
          multiplierValue: null,
          completionStatus: false,
          PRsActive: 0,
        }),
      );

      return { repoId: repo.id, issues };
    });

    const results = await Promise.all(issueFetchPromises);

    const finalRepos = fetchedRepos.map((repo) => {
      const result = results.find((r) => r.repoId === repo.id);
      if (result) {
        return {
          ...repo,
          Issues: result.issues,
        };
      }
      return repo;
    });

    set({ repos: finalRepos });
  },
}));

// temp repository data for testing
export const tempRepos: ReposData[] = [
  {
    id: 'repoA',
    name: 'A Very Very Very Very Very Very Very Very Very Very Long Name for a Repository',
    url: 'https://github.com/frontend-dev/fantastic-app',
    maintainerUsernames: ['ui_master', 'react_ninja'],
    description:
      'A cutting-edge frontend application built with the latest technologies.',
    tech: ['React', 'TypeScript', 'CSS'],
    openIssues: 3,
    completedIssues: 15,
    openCount: 3,
    completedCount: 15,
    multiplierActive: true,
    PROpenTimeSeriesData: [
      {
        value: 5,
        timestamp: new Date(Date.now() - 86400000 * 7).toISOString(),
      }, // 7 days ago
      { value: 2, timestamp: new Date().toISOString() },
    ],
    IssueCompletionTimeSeriesData: [
      {
        value: 10,
        timestamp: new Date(Date.now() - 86400000 * 14).toISOString(),
      }, // 14 days ago
      { value: 15, timestamp: new Date().toISOString() },
    ],
    Issues: [
      {
        id: 'issueA-1',
        title: 'Implement responsive navigation',
        url: 'https://github.com/frontend-dev/fantastic-app/issues/1',
        language: ['TypeScript'],
        bounty: 75,
        difficulty: 'Medium',
        isClaimed: false,
        claimedByList: [],
        multiplierActive: true,
        multiplierValue: 1.2,
        completionStatus: false,
        PRsActive: 0,
      },
      {
        id: 'issueA-2',
        title:
          'A very very very very very very long issue title that goes on and on and on and on and on and on and on and on',
        url: 'https://github.com/frontend-dev/fantastic-app/issues/2',
        language: ['CSS'],
        bounty: 50,
        difficulty: 'Easy',
        isClaimed: true,
        claimedByList: [
          'css_expert',
          'mobile_dev',
          'ui_guru',
          'react_enthusiast',
          'frontend_lover',
          'web_dev',
        ],
        multiplierActive: false,
        multiplierValue: null,
        completionStatus: true,
        PRsActive: 1,
      },
      {
        id: 'issueA-3',
        title: 'Add user authentication form',
        url: 'https://github.com/frontend-dev/fantastic-app/issues/3',
        language: ['React'],
        bounty: 100,
        difficulty: 'Medium',
        isClaimed: false,
        claimedByList: [],
        multiplierActive: true,
        multiplierValue: 1.5,
        completionStatus: false,
        PRsActive: 0,
      },
      {
        id: 'issueA-4',
        title: 'Integrate with backend API',
        url: 'https://github.com/frontend-dev/fantastic-app/issues/4',
        language: ['TypeScript'],
        bounty: 120,
        difficulty: 'Hard',
        isClaimed: false,
        claimedByList: [],
        multiplierActive: false,
        multiplierValue: null,
        completionStatus: false,
        PRsActive: 0,
      },
      {
        id: 'issueA-5',
        title: 'Write unit tests for components',
        url: 'https://github.com/frontend-dev/fantastic-app/issues/5',
        language: ['JavaScript'],
        bounty: 60,
        difficulty: 'Easy',
        isClaimed: true,
        claimedByList: ['test_guru'],
        multiplierActive: true,
        multiplierValue: 1.1,
        completionStatus: true,
        PRsActive: 1,
      },
    ],
  },
  {
    id: 'repoB',
    name: 'Backend Powerhouse Service',
    url: 'https://github.com/backend-team/powerhouse-api',
    maintainerUsernames: ['java_pro', 'database_whiz'],
    description: 'A robust backend service handling critical business logic.',
    tech: ['Java', 'Rust', 'PostgreSQL'],
    openIssues: 7,
    completedIssues: 22,
    openCount: 7,
    completedCount: 22,
    multiplierActive: false,
    PROpenTimeSeriesData: [
      {
        value: 10,
        timestamp: new Date(Date.now() - 86400000 * 10).toISOString(),
      }, // 10 days ago
      { value: 7, timestamp: new Date().toISOString() },
    ],
    IssueCompletionTimeSeriesData: [
      {
        value: 18,
        timestamp: new Date(Date.now() - 86400000 * 20).toISOString(),
      }, // 20 days ago
      { value: 22, timestamp: new Date().toISOString() },
    ],
    Issues: [
      {
        id: 'issueB-1',
        title: 'Implement user registration API',
        url: 'https://github.com/backend-team/powerhouse-api/issues/10',
        language: ['Java'],
        bounty: 150,
        difficulty: 'Medium',
        isClaimed: false,
        claimedByList: [],
        multiplierActive: false,
        multiplierValue: null,
        completionStatus: false,
        PRsActive: 0,
      },
      {
        id: 'issueB-2',
        title: 'Optimize database queries for user data',
        url: 'https://github.com/backend-team/powerhouse-api/issues/11',
        language: ['SQL'],
        bounty: 90,
        difficulty: 'Medium',
        isClaimed: true,
        claimedByList: ['sql_master'],
        multiplierActive: true,
        multiplierValue: 1.3,
        completionStatus: true,
        PRsActive: 2,
      },
      {
        id: 'issueB-3',
        title: 'Add input validation for API endpoints',
        url: 'https://github.com/backend-team/powerhouse-api/issues/12',
        language: ['Java'],
        bounty: 70,
        difficulty: 'Easy',
        isClaimed: false,
        claimedByList: [],
        multiplierActive: false,
        multiplierValue: null,
        completionStatus: false,
        PRsActive: 0,
      },
      {
        id: 'issueB-4',
        title: 'Implement data caching for frequently accessed data',
        url: 'https://github.com/backend-team/powerhouse-api/issues/13',
        language: ['Java'],
        bounty: 180,
        difficulty: 'Hard',
        isClaimed: false,
        claimedByList: [],
        multiplierActive: true,
        multiplierValue: 1.6,
        completionStatus: false,
        PRsActive: 0,
      },
      {
        id: 'issueB-5',
        title: 'Write integration tests for API controllers',
        url: 'https://github.com/backend-team/powerhouse-api/issues/14',
        language: ['Java'],
        bounty: 80,
        difficulty: 'Easy',
        isClaimed: true,
        claimedByList: ['test_engineer'],
        multiplierActive: false,
        multiplierValue: null,
        completionStatus: true,
        PRsActive: 1,
      },
    ],
  },
];
