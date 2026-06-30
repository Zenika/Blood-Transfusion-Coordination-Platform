import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateMedicalStatusDto } from '../../presentation/dto/update-medical-status.dto';
import { MedicalStatusEntity } from '../../domain/entities/medical-status.entity';
import { MedicalStatusRepository } from '../../domain/repositories/medical-status.repository';
import { UpdateMedicalStatusData } from 'src/shared/types/update-medical-status-data.type';
import { UserRepository } from 'src/modules/user/domain/repositories/user.repository';

@Injectable()
export class UpdateMedicalStatusUseCase {
  constructor(
    private readonly medicalStatusRepository: MedicalStatusRepository,
    private readonly userRepository: UserRepository,
  ) {}
  async execute(
    data: UpdateMedicalStatusDto,
    userId: string,
  ): Promise<MedicalStatusEntity> {
    if (!userId) throw new BadRequestException('ID required');
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    const existingMedicalStatus =
      await this.medicalStatusRepository.findByUserId(userId);
    if (!existingMedicalStatus)
      throw new NotFoundException('Medical status not found');
    const updateMedicalStatusData: Partial<UpdateMedicalStatusData> = {};
    if (data.gender !== undefined) {
      updateMedicalStatusData.gender = data.gender;
    }
    if (data.bloodType !== undefined) {
      updateMedicalStatusData.bloodType = data.bloodType;
    }
    if (data.dateOfBirth !== undefined) {
      updateMedicalStatusData.dateOfBirth = new Date(data.dateOfBirth);
    }
    if (data.eligibilityStatus !== undefined) {
      updateMedicalStatusData.eligibilityStatus = data.eligibilityStatus;
    }
    if (data.height !== undefined) {
      updateMedicalStatusData.height = data.height;
    }
    if (data.weight !== undefined) {
      updateMedicalStatusData.weight = data.weight;
    }
    if (data.medicalNotes !== undefined) {
      updateMedicalStatusData.medicalNotes = data.medicalNotes;
    }
    if (data.lastDonationDate !== undefined) {
      updateMedicalStatusData.lastDonationDate = new Date(
        data.lastDonationDate,
      );
    }
    return this.medicalStatusRepository.updateMedicalStatus(
      userId,
      updateMedicalStatusData,
    );
  }
}
