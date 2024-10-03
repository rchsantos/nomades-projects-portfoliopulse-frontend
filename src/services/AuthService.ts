const API_URL = process.env.REACT_APP_API_URL;
console.log('API_URL:', API_URL);

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  fullName?: string;
}

export interface RegisterResponse {
  accessToken: string;
  refreshToken: string;
}

export async function register(data: RegisterData): Promise<RegisterResponse> {

  const response = await fetch(
    `${API_URL}/register`, 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  });

  console.log('Data: ', data);

  console.log('Response:', response);

  if (!response.ok) {
    const message = await response.json();
    console.error('Resposne:', message);
    throw new Error(message.detail ||'Registration failed');
  }

  return await response.json();
}

export interface LoginData {
  username: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export async function login(data: LoginData): Promise<AuthResponse> {

  console.log('Data:', data);

  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'content-type' : 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const message = await response.json();
    throw new Error(message.detail || 'Login failed');
  }

  return await response.json();

}