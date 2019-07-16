import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MainLayoutSettingComponent } from '@app/shared/layouts/main-layout-setting/main-layout-setting.component';


describe('MainLayoutSettingComponent', () => {
  let component: MainLayoutSettingComponent;
  let fixture: ComponentFixture<MainLayoutSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainLayoutSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLayoutSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
