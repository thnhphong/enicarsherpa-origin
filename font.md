# Typography System – Enicar Vintage Style

## 1. Eurostile Black (`eurostile-black.otf`)

Đây là font chữ **“linh hồn”** của các thiết kế đồng hồ thập niên 60–70.  
Mang lại cảm giác mạnh mẽ, kỹ thuật và rất **“Swiss Made”**.

### Vị trí sử dụng

- **Tiêu đề chính (Hero Title)**  
  Ví dụ: `SHERPA GRAPH`, `JET GRAPH`
- **Số năm trong Timeline**  
  Ví dụ: `1956`, `1962`
- **Tên sản phẩm (Product Names)**  
  Trong phần Product Showcase

### Cảm giác mang lại

- Bền bỉ
- Chính xác
- Tinh thần “Tool Watch”

---

## 2. Eurostile Normal (`EuroStyle Normal.ttf`)

Biến thể nhẹ hơn, dễ đọc hơn nhưng vẫn giữ cấu trúc hình học đặc trưng.

### Vị trí sử dụng

- **Navigation (Thanh điều hướng)**
- **Sub-headlines (Tiêu đề phụ)**
- **Thông số kỹ thuật (Specs)**  
  Ví dụ: Caliber, Water Resistance, Case Size

### Cảm giác mang lại

- Hiện đại
- Chuyên nghiệp
- Gọn gàng

---

## 3. Yellowtail (`Yellowtail-Regular.ttf`)

Font dạng **Script (viết tay)** mang phong cách cổ điển (vintage brush).

### Vị trí sử dụng

- **Điểm nhấn câu chuyện**
- **Chữ ký (Signature)**  
  Ví dụ: Ariste Racine
- **Tagline nhỏ**  
  Đặt chéo hoặc phía trên tiêu đề lớn

### Cảm giác mang lại

- Tính cá nhân
- Hoài cổ
- Cảm xúc con người

---

## Cấu hình CSS (Tailwind v4 Style)

Thêm vào `src/index.css`:

```css
@theme {
  /* Font family */
  --font-eurostile: "Eurostile", sans-serif;
  --font-eurostile-black: "Eurostile Black", sans-serif;
  --font-script: "Yellowtail", cursive;
}

@font-face {
  font-family: "Eurostile";
  src: url("/font/eurostile-2/EuroStyle Normal.ttf") format("truetype");
}

@font-face {
  font-family: "Eurostile Black";
  src: url("/font/eurostile-black_freefontdownload_org/eurostile-black/eurostile-black.otf")
    format("opentype");
}

@font-face {
  font-family: "Yellowtail";
  src: url("/font/Yellowtail/Yellowtail-Regular.ttf") format("truetype");
}
```
