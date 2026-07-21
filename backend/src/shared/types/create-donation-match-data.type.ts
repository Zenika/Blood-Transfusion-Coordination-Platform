import { DonationMatchStatusEnum } from '../enums/donation-match-status.enum';

export type CreateDonationMatchData = {
  bloodRequestId: string;
  donorId: string;
  status: DonationMatchStatusEnum;
};
