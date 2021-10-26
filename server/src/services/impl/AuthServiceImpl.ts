import UserSession from "../../domains/dto/user/UserSession";
import AuthService from "../AusazthService";
import Service from "../Service";

declare module 'express-session' {
  interface SessionData {
      user: UserSession,
      // uniqueId: number;
  }
}

export default class AuthServiceImpl extends Service implements AuthService {
  createSession(req: Request, users: any) {
    throw new Error("Method not implemented.");
  }
  
}