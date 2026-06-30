import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MedicalStatusRepository } from '../../domain/repositories/medical-status.repository';
import { CreateMedicalStatusDto } from '../../presentation/dto/create-medical-status.dto';
import { CreateMedicalStatusReponseType } from 'src/shared/types/create-medical-status-reponse.type';
import { UserRepository } from 'src/modules/user/domain/repositories/user.repository';

@Injectable()
export class CreateMedicalStatusUseCase {
  constructor(
    private readonly medicalStatusRepository: MedicalStatusRepository,
    private readonly userRepository: UserRepository,
  ) {}
  async execute(
    data: CreateMedicalStatusDto,
    userId: string,
  ): Promise<CreateMedicalStatusReponseType> {
    if (!userId) throw new BadRequestException('User ID required');
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    const existingMedicalStatus =
      await this.medicalStatusRepository.findByUserId(userId);
    if (existingMedicalStatus)
      throw new ConflictException('Medical status aleardy exists');
    const createMedicalStatusData = {
      userId: userId,
      gender: data.gender,
      dateOfBirth: new Date(data.dateOfBirth),
      lastDonationDate: data.lastDonationDate
        ? new Date(data.lastDonationDate)
        : null,
      height: data.height ?? null,
      medicalNotes: data.medicalNotes ?? null,
      weight: data.weight,
      bloodType: data.bloodType,
    };
    return await this.medicalStatusRepository.create({
      ...createMedicalStatusData,
    });
  }
}
