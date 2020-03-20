import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SignInRecordPage } from './sign-in-record.page';

describe('SignInRecordPage', () => {
  let component: SignInRecordPage;
  let fixture: ComponentFixture<SignInRecordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignInRecordPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SignInRecordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
