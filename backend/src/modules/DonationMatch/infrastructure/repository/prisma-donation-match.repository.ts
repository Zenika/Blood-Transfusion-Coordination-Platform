import { CreateDonationMatchData } from 'src/shared/types/create-donation-match-data.type';
import { DonationMatchEntity } from '../../domain/entities/donation-match.entity';
import { DonationMatchRepository } from '../../domain/repositories/donation-match.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { DonationMatchMapper } from '../mappers/donation-match.mapper';

export class PrismaDonationMatchRepository implements DonationMatchRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateDonationMatchData): Promise<DonationMatchEntity> {
    const donationMatch = await this.prisma.donationMatch.create({
      data: {
        donor: {
          connect: {
            id: data.donorId,
          },
        },
        bloodRequest: {
          connect: {
            id: data.bloodRequestId,
          },
        },
        status: data.status,
      },
    });
    return DonationMatchMapper.toDomain(donationMatch);
  }
}
