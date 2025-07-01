import { expect, Page, test } from '@playwright/test';
import fs from 'fs';
import pdf from 'pdf-parse';
import path from 'path';

export async function ReadPdf(page: Page, filename = 'downloaded.pdf'): Promise<string> {
    const dataBuffer = fs.readFileSync("D:\\fgh_automation\\test-data\\downloaded.pdf");
    const pdfData = await pdf(dataBuffer);
    return pdfData.text;
}

export async function DeletePdf(page: Page, filePath: string) {
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdf(dataBuffer);
    fs.unlinkSync(filePath);
}

export function AssertTextsInPdf(pdfText: string, expectedTexts: string[]) {
    for (const expected of expectedTexts) {
        expect(pdfText, `Expected to find text: "${expected}"`).toContain(expected);
    }
}
