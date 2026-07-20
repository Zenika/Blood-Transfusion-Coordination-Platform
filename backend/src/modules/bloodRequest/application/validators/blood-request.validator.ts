import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BloodRequestRepository } from '../../domain/repositories/blood-request.repository';
import { BloodRequestEntity } from '../../domain/entities/blood-request.entity';

@Injectable()
export class BloodRequestValidator {
  constructor(
    private readonly bloodRequestRepository: BloodRequestRepository,
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
}
