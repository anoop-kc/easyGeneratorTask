import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
// import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { LoggerModule } from './common/logger/logger.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { WinstonModule } from 'nest-winston';
import { transports } from 'winston';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make environment variables available globally
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'), // Accessing MONGO_URI from ConfigService
      }),
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '1h' },
        };
      },
    }),
    WinstonModule.forRoot({
      transports: [
        new transports.Console(),
        new transports.File({ filename: 'combined.log' }),
      ],
    }),
    UserModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: Logger,
      useFactory: () => {
        return new Logger('EasyGenerator');
      },
    },
  ],
})
export class AppModule {}
