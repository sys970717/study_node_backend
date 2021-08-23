export interface RouteDefinition {
  // Path to our route
  path: string;
  // Method name within our class responsible for this route
  methodName: string | symbol;
  // HTTP Request method (get, post, ...)
  requestMethod: 'get' | 'post' | 'delete' | 'options' | 'put' | 'patch';
}