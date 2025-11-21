// Fajl: api/get-data.js

import fetch from 'node-fetch';

// --- 1. KOMPLETAN RED VOŽNJE (Vaši podaci) ---
const timetableMapA = {
  "04:00:00": 1,
"04:20:00": 6,
"04:40:00": 10,

"05:00:00": 1,
"05:15:00": 3,
"05:25:00": 6,
"05:34:00": 9,
"05:43:00": 10,
"05:49:00": 11,
"05:55:00": 12,

"06:01:00": 13,
"06:07:00": 14,
"06:13:00": 1,
"06:19:00": 2,
"06:25:00": 3,
"06:30:00": 4,
"06:36:00": 5,
"06:41:00": 6,
"06:46:00": 7,
"06:52:00": 8,
"06:57:00": 9,

"07:03:00": 10,
"07:08:00": 11,
"07:14:00": 12,
"07:19:00": 13,
"07:24:00": 14,
"07:30:00": 1,
"07:35:00": 2,
"07:41:00": 3,
"07:46:00": 4,
"07:52:00": 5,
"07:57:00": 6,

"08:02:00": 7,
"08:08:00": 8,
"08:13:00": 9,
"08:19:00": 10,
"08:24:00": 11,
"08:30:00": 12,
"08:36:00": 13,
"08:40:00": 14,
"08:46:00": 1,
"08:51:00": 2,
"08:57:00": 3,

"09:02:00": 4,
"09:08:00": 5,
"09:13:00": 6,
"09:18:00": 7,
"09:24:00": 8,
"09:29:00": 9,
"09:35:00": 10,
"09:40:00": 11,
"09:46:00": 12,
"09:51:00": 13,
"09:56:00": 14,

"10:02:00": 1,
"10:07:00": 2,
"10:13:00": 3,
"10:18:00": 4,
"10:24:00": 5,
"10:29:00": 6,
"10:34:00": 7,
"10:40:00": 8,
"10:45:00": 9,
"10:51:00": 10,
"10:56:00": 11,

"11:02:00": 12,
"11:07:00": 13,
"11:12:00": 14,
"11:18:00": 1,
"11:23:00": 2,
"11:29:00": 3,
"11:34:00": 4,
"11:40:00": 5,
"11:45:00": 6,
"11:50:00": 7,
"11:56:00": 8,

"12:01:00": 9,
"12:07:00": 10,
"12:12:00": 11,
"12:18:00": 12,
"12:23:00": 13,
"12:28:00": 14,
"12:34:00": 1,
"12:39:00": 2,
"12:45:00": 3,
"12:50:00": 4,
"12:56:00": 5,

"13:01:00": 6,
"13:06:00": 7,
"13:12:00": 8,
"13:17:00": 9,
"13:23:00": 10,
"13:28:00": 11,
"13:34:00": 12,
"13:39:00": 13,
"13:44:00": 14,
"13:50:00": 15,
"13:55:00": 1,

"14:00:00": 2,
"14:06:00": 3,
"14:12:00": 4,
"14:17:00": 5,
"14:22:00": 6,
"14:28:00": 7,
"14:33:00": 8,
"14:39:00": 9,
"14:44:00": 10,
"14:50:00": 11,
"14:55:00": 12,

"15:01:00": 13,
"15:07:00": 14,
"15:12:00": 15,
"15:18:00": 1,
"15:23:00": 2,
"15:29:00": 3,
"15:35:00": 4,
"15:40:00": 5,
"15:46:00": 6,
"15:51:00": 7,
"15:57:00": 8,

"16:03:00": 9,
"16:08:00": 10,
"16:14:00": 11,
"16:19:00": 12,
"16:25:00": 13,
"16:31:00": 14,
"16:36:00": 15,
"16:42:00": 1,
"16:47:00": 2,
"16:53:00": 3,
"16:59:00": 4,

"17:04:00": 5,
"17:10:00": 6,
"17:15:00": 7,
"17:21:00": 8,
"17:27:00": 9,
"17:32:00": 10,
"17:38:00": 11,
"17:43:00": 12,
"17:49:00": 13,
"17:55:00": 14,

"18:00:00": 15,
"18:06:00": 1,
"18:11:00": 2,
"18:17:00": 3,
"18:23:00": 4,
"18:28:00": 5,
"18:34:00": 6,
"18:39:00": 7,
"18:45:00": 8,
"18:51:00": 9,
"18:56:00": 10,

"19:02:00": 11,
"19:08:00": 12,
"19:14:00": 13,
"19:14:00": 14,
"19:20:00": 15,
"19:26:00": 1,
"19:32:00": 2,
"19:33:00": 3,
"19:38:00": 4,
"19:45:00": 5,
"19:51:00": 6,
"19:57:00": 7,

"20:03:00": 8,
"20:09:00": 9,
"20:10:00": 10,
"20:16:00": 11,
"20:23:00": 12,
"20:31:00": 13,
"20:35:00": 15,
"20:39:00": 1,
"20:47:00": 2,
"20:53:00": 4,
"20:55:00": 5,

"21:04:00": 6,
"21:13:00": 7,
"21:18:00": 8,
"21:24:00": 10,
"21:29:00": 11,
"21:36:00": 12,
"21:45:00": 13,
"21:49:00": 1,

"22:02:00": 2,
"22:16:00": 5,
"22:19:00": 6,
"22:30:00": 7,
"22:32:00": 10,
"22:45:00": 12,

"23:00:00": 1,
"23:07:00": 2,
"23:15:00": 5,
"23:30:00": 7,
"23:45:00": 12,

"00:00:00": 1,
"00:15:00": 5,
"00:30:00": 7

};
const timetableMapB = {
   
};
const URLS = [
    { url: "https://beograd.prometko.si/api/stations/arrivals?station=20329", timetable: timetableMapA },
    { url: "https://beograd.prometko.si/api/stations/arrivals?station=20298", timetable: timetableMapA },
    { url: "https://beograd.prometko.si/api/stations/arrivals?station=20316", timetable: timetableMapA },
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
                .filter((bus) => bus.lc === "15")
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
