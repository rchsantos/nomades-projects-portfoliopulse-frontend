import axios from 'axios';
import { RegisterResponseDTO } from "../dtos/RegisterRequestDTO";
import { UserMapper } from "../mappers/UserMapper";

const apiUrl = process.env.REACT_APP_API_URL;
console.log('API_URL:', apiUrl);

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  fullName?: string;
  role?: string;
  isActive?: boolean;
}

export interface RegisterResponse {
  accessToken: string;
  refreshToken: string;
}

export async function register(data: RegisterData): Promise<RegisterResponse> {
  console.log('Original Data:', data);

  // Map the User entity to RegisterRequestDTO
  const registerRequestDTO = UserMapper.toRegisterRequestDTO({
    ...data,
    fullName: data.fullName || '',
    role: data.role || '',
    isActive: data.isActive !== undefined ? data.isActive : true,
  });

  console.log('Mapped RegisterRequestDTO:', registerRequestDTO); 

  const response = await fetch(
    `${apiUrl}/register`, 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerRequestDTO),
  });

  console.log('Response:', response);

  if (!response.ok) {
    const message = await response.json();
    console.error('Response:', message);
    throw new Error(message.detail || 'Registration failed');
  }

  const responseData = await response.json();

  // Map the RegisterResponseDTO to User entity
  const registerResponseDTO = new RegisterResponseDTO(responseData.access_token, responseData.refresh_token);
  return {
    accessToken: registerResponseDTO.access_token,
    refreshToken: registerResponseDTO.refresh_token,
  };
}

export interface LoginData {
  username: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export const login = async ({ username, password }: LoginData) => {
  try {
    const response = await axios.post(`${apiUrl}/login`, {
      username,
      password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      const { access_token, token_type, user } = response.data;
      localStorage.setItem('accessToken', access_token);
      localStorage.setItem('tokenType', token_type);
      localStorage.setItem('user', JSON.stringify(user));
      return response.data;
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};