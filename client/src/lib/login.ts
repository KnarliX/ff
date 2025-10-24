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
  accent_color: number | null;
  avatar_decoration_data: AvatarDecorationData | null;
  verified: boolean;
  authAt: string;
};

// Convert Discord accent color (number) to hex color code
export function getAccentColorHex(accentColor: number | null): string | null {
  if (!accentColor) return null;
  return `#${accentColor.toString(16).padStart(6, '0')}`;
}

// Check if color is dark (black or very dark)
export function isColorDark(hex: string | null): boolean {
  if (!hex) return true;
  
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  
  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return true if dark (luminance < 0.15)
  return luminance < 0.15;
}

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

// Update verification status
export function updateVerificationStatus(verified: boolean): boolean {
  const loginData = getLoginData();
  if (!loginData) {
    return false;
  }
  
  loginData.verified = verified;
  setLoginData(loginData);
  return true;
}