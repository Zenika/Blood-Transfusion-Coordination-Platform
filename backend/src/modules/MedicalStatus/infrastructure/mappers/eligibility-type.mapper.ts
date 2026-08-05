import { EligibilityStatus as PrismaEligibilityStatus } from '@prisma/client';
import { EligibilityStatus as DomainEligibilityStatus } from 'src/shared/enums/eligibility-status.enum';

export class EligibilityStatusMapper {
  static toDomain(type: PrismaEligibilityStatus): DomainEligibilityStatus {
    return type as DomainEligibilityStatus;
  }
  static toPrisma(type: DomainEligibilityStatus): PrismaEligibilityStatus {
    return type;
  }
}
