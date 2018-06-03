import _ from 'lodash';
import { NgModule } from '@angular/core';

@NgModule({})
export class ArrayHelper {
	/**
	 * Toggle element in array. If element exists then delete it, add otherwise
	 * @param item 
	 * @param array 
	 */
	toggleArrayElement(item, array): void {
		var idx = _.indexOf(array, item);
		if (idx !== -1) {
			array.splice(idx, 1);
		} else {
			array.push(item);
		}
	}

	/**
	 * Count unique array elements
	 * Example: input ['Orange', 'Apple', 'Orange'] output [{value: 'Orange', count: 2}, {value: 'Apple', count: 1}]
	 * @param original 
	 */
	compressArray(original): object {
		var compressed = [];
		// make a copy of the input array
		var copy = original.slice(0);

		// first loop goes over every element
		for (var i = 0; i < original.length; i++) {
			var myCount = 0;
			// loop over every element in the copy and see if it's the same
			for (var w = 0; w < copy.length; w++) {
				if (original[i] == copy[w]) {
					// increase amount of times duplicate is found
					myCount++;
					// sets item to undefined
					delete copy[w];
				}
			}

			if (myCount > 0) {
				var a = { value: 0, count: 0 };
				a.value = original[i];
				a.count = myCount;
				compressed.push(a);
			}
		}

		return compressed;
	}
}
