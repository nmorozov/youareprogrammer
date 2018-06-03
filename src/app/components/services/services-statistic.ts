import _ from 'lodash';
import { NgModule } from '@angular/core';

// Models
import { Service } from '../../models/service';
import { Specialist } from '../../models/specialist';
import { Order } from '../../models/order';

// Utils
import { ArrayHelper } from '../../utils/ArrayHelper';

@NgModule({})
export class ServiceStatistic {
	/**
     * Calculates how many times service was provided
     * @param {Order[]} orders - array of all orders
     * @param {string} selectedService - selected service
     */
	calculateDoneCount(orders: Order[], selectedService: string): number {
		let doneCount = 0;

		_.forEach(orders, (order) => {
			if (_.indexOf(order.services, selectedService) >= 0) {
				doneCount++;
			}
		});

		return doneCount;
	}

    /**
     * Calculates count of specialists who provide specified service
     * @param {Specialist[]} specialists - array of all orders
     * @param {string} selectedService - selected service
     */
	calculateSpecialistsCount(specialists: Specialist[], selectedService: string): number {
		let specialistsCount = 0;

		_.forEach(specialists, (specialist) => {
			if (_.indexOf(specialist.services, selectedService) >= 0) {
				specialistsCount++;
			}
		});

		return specialistsCount;
	}

    /**
     * Check if service saleleader or not
     * @param {Order[]} orders - array of all orders
     * @param {string} selectedService - selected service
     */
	isSaleleader(orders: Order[], selectedService: string): boolean {
		const timeNow = Date.now();
		const DAYS_AGO_COUNT = 3;
		const MINIMUM_SOLD_COUNT_REQUIRED = 3;

		let saleStatisticUngrouped = [];
		let threeDaysAgo = new Date();

		threeDaysAgo.setDate(threeDaysAgo.getDate() - DAYS_AGO_COUNT);

		_.forEach(orders, (order) => {
			_.forEach(order.services, (service) => {
				if (order.timestamp >= threeDaysAgo) {
					saleStatisticUngrouped.push(service);
				}
			});
		});

		if (saleStatisticUngrouped.length < 1) {
			return false;
		}

		let saleStatistic = _.sortBy(this.arrayHelper.compressArray(saleStatisticUngrouped), [ 'count' ]).reverse();

		return saleStatistic[0].value == selectedService && saleStatistic[0].count > MINIMUM_SOLD_COUNT_REQUIRED;
	}

    /**
     * Check if service bestseller 
     * @param {Order[]} orders - array of all orders
     * @param {string} selectedService - selected service
     */
	isServiceOfYear(orders: Order[], selectedService: string): boolean {
		let saleStatisticUngrouped = [];
		_.forEach(orders, (order) => {
			_.forEach(order.services, (service) => {
				saleStatisticUngrouped.push(service);
			});
		});

		if (saleStatisticUngrouped.length < 1) {
			return false;
		}

		let saleStatistic = _.sortBy(this.arrayHelper.compressArray(saleStatisticUngrouped), [ 'count' ]).reverse();

		return saleStatistic[0].value == selectedService;
	}

    /**
     * Check if service sold zero times and there are at lest three sold services
     * @param {Order[]} orders - array of all orders
     * @param {string} selectedService - selected service
     */
	isUseless(orders: Order[], selectedService: string): boolean {
		let anotherServicesDone = 0;
		let isUseless = false;

		if (this.calculateDoneCount(orders, selectedService) > 0) {
			return isUseless;
		}

		_.forEach(orders, (order) => {
			if (_.indexOf(order.services, selectedService) == -1) {
				anotherServicesDone++;

				if (anotherServicesDone >= 3) {
					isUseless = true;

					return;
				}
			}
		});

		return isUseless;
	}

	constructor(private arrayHelper: ArrayHelper) {}
}
