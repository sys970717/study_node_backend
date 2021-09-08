// import server from '../../app';
// import { Request, Response } from "express";
// import { asyncHandler } from '../../util/asyncHandler';

// enum METHOD {
//     GET = 'get',
//     POST = 'post',
//     PUT = 'put',
//     PATCH = 'patch',
//     DELETE = 'delete',
// };

// interface RouteConfigProps {
//     method: METHOD;
//     path: string;
// };

// function routeConfig({method, path}: RouteConfigProps): MethodDecorator {
//     return function (
//         // target: Object,
//         // propertyKey: string | symbol,
//         descriptor: PropertyDescriptor
//     ) {
//         const response = asyncHandler(async (req: Request, res: Response) => {
//             const original = descriptor.value(req, res);

//             res.status(200).json(original);
//         });

//         server[method](path, response);
//     }
// }