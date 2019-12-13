import { PopUpModalModule } from './pop-up-modal.module';

describe('PopUpModalModule', () => {
  let popUpModalModule: PopUpModalModule;

  beforeEach(() => {
    popUpModalModule = new PopUpModalModule();
  });

  it('should create an instance', () => {
    expect(popUpModalModule).toBeTruthy();
  });
});
