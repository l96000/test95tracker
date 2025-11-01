// Fajl: api/get-data.js

import fetch from 'node-fetch';

// --- 1. KOMPLETAN RED VOŽNJE (Vaši podaci) ---
const timetableMapA = {
"04:05:00": 11,
"04:25:00": 13,
"04:45:00": 16,

"05:00:00": 19,
"05:15:00": 1,
"05:30:00": 3,
"05:44:00": 5,
"05:56:00": 6,

"06:07:00": 7,
"06:18:00": 8,
"06:27:00": 9,
"06:36:00": 10,
"06:45:00": 11,
"06:54:00": 12,

"07:03:00": 13,
"07:12:00": 14,
"07:21:00": 15,
"07:30:00": 16,
"07:39:00": 17,
"07:47:00": 18,
"07:56:00": 19,

"08:05:00": 20,
"08:14:00": 21,
"08:23:00": 1,
"08:32:00": 2,
"08:41:00": 3,
"08:50:00": 4,

"09:00:00": 5,
"09:09:00": 6,
"09:19:00": 7,
"09:28:00": 8,
"09:38:00": 9,
"09:47:00": 10,
"09:57:00": 11,

"10:06:00": 12,
"10:16:00": 13,
"10:25:00": 14,
"10:35:00": 15,
"10:44:00": 16,
"10:54:00": 17,

"11:03:00": 18,
"11:13:00": 19,
"11:22:00": 20,
"11:32:00": 21,
"11:41:00": 1,
"11:51:00": 2,

"12:00:00": 3,
"12:10:00": 4,
"12:20:00": 5,
"12:30:00": 6,
"12:40:00": 7,
"12:50:00": 8,

"13:00:00": 9,
"13:10:00": 10,
"13:20:00": 11,
"13:30:00": 12,
"13:40:00": 13,
"13:50:00": 14,

"14:00:00": 15,
"14:10:00": 16,
"14:20:00": 17,
"14:30:00": 18,
"14:40:00": 19,
"14:50:00": 20,

"15:00:00": 21,
"15:10:00": 1,
"15:20:00": 2,
"15:30:00": 3,
"15:40:00": 4,
"15:50:00": 5,

"16:00:00": 6,
"16:10:00": 7,
"16:20:00": 8,
"16:30:00": 9,
"16:40:00": 10,
"16:50:00": 11,

"17:00:00": 12,
"17:10:00": 13,
"17:20:00": 14,
"17:30:00": 15,
"17:40:00": 16,
"17:50:00": 17,

"18:00:00": 18,
"18:10:00": 19,
"18:20:00": 20,
"18:30:00": 21,
"18:40:00": 1,
"18:50:00": 2,

"19:00:00": 3,
"19:10:00": 4,
"19:20:00": 5,
"19:30:00": 6,
"19:40:00": 7,
"19:50:00": 8,
"19:53:00": 9,

"20:00:00": 11,
"20:11:00": 12,
"20:23:00": 13,
"20:35:00": 14,
"20:48:00": 15,

"21:01:00": 16,
"21:14:00": 17,
"21:27:00": 19,
"21:40:00": 1,
"21:53:00": 2,

"22:06:00": 3,
"22:19:00": 5,
"22:32:00": 7,
"22:46:00": 8,

"23:00:00": 11,
"23:20:00": 12,
"23:22:00": 13,
"23:40:00": 15,
"23:44:00": 16,
"23:56:00": 19,
};
const timetableMapB = {
"04:05:00": 1,
"04:30:00": 6,
"04:45:00": 7,

"05:00:00": 8,
"05:15:00": 10,
"05:24:00": 11,
"05:33:00": 12,
"05:42:00": 13,
"05:51:00": 14,

"06:00:00": 16,
"06:09:00": 17,
"06:17:00": 18,
"06:26:00": 19,
"06:35:00": 20,
"06:43:00": 21,
"06:52:00": 1,

"07:01:00": 2,
"07:09:00": 3,
"07:18:00": 4,
"07:26:00": 5,
"07:35:00": 6,
"07:44:00": 7,
"07:53:00": 8,

"08:02:00": 9,
"08:11:00": 10,
"08:20:00": 11,
"08:29:00": 12,
"08:38:00": 13,
"08:47:00": 14,
"08:56:00": 15,

"09:05:00": 16,
"09:14:00": 17,
"09:23:00": 18,
"09:33:00": 19,
"09:42:00": 20,
"09:52:00": 21,

"10:01:00": 1,
"10:11:00": 2,
"10:20:00": 3,
"10:30:00": 4,
"10:39:00": 5,
"10:49:00": 6,
"10:58:00": 7,

"11:08:00": 8,
"11:17:00": 9,
"11:27:00": 10,
"11:36:00": 11,
"11:46:00": 12,
"11:55:00": 13,

"12:05:00": 14,
"12:15:00": 15,
"12:25:00": 16,
"12:35:00": 17,
"12:45:00": 18,
"12:55:00": 19,

"13:05:00": 20,
"13:15:00": 21,
"13:25:00": 1,
"13:35:00": 2,
"13:45:00": 3,
"13:55:00": 4,

"14:05:00": 5,
"14:15:00": 6,
"14:25:00": 7,
"14:35:00": 8,
"14:45:00": 9,
"14:55:00": 10,

"15:05:00": 11,
"15:15:00": 12,
"15:25:00": 13,
"15:35:00": 14,
"15:45:00": 15,
"15:55:00": 16,

"16:05:00": 17,
"16:15:00": 18,
"16:25:00": 19,
"16:35:00": 20,
"16:45:00": 21,
"16:55:00": 1,

"17:05:00": 2,
"17:15:00": 3,
"17:25:00": 4,
"17:35:00": 5,
"17:45:00": 6,
"17:55:00": 7,

"18:05:00": 8,
"18:16:00": 9,
"18:20:00": 10,
"18:27:00": 11,
"18:39:00": 12,
"18:51:00": 13,

"19:03:00": 14,
"19:15:00": 15,
"19:27:00": 16,
"19:40:00": 17,
"19:46:00": 18,
"19:54:00": 19,
"19:59:00": 20,

"20:04:00": 21,
"20:08:00": 1,
"20:21:00": 2,
"20:35:00": 3,
"20:41:00": 4,
"20:49:00": 5,
"20:56:00": 6,

"21:03:00": 7,
"21:17:00": 8,
"21:31:00": 11,
"21:45:00": 12,

"22:00:00": 13,
"22:04:00": 14,
"22:15:00": 15,
"22:30:00": 16,
"22:37:00": 17,
"22:45:00": 19,

"23:00:00": 1,
"23:15:00": 2,
"23:30:00": 3,
"23:45:00": 5,
"23:47:00": 7,
"23:56:00": 8,
};
const URLS = [
    { url: "https://beograd.prometko.si/api/stations/arrivals?station=20465", timetable: timetableMapA },
    { url: "https://beograd.prometko.si/api/stations/arrivals?station=22563", timetable: timetableMapA },
    { url: "https://beograd.prometko.si/api/stations/arrivals?station=20114", timetable: timetableMapA },
    { url: "https://beograd.prometko.si/api/stations/arrivals?station=21985", timetable: timetableMapA },
    { url: "https://beograd.prometko.si/api/stations/arrivals?station=22107", timetable: timetableMapB },
    { url: "https://beograd.prometko.si/api/stations/arrivals?station=20271", timetable: timetableMapB },
    { url: "https://beograd.prometko.si/api/stations/arrivals?station=20551", timetable: timetableMapB },
    { url: "https://beograd.prometko.si/api/stations/arrivals?station=20558", timetable: timetableMapB },
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
                .filter((bus) => bus.lc === "74")
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