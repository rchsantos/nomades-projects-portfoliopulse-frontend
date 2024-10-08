export class RegisterRequestDTO {
  constructor(
    public username: string,
    public email: string,
    public password: string,
    public full_name: string,
    public role: string,
    public is_active: boolean
  ) {}
}

export class RegisterResponseDTO {
  constructor(
    public access_token: string,
    public refresh_token: string
  ) {}
}