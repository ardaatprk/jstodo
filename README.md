## Yapılacaklar Listesi (JS ToDo)

- [Siteye Gitmek İçin Tıklayınız](https://ardaatprk.github.io/jstodo/)

Basit, tarayıcı tabanlı bir yapılacaklar listesi uygulaması. Öğeler `localStorage` ile kalıcı olarak saklanır; öğe ekleme, tamamlama (işaretleme) ve silme işlemlerini destekler. Boş ekleme denemelerinde hata bildirimi, başarılı eklemelerde ise başarı bildirimi gösterilir.

### Özellikler

- **Öğe ekleme**: Metin kutusuna yazıp "Ekle"ye tıklayın veya Enter tuşuna basın.
- **Tamamlama/geri alma**: Listedeki bir öğeye tıklayın.
- **Silme**: Öğenin sağındaki `×` simgesine tıklayın.
- **Kalıcılık**: Veriler `localStorage` üzerinde `todos` anahtarıyla saklanır.
- **Bildirimler**: Bootstrap toast ile başarılı/hatali işlemlerde geri bildirim.

### Klavye Kısayolu

- **Enter**: Yeni öğe ekler (odak metin kutusundayken).

### İlk Açılış Davranışı

- İlk açılışta `index.html` içindeki örnek öğeler okunur ve `localStorage`'a aktarılır. Sonraki açılışlarda liste `localStorage`'dan yüklenir.

### Proje Yapısı

```
jstodo/
  ├─ index.html   # Arayüz ve toast bildirimleri (Bootstrap 4, jQuery CDN)
  ├─ style.css    # Basit stiller (öğe durumu, butonlar, başlık)
  └─ app.js       # İş mantığı: ekleme, silme, tamamlama, depolama
```

### Teknolojiler

- Vanilla JavaScript, HTML, CSS
- Bootstrap 4 (toast için)
- jQuery (toast tetiklemek için, CDN)

### Notlar

- Boş metinle ekleme yapmaya çalışırsanız hata bildirimi gösterilir.
- Veriler tarayıcıya özeldir. Farklı tarayıcı/cihazlarda liste paylaşılmaz.

### Lisans

Bu proje eğitim amaçlıdır. Gerekli gördüğünüz şekilde kullanabilir ve geliştirebilirsiniz.
