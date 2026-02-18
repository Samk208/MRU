
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

console.log('🔍 Checking Stripe Readiness for MRU...\n');

const requiredEnvVars = [
    'STRIPE_SECRET_KEY',
    'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
    'STRIPE_WEBHOOK_SECRET'
];

const missingVars: string[] = [];

requiredEnvVars.forEach(varName => {
    const value = process.env[varName];
    if (!value) {
        console.log(`❌ Missing: ${varName}`);
        missingVars.push(varName);
    } else if (value.includes('your_') || value.includes('_here')) {
        console.log(`⚠️  ${varName} has placeholder value`);
    } else {
        const masked = value.substring(0, 12) + '...' + value.substring(value.length - 4);
        console.log(`✅ ${varName}: ${masked}`);
    }
});

if (missingVars.length > 0) {
    console.log('\n❌ Missing required environment variables!');
}

console.log('\n🔍 Checking Packages...');

try {
    require.resolve('stripe');
    console.log('✅ stripe package installed');
} catch (e) {
    console.log('❌ stripe package NOT installed');
}

console.log('\n🔍 Checking Files...');

const requiredFiles = [
    'lib/stripe/server.ts',
    'lib/stripe/client.ts'
];

requiredFiles.forEach(file => {
    if (fs.existsSync(path.join(process.cwd(), file))) {
        console.log(`✅ ${file} exists`);
    } else {
        console.log(`❌ ${file} missing`);
    }
});
