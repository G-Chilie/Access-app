import { ResetBasisPasswordModule } from './reset-basis-password.module';

describe('ResetBasisPasswordModule', () => {
  let resetBasisPasswordModule: ResetBasisPasswordModule;

  beforeEach(() => {
    resetBasisPasswordModule = new ResetBasisPasswordModule();
  });

  it('should create an instance', () => {
    expect(resetBasisPasswordModule).toBeTruthy();
  });
});
