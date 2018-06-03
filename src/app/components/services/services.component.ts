import _ from 'lodash';
import { Component, OnInit } from '@angular/core';

// Models
import { Service } from '../../models/service';
import { Specialist } from '../../models/specialist';
import { Order } from '../../models/order';

// Services
import { ServiceService } from '../../services/services/service.service';
import { SpecialistService } from '../../services/specialist/specialist.service';
import { OrderService } from '../../services/order/order.service';

// Utils
import { ServiceStatistic } from './services-statistic';

@Component({
	selector: 'app-services',
	templateUrl: './services.component.html',
	styleUrls: [ './services.component.scss' ]
})
export class ServicesComponent implements OnInit {
	/** List of services fetched from backend */
	services: Service[];

	/** Service information for service details popup */
	detailServiceServiceInfo: Service;

	/** Service name for getting detail service info */
	selectedService: string;

	/** List of orders fetched from backend */
	orders: Order[];

	/** List of selected services */
	selectedServices: Service[];

	/** List of specialists fetched from backend */
	specialists: Specialist[];

	/**
	 * Fetches specialists from backend and gets list of services by multiply specialists services list
	 */
	getServices(): void {
		this.specialistService.getSpecialists().subscribe((specialists) => {
			this.specialists = specialists;
			_.forEach(specialists, (specialist) => {
				this.services = _.union(this.services, specialist.services);
			});
		});
	}

	/**
	 * Get orders from backend
	 */
	getOrders(): void {
		this.orderService.getOrders().subscribe((orders) => (this.orders = orders));
	}

	/**
	 * Get list of selected services
	 */
	getSelectedServices(): void {
		this.selectedServices = this.serviceService.getSelectedServices();
	}

	/**
	 * Add or remove service to/from selected services
	 * @param serviceName 
	 */
	selectService(serviceName: string): void {
		this.serviceService.toggleSelectedServices(serviceName);
		this.getSelectedServices();
	}

	/**
	 * Set service for detail page popup
	 * @param service 
	 */
	setSelectedService(service: string): void {
		this.selectedService = service;
	}

	/**  
	 * Detail service popup callback. Fires after popup will be shown
	*/
	onShow(): void {
		this.detailServiceServiceInfo = {
			name: this.selectedService,
			specialistsCount: this.serviceStatistic.calculateSpecialistsCount(this.specialists, this.selectedService),
			doneCount: this.serviceStatistic.calculateDoneCount(this.orders, this.selectedService),
			saleLeader: this.serviceStatistic.isSaleleader(this.orders, this.selectedService),
			serviceOfYear: this.serviceStatistic.isServiceOfYear(this.orders, this.selectedService),
			useless: this.serviceStatistic.isUseless(this.orders, this.selectedService)
		};
	}

	constructor(
		private serviceService: ServiceService,
		private specialistService: SpecialistService,
		private orderService: OrderService,
		private serviceStatistic: ServiceStatistic
	) {}

	ngOnInit() {
		this.getServices();
		this.getSelectedServices();
		this.getOrders();
	}
}
