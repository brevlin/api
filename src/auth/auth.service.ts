import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '../supabase/supabaseClient';
import { SupabaseClient as SupabaseClientType } from "@supabase/supabase-js";

@Injectable()
export class AuthService {
  private readonly supabase: SupabaseClientType;

  constructor(
      private readonly supabaseClient: SupabaseClient,
  ) {
    this.supabase = supabaseClient.getInstance();
  }

  async signUp(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signUp({ email, password, options: {
      emailRedirectTo: 'http://localhost:3000/auth/callback'
    } });
    
    if (error) {
      console.log('error', error);
      
      return error;
    }

    console.log(data.user, 'data')

    return data;

    /*
    const user = await this.supabase.auth.signInWithPassword({ email, password });
    if (!user) return user.error;

    console.log(user)

    const session = await this.supabase.auth.setSession({
      refresh_token: user.data.session.refresh_token,
      access_token: user.data.session.access_token,
    });

    return { data, session: session.data.session };
     */
  }

  async verifyUser(token: string) {
    const { data, error } = await this.supabase.auth.getUser(token);

    if (error) {
      return error;
    }

    return data.user;
  }

  async signIn(email: string, providedPassword: string) {
    const {data, error} = await this.supabase.auth.signInWithPassword({ email, password: providedPassword });
    if (error) {
      return error;
    }

    const session = await this.supabase.auth.setSession({
      refresh_token: data.session.refresh_token,
      access_token: data.session.access_token,
    });

    return { data, session };
  }

  async userSession(localToken: string) {
    const {data, error} = await this.supabase.auth.getSession()
    if (error) throw error;
    console.log(data, 'data')
    if (data && data.session.refresh_token === localToken) {
      return data;
    }
    return null;
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    if (error) throw error;
  }

  async verifyToken(token: string, userId: string) {
    const { data, error } = await this.supabase.auth.getUser(token);
    if (error) {
      console.log('error', error);
      return error;
    }
    if (data.user.id === userId) {
      return data;
    }
    return null;
  }
}

// TODO Agencer le code pour qu'il soit plus lisible
