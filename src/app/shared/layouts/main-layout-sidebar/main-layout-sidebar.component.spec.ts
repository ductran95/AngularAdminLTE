import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MainLayoutSidebarComponent } from '@app/shared/layouts/main-layout-sidebar/main-layout-sidebar.component';


describe('MainLayoutSidebarComponent', () => {
  let component: MainLayoutSidebarComponent;
  let fixture: ComponentFixture<MainLayoutSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainLayoutSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLayoutSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
