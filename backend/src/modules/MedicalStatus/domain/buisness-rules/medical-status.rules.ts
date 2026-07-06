import { BadRequestException, Injectable } from '@nestjs/common';
import { Gender } from 'src/shared/enums/gender.enum';

@Injectable()
export class MedicalStatusBuisnessRules {
  ensureMinimumDonationAge(
    donationDate: Date | null,
    dateOfBirth?: Date,
  ): void {
    if (
      donationDate === undefined ||
      donationDate === null ||
      dateOfBirth === undefined ||
      dateOfBirth === null
    )
      return;

    const minAge = new Date(dateOfBirth);
    minAge.setFullYear(minAge.getFullYear() + 17);
    if (donationDate.getTime() < minAge.getTime())
      throw new BadRequestException(
        'User must be at least 17 year on the donation date',
      );
  }
  ensureDonationDateInPast(donationDate: Date | null): void {
    if (donationDate === undefined || donationDate === null) return;
    const now = new Date();
    if (donationDate > now)
      throw new BadRequestException('Donation date must be in the past');
  }
  ensureDonationDateIsAfterPreviousDonation(
    newDonationDate?: Date | null,
    previousDonationDate?: Date | null,
  ): void {
    if (
      newDonationDate === null ||
      newDonationDate === undefined ||
      newDonationDate === null ||
      newDonationDate === null
    )
      return;
    if (previousDonationDate && newDonationDate <= previousDonationDate) {
      throw new BadRequestException(
        'New last donation date must be after the current last donation date',
      );
    }
  }
  ensureDonationIntervalRespected(
    previousDonationDate: Date | null,
    newDonationDate: Date | null,
    gender: Gender,
  ): void {
    if (
      previousDonationDate === undefined ||
      previousDonationDate === null ||
      newDonationDate === undefined ||
      newDonationDate === null
    )
      return;

    const MaleMinInterval = 56;
    const FemaleMinInterval = 84;
    const nextAllowedDonationDate = new Date(previousDonationDate);

    if (gender === Gender.MALE)
      nextAllowedDonationDate.setDate(
        previousDonationDate.getDate() + MaleMinInterval,
      );
    else if (gender === Gender.FEMALE)
      nextAllowedDonationDate.setDate(
        previousDonationDate.getDate() + FemaleMinInterval,
      );

    if (newDonationDate < nextAllowedDonationDate)
      throw new BadRequestException(
        `At least ${gender === Gender.MALE ? MaleMinInterval : FemaleMinInterval} days must separate two donations`,
      );
  }
}
