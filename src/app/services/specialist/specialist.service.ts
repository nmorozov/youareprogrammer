import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Models
import { Specialist } from '../../models/specialist';

// Config
import SERVICE_URL from '../../config/backend';

@Injectable({
	providedIn: 'root'
})
export class SpecialistService {
  /** Entity name */
  private entity = 'specialists';

  /** List of selected specialists */
	private selectedSpecialist;

	getSpecialists(): Observable<Specialist[]> {
		return this.http.get<Specialist[]>(SERVICE_URL + this.entity);
	}

	getSelectedSpecialist(): Specialist {
		return this.selectedSpecialist;
	}

	setSelectedSpecialist(specialist: Specialist): void {
		this.selectedSpecialist = specialist;
	}

	constructor(private http: HttpClient) {}
}
