import { Injectable } from '@nestjs/common';
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
      hashPassword
    });

    const token = this.jwtService.sign({ id: user._id });

    return { token: token };
  }

 /* async login(loginDto : LoginDto) : Promise<{token : string}>
  {
    const {email, password } = loginDto;

    //const hashPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      email,
      password
    });

    const token = this.jwtService.sign({ id: user._id });

    return { token: token };

    return {token : token}
  }*/

}
