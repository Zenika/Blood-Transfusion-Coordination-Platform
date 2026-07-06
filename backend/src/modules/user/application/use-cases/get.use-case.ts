import { Injectable } from '@nestjs/common';
import { UserValidator } from '../validators/user.validator';

@Injectable()
export class GetUseCase {
  constructor(private readonly userValidator: UserValidator) {}
  async execute(userId: string) {
    const user = await this.userValidator.ensureUserExistsById(userId);
    return user;
  }
}
