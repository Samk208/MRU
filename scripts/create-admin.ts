
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Helper to load .env.local with robust parsing
function loadEnv() {
    const envPath = path.join(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
        console.log(`Loading env from ${envPath}`);
        const envConfig = fs.readFileSync(envPath, 'utf-8');

        if (envConfig.includes('\u0000')) {
            const cleaned = envConfig.replace(/\u0000/g, '');
            parseEnvLines(cleaned);
            return;
        }

        parseEnvLines(envConfig);
    } else {
        console.warn(`⚠️  .env.local not found at ${envPath}`);
    }
}

function parseEnvLines(content: string) {
    content.split(/\r?\n/).forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return;

        const splitIdx = trimmed.indexOf('=');
        if (splitIdx > 0) {
            const key = trimmed.substring(0, splitIdx).trim();
            const val = trimmed.substring(splitIdx + 1).trim();
            const cleanVal = val.replace(/^["']|["']$/g, '');
            process.env[key] = cleanVal;
        }
    });
}

loadEnv();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error('❌ Missing required environment variables');
    console.error('Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

async function createAdminUser() {
    console.log('🛡️ Creating/Verifying Admin User for MRU...');

    const EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
    const PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

    console.log(`Target Email: ${EMAIL}`);

    // 1. Check if user exists
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();

    if (listError) {
        console.error('❌ Error listing users:', listError.message);
        return;
    }

    const existingUser = users.find(u => u.email === EMAIL);

    if (existingUser) {
        console.log(`✅ User ${EMAIL} already exists (ID: ${existingUser.id})`);

        // Update metadata to ensure admin role
        const { data: user, error: updateError } = await supabase.auth.admin.updateUserById(
            existingUser.id,
            {
                password: PASSWORD,
                email_confirm: true,
                user_metadata: { role: 'admin' },
                app_metadata: { role: 'admin' }
            }
        );

        if (updateError) {
            console.error('❌ Failed to update admin user:', updateError.message);
        } else {
            console.log('✅ Admin permissions updated/verified');
        }
    } else {
        // Create new admin user
        const { data: user, error: createError } = await supabase.auth.admin.createUser({
            email: EMAIL,
            password: PASSWORD,
            email_confirm: true,
            user_metadata: { role: 'admin' },
            app_metadata: { role: 'admin' }
        });

        if (createError) {
            console.error('❌ Failed to create admin user:', createError.message);
        } else {
            console.log(`✅ Admin user created successfully (ID: ${user?.user.id})`);
        }
    }
}

createAdminUser();
