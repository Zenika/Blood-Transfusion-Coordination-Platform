import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MedicalStatusRepository } from '../../domain/repositories/medical-status.repository';
import { MedicalStatusEntity } from '../../domain/entities/medical-status.entity';
import { MedicalStatusMapper } from '../../infrastructure/mappers/medical-status.mapper';

@Injectable()
export class GetMedicalStatusUseCase {
  constructor(
    private readonly medicalStatusRepository: MedicalStatusRepository,
  ) {}

  async execute(userId: string): Promise<MedicalStatusEntity> {
    if (!userId) throw new BadRequestException('User ID required');
    const user = await this.medicalStatusRepository.findUserById(userId);
    if (!user) throw new NotFoundException('User not found');
    const medicalStatus = await this.medicalStatusRepository.findById(userId);
    if (!medicalStatus) throw new NotFoundException('medical status not found');
    return MedicalStatusMapper.toDomain(medicalStatus);
  }
}
