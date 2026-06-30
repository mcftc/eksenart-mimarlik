# Eksenart Mimarlık — Kullanım ve Yönetim Rehberi

Canlı site: **https://mimarlik.eksenart.com**
İçerik yönetimi (CMS): **https://mimarlik.eksenart.com/admin/**
Kaynak kod: https://github.com/mcftc/eksenart-mimarlik (Cloudflare Workers'ta yayınlanır)

## İçerik nasıl güncellenir? (CMS — Sveltia)

1. `https://mimarlik.eksenart.com/admin/` adresine gidin.
2. **"Sign In with Token"** seçeneğine tıklayın. GitHub açılır; bir **fine-grained Personal Access Token** oluşturun:
   - GitHub → Settings → Developer settings → **Fine-grained tokens** → Generate new token
   - Repository access: yalnızca `mcftc/eksenart-mimarlik`
   - Permissions → Repository → **Contents: Read and write**
   - Token'ı kopyalayıp CMS'e yapıştırın. (Token tarayıcınızda saklanır.)
3. Artık şunları yapabilirsiniz:
   - **Projeler**: yeni proje ekleyin/düzenleyin — kapak ve galeri **görsellerini yükleyin**, başlık/özet/konum/yıl/kategori, malzemeler ve anlatı metni girin. "Öne çıkan" işaretlenen projeler ana sayfada listelenir.
   - **Hizmetler**: 6 hizmet sayfasının metnini, SSS'lerini ve SEO başlık/açıklamalarını düzenleyin.
   - **Site Ayarları**: ana sayfa başlığı/alt metni, telefon, e-posta, adres ve istatistikler.

> **Değişiklikler nasıl yayına girer?** CMS'te "Publish" dediğinizde değişiklik GitHub'a kaydedilir; bir **GitHub Action** siteyi otomatik olarak yeniden derleyip Cloudflare'e yükler. Yayına girmesi genellikle **1–2 dakika** sürer.

## Görseller

- CMS'ten yüklenen görseller `public/images/uploads/` altına kaydedilir.
- Örnek projelerde şu an yer tutucu (placeholder) görsel vardır — gerçek proje fotoğraflarınızı ve mimari çizimlerinizi CMS'ten yükleyince otomatik değişir.
- İdeal kapak oranı ~4:5 (dikey) veya 16:10 (yatay), büyük ve net fotoğraflar.

## İletişim formu

Form, ücretsiz **Web3Forms** servisini kullanır (sunucu/veritabanı gerekmez).
Çalışması için: https://web3forms.com adresinden `info@eksenart.com` ile ücretsiz bir **access key** alın ve
`src/pages/iletisim.astro` içindeki `REPLACE_WITH_WEB3FORMS_ACCESS_KEY` değerini bu anahtarla değiştirin.
(Telefon/e-posta/WhatsApp bağlantıları zaten çalışır.)

## Teknik

- **Stack:** Astro 5 (statik) + Tailwind v4 · Cloudflare Workers (Static Assets) · git-tabanlı CMS (Sveltia).
- **Geliştirme:** `npm install` → `npm run dev` (http://localhost:4321). Yerelde `/keystatic` yerine `/admin` kullanılır; yerel modda token gerekmeden düzenleme için Sveltia yerel ayarı kullanılabilir.
- **Yayınlama (manuel):** `CLOUDFLARE_API_TOKEN` ve `CLOUDFLARE_ACCOUNT_ID` ortam değişkenleriyle `npm run build && npx wrangler deploy`.
- **Otomatik yayın:** `main` dalına her push'ta `.github/workflows/deploy.yml` derler + dağıtır.
- **SEO:** her sayfada özgün başlık/açıklama, JSON-LD (Organization + LocalBusiness/GeneralContractor + CreativeWork + Breadcrumb), `sitemap-index.xml`, `robots.txt`, kanonik URL'ler. eksenart.com ile çift yönlü bağlantılı.
- **Tasarım:** koyu tema (eksenart.com ile uyumlu) + animasyonlu arka plan + açık/koyu tema düğmesi; renkler `src/styles/global.css` içindeki tasarım tokenlarından.

## Güvenlik notları
- `/admin` arama motorlarına kapalıdır (noindex). CMS GitHub token'ınızı tarayıcıda saklar — paylaşmayın.
- (İyileştirme) `public/admin/index.html` içindeki Sveltia betiği bir CDN'den yüklenir; üretimde sürümü sabitlemek (pin) ve SRI eklemek önerilir.
