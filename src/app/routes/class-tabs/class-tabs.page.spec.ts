import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClassTabsPage } from './class-tabs.page';

describe('ClassTabsPage', () => {
  let component: ClassTabsPage;
  let fixture: ComponentFixture<ClassTabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassTabsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClassTabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
