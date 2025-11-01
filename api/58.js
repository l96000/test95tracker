// Fajl: api/get-data.js

import fetch from 'node-fetch';

// --- 1. KOMPLETAN RED VOŽNJE (Vaši podaci) ---
const timetableMapA = {

"05:10:00": 7,
"05:30:00": 8,
"05:45:00": 10,

"06:00:00": 1,
"06:15:00": 2,
"06:30:00": 3,
"06:45:00": 4,

"07:00:00": 5,
"07:15:00": 6,
"07:30:00": 7,
"07:45:00": 8,

"08:00:00": 9,
"08:15:00": 10,
"08:30:00": 1,
"08:45:00": 2,

"09:00:00": 3,
"09:15:00": 4,
"09:30:00": 5,
"09:45:00": 6,

"10:00:00": 7,
"10:15:00": 8,
"10:30:00": 9,
"10:45:00": 10,

"11:00:00": 1,
"11:15:00": 2,
"11:30:00": 3,
"11:45:00": 4,

"12:00:00": 5,
"12:15:00": 6,
"12:30:00": 7,
"12:45:00": 8,

"13:00:00": 9,
"13:15:00": 10,
"13:30:00": 1,
"13:45:00": 2,

"14:00:00": 3,
"14:15:00": 4,
"14:30:00": 5,
"14:45:00": 6,

"15:00:00": 7,
"15:15:00": 8,
"15:30:00": 9,
"15:45:00": 10,

"16:00:00": 1,
"16:15:00": 2,
"16:30:00": 3,
"16:45:00": 4,

"17:00:00": 5,
"17:15:00": 6,
"17:30:00": 7,
"17:45:00": 8,

"18:00:00": 9,
"18:15:00": 10,
"18:30:00": 1,
"18:45:00": 2,

"19:00:00": 3,
"19:16:00": 4,
"19:33:00": 5,
"19:50:00": 6,

"20:00:00": 7,
"20:08:00": 8,
"20:26:00": 9,
"20:44:00": 10,

"21:02:00": 1,
"21:20:00": 3,
"21:45:00": 4,
"21:48:00": 5,

"22:10:00": 6,
"22:18:00": 8,
"22:40:00": 9,
"22:53:00": 10,

"23:10:00": 1,
"23:30:00": 3,
"23:50:00": 4,

};
const timetableMapB = {
 
"04:45:00": 1,

"05:15:00": 3,
"05:35:00": 4,
"05:55:00": 6,


"06:15:00": 7,
"06:30:00": 8,
"06:45:00": 9,


"07:00:00": 10,
"07:15:00": 1,
"07:30:00": 2,
"07:45:00": 3,


"08:00:00": 4,
"08:15:00": 5,
"08:30:00": 6,
"08:45:00": 7,


"09:00:00": 8,
"09:15:00": 9,
"09:30:00": 10,
"09:45:00": 1,


"10:00:00": 2,
"10:15:00": 3,
"10:30:00": 4,
"10:45:00": 5,


"11:00:00": 6,
"11:15:00": 7,
"11:30:00": 8,
"11:45:00": 9,


"12:00:00": 10,
"12:15:00": 1,
"12:30:00": 2,
"12:45:00": 3,


"13:00:00": 4,
"13:15:00": 5,
"13:30:00": 6,
"13:45:00": 7,


"14:00:00": 8,
"14:15:00": 9,
"14:30:00": 10,
"14:45:00": 1,


"15:00:00": 2,
"15:15:00": 3,
"15:30:00": 4,
"15:45:00": 5,


"16:00:00": 6,
"16:15:00": 7,
"16:30:00": 8,
"16:45:00": 9,


"17:00:00": 10,
"17:15:00": 1,
"17:30:00": 2,
"17:45:00": 3,


"18:00:00": 4,
"18:15:00": 5,
"18:30:00": 6,
"18:45:00": 7,


"19:01:00": 8,
"19:17:00": 9,
"19:34:00": 10,
"19:51:00": 1,
"19:55:00": 2,


"20:09:00": 3,
"20:26:00": 4,
"20:43:00": 5,


"21:01:00": 6,
"21:18:00": 8,
"21:35:00": 9,
"21:53:00": 10,


"22:10:00": 1,
"22:30:00": 3,
"22:50:00": 4,
};
const URLS = [
    { url: "https://beograd.prometko.si/api/stations/arrivals?station=20998", timetable: timetableMapA },
    { url: "https://beograd.prometko.si/api/stations/arrivals?station=21035", timetable: timetableMapA },
    { url: "https://beograd.prometko.si/api/stations/arrivals?station=20268", timetable: timetableMapA },
    { url: "https://beograd.prometko.si/api/stations/arrivals?station=22131", timetable: timetableMapB },
    { url: "https://beograd.prometko.si/api/stations/arrivals?station=20272", timetable: timetableMapB },
	{ url: "https://beograd.prometko.si/api/stations/arrivals?station=20985", timetable: timetableMapB },
];
const CLEAN_REGEX = /[^\d:.]/g;

// --- 2. OVO JE GLAVNA VERCEL FUNKCIJA ---
export default async function handler(request, response) {
    let allResults = [];
    
    for (const { url, timetable } of URLS) {
        try {
            const apiResponse = await fetch(url);
            if (!apiResponse.ok) continue;
            
            const data = await apiResponse.json();
            const arrivals = data.data && data.data.arrivals ? data.data.arrivals : null;
            if (!arrivals || arrivals.length === 0) continue;

            arrivals
                .filter((bus) => bus.lc === "58")
                .forEach((bus) => {
                    const vehicleId = bus.i;
                    let apiTime = bus.dt;
                    if (!apiTime) return;

                    apiTime = apiTime.trim().replace(CLEAN_REGEX, '');
                    if (apiTime.includes('.')) apiTime = apiTime.split('.')[0];
                    if (apiTime.length === 5 && apiTime.includes(':')) apiTime = apiTime + ":00";
                    
                    const blockNumber = timetable[apiTime];

                    if (blockNumber) {
                        allResults.push({
                            time: apiTime,
                            block: blockNumber,
                            vehicle: vehicleId,
                        });
                    }
                });
        } catch (error) {
            // Ignorišemo greške pojedinačnih stanica
            console.error(`Greška pri dohvatanju ${url}:`, error.message);
        }
    }

    // Filtriranje i sortiranje
    const uniqueResults = allResults.filter((item, index, self) =>
        index === self.findIndex((t) => (t.block === item.block && t.vehicle === item.vehicle))
    );
    uniqueResults.sort((a, b) => a.block - b.block);

    // --- 3. SLANJE PODATAKA STRANICI ---
    // Umesto console.log, šaljemo JSON odgovor
    
    // Kažemo pregledaču da kešira odgovor na 1 minut (60 sekundi)
    // Ovo sprečava da vaš sajt obara prometko.si ako imate puno poseta
    response.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    
    response.status(200).json({
        lastUpdated: new Date().toISOString(),
        results: uniqueResults
    });
}