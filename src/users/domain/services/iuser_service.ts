import { SignInDTO } from '../../dtos/sigin_dto';
import { UserSignup } from '../entities/user_signup.entity';

export abstract class IUserService {
  abstract signup(userSignup: UserSignup): Promise<void>;
  abstract signIn(dto: SignInDTO): Promise<{ access_token: string }>;
}
