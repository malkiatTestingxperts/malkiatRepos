import { expect, Page, test } from '@playwright/test';
import fs from 'fs';
import pdf from 'pdf-parse';
import path from 'path';
import * as XLSX from "xlsx";
import { DateHelper } from '../utils/DateHelper';

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

export function UpdateExcelFile(page: Page) {
    const dateHelper = new DateHelper(page);
    // Read the Excel file
    const workbook = XLSX.readFile("D:\\fgh_automation\\test-data\\040325.xlsx");
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convert sheet to JSON
    const data = XLSX.utils.sheet_to_json<any>(worksheet);
    const journalDate = dateHelper.getFormattedDateOffsetorImport(0); // or -0 is fine
    console.log(`Journal Date: ${journalDate}`);

    data.forEach((row, index) => {
        const random4Digit = Math.floor(1000 + Math.random() * 9000);
        console.log(`Row ${index + 1} - Random 4-digit number: ${random4Digit}`);

        row["Cheques issued date"] = journalDate;
        row["Cheque No.s"] = random4Digit;
    });

    // Convert back to worksheet
    const newWorksheet = XLSX.utils.json_to_sheet(data);
    workbook.Sheets[sheetName] = newWorksheet;

    // Save the updated file
    XLSX.writeFile(workbook, "updated-file.xlsx");

    console.log("All rows updated successfully.");
}

export async function DeleteFile(page: Page, filePath: string) {
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`Deleted file: ${filePath}`);
    } else {
        console.warn(`File not found: ${filePath}`);
    }
}