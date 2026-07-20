import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BloodRequestRepository } from '../../domain/repositories/blood-request.repository';
import { UserRepository } from 'src/modules/user/domain/repositories/user.repository';
import { BloodRequestStatus } from 'src/shared/enums/blood-request-status.enum';
import { BloodRequestEntity } from '../../domain/entities/blood-request.entity';

@Injectable()
export class BloodRequestValidator {
  constructor(
    private readonly bloodRequestRepository: BloodRequestRepository,
    private readonly userRepository: UserRepository,
  ) {}
  async ensureBloodRequestExists(id: string) {
    const bloodRequest = await this.bloodRequestRepository.findById(id);
    if (!bloodRequest) throw new NotFoundException('Blood request not found');
    return bloodRequest;
  }
  ensureUserOwnsBloodRequest(bloodRequest: BloodRequestEntity, userId: string) {
    if (bloodRequest.patientId !== userId) {
      throw new ForbiddenException(
        'User is not allowed to update this blood request',
      );
    }
  }
  ensureQuantityIsPositive(quantity: number | undefined) {
    if (!quantity) return;
    if (quantity <= 0) throw new ConflictException('Quantity value not valid');
  }
  ensureStatusTransitionIsValid(
    currentStatus: BloodRequestStatus,
    newStatus: BloodRequestStatus,
  ) {
    const allowedTransitions: Record<BloodRequestStatus, BloodRequestStatus[]> =
      {
        [BloodRequestStatus.PENDING]: [
          BloodRequestStatus.PENDING,
          BloodRequestStatus.MATCHING,
          BloodRequestStatus.CANCELLED,
        ],

        [BloodRequestStatus.MATCHING]: [
          BloodRequestStatus.MATCHING,
          BloodRequestStatus.ACCEPTED,
          BloodRequestStatus.CANCELLED,
        ],

        [BloodRequestStatus.ACCEPTED]: [
          BloodRequestStatus.ACCEPTED,
          BloodRequestStatus.COMPLETED,
        ],

        [BloodRequestStatus.COMPLETED]: [BloodRequestStatus.COMPLETED],

        [BloodRequestStatus.CANCELLED]: [BloodRequestStatus.CANCELLED],
      };

    if (!allowedTransitions[currentStatus].includes(newStatus)) {
      throw new BadRequestException(
        `Invalid status transition from ${currentStatus} to ${newStatus}`,
      );
    }
  }
}
