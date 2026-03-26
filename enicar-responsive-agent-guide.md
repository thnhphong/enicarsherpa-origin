# Enicar Chronicle Responsive Agent Guide

> Tài liệu này hướng dẫn agent cách sử dụng [enicar-responsive-rules.md](./enicar-responsive-rules.md) khi sửa UI.
> Khi có xung đột giữa code hiện tại và responsive rulebook, ưu tiên rulebook, trừ khi task nêu rõ ngoại lệ.

---

## 1. Khi nào agent bắt buộc phải dùng rule này

Đọc và áp dụng `enicar-responsive-rules.md` trước khi:

- chỉnh layout, spacing, typography, media
- sửa navbar, hero, cards, overlay, modal, timeline, map
- động vào section fullscreen, sticky, fixed, pinned, hoặc canvas/3D
- nhận task có chữ `responsive`, `mobile`, `tablet`, `desktop`, `overflow`, `breakpoint`

Nếu task chỉ là sửa text nhỏ, đổi dữ liệu, hoặc refactor không ảnh hưởng UI, agent không cần áp dụng toàn bộ checklist nhưng vẫn không được phá responsive hiện có.

---

## 2. Thứ tự ưu tiên khi ra quyết định

Khi responsive chưa thể tối ưu mọi mặt cùng lúc, ưu tiên theo thứ tự này:

1. Nội dung đọc được và thao tác được trên mobile
2. Không có horizontal overflow hoặc UI bị crop
3. Giữ đúng theme tokens, font hierarchy, visual identity
4. Desktop tận dụng thêm không gian để đẹp và giàu nhịp hơn
5. Motion chỉ là enhancement, không được cản usability

Nếu desktop phải giảm một ít độ "cinematic" để mobile dùng tốt hơn, chọn usability.

---

## 3. Workflow agent nên làm

### 3.1 Trước khi sửa

- Đọc `src/index.css` để biết theme tokens đang có thật.
- Đọc component liên quan để tìm:
  - `h-screen`, `w-screen`, fixed pixel sizes
  - overly large typography
  - hover-only interaction
  - absolute layers có nguy cơ tràn ngang
  - controls quá nhỏ để tap

### 3.2 Khi sửa

- Viết mobile-first.
- Dùng container và spacing mềm theo breakpoint.
- Chuyển từ fixed width/height sang `w-full`, `max-w-*`, `aspect-*`, `clamp()`.
- Với fullscreen sections, ưu tiên `min-h-[100dvh]`.
- Với text lớn, giảm tracking trên mobile.
- Với desktop-only hover interaction, thêm tap/focus/always-visible fallback.

### 3.3 Sau khi sửa

- Tự kiểm ở các width mục tiêu của rulebook.
- Chạy `npm run lint`.
- Chạy `npm run build`.
- Nêu rõ đã kiểm gì và còn ngoại lệ nào trong phần báo cáo cuối.

---

## 4. Pattern agent nên ưu tiên

### 4.1 Container

```tsx
className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12"
```

### 4.2 Split layout

```tsx
className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16"
```

### 4.3 Cards

```tsx
className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-10"
```

### 4.4 Fullscreen section

```tsx
className="relative min-h-[100dvh] overflow-hidden"
```

### 4.5 Readable body text

```tsx
className="text-base md:text-lg leading-relaxed max-w-[65ch]"
```

### 4.6 Touch target

```tsx
className="min-h-11 min-w-11"
```

---

## 5. Những điều agent không được tự ý làm

- Không tự dùng `font-yellowtail` nếu project chưa expose class đó.
- Không hardcode hex trong JSX nếu đã có token tương đương.
- Không dùng `overflow-hidden` để che lỗi tràn layout.
- Không giữ `w-screen` chỉ vì code cũ đang dùng nó.
- Không mix GSAP và Framer Motion trên cùng element.
- Không dựa vào hover cho thông tin quan trọng.
- Không coi task responsive là xong chỉ vì desktop đẹp.

---

## 6. Cách xử lý ngoại lệ

Nếu một component cần phá rule:

1. Chọn ngoại lệ nhỏ nhất có thể
2. Chỉ áp dụng trong component đó
3. Giải thích lý do trong phần tổng kết

Ngoại lệ thường chấp nhận được:

- Three.js material colors
- immersive canvas wrapper cần `w-screen`
- display typography rất lớn nhưng đã được kiểm ở mobile

---

## 7. Minimum verification cho agent

Trước khi tự kết luận task responsive đã xong, agent phải xác nhận:

- [ ] `375px` ổn
- [ ] `430px` ổn
- [ ] `768px` ổn
- [ ] `1024px` ổn
- [ ] `1280px` ổn
- [ ] không có horizontal overflow ngoài chủ đích
- [ ] touch target chính đủ lớn
- [ ] focus states còn nhìn thấy
- [ ] `npm run lint` pass
- [ ] `npm run build` pass

Nếu chưa kiểm được một mục, agent phải nói rõ là chưa kiểm được, không được ngầm coi như đã xong.

---

## 8. Câu nhắc nhanh cho agent

Trước khi commit bất kỳ thay đổi responsive nào, tự hỏi:

- mobile đọc có dễ chưa?
- layout có đang cố giữ desktop quá mức không?
- có chỗ nào chỉ dùng được bằng hover không?
- có chỗ nào đang dùng viewport/fixed size dễ lỗi trên mobile browser không?
- mình đang sửa nguyên nhân hay chỉ che triệu chứng?
