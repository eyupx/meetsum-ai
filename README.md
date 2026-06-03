# MeetSum AI - Yapay Zeka Destekli Toplanti Ozetleme Platformu

![MeetSum AI](https://img.shields.io/badge/MeetSum-AI-7C5CFF?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEyIDJMMiA3bDEwIDVMMjIgN3oiIGZpbGw9IndoaXRlIi8+PC9zdmc+)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)
![Status](https://img.shields.io/badge/status-Active-brightgreen?style=for-the-badge)

---

## 5.1. Proje Ozeti

**MeetSum AI**, toplanti metinlerini ve ses kayitlarini yapay zeka ile analiz ederek otomatik ozet, eylem maddeleri, karar takibi ve anahtar konu cikarimi yapan bir web uygulamasidir.

### Problem
Toplantilar sonrasinda alinan kararlar, gorev dagilimlari ve onemli noktalar genellikle kaybolur veya unutulur. Manuel not tutmak hem zaman alici hem de eksik kalabilmektedir.

### Cozum
MeetSum AI, toplanti metinlerini ve ses dosyalarini LLM (Buyuk Dil Modeli) teknolojisi ile analiz ederek:
- **Otomatik ozet** olusturur
- **Eylem maddeleri** cikarir (gorev, sorumlu, tarih)
- **Alinan kararlari** listeler
- **Anahtar konulari** belirler

### Temel Ozellikler
- Metin yapistirma veya dosya yukleme (TXT, DOCX, PDF)
- Ses dosyasi yukleme ve otomatik transkript (MP3, WAV, M4A)
- Yapay zeka ile akilli ozetleme
- Firebase ile bulut tabanli veri saklama
- Google ve e-posta ile kimlik dogrulama
- Turkce ve Ingilizce dil destegi
- PDF indirme, panoya kopyalama ve paylasma
- Dark/Light tema destegi
- Responsive tasarim (masaustu, tablet, mobil)

### Hedef Kullanici Kitlesi
- Proje yoneticileri
- Ekip liderleri
- Universite ogrencileri (grup calismalari)
- Uzaktan calisan ekipler

---

## 5.2. Kullanilan AI Araclari

| Arac | Kullanim Amaci | Detay |
|------|---------------|-------|
| **Groq API (Llama 3.3 70B)** | Toplanti ozetleme (runtime AI) | Metin analizi, JSON cikti uretimi, eylem maddesi cikarimi |
| **Groq Whisper API** | Ses transkripti (runtime AI) | whisper-large-v3-turbo modeli ile MP3/WAV/M4A'dan Turkce metin cikarma |
| **Antigravity** | Kod uretimi ve gelistirme | AI destekli prototipleme platformu |
| **Google Stitch** | Arayuz tasarimi | UI mockup ve ekran taslaklari |
| **Firebase** | Kimlik dogrulama ve veritabani | Auth (Google + E-posta) + Firestore |

### AI Modeli Detaylari
- **Ozetleme Modeli:** Llama 3.3 70B Versatile (Meta)
- **Ses Tanima Modeli:** Whisper Large V3 Turbo (OpenAI)
- **Altyapi:** Groq Cloud (dusuk gecikme suresi ile LLM inference)
- **API Formati:** OpenAI uyumlu REST API
- **Cikti Formati:** Yapilandirilmis JSON (ozet, eylem maddeleri, kararlar, anahtar konular)

### AI Is Akisi

```
Ses Dosyasi (MP3/WAV/M4A)
        |
        v
  Groq Whisper API -------> Transkript (duz metin)
                                    |
Dosya (TXT/DOCX/PDF) ----> Metin Cikarma ---+
                                    |        |
Manuel Metin Girisi ----------------+        |
                                    |        |
                                    v        v
                          Groq Llama 3.3 70B API
                                    |
                                    v
                          JSON Cikti:
                          - Toplanti Ozeti
                          - Eylem Maddeleri (gorev, sorumlu, tarih)
                          - Alinan Kararlar
                          - Anahtar Konular
                                    |
                                    v
                          Firebase Firestore'a Kayit
```

---

## 5.3. Prompt Kutuphanesi

### 1. Toplanti Ozetleme - System Prompt (Runtime)
```
Sen profesyonel bir toplanti ozetleme asistanisin.

TERIM DUZELTMESI: Metin icinde Midsum, Mitsam, mid-sum gibi hatali
duyulmus kelimeler varsa bunlari her zaman MeetSum AI olarak duzelt.

KONUSMACI AYIRIMI (COK ONEMLI): Bir cumlede birinin adi geciyorsa o kisi
gorevli DEGIL olabilir. Hitap edilen kisi ile konusan kisiyi karistirma.
Ornegin: "Selam Eyup, ben bunu yarina cozecegim" diyorsa, gorevi ustlenen
konusan kisidir, Eyup DEGILDIR cunku Eyup'e hitap edilmektedir.

EKSIKSIZ CIKARIM: Toplanti sonundaki teknik detaylari (veritabani, sunucu
yedekleme vb.) is halledilmis bile olsa Alinan Kararlar arasina mutlaka ekle.

SADECE gecerli JSON dondur, baska hicbir sey yazma.
```

### 2. Toplanti Ozetleme - User Prompt (Runtime)
```
Asagidaki toplanti metnini analiz et ve JSON formatinda yanit ver.

Kurallar:
- [Ozet uzunlugu ayarina gore dinamik: kisa/orta/detayli]
- Eylem maddelerini cikar (gorev, sorumlu kisi, tarih/sure).
  KONUSMACI AYIRIMI: Hitap edilen kisi gorevi yapan kisi degildir.
  Gorevi fiil eklerinden anla: yapacagim, cozerim = konusan kisi ustleniyor.
  Konusan kisinin ismi metinde yoksa sorumlu olarak "Belirtilmedi" yaz.
- Alinan kararlari listele.
- 3-5 anahtar konu cikar.

KRITIK UYARI - SORUMLU ATAMA KURALI:
"Selam [isim]" veya "[isim] araya giriyorum" ifadesindeki isim
konusan kisi DEGILDIR, konusulan kisidir.

JSON formati:
{"ozet": "...", "eylem_maddeleri": [...], "kararlar": [...], "anahtar_konular": [...]}
```

### 3. Whisper Ses Tanima Prompt'u
```
Bu bir MeetSum AI toplanti kaydidir. Konusmacilar MeetSum AI projesini
tartisiyor. Ozel isimler: MeetSum AI, responsive, token, Firebase,
Firestore, Whisper, Groq.
```

### 4. Prompt Iyilestirme Sureci
Konusmaci karmasasi sorununu cozmek icin 3 asamali prompt muhendisligi uygulanmistir:

| Asama | Yontem | Sonuc |
|-------|--------|-------|
| 1 | System Prompt'a kural ekleme | Duzelmedi |
| 2 | User Prompt'a da kural ekleme | Duzelmedi |
| 3 | Metnin ustune KRITIK UYARI ekleme | Kismi basari (%66) |

Detayli prompt gecmisi icin: `02_stitch_promptlari/prompt_logbook_v2.md`

---

## 5.4. Kurulum ve Calistirma

### Gereksinimler
- Modern web tarayicisi (Chrome, Firefox, Edge)
- PowerShell (Windows)
- Internet baglantisi (Firebase Auth + Groq API)

### Kurulum

1. **Repoyu klonlayin:**
```bash
git clone https://github.com/[kullanici]/meetsum-ai.git
cd meetsum-ai/uygulama
```

2. **API anahtarini yapilandirin:**
```bash
# js/api-config.example.js dosyasini kopyalayin
cp js/api-config.example.js js/api-config.js
# Kendi Groq API anahtarinizi girin
```

3. **Sunucuyu baslatin:**
```powershell
powershell -ExecutionPolicy Bypass -File server.ps1
```

4. **Tarayicida acin:**
```
http://localhost:8080
```

### API Anahtari Alma
1. [console.groq.com](https://console.groq.com) adresine gidin
2. Ucretsiz hesap olusturun
3. API Keys > Create API Key
4. Anahtari `js/api-config.js` dosyasina yapisirin

> **Not:** API anahtarlari `.gitignore` ile korunmaktadir ve GitHub'a yuklenmez.

---

## 5.5. Gelecek Vizyonu

- **Speaker Diarization:** Ses dosyalarindan konusmaci ayristirma (SPEAKER_00, SPEAKER_01 etiketleri)
- **Coklu dil genislemesi:** Ingilizce ve Turkce disinda ek diller
- **Toplanti karsilastirma:** Haftalik toplantilar arasi ilerleme takibi
- **Ekip paylasimi:** Toplanti ozetlerini ekip uyeleriyle paylasma
- **Zoom/Meet/Teams entegrasyonu:** Platform kayitlarindan otomatik ozetleme
- **Mobil uygulama:** iOS ve Android icin native uygulama

---

## Proje Yapisi

```
meetsum-ai/
+-- gerekli_dosyalar/
|   +-- 01_konsept/               # Konsept gelistirme dokumanlari
|   +-- 02_stitch_promptlari/     # Prompt gunlugu (32 prompt)
|   +-- 03_yonerge/               # Ders yonergesi
|   +-- 04_stitch_html_export/    # Tasarim export'lari
+-- uygulama/
|   +-- index.html                # SPA giris noktasi
|   +-- css/
|   |   +-- variables.css         # Tasarim sistemi degiskenleri
|   |   +-- base.css              # Temel stiller
|   |   +-- components.css        # Bilesen stilleri
|   |   +-- pages.css             # Sayfa stilleri
|   +-- js/
|   |   +-- app.js                # SPA router, AI entegrasyonu
|   |   +-- api-config.js         # API anahtarlari (gitignore'da)
|   |   +-- api-config.example.js # API anahtar sablonu
|   |   +-- firebase-config.js    # Firebase yapilandirmasi
|   |   +-- i18n.js               # Coklu dil destegi (TR/EN)
|   |   +-- pages/                # Sayfa bilesenleri
|   |       +-- landing.js        # Ana sayfa
|   |       +-- login.js          # Giris
|   |       +-- register.js       # Kayit
|   |       +-- forgot.js         # Sifremi unuttum
|   |       +-- dashboard.js      # Kontrol paneli
|   |       +-- new-meeting.js    # Yeni toplanti ozetleme
|   |       +-- meetings.js       # Toplantilarim
|   |       +-- summary.js        # Ozet detay
|   |       +-- profile.js        # Profil
|   |       +-- settings.js       # Ayarlar
|   |       +-- auxiliary.js      # Yardim, Iletisim, 404
|   +-- .env                      # Ortam degiskenleri (gitignore'da)
|   +-- .gitignore                # Hassas dosya korumasi
|   +-- server.ps1                # Yerel gelistirme sunucusu
+-- README.md
```

---

## Teknolojiler

| Katman | Teknoloji |
|--------|-----------|
| Frontend | HTML5, CSS3, Vanilla JavaScript (SPA) |
| AI / LLM | Groq API - Llama 3.3 70B Versatile |
| Ses Tanima | Groq Whisper API - whisper-large-v3-turbo |
| Dosya Isleme | mammoth.js (DOCX), pdf.js (PDF) |
| Auth | Firebase Authentication (Google + E-posta) |
| Veritabani | Firebase Firestore |
| Sunucu | PowerShell HTTP Server (gelistirme) |
| i18n | Ozel coklu dil sistemi (TR/EN) |

---

## Degerlendirme Kriterleri Karsilama

| Kriter | Puan | Karsilama |
|--------|------|-----------|
| Konsept Kalitesi | 10 | Problem tanimi, kullanici profili, MVP ozellikleri belgelenmistir |
| Prompt Muhendisligi | 20 | 32 prompt belgelendi, 3 asamali iyilestirme sureci, runtime system/user prompt |
| AI Arac Entegrasyonu | 20 | Groq API (Llama 3.3 + Whisper), Antigravity, Firebase, Stitch |
| Gorsel Tasarim | 10 | Modern glassmorphism UI, dark/light tema, responsive tasarim |
| Prototip Calisabilirligi | 20 | Tam calisan SPA: auth, CRUD, AI ozetleme, dosya/ses yukleme, PDF export |
| GitHub ve Dokumantasyon | 10 | README, .gitignore, .env, prompt gunlugu, proje yapisi |
| Yaraticilik | 10 | AI toplanti asistani, ses transkripti, prompt muhendisligi optimizasyonu |

---

## Lisans

Bu proje egitim amacli gelistirilmistir.

**Gelistirici:** Eyup Ensar Acar
**Ders:** PP214 / BTE208 - Yapay Zeka Destekli Urun Tasarimi ve Gelistirme
**Donem:** 2026 Bahar