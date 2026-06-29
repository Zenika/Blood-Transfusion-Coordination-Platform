import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdatelastDonationDateDto } from '../../presentation/dto/last-donation-date.dto';
import { MedicalStatusRepository } from '../../domain/repositories/medical-status.repository';

@Injectable()
export class UpdateLastDonationDateUseCase {
  constructor(
    private readonly medicalStatusRepository: MedicalStatusRepository,
  ) {}
  async execute(userId: string, data: UpdatelastDonationDateDto) {
    const now = new Date();
    const newDonationDate = new Date(data.date);
    if (!userId) throw new BadRequestException('User ID required');
    const user = await this.medicalStatusRepository.findUserById(userId);
    if (!user) throw new NotFoundException('User not found');
    const medicalStatus = await this.medicalStatusRepository.findById(userId);
    if (!medicalStatus)
      throw new NotFoundException('User does not have a medical status');
    if (isNaN(newDonationDate.getTime()))
      throw new BadRequestException('Invalid Donation Date');
    const legalDonationDate = new Date(medicalStatus.dateOfBirth);
    legalDonationDate.setFullYear(legalDonationDate.getFullYear() + 17);
    if (newDonationDate < legalDonationDate)
      throw new BadRequestException(
        'User must be at least 17 year on the donation date',
        `${legalDonationDate.toString()} ${newDonationDate.toString()} `,
      );
    if (newDonationDate > now)
      throw new BadRequestException('Donation date must be in the past');

    const previousDonationDate = medicalStatus?.lastDonationDate;
    if (previousDonationDate && newDonationDate <= previousDonationDate) {
      throw new BadRequestException(
        'New last donation date must be after the current last donation date',
      );
    }
    if (previousDonationDate) {
      const nextAllowedDonationDate = new Date(previousDonationDate);
      nextAllowedDonationDate.setDate(previousDonationDate.getDate() + 84);
      if (newDonationDate < nextAllowedDonationDate)
        throw new BadRequestException(
          'At least 84 days must separate two donations',
        );
    }

    return await this.medicalStatusRepository.updateLastDonationDate(
      userId,
      newDonationDate,
    );
  }
}
