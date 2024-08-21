import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { DataStorageService } from '../data-storage-service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  username: string;
  password: string;
  labelnombreUsuario: string;
  labelcontrasena: string;
  buttonIniciarSesion: string;
  buttonRecuperarContrasena: string;
  labelIngreseDatosParaContinuar: string;

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastController: ToastController,
    private authService: AuthService,
    private dataStorageService: DataStorageService,
    private cookieService: CookieService // Agregar CookieService
  ) { 
    this.labelnombreUsuario = dataStorageService.labelnombreUsuario;
    this.labelcontrasena = dataStorageService.labelContrasena;
    this.buttonIniciarSesion = dataStorageService.buttonIniciarSesion;
    this.buttonRecuperarContrasena = dataStorageService.buttonRecuperarContrasena;
    this.labelIngreseDatosParaContinuar = dataStorageService.labelIngreseDatosParaContinuar;
  }

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/home']);
    }
  }

  async login() {
    console.log('Username:', this.username);
    console.log('Password:', this.password);
  
    if (!this.username || !this.password) {
      this.presentToast('Por favor, ingresa tu usuario y contraseña', 'warning');
      return;
    }
  
    const data = new FormData();
    data.append('username', this.username);
    data.append('password', this.password);
  
    this.http.post('https://siinad.mx/php/login.php', data).subscribe(
      async (response: any) => {
        console.log('Response:', response);
        if (response.success) {
          const userId = response.userId;
          const avatar = response.avatar;
          const principalCompanies: any[] = response.principalCompanies;

          const mappedPrincipalCompanies = principalCompanies.map(company => ({
            id: company.idCompany,
            name: company.nameCompany,
            role: company.roleInCompany,
            rfc: company.rfcIncompany,
            levelUser: company.levelUser
          }));

          this.cookieService.set('token', response.token);
          this.cookieService.set('mappedPrincipalCompanies', JSON.stringify(mappedPrincipalCompanies));

          this.authService.login(this.username, userId, avatar, mappedPrincipalCompanies);
  
          this.router.navigate(['/home']);
        } else {
          this.presentToast(response.message, 'danger');
        }
      },
      async (error) => {
        console.error('Error en la solicitud:', error);
        let errorMessage = 'Error en la solicitud';
        if (error && error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        this.presentToast(errorMessage, 'danger');
      }
    );
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: color
    });
    toast.present();
  }

  onEnterPressed() {
    this.login();
  }

}
