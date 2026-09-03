/**
 * Script untuk menghasilkan JWT Secret dan Token untuk PostgREST
 * Cara pakai: node scripts/generate-jwt.js [optional_secret]
 */

import crypto from 'crypto';

function generateToken(role, secret, expiresInDays = 3650) {
    const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
    const now = Math.floor(Date.now() / 1000);
    const payload = Buffer.from(JSON.stringify({
        role: role,
        iss: 'postgrest',
        iat: now,
        exp: now + (expiresInDays * 86400)
    })).toString('base64url');

    const signature = crypto.createHmac('sha256', secret)
        .update(`${header}.${payload}`)
        .digest('base64url');

    return `${header}.${payload}.${signature}`;
}

const secret = process.argv[2] || crypto.randomBytes(32).toString('hex');

const anonToken = generateToken('web_anon', secret);
const adminToken = generateToken('web_admin', secret);

console.log('===========================================================');
console.log('🔑 JWT CREDENTIALS UNTUK POSTGREST & WEBCIJOHO');
console.log('===========================================================');
console.log('\n1. Masukkan ini di docker-compose.yml VPS (PGRST_JWT_SECRET):');
console.log('-----------------------------------------------------------');
console.log(`PGRST_JWT_SECRET: "${secret}"`);

console.log('\n2. Anon Token (role: web_anon, untuk VITE_SUPABASE_ANON_KEY di GitHub Secrets):');
console.log('-----------------------------------------------------------');
console.log(anonToken);

console.log('\n3. Admin Token (role: web_admin, untuk Admin Dashboard):');
console.log('-----------------------------------------------------------');
console.log(adminToken);
console.log('\n===========================================================');
