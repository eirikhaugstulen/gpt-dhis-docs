import {createClient} from "@supabase/supabase-js";

export const createSupabaseClient = () => createClient(
        process.env.REACT_APP_SUPABASE_URL as string,
        process.env.REACT_APP_SUPABASE_KEY as string
    );
