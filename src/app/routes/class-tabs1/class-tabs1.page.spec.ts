import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClassTabs1Page } from './class-tabs1.page';

describe('ClassTabs1Page', () => {
  let component: ClassTabs1Page;
  let fixture: ComponentFixture<ClassTabs1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassTabs1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClassTabs1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
