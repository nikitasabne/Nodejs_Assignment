import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserIdDto } from './dto/user-id.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { ENUM_AUTH_ROLES } from '../constants';
import { ProductPaginationDto } from '../product/dto/Product-pagination.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /*@Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }*/

  @Roles(ENUM_AUTH_ROLES.ADMIN)
  @Get()
  findAll(@Body() params: ProductPaginationDto) {
    return this.userService.findAll(
      params?.skip,
      params?.limit,
      params?.start_key,
      params?.sort?.field,
      params?.sort?.order,
      params?.filter,
      params?.projection,
    );
  }

  @Roles(ENUM_AUTH_ROLES.ADMIN, ENUM_AUTH_ROLES.NORMAL)
  @Get(':id')
  findOne(@Param() userIdDto: UserIdDto) {
    return this.userService.findOne(userIdDto.id);
  }

  @Roles(ENUM_AUTH_ROLES.ADMIN)
  @Patch(':id')
  update(@Param() userIdDto: UserIdDto, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(userIdDto.id, updateUserDto);
  }

  @Roles(ENUM_AUTH_ROLES.ADMIN)
  @Delete(':id')
  remove(@Param() userIdDto: UserIdDto) {
    return this.userService.remove(userIdDto.id);
  }
}
