import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AuthServiceFirebase} from '../../shared/services/firebase/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public show: boolean = false;
  public loginForm: FormGroup;
  public errorMessage: any;

  constructor(public authService: AuthService, public authServiceFirebase: AuthServiceFirebase, private fb: FormBuilder) {
      this.loginForm = this.fb.group({
        username: ['test123', [Validators.required]],
        password: ['test123', Validators.required]
      });
  }

  ngOnInit() {
  }

  showPassword() {
    this.show = !this.show;
  }
  
 

  // Simple Login
  login(): void {
    
  this.authService.login  (this.loginForm.value.username, this.loginForm.value.password).subscribe()
}

}
