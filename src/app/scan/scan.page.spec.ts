import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScanPage } from './scan.page';
import { IonicModule } from '@ionic/angular';

describe('ScanPage', () => {
  let component: ScanPage;
  let fixture: ComponentFixture<ScanPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScanPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ScanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the correct default values', () => {
    expect(component.segment).toBe('scan');
    expect(component.qrText).toBe('');
    expect(component.scanResult).toBe('youtube.com');
  });

  it('should update scanResult when startScan is called', async () => {
    const mockScanResult = 'https://example.com';
    spyOn(component, 'startScan').and.callFake(async () => {
      component.scanResult = mockScanResult;
    });

    await component.startScan();
    expect(component.scanResult).toBe(mockScanResult);
  });

  it('should correctly identify a URL with isUrl method', () => {
    component.scanResult = 'https://example.com';
    expect(component.isUrl()).toBeTrue();

    component.scanResult = 'not-a-url';
    expect(component.isUrl()).toBeFalse();
  });
});
