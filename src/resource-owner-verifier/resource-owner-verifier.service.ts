import { faL } from '@fortawesome/free-solid-svg-icons';
import { Injectable } from '@nestjs/common';
import { CatService } from 'src/cat/cat.service';
import { CreateResourceOwnerVerifierDto } from './dto/create-resource-owner-verifier.dto';
import { UpdateResourceOwnerVerifierDto } from './dto/update-resource-owner-verifier.dto';

@Injectable()
export class ResourceOwnerVerifierService {
  constructor(private readonly catService: CatService) {}

  async verifyResourceOwner(
    user_id: string,
    entity_name: string,
    entity_id: string,
  ): Promise<boolean> {
    if (entity_name === 'cat') {
      const findCat = await this.catService.findCatByOwnerId(
        user_id,
        entity_id,
      );
      if (findCat) {
        return true;
      } else return false;
    }
    return false;
  }
}
