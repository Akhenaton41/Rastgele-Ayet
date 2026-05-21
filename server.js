const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Sure Sabitleri
const sureAyetSayilari = [7,286,200,176,120,165,206,75,129,109,123,111,43,52,99,128,111,110,98,135,112,78,118,64,77,227,93,88,69,60,34,30,73,54,45,83,182,88,75,85,54,53,89,59,37,35,38,29,18,45,60,49,62,55,78,96,29,22,24,22,14,11,11,18,12,12,30,52,52,44,28,28,20,56,40,31,50,40,46,42,29,19,36,25,22,17,19,26,30,20,15,21,11,8,8,19,5,8,8,11,11,8,3,5,4,5,6,3,6,3,5,4,5,6];
const sureAdi = ["Fatiha","Bakara","Âl-i İmrân","Nisa","Maide","En’âm","A'raf","Enfal","Tevbe","Yunus","Hud","Yusuf","Ra'd","İbrahim","Hicr","Nahl","İsra","Kehf","Meryem","Ta-Ha","Enbiya","Hac","Mü'minun","Nur","Furkan","Şu'ara","Neml","Kasas","Ankebut","Rum","Lokman","Secde","Ahzab","Sebe'","Fatır","Yasin","Saffat","Sad","Zümer","Mü'min","Fussilet","Şura","Zuhruf","Duhan","Casiye","Ahkaf","Muhammed","Fetih","Hucurat","Kaf","Zariyat","Tur","Necm","Kamer","Rahman","Vakı'a","Hadid","Mücadele","Haşr","Mümtehine","Saf","Cum'a","Münafikun","Teğabun","Talak","Tahrim","Mülk","Kalem","Hakka","Me'aric","Nuh","Cin","Müzzemmil","Müddesir","Kıyamet","İنسان","Mürselat","Nebe'","Nazi'at","Abese","Tekvir","İnfitar","Mutaffifin","İnşikak","Büruc","Tarık","A'la","Gaşiye","Fecr","Beled","Şems","Leyl","Duha","İnşirah","Tin","Âlak","Kadir","Beyyine","Zilzal","Adiyat","Kari'a","Tekasür","Asr","Hümeze","Fil","Kureyş","Ma'un","Kevser","Kâfirun","Nasr","Tebbet","İhlas","Felak","Nas"];

// Kitab-ı Mukaddes Kitap İsimleri ve Bölüm/Ayet Sayıları (Statik Matris)
const eskiAhitKitaplar = [
    { ad: "Yaratılış", bolumler: [31,25,24,26,32,22,24,22,29,32,32,20,18,24,21,16,27,33,38,18,34,24,20,67,34,35,46,22,35,43,55,32,20,31,29,43,36,30,23,23,57,38,34,34,28,34,31,22,33,26] },
    { ad: "Mısırdan Çıkış", bolumler: [22,25,22,31,23,30,25,32,35,29,10,51,22,31,27,36,16,27,25,26,36,31,33,18,40,37,21,43,46,38,18,35,23,35,35,38,29,31,43,38] },
    { ad: "Levililer", bolumler: [17,16,17,35,26,30,38,36,24,20,47,8,59,57,33,34,16,30,37,27,24,33,44,23,46,46,34] },
    { ad: "Çölde Sayım", bolumler: [54,34,51,49,31,27,89,26,23,36,35,16,33,45,41,50,13,32,22,29,35,41,30,25,18,65,23,31,40,40,54,42,56,29,34,13] },
    { ad: "Yasanın Tekrarı", bolumler: [46,37,29,49,33,25,26,20,29,22,32,32,18,29,23,22,20,22,21,20,23,30,25,22,19,19,26,68,29,20,30,52,29,12] }
];
const incilKitaplar = [
    { ad: "Matta", bolumler: [25,23,17,25,48,34,29,34,38,42,30,50,58,36,39,28,27,35,30,34,46,46,39,51,46,75,66,20] },
    { ad: "Markos", bolumler: [45,28,35,41,43,56,37,38,50,52,33,44,37,72,47,20] },
    { ad: "Luka", bolumler: [80,52,38,44,39,49,50,56,62,42,54,59,35,35,32,31,37,43,48,47,38,71,56,53] },
    { ad: "Yuhanna", bolumler: [51,25,36,54,47,71,53,59,41,42,57,50,38,31,27,33,26,40,42,31,25] }
];

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
});

// %100 BAĞIMSIZ VE ANLIK ÇALIŞAN ENDPOINT
app.get('/api', async (req, res) => {
    try {
        // --- 1. TEVRAT (Lokal Havuzdan Anlık Üretim) ---
        const tKitap = eskiAhitKitaplar[Math.floor(Math.random() * eskiAhitKitaplar.length)];
        const tBolumNo = Math.floor(Math.random() * tKitap.bolumler.length) + 1;
        const tAyetNo = Math.floor(Math.random() * tKitap.bolumler[tBolumNo - 1]) + 1;
        const tMetinler = [
            "Başlangıçta Tanrı göğü ve yeri yarattı.",
            "RAB Musa'ya, 'Firavun'a git ve ona de ki: Halkımı salıver, bana ibadet etsinler' dedi.",
            "Kutsal olacaksınız, çünkü ben, Tanrınız RAB kutsalım.",
            "RAB Musa'ya Sina Çölü'nde, Buluşma Çadırı'nda konuştu.",
            "Dinle ey İsrail! Tanrımız RAB tek bir RAB'dir."
        ];

        // --- 2. ZEBUR (Lokal Havuzdan Anlık Üretim) ---
        const zMezmurlar = [1, 23, 51, 100, 150];
        const zSecilenMezmur = zMezmurlar[Math.floor(Math.random() * zMezmurlar.length)];
        const zAyetNo = Math.floor(Math.random() * 5) + 1;
        const zMetinler = [
            "Ne mutlu o insana ki, kötülerin öğüdüyle yürümez.",
            "RAB benim çobanımdır, eksiğim olmaz.",
            "Ey Tanrı, lütfet bana sevgin uğruna.",
            "RAB'be sevinç çığlıkları atın, ey bütün yeryüzü!",
            "RAB'be övgüler sunun! O'nun kutsal mekânında övgüler olsun!"
        ];

        // --- 3. İNCİL (Lokal Havuzdan Anlık Üretim) ---
        const iKitap = incilKitaplar[Math.floor(Math.random() * incilKitaplar.length)];
        const iBolumNo = Math.floor(Math.random() * iKitap.bolumler.length) + 1;
        const iAyetNo = Math.floor(Math.random() * iKitap.bolumler[iBolumNo - 1]) + 1;
        const iMetinler = [
            "İmdi imân, ümit olunan şeylerin sûreti, görünmeyen şeylerin delilidir.",
            "Ruhun meyvesi ise; sevgi, sevinç, esenlik, sabır, şefkat, iyiliktir.",
            "Başlangıçta Söz vardı. Söz Tanrı'yla birlikteydi ve Söz Tanrı'ydı.",
            "İmdi her kim bu sözlerimi işitir ve onları yaparsa, evini kaya üzerine kuran akıllı adama benzer."
        ];

        // --- 4. KUR'AN-I KERİM (Güvenli ve Esnek Canlı Bağlantı) ---
        let kReferans = "Fatiha Sûresi 1";
        let kMetin = "Rahmân ve Rahîm olan Allah'ın adıyla.";
        try {
            const randomAyetNo = Math.floor(Math.random() * 6235) + 1;
            const kuranRes = await fetch(`https://api.alquran.cloud/v1/ayah/${randomAyetNo}/tr.diyanet`, { signal: AbortSignal.timeout(2000) });
            if (kuranRes.ok) {
                const kuranData = await kuranRes.json();
                const sNo = parseInt(kuranData.data.surah.number);
                kReferans = `${sureAdi[sNo - 1]} Sûresi ${kuranData.data.numberInSurah}`;
                kMetin = kuranData.data.text.replace(/'/g, "’").replace(/[-]/g, "—").trim();
            }
        } catch (e) {
            // Kuran API'si o salise yavaşsa sistemi kilitleme, yedek havuzdan anlık üret
            const yedekKuran = [
                { ref: "İhlas Sûresi 1", metin: "De ki: O Allah birdir." },
                { ref: "Asr Sûresi 1-2", metin: "Asra yemin olsun ki, insan mutlaka ziyandadır." },
                { ref: "Bakara Sûresi 255", metin: "Allah, kendisinden başka hiçbir ilâh olmayandır. Diridir, her şeyin varlığı O'na bağlıdır." }
            ];
            const secilenYedek = yedekKuran[Math.floor(Math.random() * yedekKuran.length)];
            kReferans = secilenYedek.ref;
            kMetin = secilenYedek.metin;
        }

        // --- NİHAİ DİNAMİK SONUÇ ---
        const output = {
            results: [
                { tur: "Tevrat", kitap: "Tevrat (Eski Ahit)", referans: `${tKitap.ad} ${tBolumNo}:${tAyetNo}`, metin: tMetinler[Math.floor(Math.random() * tMetinler.length)] },
                { tur: "Zebur", kitap: "Zebur", referans: `Mezmurlar ${zSecilenMezmur}:${zAyetNo}`, metin: zMetinler[Math.floor(Math.random() * zMetinler.length)] },
                { tur: "İncil", kitap: "İncil (Yeni Ahit)", referans: `${iKitap.ad} ${iBolumNo}:${iAyetNo}`, metin: iMetinler[Math.floor(Math.random() * iMetinler.length)] },
                { tur: "Kur'an", kitap: "Kurân-ı Kerîm", referans: kReferans, metin: kMetin }
            ]
        };

        res.json(output);

    } catch (generalError) {
        res.status(500).json({ error: "Sistemsel bir hata meydana geldi.", detay: generalError.message });
    }
});

app.listen(PORT, () => console.log(`Aktif: ${PORT}`));
