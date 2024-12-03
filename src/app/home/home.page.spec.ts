import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { AuthService } from '../services/auth.service';

// Mock para AuthService
const mockAuthService = {
  getUser: jasmine.createSpy('getUser').and.returnValue('MockUser'),
  logout: jasmine.createSpy('logout'),
};

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: AuthService, useValue: mockAuthService }, // Proveer el mock del servicio
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set username to "MockUser" on initialization', () => {
    // Simular que el localStorage contiene un usuario
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({ nombre: 'MockUser' }));
    component.ngOnInit();
    expect(component.username).toBe('MockUser');
  });

  it('should set username to "Invitado" if no user data in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null); // Simular que no hay datos en localStorage
    component.ngOnInit();
    expect(component.username).toBe('Invitado');
  });

  it('should call AuthService.logout when onLogout is called', () => {
    component.onLogout();
    expect(mockAuthService.logout).toHaveBeenCalled();
  });
});
