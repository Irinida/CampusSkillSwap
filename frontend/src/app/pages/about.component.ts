import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="page-shell">
      <div class="hero-box">
        <p class="eyebrow">About the project</p>
        <h1>Campus SkillSwap</h1>
        <p>
          A lightweight MEAN-stack demo where students publish the skills they can teach,
          request help from others, and track exchange progress in one central place.
        </p>
      </div>

      <div class="info-grid">
        <article class="info-card">
          <h3>Why it exists</h3>
          <p>It helps campus communities discover practical learning opportunities without money or formal barriers.</p>
        </article>
        <article class="info-card">
          <h3>How it works</h3>
          <p>Students register, publish a skill, browse offers, and track request status from pending to completed.</p>
        </article>
        <article class="info-card">
          <h3>Stack</h3>
          <p>Angular, Express, Node.js, MongoDB, and Mongoose form the full end-to-end application flow.</p>
        </article>
      </div>
    </section>
  `,
  styles: [
    `
      :host { display: block; padding: 32px 6%; }
      .page-shell { max-width: 1000px; margin: 0 auto; }
      .hero-box { background: linear-gradient(135deg, #edf9d4, #fff); border: 1px solid #e3eadc; border-radius: 22px; padding: 28px; }
      .eyebrow { margin: 0 0 10px; text-transform: uppercase; letter-spacing: 0.12em; font-size: 11px; font-weight: 800; color: #687860; }
      h1 { margin: 0; font-size: clamp(2.5rem, 4vw, 4rem); }
      .hero-box p { color: #536155; margin-top: 16px; }
      .info-grid { margin-top: 24px; display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 18px; }
      .info-card { background: #fff; border: 1px solid #e7ecdf; border-radius: 20px; padding: 20px; }
      .info-card h3 { margin-top: 0; }
      .info-card p { color: #536155; margin: 0; }
      @media (max-width: 750px) { .info-grid { grid-template-columns: 1fr; } }
    `
  ]
})
export class AboutComponent {}
