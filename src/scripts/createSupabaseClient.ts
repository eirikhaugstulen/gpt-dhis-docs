import {createClient} from "@supabase/supabase-js";

export const createSupabaseClient = () => createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL as string,
        process.env.NEXT_PUBLIC_SUPABASE_KEY as string
    );
