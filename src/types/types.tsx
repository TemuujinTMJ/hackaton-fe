export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: number;
  dob?: Date;
  address?: string;
  profile_img?: string;
  gender?: string;
  password?: string;
  coordinate?: string;
  longitude?: number;
  latitude?: number;
  user_role_id: string;
  status?: string;
}
export interface DashboardData {
  workerStats: {
    active: number;
    inactive: number;
    remote: number;
    onvacation: number;
    totalWorker: number;
  };
  questionsToResolve: Array<{
    _id: string;
    question_text: string;
    answer_text: string;
    isSolved: boolean;
    origin: string;
    createdAt: string;
  }>;
  questionStats: {
    total: number;
    topic: Array<{
      fileName: string;
      amount: number;
      _id: string;
    }>;
  };
  happinessStats: Array<{
    date: string;
    emotion: Array<{
      emotion: string;
      emotionIndex: number;
      totalWorkers: number;
    }>;
  }>;
  taskTypeCompletions: Array<{
    _id: string;
    count: number;
  }>;
}
