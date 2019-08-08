import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MainLayoutPageHeaderComponent } from '@app/shared/layouts/main-layout/page-header/main-layout-page-header.component';


describe('MainLayoutPageHeaderComponent', () => {
  let component: MainLayoutPageHeaderComponent;
  let fixture: ComponentFixture<MainLayoutPageHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainLayoutPageHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLayoutPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
