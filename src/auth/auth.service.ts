import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '../supabase/supabaseClient';
import { SupabaseClient as SupabaseClientType } from "@supabase/supabase-js";
import SupabaseAuthRes from 'src/Types/SupabaseAuthRes';

@Injectable()
export class AuthService {
  private readonly supabase: SupabaseClientType;

  constructor(private readonly supabaseClient: SupabaseClient) {
    this.supabase = supabaseClient.getInstance();
  }

  async signUp(email: string, password: string): Promise<SupabaseAuthRes> {
    const { data, error } = await this.supabase.auth.signUp({ email, password,
      options: {
        emailRedirectTo: `http://localhost:3000/auth/verify/signup`
      }
    });
    if (error) throw error;
    return {
      type: 'signup',
      data,
      userId: data.user.id
    };
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    if (error) throw error;
  }
}
