export abstract class UserRepository {
  abstract create(data: any): Promise<any>;
}
