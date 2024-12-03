import { ComponentFixture, TestBed } from '@angular/core/testing';
import { E404Page } from './e404.page';
import { IonicModule } from '@ionic/angular';

describe('E404Page', () => {
  let component: E404Page;
  let fixture: ComponentFixture<E404Page>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [E404Page],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(E404Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log to the console on initialization', () => {
    const consoleSpy = spyOn(console, 'log');
    component.ngOnInit();
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('should display the correct title in <ion-title>', () => {
    const element = fixture.nativeElement;
    const titleElement = element.querySelector('ion-title');
    expect(titleElement).toBeTruthy(); // Verifica que el elemento existe
    expect(titleElement.textContent).toContain('Página no Encontrada'); // Verifica el contenido
  });

  it('should have a button that navigates to /login', () => {
    const element = fixture.nativeElement;
    const button = element.querySelector('ion-button');
    expect(button).toBeTruthy(); // Verifica que el botón exista
    expect(button.textContent).toContain('Volver Al login'); // Verifica el texto del botón
    expect(button.getAttribute('routerLink')).toBe('/login'); // Verifica el atributo routerLink
  });
});
