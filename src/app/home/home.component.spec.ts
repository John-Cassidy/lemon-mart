import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InMemoryAuthService } from '../auth/auth.inmemory.service';
import { AuthService } from '../auth/auth.service';
import { commonTestingModules } from '../common/common.testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [commonTestingModules],
      providers: [{ provide: AuthService, useClass: InMemoryAuthService }],
      declarations: [HomeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
