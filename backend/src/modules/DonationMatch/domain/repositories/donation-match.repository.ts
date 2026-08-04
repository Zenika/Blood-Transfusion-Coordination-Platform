import { CreateDonationMatchData } from 'src/shared/types/create-donation-match-data.type';
import { DonationMatchEntity } from '../entities/donation-match.entity';
import { DonationMatchStatusEnum } from 'src/shared/enums/donation-match-status.enum';

export abstract class DonationMatchRepository {
  abstract create(
    donationMatche: CreateDonationMatchData,
  ): Promise<DonationMatchEntity>;
  abstract findById(
    donationMatchId: string,
  ): Promise<DonationMatchEntity | null>;
  abstract updateStatus(
    donationMatchId: string,
    status: DonationMatchStatusEnum,
  ): Promise<DonationMatchEntity>;
  abstract findByBloodRequest(
    bloodRequestId: string,
  ): Promise<DonationMatchEntity[] | null>;
  abstract updateOtherMatchesStatus(
    bloodrequestId: string,
    acceptedMatchId: string,
    status: DonationMatchStatusEnum,
  );
  abstract countPendingByBloodRequest(bloodRequestId: string): Promise<number>;
}
