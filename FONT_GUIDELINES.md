# Hướng dẫn sử dụng Font chữ cho Enicar Chronicle

Dựa trên phong cách của thương hiệu đồng hồ Enicar (mang tính di sản, công nghiệp và thám hiểm) và đặc điểm của các font được cung cấp, dưới đây là hướng dẫn sử dụng chi tiết:

## 1. Eurostile Black (`eurostile-black.otf`)
Đây là font chữ "linh hồn" của các thiết kế đồng hồ thập niên 60-70. Nó mang lại cảm giác mạnh mẽ, kỹ thuật và rất "Swiss Made".
- **Tiêu đề chính (Hero Title):** Tên các dòng đồng hồ huyền thoại như "SHERPA GRAPH" hoặc "JET GRAPH".
- **Số năm trong Timeline:** Dùng cho các con số năm lớn (ví dụ: 1956, 1962) để tạo sự đột phá về thị giác khi cuộn trang.
- **Tên sản phẩm (Product Names):** Trong phần Product Showcase.

## 2. Eurostile Normal (`eurostile.TTF` / `EuroStyle Normal.ttf`)
Biến thể nhẹ hơn, dễ đọc hơn nhưng vẫn giữ được cấu trúc hình học đặc trưng.
- **Navigation (Thanh điều hướng):** Menu phía trên cùng.
- **Sub-headlines:** Các tiêu đề phụ trong các section.
- **Thông số kỹ thuật (Specs):** Dùng để hiển thị thông số bộ máy (Caliber), độ chịu nước, kích thước vỏ đồng hồ.

## 3. Yellowtail (`Yellowtail-Regular.ttf`)
Font chữ dạng Script (viết tay) mang phong cách cổ điển (vintage brush).
- **Điểm nhấn câu chuyện:** Dùng cho các trích dẫn ngắn hoặc "lời ghi chú" của các nhà thám hiểm/phi công ngày xưa.
- **Tagline nhỏ:** Đặt chéo hoặc phía trên các tiêu đề lớn để tạo sự mềm mại, phá vỡ sự khô cứng của các font hình học.
- **Chữ ký:** Tên người sáng lập (Ariste Racine) hoặc các đại sứ thương hiệu.

---

## Cấu hình CSS mẫu (Dành cho Tailwind v4)

Thêm vào file `src/index.css`:

```css
@theme {
  /* Khai báo font family */
  --font-eurostile: "Eurostile", sans-serif;
  --font-eurostile-black: "Eurostile Black", sans-serif;
  --font-script: "Yellowtail", cursive;

  /* Màu sắc thương hiệu */
  --color-yellow: #ffde17;
  --color-cyan: #00bcf2;
  --color-red: #ed2024;
}

@font-face {
  font-family: 'Eurostile';
  src: url('/font/eurostile-2/EuroStyle Normal.ttf') format('truetype');
}

@font-face {
  font-family: 'Eurostile Black';
  src: url('/font/eurostile-black_freefontdownload_org/eurostile-black/eurostile-black.otf') format('opentype');
}

@font-face {
  font-family: 'Yellowtail';
  src: url('/font/Yellowtail/Yellowtail-Regular.ttf') format('truetype');
}
```
