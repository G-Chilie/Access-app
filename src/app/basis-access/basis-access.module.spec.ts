import { BasisAccessModule } from './basis-access.module';

describe('BasisAccessModule', () => {
  let basisAccessModule: BasisAccessModule;

  beforeEach(() => {
    basisAccessModule = new BasisAccessModule();
  });

  it('should create an instance', () => {
    expect(basisAccessModule).toBeTruthy();
  });
});
