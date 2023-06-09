import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import { User } from "./schemas/user.schema";
import { Model } from "mongoose";
import * as bcrypt from 'bcryptjs'
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>, //user table or model
    private jwtService : JwtService
  ) {}

  async signUp(signUpDto)
  {
    const {name, email, password} = signUpDto;

    const hashPassword = await bcrypt.hash(password, 10); //hash password

    const user = await this.userModel.create({
      name,
      email,
      hashPassword
    });

    const token = this.jwtService.sign({id: user._id})

    return token;
  }
}
