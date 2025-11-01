// Fajl: api/get-data.js

import fetch from 'node-fetch';

// --- 1. KOMPLETAN RED VOŽNJE (Vaši podaci) ---
const timetableMapA = {

"04:20:00": 5,
"04:50:00": 7,

"05:20:00": 9,
"05:40:00": 1,

"06:00:00": 3,
"06:14:00": 10,
"06:28:00": 4,
"06:42:00": 5,
"06:56:00": 6,

"07:10:00": 7,
"07:24:00": 8,
"07:38:00": 11,
"07:52:00": 9,

"08:09:00": 1,
"08:27:00": 2,
"08:45:00": 3,
"08:51:00": 10,

"09:03:00": 4,
"09:21:00": 5,
"09:39:00": 6,
"09:57:00": 7,

"10:15:00": 8,
"10:33:00": 9,
"10:50:00": 1,

"11:07:00": 2,
"11:24:00": 3,
"11:41:00": 4,
"11:58:00": 5,

"12:14:00": 6,
"12:30:00": 7,
"12:46:00": 8,

"13:01:00": 11,
"13:15:00": 9,
"13:28:00": 1,
"13:42:00": 12,
"13:56:00": 2,

"14:10:00": 10,
"14:24:00": 3,
"14:37:00": 4,
"14:51:00": 5,

"15:05:00": 6,
"15:19:00": 7,
"15:33:00": 8,
"15:47:00": 11,

"16:02:00": 9,
"16:16:00": 1,
"16:30:00": 12,
"16:44:00": 2,
"16:58:00": 10,

"17:12:00": 3,
"17:26:00": 4,
"17:40:00": 5,
"17:55:00": 6,

"18:11:00": 7,
"18:27:00": 8,
"18:42:00": 11,
"18:47:00": 9,

"19:01:00": 1,
"19:18:00": 12,
"19:36:00": 2,
"19:53:00": 10,

"20:11:00": 3,
"20:29:00": 5,
"20:47:00": 6,

"21:05:00": 7,
"21:23:00": 8,
"21:42:00": 11,

"22:01:00": 1,
"22:20:00": 2,
"22:26:00": 10,
"22:40:00": 3,

"23:05:00": 5,
"23:30:00": 6,
"23:45:00": 7,

};
const timetableMapB = {
"04:20:00": 1,
"04:45:00": 3,

"05:07:00": 4,
"05:29:00": 5,
"05:50:00": 7,

"06:08:00": 8,
"06:22:00": 11,
"06:35:00": 9,
"06:49:00": 1,

"07:03:00": 2,
"07:17:00": 3,
"07:31:00": 10,
"07:44:00": 4,

"08:00:00": 5,
"08:17:00": 6,
"08:35:00": 7,
"08:53:00": 8,

"09:00:00": 11,
"09:11:00": 9,
"09:29:00": 1,
"09:47:00": 2,

"10:05:00": 3,
"10:23:00": 4,
"10:41:00": 5,
"10:59:00": 6,

"11:16:00": 7,
"11:31:00": 8,
"11:47:00": 9,

"12:03:00": 1,
"12:19:00": 2,
"12:35:00": 10,
"12:51:00": 3,

"13:07:00": 4,
"13:23:00": 5,
"13:38:00": 6,
"13:53:00": 7,

"14:08:00": 8,
"14:22:00": 11,
"14:37:00": 9,
"14:51:00": 1,

"15:05:00": 12,
"15:19:00": 2,
"15:33:00": 10,
"15:47:00": 3,

"16:01:00": 4,
"16:15:00": 5,
"16:30:00": 6,
"16:44:00": 7,
"16:58:00": 8,

"17:12:00": 11,
"17:26:00": 9,
"17:41:00": 1,
"17:56:00": 12,

"18:12:00": 2,
"18:29:00": 10,
"18:45:00": 4,
"18:47:00": 3,

"19:05:00": 5,
"19:23:00": 6,
"19:41:00": 7,
"19:59:00": 8,

"20:17:00": 11,
"20:35:00": 1,
"20:35:00": 12,
"20:53:00": 2,

"21:11:00": 10,
"21:29:00": 3,
"21:47:00": 5,

"22:05:00": 6,
"22:30:00": 7,
"22:40:00": 8,

"23:00:00": 11,
"23:13:00": 1,
"23:31:00": 2,
"23:51:00": 3,
};
const URLS = [
    { url: "https://beograd.prometko.si/api/stations/arrivals?station=22803", timetable: timetableMapA },
    { url: "https://beograd.prometko.si/api/stations/arrivals?station=20806", timetable: timetableMapA },
    { url: "https://beograd.prometko.si/api/stations/arrivals?station=22671", timetable: timetableMapA },
    { url: "https://beograd.prometko.si/api/stations/arrivals?station=20187", timetable: timetableMapB },
    { url: "https://beograd.prometko.si/api/stations/arrivals?station=20404", timetable: timetableMapB },
	{ url: "https://beograd.prometko.si/api/stations/arrivals?station=22212", timetable: timetableMapB },
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
                .filter((bus) => bus.lc === "85")
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