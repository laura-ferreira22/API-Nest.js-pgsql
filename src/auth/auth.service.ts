import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UserRole } from 'src/users/enums';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

   async signUp(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password != createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      return await this.usersService.createUser(createUserDto, UserRole.USER);
    }
  }
  
}

