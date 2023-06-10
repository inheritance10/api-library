import { Injectable, UnauthorizedException } from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import { User } from "./schemas/user.schema";
import { Model } from "mongoose";
import * as bcrypt from 'bcryptjs'
import { JwtService } from "@nestjs/jwt";
import { SignupDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>, //user table or model
    private jwtService : JwtService
  ) {}

  async signUp(signUpDto: SignupDto): Promise<{ token: string }> {
    const { name, email, password } = signUpDto;

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      password : hashPassword
    });

    const token = this.jwtService.sign({ id: user._id });

    return { token: token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string; /*user: User*/ }> { //promise ile geriye ne değer dondurecegimizi belirtiyoruz
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id });

    return { token: token};
  }

}
