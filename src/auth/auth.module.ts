import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SupabaseModule } from '../supabase/supabase.module';
import {JwtService} from "@nestjs/jwt";

@Module({
  imports: [SupabaseModule],
  providers: [AuthService, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
