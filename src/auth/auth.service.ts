import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '../supabase/supabaseClient';
import { AuthError, AuthResponse, EmailOtpType, Session, SupabaseClient as SupabaseClientType, User, VerifyOtpParams } from "@supabase/supabase-js";

@Injectable()
export class AuthService {
  private readonly supabase: SupabaseClientType;

  constructor(private readonly supabaseClient: SupabaseClient) {
    this.supabase = supabaseClient.getInstance();
  }

  async signUp(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signUp({ email, password, options: {
      emailRedirectTo: 'http://localhost:3000/auth/verify',
    } });
    
    if (error) {
      return error;
    }

    return data;
  }

  async verifyIdentity(token: string, type: EmailOtpType) {
    const { error, data } = await this.supabase.auth.verifyOtp({type, token_hash: token})
    
    console.log('error', error);
    

    if(error) throw error;
    return data;
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
