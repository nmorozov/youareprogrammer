import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Models
import { Order } from '../../models/order';

// Config
import SERVICE_URL from '../../config/backend';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
	providedIn: 'root'
})
export class OrderService {
  /** Entity name */
	private entity = 'orders';

  /**
   * Fetches orders from backend
   */
	getOrders(): Observable<Order[]> {
		return this.http.get<Order[]>(SERVICE_URL + this.entity);
	}

  /**
   * Send new order to backend using HTTP POST
   * @param Order order
   */
	addOrder(order: Order): Observable<Order> {
		return this.http.post<Order>(SERVICE_URL + this.entity, order, httpOptions);
	}

	constructor(private http: HttpClient) {}
}
