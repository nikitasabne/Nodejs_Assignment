import { Test, TestingModule } from '@nestjs/testing';
import { ResourceOwnerVerifierService } from './resource-owner-verifier.service';

describe('ResourceOwnerVerifierService', () => {
  let service: ResourceOwnerVerifierService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResourceOwnerVerifierService],
    }).compile();

    service = module.get<ResourceOwnerVerifierService>(
      ResourceOwnerVerifierService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
