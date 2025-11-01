// Fajl: api/results.js

// --- 1. Uvoz novog paketa (Rešavanje problema sa 'constructor') ---
const GoogleSheetsManager = require('google-sheets-manager').default || require('google-sheets-manager');

// --- 2. Funkcija za konekciju i dohvat ---
async function connectAndGetSheet() {
    // 1. Instancirajte Manager sa AUTORIZACIJOM
    const manager = new GoogleSheetsManager({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        auth: {
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }
    });

    // 2. Čitanje redova direktno. Vraća niz JS objekata.
    const rows = await manager.readSheet('StanjeLinije95');
    
    return rows;
}

// --- 3. Glavna Handler Funkcija ---
export default async function handler(request, response) {
    try {
        const rawResults = await connectAndGetSheet(); 
        
        // Mapiranje (pristupamo svojstvima kao običnim objektima)
        const results = rawResults
            .map(r => ({
                // Pristup koloni: r['Naziv Kolone']
                brojPolaska: r['Broj Polaska'], 
                vozilo: r['Vozilo'],
                vreme: r['Vreme Polaska'],
                zamena: r['Zamena Vozila'] || '-', 
                status: r['Status']
            }))
            .filter(r => r.brojPolaska); 

        // Ručno sortiranje po Broju Polaska
        results.sort((a, b) => parseInt(a.brojPolaska) - parseInt(b.brojPolaska));
        
        // Postavke keširanja
        response.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate=59');
        response.status(200).json({ results, lastUpdated: new Date().toISOString() });

    } catch (error) {
        console.error('API Greška:', error);
        // Greška autorizacije će proći kao 500, ali će logovi biti jasniji
        response.status(500).json({ status: 'Error', message: error.message });
    }
}
