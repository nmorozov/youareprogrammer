import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { ServicesComponent } from './components/services/services.component';
import { SpecialistsComponent } from './components/specialists/specialists.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

const routes: Routes = [
	{ path: '', redirectTo: '/services', pathMatch: 'full' },
	{ path: 'services', component: ServicesComponent },
	{ path: 'notfound', component: NotfoundComponent },
	{ path: 'specialists', component: SpecialistsComponent },
	{ path: 'checkout', component: CheckoutComponent },
	{ path: '**', redirectTo: '/notfound', pathMatch: 'full' }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
