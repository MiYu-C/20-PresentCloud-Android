import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InitiateSignInPage } from './initiate-sign-in.page';

describe('InitiateSignInPage', () => {
  let component: InitiateSignInPage;
  let fixture: ComponentFixture<InitiateSignInPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitiateSignInPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InitiateSignInPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
