import { Injectable } from '@nestjs/common';
import { createBloodRequestDto } from '../presentation/dto/create-blood-request.dto';
import { BloodRequestRepository } from '../domain/repositories/blood-request.repository';

@Injectable()
export class CreateBloodRequestUseCase {
  constructor(
    private readonly bloodRequestRepository: BloodRequestRepository,
  ) {}
  async execute(userId: string, data: createBloodRequestDto) {
    return await this.bloodRequestRepository.create(userId, data);
  }
}
