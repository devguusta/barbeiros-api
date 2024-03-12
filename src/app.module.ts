import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        database: process.env.DB_DATABASE,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        logging: false,
        // migrations: ['dist/migrations/*.{ts,js}'],
        // entities: ['dist/entities/*.{ts,js}'],
        // // entities: [Users],
        // // migrations: ['dist/migrations/*.{ts,js}'],
        // migrationsTableName: 'typeorm_migrations',
        entities: [__dirname + '/**/*.entity.{js,ts}'],
        migrations: [__dirname + '/migrations/*.{js,ts}'],
        migrationsTableName: 'migrations',
      }),
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
