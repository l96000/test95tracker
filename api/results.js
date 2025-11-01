// Fajl: api/results.js

// --- 1. Uvoz novog paketa ---
const GoogleSheetsManager = require('google-sheets-manager'); 

// --- 2. Funkcija za konekciju i dohvat ---
async function connectAndGetSheet() {
    const manager = new GoogleSheetsManager({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        auth: {
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }
    });

    const rows = await manager.readSheet('StanjeLinije95');
    return rows;
}

// --- 3. Glavna Handler Funkcija ---
export default async function handler(request, response) {
    try {
        const rawResults = await connectAndGetSheet(); 
        
        const results = rawResults
            .map(r => ({
                brojPolaska: r['Broj Polaska'], 
                vozilo: r['Vozilo'],
                vreme: r['Vreme Polaska'],
                zamena: r['Zamena Vozila'] || '-', 
                status: r['Status']
            }))
            .filter(r => r.brojPolaska); 

        results.sort((a, b) => parseInt(a.brojPolaska) - parseInt(b.brojPolaska));
        
        response.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate=59');
        response.status(200).json({ results, lastUpdated: new Date().toISOString() });

    } catch (error) {
        console.error('API Greška:', error);
        response.status(500).json({ status: 'Error', message: error.message });
    }
}
