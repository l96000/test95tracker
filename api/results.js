// Fajl: api/results.js (Koristi Google Sheets API)

// Uvozimo GoogleSpreadsheet konstruktor
//import GS from 'google-spreadsheet'; 

// Ponekad je klasa skrivena unutar 'default' svojstva kada se koristi 'import'
//const { GoogleSpreadsheet } = GS.default || GS;

// const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
const { GoogleSpreadsheet } = require('google-spreadsheet');
const fetch = require('node-fetch');

async function connectAndGetSheet() { // ili connectToSheet
    
    // 1. Uvezite ceo modul i izvadite klasu
    //const { GoogleSpreadsheet } = await import('google-spreadsheet'); 
    
    // 2. Kreirajte instancu
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

    // 3. Autentifikacija
    await doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    });
    
    await doc.loadInfo();
    return doc.sheetsByTitle['StanjeLinije95'];
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
