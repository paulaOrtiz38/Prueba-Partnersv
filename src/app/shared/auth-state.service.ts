import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private userState = new BehaviorSubject<boolean>(this.token.isLoggedIn()!);
  userAuthState = this.userState.asObservable();
  constructor(public token: LoginService) {}
  setAuthState(value: boolean) {
    this.userState.next(value);
  }
}