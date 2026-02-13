'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [particles, setParticles] = useState<Array<any>>([]);

  useEffect(() => {
    // Crear partículas flotantes
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
  }, []);

  return (
    <div className="love-container">
      {/* Canvas de fondo animado */}
      <div className="animated-bg"></div>

      {/* Partículas flotantes */}
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

      {/* Contenido principal */}
      <div className="content-wrapper">
        <div className="love-letter">
          <h1 className="title-main">💙 Para Ti 💙</h1>
          <h2 className="subtitle">Con todo mi amor, en este día especial</h2>

          <div className="messages-container">
            <div className="message-box">
              <p className="message-text">
                Eres una niña muy hermosa y bella y unas veces un poco linda sales con cosas muy inesperadas jejeje. 
                Eres una niña muy pero muy especial, pero ante todo gracias por tenerme tanta paciencia mi niña hermosa, 
                preciosa, la niña de mis ojos.
              </p>
            </div>

            <div className="divider">♥</div>

            <div className="message-box">
              <p className="message-text">
                Eres la niña que llegó a mi mundo y no dejo de pensar en ti. Eres una de las cosas más hermosas y bella 
                que ha tenido este moreno. No salgas pero nunca de mi mente, la niña hermosa de este moreno, mi niña bella.
              </p>
            </div>

            <div className="divider">♥</div>

            <div className="message-box special-message">
              <p className="message-text">
                Disculpa si me puse algo enojado hoy día. En realidad me encanta tu intensidad, me encantaaaa demasiado amor mío. 
                ¡Feliz día 14! Ya llevamos un mes de estar juntos. Te amo amor mío 💕
              </p>
            </div>
          </div>

          {/* Galería de fotos */}
          <div className="gallery-container">
            <h3 className="gallery-title">Nuestros Momentos 📸</h3>
            <div className="photos-grid">
              <div className="photo-item">
                <img src="/photo1.jpg" alt="Nuestro primer momento" className="photo-image" />
              </div>
              <div className="photo-item">
                <img src="/photo2.jpg" alt="Juntos y felices" className="photo-image" />
              </div>
              <div className="photo-item">
                <img src="/photo3.jpg" alt="Tú eres mi todo" className="photo-image" />
              </div>
            </div>
          </div>

          <div className="footer-message">
            <p className="date-text">14 de Febrero 💕 Día del Amor</p>
            <p className="signature">Te amo</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .love-container {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #0a7ea4 0%, #1a9fb5 25%, #2eb8c4 50%, #1a9fb5 75%, #0a7ea4 100%);
          background-size: 400% 400%;
          animation: bgShift 15s ease infinite;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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

        .content-wrapper {
          position: relative;
          z-index: 3;
          width: 100%;
          max-width: 600px;
          margin: 20px;
        }

        .love-letter {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 20px 60px rgba(10, 126, 164, 0.3);
          animation: slideIn 0.8s ease-out;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .title-main {
          text-align: center;
          font-size: 2.5rem;
          background: linear-gradient(135deg, #0a7ea4, #2eb8c4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0 0 10px 0;
          animation: glow 3s ease-in-out infinite;
        }

        @keyframes glow {
          0%, 100% {
            text-shadow: 0 0 20px rgba(42, 184, 196, 0.3);
          }
          50% {
            text-shadow: 0 0 40px rgba(42, 184, 196, 0.6);
          }
        }

        .subtitle {
          text-align: center;
          font-size: 1.1rem;
          color: #0a7ea4;
          margin: 0 0 30px 0;
          font-weight: 500;
        }

        .messages-container {
          margin: 30px 0;
        }

        .message-box {
          background: linear-gradient(135deg, rgba(10, 126, 164, 0.05), rgba(42, 184, 196, 0.05));
          border-left: 4px solid #2eb8c4;
          border-radius: 10px;
          padding: 20px;
          margin: 20px 0;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .message-box:hover {
          transform: translateX(5px);
          box-shadow: 0 10px 30px rgba(10, 126, 164, 0.2);
        }

        .message-text {
          color: #1a3a42;
          line-height: 1.8;
          font-size: 1rem;
          margin: 0;
          text-align: justify;
        }

        .divider {
          text-align: center;
          font-size: 1.5rem;
          color: #2eb8c4;
          margin: 30px 0;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.3);
            opacity: 1;
          }
        }

        .footer-message {
          text-align: center;
          margin-top: 40px;
          border-top: 2px solid #2eb8c4;
          padding-top: 20px;
        }

        .date-text {
          color: #0a7ea4;
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0 0 10px 0;
        }

        .signature {
          color: #2eb8c4;
          font-size: 2rem;
          font-weight: 700;
          margin: 0;
          animation: heartbeat 1.5s ease-in-out infinite;
        }

        @keyframes heartbeat {
          0%, 100% {
            transform: scale(1);
          }
          25% {
            transform: scale(1.1);
          }
          50% {
            transform: scale(1.2);
          }
          75% {
            transform: scale(1.1);
          }
        }

        .special-message {
          background: linear-gradient(135deg, rgba(42, 184, 196, 0.1), rgba(26, 159, 181, 0.1));
          border-left-color: #0a7ea4;
          border-left-width: 6px;
        }

        .gallery-container {
          margin: 40px 0;
        }

        .gallery-title {
          text-align: center;
          color: #0a7ea4;
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0 0 25px 0;
        }

        .photos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 15px;
          margin-bottom: 30px;
        }

        .photo-item {
          position: relative;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 8px 25px rgba(10, 126, 164, 0.25);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          aspect-ratio: 3/4;
        }

        .photo-item:hover {
          transform: scale(1.05) translateY(-5px);
          box-shadow: 0 12px 35px rgba(10, 126, 164, 0.35);
        }

        .photo-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        @media (max-width: 640px) {
          .love-letter {
            padding: 25px;
          }

          .title-main {
            font-size: 2rem;
          }

          .message-text {
            font-size: 0.95rem;
          }

          .signature {
            font-size: 1.5rem;
          }

          .photos-grid {
            grid-template-columns: 1fr;
          }

          .gallery-title {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </div>
  );
}
