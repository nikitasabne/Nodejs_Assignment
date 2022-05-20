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
import { ProductModule } from './product/product.module';
import { DataPaginatorModule } from './data-paginator/data-paginator.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    DatabaseModule,
    DataPaginatorModule,
    CatModule,
    ConfigModule.forRoot(),
    ResourceOwnerVerifierModule,
    ProductModule,
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
