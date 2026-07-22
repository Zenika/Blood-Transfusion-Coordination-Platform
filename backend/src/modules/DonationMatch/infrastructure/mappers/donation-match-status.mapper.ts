import { DonationMatchStatus as DonationMatchStatusPrisma } from '@prisma/client';
import { DonationMatchStatusEnum as DonationMatchStatusDomain } from 'src/shared/enums/donation-match-status.enum';

export class DonationMatchStatusMapper {
  static toDomain(type: DonationMatchStatusPrisma): DonationMatchStatusDomain {
    return type as DonationMatchStatusDomain;
  }
}
