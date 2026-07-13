import { createBloodRequestDto } from 'src/presentation/dto/blood-request.dto';
import { CreateBloodRequestData } from 'src/shared/types/create-blood-request-data.type';

export class BloodRequestDtoMapper {
  static toDomain(
    data: createBloodRequestDto,
    userId: string,
  ): CreateBloodRequestData {
    return {
      patientId: userId,
      bloodType: data.bloodType,
      urgencyLevel: data.urgencyLevel,
      status: data.status,
      medicalReason: data.medicalReason ? data.medicalReason : null,
      quantity: data.quantity ? data.quantity : null,
    };
  }
}
