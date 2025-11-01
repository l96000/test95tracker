// Fajl: api/cron.js (Koristi Google Sheets API)

import { GoogleSpreadsheet } from 'google-spreadsheet';
// Nema potrebe za importom googleapis direktno, google-spreadsheet je dovoljan

// --- Konekcija na Sheet ---
const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

async function connectToSheet() {
    await doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Važno: konvertujemo \n nazad u prelome linija
    });
    await doc.loadInfo(); // Učitavanje svih Sheet-ova
    return doc.sheetsByTitle['Stanjelinije95']; // Ime sheet-a
}

// ... unutar export default async function handler(...) ...

    // 2. DOHVATANJE TRENUTNOG STANJA IZ GOOGLE SHEETS
    const sheet = await connectToSheet();
    const rows = await sheet.getRows(); // Dohvati sve redove

    let existingState = rows.map(r => ({
        id: r.rowNumber, // Google Sheets ima rowNumber kao ID
        block: r.get('Broj Polaska'),
        vehicle: r.get('Vozilo'),
        isReplaced: !!r.get('Zamena Vozila') // Provera
    }));

    // ... (Ista logika za praćenje promena i kreiranje/ažuriranje) ...
    // RecordsToCreate su objekti za stvaranje novih redova
    // RecordsToUpdate su objekti sa rowNumber-om za ažuriranje

    // 4. AŽURIRANJE GOOGLE SHEETS

    // 4a. Kreiranje novih (koristimo dodavanje celih redova)
    if (recordsToCreate.length > 0) {
        // Mapiranje objekata na nizove koje sheets očekuje
        const newRows = recordsToCreate.map(r => ({
            'Broj Polaska': r.fields['Broj Polaska'],
            'Vozilo': r.fields['Vozilo'],
            'Vreme Polaska': r.fields['Vreme Polaska'],
            'Vreme Prvog Pronalaska': r.fields['Vreme Prvog Pronalaska'],
            'Status': r.fields['Status']
            // Ostale kolone su prazne po defaultu
        }));
        await sheet.addRows(newRows);
    }
    
    // 4b. Ažuriranje postojećih
    for (const update of recordsToUpdate) {
        const rowToUpdate = rows.find(r => r.rowNumber === update.id);
        if (rowToUpdate) {
            rowToUpdate.set('Zamena Vozila', update.fields['Zamena Vozila']);
            rowToUpdate.set('Status', update.fields['Status']);
            rowToUpdate.set('Vozilo', update.fields['Vozilo']);
            await rowToUpdate.save(); 
        }
    }
    // ... (ostatak funkcije) ...
