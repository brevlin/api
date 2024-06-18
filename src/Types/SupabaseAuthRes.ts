// import { UserAppMetadata } from "@supabase/supabase-js";

export default interface SupabaseAuthRes {
    success: boolean;
    type: 'signup' | 'signin'; // TODO : Add 'passwordRecovery' etc.
    data: any;
    userId: string;
}