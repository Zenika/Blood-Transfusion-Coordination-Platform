/// <reference types="jest" />

import { BloodRequestStatus } from 'src/shared/enums/blood-request-status.enum';
import { BloodRequestBuisnessRules } from './blood-request.rules';
import { BloodType } from 'src/shared/enums/blood-type.enum';
import { UrgencyLevel } from 'src/shared/enums/urgency-level.enum';

describe('Ensure quantity positive', () => {
  let bloodRequestBuisnessRules: BloodRequestBuisnessRules;
  beforeEach(() => {
    bloodRequestBuisnessRules = new BloodRequestBuisnessRules();
  });
  it('should ensure quantity positive', () => {
    expect(() =>
      bloodRequestBuisnessRules.ensureQuantityIsPositive(-1),
    ).toThrow();
  });
});

describe(' Ensure transition status valid', () => {
  let bloodRequestBuisnessRules: BloodRequestBuisnessRules;
  beforeEach(() => {
    bloodRequestBuisnessRules = new BloodRequestBuisnessRules();
  });
  it('should ensure status transition valid', () => {
    expect(() =>
      bloodRequestBuisnessRules.ensureStatusTransitionIsValid(
        BloodRequestStatus.ACCEPTED,
        BloodRequestStatus.MATCHING,
      ),
    ).toThrow();
  });
});
describe('ensure blood request can be updated', () => {
  let bloodRequestBuisnessRules: BloodRequestBuisnessRules;
  beforeEach(() => {
    bloodRequestBuisnessRules = new BloodRequestBuisnessRules();
  });
  it('blood request should not be updated', () => {
    expect(() => {
      bloodRequestBuisnessRules.ensureBloodRequestCanBeUpdated({
        id: 'breq_01J8Z4P7YQ9A2M5K6L8N0R1S2T',
        patientId: 'patient_123456',
        bloodType: BloodType.A_POSITIVE,
        urgencyLevel: UrgencyLevel.HIGH,
        status: BloodRequestStatus.ACCEPTED,
        medicalReason: 'Severe blood loss following surgery',
        quantity: 4,
        createdAt: new Date('2026-08-05T10:15:00Z'),
        updatedAt: new Date('2026-08-05T10:15:00Z'),
      });
    }).toThrow();
  });
});
