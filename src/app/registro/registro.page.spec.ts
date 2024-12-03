import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroPage } from './registro.page';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AlertController, NavController } from '@ionic/angular';

describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroPage],
      imports: [ReactiveFormsModule, IonicModule.forRoot()],
      providers: [
        FormBuilder,
        AlertController,
        NavController
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Prueba 1: Verifica que la función `guardar` muestra una alerta si el formulario es inválido.
  it('should display an alert if the form is invalid when calling guardar()', async () => {
    component.formularioRegistro.setValue({
      nombre: '',
      contraseña: '',
      repetirContraseña: ''
    });

    spyOn(component['alertController'], 'create').and.returnValue(Promise.resolve({ present: jasmine.createSpy() } as any));

    await component.guardar();

    expect(component.formularioRegistro.invalid).toBeTrue();
    expect(component['alertController'].create).toHaveBeenCalled();
  });

  // Prueba 2: Verifica que se guarda la información en localStorage y navega a '/login' si el formulario es válido.
  it('should save user data to localStorage and navigate to login if the form is valid', async () => {
    component.formularioRegistro.setValue({
      nombre: 'John Doe',
      contraseña: 'password123',
      repetirContraseña: 'password123'
    });

    spyOn(window.localStorage, 'setItem');
    spyOn(component['navCtrl'], 'navigateRoot');

    await component.guardar();

    expect(localStorage.setItem).toHaveBeenCalledWith('usuario', JSON.stringify({
      nombre: 'John Doe',
      contraseña: 'password123'
    }));
    expect(localStorage.setItem).toHaveBeenCalledWith('ingresado', 'true');
    expect(component['navCtrl'].navigateRoot).toHaveBeenCalledWith('/login');
  });

  // Prueba 3: Verifica que el formulario se inicializa correctamente y tiene los controles necesarios.
  it('should initialize the form with required controls', () => {
    expect(component.formularioRegistro).toBeTruthy();
    expect(component.formularioRegistro.get('nombre')).toBeTruthy();
    expect(component.formularioRegistro.get('contraseña')).toBeTruthy();
    expect(component.formularioRegistro.get('repetirContraseña')).toBeTruthy();
    expect(component.formularioRegistro.get('nombre')?.valid).toBeFalse();
    expect(component.formularioRegistro.get('contraseña')?.valid).toBeFalse();
    expect(component.formularioRegistro.get('repetirContraseña')?.valid).toBeFalse();
  });
});
