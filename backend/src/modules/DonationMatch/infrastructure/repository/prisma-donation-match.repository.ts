import { CreateDonationMatchData } from 'src/shared/types/create-donation-match-data.type';
import { DonationMatchEntity } from '../../domain/entities/donation-match.entity';
import { DonationMatchRepository } from '../../domain/repositories/donation-match.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { DonationMatchMapper } from '../mappers/donation-match.mapper';
import { Injectable } from '@nestjs/common';
import { DonationMatchStatusEnum } from 'src/shared/enums/donation-match-status.enum';
@Injectable()
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
  async findById(donationMatchId: string): Promise<DonationMatchEntity | null> {
    const donationMatch = await this.prisma.donationMatch.findUnique({
      where: { id: donationMatchId },
    });
    return donationMatch ? DonationMatchMapper.toDomain(donationMatch) : null;
  }
  async updateStatus(
    donationMatchId: string,
    status: DonationMatchStatusEnum,
  ): Promise<DonationMatchEntity> {
    const donationMatch = await this.prisma.donationMatch.update({
      where: { id: donationMatchId },
      data: { status: status },
    });
    return DonationMatchMapper.toDomain(donationMatch);
  }
}
