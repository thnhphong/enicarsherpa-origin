# Enicar Chronicle Responsive Rules

> Source of truth cho mọi thay đổi responsive của dự án Enicar Chronicle.
> Nếu code hiện tại xung đột với tài liệu này, ưu tiên sửa code để khớp rule này, trừ khi có ngoại lệ được nêu rõ.

---

## 1. Mục tiêu

Responsive trong dự án này không chỉ là "co nhỏ giao diện desktop xuống mobile".
Mục tiêu là:

- giữ nguyên tinh thần thị giác của Enicar
- đảm bảo đọc được và thao tác được trên mobile
- mở rộng hợp lý lên tablet và desktop
- không tạo overflow, crop nội dung, hoặc interaction chỉ dùng được bằng chuột

---

## 2. Nguyên tắc không thương lượng

### 2.1 Mobile first

- Viết class mặc định cho mobile trước.
- Chỉ thêm `sm:`, `md:`, `lg:`, `xl:`, `2xl:` khi layout thật sự cần mở rộng.
- Không ưu tiên desktop rồi vá ngược xuống mobile.

### 2.2 Không được có horizontal scroll

- Mọi page và section phải dùng được ở `375px` mà không bị tràn ngang.
- Không dùng `overflow-x-hidden` để che bug layout. Chỉ dùng ở root khi thật sự cần cho decorative effects.

### 2.3 Bảo toàn identity, không bảo toàn layout lỗi

- Giữ màu, font, tone, nhịp thị giác của thương hiệu.
- Được phép đổi layout, spacing, line-break, kích thước, thứ tự stack nếu điều đó làm giao diện dùng tốt hơn trên mobile.

### 2.4 Không phụ thuộc vào hover

- Bất kỳ thông tin hoặc hành động quan trọng nào xuất hiện bằng hover trên desktop phải có cách truy cập trên mobile.
- Tooltip chỉ là enhancement, không phải cơ chế duy nhất để đọc thông tin.

### 2.5 Responsive phải xét cả interaction

- Không chỉ text và layout, mà cả navbar, overlay, button, timeline, canvas, modal, pinned/fullscreen section đều phải được kiểm tra.

---

## 3. Theme Tokens phải dùng

Source of truth là `src/index.css`.

### 3.1 Màu

```css
--color-cyan: #00bcf2;
--color-yellow: #ffde17;
--color-red: #bd2126;
--color-black: #231f20;
--color-white: #ffffff;
```

Trong JSX/Tailwind:

```tsx
className="text-red"
className="bg-cyan/20"
className="border-black/10"
```

Không hardcode hex trong JSX, ngoại trừ:

- Three.js / canvas / shader / GSAP values không đi qua Tailwind
- asset hoặc third-party API bắt buộc nhận giá trị màu literal

### 3.2 Font classes hợp lệ

```tsx
font-sans
font-serif
font-eurostile
font-eurostile-black
font-script
```

Lưu ý:

- `font-script` là class dùng cho Yellowtail trong project hiện tại.
- Không dùng `font-yellowtail` nếu chưa expose token đó trong theme.

---

## 4. Breakpoints và kích thước cần test

### 4.1 Breakpoints Tailwind v4

| Prefix | Min width | Ý nghĩa |
|--------|-----------|---------|
| base | `< 640px` | mobile |
| `sm:` | `640px` | mobile lớn |
| `md:` | `768px` | tablet |
| `lg:` | `1024px` | laptop nhỏ |
| `xl:` | `1280px` | desktop |
| `2xl:` | `1536px` | màn hình lớn |

### 4.2 Viewport tối thiểu phải tự kiểm

- `375px`
- `430px`
- `768px`
- `1024px`
- `1280px`
- `1440px`

Nếu section là fullscreen, overlay, timeline, hoặc 3D/canvas-heavy, phải kiểm thêm:

- mobile landscape
- iPad width `768px` và `1024px`

---

## 5. Viewport, chiều cao màn hình, safe area

### 5.1 Ưu tiên `dvh` cho fullscreen sections

Với hero, overlay, map, takeover sections:

```tsx
className="min-h-[100dvh]"
```

Chỉ dùng `h-screen` khi đã kiểm thử và chắc chắn không bị crop do thanh địa chỉ động trên mobile browser.

### 5.2 Tránh lạm dụng `w-screen`

- Ưu tiên `w-full`.
- `w-screen` chỉ dùng khi chủ đích tạo breakout theo viewport và đã xác nhận không gây tràn ngang.

### 5.3 Tôn trọng safe area cho UI cố định

Với navbar, close button, bottom controls:

```tsx
className="pt-[calc(env(safe-area-inset-top)+1rem)]"
className="pb-[calc(env(safe-area-inset-bottom)+1rem)]"
```

Nếu không dùng safe area, UI cố định trên mobile rất dễ bị dính vào notch hoặc home indicator.

---

## 6. Container và layout primitives

### 6.1 Container chuẩn

Container mặc định nên theo form này:

```tsx
className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12"
```

Không dùng `px-2` cho section nội dung lớn trừ khi đó là deliberate edge-to-edge layout.

### 6.2 Split layout chuẩn

Text + image hoặc text + visual:

```tsx
className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start"
```

Card collection:

```tsx
className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-10"
```

### 6.3 Thứ tự ưu tiên trên mobile

Trên mobile:

- ưu tiên nội dung chính lên trước
- stack theo chiều dọc
- giảm decorative balance nếu nó làm khó đọc nội dung

Không cố giữ layout đối xứng desktop nếu điều đó làm text quá nhỏ hoặc flow đọc bị gãy.

### 6.4 Spacing scale

Ưu tiên spacing mềm theo breakpoint:

```tsx
className="py-16 md:py-24 lg:py-32"
className="gap-6 md:gap-8 lg:gap-16"
className="mb-6 md:mb-10"
```

Tránh:

```tsx
className="py-48"
className="gap-24"
```

trên mobile-first sections nếu chưa có biến thể nhỏ hơn.

---

## 7. Typography rules

### 7.1 Headings lớn phải co giãn

Với hero titles và display text, ưu tiên `clamp()`:

```tsx
className="text-[clamp(3rem,10vw,8rem)] leading-[0.85]"
className="text-[clamp(2rem,7vw,5rem)]"
```

Không mặc định đẩy heading lên `text-7xl`, `text-8xl`, `text-9xl` trên mobile nếu chưa kiểm line-break thật.

### 7.2 Tracking phải giảm trên màn hình nhỏ

```tsx
className="tracking-[0.18em] md:tracking-[0.35em]"
```

Tracking rất rộng có thể đẹp trên desktop nhưng thường làm vỡ layout trên mobile.

### 7.3 Body text phải ưu tiên khả năng đọc

```tsx
className="text-base md:text-lg leading-relaxed max-w-[65ch]"
```

Tránh:

- body text quá nhạt trên nền sáng
- line length quá dài trên desktop
- font-size nhỏ hơn mức dễ đọc trên mobile

### 7.4 Font hierarchy

- `font-eurostile-black`: display headings, badges, labels mạnh
- `font-eurostile`: navigation, metadata, supporting copy
- `font-script`: decorative accent, không dùng cho paragraph dài
- `font-serif`: story headings hoặc editorial emphasis
- `font-sans`: body mặc định

---

## 8. Images, media, decorative layers

### 8.1 Ảnh nội dung

```tsx
<img className="w-full h-auto object-cover" />
```

Khi cần tỉ lệ ổn định:

```tsx
className="aspect-[4/3] w-full object-cover"
```

### 8.2 Decorative elements

- Có thể dùng `%`, `vw`, blur, gradient, absolute layers.
- Nhưng decorative layers không được tạo overflow ngang.
- Nếu dùng phần tử lớn hơn viewport, phải kiểm thật ở `375px`.

### 8.3 Không ép fixed size nếu không có giới hạn mềm

Ưu tiên:

```tsx
className="w-full max-w-md"
className="text-[clamp(2rem,5vw,4rem)]"
```

Thay vì:

```tsx
className="w-[500px]"
className="text-[120px]"
```

---

## 9. Motion và animation

### 9.1 Phân vai rõ ràng

- Framer Motion: entrance, reveal, interaction ở component level
- GSAP: advanced sequencing, camera animation, heavy scroll storytelling

Không mix GSAP và Framer Motion trên cùng một animated element.

### 9.2 Responsive motion

- Mobile phải dùng motion nhẹ hơn desktop nếu animation làm giảm readability hoặc performance.
- Không pin, blur, scale, hoặc stagger quá mạnh trên mobile chỉ để giữ cảm giác cinematic.

### 9.3 Reduced motion là bắt buộc

Project nên hỗ trợ:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Nếu một section dựa nhiều vào animation để đọc được nội dung, section đó chưa responsive tốt.

---

## 10. Rules cho fullscreen storytelling và interactive sections

### 10.1 Fullscreen sections

- Dùng `min-h-[100dvh]`.
- Nội dung phải còn đọc được khi chiều cao viewport thấp.
- Không được để fixed navbar hoặc bottom controls che nội dung chính.

### 10.2 Overlays và takeovers

Overlay nên có:

```tsx
className="fixed inset-0 z-50"
className="min-h-[100dvh] overflow-y-auto"
```

Nội dung trong overlay nên có scroll riêng nếu dài, thay vì ép toàn bộ viewport cố định.

### 10.3 Canvas / 3D / globe sections

- Wrapper ngoài ưu tiên `w-full h-full`.
- Chỉ dùng outer `w-screen` khi thật sự cần.
- Với mobile, ưu tiên giữ controls dùng được trước rồi mới giữ hiệu ứng trình diễn.

### 10.4 Timeline và control bars

- Buttons phải đủ lớn để tap.
- Timeline ngang phải scroll được mượt trên touch.
- Label quan trọng không được chỉ xuất hiện khi hover.

---

## 11. Accessibility rules

### 11.1 Touch target

Tối thiểu:

```tsx
className="min-h-11 min-w-11"
```

### 11.2 Focus states

Interactive elements cần visible focus:

```tsx
className="focus:outline-none focus:ring-2 focus:ring-cyan focus:ring-offset-2"
```

### 11.3 Contrast

Ưu tiên:

- `text-black` trên nền sáng
- `text-white` trên nền tối
- `text-red` cho accent có ý nghĩa

Các class như `text-white/70`, `text-gray-500/80`, `text-black/50` phải tự kiểm contrast trong bối cảnh thật.

### 11.4 Không truyền thông tin chỉ bằng màu

Nếu trạng thái khác nhau chỉ phân biệt bằng màu, phải thêm shape, icon, label, underline, border, hoặc text để hỗ trợ.

---

## 12. Approved patterns

### 12.1 Section container

```tsx
<section className="py-16 md:py-24 lg:py-32">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
    {/* content */}
  </div>
</section>
```

### 12.2 Hero

```tsx
<section className="relative min-h-[100dvh] overflow-hidden">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-28 md:pt-32">
    <h1 className="text-[clamp(3.5rem,12vw,8rem)] leading-[0.8]" />
    <p className="max-w-[65ch] text-base md:text-lg lg:text-xl leading-relaxed" />
  </div>
</section>
```

### 12.3 Desktop nav / mobile nav

```tsx
<div className="hidden md:flex items-center gap-8 lg:gap-10" />
<button className="md:hidden min-h-11 min-w-11" />
```

### 12.4 Split editorial section

```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
  <div className="order-2 lg:order-1" />
  <div className="order-1 lg:order-2" />
</div>
```

### 12.5 Card grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-10">
  {/* cards */}
</div>
```

---

## 13. Những điều không được làm

- Không hardcode hex trong JSX nếu đã có theme token tương đương.
- Không dùng `font-yellowtail` nếu theme chưa khai báo class đó.
- Không dùng `w-screen` cho wrapper nội dung thông thường.
- Không dùng fixed pixel width/height lớn cho phần tử chính mà thiếu `max-w-*`, `w-full`, hoặc `clamp()`.
- Không giữ nguyên desktop hover pattern rồi coi đó là responsive.
- Không che lỗi bằng `overflow-hidden` nếu layout vẫn sai.
- Không coi desktop đẹp là đủ khi mobile chưa đọc được.

---

## 14. Definition of done cho responsive work

Một task responsive chỉ được coi là xong khi:

- [ ] Đã kiểm ở `375px`, `430px`, `768px`, `1024px`, `1280px`, `1440px`
- [ ] Không có horizontal scroll ngoài chủ đích
- [ ] Hero, navbar, overlay, và interactive controls vẫn dùng được trên mobile
- [ ] Typography không bị chật, vỡ dòng xấu, hoặc quá nhỏ
- [ ] Không có thông tin quan trọng chỉ xuất hiện khi hover
- [ ] Touch target chính đạt tối thiểu `44x44px`
- [ ] Focus states còn nhìn thấy được
- [ ] Reduced motion không bị phá trải nghiệm
- [ ] `npm run lint` pass
- [ ] `npm run build` pass

---

## 15. Ghi chú cho các ngoại lệ

Nếu cần phá rule này vì lý do hợp lệ:

- nêu rõ vì sao
- giữ ngoại lệ nhỏ nhất có thể
- ưu tiên ngoại lệ ở component level, không phá rule toàn dự án

Ví dụ ngoại lệ hợp lệ:

- màu literal trong Three.js materials
- một `w-screen` wrapper cho immersive canvas section đã test overflow
- một heading display dùng size custom đặc biệt nhưng vẫn qua kiểm mobile
