import { KillMyIdModule } from './kill-my-id.module';

describe('KillMyIdModule', () => {
  let killMyIdModule: KillMyIdModule;

  beforeEach(() => {
    killMyIdModule = new KillMyIdModule();
  });

  it('should create an instance', () => {
    expect(killMyIdModule).toBeTruthy();
  });
});
