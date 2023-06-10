import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignupDto } from "./dto/signup.dto";
import { User } from "./schemas/user.schema";
import { LoginDto } from "./dto/login.dto";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() signupDto: SignupDto): Promise<{ token: string }>
  {
     return this.authService.signUp(signupDto);
  }

  @Post('sigin')
  async signIn(@Body() loginDto: LoginDto) : Promise<{token : string}>
  {
     return this.authService.login(loginDto);
  }
}
