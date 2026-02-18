
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Helper to load .env.local
function loadEnv() {
    const envPath = path.join(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
        const envConfig = fs.readFileSync(envPath, 'utf-8');
        envConfig.split('\n').forEach((line) => {
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                process.env[match[1].trim()] = match[2].trim();
            }
        });
    }
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

async function setupStorage() {
    console.log('🚀 Setting up Supabase Storage for MRU...\n');

    try {
        // 1. Check if "products" bucket exists
        console.log('1️⃣ Checking if "products" bucket exists...');
        const { data: buckets, error: listError } = await supabase.storage.listBuckets();

        if (listError) {
            throw new Error(`Failed to list buckets: ${listError.message}`);
        }

        const productsBucket = buckets?.find((b) => b.id === 'products');

        if (productsBucket) {
            console.log('   ✅ Bucket "products" already exists');
            console.log(`   📊 Public: ${productsBucket.public}`);
        } else {
            // 2. Create bucket
            console.log('   📦 Creating "products" bucket...');
            const { data: newBucket, error: createError } = await supabase.storage.createBucket('products', {
                public: true,
                fileSizeLimit: 10485760, // 10MB
                allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
            });

            if (createError) {
                throw new Error(`Failed to create bucket: ${createError.message}`);
            }

            console.log('   ✅ Bucket "products" created successfully');
        }

        // 3. RLS Instructions
        console.log('\n2️⃣ RLS Policies check...');
        const migrationPath = path.join(process.cwd(), 'supabase', 'storage_seed.sql');

        if (fs.existsSync(migrationPath)) {
            console.log('   📄 Storage policy file found at: supabase/storage_seed.sql');
            console.log('   💡 Make sure to apply these policies if you haven\'t already:');
            console.log('      supabase db reset (Warning: Resets DB!) OR manually run SQL');
        } else {
            console.log('   ⚠️  No specific storage policy file found at supabase/storage_seed.sql');
        }

        // 4. Test upload
        console.log('\n3️⃣ Testing upload capability...');
        const testFileName = `test-${Date.now()}.txt`;
        const testContent = 'MRU Storage test file';

        const { error: uploadError } = await supabase.storage
            .from('products')
            .upload(`test/${testFileName}`, testContent, {
                contentType: 'text/plain',
            });

        if (uploadError) {
            console.log(`   ⚠️  Upload test failed: ${uploadError.message}`);
            console.log('   💡 (This is expected if Policies block Service Role or bucket is missing)');
        } else {
            console.log('   ✅ Upload test successful');
            // Cleanup
            await supabase.storage.from('products').remove([`test/${testFileName}`]);
            console.log('   🧹 Test file cleaned up');
        }

        console.log('\n✅ Storage Setup Check Complete!');

    } catch (error) {
        console.error('\n❌ Setup failed:', error);
        process.exit(1);
    }
}

setupStorage();
