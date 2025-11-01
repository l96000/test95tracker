// Fajl: api/cron.js

// --- 1. Uvoz CommonJS modula ---
const GoogleSheetsManager = require('google-sheets-manager'); 

// --- 2. Konstante (Moraju biti definisane ili uvezene izvan funkcije) ---
const timetableMapA = { "06:20:00": 1, "06:50:00": 2, "07:20:00": 3 };
const timetableMapB = { "06:35:00": 1, "07:05:00": 2, "07:35:00": 3 };

const URLS = [
    { url: 'https://api.prometko.si/api/realtime/stations/135/arrivals', timetable: timetableMapA },
    { url: 'https://api.prometko.si/api/realtime/stations/136/arrivals', timetable: timetableMapB },
];
const CLEAN_REGEX = /[^\d:.]/g;


// --- 3. Funkcija za konekciju ---
async function connectToSheet() {
    const manager = new GoogleSheetsManager({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        auth: {
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }
    });
    return manager;
}

// --- 4. Glavna Handler Funkcija ---
export default async function handler(request, response) {
    // Dinamički uvoz za Node-Fetch (ES Module)
    const { default: fetch } = await import('node-fetch'); 

    // ... (Provera radnog vremena) ...

    try {
        // --- A. DOHVATANJE TRENUTNIH PODATAKA SA PROMETKO.SI ---
        let currentLiveBuses = {};
        for (const { url, timetable } of URLS) {
            const apiResponse = await fetch(url);
            // ... (Logika za prikupljanje currentLiveBuses je ista) ...
        }
        
        // --- B. DOHVATANJE TRENUTNOG STANJA IZ GOOGLE SHEETS ---
        const manager = await connectToSheet();
        const rows = await manager.readSheet('StanjeLinije95'); // Čitanje
        
        // Mapiranje redova (moramo sačuvati indeks reda za UPDATE)
        let existingState = rows.map((r, index) => ({
            row: r, // Čuvamo ceo objekat (za vrednosti)
            rowIndex: index, // Cuva originalni indeks (0-indeksiran)
            block: r['Broj Polaska'],
            vehicle: r['Vozilo'],
            isReplaced: !!r['Zamena Vozila'] 
        }));

        const newRecords = [];
        const recordsToUpdate = [];
        
        // --- C. LOGIKA ZA PRAĆENJE PROMENA ---
        for (const block in currentLiveBuses) {
            const liveBus = currentLiveBuses[block];
            const existingRecord = existingState.find(r => r.block == block);
            
            if (!existingRecord) {
                // NOVI POLAZAK: Dodajemo ga u niz za kreiranje
                newRecords.push({
                    'Broj Polaska': block,
                    'Vozilo': liveBus.vehicle,
                    'Vreme Polaska': liveBus.time,
                    'Vreme Prvog Pronalaska': new Date().toISOString(),
                    'Status': 'Aktivan',
                });
            } else if (existingRecord.vehicle != liveBus.vehicle && !existingRecord.isReplaced) {
                // ZAMENA VOZILA: Dodajemo u niz za ažuriranje
                recordsToUpdate.push({
                    rowIndex: existingRecord.rowIndex, // Koristimo indeks za ažuriranje
                    oldVehicle: existingRecord.vehicle,
                    newVehicle: liveBus.vehicle
                });
            }
        }
        
        // --- D. AŽURIRANJE GOOGLE SHEETS ---
        
        // Kreiranje novih redova
        if (newRecords.length > 0) {
            await manager.addRows('StanjeLinije95', newRecords);
        }
        
        // Ažuriranje postojećih redova
        if (recordsToUpdate.length > 0) {
            const updates = recordsToUpdate.map(update => ({
                // rowIndex je 0-indeksiran, ali Sheets API zahteva 1-indeksiran red
                // +2 jer je red 1 zaglavlje
                rowNumber: update.rowIndex + 2, 
                values: {
                    'Zamena Vozila': `${update.oldVehicle} -> ${update.newVehicle}`,
                    'Status': 'Zamenjen',
                    'Vozilo': update.newVehicle
                }
            }));
            await manager.updateRows('StanjeLinije95', updates);
        }

        response.status(200).json({ status: 'Success', updates: recordsToUpdate.length, created: newRecords.length });

    } catch (error) {
        console.error('CRON Greška:', error);
        response.status(500).json({ status: 'Error', message: error.message });
    }
}
