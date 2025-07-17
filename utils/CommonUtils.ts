import { expect, Page, test } from '@playwright/test';
import fs from 'fs';
import pdf from 'pdf-parse';
import path from 'path';

export function generateRandomPostcode() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';

    const part1 =
        letters.charAt(Math.floor(Math.random() * letters.length)) +
        letters.charAt(Math.floor(Math.random() * letters.length)) +
        digits.charAt(Math.floor(Math.random() * digits.length)) +
        letters.charAt(Math.floor(Math.random() * letters.length));

    const part2 =
        digits.charAt(Math.floor(Math.random() * digits.length)) +
        letters.charAt(Math.floor(Math.random() * letters.length)) +
        letters.charAt(Math.floor(Math.random() * letters.length));

    return `${part1} ${part2}`;
}
