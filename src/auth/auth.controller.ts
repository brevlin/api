import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body('email') email: string, @Body('password') password: string) {
    return this.authService.signUp(email, password);
  }

  @Post('verify')
  async verifyIdentity(@Body('token') token: string) {
    console.log('token', token, '\n\n')
    return this.authService.verifyUser(token);
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

  @Post('session')
  async session(@Body('token') token: string) {
      return this.authService.userSession(token);
  }

  @Post('verify-token')
    async verifyToken(@Body('token') token: string, @Body('uid') uid: string){
        return this.authService.verifyToken(token, uid);
    }

  // API Endpoint : POST http://localhost:3000/auth/signup
}
