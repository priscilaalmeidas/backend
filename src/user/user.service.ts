/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async update(id: string, createUserDto: CreateUserDto): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, createUserDto, {
      new: true,
    });
  }

  async login(loginDto: LoginDto): Promise<User> {
    const user = await this.userModel.findOne({
      email: loginDto.email,
      password: loginDto.password,
    });
    if (user) {
      return user;
    }
    throw new UnauthorizedException('Credenciais inválidas');
  }

  responseToken(user: User): { access_token: string; user: User } {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: user,
    };
  }

  async findOne(id: string): Promise<User | null> {
    return this.userModel.findById(id);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findByName(name: string): Promise<User[]> {
    return this.userModel
      .find({ name: { $regex: name, $options: 'i' } })
      .exec();
  }

  async remove(id: string): Promise<User | null> {
    return await this.userModel.findOneAndDelete({ _id: id });
  }
}
