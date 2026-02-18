
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Helper to load .env.local with robust parsing
function loadEnv() {
    const envPath = path.join(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
        console.log(`Loading env from ${envPath}`);
        const envConfig = fs.readFileSync(envPath, 'utf-8');

        // Check for obvious encoding issues (e.g. null bytes from UTF-16 read as UTF-8)
        if (envConfig.includes('\u0000')) {
            console.warn('⚠️  Detected null bytes in .env.local (likely UTF-16 LE encoding). Parsing cautiously.');
            // specialized parse or suggestion to user?
            // simple hack: remove null bytes for basic ascii content
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
            // Remove quotes if present
            const cleanVal = val.replace(/^["']|["']$/g, '');
            process.env[key] = cleanVal;
        }
    });
}

loadEnv();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error('❌ Missing environment variables in .env.local');
    console.error('Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
    },
});

async function checkHealth() {
    console.log('🚀 Checking Database & Storage Health for MRU...\n');

    try {
        // 1. Check Auth Users
        console.log('1️⃣ Checking Auth Users...');
        const { data: users, error: userError } = await supabase.auth.admin.listUsers();

        if (userError) {
            console.error(`❌ Auth check failed: ${userError.message}`);
        } else {
            console.log(`✅ Auth service available. Found ${users?.users.length || 0} users.`);
        }

        // 2. Check Storage Buckets
        console.log('\n2️⃣ Checking Storage Buckets...');
        const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();

        if (bucketError) {
            console.error(`❌ Storage check failed: ${bucketError.message}`);
        } else {
            console.log(`✅ Storage service available. Found ${buckets?.length || 0} buckets.`);
            buckets?.forEach(b => console.log(`   - ${b.id} (public: ${b.public})`));
        }

        // 3. Check Public Tables via SQL (PostgREST doesn't list tables directly easily without specific RPC or accessing information_schema)
        // We'll try to select from 'products' table as a canary check
        console.log('\n3️⃣ Checking Key Tables...');

        const tablesToCheck = ['products', 'orders', 'users', 'storefronts']; // Assuming these exist from context

        for (const table of tablesToCheck) {
            const { data, error, count } = await supabase
                .from(table)
                .select('*', { count: 'exact', head: true });

            if (error) {
                if (error.code === '42P01') {
                    console.log(`❌ Table '${table}' DOES NOT EXIST (or RLS blocks access)`);
                } else {
                    console.log(`⚠️  Error checking '${table}': ${error.message}`);
                }
            } else {
                console.log(`✅ Table '${table}' exists and is accessible. (${count || 0} rows)`);
            }
        }

        console.log('\n✨ Health Check Complete!\n');

    } catch (error) {
        console.error('\n❌ Health check failed:', error);
        process.exit(1);
    }
}

checkHealth();
