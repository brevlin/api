import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '../supabase/supabaseClient';
import { AuthError, AuthResponse, EmailOtpType, Session, SupabaseClient as SupabaseClientType, User, VerifyOtpParams } from "@supabase/supabase-js";
import SupabaseAuthRes from 'src/Types/SupabaseAuthRes';

@Injectable()
export class AuthService {
  private readonly supabase: SupabaseClientType;

  constructor(private readonly supabaseClient: SupabaseClient) {
    this.supabase = supabaseClient.getInstance();
  }

  async signUp(email: string, password: string): Promise<{ user: User; session: Session; } | AuthError> {
    const { data, error } = await this.supabase.auth.signUp({ email, password, options: {
      emailRedirectTo: 'http://localhost:3000/auth/verify',
    } });

    if (error) {
      console.log(error);
      return error;
    }

    console.log(data);
    return data;
  }

  async verifyIdentity(email: string, token: string, type: EmailOtpType) {
    const { error, data } = await this.supabase.auth.verifyOtp({email, token, type})
    
    console.log(error, data);
    

    if (error) {
      return error;
    } else {
      return data;
    }
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
