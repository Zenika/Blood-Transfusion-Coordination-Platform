import { Injectable } from '@nestjs/common';
import { BloodRequestRepository } from '../modules/bloodRequest/domain/repositories/blood-request.repository';
import { createBloodRequestDto } from 'src/presentation/dto/blood-request.dto';
import { BloodRequestDtoMapper } from 'src/modules/bloodRequest/infrastructure/mappers/blood-request-dto.mapper';
import { BloodRequestEntity } from 'src/modules/bloodRequest/domain/entities/blood-request.entity';
import { BloodRequestValidator } from 'src/modules/bloodRequest/application/validators/blood-request.validator';

@Injectable()
export class CreateBloodRequestUseCase {
  constructor(
    private readonly bloodRequestRepository: BloodRequestRepository,
  ) {}
  async execute(userId: string, data: createBloodRequestDto) {
    const bloodRequest = BloodRequestDtoMapper.toDomain(data, userId);
    return await this.bloodRequestRepository.create(userId, bloodRequest);
  }
}

@Injectable()
export class GetBloodRequestUseCase {
  constructor(
    private readonly bloodRequestRepository: BloodRequestRepository,
    private readonly bloodRequestValidator: BloodRequestValidator,
  ) {}
  async execute(bloodRequestId: string): Promise<BloodRequestEntity | null> {
    await this.bloodRequestValidator.ensureBloodRequestExists(bloodRequestId);
    return await this.bloodRequestRepository.findById(bloodRequestId);
  }
}
