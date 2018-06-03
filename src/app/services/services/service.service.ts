import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

// Models
import { Service } from '../../models/service';

// Utila
import { ArrayHelper } from '../../utils/ArrayHelper';

@Injectable({
	providedIn: 'root'
})
export class ServiceService {
  /**
   * List of selected services
   */
	private selectedServices = [];

  /**
   * Getter for selected services
   */
	getSelectedServices(): Service[] {
		return this.selectedServices;
	}

  /**
   * Setter for selected services
   * @param selectedServices 
   */
	setSelectedServices(selectedServices): void {
		this.selectedServices = selectedServices;
	}

  /**
   * Toggle service to selected services
   * @param item 
   */
	toggleSelectedServices(item): void {
		this.arrayHelper.toggleArrayElement(item, this.selectedServices);
	}

	constructor(private router: Router, private arrayHelper: ArrayHelper) {}
}
