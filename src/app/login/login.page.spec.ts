import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { IonicModule, AlertController, NavController } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let alertController: AlertController;
  let navCtrl: NavController;

  beforeEach(async () => {
    const mockAlertController = {
      create: jasmine.createSpy('create').and.returnValue(
        Promise.resolve({
          present: jasmine.createSpy('present'),
        })
      ),
    };

    const mockNavController = {
      navigateRoot: jasmine.createSpy('navigateRoot'),
    };

    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [IonicModule.forRoot(), ReactiveFormsModule],
      providers: [
        { provide: AlertController, useValue: mockAlertController },
        { provide: NavController, useValue: mockNavController },
        AuthService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    alertController = TestBed.inject(AlertController);
    navCtrl = TestBed.inject(NavController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mark the form as invalid if fields are empty', () => {
    component.formularioLogin.setValue({ nombre: '', contraseña: '' });
    expect(component.formularioLogin.valid).toBeFalse();
  });

  it('should navigate to /home if login is successful', async () => {
    const mockUser = { nombre: 'testuser', contraseña: 'testpassword' };
    localStorage.setItem('usuario', JSON.stringify(mockUser));

    component.formularioLogin.setValue({ nombre: 'testuser', contraseña: 'testpassword' });
    await component.ingresar();

    expect(navCtrl.navigateRoot).toHaveBeenCalledWith('/home');
  });

  it('should not navigate and should keep "ingresado" false if login fails', async () => {
    // Configuramos un usuario incorrecto
    component.formularioLogin.setValue({ nombre: 'wronguser', contraseña: 'wrongpassword' });
  
    // Limpiamos el estado previo
    localStorage.removeItem('ingresado');
    spyOn(localStorage, 'setItem'); // Espiamos `setItem` para verificar su uso
  
    // Llamamos a la función ingresar
    await component.ingresar();
  
    // Verificamos que no se haya llamado a la navegación
    expect(navCtrl.navigateRoot).not.toHaveBeenCalled();
  
    // Verificamos que "ingresado" no fue cambiado a true
    expect(localStorage.setItem).not.toHaveBeenCalledWith('ingresado', 'true');
  });
  
});
