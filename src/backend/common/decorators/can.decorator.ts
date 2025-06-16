import { SetMetadata } from '@nestjs/common';

export const CHECK_POLICIES_KEY = 'policies';

/**
 * Use @Can('policy-name') for dynamic resolution.
 */
export const Can = (...policyNames: string[]) =>
  SetMetadata(CHECK_POLICIES_KEY, policyNames);
