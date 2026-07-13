import { Injectable, NotFoundException } from '@nestjs/common';
import { BloodRequestRepository } from '../../domain/repositories/blood-request.repository';

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
}
