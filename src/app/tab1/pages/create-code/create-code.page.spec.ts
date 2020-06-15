import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateCodePage } from './create-code.page';

describe('CreateCodePage', () => {
  let component: CreateCodePage;
  let fixture: ComponentFixture<CreateCodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCodePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
