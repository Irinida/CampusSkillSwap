import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ExchangeRequest } from '../models';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="page-shell">
      <div class="top-row">
        <div>
          <p class="eyebrow">Inbox</p>
          <h1>Exchange requests</h1>
        </div>
      </div>

      <div class="request-list">
        <article class="request-card" *ngFor="let request of requests">
          <div class="header-row">
            <div>
              <h3>{{ request.skillTitle }}</h3>
              <p>From {{ request.requesterName }} · owner: {{ request.skillOwner }}</p>
            </div>
            <span class="status" [ngClass]="request.status.toLowerCase()">{{ request.status }}</span>
          </div>

          <p class="message">{{ request.message }}</p>
          <div class="meta-grid">
            <span><strong>Offered:</strong> {{ request.offeredSkill }}</span>
            <span><strong>Preferred time:</strong> {{ request.preferredTime }}</span>
          </div>

          <div class="actions">
            <button type="button" class="success" (click)="changeStatus(request, 'Accepted')">Accept</button>
            <button type="button" class="warn" (click)="changeStatus(request, 'Rejected')">Reject</button>
            <button type="button" class="info" (click)="changeStatus(request, 'Completed')">Complete</button>
          </div>
        </article>

        <div class="empty" *ngIf="requests.length === 0">No exchange requests yet.</div>
      </div>
    </section>
  `,
  styles: [
    `
      :host { display: block; padding: 32px 6%; }
      .page-shell { max-width: 1100px; margin: 0 auto; }
      .eyebrow { margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.12em; font-size: 11px; font-weight: 800; color: #697d61; }
      h1 { margin: 0; }
      .request-list { display: grid; gap: 18px; margin-top: 24px; }
      .request-card { background: #fff; border: 1px solid #e7ecdf; border-radius: 20px; padding: 18px; }
      .header-row { display: flex; justify-content: space-between; gap: 14px; align-items: center; }
      .header-row h3 { margin: 0 0 6px; }
      .header-row p { margin: 0; color: #5e665f; }
      .status { padding: 0.45rem 0.7rem; border-radius: 999px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; }
      .status.pending { background: #f5edcb; color: #6e5a00; }
      .status.accepted { background: #dff7e2; color: #1b5c35; }
      .status.rejected { background: #f9e3e2; color: #8c302d; }
      .status.completed { background: #dfeaf7; color: #214f81; }
      .message { margin: 14px 0; color: #49544b; }
      .meta-grid { display: flex; gap: 18px; flex-wrap: wrap; color: #4f5a50; }
      .actions { margin-top: 16px; display: flex; gap: 10px; flex-wrap: wrap; }
      .success, .warn, .info { border: none; border-radius: 10px; padding: 0.75rem 0.9rem; font-weight: 700; cursor: pointer; }
      .success { background: #dff7e2; color: #1c6139; }
      .warn { background: #f9e3e2; color: #8c302d; }
      .info { background: #dfeaf7; color: #214f81; }
      .empty { background: #fff; border: 1px dashed #d8e1d0; border-radius: 18px; padding: 20px; text-align: center; color: #546054; }
    `
  ]
})
export class RequestsComponent implements OnInit {
  requests: ExchangeRequest[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.api.getRequests().subscribe({ next: (data) => (this.requests = data) });
  }

  changeStatus(request: ExchangeRequest, status: ExchangeRequest['status']): void {
    if (!request._id) return;

    this.api.updateRequest(request._id, { status }).subscribe({ next: () => this.load() });
  }
}
