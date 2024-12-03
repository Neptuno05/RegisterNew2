import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('AuthService', () => {
  let service: AuthService;
  let router: MockRouter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Router, useClass: MockRouter },
      ],
    });

    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router) as unknown as MockRouter;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log in the user with valid credentials', () => {
    const username = 'testuser';
    const password = 'testpassword';

    const result = service.login(username, password);

    expect(result).toBeTrue();
    expect(service.isLoggedIn()).toBeTrue();
    expect(service.getUser()).toBe(username);
  });

  it('should not log in the user with invalid credentials', () => {
    const username = '';
    const password = '';

    const result = service.login(username, password);

    expect(result).toBeFalse();
    expect(service.isLoggedIn()).toBeFalse();
    expect(service.getUser()).toBeNull();
  });

  it('should log out the user and redirect to /login', () => {
    service.login('testuser', 'testpassword'); // Log in first

    service.logout();

    expect(service.isLoggedIn()).toBeFalse();
    expect(service.getUser()).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
