// import { TestBed } from '@angular/core/testing';
// import { AuthService } from './auth.service';
// import { Auth } from '@angular/fire/auth';
// import { Router } from '@angular/router';

// // Create a type for our augmented window object
// declare global {
//   interface Window {
//     signInWithEmailAndPassword: any;
//     createUserWithEmailAndPassword: any;
//   }
// }

// describe('AuthService', () => {
//   let service: AuthService;
//   let mockAuth: jasmine.SpyObj<Auth>;
//   let mockRouter: jasmine.SpyObj<Router>;
//   let mockSignIn: jasmine.Spy;
//   let mockCreateUser: jasmine.Spy;

//   beforeEach(() => {
//     // Initialize the spies on window
//     mockSignIn = spyOn(window, 'signInWithEmailAndPassword');
//     mockCreateUser = spyOn(window, 'createUserWithEmailAndPassword');

//     // Create spies for dependencies
//     mockAuth = jasmine.createSpyObj('Auth', [], {
//       currentUser: { uid: 'test123', email: 'test@example.com' }
//     });
//     mockRouter = jasmine.createSpyObj('Router', ['navigate']);

//     TestBed.configureTestingModule({
//       providers: [
//         AuthService,
//         { provide: Auth, useValue: mockAuth },
//         { provide: Router, useValue: mockRouter }
//       ]
//     });

//     service = TestBed.inject(AuthService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   describe('login', () => {
//     it('should call signInWithEmailAndPassword and navigate to home on success', async () => {
//       // Setup mock success response
//       mockSignIn.and.returnValue(
//         Promise.resolve({ user: { uid: '123', email: 'test@example.com' } })
//       );

//       await service.login('test@example.com', 'password123');

//       expect(window.signInWithEmailAndPassword).toHaveBeenCalledWith(
//         mockAuth,
//         'test@example.com',
//         'password123'
//       );
//       expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
//     });

//     it('should throw error when login fails', async () => {
//       const error = new Error('Login failed');
//       mockSignIn.and.returnValue(Promise.reject(error));

//       try {
//         await service.login('test@example.com', 'wrongpassword');
//         fail('Expected error to be thrown');
//       } catch (err) {
//         expect(err).toBe(error);
//         expect(mockRouter.navigate).not.toHaveBeenCalled();
//       }
//     });
//   });

//   describe('register', () => {
//     it('should call createUserWithEmailAndPassword and navigate to home on success', async () => {
//       // Setup mock success response
//       mockCreateUser.and.returnValue(
//         Promise.resolve({ user: { uid: '123', email: 'new@example.com' } })
//       );

//       await service.register('new@example.com', 'password123');

//       expect(window.createUserWithEmailAndPassword).toHaveBeenCalledWith(
//         mockAuth,
//         'new@example.com',
//         'password123'
//       );
//       expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
//     });

//     it('should throw error when registration fails', async () => {
//       const error = new Error('Registration failed');
//       mockCreateUser.and.returnValue(Promise.reject(error));

//       try {
//         await service.register('invalid@example.com', 'weak');
//         fail('Expected error to be thrown');
//       } catch (err) {
//         expect(err).toBe(error);
//         expect(mockRouter.navigate).not.toHaveBeenCalled();
//       }
//     });
//   });
// });