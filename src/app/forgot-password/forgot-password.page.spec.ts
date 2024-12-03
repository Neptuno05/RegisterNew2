import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgotPasswordPage } from './forgot-password.page';
import { Router } from '@angular/router';

describe('ForgotPasswordPage', () => {
  let component: ForgotPasswordPage;
  let fixture: ComponentFixture<ForgotPasswordPage>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForgotPasswordPage] // Importa el módulo de pruebas de router
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router); // Obtiene la instancia del router para pruebas
    fixture.detectChanges();
  });

  // Prueba 1: Verificar que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Prueba 2: Verificar que la propiedad 'username' se inicializa como undefined
  it('should initialize username as undefined', () => {
    expect(component.username).toBeUndefined();
  });

  // Prueba 3: Verificar que se llama a 'onRecoverPassword' y realiza la redirección al login
  it('should navigate to login on recover password', () => {
    const navigateSpy = spyOn(router, 'navigate'); // Espiar el método de navegación
    component.username = 'testuser'; // Simular un valor para el username
    component.onRecoverPassword();
    expect(navigateSpy).toHaveBeenCalledWith(['/login']); // Verificar la redirección
  });

  // Prueba 4: Verificar que se imprime el mensaje de recuperación de contraseña en la consola
  it('should log the recovery message in the console', () => {
    const consoleSpy = spyOn(console, 'log'); // Espiar la consola
    component.username = 'testuser';
    component.onRecoverPassword();
    expect(consoleSpy).toHaveBeenCalledWith('Recuperar contraseña para: testuser');
  });
});
