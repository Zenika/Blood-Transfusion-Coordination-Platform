import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MedicalStatusRepository } from '../../domain/repositories/medical-status.repository';
import { MedicalStatusEntity } from '../../domain/entities/medical-status.entity';
import { UserRepository } from 'src/modules/user/domain/repositories/user.repository';

@Injectable()
export class GetMedicalStatusUseCase {
  constructor(
    private readonly medicalStatusRepository: MedicalStatusRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(userId: string): Promise<MedicalStatusEntity> {
    if (!userId) throw new BadRequestException('User ID required');
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    const medicalStatus =
      await this.medicalStatusRepository.findByUserId(userId);
    if (!medicalStatus) throw new NotFoundException('medical status not found');
    return medicalStatus;
  }
}
