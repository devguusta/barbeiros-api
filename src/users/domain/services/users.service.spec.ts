import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../controllers/users.controller';
import { UsersModule } from '../../users.module';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersModel } from '../../infra/models/user.model';
describe('AuthSErvice', () => {
  let service: UsersService;
  let userRepository: Repository<UsersModel>;
  let config: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UsersModel),
          useValue: {},
        },
        {
          provide: ConfigService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    config = module.get<ConfigService>(ConfigService);
  });
  it('SHould be create a new user account', async () => {
    service.signup = jest.fn().mockResolvedValue({
      name: 'Gustavo silva',
      email: 'testeee@gmail.com',
      document: '15855169707',
      cellphone: '21982500106',
      password: 'Teste@1234',
    });
    const result = await service.signup({
      name: 'Gustavo silva',
      email: 'testeee@gmail.com',
      document: '15855169707',
      cellphone: '21982500106',
      password: 'Teste@1234',
    });

    expect(result).toBe(Promise<void>);
  });
});
