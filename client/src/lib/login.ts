
// login.ts
export type AvatarDecorationData = {
  asset: string;
  sku_id: string;
  expires_at: number;
};

export type LoginData = {
  userid: number;
  username: string;
  name: string;
  avatar: string;
  banner: string | null;
  accent_color: number;
  avatar_decoration_data: AvatarDecorationData | null;
  verified: boolean;
  authAt: string;
};

const STORAGE_KEY = "login_data";

// Get login data from localStorage
export function getLoginData(): LoginData | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as LoginData;
  } catch (e) {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

// Save login data to localStorage
export function setLoginData(data: LoginData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Remove login data (logout)
export function logout() {
  localStorage.removeItem(STORAGE_KEY);
}

// Check if logged in
export function isLoggedIn(): boolean {
  return !!getLoginData();
}
