import { Injectable, Global, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../../user/services/user.service';
import { User } from 'src/user/entities/user.entity';
import { PayLoadToken } from '../interfaces/auth.interface';

@Global()
@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  //We bring the user to validate the password
  //............................................................................
  public async login(userName: string, password: string) {
    const user = await this.userService.findOneByEmail(userName);
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return await this.generateJwt(user);
  }

  //We create the JWT
  //............................................................................
  public signJWT({
    payload,
    secret,
    expires,
  }: {
    payload: jwt.JwtPayload;
    secret: string;
    expires: number | string;
  }) {
    return jwt.sign(payload, secret, { expiresIn: expires });
  }

  //We generate the JWT
  //............................................................................
  public async generateJwt(user: User): Promise<any> {
    const getUser = await this.userService.findOne(user.id);
    const payload: PayLoadToken = {
      sub: getUser.id.toString(),
      role: getUser.role,
    };
    return {
      accessToken: this.signJWT({
        payload,
        secret: process.env.JWT_SECRET,
        expires: '1h',
      }),
      user: getUser,
    };
  }
}
