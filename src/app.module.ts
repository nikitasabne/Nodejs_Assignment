import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { CatModule } from './cat/cat.module';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from './common/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { ResourceOwnerVerifierModule } from './resource-owner-verifier/resource-owner-verifier.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    DatabaseModule,
    CatModule,
    ConfigModule.forRoot(),
    ResourceOwnerVerifierModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}