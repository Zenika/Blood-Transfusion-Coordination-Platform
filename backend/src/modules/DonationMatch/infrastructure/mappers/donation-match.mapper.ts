import { DonationMatch } from '@prisma/client';
import { DonationMatchEntity } from '../../domain/entities/donation-match.entity';
import { DonationMatchStatusMapper } from './donation-match-status.mapper';

export class DonationMatchMapper {
  static toDomain(data: DonationMatch): DonationMatchEntity {
    return {
      id: data.id,
      donorId: data.donorId,
      bloodRequestId: data.bloodRequestId,
      status: DonationMatchStatusMapper.toDomain(data.status),
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}
