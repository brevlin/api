import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createClient, SupabaseClient as SupabaseClientType } from "@supabase/supabase-js";

@Injectable()
export class SupabaseClient {
    private readonly supabaseClient: SupabaseClientType;

    constructor(configService: ConfigService) {
        this.supabaseClient = createClient(
            configService.get<string>('SUPABASE_URL'),
            configService.get<string>('SUPABASE_KEY')
        );
    }

    getInstance() {
        return this.supabaseClient;
    }
}
