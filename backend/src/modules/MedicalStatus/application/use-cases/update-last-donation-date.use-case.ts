import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdatelastDonationDateDto } from '../../presentation/dto/last-donation-date.dto';
import { MedicalStatusRepository } from '../../domain/repositories/medical-status.repository';
import { UserValidator } from 'src/modules/user/application/validators/user.validator';
import { MedicalStatusValidator } from '../validators/medical-status.validator';
import { MedicalStatusBuisnessRules } from '../../domain/buisness-rules/medical-status.rules';

@Injectable()
export class UpdateLastDonationDateUseCase {
  constructor(
    private readonly userValidator: UserValidator,
    private readonly medicalStatusRepository: MedicalStatusRepository,
    private readonly medicalStatusValidator: MedicalStatusValidator,
    private readonly medicalStatusBuisnessRules: MedicalStatusBuisnessRules,
  ) {}
  async execute(userId: string, data: UpdatelastDonationDateDto) {
    const newDonationDate = new Date(data.date);
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
    return await this.medicalStatusRepository.updateLastDonationDate(
      userId,
      newDonationDate,
    );
  }
}
