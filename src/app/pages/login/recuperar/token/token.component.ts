import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/_service/login.service';
import { PasswordValidation } from './match';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent implements OnInit {

  form: FormGroup;
  token: string;
  mensaje: string;
  error: string;
  rpta: number;
  tokenValido: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private loginservice: LoginService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      password: [''],
      confirmPassword: ['']
    }, {
      validator: PasswordValidation.MatchPassword
    });

    this.route.params.subscribe(params =>{
      this.token = params['token'];

      this.loginservice.verificarTokenReset(this.token).subscribe(data => {

        if(data === 1){
          this.tokenValido = true;
        }else{
          this.tokenValido = false;
          setTimeout( () => {
            this.router.navigate(['login']);
          }, 2000)
        }
      });
    });
  }

  onSubmit(){
    let clave: string = this.form.value.confirmPassword;
    this.loginservice.restablecer(this.token, clave).subscribe(data => {
      this.mensaje = 'Se cambio la contraseña';

        setTimeout(() => {
          this.router.navigate(['login']);
        }, 2000);
    });
  }
}
