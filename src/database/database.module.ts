import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DatabaseController } from './database.controller';
import { SupabaseModule } from '../supabase/supabase.module';
import {AuthService} from "../auth/auth.service";

@Module({
    imports: [SupabaseModule],
    providers: [DatabaseService, AuthService],
    controllers: [DatabaseController],
})
export class DatabaseModule {}
