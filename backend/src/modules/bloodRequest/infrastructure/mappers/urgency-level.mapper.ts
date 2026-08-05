import { UrgencyLevel as UrgencyLevelPrisma } from '@prisma/client';
import { UrgencyLevel as UrgencyLevelDomain } from 'src/shared/enums/urgency-level.enum';

export class UrgencyLevelMapper {
  static toPrisma(type: UrgencyLevelDomain): UrgencyLevelPrisma {
    return type;
  }
  static toDomain(type: UrgencyLevelPrisma): UrgencyLevelDomain {
    return type as UrgencyLevelDomain;
  }
}
