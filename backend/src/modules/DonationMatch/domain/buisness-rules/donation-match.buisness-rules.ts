import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DonationMatchRepository } from '../repositories/donation-match.repository';
import { DonationMatchStatusEnum } from 'src/shared/enums/donation-match-status.enum';
import { DonationMatchEntity } from '../entities/donation-match.entity';

@Injectable()
export class DonationMatchBuisnessRules {
  constructor(
    private readonly donationMatchRepository: DonationMatchRepository,
  ) {}
  async ensureDonationMatchExists(donationMatchId: string) {
    const DonationMatch =
      await this.donationMatchRepository.findById(donationMatchId);
    if (!DonationMatch) throw new NotFoundException('Donation match not found');
    return DonationMatch;
  }
  ensureStatusTransitionIsValid(
    currentStatus: DonationMatchStatusEnum,
    newStatus: DonationMatchStatusEnum,
  ) {
    const allowedTransitions: Record<
      DonationMatchStatusEnum,
      DonationMatchStatusEnum[]
    > = {
      [DonationMatchStatusEnum.PENDING]: [
        DonationMatchStatusEnum.PENDING,
        DonationMatchStatusEnum.ACCEPTED,
        DonationMatchStatusEnum.CANCELLED,
      ],

      [DonationMatchStatusEnum.ACCEPTED]: [
        DonationMatchStatusEnum.ACCEPTED,
        DonationMatchStatusEnum.CANCELLED,
      ],

      [DonationMatchStatusEnum.CANCELLED]: [DonationMatchStatusEnum.CANCELLED],
      [DonationMatchStatusEnum.EXPIRED]: [DonationMatchStatusEnum.EXPIRED],
      [DonationMatchStatusEnum.DECLINED]: [DonationMatchStatusEnum.DECLINED],
    };

    if (!allowedTransitions[currentStatus].includes(newStatus)) {
      throw new BadRequestException(
        `Invalid status transition from ${currentStatus} to ${newStatus}`,
      );
    }
  }
  ensureDonationMatchCanBeUpdated(donationMatch: DonationMatchEntity) {
    if (donationMatch.status !== DonationMatchStatusEnum.PENDING)
      throw new BadRequestException("DonationMatch can't be modified");
  }
}
