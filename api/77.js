// Fajl: api/get-data.js

import fetch from 'node-fetch';

// --- 1. KOMPLETAN RED VOŽNJE (Vaši podaci) ---
const timetableMapA = {

"05:00:00": 1,
"05:25:00": 3,
"05:50:00": 6,

"06:02:00": 7,
"06:12:00": 8,
"06:22:00": 11,
"06:32:00": 9,
"06:42:00": 1,
"06:52:00": 2,

"07:02:00": 3,
"07:12:00": 10,
"07:22:00": 4,
"07:32:00": 5,
"07:42:00": 6,
"07:52:00": 7,

"08:02:00": 8,
"08:12:00": 11,
"08:22:00": 9,
"08:33:00": 1,
"08:45:00": 2,
"08:56:00": 3,
"08:57:00": 10,

"09:08:00": 4,
"09:19:00": 5,
"09:31:00": 6,
"09:42:00": 7,
"09:53:00": 8,

"10:05:00": 9,
"10:17:00": 1,
"10:29:00": 2,
"10:41:00": 3,
"10:53:00": 4,

"11:05:00": 5,
"11:18:00": 6,
"11:30:00": 7,
"11:42:00": 8,
"11:54:00": 9,

"12:06:00": 1,
"12:19:00": 2,
"12:31:00": 3,
"12:43:00": 4,
"12:55:00": 5,

"13:08:00": 6,
"13:20:00": 7,
"13:32:00": 8,
"13:44:00": 9,
"13:57:00": 1,

"14:09:00": 2,
"14:21:00": 3,
"14:32:00": 11,
"14:43:00": 4,
"14:53:00": 5,

"15:03:00": 6,
"15:13:00": 7,
"15:23:00": 8,
"15:33:00": 10,
"15:43:00": 9,
"15:53:00": 1,

"16:03:00": 2,
"16:13:00": 3,
"16:23:00": 11,
"16:34:00": 4,
"16:44:00": 5,
"16:54:00": 6,

"17:04:00": 7,
"17:15:00": 8,
"17:26:00": 10,
"17:37:00": 9,
"17:48:00": 1,

"18:00:00": 2,
"18:11:00": 3,
"18:22:00": 4,
"18:33:00": 5,
"18:44:00": 6,
"18:57:00": 7,

"19:13:00": 8,
"19:29:00": 9,
"19:31:00": 1,
"19:45:00": 2,

"20:01:00": 3,
"20:06:00": 4,
"20:17:00": 5,
"20:35:00": 6,
"20:44:00": 7,

"21:00:00": 8,
"21:12:00": 9,
"21:25:00": 2,
"21:50:00": 3,

"22:15:00": 6,
"22:40:00": 8,

};
const timetableMapB = {
"05:50:00": 1,

"06:10:00": 3,
"06:20:00": 10,
"06:30:00": 4,
"06:40:00": 5,
"06:50:00": 6,

"07:00:00": 7,
"07:10:00": 8,
"07:20:00": 11,
"07:30:00": 9,
"07:40:00": 1,
"07:50:00": 2,

"08:00:00": 3,
"08:10:00": 10,
"08:20:00": 4,
"08:30:00": 5,
"08:40:00": 6,
"08:51:00": 7,

"09:02:00": 8,
"09:07:00": 11,
"09:14:00": 9,
"09:26:00": 1,
"09:38:00": 2,
"09:50:00": 3,

"10:02:00": 4,
"10:14:00": 5,
"10:26:00": 6,
"10:38:00": 7,
"10:50:00": 8,

"11:02:00": 9,
"11:14:00": 1,
"11:27:00": 2,
"11:39:00": 3,
"11:51:00": 4,

"12:03:00": 5,
"12:16:00": 6,
"12:28:00": 7,
"12:40:00": 8,
"12:53:00": 9,

"13:05:00": 1,
"13:17:00": 2,
"13:29:00": 3,
"13:40:00": 11,
"13:50:00": 4,

"14:00:00": 5,
"14:10:00": 6,
"14:20:00": 7,
"14:30:00": 8,
"14:40:00": 10,
"14:50:00": 9,

"15:00:00": 1,
"15:10:00": 2,
"15:20:00": 3,
"15:30:00": 11,
"15:41:00": 4,
"15:51:00": 5,

"16:01:00": 6,
"16:11:00": 7,
"16:21:00": 8,
"16:31:00": 10,
"16:41:00": 9,
"16:51:00": 1,

"17:02:00": 2,
"17:14:00": 3,
"17:16:00": 11,
"17:26:00": 4,
"17:38:00": 5,
"17:50:00": 6,

"18:02:00": 7,
"18:14:00": 8,
"18:17:00": 10,
"18:27:00": 9,
"18:39:00": 1,
"18:51:00": 2,

"19:04:00": 3,
"19:16:00": 4,
"19:28:00": 5,
"19:41:00": 6,
"19:54:00": 7,

"20:07:00": 8,
"20:22:00": 9,
"20:38:00": 2,

"21:01:00": 3,
"21:02:00": 5,
"21:28:00": 6,
"21:55:00": 8,

"22:25:00": 2,
"22:30:00": 3,
"22:55:00": 6,

"23:25:00": 8,
};
const URLS = [
    { url: "https://beograd.prometko.si/api/stations/arrivals?station=21198", timetable: timetableMapA },
    { url: "https://beograd.prometko.si/api/stations/arrivals?station=20362", timetable: timetableMapA },
    { url: "https://beograd.prometko.si/api/stations/arrivals?station=20061", timetable: timetableMapA },
    { url: "https://beograd.prometko.si/api/stations/arrivals?station=20256", timetable: timetableMapB },
    { url: "https://beograd.prometko.si/api/stations/arrivals?station=20238", timetable: timetableMapB },
	{ url: "https://beograd.prometko.si/api/stations/arrivals?station=20456", timetable: timetableMapB },
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
                .filter((bus) => bus.lc === "77")
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