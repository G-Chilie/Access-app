import { TokenValidationModule } from './token-validation.module';

describe('TokenValidationModule', () => {
  let tokenValidationModule: TokenValidationModule;

  beforeEach(() => {
    tokenValidationModule = new TokenValidationModule();
  });

  it('should create an instance', () => {
    expect(tokenValidationModule).toBeTruthy();
  });
});
