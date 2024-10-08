import { User } from '../types/User';
import { RegisterRequestDTO, RegisterResponseDTO } from '../dtos/RegisterRequestDTO';

export class UserMapper {
  static toRegisterRequestDTO(user: User): RegisterRequestDTO {
    return new RegisterRequestDTO(
      user.username,
      user.email,
      user.password,
      user.fullName,
      user.role,
      user.isActive
    );
  }

  static toUser(registerResponseDTO: RegisterResponseDTO): User {
    // Assuming you have a way to get the user details from the response
    return new User(
      '', // username
      '', // email
      '', // password
      '', // fullName
      '', // role
      true // isActive
    );
  }
}