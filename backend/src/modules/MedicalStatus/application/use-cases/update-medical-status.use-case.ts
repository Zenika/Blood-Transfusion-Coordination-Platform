import { Injectable } from '@nestjs/common';
import { UpdateMedicalStatusDto } from '../../presentation/dto/update-medical-status.dto';
import { MedicalStatusEntity } from '../../domain/entities/medical-status.entity';
import { MedicalStatusRepository } from '../../domain/repositories/medical-status.repository';
import { UpdateMedicalStatusData } from 'src/shared/types/update-medical-status-data.type';
import { MedicalStatusValidator } from '../validators/medical-status.validator';
import { UserValidator } from 'src/modules/user/application/validators/user.validator';
import { MedicalStatusBuisnessRules } from '../../domain/buisness-rules/medical-status.rules';

@Injectable()
export class UpdateMedicalStatusUseCase {
  constructor(
    private readonly medicalStatusRepository: MedicalStatusRepository,
    private readonly medicalStatusValidator: MedicalStatusValidator,
    private readonly medicalStatusBuisnessRules: MedicalStatusBuisnessRules,
    private readonly userValidator: UserValidator,
  ) {}
  async execute(
    data: UpdateMedicalStatusDto,
    userId: string,
  ): Promise<MedicalStatusEntity> {
    const newDonationDate: Date | null = data.lastDonationDate
      ? new Date(data.lastDonationDate)
      : null;
    await this.userValidator.ensureUserExistsById(userId);

    const medicalStatus =
      await this.medicalStatusValidator.ensureMedicalStatusExists(userId);

    this.medicalStatusValidator.ensureDateValid(newDonationDate);

    this.medicalStatusBuisnessRules.ensureMinimumDonationAge(
      newDonationDate,
      medicalStatus.dateOfBirth,
    );

    this.medicalStatusBuisnessRules.ensureDonationDateInPast(newDonationDate);

    this.medicalStatusBuisnessRules.ensureDonationDateIsAfterPreviousDonation(
      newDonationDate,
    );

    this.medicalStatusBuisnessRules.ensureDonationIntervalRespected(
      medicalStatus.lastDonationDate,
      newDonationDate,
      medicalStatus.gender,
    );

    const updateMedicalStatusData: Partial<UpdateMedicalStatusData> =
      Object.fromEntries(
        Object.entries(data).filter(([, value]) => value !== undefined),
      );
    return this.medicalStatusRepository.updateMedicalStatus(
      updateMedicalStatusData,
      userId,
    );
  }
}
