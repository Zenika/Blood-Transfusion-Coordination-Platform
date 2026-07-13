import { Injectable } from '@nestjs/common';
import { MedicalStatusValidator } from 'src/modules/MedicalStatus/application/validators/medical-status.validator';
import { MedicalStatusBuisnessRules } from 'src/modules/MedicalStatus/domain/buisness-rules/medical-status.rules';
import { MedicalStatusEntity } from 'src/modules/MedicalStatus/domain/entities/medical-status.entity';
import { MedicalStatusRepository } from 'src/modules/MedicalStatus/domain/repositories/medical-status.repository';
import { MedicalStatusDtoMapper } from 'src/modules/MedicalStatus/infrastructure/mappers/medical-status-dto.mapper';
import { CreateMedicalStatusDto } from 'src/modules/MedicalStatus/presentation/dto/create-medical-status.dto';
import { UpdatelastDonationDateDto } from 'src/modules/MedicalStatus/presentation/dto/last-donation-date.dto';
import { UpdateMedicalStatusDto } from 'src/modules/MedicalStatus/presentation/dto/update-medical-status.dto';
import { UserValidator } from 'src/modules/user/application/validators/user.validator';
import { CreateMedicalStatusReponseType } from 'src/shared/types/create-medical-status-reponse.type';
import { UpdateMedicalStatusData } from 'src/shared/types/update-medical-status-data.type';

@Injectable()
export class CreateMedicalStatusUseCase {
  constructor(
    private readonly medicalStatusRepository: MedicalStatusRepository,
    private readonly medicalStatusBuisnessRules: MedicalStatusBuisnessRules,
  ) {}
  async execute(
    data: CreateMedicalStatusDto,
    userId: string,
  ): Promise<CreateMedicalStatusReponseType> {
    const createMedicalStatusData = MedicalStatusDtoMapper.toDomain(data);
    this.medicalStatusBuisnessRules.ensureDonationDateInPast(
      createMedicalStatusData.lastDonationDate,
    );
    this.medicalStatusBuisnessRules.ensureMinimumDonationAge(
      createMedicalStatusData.lastDonationDate,
      createMedicalStatusData.dateOfBirth,
    );

    return await this.medicalStatusRepository.create(
      createMedicalStatusData,
      userId,
    );
  }
}

@Injectable()
export class GetMedicalStatusUseCase {
  constructor(
    private readonly medicalStatusValidator: MedicalStatusValidator,
    private readonly userValidator: UserValidator,
  ) {}
  async execute(userId: string): Promise<MedicalStatusEntity> {
    await this.userValidator.ensureUserExistsById(userId);
    const medicalStatus =
      await this.medicalStatusValidator.ensureMedicalStatusExists(userId);
    return medicalStatus;
  }
}

@Injectable()
export class UpdateMedicalStatusUseCase {
  constructor(
    private readonly medicalStatusRepository: MedicalStatusRepository,
    private readonly medicalStatusValidator: MedicalStatusValidator,
    private readonly medicalStatusBuisnessRules: MedicalStatusBuisnessRules,
    private readonly userValidator: UserValidator,
  ) {}
  async execute(
    data: UpdateMedicalStatusDto,
    userId: string,
  ): Promise<MedicalStatusEntity> {
    const newDonationDate: Date | null = data.lastDonationDate
      ? new Date(data.lastDonationDate)
      : null;
    await this.userValidator.ensureUserExistsById(userId);

    const medicalStatus =
      await this.medicalStatusValidator.ensureMedicalStatusExists(userId);

    this.medicalStatusValidator.ensureDateValid(newDonationDate);

    this.medicalStatusBuisnessRules.ensureMinimumDonationAge(
      newDonationDate,
      medicalStatus.dateOfBirth,
    );

    this.medicalStatusBuisnessRules.ensureDonationDateInPast(newDonationDate);

    this.medicalStatusBuisnessRules.ensureDonationDateIsAfterPreviousDonation(
      newDonationDate,
    );

    this.medicalStatusBuisnessRules.ensureDonationIntervalRespected(
      medicalStatus.lastDonationDate,
      newDonationDate,
      medicalStatus.gender,
    );

    const updateMedicalStatusData: Partial<UpdateMedicalStatusData> =
      Object.fromEntries(
        Object.entries(data).filter(([, value]) => value !== undefined),
      );
    return this.medicalStatusRepository.updateMedicalStatus(
      updateMedicalStatusData,
      userId,
    );
  }
}

@Injectable()
export class UpdateLastDonationDateUseCase {
  constructor(
    private readonly userValidator: UserValidator,
    private readonly medicalStatusRepository: MedicalStatusRepository,
    private readonly medicalStatusValidator: MedicalStatusValidator,
    private readonly medicalStatusBuisnessRules: MedicalStatusBuisnessRules,
  ) {}
  async execute(userId: string, data: UpdatelastDonationDateDto) {
    const newDonationDate = new Date(data.date);
    await this.userValidator.ensureUserExistsById(userId);
    const medicalStatus =
      await this.medicalStatusValidator.ensureMedicalStatusExists(userId);
    this.medicalStatusValidator.ensureDateValid(newDonationDate);
    this.medicalStatusBuisnessRules.ensureMinimumDonationAge(
      newDonationDate,
      medicalStatus.dateOfBirth,
    );
    this.medicalStatusBuisnessRules.ensureDonationDateInPast(newDonationDate);
    this.medicalStatusBuisnessRules.ensureDonationDateIsAfterPreviousDonation(
      newDonationDate,
    );
    this.medicalStatusBuisnessRules.ensureDonationIntervalRespected(
      medicalStatus.lastDonationDate,
      newDonationDate,
      medicalStatus.gender,
    );
    return await this.medicalStatusRepository.updateLastDonationDate(
      userId,
      newDonationDate,
    );
  }
}
