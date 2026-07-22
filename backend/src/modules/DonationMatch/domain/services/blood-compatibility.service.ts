import { BloodType } from 'src/shared/enums/blood-type.enum';

export class BloodCompatibilityService {
  static getCompatibleDonorBloodTypes(
    patientBloodType: BloodType,
  ): BloodType[] {
    switch (patientBloodType) {
      case BloodType.AB_POSITIVE:
        return [
          BloodType.AB_NEGATIVE,
          BloodType.AB_POSITIVE,
          BloodType.A_NEGATIVE,
          BloodType.A_POSITIVE,
          BloodType.B_NEGATIVE,
          BloodType.B_POSITIVE,
          BloodType.O_NEGATIVE,
          BloodType.O_POSITIVE,
        ];
      case BloodType.AB_NEGATIVE:
        return [
          BloodType.O_NEGATIVE,
          BloodType.A_NEGATIVE,
          BloodType.B_NEGATIVE,
          BloodType.AB_NEGATIVE,
        ];
      case BloodType.A_NEGATIVE:
        return [BloodType.O_NEGATIVE, BloodType.A_NEGATIVE];
      case BloodType.A_POSITIVE:
        return [
          BloodType.O_POSITIVE,
          BloodType.O_NEGATIVE,
          BloodType.A_POSITIVE,
          BloodType.A_NEGATIVE,
        ];
      case BloodType.B_NEGATIVE:
        return [BloodType.O_NEGATIVE, BloodType.B_NEGATIVE];
      case BloodType.B_POSITIVE:
        return [
          BloodType.O_POSITIVE,
          BloodType.O_NEGATIVE,
          BloodType.B_POSITIVE,
          BloodType.B_NEGATIVE,
        ];
      case BloodType.O_NEGATIVE:
        return [BloodType.O_NEGATIVE];
      case BloodType.O_POSITIVE:
        return [BloodType.O_POSITIVE, BloodType.O_NEGATIVE];
      default:
        return [];
    }
  }
}
