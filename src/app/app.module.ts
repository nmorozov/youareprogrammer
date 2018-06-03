// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import { ArrayHelper } from './utils/ArrayHelper';
import { ServiceStatistic } from './components/services/services-statistic';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';

// Components
import { AppComponent } from './app.component';
import { ServicesComponent } from './components/services/services.component';
import { SpecialistsComponent } from './components/specialists/specialists.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

@NgModule({
	declarations: [ AppComponent, ServicesComponent, SpecialistsComponent, NotfoundComponent, CheckoutComponent ],
	imports: [
		MDBBootstrapModule.forRoot(),
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		FormsModule,
		ArrayHelper,
		ServiceStatistic
	],
	schemas: [ NO_ERRORS_SCHEMA ],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
