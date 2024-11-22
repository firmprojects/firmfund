export interface Member {
  id: number;
  name: string;
  contribution: number;
  avatar: string;
  receivedPayout?: boolean;
  payoutDate?: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  goal: number;
  current: number;
  type: 'goal' | 'rotating';
  members: Member[];
  contributionAmount?: number;
  frequency?: 'weekly' | 'monthly';
  currentRecipient?: number;
  nextPayoutDate?: string;
  status: 'active' | 'completed';
}

export const groups: Group[] = [
  {
    id: "1",
    name: "Community Dairy Farm",
    description: "Group contribution for purchasing a dairy cow",
    goal: 1000,
    current: 750,
    type: 'goal',
    status: 'active',
    members: [
      {
        id: 1,
        name: "John Doe",
        contribution: 250,
        avatar: "https://i.pravatar.cc/150?u=1",
      },
      {
        id: 2,
        name: "Jane Smith",
        contribution: 300,
        avatar: "https://i.pravatar.cc/150?u=2",
      },
      {
        id: 3,
        name: "Mike Johnson",
        contribution: 200,
        avatar: "https://i.pravatar.cc/150?u=3",
      },
    ],
  },
  {
    id: "2",
    name: "Monthly Savings Circle",
    description: "Each member receives $600 when it's their turn",
    type: 'rotating',
    goal: 3000,
    current: 600,
    contributionAmount: 200,
    frequency: 'monthly',
    currentRecipient: 1,
    nextPayoutDate: '2024-04-01',
    status: 'active',
    members: [
      {
        id: 1,
        name: "Sarah Wilson",
        contribution: 200,
        avatar: "https://i.pravatar.cc/150?u=4",
        receivedPayout: true,
        payoutDate: '2024-03-01',
      },
      {
        id: 2,
        name: "James Brown",
        contribution: 200,
        avatar: "https://i.pravatar.cc/150?u=5",
        receivedPayout: false,
        payoutDate: '2024-04-01',
      },
      {
        id: 3,
        name: "Emily Davis",
        contribution: 200,
        avatar: "https://i.pravatar.cc/150?u=6",
        receivedPayout: false,
        payoutDate: '2024-05-01',
      },
    ],
  },
];