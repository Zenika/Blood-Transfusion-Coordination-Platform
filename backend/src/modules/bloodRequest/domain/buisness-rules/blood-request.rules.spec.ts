/// <reference types="jest" />

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
