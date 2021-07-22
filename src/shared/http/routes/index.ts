import { Router } from 'express';
import productsRouter from '@modules/evl_products/routes/products.routes';
import usersRouter from '@modules/evl_users/routes/users.routes';
import sessionsRouter from '@modules/evl_users/routes/sessions.routes';
import passwordRouter from '@modules/evl_users/routes/password.routes';
import profileRouter from '@modules/evl_users/routes/profile.routes';
import customersRouter from '@modules/evl_customers/routes/customers.routes';
import ordersRouter from '@modules/evl_orders/routes/orders.routes';

import millenniumRouter from '@modules/millenium/routes/millennium.routes';

const routes = Router();

routes.get('/', (request, response) => {
  return response.json({ message: 'EVL Server API - v1.0' });
});

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/customers', customersRouter);
routes.use('/orders', ordersRouter);
routes.use('/wts', millenniumRouter);

export default routes;
