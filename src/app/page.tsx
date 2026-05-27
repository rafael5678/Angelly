'use client';

import { useEffect, useState, useRef } from 'react';

export default function Home() {
  const [step, setStep] = useState<'login' | 'loading' | 'letter' | 'message'>('login');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [particles, setParticles] = useState<Array<any>>([]);
  const [confetti, setConfetti] = useState<Array<any>>([]);
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (step === 'message') {
      const createParticles = () => {
        const newParticles = Array.from({ length: 50 }, (_, i) => ({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 5,
          duration: 5 + Math.random() * 10,
        }));
        setParticles(newParticles);
      };
      createParticles();

      const createConfetti = () => {
        const newConfetti = Array.from({ length: 80 }, (_, i) => ({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 2,
          duration: 3 + Math.random() * 4,
          size: 0.8 + Math.random() * 1.5,
          type: ['❤️', '💕', '💖', '💗', '💓', '🌹', '🌸', '🌺'][Math.floor(Math.random() * 8)],
        }));
        setConfetti(newConfetti);
      };
      createConfetti();

      setCurtainOpen(true);

      if (audioRef.current) {
        audioRef.current.volume = 0.5;
        audioRef.current.loop = true;
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          console.log('Reproducción automática bloqueada, hacer clic en el botón de música');
          setIsPlaying(false);
        });
      }
    }
  }, [step]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '2002') {
      setStep('loading');
      setError(false);
      setTimeout(() => setStep('letter'), 3000);
      setTimeout(() => setStep('message'), 6000);
    } else {
      setError(true);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 'login':
        return (
          <div className="login-container">
            <div className="bg-decorations">
              <div className="cloud cloud-1">☁️</div>
              <div className="cloud cloud-2">☁️</div>
              <div className="cloud cloud-3">☁️</div>
              <div className="cloud cloud-4">☁️</div>
              <div className="moon">🌙</div>
              <div className="heart heart-1">❤️</div>
              <div className="heart heart-2">❤️</div>
              <div className="heart heart-3">❤️</div>
              <div className="flower flower-1">🌸</div>
              <div className="flower flower-2">🌺</div>
              <div className="flower flower-3">🌹</div>
              <div className="flower flower-4">🌷</div>
              <div className="flower flower-5">💮</div>
            </div>

            <div className="login-card">
              <div className="lock-heart">
                <span className="lock-icon">🔒</span>
                <span className="key-icon">🗝️</span>
              </div>
              <h1 className="login-title">Para Ti 💕</h1>
              <p className="login-subtitle">Ingresa la contraseña para ver tu mensaje</p>

              <form onSubmit={handleLogin} className="login-form">
                <div className="keypad-container">
                  <div className="keypad-display">
                    <div className="display-dots">
                      {[...Array(4)].map((_, i) => (
                        <span key={i} className={`dot ${password.length > i ? 'filled' : ''}`}></span>
                      ))}
                    </div>
                  </div>
                  <div className="keypad">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, 'delete'].map((num, i) => (
                      <button
                        key={i}
                        type="button"
                        className={`keypad-button ${num === null ? 'empty' : ''}`}
                        onClick={() => {
                          if (num === 'delete') {
                            setPassword(password.slice(0, -1));
                            setError(false);
                          } else if (num !== null && password.length < 4) {
                            setPassword(password + num);
                            setError(false);
                          }
                        }}
                        disabled={num === null}
                      >
                        {num === 'delete' ? '⌫' : num}
                      </button>
                    ))}
                  </div>
                </div>
                {error && <p className="error-text">Contraseña incorrecta, intenta de nuevo</p>}
                <button 
                  type="submit" 
                  className="login-button"
                  disabled={password.length < 4}
                >
                  Abrir
                </button>
              </form>
            </div>

            <style jsx>{`
              .login-container {
                min-height: 100vh;
                position: relative;
                overflow: hidden;
                background: linear-gradient(180deg, #fdf2f2 0%, #fad4d4 25%, #f5b7b1 50%, #ec7063 75%, #c0392b 100%);
                background-size: 400% 400%;
                animation: bgShift 20s ease infinite;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              }

              @keyframes bgShift {
                0%, 100% { background-position: 0% 0%; }
                50% { background-position: 0% 100%; }
              }

              .bg-decorations {
                position: fixed;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                pointer-events: none;
                z-index: 1;
              }

              .cloud {
                position: absolute;
                font-size: 8rem;
                opacity: 0.6;
                filter: sepia(1) hue-rotate(-50deg) saturate(2);
              }

              .cloud-1 {
                top: 5%;
                left: 5%;
                animation: floatCloud 8s ease-in-out infinite;
              }

              .cloud-2 {
                top: 15%;
                right: 10%;
                animation: floatCloud 10s ease-in-out infinite 1s reverse;
              }

              .cloud-3 {
                bottom: 20%;
                left: 10%;
                animation: floatCloud 9s ease-in-out infinite 2s;
              }

              .cloud-4 {
                bottom: 10%;
                right: 5%;
                animation: floatCloud 11s ease-in-out infinite 0.5s reverse;
              }

              @keyframes floatCloud {
                0%, 100% { transform: translateX(0) translateY(0); }
                50% { transform: translateX(30px) translateY(-20px); }
              }

              .moon {
                position: absolute;
                top: 8%;
                left: 50%;
                transform: translateX(-50%);
                font-size: 6rem;
                animation: pulseMoon 3s ease-in-out infinite;
                filter: drop-shadow(0 0 20px rgba(139, 69, 19, 0.5));
              }

              @keyframes pulseMoon {
                0%, 100% { transform: translateX(-50%) scale(1); }
                50% { transform: translateX(-50%) scale(1.1); }
              }

              .heart {
                position: absolute;
                font-size: 3rem;
                opacity: 0.7;
                animation: floatHeart 4s ease-in-out infinite;
              }

              .heart-1 {
                top: 25%;
                right: 15%;
                animation-delay: 0s;
              }

              .heart-2 {
                top: 60%;
                left: 8%;
                animation-delay: 1.5s;
              }

              .heart-3 {
                bottom: 30%;
                right: 8%;
                animation-delay: 0.8s;
              }

              @keyframes floatHeart {
                0%, 100% { transform: translateY(0) scale(1); opacity: 0.7; }
                50% { transform: translateY(-20px) scale(1.2); opacity: 1; }
              }

              .flower {
                position: absolute;
                font-size: 2.5rem;
                opacity: 0.8;
                animation: floatFlower 6s ease-in-out infinite;
              }

              .flower-1 {
                top: 10%;
                left: 15%;
                animation-delay: 0s;
              }

              .flower-2 {
                top: 30%;
                right: 5%;
                animation-delay: 1s;
              }

              .flower-3 {
                bottom: 15%;
                left: 5%;
                animation-delay: 2s;
              }

              .flower-4 {
                bottom: 25%;
                right: 15%;
                animation-delay: 1.5s;
              }

              .flower-5 {
                top: 50%;
                left: 3%;
                animation-delay: 0.5s;
              }

              @keyframes floatFlower {
                0%, 100% { transform: translateY(0) rotate(0deg); }
                50% { transform: translateY(-15px) rotate(10deg); }
              }

              .login-card {
                position: relative;
                z-index: 2;
                background: rgba(255, 245, 245, 0.95);
                backdrop-filter: blur(15px);
                border-radius: 35px;
                padding: 40px 35px;
                box-shadow: 0 30px 90px rgba(139, 69, 19, 0.3);
                text-align: center;
                animation: fadeIn 0.8s ease-out;
                border: 3px solid rgba(236, 112, 99, 0.3);
              }

              @keyframes fadeIn {
                from {
                  opacity: 0;
                  transform: scale(0.85) translateY(30px);
                }
                to {
                  opacity: 1;
                  transform: scale(1) translateY(0);
                }
              }

              .lock-heart {
                position: relative;
                display: inline-block;
                margin-bottom: 20px;
              }

              .lock-icon {
                font-size: 5rem;
                animation: pulseLock 2s ease-in-out infinite;
                display: inline-block;
              }

              .key-icon {
                position: absolute;
                font-size: 2.5rem;
                top: 0;
                right: -30px;
                animation: wiggleKey 1.5s ease-in-out infinite;
              }

              @keyframes pulseLock {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
              }

              @keyframes wiggleKey {
                0%, 100% { transform: rotate(-15deg); }
                50% { transform: rotate(15deg); }
              }

              .login-title {
                font-size: 2.2rem;
                background: linear-gradient(135deg, #c0392b, #e74c3c, #ec7063);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                margin: 0 0 10px 0;
                font-weight: 700;
              }

              .login-subtitle {
                color: #922b21;
                font-size: 1rem;
                margin: 0 0 25px 0;
              }

              .login-form {
                display: flex;
                flex-direction: column;
                gap: 20px;
                align-items: center;
              }

              .keypad-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 15px;
              }

              .keypad-display {
                background: rgba(236, 112, 99, 0.1);
                border: 3px solid #ec7063;
                border-radius: 15px;
                padding: 15px 30px;
                min-width: 150px;
              }

              .display-dots {
                display: flex;
                justify-content: center;
                gap: 12px;
              }

              .dot {
                width: 18px;
                height: 18px;
                border-radius: 50%;
                border: 3px solid #c0392b;
                background: transparent;
                transition: all 0.2s ease;
              }

              .dot.filled {
                background: #c0392b;
                transform: scale(1.1);
              }

              .keypad {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 10px;
              }

              .keypad-button {
                width: 55px;
                height: 55px;
                border-radius: 12px;
                border: 2px solid #ec7063;
                background: rgba(255, 255, 255, 0.9);
                color: #c0392b;
                font-size: 1.4rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.15s ease;
                display: flex;
                align-items: center;
                justify-content: center;
              }

              .keypad-button:hover:not(:disabled) {
                background: #ec7063;
                color: white;
                transform: scale(1.05);
              }

              .keypad-button:active:not(:disabled) {
                transform: scale(0.95);
              }

              .keypad-button.empty {
                visibility: hidden;
              }

              .login-input {
                width: 100%;
                padding: 18px 25px;
                font-size: 1.2rem;
                border: 3px solid #f0d6d6;
                border-radius: 15px;
                outline: none;
                text-align: center;
                letter-spacing: 5px;
                transition: all 0.3s ease;
              }

              .login-input:focus {
                border-color: #f5576c;
                box-shadow: 0 0 20px rgba(245, 87, 108, 0.2);
              }

              .login-button {
                padding: 16px 50px;
                font-size: 1.1rem;
                font-weight: 700;
                color: white;
                background: linear-gradient(135deg, #c0392b, #e74c3c, #ec7063);
                border: none;
                border-radius: 15px;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 5px 20px rgba(192, 57, 43, 0.3);
              }

              .login-button:hover:not(:disabled) {
                transform: translateY(-3px);
                box-shadow: 0 10px 30px rgba(192, 57, 43, 0.5);
              }

              .login-button:disabled {
                opacity: 0.5;
                cursor: not-allowed;
              }

              .error-text {
                color: #c0392b;
                font-weight: 600;
                margin: 0;
                animation: shake 0.5s ease;
              }

              @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-10px); }
                75% { transform: translateX(10px); }
              }
            `}</style>
          </div>
        );

      case 'loading':
        return (
          <div className="loading-container">
            <div className="loading-flowers">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="loading-flower"
                  style={{
                    animationDelay: `${i * 0.2}s`,
                    left: `${20 + Math.random() * 60}%`,
                  }}
                >
                  🌸
                </div>
              ))}
            </div>
            <div className="loading-text">Cargando tu sorpresa... 💕</div>

            <style jsx>{`
              .loading-container {
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background: linear-gradient(135deg, #fdfbfb, #f7e7e7);
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                position: relative;
                overflow: hidden;
              }

              .loading-flowers {
                position: absolute;
                width: 100%;
                height: 100%;
              }

              .loading-flower {
                position: absolute;
                font-size: 3rem;
                bottom: -100px;
                opacity: 0;
                animation: loadingFloat 3s ease-in-out infinite;
              }

              @keyframes loadingFloat {
                0% {
                  bottom: -100px;
                  opacity: 0;
                  transform: rotate(0deg);
                }
                20% {
                  opacity: 1;
                }
                80% {
                  opacity: 1;
                }
                100% {
                  bottom: 120%;
                  opacity: 0;
                  transform: rotate(360deg);
                }
              }

              .loading-text {
                font-size: 1.5rem;
                color: #f5576c;
                font-weight: 600;
                animation: pulse 1.5s ease-in-out infinite;
                position: relative;
                z-index: 10;
              }

              @keyframes pulse {
                0%, 100% { opacity: 0.6; }
                50% { opacity: 1; }
              }
            `}</style>
          </div>
        );

      case 'letter':
        return (
          <div className="letter-container">
            <div className="flower-burst">
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="burst-flower"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    '--angle': `${(i * 12)}deg`,
                    '--distance': `${150 + Math.random() * 100}px`,
                  }}
                >
                  {['🌸', '🌹', '🌺', '💐', '🌷'][Math.floor(Math.random() * 5)]}
                </div>
              ))}
            </div>

            <div className="envelope">
              <div className="envelope-flap"></div>
              <div className="envelope-body">✉️</div>
            </div>

            <style jsx>{`
              .letter-container {
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                background: linear-gradient(135deg, #fdfbfb, #f7e7e7);
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                position: relative;
                overflow: hidden;
              }

              .flower-burst {
                position: absolute;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
              }

              .burst-flower {
                position: absolute;
                font-size: 2.5rem;
                opacity: 0;
                animation: burstOut 2s ease-out forwards;
              }

              @keyframes burstOut {
                0% {
                  opacity: 0;
                  transform: translate(0, 0) scale(0);
                }
                20% {
                  opacity: 1;
                  transform: translate(0, 0) scale(1);
                }
                100% {
                  opacity: 0;
                  transform: translate(
                    calc(cos(var(--angle)) * var(--distance)),
                    calc(sin(var(--angle)) * var(--distance))
                  ) scale(0.5);
                }
              }

              .envelope {
                position: relative;
                font-size: 8rem;
                animation: envelopePop 0.5s ease-out 0.5s both;
              }

              @keyframes envelopePop {
                0% { transform: scale(0) rotate(-10deg); opacity: 0; }
                100% { transform: scale(1) rotate(0deg); opacity: 1; }
              }
            `}</style>
          </div>
        );

      case 'message':
      default:
        return (
          <div className="love-container">
            <audio
              ref={audioRef}
              src="/Morat - Cuando Nadie Ve Video Oficial.mp3"
              preload="auto"
            />
            
            <div className="music-control">
              <button
                className="music-button"
                onClick={() => {
                  if (audioRef.current) {
                    if (audioRef.current.paused) {
                      audioRef.current.play();
                      setIsPlaying(true);
                    } else {
                      audioRef.current.pause();
                      setIsPlaying(false);
                    }
                  }
                }}
              >
                {isPlaying ? '🔊' : '🎵'}
              </button>
              {!isPlaying && (
                <div className="music-hint">
                  Toca para iniciar la música 🎶
                </div>
              )}
            </div>

            <div className="animated-bg"></div>
            
            <div className={`flower-curtain ${curtainOpen ? 'open' : ''}`}>
              {[...Array(40)].map((_, i) => (
                <div
                  key={i}
                  className="curtain-flower"
                  style={{
                    left: `${i * 2.5}%`,
                    animationDelay: `${i * 0.05}s`,
                    flowerType: ['🌸', '🌹', '🌺', '🌷', '💮', '💐'][i % 6] as any,
                  }}
                >
                  {['🌸', '🌹', '🌺', '🌷', '💮', '💐'][i % 6]}
                </div>
              ))}
            </div>

            <div className="particles-container">
              {particles.map((particle) => (
                <div
                  key={particle.id}
                  className="particle"
                  style={{
                    left: `${particle.left}%`,
                    animationDelay: `${particle.delay}s`,
                    animationDuration: `${particle.duration}s`,
                  }}
                >
                  ♥
                </div>
              ))}
            </div>

            <div className="confetti-container">
              {confetti.map((item) => (
                <div
                  key={item.id}
                  className="confetti-item"
                  style={{
                    left: `${item.left}%`,
                    animationDelay: `${item.delay}s`,
                    animationDuration: `${item.duration}s`,
                    fontSize: `${item.size}rem`,
                  }}
                >
                  {item.type}
                </div>
              ))}
            </div>

            <div className="content-wrapper">
              <div className="love-letter">
                <div className="seal-wax">
                  <span className="seal-icon">💌</span>
                </div>
                
                <div className="letter-header">
                  <div className="corner-decoration top-left">✦</div>
                  <div className="corner-decoration top-right">✦</div>
                </div>

                <h1 className="title-main">🎂 Feliz Cumpleaños Angelly 🎂</h1>
                <div className="sparkles">✨ ✨ ✨</div>
                <h2 className="subtitle">Con todo mi cariño, en este día tan especial</h2>

                <div className="messages-container">
                  <div className="message-box">
                    <p className="message-text">
                      Hoy es 26 de noviembre, tu día, y quiero decirte que eres una morena muy especial. 
                      Espero que te vaya muy bien en todo absolutamente y que hoy día la estés pasando muy bien. 
                      Llevamos ya 2 meses hablando y la verdad es que me encantas demasiado.
                    </p>
                  </div>

                  <div className="divider">
                    <span className="divider-icon">💖</span>
                    <span className="divider-line"></span>
                    <span className="divider-icon">💖</span>
                  </div>

                  <div className="message-box special-message">
                    <div className="message-icon">👑</div>
                    <p className="message-text">
                      Disculpa Disney, pero mi princesa es más hermosa que todas tus princesas. 
                      Eres la chica que quiero consentir, mi niña. Me encantas, eres alguien que ilumina mis días.
                    </p>
                  </div>

                  <div className="divider">
                    <span className="divider-icon">💕</span>
                    <span className="divider-line"></span>
                    <span className="divider-icon">💕</span>
                  </div>

                  <div className="message-box">
                    <div className="message-icon">🎀</div>
                    <p className="message-text">
                      Y aunque esta niña le encanta todas las películas de princesas, menos de la sirenita, 
                      para mí tú eres la princesa más especial de todas. 🎀
                    </p>
                  </div>

                  <div className="divider">
                    <span className="divider-icon">💗</span>
                    <span className="divider-line"></span>
                    <span className="divider-icon">💗</span>
                  </div>

                  <div className="message-box">
                    <p className="message-text">
                      Espero que hoy tengas un día lleno de mucha alegría, risas y todo lo que te gusta. 
                      Mereces lo mejor del mundo. Que este cumpleaños sea el inicio de un año maravilloso para ti. 🎉
                    </p>
                  </div>
                </div>

                <div className="footer-message">
                  <div className="signature-line"></div>
                  <p className="date-text">26 de Noviembre 💕 Tu día especial</p>
                  
                  <div className="personal-note">
                    <p className="personal-text">
                      Atentamente tu negro canson, molestoso pero ante todo el chico que quiere saber todo de ti y estar a tu lado, 
                      solo soñando contigo y pensando en ti. 🥰
                    </p>
                  </div>
                  
                  <div className="signature-wrapper">
                    <span className="signature-icon">💝</span>
                    <p className="signature">Con mucho cariño</p>
                    <span className="signature-icon">💝</span>
                  </div>
                </div>

                <div className="letter-footer">
                  <div className="corner-decoration bottom-left">✦</div>
                  <div className="corner-decoration bottom-right">✦</div>
                </div>
              </div>
            </div>

            <style jsx>{`
              .love-container {
                min-height: 100vh;
                position: relative;
                overflow: hidden;
                background: linear-gradient(135deg, #fff5f7 0%, #ffd1dc 25%, #ffb6c1 50%, #ff91a4 75%, #ff6b8a 100%);
                background-size: 400% 400%;
                animation: bgShift 15s ease infinite;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: 'Georgia', 'Times New Roman', serif;
              }

              .music-control {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 100;
              }

              .music-button {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                border: 3px solid #ff69b4;
                background: linear-gradient(145deg, #fffaf0, #ffe4e1);
                font-size: 2rem;
                cursor: pointer;
                box-shadow: 0 5px 20px rgba(255, 105, 180, 0.4);
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: musicPulse 2s ease-in-out infinite;
              }

              .music-button:hover {
                transform: scale(1.1) rotate(10deg);
                box-shadow: 0 8px 30px rgba(255, 105, 180, 0.6);
                border-color: #ff1493;
              }

              .music-button:active {
                transform: scale(0.95);
              }

              @keyframes musicPulse {
                0%, 100% {
                  box-shadow: 0 5px 20px rgba(255, 105, 180, 0.4);
                }
                50% {
                  box-shadow: 0 5px 30px rgba(255, 20, 147, 0.7);
                }
              }

              .music-hint {
                margin-top: 10px;
                background: rgba(255, 255, 255, 0.95);
                padding: 8px 15px;
                border-radius: 20px;
                font-size: 0.9rem;
                color: #c2185b;
                font-weight: 600;
                box-shadow: 0 3px 10px rgba(255, 105, 180, 0.3);
                animation: hintPulse 2s ease-in-out infinite;
                text-align: center;
              }

              @keyframes hintPulse {
                0%, 100% {
                  transform: scale(1);
                }
                50% {
                  transform: scale(1.05);
                }
              }

              @keyframes bgShift {
                0% {
                  background-position: 0% 50%;
                }
                50% {
                  background-position: 100% 50%;
                }
                100% {
                  background-position: 0% 50%;
                }
              }

              .flower-curtain {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10;
                pointer-events: none;
                overflow: hidden;
              }

              .curtain-flower {
                position: absolute;
                top: -100px;
                font-size: 3rem;
                animation: curtainFall 2s ease-out forwards;
                opacity: 0.9;
              }

              .flower-curtain.open .curtain-flower {
                animation: curtainDisappear 1.5s ease-in forwards;
              }

              @keyframes curtainFall {
                0% {
                  top: -100px;
                  opacity: 0;
                }
                100% {
                  top: 50%;
                  opacity: 0.9;
                }
              }

              @keyframes curtainDisappear {
                0% {
                  top: 50%;
                  opacity: 0.9;
                }
                100% {
                  top: 120%;
                  opacity: 0;
                }
              }

              .animated-bg {
                position: absolute;
                width: 200%;
                height: 200%;
                top: -50%;
                left: -50%;
                z-index: 1;
                opacity: 0.1;
              }

              .particles-container {
                position: fixed;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                z-index: 2;
                pointer-events: none;
              }

              .particle {
                position: absolute;
                font-size: 1.5rem;
                opacity: 0.6;
                animation: float linear infinite;
              }

              @keyframes float {
                0% {
                  transform: translateY(100vh) rotate(0deg);
                  opacity: 0;
                }
                10% {
                  opacity: 0.8;
                }
                90% {
                  opacity: 0.8;
                }
                100% {
                  transform: translateY(-100vh) rotate(360deg);
                  opacity: 0;
                }
              }

              .confetti-container {
                position: fixed;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                z-index: 15;
                pointer-events: none;
              }

              .confetti-item {
                position: absolute;
                top: -50px;
                animation: confettiFall linear forwards;
              }

              @keyframes confettiFall {
                0% {
                  top: -50px;
                  opacity: 1;
                  transform: rotate(0deg) scale(0);
                }
                10% {
                  transform: rotate(36deg) scale(1);
                }
                90% {
                  opacity: 1;
                }
                100% {
                  top: 110vh;
                  opacity: 0;
                  transform: rotate(720deg) scale(0.5);
                }
              }

              .content-wrapper {
                position: relative;
                z-index: 3;
                width: 100%;
                max-width: 650px;
                margin: 20px;
              }

              .love-letter {
                background: linear-gradient(145deg, #fffaf0, #fef9f3);
                backdrop-filter: blur(10px);
                border-radius: 25px;
                padding: 50px 45px;
                box-shadow: 
                  0 30px 80px rgba(255, 107, 138, 0.3),
                  0 0 0 3px rgba(218, 165, 32, 0.3),
                  inset 0 0 60px rgba(255, 215, 0, 0.05);
                animation: slideIn 1s ease-out;
                position: relative;
                border: 2px solid rgba(218, 165, 32, 0.4);
              }

              .seal-wax {
                position: absolute;
                top: -25px;
                right: 30px;
                width: 60px;
                height: 60px;
                background: linear-gradient(145deg, #dc143c, #b22222);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 
                  0 5px 15px rgba(220, 20, 60, 0.5),
                  inset 0 -3px 10px rgba(0, 0, 0, 0.2);
                animation: sealBounce 2s ease-in-out infinite;
              }

              .seal-icon {
                font-size: 1.8rem;
              }

              @keyframes sealBounce {
                0%, 100% { transform: translateY(0) rotate(-5deg); }
                50% { transform: translateY(-5px) rotate(5deg); }
              }

              .letter-header,
              .letter-footer {
                position: relative;
                height: 30px;
              }

              .corner-decoration {
                position: absolute;
                font-size: 1.5rem;
                color: #daa520;
                opacity: 0.6;
              }

              .top-left { top: 0; left: 0; }
              .top-right { top: 0; right: 0; transform: scaleX(-1); }
              .bottom-left { bottom: 0; left: 0; transform: scaleY(-1); }
              .bottom-right { bottom: 0; right: 0; transform: scale(-1); }

              @keyframes slideIn {
                from {
                  opacity: 0;
                  transform: scale(0.8) translateY(50px) rotate(-2deg);
                }
                to {
                  opacity: 1;
                  transform: scale(1) translateY(0) rotate(0deg);
                }
              }

              .title-main {
                text-align: center;
                font-size: 2.6rem;
                background: linear-gradient(135deg, #b22222, #dc143c, #ff69b4, #ff1493);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                margin: 10px 0 5px 0;
                animation: glow 3s ease-in-out infinite;
                font-weight: 700;
                letter-spacing: 1px;
              }

              .sparkles {
                text-align: center;
                font-size: 1.5rem;
                margin: 5px 0 15px 0;
                animation: sparklePulse 1.5s ease-in-out infinite;
              }

              @keyframes sparklePulse {
                0%, 100% { opacity: 0.5; transform: scale(0.9); }
                50% { opacity: 1; transform: scale(1.1); }
              }

              @keyframes glow {
                0%, 100% {
                  text-shadow: 0 0 25px rgba(255, 105, 180, 0.4);
                }
                50% {
                  text-shadow: 0 0 45px rgba(255, 20, 147, 0.7);
                }
              }

              .subtitle {
                text-align: center;
                font-size: 1.15rem;
                color: #c2185b;
                margin: 0 0 35px 0;
                font-weight: 500;
                font-style: italic;
              }

              .messages-container {
                margin: 35px 0;
              }

              .message-box {
                background: linear-gradient(135deg, rgba(255, 182, 193, 0.15), rgba(255, 228, 196, 0.15));
                border-left: 5px solid #ff69b4;
                border-radius: 15px;
                padding: 25px 22px;
                margin: 25px 0;
                transition: all 0.4s ease;
                position: relative;
                overflow: hidden;
              }

              .message-box::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
                transform: translateX(-100%);
                transition: transform 0.6s ease;
              }

              .message-box:hover::before {
                transform: translateX(100%);
              }

              .message-box:hover {
                transform: translateX(8px) scale(1.02);
                box-shadow: 0 15px 40px rgba(255, 105, 180, 0.25);
                border-left-color: #ff1493;
              }

              .message-icon {
                font-size: 2rem;
                text-align: center;
                margin-bottom: 10px;
                animation: iconFloat 2s ease-in-out infinite;
              }

              @keyframes iconFloat {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-5px); }
              }

              .message-text {
                color: #4a2c2c;
                line-height: 1.9;
                font-size: 1.05rem;
                margin: 0;
                text-align: justify;
              }

              .divider {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 15px;
                margin: 35px 0;
              }

              .divider-line {
                flex: 1;
                height: 2px;
                background: linear-gradient(90deg, transparent, #ff69b4, transparent);
                max-width: 150px;
              }

              .divider-icon {
                font-size: 1.3rem;
                animation: dividerPulse 2s ease-in-out infinite;
              }

              @keyframes dividerPulse {
                0%, 100% { transform: scale(1); opacity: 0.7; }
                50% { transform: scale(1.3); opacity: 1; }
              }

              .footer-message {
                text-align: center;
                margin-top: 45px;
                padding-top: 25px;
              }

              .signature-line {
                height: 2px;
                background: linear-gradient(90deg, transparent, #daa520, #ff69b4, #daa520, transparent);
                margin-bottom: 20px;
              }

              .date-text {
                color: #c2185b;
                font-size: 1.15rem;
                font-weight: 600;
                margin: 0 0 25px 0;
              }

              .personal-note {
                background: linear-gradient(135deg, rgba(255, 182, 193, 0.2), rgba(255, 228, 196, 0.2));
                border-radius: 15px;
                padding: 20px 25px;
                margin: 20px 0;
                border: 2px dashed #ff69b4;
              }

              .personal-text {
                color: #8b0000;
                font-size: 1.05rem;
                line-height: 1.8;
                margin: 0;
                text-align: center;
                font-style: italic;
              }

              .signature-wrapper {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 15px;
              }

              .signature-icon {
                font-size: 1.8rem;
                animation: signatureHeart 1.5s ease-in-out infinite;
              }

              @keyframes signatureHeart {
                0%, 100% { transform: scale(1); }
                25% { transform: scale(1.2); }
                50% { transform: scale(1); }
                75% { transform: scale(1.2); }
              }

              .signature {
                color: #b22222;
                font-size: 2.2rem;
                font-weight: 700;
                margin: 0;
                font-family: 'Brush Script MT', 'Georgia', serif;
                animation: signatureGlow 2s ease-in-out infinite;
              }

              @keyframes signatureGlow {
                0%, 100% {
                  text-shadow: 0 0 10px rgba(255, 105, 180, 0.3);
                }
                50% {
                  text-shadow: 0 0 25px rgba(255, 20, 147, 0.6);
                }
              }

              .special-message {
                background: linear-gradient(135deg, rgba(255, 105, 180, 0.18), rgba(255, 215, 0, 0.12));
                border-left-color: #ff1493;
                border-left-width: 7px;
              }

              @media (max-width: 640px) {
                .love-letter {
                  padding: 35px 25px;
                }

                .title-main {
                  font-size: 2rem;
                }

                .message-text {
                  font-size: 1rem;
                }

                .signature {
                  font-size: 1.7rem;
                }

                .seal-wax {
                  width: 50px;
                  height: 50px;
                  right: 20px;
                }
              }
            `}</style>
          </div>
        );
    }
  };

  return renderStep();
}
