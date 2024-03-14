import { UserSignup } from '../entities/user_signup.entity';

export abstract class IUserService {
  abstract signup(userSignup: UserSignup);
}
