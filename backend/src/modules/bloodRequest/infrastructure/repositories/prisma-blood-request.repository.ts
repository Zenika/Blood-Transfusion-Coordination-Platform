import { CreateBloodRequestData } from 'src/shared/types/create-blood-request-data.type';
import { BloodRequestEntity } from '../../domain/entities/blood-request.entity';
import { BloodRequestRepository } from '../../domain/repositories/blood-request.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { BloodRequestStatusMapper } from '../mappers/blood-request-status.mapper';
import { UrgencyLevelMapper } from '../mappers/urgency-level.mapper';
import { BloodTypeMapper } from 'src/modules/MedicalStatus/infrastructure/mappers/blood-type.mapper';
import { BloodRequestMapper } from '../mappers/blood-request.mapper';
import { UpdateBloodRequestData } from 'src/shared/types/update-blood-request.type';
import { BloodRequestStatus } from 'src/shared/enums/blood-request-status.enum';

export class PrismaBloodRequestRepository implements BloodRequestRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    patientId: string,
    data: CreateBloodRequestData,
  ): Promise<BloodRequestEntity> {
    const BloodRequest = await this.prisma.bloodRequest.create({
      data: {
        patient: {
          connect: { id: patientId },
        },
        bloodType: BloodTypeMapper.toPrisma(data.bloodType),
        urgencyLevel: UrgencyLevelMapper.toPrisma(data.urgencyLevel),
        status: BloodRequestStatusMapper.toPrisma(data.status),
        medicalReason: data.medicalReason,
        quantity: data.quantity,
      },
    });
    return BloodRequestMapper.toDomain(BloodRequest);
  }

  async findById(bloodRequestId: string): Promise<BloodRequestEntity | null> {
    const bloodRequest = await this.prisma.bloodRequest.findUnique({
      where: { id: bloodRequestId },
    });
    return bloodRequest ? BloodRequestMapper.toDomain(bloodRequest) : null;
  }
  async findBloodRequestsByUserId(
    userId: string,
  ): Promise<BloodRequestEntity[] | null> {
    const bloodRequests = await this.prisma.bloodRequest.findMany({
      where: { patientId: userId },
    });
    return bloodRequests
      ? bloodRequests.map((br) => BloodRequestMapper.toDomain(br))
      : null;
  }

  async update(
    bloodRequestId: string,
    data: UpdateBloodRequestData,
  ): Promise<BloodRequestEntity> {
    const updatedData = BloodRequestMapper.toUpdateInput(data);
    const updatedBloodRequest = await this.prisma.bloodRequest.update({
      where: { id: bloodRequestId },
      data: updatedData,
    });
    return BloodRequestMapper.toDomain(updatedBloodRequest);
  }

  async updateBloodRequestStatus(
    bloodRequestId: string,
    status: BloodRequestStatus,
  ): Promise<BloodRequestEntity> {
    const updatedBloodRequest = await this.prisma.bloodRequest.update({
      where: { id: bloodRequestId },
      data: { status: BloodRequestStatusMapper.toPrisma(status) },
    });
    return BloodRequestMapper.toDomain(updatedBloodRequest);
  }
}
