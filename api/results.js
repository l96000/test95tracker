// Fajl: api/results.js

// --- 1. Uvoz CommonJS modula (Google Sheets) ---
const { GoogleSpreadsheet } = require('google-spreadsheet');

// --- 2. Funkcija za konekciju i dohvat ---
async function connectAndGetSheet() {
    // 1. Kreirajte instancu
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

    // 2. Korišćenje Service Account autentifikacije
    await doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    });
    
    await doc.loadInfo();
    return doc.sheetsByTitle['StanjeLinije95'];
}

// --- 3. Glavna Handler Funkcija ---
export default async function handler(request, response) {
    try {
        const sheet = await connectAndGetSheet();
        const rows = await sheet.getRows(); 
        
        // Sortiranje i formatiranje rezultata
        const results = rows
            .map(r => ({
                brojPolaska: r.get('Broj Polaska'),
                vozilo: r.get('Vozilo'),
                vreme: r.get('Vreme Polaska'),
                zamena: r.get('Zamena Vozila') || '-', 
                status: r.get('Status')
            }))
            // Filtrirajte prazne redove
            .filter(r => r.brojPolaska); 

        // Ručno sortiranje po Broju Polaska
        results.sort((a, b) => parseInt(a.brojPolaska) - parseInt(b.brojPolaska));
        
        // Postavke keširanja (da se ne poziva prečesto)
        response.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate=59');
        response.status(200).json({ results, lastUpdated: new Date().toISOString() });

    } catch (error) {
        console.error('API Greška:', error);
        response.status(500).json({ status: 'Error', message: error.message });
    }
}
