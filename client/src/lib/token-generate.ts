export interface TokenGenerateRequest {
  discordId: string;
  username: string;
}

export interface TokenGenerateResponse {
  token?: string;
  verified?: string;
  error?: string;
}

const API_ENDPOINT = 'https://janvi.jarvibeta.xyz/api/generate-token';

export async function generateToken(discordId: string, username: string): Promise<TokenGenerateResponse> {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        discordId,
        username,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.error || 'Failed to generate token' };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return { error: 'Service temporarily unavailable' };
  }
}

export function getTokenFromCookie(): string | null {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'token') {
      return decodeURIComponent(value);
    }
  }
  return null;
}

export function setTokenCookie(token: string): void {
  const maxAge = 10 * 60;
  document.cookie = `token=${encodeURIComponent(token)}; max-age=${maxAge}; path=/; SameSite=Strict`;
}

export function removeTokenCookie(): void {
  document.cookie = 'token=; max-age=0; path=/; SameSite=Strict';
}
