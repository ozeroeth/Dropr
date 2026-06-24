export type ProjectStatus = 'not started' | 'in progress' | 'done' | 'blocked';

export type DropProject = {
  name: string;
  category: string;
  ecosystem: string;
  tokenStatus: string;
  airdropStatus: string;
  accessStatus: string;
  priority: number;
  risk: 'low' | 'medium' | 'high';
  notes: string;
  radar: { x: number; y: number };
  tasks: { title: string; status: ProjectStatus }[];
};

export const projects: DropProject[] = [
  { name: 'Monad', category: 'L1 / parallel EVM', ecosystem: 'Monad', tokenStatus: 'No token', airdropStatus: 'Speculative', accessStatus: 'Testnet watch', priority: 96, risk: 'medium', notes: 'Track testnet missions, ecosystem apps, and builder campaigns before liquidity arrives.', radar: { x: 68, y: 22 }, tasks: [{ title: 'Map ecosystem protocols', status: 'in progress' }, { title: 'Prepare testnet wallet set', status: 'done' }, { title: 'Log weekly transactions', status: 'not started' }] },
  { name: 'MegaETH', category: 'Real-time L2', ecosystem: 'Ethereum', tokenStatus: 'No token', airdropStatus: 'Rumored', accessStatus: 'Waitlist', priority: 91, risk: 'medium', notes: 'Monitor invites, Discord roles, and early app deployments for high-signal activity.', radar: { x: 36, y: 28 }, tasks: [{ title: 'Join waitlist', status: 'done' }, { title: 'Follow devnet app drops', status: 'in progress' }] },
  { name: 'Ritual', category: 'AI infra', ecosystem: 'Ethereum', tokenStatus: 'No token', airdropStatus: 'Potential', accessStatus: 'Builder docs', priority: 84, risk: 'high', notes: 'AI x crypto infra with stronger research depth; prioritize notes and credible integrations.', radar: { x: 74, y: 58 }, tasks: [{ title: 'Summarize Infernet docs', status: 'not started' }, { title: 'Find community quests', status: 'blocked' }] },
  { name: 'Berachain', category: 'L1 / DeFi', ecosystem: 'Cosmos EVM', tokenStatus: 'Pre-launch', airdropStatus: 'Expected', accessStatus: 'Public testnet', priority: 88, risk: 'low', notes: 'Proof-of-liquidity makes repeat DeFi actions and testnet consistency useful to track.', radar: { x: 44, y: 62 }, tasks: [{ title: 'Run faucet checklist', status: 'done' }, { title: 'Test DEX and lending flows', status: 'in progress' }] },
  { name: 'Base ecosystem', category: 'L2 ecosystem', ecosystem: 'Base', tokenStatus: 'No Base token', airdropStatus: 'Ecosystem drops', accessStatus: 'Live mainnet', priority: 79, risk: 'low', notes: 'Focus on app-specific points, new launches, and social graph opportunities.', radar: { x: 24, y: 74 }, tasks: [{ title: 'Review new points programs', status: 'in progress' }, { title: 'Archive completed mints', status: 'done' }] }
];

export const contentTemplates = [
  { type: 'Tweet idea', text: 'One underpriced signal I am tracking this week is…' },
  { type: 'Thread angle', text: 'The farmer\'s map to a new ecosystem before incentives go live.' },
  { type: 'Visual prompt', text: 'Glass command terminal scanning L2 protocols in neon fog.' },
  { type: 'Next action', text: 'Convert one research note into a task with a deadline.' }
];
