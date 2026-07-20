import {
  createBloodRequestDto,
  UpdateBloodRequestDto,
} from 'src/presentation/dto/blood-request.dto';
import { CreateBloodRequestData } from 'src/shared/types/create-blood-request-data.type';
import { UpdateBloodRequestData } from 'src/shared/types/update-blood-request.type';

export class BloodRequestDtoMapper {
  static toDomain(
    dto: createBloodRequestDto,
    userId: string,
  ): CreateBloodRequestData {
    return {
      patientId: userId,
      bloodType: dto.bloodType,
      urgencyLevel: dto.urgencyLevel,
      status: dto.status,
      medicalReason: dto.medicalReason ? dto.medicalReason : null,
      quantity: dto.quantity ?? null,
    };
  }
  static updateDtoToDomain(dto: UpdateBloodRequestDto): UpdateBloodRequestData {
    return {
      bloodType: dto.bloodType,
      urgencyLevel: dto.urgencyLevel,
      status: dto.status,
      medicalReason: dto.medicalReason,
      quantity: dto.quantity,
    };
  }
}
