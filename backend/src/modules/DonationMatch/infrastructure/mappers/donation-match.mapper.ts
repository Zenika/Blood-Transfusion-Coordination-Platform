import { DonationMatch as DonationMatchPersistence } from '@prisma/client';
import { DonationMatchEntity } from '../../domain/entities/donation-match.entity';
import { DonationMatchStatusMapper } from './donation-match-status.mapper';

export class DonationMatchMapper {
  static toDomain(data: DonationMatchPersistence): DonationMatchEntity {
    return {
      id: data.id,
      donorId: data.donorId,
      bloodRequestId: data.bloodRequestId,
      status: DonationMatchStatusMapper.toDomain(data.status),
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
  static toPersistence(data: DonationMatchEntity): DonationMatchPersistence {
    return {
      id: data.id,
      bloodRequestId: data.bloodRequestId,
      donorId: data.donorId,
      status: data.status,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}
