// Fajl: api/get-data.js

import fetch from 'node-fetch';

// --- 1. KOMPLETAN RED VOŽNJE (Vaši podaci) ---
const timetableMapA = {

    "04:00:00": 1, "04:30:00": 4, "04:55:00": 7, "05:15:00": 9, "05:33:00": 12, "05:46:00": 13,
    "05:58:00": 15, "06:10:00": 16, "06:21:00": 1, "06:31:00": 2, "06:41:00": 4, "06:50:00": 5,
    "06:59:00": 6, "07:08:00": 7, "07:16:00": 8, "07:24:00": 18, "07:32:00": 9, "07:40:00": 10,
    "07:48:00": 11, "07:56:00": 12, "08:03:00": 13, "08:11:00": 14, "08:19:00": 15, "08:27:00": 16,
    "08:35:00": 17, "08:43:00": 1, "08:50:00": 2, "08:58:00": 3, "09:06:00": 4, "09:14:00": 5,
    "09:21:00": 6, "09:29:00": 7, "09:37:00": 8, "09:45:00": 18, "09:53:00": 9, "10:00:00": 10,
    "10:08:00": 11, "10:16:00": 12, "10:24:00": 13, "10:32:00": 14, "10:39:00": 15, "10:47:00": 16,
    "10:55:00": 1, "11:03:00": 2, "11:11:00": 3, "11:20:00": 4, "11:29:00": 5, "11:38:00": 6,
    "11:47:00": 7, "11:55:00": 8, "12:04:00": 9, "12:13:00": 10, "12:22:00": 11, "12:31:00": 12,
    "12:40:00": 13, "12:49:00": 14, "12:57:00": 15, "13:06:00": 16, "13:15:00": 1, "13:24:00": 2,
    "13:32:00": 3, "13:40:00": 4, "13:48:00": 17, "13:56:00": 5, "14:04:00": 6, "14:12:00": 7,
    "14:20:00": 8, "14:28:00": 9, "14:37:00": 10, "14:45:00": 11, "14:53:00": 12, "15:01:00": 13,
    "15:09:00": 18, "15:17:00": 14, "15:25:00": 15, "15:33:00": 16, "15:42:00": 1, "15:50:00": 2,
    "15:58:00": 3, "16:07:00": 4, "16:15:00": 17, "16:23:00": 5, "16:31:00": 6, "16:40:00": 7,
    "16:48:00": 8, "16:56:00": 9, "17:04:00": 10, "17:13:00": 11, "17:21:00": 12, "17:29:00": 13,
    "17:37:00": 18, "17:45:00": 14, "17:54:00": 15, "18:02:00": 16, "18:10:00": 1, "18:18:00": 2,
    "18:26:00": 3, "18:35:00": 4, "18:43:00": 17, "18:51:00": 5, "18:59:00": 6, "19:07:00": 7,
    "19:16:00": 8, "19:24:00": 9, "19:32:00": 10, "19:40:00": 11, "19:49:00": 12, "19:58:00": 18,
    "20:08:00": 14, "20:19:00": 16, "20:31:00": 1, "20:43:00": 3, "20:55:00": 17, "21:07:00": 5,
    "21:19:00": 7, "21:31:00": 9, "21:43:00": 10, "21:56:00": 12, "22:11:00": 18, "22:27:00": 16,
    "22:43:00": 1, "23:00:00": 17, "23:20:00": 7, "23:40:00": 9, "00:00:00": 12, "00:25:00": 16,

};
const timetableMapB = {
"04:10:00": 9,
"04:25:00": 12,
"04:40:00": 13,
"04:50:00": 15,
"05:00:00": 16,
"05:10:00": 1,
"05:20:00": 2,
"05:30:00": 4,
"05:40:00": 5,
"05:49:00": 6,
"05:57:00": 7,
"06:04:00": 8,
"06:12:00": 18,
"06:19:00": 9,
"06:27:00": 10,
"06:34:00": 11,
"06:42:00": 12,
"06:49:00": 13,
"06:57:00": 14,
"07:04:00": 15,
"07:12:00": 16,
"07:20:00": 17,
"07:28:00": 1,
"07:35:00": 2,
"07:43:00": 3,
"07:51:00": 4,
"07:59:00": 5,
"08:07:00": 6,
"08:14:00": 7,
"08:22:00": 8,
"08:30:00": 18,
"08:38:00": 9,
"08:45:00": 10,
"08:53:00": 11,
"09:01:00": 12,
"09:09:00": 13,
"09:18:00": 14,
"09:26:00": 15,
"09:35:00": 16,
"09:43:00": 1,
"09:52:00": 2,
"10:01:00": 3,
"10:09:00": 4,
"10:18:00": 5,
"10:27:00": 6,
"10:35:00": 7,
"10:44:00": 8,
"10:53:00": 9,
"11:01:00": 10,
"11:10:00": 11,
"11:19:00": 12,
"11:27:00": 13,
"11:35:00": 14,
"11:44:00": 15,
"11:52:00": 16,
"12:00:00": 1,
"12:09:00": 2,
"12:17:00": 3,
"12:25:00": 4,
"12:33:00": 17,
"12:41:00": 5,
"12:49:00": 6,
"12:57:00": 7,
"13:05:00": 8,
"13:13:00": 9,
"13:22:00": 10,
"13:30:00": 11,
"13:38:00": 12,
"13:46:00": 13,
"13:54:00": 18,
"14:02:00": 14,
"14:10:00": 15,
"14:18:00": 16,
"14:26:00": 1,
"14:34:00": 2,
"14:42:00": 3,
"14:50:00": 4,
"14:58:00": 17,
"15:06:00": 5,
"15:14:00": 6,
"15:22:00": 7,
"15:30:00": 8,
"15:38:00": 9,
"15:47:00": 10,
"15:55:00": 11,
"16:03:00": 12,
"16:11:00": 13,
"16:19:00": 18,
"16:27:00": 14,
"16:35:00": 15,
"16:43:00": 16,
"16:52:00": 1,
"17:00:00": 2,
"17:08:00": 3,
"17:17:00": 4,
"17:25:00": 17,
"17:34:00": 5,
"17:42:00": 6,
"17:50:00": 7,
"17:58:00": 8,
"18:06:00": 9,
"18:16:00": 10,
"18:27:00": 11,
"18:39:00": 12,
"18:51:00": 18,
"19:03:00": 14,
"19:14:00": 16,
"19:26:00": 1,
"19:38:00": 3,
"19:50:00": 17,
"20:02:00": 5,
"20:14:00": 7,
"20:26:00": 9,
"20:38:00": 10,
"20:51:00": 12,
"21:06:00": 18,
"21:23:00": 16,
"21:41:00": 1,
"22:00:00": 17,
"22:22:00": 7,
"22:40:00": 9,
"23:00:00": 12,
"23:30:00": 16,
};
const URLS = [
    { url: "https://beograd.prometko.si/api/stations/arrivals?station=21965", timetable: timetableMapA },
    { url: "https://beograd.prometko.si/api/stations/arrivals?station=21122", timetable: timetableMapA },
    { url: "https://beograd.prometko.si/api/stations/arrivals?station=20397", timetable: timetableMapA },
    { url: "https://beograd.prometko.si/api/stations/arrivals?station=23108", timetable: timetableMapB },
    { url: "https://beograd.prometko.si/api/stations/arrivals?station=21123", timetable: timetableMapB },
	{ url: "https://beograd.prometko.si/api/stations/arrivals?station=21763", timetable: timetableMapB },
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
                .filter((bus) => bus.lc === "601")
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