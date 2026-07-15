import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BloodRequestRepository } from '../../domain/repositories/blood-request.repository';
import { UserRepository } from 'src/modules/user/domain/repositories/user.repository';

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
  async ensureUserOwnsBloodRequest(userId: string, bloodRequestId: string) {
    const bloodRequest =
      await this.bloodRequestRepository.findById(bloodRequestId);
    const user = await this.userRepository.findById(userId);
    if (bloodRequest?.patientId !== user?.id)
      throw new ConflictException(
        ' user not allowed to update this blood request',
      );
  }
  ensureQuantityIsPositive(quantity: number | undefined) {
    if (!quantity) return;
    if (quantity <= 0) throw new ConflictException('Qunatity value not valid');
  }
}
