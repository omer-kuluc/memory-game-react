#  Memory Game – React

Klasik eşleştirme oyununun modern ve sade bir React versiyonu.  
Kullanıcıların hafızasını test etmesine olanak tanıyan bu oyun, eğlenceli bir arayüzle sunulmuştur.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3)

##  Canlı Demo

👉 [https://memory-game-react-chi.vercel.app/](https://memory-game-react-chi.vercel.app/)

---

##  Proje Özeti

**Memory Game**, oyuncunun aynı görselleri eşleştirerek ilerlediği, klasik kart oyunu mekanizmasına sahip bir web uygulamasıdır.  
Oyuncular, kartları çevirerek doğru çiftleri bulmaya çalışır.  
Oyun tamamlandığında süre ve yapılan hamle sayısı ekranda gösterilir.

---

##  Özellikler

###  Kart Eşleştirme Mekanizması

- Her oyun başladığında kartlar rastgele dizilir.
- Aynı iki kart seçildiğinde eşleşme gerçekleşir ve kartlar açık kalır.
- Farklı kartlar seçildiğinde otomatik olarak tekrar kapanır.

![image](https://github.com/user-attachments/assets/a34256ea-92fb-4196-9dab-02ad652b987b)


###  Süre ve Hamle Sayacı

- Oyun başladığı anda süre işlemeye başlar.
- Yapılan her çift denemesi bir hamle olarak sayılır.
- Oyun sonunda toplam süre ve toplam hamle sayısı kullanıcıya gösterilir.


![image](https://github.com/user-attachments/assets/e5b3c9ce-b63a-4a78-9336-d49b8d89ae14)

![image](https://github.com/user-attachments/assets/16bcd453-98e5-4407-894c-a4103aec7709)


###  Yeni Oyun Başlatma

- Eşleşmeler tamamlandığında "Play Again" butonuyla sıfırlanarak yeni oyun başlatılır.
- Yeni oyunda kartlar yeniden karıştırılır ve süre/hamle sıfırlanır.

###  Duyarlı ve Temiz Arayüz

- Kartların konumu ve tasarımı mobil, tablet ve masaüstü cihazlara uyum sağlar.
- Minimal ve dikkat dağıtmayan bir kullanıcı deneyimi sunar.

---

##  Kullanılan Teknolojiler

- React  
- JavaScript (ES6+)  
- CSS3  

---

##  Kurulum ve Çalıştırma

### 1. Depoyu Klonla

```bash
git clone https://github.com/omer-kuluc/memory-game-react.git
```

### 2. Dizin Değiştir

```bash
cd memory-game-react
```

### 3. Gerekli Paketleri Kur

```bash
npm install
```

### 4. Uygulamayı Başlat

```bash
npm run dev
```

Uygulama varsayılan olarak [http://localhost:5173](http://localhost:5173) adresinde çalışacaktır.

---

##  Hedefler

- Hafıza gelişimini destekleyen sade bir kart oyunu sunmak  
- Süre ve hamle takibiyle oyuncuyu teşvik etmek  
- Yeniden oynanabilirliği ve sadeliği birleştiren kullanıcı dostu bir deneyim sağlamak  

---

> Bu uygulama, temel React bilgileriyle interaktif oyun geliştirmeye başlamak isteyenler için örnek bir projedir.
