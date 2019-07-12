import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationInterceptor } from '@app/core/authentication/interceptors/authentication.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    }
  ],
})
export class CoreModule { }
