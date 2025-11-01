```markdown
# AI Collaboration Notes

Dalam proyek ini, saya mengembangkan Anime Search App menggunakan React, TypeScript, dan Redux.  
Beberapa bagian dibuat sendiri, beberapa bagian mendapat masukan atau saran dari AI (ChatGPT) untuk efisiensi.

---

### 1. SearchPage dengan debounce, skeleton loader, responsive grid

**Ide awal / Implementasi saya:**  
Saya sudah membuat grid untuk menampilkan anime, tapi layout hanya di kiri dan loading kurang interaktif.

**Masukan AI:**  
- Membuat skeleton loader saat loading  
- Grid menjadi responsive dan flex-wrap  
- Menampilkan pesan empty state friendly

**Hasil kolaborasi:**  
Halaman pencarian sekarang responsive, loading lebih menarik, dan empty state jelas terlihat.

---

### 2. Redux slice (fetch list & detail)

**Ide awal / Implementasi saya:**  
Thunk sudah dibuat untuk fetch list & detail, tapi belum ada cancel request saat user mengetik cepat.

**Masukan AI:**  
- Menggunakan AbortController untuk cancel request sebelumnya  
- Memastikan race condition dihindari  
- Error handling lebih rapi

**Hasil kolaborasi:**  
Redux slice sekarang aman dari race condition, loading & error lebih rapi.

---

### 3. Hardcode API URL tanpa environment variable

**Ide awal / Implementasi saya:**  
Sebelumnya saya pakai `.env`, tapi spesifikasi proyek tidak memperbolehkan env vars.

**Masukan AI:**  
- API URL di-hardcode langsung di `jikanApi.ts`  
- Masih support cancel request dengan AbortController

**Hasil kolaborasi:**  
Sesuaikan dengan spesifikasi YoPrint: tidak ada env vars, API tetap bisa dipanggil dan cancel request aman.