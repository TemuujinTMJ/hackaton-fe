export interface UserInfo {
  first_name: string;
  email: string;
  [key: string]: unknown;
}

export interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string, userInfo: UserInfo) => void;
  logout: () => void;
  setToken: (token: string | null) => void;
}
