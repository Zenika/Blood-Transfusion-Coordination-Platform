import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { BloodRequestStatus } from 'src/shared/enums/blood-request-status.enum';

@Injectable()
export class BloodRequestBuisnessRules {
  ensureQuantityIsPositive(quantity: number | undefined) {
    if (quantity === undefined) return;
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
