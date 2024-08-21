import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
})
export class RecoverPasswordPage implements OnInit {

  email: string = '';
  secretAnswer1: string = '';
  secretAnswer2: string = '';
  selectedQuestion1: string = '';
  selectedQuestion2: string = '';
  phoneNumber: string = '';
  smsCode: string = '';
  smsSent: boolean = false;
  questionsFetched: boolean = false;
  recoveryMethod: string = 'email';  // Método de recuperación por defecto

  securityQuestions1: string[] = [];
  securityQuestions2: string[] = [];

  constructor(
    private http: HttpClient,
    private toastController: ToastController
  ) { }

  ngOnInit() { }

  fetchSecurityQuestions() {
    if (!this.email) {
      this.presentToast('Por favor, ingresa un correo electrónico válido', 'warning');
      return;
    }

    // Simulación de la recuperación de preguntas de seguridad.
    // Deberías reemplazar esto con la lógica de tu backend.
    this.http.post('https://siinad.mx/php/fetch_security_questions.php', { email: this.email })
      .subscribe((response: any) => {
        this.securityQuestions1 = response.questions1 || [
          '¿Cuál es el nombre de tu primera mascota?',
          '¿Cuál es el nombre de tu ciudad natal?',
          '¿Cuál es tu comida favorita?'
        ];
        this.securityQuestions2 = response.questions2 || [
          '¿Cuál fue tu primer trabajo?',
          '¿Cuál es el nombre de tu escuela primaria?',
          '¿Cuál es tu película favorita?'
        ];
        this.questionsFetched = true;
        this.presentToast('Preguntas de seguridad cargadas.', 'success');
      }, error => {
        this.presentToast('Error al cargar las preguntas de seguridad.', 'danger');
      });
  }

  sendRecoveryEmail() {
    if (!this.email) {
      this.presentToast('Por favor, ingresa un correo electrónico válido', 'warning');
      return;
    }

    this.http.post('https://siinad.mx/php/recover-password', { email: this.email })
      .subscribe(response => {
        this.presentToast('Correo de recuperación enviado', 'success');
      }, error => {
        this.presentToast('Error al enviar el correo de recuperación', 'danger');
      });
  }

  verifySecretQuestions() {
    if (!this.selectedQuestion1 || !this.secretAnswer1 || !this.selectedQuestion2 || !this.secretAnswer2) {
      this.presentToast('Por favor, responde todas las preguntas', 'warning');
      return;
    }

    this.http.post('https://siinad.mx/php/verify-questions', { email: this.email, question1: this.selectedQuestion1, answer1: this.secretAnswer1, question2: this.selectedQuestion2, answer2: this.secretAnswer2 })
      .subscribe(response => {
        this.presentToast('Respuestas correctas. Ahora puedes restablecer tu contraseña.', 'success');
        // Aquí puedes agregar la lógica para redirigir al formulario de restablecimiento de contraseña
      }, error => {
        this.presentToast('Respuestas incorrectas. Por favor, intenta nuevamente.', 'danger');
      });
  }

  sendSMSVerification() {
    if (!this.phoneNumber) {
      this.presentToast('Por favor, ingresa un número de teléfono válido', 'warning');
      return;
    }

    this.http.post('https://siinad.mx/php/send_sms.php', { phoneNumber: this.phoneNumber })
      .subscribe(response => {
        this.smsSent = true;
        this.presentToast('Código SMS enviado', 'success');
      }, error => {
        this.presentToast('Error al enviar el código SMS', 'danger');
      });
  }

  verifySMSCode() {
    if (!this.smsCode) {
      this.presentToast('Por favor, ingresa el código SMS recibido', 'warning');
      return;
    }

    this.http.post('https://siinad.mx/php/verify-sms-code', { phoneNumber: this.phoneNumber, smsCode: this.smsCode })
      .subscribe(response => {
        this.presentToast('Código verificado correctamente. Ahora puedes restablecer tu contraseña.', 'success');
        // Aquí puedes agregar la lógica para redirigir al formulario de restablecimiento de contraseña
      }, error => {
        this.presentToast('Código SMS incorrecto. Por favor, intenta nuevamente.', 'danger');
      });
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: color
    });
    toast.present();
  }
}
