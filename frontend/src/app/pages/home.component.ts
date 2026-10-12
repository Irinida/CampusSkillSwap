import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ExchangeRequest, SkillData, Student } from '../models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero-shell">
      <div class="hero-copy">
        <p class="eyebrow">Campus learning network</p>
        <h1>Trade skills.<br />Build confidence.</h1>
        <p class="lead">
          Connect with students who can teach what you need and learn what you want to grow next.
        </p>
        <div class="btn-row">
          <a class="primary-btn" routerLink="/skills">Explore skills</a>
          <a class="secondary-btn" routerLink="/register">Join the community</a>
        </div>
      </div>

      <div class="hero-card">
        <div class="mini-card top">
          <span>Ready to swap</span>
          <strong>{{ skills.length }} skills</strong>
        </div>
        <div class="mini-card middle">
          <span>Active students</span>
          <strong>{{ students.length }}</strong>
        </div>
        <div class="mini-card bottom">
          <span>Exchange requests</span>
          <strong>{{ requests.length }}</strong>
        </div>
      </div>
    </section>

    <section class="stats-grid">
      <div class="stat-box">
        <strong>{{ students.length }}</strong>
        <span>students</span>
      </div>
      <div class="stat-box">
        <strong>{{ skills.length }}</strong>
        <span>available skills</span>
      </div>
      <div class="stat-box">
        <strong>{{ pendingCount }}</strong>
        <span>pending requests</span>
      </div>
      <div class="stat-box">
        <strong>{{ completedCount }}</strong>
        <span>completed swaps</span>
      </div>
    </section>

    <section class="content-panel">
      <div class="section-head">
        <h2>Popular skill swaps</h2>
        <a routerLink="/skills">See all</a>
      </div>

      <div class="card-grid">
        <article class="skill-card" *ngFor="let skill of topSkills; let i = index">
          <span class="badge">{{ skill.category }}</span>
          <h3>{{ skill.title }}</h3>
          <p>{{ skill.description }}</p>
          <div class="meta-row">
            <span>{{ skill.level }}</span>
            <span>{{ skill.availableDay }}</span>
          </div>
          <small>by {{ skill.studentName }}</small>
        </article>
      </div>
    </section>
  `,
  styles: [
    `
      :host { display: block; padding: 32px 6%; }
      .hero-shell { display: grid; grid-template-columns: 1.3fr 0.9fr; gap: 32px; align-items: center; }
      .eyebrow { margin: 0 0 16px; text-transform: uppercase; letter-spacing: 0.12em; font-size: 11px; font-weight: 800; color: #6a7c5d; }
      h1 { margin: 0; font-size: clamp(2.8rem, 5vw, 5rem); line-height: 0.95; letter-spacing: -0.06em; }
      .lead { margin-top: 20px; max-width: 620px; font-size: 1.08rem; color: #555f52; }
      .btn-row { display: flex; gap: 14px; margin-top: 28px; flex-wrap: wrap; }
      .primary-btn, .secondary-btn, .section-head a { border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; padding: 0.9rem 1.2rem; font-weight: 700; }
      .primary-btn { background: #c9f267; color: #1f251d; }
      .secondary-btn { background: #fff; border: 1px solid #dee5d6; }
      .hero-card { background: linear-gradient(135deg, #f4fbdb, #fff); border: 1px solid #e6ebde; border-radius: 24px; padding: 24px; display: flex; flex-direction: column; gap: 14px; }
      .mini-card { background: #fff; border: 1px solid #ebf0e3; border-radius: 18px; padding: 18px; display: flex; justify-content: space-between; align-items: center; }
      .mini-card span { color: #5c6659; }
      .mini-card strong { font-size: 1.8rem; }
      .stats-grid { margin-top: 28px; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
      .stat-box { background: #fff; border: 1px solid #e8ebdf; border-radius: 18px; padding: 24px 20px; display: flex; flex-direction: column; }
      .stat-box strong { font-size: 2rem; }
      .stat-box span { color: #556154; }
      .content-panel { margin-top: 36px; }
      .section-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
      .section-head h2 { margin: 0; }
      .section-head a { border: 1px solid #dee5d6; color: #1b221d; }
      .card-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
      .skill-card { background: #fff; border: 1px solid #e9ede2; border-radius: 20px; padding: 18px; }
      .badge { display: inline-block; background: #eef8cf; color: #3e4f2a; padding: 0.4rem 0.7rem; border-radius: 999px; font-size: 0.72rem; font-weight: 700; }
      .skill-card h3 { margin: 14px 0 8px; font-size: 1.4rem; }
      .skill-card p { color: #58615b; margin: 0 0 12px; min-height: 72px; }
      .meta-row { display: flex; justify-content: space-between; font-size: 0.8rem; color: #5b665d; }
      .skill-card small { display: block; margin-top: 10px; color: #404a43; }
      @media (max-width: 900px) { .hero-shell, .card-grid, .stats-grid { grid-template-columns: 1fr; } }
    `
  ]
})
export class HomeComponent implements OnInit {
  students: Student[] = [];
  skills: SkillData[] = [];
  requests: ExchangeRequest[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getStudents().subscribe({ next: (data) => (this.students = data) });
    this.api.getSkills().subscribe({ next: (data) => (this.skills = data) });
    this.api.getRequests().subscribe({ next: (data) => (this.requests = data) });
  }

  get topSkills(): SkillData[] {
    return this.skills.slice(0, 3);
  }

  get pendingCount(): number {
    return this.requests.filter((request) => request.status === 'Pending').length;
  }

  get completedCount(): number {
    return this.requests.filter((request) => request.status === 'Completed').length;
  }
}
