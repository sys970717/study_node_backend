import { Request, Response, Router } from 'express';
import { RouteDefinition } from '../../config/RouteDefinition';
import ProductsController from './ProductsController';
import { asyncHandler } from "../../util/asyncHandler";
import UsersController from './UsersController';

const router = Router();

[
  ProductsController, UsersController,
].forEach(controller => {
  // This is our instantiated class
  const instance = new controller();
  // The prefix saved to our controller
  const prefix = Reflect.getMetadata('prefix', controller);
  // Our `routes` array containing all our routes for this controller
  const routes: Array<RouteDefinition> = Reflect.getMetadata('routes', controller);
  
  // Iterate over all routes and register them to our express application 
  routes.forEach(route => {
    // It would be a good idea at this point to substitute the `app[route.requestMethod]` with a `switch/case` statement
    // since we can't be sure about the availability of methods on our `app` object. But for the sake of simplicity
    // this should be enough for now.
    router[route.requestMethod](prefix + route.path, asyncHandler(async (req: Request, res: Response) => {
      // Execute our method for this path and pass our express request and response object.
      instance[route.methodName](req, res);
    }));
  });
});

export default router;