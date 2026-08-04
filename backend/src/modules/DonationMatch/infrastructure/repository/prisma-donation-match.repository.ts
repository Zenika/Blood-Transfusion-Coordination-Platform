import { CreateDonationMatchData } from 'src/shared/types/create-donation-match-data.type';
import { DonationMatchEntity } from '../../domain/entities/donation-match.entity';
import { DonationMatchRepository } from '../../domain/repositories/donation-match.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { DonationMatchMapper } from '../mappers/donation-match.mapper';
import { Injectable } from '@nestjs/common';
import { DonationMatchStatusEnum } from 'src/shared/enums/donation-match-status.enum';
import { DonationMatchStatus } from '@prisma/client';
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
  async findByBloodRequest(
    bloodRequestId: string,
  ): Promise<DonationMatchEntity[] | null> {
    const donationMatches = await this.prisma.donationMatch.findMany({
      where: { bloodRequestId },
    });
    if (!Array.isArray(donationMatches) || donationMatches.length === 0)
      return null;
    return donationMatches.map((dm) => DonationMatchMapper.toDomain(dm));
  }

  async updateOtherMatchesStatus(
    bloodrequestId: string,
    acceptedMatchId: string,
    status: DonationMatchStatusEnum,
  ) {
    const donationMatches = await this.prisma.donationMatch.updateMany({
      where: {
        bloodRequestId: bloodrequestId,
        id: {
          not: acceptedMatchId,
        },
      },
      data: {
        status: status,
      },
    });
  }
  async countPendingByBloodRequest(bloodRequestId: string): Promise<number> {
    const donationMatches = await this.prisma.donationMatch.findMany({
      where: {
        bloodRequestId,
        status: DonationMatchStatus.PENDING,
      },
    });
    return donationMatches.length;
  }
  async findByDonorId(donorId: string): Promise<DonationMatchEntity[]> {
    const donationMatches = await this.prisma.donationMatch.findMany({
      where: { donorId },
    });
    return donationMatches.map((dm) => DonationMatchMapper.toDomain(dm));
  }
}
