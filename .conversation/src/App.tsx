import { FormEvent, useEffect, useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  CirclePlay,
  Clock3,
  Instagram,
  MapPin,
  Menu as MenuIcon,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  X,
} from 'lucide-react'

type MenuCategory = 'Semua' | 'Coffee' | 'Non-Coffee' | 'Brunch' | 'Dessert'

type MenuItem = {
  name: string
  price: string
  category: Exclude<MenuCategory, 'Semua'>
  image: string
  description: string
}

type GalleryItem = {
  image: string
  alt: string
  className: string
}

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Location', href: '#location' },
  { label: 'Contact', href: '#contact' },
]

const menuItems: MenuItem[] = [
  { name: 'Espresso', price: 'Rp22.000', category: 'Coffee', image: '/images/espresso.jpg', description: 'Bold, balanced, and clean.' },
  { name: 'Iced Latte', price: 'Rp28.000', category: 'Coffee', image: '/images/iced-latte.jpg', description: 'Silky milk over a double shot.' },
  { name: 'Caramel Macchiato', price: 'Rp32.000', category: 'Coffee', image: '/images/caramel-macchiato.jpg', description: 'Soft caramel, espresso, and foam.' },
  { name: 'Matcha Latte', price: 'Rp30.000', category: 'Non-Coffee', image: '/images/matcha-latte.jpg', description: 'Ceremonial-grade matcha and milk.' },
  { name: 'Chicken Croissant', price: 'Rp38.000', category: 'Brunch', image: '/images/chicken-croissant.jpg', description: 'Flaky layers, fresh greens, roast chicken.' },
  { name: 'Beef Truffle Pasta', price: 'Rp48.000', category: 'Brunch', image: '/images/beef-truffle-pasta.jpg', description: 'Rich truffle cream with tender beef.' },
  { name: 'Basque Cheesecake', price: 'Rp32.000', category: 'Dessert', image: '/images/basque-cheesecake.jpg', description: 'Caramelised top, creamy centre.' },
  { name: 'Chocolate Lava Cake', price: 'Rp34.000', category: 'Dessert', image: '/images/chocolate-lava-cake.jpg', description: 'Warm chocolate with a molten heart.' },
  { name: 'French Fries', price: 'Rp22.000', category: 'Brunch', image: '/images/french-fries.jpg', description: 'Crisp, golden, made to share.' },
]

const bestSellers = [
  { number: '01', name: 'Iced Latte', price: 'Rp28.000', image: '/images/iced-latte.jpg' },
  { number: '02', name: 'Chicken Croissant', price: 'Rp38.000', image: '/images/chicken-croissant.jpg' },
  { number: '03', name: 'Beef Truffle Pasta', price: 'Rp48.000', image: '/images/beef-truffle-pasta.jpg' },
  { number: '04', name: 'Basque Cheesecake', price: 'Rp32.000', image: '/images/basque-cheesecake.jpg' },
]

const galleryItems: GalleryItem[] = [
  { image: '/images/atmosphere.jpg', alt: 'Interior Majestic Brew dengan cahaya pagi', className: 'gallery-large' },
  { image: '/images/latte-art.jpg', alt: 'Latte art rosetta di atas meja kayu', className: 'gallery-tall' },
  { image: '/images/chicken-croissant.jpg', alt: 'Chicken croissant untuk brunch', className: 'gallery-small gallery-shift' },
  { image: '/images/exterior-day.jpg', alt: 'Fasad Majestic Brew di siang hari', className: 'gallery-wide' },
  { image: '/images/iced-latte.jpg', alt: 'Iced latte dengan cahaya hangat', className: 'gallery-small' },
  { image: '/images/exterior-evening.jpg', alt: 'Majestic Brew saat senja', className: 'gallery-evening' },
]

function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <a href="#home" className={`brand ${inverse ? 'brand-inverse' : ''}`} aria-label="Majestic Brew, kembali ke beranda">
      <span className="brand-mark" aria-hidden="true">
        <span className="brand-cup" />
        <span className="brand-steam brand-steam-one" />
        <span className="brand-steam brand-steam-two" />
      </span>
      <span className="brand-copy">
        <strong>MAJESTIC</strong>
        <small>BREW</small>
      </span>
    </a>
  )
}

function Eyebrow({ children, light = false }: { children: string; light?: boolean }) {
  return <span className={`eyebrow ${light ? 'eyebrow-light' : ''}`}>{children}</span>
}

function RevealImage({ src, alt, className = '', sizes = '100vw' }: { src: string; alt: string; className?: string; sizes?: string }) {
  return (
    <div className={`image-reveal ${className}`}>
      <img src={src} alt={alt} loading="lazy" sizes={sizes} />
    </div>
  )
}

function Navbar({ onReserve }: { onReserve: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setOpen(false)

  return (
    <header className={`site-header ${scrolled ? 'site-header-scrolled' : ''} ${open ? 'site-header-open' : ''}`}>
      <div className="shell nav-wrap">
        <Logo />
        <nav className={`main-nav ${open ? 'main-nav-open' : ''}`} aria-label="Navigasi utama">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
        </nav>
        <button className="button button-small button-nav" onClick={() => { closeMenu(); onReserve() }}>
          Reserve <ArrowUpRight size={14} strokeWidth={1.8} />
        </button>
        <button className="menu-toggle" aria-label={open ? 'Tutup menu' : 'Buka menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <MenuIcon size={22} />}
        </button>
      </div>
    </header>
  )
}

function Hero({ onPlay }: { onPlay: () => void }) {
  return (
    <section id="home" className="hero">
      <img className="hero-image" src="/images/hero-interior.jpg" alt="Interior Majestic Brew dengan meja kayu dan cahaya hangat" />
      <div className="hero-shade" />
      <div className="shell hero-inner">
        <div className="hero-copy">
          <Eyebrow light>Specialty Coffee & Brunch</Eyebrow>
          <h1>Good Coffee.<br /><em>Better Days.</em></h1>
          <p>Tempat di mana rasa, suasana, dan cerita bertemu. Majestic Brew hadir untuk menemani setiap momen berharga.</p>
          <div className="hero-actions">
            <a href="#menu" className="button button-light">Lihat Menu <ArrowRight size={15} /></a>
            <button className="video-link" onClick={onPlay}><CirclePlay size={19} /> Tonton Video</button>
          </div>
        </div>
        <div className="hero-meta">
          <span className="hero-location"><MapPin size={13} /> Sukajadi, Bandung</span>
          <span className="scroll-hint">Scroll to explore <ArrowDown size={14} /></span>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="about section-light">
      <div className="shell about-grid">
        <div className="about-photo-wrap">
          <RevealImage src="/images/exterior-day.jpg" alt="Eksterior Majestic Brew yang dikelilingi tanaman hijau" className="about-photo" />
          <span className="photo-note">A small place<br />for good things.</span>
        </div>
        <div className="about-copy">
          <Eyebrow>Tentang Kami</Eyebrow>
          <h2>Lebih dari sekadar<br /><em>tempat ngopi.</em></h2>
          <p className="lead">Majestic Brew adalah ruang kecil yang dirancang untuk menikmati kopi berkualitas, makanan lezat, dan suasana yang nyaman.</p>
          <p className="body-copy">Dari biji kopi pilihan sampai obrolan yang tak terasa panjang, kami percaya momen sederhana bisa jadi bagian terbaik dari hari.</p>
          <a href="#contact" className="text-link">Tentang Kami <ArrowRight size={16} /></a>
          <Values />
        </div>
      </div>
    </section>
  )
}

function Values() {
  const values = [
    { icon: '01', title: 'Kopi Pilihan', text: 'Dari biji kopi terbaik nusantara & dunia.' },
    { icon: '02', title: 'Bahan Berkualitas', text: 'Fresh, sehat, dan penuh rasa.' },
    { icon: '03', title: 'Suasana Nyaman', text: 'Cocok untuk nongkrong, bekerja, atau meeting.' },
  ]

  return (
    <div className="values">
      {values.map((value) => (
        <div className="value" key={value.title}>
          <span className="value-number">{value.icon}</span>
          <div>
            <h3>{value.title}</h3>
            <p>{value.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function BestSellers() {
  return (
    <section className="best-sellers section-dark">
      <div className="shell">
        <div className="section-heading section-heading-dark">
          <div>
            <Eyebrow light>Best Sellers</Eyebrow>
            <h2>Menu favorit<br /><em>pelanggan kami.</em></h2>
          </div>
          <p>Beberapa hal yang selalu kembali dipesan. Datang untuk satu, pulang dengan cerita.</p>
        </div>
        <div className="best-seller-list">
          {bestSellers.map((item) => (
            <a className="best-seller-item" href="#menu" key={item.name}>
              <span className="best-seller-number">{item.number}</span>
              <div className="best-seller-image"><img src={item.image} alt={item.name} loading="lazy" /></div>
              <div className="best-seller-detail">
                <h3>{item.name}</h3>
                <span>{item.price}</span>
              </div>
              <ArrowUpRight className="best-seller-arrow" size={18} />
            </a>
          ))}
        </div>
        <a href="#menu" className="button button-outline-light">Lihat Semua Menu <ArrowRight size={15} /></a>
      </div>
    </section>
  )
}

function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('Semua')
  const filtered = activeCategory === 'Semua' ? menuItems : menuItems.filter((item) => item.category === activeCategory)
  const categories: MenuCategory[] = ['Semua', 'Coffee', 'Non-Coffee', 'Brunch', 'Dessert']

  return (
    <section id="menu" className="menu-section section-light">
      <div className="shell">
        <div className="menu-header">
          <div>
            <Eyebrow>Menu</Eyebrow>
            <h2>Pilihan rasa<br /><em>untuk setiap momen.</em></h2>
          </div>
          <p>Menu yang dibuat pelan-pelan, dengan bahan yang kami percaya dan rasa yang ingin kami ulang.</p>
        </div>
        <div className="menu-categories" role="tablist" aria-label="Kategori menu">
          {categories.map((category) => (
            <button
              key={category}
              className={activeCategory === category ? 'category-active' : ''}
              onClick={() => setActiveCategory(category)}
              role="tab"
              aria-selected={activeCategory === category}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="menu-grid">
          {filtered.map((item, index) => (
            <article className={`menu-item menu-item-${(index % 3) + 1}`} key={item.name}>
              <div className="menu-image-wrap">
                <img src={item.image} alt={item.name} loading="lazy" />
                <span className="menu-price">{item.price}</span>
              </div>
              <div className="menu-item-copy">
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
                <span className="menu-category">{item.category}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Gallery({ onOpen }: { onOpen: (index: number) => void }) {
  return (
    <section id="gallery" className="gallery-section section-cream">
      <div className="shell">
        <div className="gallery-intro">
          <div>
            <Eyebrow>Inside Majestic Brew</Eyebrow>
            <h2>A little look<br /><em>inside.</em></h2>
          </div>
          <p>Ruang untuk datang sendiri, bertemu teman, atau berhenti sebentar sebelum melanjutkan hari.</p>
          <a href="#location" className="text-link">Temukan kami <ArrowUpRight size={16} /></a>
        </div>
        <div className="gallery-grid">
          {galleryItems.map((item, index) => (
            <button key={item.image} className={`gallery-item ${item.className}`} onClick={() => onOpen(index)} aria-label={`Buka foto: ${item.alt}`}>
              <img src={item.image} alt={item.alt} loading="lazy" />
              <span className="gallery-open"><Plus size={18} /></span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function Promotion() {
  return (
    <section className="promotion">
      <img src="/images/iced-latte.jpg" alt="Iced coffee dengan cahaya hangat" loading="lazy" />
      <div className="promotion-overlay" />
      <div className="shell promotion-inner">
        <div>
          <Eyebrow light>Special Offer</Eyebrow>
          <h2>Buy 1 Get 1<br /><em>Iced Coffee</em></h2>
        </div>
        <div className="promotion-detail">
          <p>Setiap hari Jumat<br /><strong>10:00 — 16:00</strong></p>
          <a href="#contact" className="button button-light">Lihat Detail <ArrowRight size={15} /></a>
        </div>
      </div>
    </section>
  )
}

function Location() {
  return (
    <section id="location" className="location section-light">
      <div className="shell location-grid">
        <div className="location-copy">
          <Eyebrow>Find Us</Eyebrow>
          <h2>Datang dan<br /><em>nikmati.</em></h2>
          <div className="address-block">
            <div className="info-row"><MapPin size={17} /><p>Jl. Melati No. 12, Sukajadi,<br />Bandung, Jawa Barat 40162</p></div>
            <div className="info-row"><Clock3 size={17} /><p>Senin — Minggu<br /><strong>07:00 — 22:00 WIB</strong></p></div>
            <div className="info-row"><Phone size={17} /><p>+62 812 3456 7890</p></div>
            <div className="info-row"><Instagram size={17} /><p>@majesticbrew</p></div>
          </div>
          <a className="button button-dark" href="https://maps.google.com/?q=Majestic+Brew+Bandung" target="_blank" rel="noreferrer">Lihat di Google Maps <ArrowUpRight size={15} /></a>
        </div>
        <div className="map-card" aria-label="Peta lokasi Majestic Brew">
          <div className="map-grid-lines" />
          <div className="map-road map-road-one" />
          <div className="map-road map-road-two" />
          <div className="map-road map-road-three" />
          <div className="map-block map-block-one" />
          <div className="map-block map-block-two" />
          <div className="map-block map-block-three" />
          <div className="map-pin"><MapPin size={18} fill="currentColor" /><span>Majestic Brew</span></div>
          <div className="map-label map-label-one">Sukajadi</div>
          <div className="map-label map-label-two">Jl. Melati</div>
          <span className="map-compass">N</span>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSent(true)
    event.currentTarget.reset()
  }

  return (
    <section id="contact" className="contact section-beige">
      <div className="shell contact-grid">
        <div className="contact-copy">
          <Eyebrow>Say Hello</Eyebrow>
          <h2>Let's have<br /><em>a coffee.</em></h2>
          <p>Ada yang ingin ditanyakan, dirayakan, atau sekadar diceritakan? Kami ada di sini.</p>
          <div className="contact-links">
            <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer"><MessageCircle size={16} /> WhatsApp <ArrowUpRight size={14} /></a>
            <a href="https://instagram.com/majesticbrew" target="_blank" rel="noreferrer"><Instagram size={16} /> Instagram <ArrowUpRight size={14} /></a>
            <a href="#location"><MapPin size={16} /> Location <ArrowUpRight size={14} /></a>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            <span>Name</span>
            <input required name="name" type="text" placeholder="Nama kamu" />
          </label>
          <label>
            <span>Email</span>
            <input required name="email" type="email" placeholder="hello@example.com" />
          </label>
          <label>
            <span>Message</span>
            <textarea required name="message" placeholder="Ceritakan apa yang ada di pikiranmu..." rows={4} />
          </label>
          <button className="button button-dark" type="submit">{sent ? <>Terkirim <Check size={15} /></> : <>Kirim Pesan <ArrowRight size={15} /></>}</button>
          {sent && <p className="form-success">Terima kasih — pesanmu sudah kami terima.</p>}
        </form>
      </div>
    </section>
  )
}

function ReservationModal({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') || '')
    const date = String(form.get('date') || '')
    const time = String(form.get('time') || '')
    const guests = String(form.get('guests') || '')
    const message = [
      'Halo Majestic Brew, saya ingin reservasi meja.',
      '',
      `Nama: ${name}`,
      `Tanggal: ${date}`,
      `Jam: ${time}`,
      `Jumlah tamu: ${guests}`,
    ].join('\n')

    setSubmitted(true)
    window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="reservation-backdrop" role="dialog" aria-modal="true" aria-label="Form reservasi meja" onClick={onClose}>
      <div className="reservation-modal" onClick={(event) => event.stopPropagation()}>
        <button className="reservation-close" onClick={onClose} aria-label="Tutup form reservasi"><X size={20} /></button>
        <div className="reservation-heading">
          <Eyebrow>Reserve a table</Eyebrow>
          <h2>Make room for<br /><em>good days.</em></h2>
          <p>Isi detail singkat di bawah. Kami akan melanjutkan konfirmasi melalui WhatsApp.</p>
        </div>
        {submitted ? (
          <div className="reservation-success">
            <span className="success-mark"><Check size={20} /></span>
            <h3>Pesan reservasi siap dikirim.</h3>
            <p>WhatsApp sudah dibuka dengan detail reservasi kamu. Sampai bertemu di Majestic Brew.</p>
            <button className="button button-dark" onClick={onClose}>Selesai <ArrowRight size={15} /></button>
          </div>
        ) : (
          <form className="reservation-form" onSubmit={handleSubmit}>
            <label>
              <span>Nama</span>
              <input required name="name" type="text" placeholder="Nama kamu" />
            </label>
            <div className="reservation-row">
              <label>
                <span>Tanggal</span>
                <input required name="date" type="date" min={new Date().toISOString().split('T')[0]} />
              </label>
              <label>
                <span>Jam</span>
                <select required name="time" defaultValue="">
                  <option value="" disabled>Pilih jam</option>
                  <option>07:00</option>
                  <option>09:00</option>
                  <option>11:00</option>
                  <option>13:00</option>
                  <option>15:00</option>
                  <option>17:00</option>
                  <option>19:00</option>
                  <option>20:30</option>
                </select>
              </label>
            </div>
            <label>
              <span>Jumlah tamu</span>
              <select required name="guests" defaultValue="">
                <option value="" disabled>Pilih jumlah tamu</option>
                <option>1 orang</option>
                <option>2 orang</option>
                <option>3 orang</option>
                <option>4 orang</option>
                <option>5–8 orang</option>
              </select>
            </label>
            <button className="button button-dark reservation-submit" type="submit">Lanjut ke WhatsApp <ArrowUpRight size={15} /></button>
            <small>Jam operasional setiap hari, 07:00 — 22:00 WIB.</small>
          </form>
        )}
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-main">
          <div>
            <Logo inverse />
            <p className="footer-tagline">Good coffee. Good food.<br />Good mood.</p>
          </div>
          <div className="footer-nav">
            <span className="footer-label">Explore</span>
            {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
          </div>
          <div className="footer-nav">
            <span className="footer-label">Find us</span>
            <a href="https://instagram.com/majesticbrew" target="_blank" rel="noreferrer">Instagram</a>
            <a href="#contact">TikTok</a>
            <a href="https://maps.google.com/?q=Majestic+Brew+Bandung" target="_blank" rel="noreferrer">Google Maps</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Majestic Brew. All rights reserved.</span>
          <span>Made for good days.</span>
        </div>
      </div>
    </footer>
  )
}

function Lightbox({ index, onClose, onChange }: { index: number; onClose: () => void; onChange: (index: number) => void }) {
  const item = galleryItems[index]

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') onChange((index + 1) % galleryItems.length)
      if (event.key === 'ArrowLeft') onChange((index - 1 + galleryItems.length) % galleryItems.length)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [index, onChange, onClose])

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Gallery photo viewer" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose} aria-label="Tutup foto"><X size={22} /></button>
      <button className="lightbox-arrow lightbox-prev" onClick={(event) => { event.stopPropagation(); onChange((index - 1 + galleryItems.length) % galleryItems.length) }} aria-label="Foto sebelumnya"><ChevronLeft size={24} /></button>
      <figure onClick={(event) => event.stopPropagation()}>
        <img src={item.image} alt={item.alt} />
        <figcaption>{item.alt}<span>{String(index + 1).padStart(2, '0')} / {String(galleryItems.length).padStart(2, '0')}</span></figcaption>
      </figure>
      <button className="lightbox-arrow lightbox-next" onClick={(event) => { event.stopPropagation(); onChange((index + 1) % galleryItems.length) }} aria-label="Foto berikutnya"><ChevronRight size={24} /></button>
    </div>
  )
}

function VideoModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="video-modal" role="dialog" aria-modal="true" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose} aria-label="Tutup video"><X size={22} /></button>
      <div className="video-story" onClick={(event) => event.stopPropagation()}>
        <img src="/images/atmosphere.jpg" alt="Suasana hangat di Majestic Brew" />
        <div className="video-story-content">
          <Eyebrow light>Majestic Brew / 01</Eyebrow>
          <h2>Make room<br /><em>for good days.</em></h2>
          <p>Tempat kecil, kopi yang serius, dan waktu yang boleh berjalan pelan.</p>
          <button className="button button-light" onClick={onClose}>Kembali menjelajah <ArrowRight size={15} /></button>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [videoOpen, setVideoOpen] = useState(false)
  const [reservationOpen, setReservationOpen] = useState(false)

  return (
    <>
      <Navbar onReserve={() => setReservationOpen(true)} />
      <main>
        <Hero onPlay={() => setVideoOpen(true)} />
        <About />
        <BestSellers />
        <MenuSection />
        <Gallery onOpen={setLightboxIndex} />
        <Promotion />
        <Location />
        <Contact />
      </main>
      <Footer />
      {lightboxIndex !== null && <Lightbox index={lightboxIndex} onClose={() => setLightboxIndex(null)} onChange={setLightboxIndex} />}
      {videoOpen && <VideoModal onClose={() => setVideoOpen(false)} />}
      {reservationOpen && <ReservationModal onClose={() => setReservationOpen(false)} />}
    </>
  )
}