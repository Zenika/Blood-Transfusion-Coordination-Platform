import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { MedicalStatusRepository } from '../../domain/repositories/medical-status.repository';
import { MedicalStatusEntity } from '../../domain/entities/medical-status.entity';

@Injectable()
export class MedicalStatusValidator {
  constructor(
    private readonly medicalStatusRepository: MedicalStatusRepository,
  ) {}

  async ensureNoMedicalStatusExists(userId: string): Promise<void> {
    const medicalStatus = await this.medicalStatusRepository.findById(userId);
    if (medicalStatus)
      throw new ConflictException('Medical Status aleardy exists');
  }
  async ensureMedicalStatusExists(
    userId: string,
  ): Promise<MedicalStatusEntity> {
    const medicalStatus = await this.medicalStatusRepository.findById(userId);
    if (!medicalStatus) throw new ConflictException('Medical Status not found');
    return medicalStatus;
  }
  ensureDateValid(date?: Date | null): void {
    if (date === undefined || date === null) return;
    if (isNaN(date.getTime())) throw new BadRequestException('Date not valid');
  }
}
