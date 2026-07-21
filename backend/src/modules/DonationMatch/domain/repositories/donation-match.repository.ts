import { CreateDonationMatchData } from 'src/shared/types/create-donation-match-data.type';
import { DonationMatchEntity } from '../entities/donation-match.entity';

export abstract class DonationMatchRepository {
  abstract createMany(
    donationMatches: CreateDonationMatchData[],
  ): Promise<DonationMatchEntity[]>;
}
