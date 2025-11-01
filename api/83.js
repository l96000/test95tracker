// Fajl: api/get-data.js

import fetch from 'node-fetch';

// --- 1. KOMPLETAN RED VOŽNJE (Vaši podaci) ---
const timetableMapA = {

 "05:40:00": 1,
"05:55:00": 2,

"06:06:00": 3,
"06:17:00": 12,
"06:28:00": 4,
"06:38:00": 5,
"06:49:00": 6,
"06:59:00": 7,

"07:09:00": 8,
"07:19:00": 9,
"07:29:00": 10,
"07:39:00": 11,
"07:49:00": 1,
"07:59:00": 2,

"08:09:00": 3,
"08:19:00": 12,
"08:29:00": 4,
"08:38:00": 5,
"08:48:00": 6,
"08:58:00": 7,

"09:08:00": 8,
"09:18:00": 9,
"09:28:00": 10,
"09:38:00": 11,
"09:48:00": 1,
"09:58:00": 2,

"10:08:00": 3,
"10:19:00": 4,
"10:29:00": 5,
"10:39:00": 6,
"10:49:00": 7,
"10:59:00": 8,

"11:10:00": 9,
"11:20:00": 10,
"11:30:00": 11,
"11:40:00": 1,
"11:50:00": 2,

"12:00:00": 3,
"12:11:00": 4,
"12:21:00": 5,
"12:31:00": 6,
"12:41:00": 7,
"12:51:00": 8,

"13:01:00": 9,
"13:10:00": 10,
"13:19:00": 11,
"13:28:00": 12,
"13:37:00": 1,
"13:46:00": 2,
"13:55:00": 3,

"14:04:00": 13,
"14:13:00": 4,
"14:22:00": 5,
"14:31:00": 6,
"14:41:00": 7,
"14:50:00": 8,

"15:00:00": 9,
"15:10:00": 10,
"15:20:00": 11,
"15:30:00": 12,
"15:40:00": 1,
"15:50:00": 2,

"16:00:00": 3,
"16:10:00": 13,
"16:20:00": 4,
"16:30:00": 5,
"16:40:00": 6,
"16:50:00": 7,

"17:00:00": 8,
"17:10:00": 9,
"17:20:00": 10,
"17:28:00": 12,
"17:30:00": 11,
"17:40:00": 1,
"17:50:00": 2,

"18:00:00": 3,
"18:10:00": 13,
"18:20:00": 4,
"18:30:00": 5,
"18:40:00": 6,
"18:50:00": 7,

"19:00:00": 8,
"19:10:00": 9,
"19:20:00": 10,
"19:30:00": 11,
"19:41:00": 1,
"19:52:00": 2,

"20:03:00": 3,
"20:04:00": 13,
"20:14:00": 4,
"20:25:00": 5,
"20:37:00": 6,
"20:49:00": 7,

"21:01:00": 9,
"21:13:00": 10,
"21:25:00": 1,
"21:37:00": 2,
"21:49:00": 3,

"22:02:00": 4,
"22:15:00": 5,
"22:28:00": 6,
"22:41:00": 7,
"22:54:00": 9,

"23:07:00": 10,
"23:20:00": 1,
"23:25:00": 2,
"23:35:00": 3,
"23:55:00": 5,

};
const timetableMapB = {
"04:55:00": 1,

"05:15:00": 3,
"05:30:00": 4,
"05:43:00": 6,
"05:55:00": 7,

"06:07:00": 8,
"06:18:00": 9,
"06:28:00": 10,
"06:38:00": 11,
"06:48:00": 1,
"06:58:00": 2,

"07:09:00": 3,
"07:19:00": 12,
"07:29:00": 4,
"07:39:00": 5,
"07:50:00": 6,

"08:00:00": 7,
"08:10:00": 8,
"08:20:00": 9,
"08:31:00": 10,
"08:41:00": 11,
"08:51:00": 1,

"09:01:00": 2,
"09:12:00": 3,
"09:14:00": 12,
"09:22:00": 4,
"09:32:00": 5,
"09:43:00": 6,
"09:53:00": 7,

"10:03:00": 8,
"10:13:00": 9,
"10:24:00": 10,
"10:34:00": 11,
"10:44:00": 1,
"10:54:00": 2,

"11:05:00": 3,
"11:15:00": 4,
"11:25:00": 5,
"11:35:00": 6,
"11:45:00": 7,
"11:55:00": 8,

"12:05:00": 9,
"12:15:00": 10,
"12:24:00": 11,
"12:34:00": 1,
"12:43:00": 2,
"12:53:00": 3,

"13:02:00": 13,
"13:12:00": 4,
"13:21:00": 5,
"13:31:00": 6,
"13:40:00": 7,
"13:50:00": 8,
"13:59:00": 9,

"14:08:00": 10,
"14:18:00": 11,
"14:27:00": 12,
"14:37:00": 1,
"14:46:00": 2,
"14:55:00": 3,

"15:05:00": 13,
"15:14:00": 4,
"15:23:00": 5,
"15:32:00": 6,
"15:42:00": 7,
"15:51:00": 8,

"16:00:00": 9,
"16:10:00": 10,
"16:19:00": 11,
"16:29:00": 12,
"16:38:00": 1,
"16:48:00": 2,
"16:57:00": 3,

"17:07:00": 13,
"17:17:00": 4,
"17:26:00": 5,
"17:36:00": 6,
"17:45:00": 7,
"17:55:00": 8,

"18:05:00": 9,
"18:14:00": 10,
"18:24:00": 11,
"18:34:00": 1,
"18:44:00": 2,
"18:55:00": 3,

"19:06:00": 13,
"19:18:00": 4,
"19:29:00": 5,
"19:41:00": 6,
"19:54:00": 7,
"19:58:00": 8,

"20:06:00": 9,
"20:19:00": 10,
"20:25:00": 11,
"20:31:00": 1,
"20:44:00": 2,
"20:56:00": 3,

"21:08:00": 4,
"21:20:00": 5,
"21:32:00": 6,
"21:45:00": 7,
"21:57:00": 9,

"22:10:00": 10,
"22:23:00": 1,
"22:36:00": 2,
"22:50:00": 3,
"22:55:00": 4,

"23:10:00": 5,
"23:14:00": 6,
"23:30:00": 7,
"23:39:00": 9,
"23:55:00": 10,
};
const URLS = [
    { url: "https://beograd.prometko.si/api/stations/arrivals?station=21224", timetable: timetableMapA },
    { url: "https://beograd.prometko.si/api/stations/arrivals?station=20368", timetable: timetableMapA },
    { url: "https://beograd.prometko.si/api/stations/arrivals?station=21216", timetable: timetableMapA },
    { url: "https://beograd.prometko.si/api/stations/arrivals?station=20235", timetable: timetableMapB },
    { url: "https://beograd.prometko.si/api/stations/arrivals?station=21217", timetable: timetableMapB },
	{ url: "https://beograd.prometko.si/api/stations/arrivals?station=20406", timetable: timetableMapB },
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
                .filter((bus) => bus.lc === "83")
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