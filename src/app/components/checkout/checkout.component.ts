import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

// Models
import { Service } from '../../models/service';
import { Specialist } from '../../models/specialist';

// Services
import { SpecialistService } from '../../services/specialist/specialist.service';
import { ServiceService } from '../../services/services/service.service';
import { OrderService } from '../../services/order/order.service';

@Component({
	selector: 'app-checkout',
	templateUrl: './checkout.component.html',
	styleUrls: [ './checkout.component.scss' ]
})
export class CheckoutComponent implements OnInit {
	/** Hours count */
	@Input() hoursCount: number = 1;

	/** Order total sum */
	total: number = 0;

	/** Selected specialist */
	selectedSpecialist: Specialist;

	/** List of selected services */
	selectedServices: Service[];

  /**
   * Get selected specialist from service
   */
	getSelectedSpecialist(): void {
		this.selectedSpecialist = this.specialistService.getSelectedSpecialist();
	}

  /**
   * Get list of selected services
   */
	getSelectedServices(): void {
		this.selectedServices = this.serviceService.getSelectedServices();
	}

  /**
   * Place order
   * Clear selected specialist, selected services, send order to server and redirect to services page
   */
	placeOrder(): void {
		this.specialistService.setSelectedSpecialist(null);
		this.serviceService.setSelectedServices([]);
		this.orderService
			.addOrder({ services: this.selectedServices, timestamp: Date.now() })
			.subscribe(() => this.router.navigate([ 'services' ]));
	}

  /**
   * Calsulates sum of order
   * @param hourseCount 
   */
	calculateTotal(hourseCount): void {
		this.total = hourseCount * this.selectedSpecialist.hour_cost;
	}

  /**
   * Call back for hours count field keyup event
   * Filters input value and call calculateTotal method
   * 
   * @param event 
   */
	onKeyHoursCount(event): void {
		let value = event.target.value;

		if (value === '') {
			return;
		}

		if (parseInt(value, 10) < 1) {
			value = this.hoursCount = 1;
		}

		this.calculateTotal(value);
	}

  /**
   * Navigates user back
   */
	goBack(): void {
		this.location.back();
	}

	constructor(
		private location: Location,
		private specialistService: SpecialistService,
		private serviceService: ServiceService,
		private router: Router,
		private orderService: OrderService
	) {}

	ngOnInit() {
		this.getSelectedSpecialist();
		this.getSelectedServices();
		this.calculateTotal(this.hoursCount);
	}
}
