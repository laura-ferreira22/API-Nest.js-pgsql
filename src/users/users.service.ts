import { Injectable, ConflictException, InternalServerErrorException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserRole } from './enums';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  

  // Criação de usuário ADMIN
  async createAdminUser(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password !== createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    }

    return this.createUser(createUserDto, UserRole.ADMIN);
  }

  // Método genérico de criação de usuário
  public async createUser(createUserDto: CreateUserDto, role: UserRole): Promise<User> {
    const { email, name, password } = createUserDto;

    const user = this.userRepository.create({
      email,
      name,
      role,
      status: true,
      confirmationToken: crypto.randomBytes(32).toString('hex'),
    });

    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(password, user.salt);

    try {
      return await this.userRepository.save(user);
    } catch (error: any) {
      if (error.code?.toString() === '23505') {
        throw new ConflictException('Endereço de email já está em uso');
      } else {
        throw new InternalServerErrorException('Erro ao salvar o usuário no banco de dados');
      }
    }
  }
}
