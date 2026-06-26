import { Injectable } from '@nestjs/common';
import { MedicalStatusRepository } from '../../domain/repositories/medical-status.repository';
import { CreateMedicalStatusDto } from '../../presentation/dto/create-medical-status.dto';
import { CreateMedicalStatusReponseType } from 'src/shared/types/create-medical-status-reponse.type';
import { MedicalStatusDtoMapper } from '../../infrastructure/mappers/medical-status-dto.mapper';

@Injectable()
export class CreateMedicalStatusUseCase {
  constructor(
    private readonly medicalStatusRepository: MedicalStatusRepository,
  ) {}
  async execute(
    data: CreateMedicalStatusDto,
    userId: string,
  ): Promise<CreateMedicalStatusReponseType> {
    const createMedicalStatusData = MedicalStatusDtoMapper.toDomain(data);
    return await this.medicalStatusRepository.create(
      createMedicalStatusData,
      userId,
    );
  }
}
