import { IsEmail, IsNotEmpty, MinLength, MaxLength, Matches } from 'class-validator';


export class CreateUserDto {

  @IsEmail({},{
    message: 'Informe um endereço de email válido'
  })
  @IsNotEmpty({
    message: 'Informe um endereço de email'
  })
  email: string;

  @IsNotEmpty({
    message: 'Informe o nome do usuário',
  })
  @MaxLength(100, {
    message: 'O nome deve ter menos de 200 caracteres',
  })
  name: string;

  @IsNotEmpty({
    message: 'Informe uma senha',
  })
  @MinLength(8,{
    message: 'A senha deve ter no mínimo 8 caracteres',
  })
  @MaxLength(32,{
    message: 'A senha deve ter no máximo 32 caracteres',
  })
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$/)
  password: string;

  @IsNotEmpty({
    message: 'Informe a confirmação de senha',
  })
  passwordConfirmation: string;
}

