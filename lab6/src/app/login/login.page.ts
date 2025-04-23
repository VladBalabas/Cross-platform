import { Component } from '@angular/core';
import { AuthService } from './auth_service/auth.service';
import { IonHeader, IonToolbar, IonButton, IonLabel, IonItem, IonInput, IonText, IonContent, IonTitle } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [IonTitle, IonContent, IonText, IonInput, IonItem, IonLabel, IonHeader, IonToolbar, IonButton, CommonModule, FormsModule]
})
export class LoginPage {
  email = '';
  password = '';
  errorMessage = '';
  isRegisterMode = false;

  constructor(private authService: AuthService) {}

  async submit() {
    try {
      this.errorMessage = '';
      if (this.isRegisterMode) {
        await this.authService.register(this.email, this.password);
      } else {
        await this.authService.login(this.email, this.password);
      }
    } catch (err) {
      this.errorMessage = this.isRegisterMode
        ? 'Помилка реєстрації. Спробуйте ще раз.'
        : 'Невірна електронна пошта або пароль.';
    }
  }

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
    this.errorMessage = '';
    this.email = '';
    this.password = '';
  }
}
