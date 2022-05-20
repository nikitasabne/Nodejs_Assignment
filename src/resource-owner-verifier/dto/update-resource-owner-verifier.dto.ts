import { PartialType } from '@nestjs/mapped-types';
import { CreateResourceOwnerVerifierDto } from './create-resource-owner-verifier.dto';

export class UpdateResourceOwnerVerifierDto extends PartialType(
  CreateResourceOwnerVerifierDto,
) {}
