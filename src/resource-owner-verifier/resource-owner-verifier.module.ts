import { Global, Module } from '@nestjs/common';
import { ResourceOwnerVerifierService } from './resource-owner-verifier.service';
import { CatModule } from 'src/cat/cat.module';

@Global()
@Module({
  imports: [CatModule],
  providers: [ResourceOwnerVerifierService],
  exports: [ResourceOwnerVerifierService],
})
export class ResourceOwnerVerifierModule {}
