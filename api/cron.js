// Fajl: api/cron.js

// --- 1. Uvoz CommonJS modula (Google Sheets) ---
const { GoogleSpreadsheet } = require('google-spreadsheet');

// --- 2. Konstante (Mape vremena polaska i URL-ovi) ---
// NAPOMENA: Ove konstante moraju biti definisane ovde ili uvežene iz drugog fajla.
const timetableMapA = { 
    // Primer (dopunite vaše kompletne mape)
    "06:20": 1,
    "06:50": 2,
    "07:20": 3,
    // ...
};

const timetableMapB = { 
    // Primer (dopunite vaše kompletne mape)
    "06:35": 1,
    "07:05": 2,
    "07:35": 3,
    // ...
};

const URLS = [
    { 
        url: 'https://api.prometko.si/api/realtime/stations/135/arrivals', 
        timetable: timetableMapA 
    },
    { 
        url: 'https://api.prometko.si/api/realtime/stations/136/arrivals', 
        timetable: timetableMapB 
    },
    // ... dodajte ostale stanice po potrebi
];
const CLEAN_REGEX = /[^\d:.]/g;


// --- 3. Funkcija za konekciju (Koristi require) ---
async function connectToSheet() {
    // 1. Kreirajte instancu unutar async funkcije
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

    // 2. Korišćenje Service Account autentifikacije
    await doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    });
    
    await doc.loadInfo(); 
    return doc.sheetsByTitle['StanjeLinije95']; 
}

// --- 4. Glavna Handler Funkcija ---
export default async function handler(request, response) {
    // Dinamički uvoz za Node-Fetch (ES Module)
    const { default: fetch } = await import('node-fetch'); 

    // Provera radnog vremena (4:30 - 00:00)
    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();

    if (currentHour < 4 || (currentHour === 4 && currentMinute < 30) || currentHour >= 24) {
        console.log("CRON: Vreme je van radnog ciklusa (4:30 - 00:00). Preskačem izvršavanje.");
        response.status(200).json({ status: 'Skipped', reason: 'Out of time range' });
        return;
    }

    try {
        // --- A. DOHVATANJE TRENUTNIH PODATAKA SA PROMETKO.SI ---
        let currentLiveBuses = {};
        for (const { url, timetable } of URLS) {
            const apiResponse = await fetch(url);
            const data = await apiResponse.json();
            const arrivals = data.data && data.data.arrivals ? data.data.arrivals : [];

            arrivals
                .filter((bus) => bus.lc === "95" && bus.dt)
                .forEach((bus) => {
                    let apiTime = bus.dt.trim().replace(CLEAN_REGEX, '');
                    if (apiTime.includes('.')) apiTime = apiTime.split('.')[0];
                    if (apiTime.length === 5) apiTime += ":00";
                    
                    const blockNumber = timetable[apiTime];

                    if (blockNumber) {
                        currentLiveBuses[blockNumber] = {
                            vehicle: bus.i,
                            time: apiTime
                        };
                    }
                });
        }
        
        // --- B. DOHVATANJE TRENUTNOG STANJA IZ GOOGLE SHEETS ---
        const sheet = await connectToSheet();
        const rows = await sheet.getRows(); 
        
        let existingState = rows.map(r => ({
            row: r, // Čuvamo ceo red za lakše ažuriranje
            block: r.get('Broj Polaska'),
            vehicle: r.get('Vozilo'),
            isReplaced: !!r.get('Zamena Vozila') 
        }));

        const newRecords = [];
        const recordsToUpdate = [];
        
        // --- C. LOGIKA ZA PRAĆENJE PROMENA ---
        
        // Iteriramo kroz SVE trenutno pronađene autobuse
        for (const block in currentLiveBuses) {
            const liveBus = currentLiveBuses[block];
            const existingRecord = existingState.find(r => r.block == block);
            
            if (!existingRecord) {
                // NOVI POLAZAK: Dodajemo ga u Sheet
                newRecords.push({
                    'Broj Polaska': block,
                    'Vozilo': liveBus.vehicle,
                    'Vreme Polaska': liveBus.time,
                    'Vreme Prvog Pronalaska': new Date().toISOString(),
                    'Status': 'Aktivan',
                });
            } else if (existingRecord.vehicle != liveBus.vehicle && !existingRecord.isReplaced) {
                // ZAMENA VOZILA: Ažuriramo postojeći red u Sheetu
                recordsToUpdate.push({
                    row: existingRecord.row,
                    newVehicle: liveBus.vehicle,
                    zamena: `${existingRecord.vehicle} -> ${liveBus.vehicle}`
                });
            }
        }
        
        // --- D. AŽURIRANJE GOOGLE SHEETS ---
        
        // Kreiranje novih redova
        if (newRecords.length > 0) {
            await sheet.addRows(newRecords);
        }
        
        // Ažuriranje postojećih redova
        for (const update of recordsToUpdate) {
            update.row.set('Zamena Vozila', update.zamena);
            update.row.set('Status', 'Zamenjen');
            update.row.set('Vozilo', update.newVehicle);
            await update.row.save(); 
        }

        response.status(200).json({ 
            status: 'Success', 
            updates: recordsToUpdate.length,
            created: newRecords.length
        });

    } catch (error) {
        console.error('CRON Greška:', error);
        response.status(500).json({ status: 'Error', message: error.message });
    }
}
