export class User {
  constructor(
    public username: string,
    public email: string,
    public password: string,
    public fullName: string,
    public role: string,
    public isActive: boolean
  ) {}
}
