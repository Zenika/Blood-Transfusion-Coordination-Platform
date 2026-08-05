import { BloodType as DomainBloodType } from 'src/shared/enums/blood-type.enum';
import { BloodType as PrismaBloodType } from '@prisma/client';

export class BloodTypeMapper {
  static toPrisma(type: DomainBloodType): PrismaBloodType {
    return type;
  }
  static toDomain(type: PrismaBloodType): DomainBloodType {
    return type as DomainBloodType;
  }
}
