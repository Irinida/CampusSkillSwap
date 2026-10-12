import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ExchangeRequest, SkillData, Student } from '../models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="page-shell">
      <div class="top-row">
        <div>
          <p class="eyebrow">Overview</p>
          <h1>Dashboard</h1>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-box"><strong>{{ skills.length }}</strong><span>skills listed</span></div>
        <div class="stat-box"><strong>{{ students.length }}</strong><span>students</span></div>
        <div class="stat-box"><strong>{{ requests.length }}</strong><span>requests</span></div>
        <div class="stat-box"><strong>{{ completedCount }}</strong><span>completed</span></div>
      </div>

      <div class="status-panel">
        <div class="status-block">
          <span>Pending</span>
          <strong>{{ pendingCount }}</strong>
        </div>
        <div class="status-block">
          <span>Accepted</span>
          <strong>{{ acceptedCount }}</strong>
        </div>
        <div class="status-block">
          <span>Rejected</span>
          <strong>{{ rejectedCount }}</strong>
        </div>
      </div>

      <div class="list-panel">
        <h2>Recent requests</h2>
        <div class="request-card" *ngFor="let request of requests">
          <div class="header-row">
            <div>
              <h3>{{ request.skillTitle }}</h3>
              <p>{{ request.requesterName }} requested from {{ request.skillOwner }}</p>
            </div>
            <span class="status" [ngClass]="request.status.toLowerCase()">{{ request.status }}</span>
          </div>
          <div class="actions">
            <button type="button" (click)="changeStatus(request, 'Accepted')">Accept</button>
            <button type="button" class="alt" (click)="changeStatus(request, 'Completed')">Complete</button>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      :host { display: block; padding: 32px 6%; }
      .page-shell { max-width: 1100px; margin: 0 auto; }
      .eyebrow { margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.12em; font-size: 11px; font-weight: 800; color: #697d61; }
      h1 { margin: 0; }
      .stats-grid { margin-top: 24px; display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 16px; }
      .stat-box, .status-block, .request-card, .list-panel { background: #fff; border: 1px solid #e7ecdf; border-radius: 18px; }
      .stat-box { padding: 22px 18px; display: flex; flex-direction: column; }
      .stat-box strong { font-size: 2rem; }
      .stat-box span { color: #536056; }
      .status-panel { margin-top: 24px; display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 16px; }
      .status-block { padding: 22px 18px; display: flex; justify-content: space-between; align-items: center; }
      .status-block span { color: #4b564c; }
      .status-block strong { font-size: 2rem; }
      .list-panel { margin-top: 24px; padding: 20px; }
      .list-panel h2 { margin-top: 0; }
      .request-card { padding: 18px; margin-top: 12px; }
      .header-row { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
      .header-row h3 { margin: 0 0 8px; }
      .header-row p { margin: 0; color: #55615b; }
      .status { padding: 0.45rem 0.7rem; border-radius: 999px; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; }
      .status.pending { background: #f6ecc4; color: #735f17; }
      .status.accepted { background: #dff7e2; color: #1d613a; }
      .status.rejected { background: #f9e3e2; color: #8c302d; }
      .status.completed { background: #dfeaf7; color: #214f81; }
      .actions { margin-top: 12px; display: flex; gap: 10px; }
      .actions button { border: none; border-radius: 10px; padding: 0.75rem 0.9rem; font-weight: 700; cursor: pointer; background: #c9f267; color: #1a231d; }
      .actions button.alt { background: #edf2e8; }
      @media (max-width: 900px) { .stats-grid, .status-panel { grid-template-columns: 1fr 1fr; } }
      @media (max-width: 600px) { .stats-grid, .status-panel { grid-template-columns: 1fr; } }
    `
  ]
})
export class DashboardComponent implements OnInit {
  students: Student[] = [];
  skills: SkillData[] = [];
  requests: ExchangeRequest[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getStudents().subscribe({ next: (data) => (this.students = data) });
    this.api.getSkills().subscribe({ next: (data) => (this.skills = data) });
    this.loadRequests();
  }

  loadRequests(): void {
    this.api.getRequests().subscribe({ next: (data) => (this.requests = data) });
  }

  get pendingCount(): number {
    return this.requests.filter((request) => request.status === 'Pending').length;
  }

  get acceptedCount(): number {
    return this.requests.filter((request) => request.status === 'Accepted').length;
  }

  get rejectedCount(): number {
    return this.requests.filter((request) => request.status === 'Rejected').length;
  }

  get completedCount(): number {
    return this.requests.filter((request) => request.status === 'Completed').length;
  }

  changeStatus(request: ExchangeRequest, status: ExchangeRequest['status']): void {
    if (!request._id) return;
    this.api.updateRequest(request._id, { status }).subscribe({ next: () => this.loadRequests() });
  }
}
