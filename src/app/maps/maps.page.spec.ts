import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapsPage } from './maps.page';

describe('MapsPage', () => {
  let component: MapsPage;
  let fixture: ComponentFixture<MapsPage>;

  // Mock para la API de Google Maps
  beforeAll(() => {
    (window as any).google = {
      maps: {
        Map: class {
          constructor(public element: HTMLElement, public options: any) {}
        },
        Marker: class {
          constructor(public options: any) {}
        },
        event: {
          addListenerOnce: jasmine.createSpy('addListenerOnce').and.callFake((map, event, callback) => {
            callback(event,map);
          }),
        },
      },
    };
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(MapsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize map on ngOnInit', () => {
    spyOn(component, 'loadMap').and.callThrough();
    component.ngOnInit();
    expect(component.loadMap).toHaveBeenCalled();
    expect(component.map).not.toBeNull();
  });

  it('should add markers to the map', () => {
    spyOn(component, 'addMarker').and.callThrough();
    component.renderMarkers();
    expect(component.addMarker).toHaveBeenCalledTimes(component.markers.length);
  });

  it('should create a marker with correct properties', () => {
    const testMarker = component.markers[0];
    const createdMarker = component.addMarker(testMarker);
    expect(createdMarker.options.position).toEqual(testMarker.position);
    expect(createdMarker.options.title).toEqual(testMarker.title);
  });
});
