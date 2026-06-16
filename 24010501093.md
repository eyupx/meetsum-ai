# MeetSum AI - Yapay Zeka Destekli Toplanti Ozetleme Platformu

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Firebase](https://img.shields.io/badge/Firebase-Auth%20%2B%20Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Groq](https://img.shields.io/badge/Groq-Llama%203.3%20%2B%20Whisper-7C5CFF?style=for-the-badge)](https://groq.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

---

## Ogrenci Bilgileri

| Bilgi | Detay |
|-------|-------|
| **Ad Soyad** | Eyup Ensar Acar |
| **Ogrenci No** | 24010501093 |
| **Ders** | PP214 / BTE208 - Yapay Zeka Destekli Urun Tasarimi ve Gelistirme |
| **Donem** | 2025-2026 Bahar |
| **GitHub** | [github.com/eyupx/meetsum-ai](https://github.com/eyupx/meetsum-ai) |

---

## Proje Amaci ve Aciklamasi

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

---

## Kullanilan Teknolojiler ve Kutuphaneler

### AI / Yapay Zeka

| Teknoloji | Kullanim Amaci |
|-----------|---------------|
| **Groq API (Llama 3.3 70B)** | Toplanti metinlerini analiz edip JSON formatinda ozet, eylem maddesi, karar ve anahtar konu cikarimi |
| **Groq Whisper API (whisper-large-v3-turbo)** | Ses dosyalarindan (MP3, WAV, M4A) Turkce metin cikarma |
| **Google Antigravity (Claude)** | Kod uretimi, gelistirme ve debug surecinde AI destekli programlama |
| **Google Stitch** | UI/UX arayuz tasarimi ve ekran taslaklari olusturma |

### Frontend

| Teknoloji | Kullanim Amaci |
|-----------|---------------|
| **HTML5** | Sayfa yapisi ve semantik elemanlar |
| **CSS3** | Glassmorphism, gradient, dark/light tema, responsive tasarim |
| **Vanilla JavaScript (ES6+)** | SPA router, DOM manipulasyonu, API entegrasyonu |

### Backend / Servisler

| Teknoloji | Kullanim Amaci |
|-----------|---------------|
| **Firebase Authentication** | Google OAuth + E-posta/Sifre ile kimlik dogrulama |
| **Firebase Firestore** | NoSQL bulut veritabani (toplanti CRUD islemleri) |
| **PowerShell HTTP Server** | Yerel gelistirme sunucusu |

### Kutuphaneler

| Kutuphane | Versiyon | Kullanim Amaci |
|-----------|----------|---------------|
| **mammoth.js** | 1.4.21 | DOCX dosyalarindan metin cikarma |
| **pdf.js** | 2.16.105 | PDF dosyalarindan metin cikarma |
| **Firebase SDK** | 10.12.2 | Auth, Firestore islemleri |

---

## AI Is Akisi (Pipeline)

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
                          (System + User Prompt)
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

## Proje Klasor Yapisi

```
meetsum-ai/
+-- README.md                         # Proje dokumantasyonu
+-- .gitignore                        # Hassas dosya korumasi
+-- screenshots/                      # Ekran goruntuleri
+-- gerekli_dosyalar/
|   +-- 01_konsept/                   # Konsept gelistirme dokumanlari
|   |   +-- gorev1_konsept_gelistirme.md
|   +-- 02_stitch_promptlari/         # Prompt gunlugu
|   |   +-- prompt_logbook_v2.md      # 32 prompt kaydi
|   +-- 03_yonerge/                   # Ders yonergesi (10 gorsel)
|   +-- 04_stitch_html_export/        # Stitch tasarim export'lari (9 sayfa)
+-- uygulama/
    +-- index.html                    # SPA giris noktasi
    +-- server.ps1                    # PowerShell HTTP sunucusu
    +-- .gitignore                    # API key korumasi
    +-- css/
    |   +-- variables.css             # Tasarim sistemi degiskenleri
    |   +-- base.css                  # Temel stiller
    |   +-- components.css            # Bilesen stilleri
    |   +-- pages.css                 # Sayfa stilleri
    +-- js/
        +-- app.js                    # SPA router, AI entegrasyonu, prompt muhendisligi
        +-- api-config.js             # API anahtarlari (gitignore ile korunuyor)
        +-- api-config.example.js     # API anahtar sablonu
        +-- firebase-config.js        # Firebase yapilandirmasi (gitignore ile korunuyor)
        +-- firebase-config.example.js # Firebase sablon dosyasi
        +-- i18n.js                   # Coklu dil destegi (TR/EN)
        +-- pages/
            +-- landing.js            # Ana sayfa
            +-- login.js              # Giris sayfasi
            +-- register.js           # Kayit sayfasi
            +-- forgot.js             # Sifremi unuttum
            +-- dashboard.js          # Kontrol paneli
            +-- new-meeting.js        # Yeni toplanti ozetleme
            +-- meetings.js           # Toplantilarim listesi
            +-- summary.js            # Ozet detay sayfasi
            +-- profile.js            # Kullanici profili
            +-- settings.js           # Uygulama ayarlari
            +-- auxiliary.js          # Gizlilik, Kosullar, Iletisim, 404
```

---

## Kurulum Adimlari

### Gereksinimler
- Modern web tarayicisi (Chrome, Firefox, Edge)
- PowerShell (Windows)
- Internet baglantisi (Firebase + Groq API icin)
- [Node.js](https://nodejs.org/) (opsiyonel)

### 1. Repoyu Klonlayin
```bash
git clone https://github.com/eyupx/meetsum-ai.git
cd meetsum-ai/uygulama
```

### 2. API Anahtarlarini Yapilandirin

#### Groq API (AI Ozetleme + Ses Tanima)
```bash
# Sablon dosyasini kopyalayin
cp js/api-config.example.js js/api-config.js
```

`js/api-config.js` dosyasini acin ve Groq API anahtarinizi girin:
```javascript
var GROQ_API_KEY = 'BURAYA_GROQ_API_ANAHTARINIZI_GIRIN';
var GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
var GROQ_AUDIO_URL = 'https://api.groq.com/openai/v1/audio/transcriptions';
```

> Groq API anahtari almak icin: [console.groq.com](https://console.groq.com) adresine gidin ve ucretsiz hesap olusturun.

#### Firebase (Auth + Veritabani)
```bash
cp js/firebase-config.example.js js/firebase-config.js
```

`js/firebase-config.js` dosyasina Firebase proje bilgilerinizi girin.

> Firebase projesi olusturmak icin: [console.firebase.google.com](https://console.firebase.google.com)

### 3. Sunucuyu Baslatin
```powershell
powershell -ExecutionPolicy Bypass -File server.ps1
```

### 4. Tarayicida Acin
```
http://localhost:8080
```

---

## Calistirma / Kullanim Talimatlari

### 1. Kayit ve Giris
- E-posta + sifre ile kayit olun veya Google hesabinizla giris yapin

### 2. Yeni Toplanti Ozeti Olusturma
Uc farkli yontem:
- **Metin Yapistirma:** Toplanti metnini dogrudan metin alanina yapistiriniz
- **Dosya Yukleme:** TXT, DOCX veya PDF dosyasi yukleyin
- **Ses Dosyasi:** MP3, WAV veya M4A ses dosyasi yukleyin (otomatik transkript)

### 3. AI ile Ozetleme
- "AI ile Ozetle" butonuna tiklayin
- Sistem metni analiz edip ozet, eylem maddeleri, kararlar ve anahtar konulari cikarir

### 4. Ozet Yonetimi
- **PDF Indir:** Ozeti PDF olarak indirin
- **Kopyala:** Panoya kopyalayin
- **Paylas:** Web Share API ile paylasin
- **Sil:** Toplantiyi veritabanindan kaldirin

### 5. Ayarlar
- Dark/Light tema degistirme
- Turkce/Ingilizce dil degistirme
- Ozet uzunlugu ayarlama (kisa/orta/detayli)
- Bildirim tercihleri

---

## Ekran Goruntuleri

### Masaustu Gorunumleri

| Ana Sayfa | Giris | Kayit |
|-----------|-------|-------|
| ![Landing](screenshots/desktop_landing.png) | ![Login](screenshots/desktop_login.png) | ![Register](screenshots/desktop_register.png) |

| Dashboard | Yeni Toplanti | Toplantilarim |
|-----------|---------------|---------------|
| ![Dashboard](screenshots/desktop_dashboard.png) | ![New](screenshots/desktop_new_meeting.png) | ![Meetings](screenshots/desktop_meetings.png) |

| Profil | Ayarlar |
|--------|---------|
| ![Profile](screenshots/desktop_profile.png) | ![Settings](screenshots/desktop_settings.png) |

## Prompt Kutuphanesi

Proje boyunca toplam **32 prompt** belgelenmistir. Detayli liste icin:
[prompt_logbook_v2.md](gerekli_dosyalar/02_stitch_promptlari/prompt_logbook_v2.md)

### Ozetleme System Prompt (Ornek)
```
Sen profesyonel bir toplanti ozetleme asistanisin.

TERIM DUZELTMESI: Metin icinde Midsum, Mitsam gibi hatali duyulmus
kelimeler varsa bunlari her zaman MeetSum AI olarak duzelt.

KONUSMACI AYIRIMI: Bir cumlede birinin adi geciyorsa o kisi gorevli
DEGIL olabilir. Hitap edilen kisi ile konusan kisiyi karistirma.

SADECE gecerli JSON dondur, baska hicbir sey yazma.
```

### Prompt Iyilestirme Sureci
Konusmaci karmasasi sorununu cozmek icin 3 asamali prompt muhendisligi uygulanmistir:

| Asama | Yontem | Sonuc |
|-------|--------|-------|
| 1 | System Prompt'a kural ekleme | Duzelmedi |
| 2 | User Prompt'a da kural ekleme | Duzelmedi |
| 3 | Metnin ustune KRITIK UYARI ekleme | Kismi basari (%66) |

---

## Guvenlik

- API anahtarlari `.gitignore` ile korunmaktadir ve GitHub'a yuklenmez
- Sablon dosyalar (`api-config.example.js`, `firebase-config.example.js`) mevcuttur
- GitHub Secret Scanning ile dogrulanmistir: **"No secrets found"**

---

## Gelecek Vizyonu

- [ ] Speaker Diarization (konusmaci ayristirma)
- [ ] Coklu dil genislemesi (Ingilizce + Turkce disinda)
- [ ] Toplanti karsilastirma (haftalik ilerleme takibi)
- [ ] Ekip paylasimi
- [ ] Zoom/Meet/Teams entegrasyonu
- [ ] Mobil uygulama (iOS/Android)

---

## GitHub Proje Baglantisi

**https://github.com/eyupx/meetsum-ai**

---

## Kaynakca ve Yararlanilan Baglantilar

| Kaynak | Baglanti |
|--------|----------|
| Groq API Dokumantasyonu | [console.groq.com/docs](https://console.groq.com/docs) |
| Llama 3.3 70B Model | [ai.meta.com/llama](https://ai.meta.com/llama/) |
| Whisper (OpenAI) | [openai.com/research/whisper](https://openai.com/research/whisper) |
| Firebase Dokumantasyonu | [firebase.google.com/docs](https://firebase.google.com/docs) |
| mammoth.js (DOCX) | [github.com/mwilliamson/mammoth.js](https://github.com/mwilliamson/mammoth.js) |
| pdf.js (Mozilla) | [mozilla.github.io/pdf.js](https://mozilla.github.io/pdf.js/) |
| Google Antigravity | [antigravity.dev](https://antigravity.dev) |
| Google Stitch | [stitch.withgoogle.com](https://stitch.withgoogle.com) |
| MDN Web Docs | [developer.mozilla.org](https://developer.mozilla.org/) |
| SPA Router Pattern | [developer.mozilla.org/en-US/docs/Web/API/History_API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) |

---

## Lisans

Bu proje egitim amacli gelistirilmistir.

**Gelistirici:** Eyup Ensar Acar
**Ogrenci No:** 24010501093
**Ders:** PP214 / BTE208 - Yapay Zeka Destekli Urun Tasarimi ve Gelistirme
**Donem:** 2025-2026 Bahar