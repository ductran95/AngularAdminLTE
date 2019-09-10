import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthenticationInterceptor } from '@app/core/interceptors/authentication.interceptor';
import { AuthenticationGuard } from '@app/core/guards/authentication.guard';
import { AuthApiService } from '@app/core/stores/auth/auth.api-service';
import { AlertService } from '@app/core/services/alert.service';
import { LocalStorageService } from '@app/core/services/local-storage.service';
import { CityApiService } from '@app/core/stores/city/city.api-service';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule
    ]
})
export class CoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AuthenticationInterceptor,
                    multi: true
                },
                AuthenticationGuard,
                AuthApiService,
                AlertService,
                LocalStorageService,
                CityApiService,
            ]
        };
    }
}
