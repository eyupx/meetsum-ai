# Gorev 1 - Konsept Gelistirme: AI Destekli Toplanti Ozetleyici

## 1. Problem Tanimi

Modern is dunyasinda toplantilar buyuk zaman kaybina neden olmaktadir. Calisanlar haftada ortalama 4-6 saat toplantilarda gecirmekte ve bu toplantilarin buyuk kismi verimsiz bulunmaktadir. Toplanti notlarinin manuel tutulmasi, onemli kararlarin gozden kacmasi ve eylem maddelerinin takip edilememesi sik karsilasilan sorunlardandir.

## 2. Cozum Onerisi: MeetSum AI

MeetSum AI, yapay zeka destekli bir toplanti ozetleyici uygulamasidir. Kullanicilarin toplanti metinlerini yapistirarak veya yukleyerek otomatik ozetler, eylem maddeleri ve karar listeleri olusturmasini saglar.

### Temel Ozellikler (MVP)
- Metin Girisi (Kritik) - Toplanti metnini yapistirma veya dosya yukleme
- AI Ozetleme (Kritik) - Gemini API ile otomatik ozet olusturma
- Eylem Maddesi Cikarimi (Kritik) - Toplantidan eylem maddelerini otomatik cikarma
- Karar Listesi (Kritik) - Alinan kararlari listeleme
- Anahtar Konu Etiketleme (Onemli) - Konulari otomatik etiketleme
- Responsive Tasarim (Kritik) - Mobil, tablet ve masaustu uyumlu
- Ozet Disa Aktarim (Onemli) - PDF/TXT olarak indirme
- Toplanti Gecmisi (Onemli) - Gecmis toplantilari listeleme

## 3. Hedef Kullanici Profili (Persona)

Isim: Elif
Yas: 28
Meslek: Proje Yoneticisi
Sirket: Orta olcekli bir teknoloji sirketi

### Elif'in Sorunlari:
- Haftada 8-10 toplantiya katiliyor
- Not tutmak toplantiya odaklanmasini engelliyor
- Kararlar ve eylem maddeleri siklikla gozden kaciyor
- Toplanti sonrasi ozet hazirlamak 30-45 dakika suruyor

### Elif'in Beklentileri:
- Hizli ve dogru ozetleme
- Eylem maddelerinin otomatik cikarilmasi
- Kolay kullanilabilir arayuz
- Mobil erisim imkani

## 4. Teknoloji Secimleri

| Katman | Teknoloji | Neden |
|--------|-----------|-------|
| Frontend | HTML/CSS/JavaScript | Hafif, hizli, framework bagimsiz |
| Styling | Vanilla CSS (Dark Theme) | Stitch tasarimlariyla uyumluluk |
| AI | Google Gemini API | Guclu Turkce destegi |
| Auth | Firebase Auth | Google OAuth entegrasyonu |
| Depolama | localStorage | Basit, backend gereksiz (MVP) |
| Mimari | SPA (Single Page App) | Hash-based router |

## 5. Sayfa Yapisi

1. Landing Page - Tanitim, ozellikler, fiyatlandirma
2. Giris Yap - E-posta/sifre + Google OAuth
3. Kayit Ol - Yeni hesap olusturma
4. Sifremi Unuttum - Sifre sifirlama
5. Dashboard - Ana panel, istatistikler
6. Yeni Toplanti - Metin girisi + AI ozetleme
7. Toplantilarim - Gecmis toplanti listesi
8. Ozet Sonucu - Detayli ozet goruntuleme
9. Profil - Kullanici bilgileri
10. Ayarlar - Uygulama ayarlari
11-14. Gizlilik Politikasi, Kullanim Kosullari, Iletisim, 404
