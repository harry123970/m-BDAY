import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowDown, ArrowLeft, ArrowRight, Heart, Music2, Pause, Play, Sparkles, X } from 'lucide-react'
import { content } from './content'
import { loveYouStillLyrics } from './lyrics'

type ModalContent = { title: string; body: string; image?: string } | null

const resolveAsset = (path: string) => {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) return path
  const base = import.meta.env.BASE_URL || '/'
  const cleanPath = path.replace(/^\//, '')
  return `${base.endsWith('/') ? base : base + '/'}${cleanPath}`
}

const formatTime = (secs: number) => {
  if (isNaN(secs) || secs < 0) return '0:00'
  const m = Math.floor(secs / 60)
  const s = Math.floor(secs % 60)
  return `${m}:${s < 10 ? '0' : ''}${s}`
}

function App() {
  const [currentPage, setCurrentPage] = useState<'entrance' | 'main' | 'song'>(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash === '#song') return 'song'
      if (window.location.hash === '#main') return 'main'
    }
    return 'entrance'
  })
  const [openedLetter, setOpenedLetter] = useState(false)
  const [activeModal, setActiveModal] = useState<ModalContent>(null)
  const [noteIndex, setNoteIndex] = useState<number | null>(null)
  const [roseIndex, setRoseIndex] = useState<number | null>(null)
  const [showFinal, setShowFinal] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioDuration, setAudioDuration] = useState(0)
  const [audioCurrentTime, setAudioCurrentTime] = useState(0)
  const [audioError, setAudioError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const activeModalRef = useRef<ModalContent>(null)
  activeModalRef.current = activeModal

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    setAudioError(null)

    if (audio.paused) {
      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true)
          })
          .catch((err: Error) => {
            console.error('Audio play failed:', err)
            setAudioError(`Playback error: ${err.message || 'Cannot play audio'}`)
            setIsPlaying(false)
          })
      }
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }

  const petals = useMemo(() => Array.from({ length: 22 }, (_, i) => ({
    left: `${(i * 37 + 11) % 100}%`,
    delay: `${(i % 8) * -1.7}s`,
    duration: `${12 + (i % 7) * 2}s`,
    size: `${8 + (i % 4) * 3}px`,
  })), [])

  useEffect(() => {
    document.title = `For ${content.nickname} ♥`

    // Setup history so browser / phone back button works without leaving the site
    if (window.location.hash === '#song') {
      window.history.replaceState({ page: 'entrance' }, '', window.location.pathname + window.location.search)
      window.history.pushState({ page: 'main' }, '', '#main')
      window.history.pushState({ page: 'song' }, '', '#song')
    } else if (window.location.hash === '#main') {
      window.history.replaceState({ page: 'entrance' }, '', window.location.pathname + window.location.search)
      window.history.pushState({ page: 'main' }, '', '#main')
    } else {
      window.history.replaceState({ page: 'entrance' }, '', window.location.pathname + window.location.search)
    }

    const handlePopState = () => {
      // If note/photo modal was open, browser back closes modal first
      if (activeModalRef.current) {
        setActiveModal(null)
        return
      }

      const hash = window.location.hash
      if (hash === '#song') {
        setCurrentPage('song')
      } else if (hash === '#main') {
        setCurrentPage('main')
      } else {
        setCurrentPage('entrance')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const enterGarden = () => {
    window.history.pushState({ page: 'main' }, '', '#main')
    setCurrentPage('main')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const returnToEntrance = () => {
    if (window.location.hash) {
      window.history.back()
    } else {
      setCurrentPage('entrance')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const goToSongPage = () => {
    window.history.pushState({ page: 'song' }, '', '#song')
    setCurrentPage('song')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const backToGardenFromSong = () => {
    if (window.location.hash === '#song') {
      window.history.back()
    } else {
      setCurrentPage('main')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const openModal = (data: ModalContent) => {
    setActiveModal(data)
    window.history.pushState({ page: 'modal' }, '', '#modal')
  }

  const closeModal = () => {
    setActiveModal(null)
    if (window.location.hash === '#modal') {
      window.history.back()
    }
  }

  return (
    <main className="site-shell">
      <div className="grain" aria-hidden="true" />
      <div className="moon-glow" aria-hidden="true" />
      {petals.map((petal, i) => (
        <span key={i} className="falling-petal" style={{ left: petal.left, animationDelay: petal.delay, animationDuration: petal.duration, width: petal.size, height: `calc(${petal.size} * 1.35)` }} />
      ))}

      {currentPage === 'entrance' ? (
        <section className="entrance-screen">
          <div className="entrance-stars" aria-hidden="true">✦　·　✧　　 ✦　　 ·　✧</div>
          <div className="entrance-frame">
            <div className="small-label"><Sparkles size={13} /> A LITTLE WORLD, JUST FOR YOU <Sparkles size={13} /></div>
            <div className="ornament">❦</div>
            <p className="script eyebrow">For the one who makes ordinary days feel special</p>
            <h1>Happy Birthday,<br /><span>{content.nickname}</span></h1>
            <p className="entrance-copy">{content.birthdayLine}</p>
            <div className="envelope-wrap">
              <div className="envelope-shadow" />
              <button className="envelope" onClick={enterGarden} aria-label="Open your birthday surprise">
                <span className="envelope-flap" />
                <span className="wax-seal">♥</span>
                <span className="envelope-text">open your little surprise</span>
              </button>
            </div>
            <p className="tiny-note">made with love, only for you</p>
          </div>
          <div className="bottom-hint">TAP THE ENVELOPE TO ENTER <ArrowDown size={13} /></div>
        </section>
      ) : currentPage === 'song' ? (
        <section className="song-page">
          <header className="topbar">
            <div className="topbar-left">
              <button className="nav-back-btn" onClick={backToGardenFromSong} aria-label="Back to Garden">
                <ArrowLeft size={14} />
                <span>Back to Garden</span>
              </button>
              <span className="brand">
                <span className="brand-mark">❦</span> for {content.nickname.toLowerCase()}
              </span>
            </div>
          </header>

          <div className="song-page-content">
            <div className="section-heading">
              <p className="small-label">OUR SPECIAL SONG</p>
              <h2>{content.musicTitle || 'Love You Still (abcdefu)'}</h2>
              <p className="song-subline">by {content.musicArtist || 'Tyler Shaw'} ♥</p>
            </div>

            <div className="simple-audio-player-card">
              <div className="custom-player-row">
                <button
                  type="button"
                  className={`big-play-btn ${isPlaying ? 'is-playing' : ''}`}
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} style={{ marginLeft: 3 }} />}
                </button>
                <div className="player-track-info">
                  <span className="player-track-title">{content.musicTitle || 'Love You Still'}</span>
                  <span className="player-track-time">
                    {formatTime(audioCurrentTime)} / {formatTime(audioDuration || 148)}
                  </span>
                </div>
              </div>

              <div className="player-slider-wrap">
                <input
                  type="range"
                  min={0}
                  max={audioDuration || 148}
                  step={0.1}
                  value={audioCurrentTime}
                  onChange={(e) => {
                    const time = parseFloat(e.target.value)
                    setAudioCurrentTime(time)
                    if (audioRef.current) {
                      audioRef.current.currentTime = time
                    }
                  }}
                  className="player-slider"
                  aria-label="Seek audio"
                />
              </div>

              {audioError && (
                <div className="audio-error-msg">
                  ⚠️ {audioError}
                </div>
              )}

              <div className="native-audio-wrapper">
                <audio
                  ref={audioRef}
                  controls
                  preload="auto"
                  src={resolveAsset(content.musicSrc)}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onTimeUpdate={(e) => setAudioCurrentTime(e.currentTarget.currentTime)}
                  onLoadedMetadata={(e) => setAudioDuration(e.currentTarget.duration)}
                  onError={(e) => {
                    const err = e.currentTarget.error
                    setAudioError(`Audio error (code ${err?.code}): ${err?.message || 'File cannot be loaded'}`)
                  }}
                  className="native-audio"
                >
                  Your browser does not support audio playback.
                </audio>
              </div>
            </div>

            <div className="lyrics-text-paper">
              <div className="lyrics-text-header">
                <span>✦ SONG LYRICS ✦</span>
              </div>
              <div className="lyrics-plain-text">
                {loveYouStillLyrics.map((line, idx) => (
                  <p key={idx} className="lyric-plain-line">
                    {line.text}
                  </p>
                ))}
              </div>
              <div className="lyrics-paper-footer">
                <span>♥</span>
              </div>
            </div>

            <div className="song-page-actions">
              <button className="back-to-top-btn" onClick={backToGardenFromSong}>
                <ArrowLeft size={14} /> Back to Garden
              </button>
            </div>
          </div>
        </section>
      ) : (
        <>
          <header className="topbar">
            <div className="topbar-left">
              <button className="nav-back-btn" onClick={returnToEntrance} aria-label="Go back to cover">
                <ArrowLeft size={14} />
                <span>Cover</span>
              </button>
              <a className="brand" href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
                <span className="brand-mark">❦</span> for {content.nickname.toLowerCase()}
              </a>
            </div>
            <button
              className="music-button"
              onClick={goToSongPage}
              aria-label="Open Our Song & Lyrics"
            >
              <Music2 size={14} />
              <span>Our Song & Lyrics</span>
            </button>
          </header>

          <section id="top" className="hero-section">
            <div className="hero-lantern lantern-left"><span /></div>
            <div className="hero-lantern lantern-right"><span /></div>
            <div className="hero-content">
              <p className="small-label"><span className="tiny-star">✦</span> A GARDEN FULL OF LITTLE THINGS <span className="tiny-star">✦</span></p>
              <p className="script hero-pretitle">Aaj ki raat, sirf aapke naam…</p>
              <h2>Come a little<br /><em>closer, my baccha.</em></h2>
              <p className="hero-copy">{content.intro}</p>
              <button className="outline-button" onClick={() => document.getElementById('garden')?.scrollIntoView({ behavior: 'smooth' })}>
                Explore the garden <ArrowDown size={15} />
              </button>
            </div>
            <div className="hero-bottom-note"><span>✧</span> TAKE YOUR TIME <span>✧</span></div>
          </section>

          <section id="garden" className="garden-section section-pad">
            <div className="section-heading">
              <p className="small-label">01 — THE ROSE GARDEN</p>
              <h2>Little things I <em>adore</em></h2>
              <p>Har rose ke andar ek chhoti si baat chhupi hai. Tap karke dekho.</p>
            </div>
            <div className="rose-grid">
              {content.roseWishes.map((wish, i) => (
                <button className={`rose-card ${roseIndex === i ? 'rose-card-active' : ''}`} key={i} onClick={() => setRoseIndex(roseIndex === i ? null : i)}>
                  <span className="rose-art" aria-hidden="true"><span className="rose-petal p1" /><span className="rose-petal p2" /><span className="rose-petal p3" /><span className="rose-petal p4" /><span className="rose-core" /><span className="rose-stem" /><span className="rose-leaf" /></span>
                  <span className="rose-number">ROSE Nº 0{i + 1}</span>
                  <span className="rose-wish">{roseIndex === i ? wish : 'tap to unfold'}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="jar-section section-pad">
            <div className="jar-copy">
              <p className="small-label">02 — A TINY LITTLE REMINDER</p>
              <h2>A jar full of<br /><em>soft thoughts.</em></h2>
              <p>{content.jarHint}</p>
              <button className="filled-button" onClick={() => setNoteIndex((prev) => prev === null ? Math.floor(Math.random() * content.jarNotes.length) : (prev + 1) % content.jarNotes.length)}>
                Pick a little note <Sparkles size={15} />
              </button>
              {noteIndex !== null && <div className="note-reveal" key={noteIndex}><span>✦ A NOTE FOR YOU ✦</span><p>{content.jarNotes[noteIndex]}</p><button onClick={() => setNoteIndex((prev) => (prev! + 1) % content.jarNotes.length)}>Another note ↗</button></div>}
            </div>
            <button className="jar-visual" onClick={() => setNoteIndex((prev) => prev === null ? Math.floor(Math.random() * content.jarNotes.length) : (prev + 1) % content.jarNotes.length)} aria-label="Pick a note from the jar">
              <span className="jar-lid" /><span className="jar-neck" /><span className="jar-glass">
                <span className="jar-heart h1">♥</span><span className="jar-heart h2">♥</span><span className="jar-heart h3">♥</span>
                <span className="jar-paper paper1" /><span className="jar-paper paper2" /><span className="jar-paper paper3" /><span className="jar-label">little<br />notes<br /><small>for you</small></span>
              </span>
              <span className="jar-caption">touch the jar <span>✦</span></span>
            </button>
          </section>

          <section className="letter-section section-pad">
            <div className="letter-deco left-deco">❦</div>
            <div className="letter-card">
              <div className="letter-topline"><span>WRITTEN WITH LOVE</span><span>✦ ♥ ✦</span></div>
              <div className="letter-seal">♥</div>
              <p className="script letter-kicker">Meri Mahotarma,</p>
              <h2>{content.letterTitle}</h2>
              {!openedLetter ? (
                <>
                  <p className="letter-teaser">Open it</p>
                  <button className="filled-button" onClick={() => setOpenedLetter(true)}>Unfold my letter <ArrowRight size={15} /></button>
                </>
              ) : (
                <div className="letter-body">
                  {content.letter.split('\n').map((line, i) => line.trim() ? <p key={i}>{line}</p> : <div key={i} className="letter-space" />)}
                  <p className="script signoff">Hamesha tumhara ♥</p>
                </div>
              )}
              <div className="letter-bottomline">SEALED WITH A LITTLE LOVE <span>♥</span></div>
            </div>
            <div className="letter-deco right-deco">❦</div>
          </section>

          <section className="photo-section section-pad">
            <div className="section-heading">
              <p className="small-label">03 — LITTLE MOMENTS</p>
              <h2>A few pieces of <em>you & me.</em></h2>
              <p>Yahan apni favourite photos add karna. Har photo ke saath ek chhoti si line.</p>
            </div>
            <div className="photo-gallery">
              {content.photos.map((photo, i) => (
                <button
                  className={`photo-frame frame-${i + 1}`}
                  key={photo.src || i}
                  onClick={() => openModal({ title: `A little moment Nº 0${i + 1}`, body: photo.caption, image: photo.src })}
                >
                  <div className="photo-placeholder">
                    {photo.src && (
                      <img
                        src={resolveAsset(photo.src)}
                        alt={photo.caption}
                        onError={(e) => { e.currentTarget.style.display = 'none' }}
                      />
                    )}
                    <span className="placeholder-symbol">✦</span>
                    <span className="placeholder-help">ADD YOUR PHOTO</span>
                  </div>
                  <span className="photo-caption">{photo.caption}</span>
                  <span className="photo-index">0{i + 1}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="final-section section-pad">
            <div className="final-stars" aria-hidden="true">✦　　·　✧　　　✦　　 ·　✧</div>
            <div className="final-rose">❦</div>
            <p className="small-label">04 — ONE LAST LITTLE THING</p>
            <h2>{content.finalTitle}</h2>
            {!showFinal ? (
              <>
                <p className="final-teaser">Ek aakhri envelope hai, jo sirf apke liye.</p>
                <button className="final-envelope" onClick={() => setShowFinal(true)}><span className="final-envelope-flap" /><span className="final-wax">♥</span><span>open this, my love</span></button>
              </>
            ) : (
              <div className="final-message">
                <p>{content.finalMessage}</p>
                <div className="final-heart">♥</div>
                <p className="script final-signoff">Happy Birthday, {content.nickname}.</p>
              </div>
            )}
            <div className="final-actions">
              <button className="back-to-entrance-btn" onClick={returnToEntrance}>
                <ArrowLeft size={14} /> Back to cover
              </button>
              <button className="back-to-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                Back to top ↑
              </button>
            </div>
          </section>

          <footer className="footer">
            <span>made with love, only for {content.nickname.toLowerCase()}</span>
            <span>✦ ♥ ✦</span>
            <span>one little universe, just for you</span>
          </footer>
        </>
      )}

      {activeModal && (
        <div className="modal-backdrop" role="presentation" onClick={closeModal}>
          <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal} aria-label="Close"><X size={18} /></button>
            <span className="modal-flower">❦</span>
            <p className="small-label">A LITTLE NOTE</p>
            <h2 id="modal-title">{activeModal.title}</h2>
            {activeModal.image && (
              <div className="modal-image-wrap">
                <img src={resolveAsset(activeModal.image)} alt={activeModal.title} />
              </div>
            )}
            <p>{activeModal.body}</p>
            <button className="filled-button" onClick={closeModal}>Keep exploring <Heart size={14} /></button>
          </div>
        </div>
      )}
    </main>
  )
}

export default App
