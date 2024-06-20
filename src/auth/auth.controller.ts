import { Controller, Post, Body, HttpCode, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EmailOtpType, MobileOtpType } from '@supabase/supabase-js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body('email') email: string, @Body('password') password: string) {
    return this.authService.signUp(email, password);
  }

  @Post('verify')
  // async verifyIdentity(@Body('email') email: string, @Body('token') token: string, @Body('type') type: EmailOtpType) {
  //   return this.authService.verifyIdentity(email, token, type);
  // }

  async verifyIdentity(@Body('token') token: string) {
    return this.authService.verifyIdentity(token);
  }

  @Post('signin')
  // @HttpCode(200)
  async signIn(@Body('email') email: string, @Body('password') password: string) {
    return this.authService.signIn(email, password);
  }

  @Post('signout')
  @HttpCode(200)
  async signOut() {
    return this.authService.signOut();
  }

  // API Endpoint : POST http://localhost:3000/auth/signup
}
