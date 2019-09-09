import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthenticationInterceptor } from '@app/core/interceptors/authentication.interceptor';
import { AuthenticationGuard } from '@app/core/guards/authentication.guard';
import { AuthApiService } from '@app/core/stores/auth/auth.api-service';
import { AlertService } from '@app/core/services/common/alert.service';
import { LocalStorageService } from '@app/core/services/common/local-storage.service';
import { CityService } from '@app/core/services/data/city.service';
import { CountyService } from '@app/core/services/data/county.service';
import { UserService } from '@app/core/services/data/user.service';


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
                CityService,
                CountyService,
                UserService
            ]
        };
    }
}
