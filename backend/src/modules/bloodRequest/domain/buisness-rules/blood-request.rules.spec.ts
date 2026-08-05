/// <reference types="jest" />

import { BloodRequestStatus } from 'src/shared/enums/blood-request-status.enum';
import { BloodRequestBuisnessRules } from './blood-request.rules';

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
