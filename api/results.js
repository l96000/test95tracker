// Fajl: api/results.js (Koristi Google Sheets API)

const { GoogleSpreadsheet } = await import('google-spreadsheet');
// ... (Iste Environment Variables kao u cron.js) ...

// const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

async function connectAndGetSheet() {
    await doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    });
    await doc.loadInfo();
    return doc.sheetsByTitle['Stanjelinije95'];
}

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
            // Filtrirajte prazne redove ako ih ima
            .filter(r => r.brojPolaska); 

        // Ručno sortiranje po Broju Polaska
        results.sort((a, b) => parseInt(a.brojPolaska) - parseInt(b.brojPolaska));
        
        response.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate=59');
        response.status(200).json({ results, lastUpdated: new Date().toISOString() });

    } catch (error) {
        console.error('API Greška:', error);
        response.status(500).json({ status: 'Error', message: error.message });
    }
}
