// ╔══════════════════════════════════════════════════════════════════════╗
// ║  scenes.js  —  LYRIC, SES ZAMANLAMA VE BACKGROUND AYARLARI        ║
// ╠══════════════════════════════════════════════════════════════════════╣
// ║  Adım 1:  public/audio/kardan-adam.mp3 dosyasını ekle              ║
// ║  Adım 2:  public/backgrounds/scene-1.jpg … scene-8.jpg ekle        ║
// ║  Adım 3:  Her sahne için şunları doldur:                           ║
// ║    lyric:       → o sahneye ait şarkı sözü satırı (string)         ║
// ║    audioStart:  → şarkıda o satırın başladığı saniye (ör: 14.2)    ║
// ║    audioEnd:    → o satırın bittiği saniye        (ör: 21.8)       ║
// ╠══════════════════════════════════════════════════════════════════════╣
// ║  backgroundImage:                                                  ║
// ║    → Görsel eklenince otomatik devreye girer.                      ║
// ║    → Görsel yoksa CSS animasyonlu arka plan fallback olarak çalışır║
// ╚══════════════════════════════════════════════════════════════════════╝

const BASE_URL = import.meta.env.BASE_URL;

export const AUDIO_PATH = `${BASE_URL}audio/kardan-adam.mp3`;

export const scenes = [
  // ─── SAHNE 0: GİRİŞ — kapı kapalı, müzik yok ─────────────────────
  {
    id: 0,
    lyric: null,
    audioStart: null,
    audioEnd: null,
    doorAngle: 0,
    background: 'winter-night',
    backgroundImage: null,          // giriş ekranı CSS fallback kullanır
    buttonText: 'Kapıyı aç...',
    isIntro: true,
  },

  // ─── SAHNE 1 ───────────────────────────────────────────────────────
  {
    id: 1,
    lyric: 'KARDAN ADAM YAPSAK SENLE',        // ← buraya 1. satırı yaz
    audioStart: 0,                 // ← başlangıç saniyesi  (örn: 0)
    audioEnd: 3.6,                   // ← bitiş saniyesi      (örn: 8)
    doorAngle: 11,
    background: 'gaming-night',
    backgroundImage: `${BASE_URL}backgrounds/scene-1.jpg`,
    buttonText: 'Biraz daha aç...',
  },

  // ─── SAHNE 2 ───────────────────────────────────────────────────────
  {
    id: 2,
    lyric: 'OYUNLAR OYNASAK',        // ← buraya 2. satırı yaz
    audioStart: 4,                 // ← başlangıç saniyesi
    audioEnd: 6.2,                   // ← bitiş saniyesi
    doorAngle: 22,
    background: 'distance',
    backgroundImage: `${BASE_URL}backgrounds/scene-2.jpg`,
    buttonText: 'Biraz daha aç...',
  },

  // ─── SAHNE 3 ───────────────────────────────────────────────────────
  {
    id: 3,
    lyric: 'ARTIK SENİ GÖRMÜYORUM',        // ← buraya 3. satırı yaz
    audioStart: 6.5,                 // ← başlangıç saniyesi
    audioEnd: 8.7,                   // ← bitiş saniyesi
    doorAngle: 33,
    background: 'travel',
    backgroundImage: `${BASE_URL}backgrounds/scene-3.jpg`,
    buttonText: 'Biraz daha aç...',
  },

  // ─── SAHNE 4 ───────────────────────────────────────────────────────
  {
    id: 4,
    lyric: 'SANKİ GİTTİN UZAK ÜLKELERE',        // ← buraya 4. satırı yaz
    audioStart: 9,                 // ← başlangıç saniyesi
    audioEnd: 12.5,                   // ← bitiş saniyesi
    doorAngle: 45,
    background: 'nostalgia',
    backgroundImage: `${BASE_URL}backgrounds/scene-4.jpg`,
    buttonText: 'Biraz daha aç...',
  },

  // ─── SAHNE 5 ───────────────────────────────────────────────────────
  {
    id: 5,
    lyric: 'ESKİDEN ÇOK YAKINDIK',        // ← buraya 5. satırı yaz
    audioStart: 13.4,                 // ← başlangıç saniyesi
    audioEnd: 15.2,                   // ← bitiş saniyesi
    doorAngle: 57,
    background: 'cold',
    backgroundImage: `${BASE_URL}backgrounds/scene-5.jpg`,
    buttonText: 'Biraz daha aç...',
  },

  // ─── SAHNE 6 ───────────────────────────────────────────────────────
  {
    id: 6,
    lyric: 'ŞİMDİ UZAK',        // ← buraya 6. satırı yaz
    audioStart: 15.2,                 // ← başlangıç saniyesi
    audioEnd: 16.7,                   // ← bitiş saniyesi
    doorAngle: 68,
    background: 'cracks',
    backgroundImage: `${BASE_URL}backgrounds/scene-6.jpg`,
    buttonText: 'Biraz daha aç...',
  },

  // ─── SAHNE 7 ───────────────────────────────────────────────────────
  {
    id: 7,
    lyric: 'NEDEN ANLASAM KEŞKE',        // ← buraya 7. satırı yaz
    audioStart: 16.7,                 // ← başlangıç saniyesi
    audioEnd: 20.5,                   // ← bitiş saniyesi
    doorAngle: 79,
    background: 'almost-open',
    backgroundImage: `${BASE_URL}backgrounds/scene-7.jpg`,
    buttonText: 'Biraz daha aç...',
  },

  // ─── SAHNE 8 ───────────────────────────────────────────────────────
  {
    id: 8,
    lyric: 'KARDAN ADAM YAPSAK SENLE SADECE OYNASAK BİRLİKTE',        // ← buraya 8. satırı yaz
    audioStart: 20.5,                 // ← başlangıç saniyesi
    audioEnd: 30,                   // ← bitiş saniyesi
    doorAngle: 87,
    background: 'final',
    backgroundImage: `${BASE_URL}backgrounds/scene-8.jpg`,
    buttonText: 'İçeri gir...',
  },

  // ─── SAHNE 9: FİNAL — soru ekranı ─────────────────────────────────
  {
    id: 9,
    lyric: null,
    audioStart: null,
    audioEnd: null,
    doorAngle: 90,
    background: 'final',
    backgroundImage: '/backgrounds/scene-8.jpg', // sahne-8 ile aynı görseli paylaşır
    buttonText: null,
    isFinal: true,
  },
];
