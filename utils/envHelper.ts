
import fs from 'fs';
import path from 'path';

export function setEnvVariable(key: string, value: string) {
    const envPath = path.resolve(__dirname, '.env');

    // Read current .env content if it exists
    let envContent = '';
    if (fs.existsSync(envPath)) {
        envContent = fs.readFileSync(envPath, 'utf-8');
        const regex = new RegExp(`^${key}=.*$`, 'm');
        if (regex.test(envContent)) {
            envContent = envContent.replace(regex, `${key}=${value}`);
        } else {
            envContent += `\n${key}=${value}`;
        }
    } else {
        envContent = `${key}=${value}`;
    }

    fs.writeFileSync(envPath, envContent);
}

export function readEnvVariable(key: string): string | undefined {
    const envPath = path.resolve(__dirname, '.env');
    if (!fs.existsSync(envPath)) return;

    const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
    for (const line of lines) {
        const [k, v] = line.split('=');
        if (k === key) return v;
    }
}
