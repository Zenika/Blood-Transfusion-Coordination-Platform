import { Injectable } from '@nestjs/common';
import { BloodRequestRepository } from '../domain/repositories/blood-request.repository';
import { createBloodRequestDto } from 'src/presentation/dto/blood-request.dto';
import { BloodRequestDtoMapper } from '../infrastructure/mappers/blood-request-dto.mapper';

@Injectable()
export class CreateBloodRequestUseCase {
  constructor(
    private readonly bloodRequestRepository: BloodRequestRepository,
  ) {}
  async execute(userId: string, data: createBloodRequestDto) {
    const medicalStatus = BloodRequestDtoMapper.toDomain(data, userId);
    return await this.bloodRequestRepository.create(userId, medicalStatus);
  }
}
