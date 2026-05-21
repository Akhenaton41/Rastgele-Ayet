const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const sureAyetSayilari = [7,286,200,176,120,165,206,75,129,109,123,111,43,52,99,128,111,110,98,135,112,78,118,64,77,227,93,88,69,60,34,30,73,54,45,83,182,88,75,85,54,53,89,59,37,35,38,29,18,45,60,49,62,55,78,96,29,22,24,22,14,11,11,18,12,12,30,52,52,44,28,28,20,56,40,31,50,40,46,42,29,19,36,25,22,17,19,26,30,20,15,21,11,8,8,19,5,8,8,11,11,8,3,5,4,5,6,3,6,3,5,4,5,6];
const sureAdi = ["Fatiha","Bakara","Âl-i İmrân","Nisa","Maide","En’âm","A'raf","Enfal","Tevbe","Yunus","Hud","Yusuf","Ra'd","İbrahim","Hicr","Nahl","İsra","Kehf","Meryem","Ta-Ha","Enbiya","Hac","Mü'minun","Nur","Furkan","Şu'ara","Neml","Kasas","Ankebut","Rum","Lokman","Secde","Ahzab","Sebe'","Fatır","Yasin","Saffat","Sad","Zümer","Mü'min","Fussilet","Şura","Zuhruf","Duhan","Casiye","Ahkaf","Muhammed","Fetih","Hucurat","Kaf","Zariyat","Tur","Necm","Kamer","Rahman","Vakı'a","Hadid","Mücadele","Haşr","Mümtehine","Saf","Cum'a","Münafikun","Teğabun","Talak","Tahrim","Mülk","Kalem","Hakka","Me'aric","Nuh","Cin","Müzzemmil","Müddesir","Kıyamet","İنسان","Mürselat","Nebe'","Nazi'at","Abese","Tekvir","İnfitar","Mutaffifin","İnşikak","Büruc","Tarık","A'la","Gaşiye","Fecr","Beled","Şems","Leyl","Duha","İnşirah","Tin","Âlak","Kadir","Beyyine","Zilzal","Adiyat","Kari'a","Tekasür","Asr","Hümeze","Fil","Kureyş","Ma'un","Kevser","Kâfirun","Nasr","Tebbet","İhlas","Felak","Nas"];

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
});

app.get('/api', async (req, res) => {
    try {
        const bibleRes = await fetch("https://api.getbible.net/v2/turkish.json");
        const BIBLE_DATA = await bibleRes.json();

        let tevratBook = BIBLE_DATA["books"][[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38][Math.floor(Math.random() * 37)]];
        let tevratChap = tevratBook["chapters"][Math.floor(Math.random() * tevratBook["chapters"].length)];
        let tevratVerse = tevratChap["verses"][Math.floor(Math.random() * tevratChap["verses"].length)];

        let zeburBook = BIBLE_DATA["books"][18];
        let zeburChap = zeburBook["chapters"][Math.floor(Math.random() * zeburBook["chapters"].length)];
        let zeburVerse = zeburChap["verses"][Math.floor(Math.random() * zeburChap["verses"].length)];

        let incilBook = BIBLE_DATA["books"][Math.floor(Math.random() * (65 - 39 + 1)) + 39];
        let incilChap = incilBook["chapters"][Math.floor(Math.random() * incilBook["chapters"].length)];
        let incilVerse = incilChap["verses"][Math.floor(Math.random() * incilBook["chapters"].length)];

        const randomAyetNo = Math.floor(Math.random() * 6235) + 1;
        const kuranRes = await fetch(`https://api.alquran.cloud/v1/ayah/${randomAyetNo}/tr.diyanet`);
        const kuranData = await kuranRes.json();
        const sNo = parseInt(kuranData.data.surah.number);
        const kMetin = kuranData.data.text.replace(/'/g, "’").replace(/[-]/g, "—").trim();

        const output = {
            results: [
                { tur: "Tevrat", kitap: "Tevrat (Eski Ahit)", referans: tevratVerse.name, metin: tevratVerse.text },
                { tur: "Zebur", kitap: "Zebur", referans: zeburVerse.name, metin: zeburVerse.text },
                { tur: "İncil", kitap: "İncil (Yeni Ahit)", referans: incilVerse.name, metin: incilVerse.text },
                { tur: "Kur'an", kitap: "Kurân-ı Kerîm", referans: `${sureAdi[sNo - 1]} Sûresi ${kuranData.data.numberInSurah}`, metin: kMetin }
            ]
        };

        res.json(output);
    } catch (error) {
        res.status(500).json({ error: "API hatasi." });
    }
});

app.listen(PORT, () => console.log(`Aktif: ${PORT}`));
