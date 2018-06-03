import _ from 'lodash';

import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

// Models
import { Specialist } from '../../models/specialist';
import { Service } from '../../models/service';

// Services
import { SpecialistService } from '../../services/specialist/specialist.service';
import { ServiceService } from '../../services/services/service.service';

@Component({
	selector: 'app-specialists',
	templateUrl: './specialists.component.html',
	styleUrls: [ './specialists.component.scss' ]
})
export class SpecialistsComponent implements OnInit {
  /** List of specialists */
  specialists: Specialist[];
  /** List of selected services */
  selectedServices: Service[];
  
  /**
   * selectedServices setter
   * @param {Service[]} selectedServices - List of selected services
   */
	setSelectedServices(selectedServices: Service[]): void {
		this.selectedServices = selectedServices;
	}

  /**
   * Gets specialists from specialists service and filter them by services
   * @param {Service[]} selectedServices - List of selected services
   * @param {Specialists[]} specialists - list of filtered specialists by service
   */
	getSpecialists(selectedServices: Service[], specialists: Specialist[]): void {
		if (selectedServices.length < 1) {
			this.specialists = [];
		} else {
			this.specialistService.getSpecialists().subscribe((specialists) => {
				this.specialists = [];
				_.forEach(specialists, (specialist) => {
					if (_.difference(selectedServices, specialist.services).length === 0) {
						this.specialists.push(specialist);
					}
				});
			});
		}
	}

	/** Navigation block */

  /**
   * Navigate back
   */
	goBack(): void {
		this.location.back();
	}

  /**
   * Set specialist and processes user to checkout
   * @param {Specialist} specialist - specialist
   */
	goToCheckout(specialist: Specialist): void {
		this.specialistService.setSelectedSpecialist(specialist);
		this.router.navigate([ 'checkout' ]);
	}

	constructor(
		private serviceService: ServiceService,
		private specialistService: SpecialistService,
		private location: Location,
		private router: Router
	) {}

	ngOnInit() {
		this.setSelectedServices(this.serviceService.getSelectedServices());
		this.getSpecialists(this.selectedServices, this.specialists);
	}
}
