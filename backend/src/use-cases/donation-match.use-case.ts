import { Injectable } from '@nestjs/common';
import { BloodRequestValidator } from 'src/modules/bloodRequest/application/validators/blood-request.validator';
import { BloodRequestBuisnessRules } from 'src/modules/bloodRequest/domain/buisness-rules/blood-request.rules';
import { BloodRequestRepository } from 'src/modules/bloodRequest/domain/repositories/blood-request.repository';
import { DonationMatchRepository } from 'src/modules/DonationMatch/domain/repositories/donation-match.repository';
import { BloodCompatibilityService } from 'src/modules/DonationMatch/domain/services/blood-compatibility.service';
import { MedicalStatusRepository } from 'src/modules/MedicalStatus/domain/repositories/medical-status.repository';
import { BloodRequestStatus } from 'src/shared/enums/blood-request-status.enum';
import { DonationMatchStatusEnum } from 'src/shared/enums/donation-match-status.enum';

@Injectable()
export class CreateDonationMatchesUseCase {
  constructor(
    private readonly donationMatchRepository: DonationMatchRepository,
    private readonly medicalStatusRepository: MedicalStatusRepository,
    private readonly bloodRequestValidator: BloodRequestValidator,
    private readonly bloodRequestRepository: BloodRequestRepository,
    private readonly bloodRequestBuisnessRules: BloodRequestBuisnessRules,
  ) {}
  async execute(bloodRequestId: string) {
    const bloodRequest =
      await this.bloodRequestValidator.ensureBloodRequestExists(bloodRequestId);
    this.bloodRequestBuisnessRules.ensureBloodRequestCanBeUpdated(bloodRequest);
    const compatibleBloodTypes =
      BloodCompatibilityService.getCompatibleDonorBloodTypes(
        bloodRequest.bloodType,
      );

    const donors =
      await this.medicalStatusRepository.findEligibleDonors(
        compatibleBloodTypes,
      );
    if (donors.length === 0) return bloodRequest;
    for (const donor of donors) {
      await this.donationMatchRepository.create({
        bloodRequestId: bloodRequest.id,
        donorId: donor.id,
        status: DonationMatchStatusEnum.PENDING,
      });
    }
    return await this.bloodRequestRepository.updateBloodRequestStatus(
      bloodRequestId,
      BloodRequestStatus.MATCHING,
    );
  }
}
