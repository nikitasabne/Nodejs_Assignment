import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ForbiddenException,
} from '@nestjs/common';
import { AuthUser } from 'src/common/decorators/auth-user.decorator';
import { InjectUserId } from 'src/common/decorators/inject-user-id.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ENUM_AUTH_ROLES } from 'src/constants';
import { ResourceOwnerVerifier } from 'src/resource-owner-verifier/entities/resource-owner-verifier.entity';
import { ResourceOwnerVerifierService } from 'src/resource-owner-verifier/resource-owner-verifier.service';
import { UserDocument } from 'src/user/entities/user.entity';
import { CatService } from './cat.service';
import { CatIdDto } from './dto/cat-id.dto';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Controller('cat')
export class CatController {
  constructor(
    private readonly catService: CatService,
    private readonly resourceOwnerVerifierService: ResourceOwnerVerifierService,
  ) {}

  @Roles(ENUM_AUTH_ROLES.NORMAL, ENUM_AUTH_ROLES.ADMIN)
  @Post()
  create(@InjectUserId('owner_id') @Body() createCatDto: CreateCatDto) {
    return this.catService.create(createCatDto);
  }

  @Get()
  findAll() {
    return this.catService.findAll();
  }

  @Get(':id')
  findOne(@Param() catIdDto: CatIdDto) {
    return this.catService.findOne(catIdDto.id);
  }

  @Roles(ENUM_AUTH_ROLES.ADMIN, ENUM_AUTH_ROLES.NORMAL)
  @Patch(':id')
  async update(
    @Param() catIdDto: CatIdDto,
    @Body() updateCatDto: UpdateCatDto,
    @AuthUser() user: UserDocument,
  ) {
    // console.log('jdsbcjhdbchbd: ', user);
    const is_owner =
      await this.resourceOwnerVerifierService.verifyResourceOwner(
        user._id,
        'cat',
        catIdDto.id,
      );
    if (is_owner) return this.catService.update(catIdDto.id, updateCatDto);
    else throw new ForbiddenException();
  }

  @Roles(ENUM_AUTH_ROLES.NORMAL)
  @Delete(':id')
  async remove(@Param() catIdDto: CatIdDto, @AuthUser() user: UserDocument) {
    const is_owner =
      await this.resourceOwnerVerifierService.verifyResourceOwner(
        user._id,
        'cat',
        catIdDto.id,
      );
    if (is_owner) return this.catService.remove(catIdDto.id);
    else throw new ForbiddenException();
  }
}
