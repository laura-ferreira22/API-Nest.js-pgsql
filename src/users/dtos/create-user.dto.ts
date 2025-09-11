import { IsEmail, IsNotEmpty, MinLength, MaxLength, Matches } from 'class-validator';


export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$/)
  password: string;

  @IsNotEmpty()
  passwordConfirmation: string;
}

