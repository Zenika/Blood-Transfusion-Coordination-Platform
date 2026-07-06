import { Injectable } from '@nestjs/common';
import { MedicalStatusEntity } from '../../domain/entities/medical-status.entity';
import { MedicalStatusValidator } from '../validators/medical-status.validator';
import { UserValidator } from 'src/modules/user/application/validators/user.validator';

@Injectable()
export class GetMedicalStatusUseCase {
  constructor(
    private readonly medicalStatusValidator: MedicalStatusValidator,
    private readonly userValidator: UserValidator,
  ) {}
  async execute(userId: string): Promise<MedicalStatusEntity> {
    await this.userValidator.ensureUserExistsById(userId);
    const medicalStatus =
      await this.medicalStatusValidator.ensureMedicalStatusExists(userId);
    return medicalStatus;
  }
}
