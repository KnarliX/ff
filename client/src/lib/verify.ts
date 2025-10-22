export interface VerifyData {
  token: string;
  discordId: string;
  discordTag: string;
  displayName: string;
  avatar: string;
}

export interface VerifyError {
  error: string;
}

const BACKEND_URL = 'https://janvi.jarvibeta.xyz';

export async function fetchVerifyData(token: string): Promise<VerifyData> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/verify/${token}`);
    
    if (!response.ok) {
      throw new Error(`Failed to verify token: ${response.status}`);
    }
    
    const data = await response.json();
    
    if ('error' in data) {
      throw new Error(data.error);
    }
    
    return data as VerifyData;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown error occurred during verification');
  }
}

export function getOAuth2StartUrl(token: string): string {
  return `${BACKEND_URL}/oauth2/start/?token=${token}`;
}
