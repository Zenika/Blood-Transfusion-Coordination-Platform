import { DonationMatchStatusEnum } from 'src/shared/enums/donation-match-status.enum';

export class DonationMatchEntity {
  id!: string;
  donorId!: string;
  bloodRequestId!: string;
  status!: DonationMatchStatusEnum;
  createdAt!: Date;
  updatedAt!: Date;
}
