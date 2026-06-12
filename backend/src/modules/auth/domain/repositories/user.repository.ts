export abstract class UserRepository {
  abstract create(data: any): Promise<any>;
  abstract findByEmail(email: string): Promise<any>;
}
