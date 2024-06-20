import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '../supabase/supabaseClient';
import { AuthError, AuthResponse, EmailOtpType, Session, SupabaseClient as SupabaseClientType, User, VerifyOtpParams } from "@supabase/supabase-js";

@Injectable()
export class AuthService {
  private readonly supabase: SupabaseClientType;

  constructor(private readonly supabaseClient: SupabaseClient) {
    this.supabase = supabaseClient.getInstance();
  }

  async signUp(email: string, password: string): Promise<{ user: User; session: Session; } | { user: null; session: null; } | AuthError>{
    const { data, error } = await this.supabase.auth.signUp({ email, password, options: {
      emailRedirectTo: 'http://localhost:3000/auth/verify',
    } });
    
    if (error) {
      console.log('error', error);
      
      return error;
    }

    return data;
  }

  async verifyIdentity(token: string) {
    // const { data, error } = await this.supabase.auth.verifyOtp({ email, token, type})
    
    // console.log('error', error);

    // console.log(token);
    // console.log('data', data);
    

    // if(error) throw error;
    // return data;

    const { data, error } = await this.supabase.auth.getUser(token);
    console.log(data, error);
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
