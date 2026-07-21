import { Injectable } from '@nestjs/common';
import { BloodRequestRepository } from '../modules/bloodRequest/domain/repositories/blood-request.repository';
import {
  createBloodRequestDto,
  UpdateBloodRequestDto,
} from 'src/presentation/dto/blood-request.dto';
import { BloodRequestDtoMapper } from 'src/modules/bloodRequest/infrastructure/mappers/blood-request-dto.mapper';
import { BloodRequestEntity } from 'src/modules/bloodRequest/domain/entities/blood-request.entity';
import { BloodRequestValidator } from 'src/modules/bloodRequest/application/validators/blood-request.validator';
import { UserValidator } from 'src/modules/user/application/validators/user.validator';
import { BloodRequestStatus } from 'src/shared/enums/blood-request-status.enum';
import { BloodRequestBuisnessRules } from 'src/modules/bloodRequest/domain/buisness-rules/blood-request.rules';

@Injectable()
export class CreateBloodRequestUseCase {
  constructor(
    private readonly bloodRequestRepository: BloodRequestRepository,
  ) {}
  async execute(userId: string, data: createBloodRequestDto) {
    const bloodRequest = BloodRequestDtoMapper.toDomain(data, userId);
    return await this.bloodRequestRepository.create(userId, bloodRequest);
  }
}

@Injectable()
export class GetBloodRequestUseCase {
  constructor(
    private readonly bloodRequestRepository: BloodRequestRepository,
    private readonly bloodRequestValidator: BloodRequestValidator,
  ) {}
  async execute(bloodRequestId: string): Promise<BloodRequestEntity | null> {
    await this.bloodRequestValidator.ensureBloodRequestExists(bloodRequestId);
    return await this.bloodRequestRepository.findById(bloodRequestId);
  }
}

@Injectable()
export class GetBloodRequestsUseCase {
  constructor(
    private readonly bloodRequestRepository: BloodRequestRepository,
    private readonly userValidator: UserValidator,
  ) {}
  async execute(userId: string) {
    await this.userValidator.ensureUserExistsById(userId);
    return await this.bloodRequestRepository.findBloodRequestsByUserId(userId);
  }
}

@Injectable()
export class UpdateBloodRequestUseCase {
  constructor(
    private readonly bloodRequestRepository: BloodRequestRepository,
    private readonly userValidator: UserValidator,
    private readonly bloodRequestValidator: BloodRequestValidator,
    private readonly bloodRequestBuisnessRules: BloodRequestBuisnessRules,
  ) {}
  async execute(
    bloodRequestId: string,
    userId: string,
    dto: UpdateBloodRequestDto,
  ) {
    await this.userValidator.ensureUserExistsById(userId);
    const bloodRequest =
      await this.bloodRequestValidator.ensureBloodRequestExists(bloodRequestId);
    this.bloodRequestBuisnessRules.ensureQuantityIsPositive(dto.quantity);
    this.bloodRequestValidator.ensureUserOwnsBloodRequest(bloodRequest, userId);
    const data = BloodRequestDtoMapper.updateDtoToDomain(dto);
    return await this.bloodRequestRepository.update(bloodRequestId, data);
  }
}

@Injectable()
export class UpdateBloodRequestStatus {
  constructor(
    private readonly bloodRequestRepository: BloodRequestRepository,
    private readonly userValidator: UserValidator,
    private readonly bloodRequestValidator: BloodRequestValidator,
    private readonly bloodRequestBuisnessRules: BloodRequestBuisnessRules,
  ) {}
  async execute(
    userId: string,
    bloodRequestId: string,
    status: BloodRequestStatus,
  ) {
    await this.userValidator.ensureUserExistsById(userId);
    const bloodRequest =
      await this.bloodRequestValidator.ensureBloodRequestExists(bloodRequestId);
    this.bloodRequestValidator.ensureUserOwnsBloodRequest(bloodRequest, userId);
    this.bloodRequestBuisnessRules.ensureStatusTransitionIsValid(
      bloodRequest.status,
      status,
    );
    return await this.bloodRequestRepository.updateBloodRequestStatus(
      bloodRequestId,
      status,
    );
  }
}
