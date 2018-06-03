import orderRoutes from './order_routes';
import specialistRoutes from './specialist_routes';

export default function (app, db) {
  orderRoutes(app, db);
  specialistRoutes(app, db);
}
