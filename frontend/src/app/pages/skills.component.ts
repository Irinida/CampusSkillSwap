import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { ExchangeRequest, SkillData, Student } from '../models';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="page-shell">
      <div class="topbar-row">
        <div>
          <p class="eyebrow">Explore</p>
          <h1>Skill exchange board</h1>
        </div>
      </div>

      <div class="filter-row">
        <select [(ngModel)]="selectedDepartment" (change)="applyFilters()">
          <option value="">All departments</option>
          <option *ngFor="let dept of departments" [value]="dept">{{ dept }}</option>
        </select>
        <select [(ngModel)]="selectedLevel" (change)="applyFilters()">
          <option value="">All levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        <input [(ngModel)]="search" (ngModelChange)="applyFilters()" placeholder="Search skill or owner" />
      </div>

      <div class="skill-grid">
        <article class="skill-card" *ngFor="let skill of filteredSkills">
          <div class="card-head">
            <span class="badge">{{ skill.category }}</span>
            <span class="level">{{ skill.level }}</span>
          </div>
          <h3>{{ skill.title }}</h3>
          <p>{{ skill.description }}</p>
          <ul>
            <li><strong>Owner:</strong> {{ skill.studentName }}</li>
            <li><strong>Department:</strong> {{ skill.department }}</li>
            <li><strong>Availability:</strong> {{ skill.availableDay }} · {{ skill.availableTime }}</li>
            <li><strong>Exchange for:</strong> {{ skill.exchangeFor }}</li>
          </ul>
          <button class="primary-btn" type="button" (click)="selectSkill(skill)">Request exchange</button>
        </article>
      </div>

      <div class="request-panel" *ngIf="selectedSkill">
        <h2>Request: {{ selectedSkill.title }}</h2>
        <form (ngSubmit)="submitRequest()">
          <div class="field-grid">
            <label>
              <span>Requester</span>
              <select [(ngModel)]="requestForm.requesterName" name="requesterName" required>
                <option value="">Select student</option>
                <option *ngFor="let student of students" [value]="student.name">{{ student.name }}</option>
              </select>
            </label>
            <label>
              <span>Preferred time</span>
              <input [(ngModel)]="requestForm.preferredTime" name="preferredTime" required />
            </label>
            <label>
              <span>Offered skill</span>
              <input [(ngModel)]="requestForm.offeredSkill" name="offeredSkill" required />
            </label>
            <label class="full-width">
              <span>Message</span>
              <textarea [(ngModel)]="requestForm.message" name="message" required rows="4"></textarea>
            </label>
          </div>
          <div class="buttons">
            <button type="submit" class="primary-btn">Send request</button>
            <button type="button" class="secondary-btn" (click)="selectedSkill = null">Cancel</button>
          </div>
          <p class="message" *ngIf="message">{{ message }}</p>
          <p class="error" *ngIf="error">{{ error }}</p>
        </form>
      </div>
    </section>
  `,
  styles: [
    `
      :host { display: block; padding: 32px 6%; }
      .page-shell { max-width: 1200px; margin: 0 auto; }
      .eyebrow { margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.12em; font-size: 11px; font-weight: 800; color: #6d7d67; }
      h1 { margin: 0; }
      .filter-row { margin: 22px 0; display: flex; gap: 12px; flex-wrap: wrap; }
      .filter-row select, .filter-row input, select, input, textarea { border: 1px solid #e1e8d9; border-radius: 10px; padding: 0.8rem 0.9rem; font-size: 0.98rem; background: #fff; }
      .filter-row > * { flex: 1 1 200px; }
      .skill-grid { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 18px; }
      .skill-card { background: #fff; border: 1px solid #e7eddf; border-radius: 20px; padding: 18px; }
      .card-head { display: flex; justify-content: space-between; align-items: center; }
      .badge { display: inline-block; background: #eef9ce; color: #475a2e; border-radius: 999px; padding: 0.4rem 0.65rem; font-size: 0.72rem; font-weight: 700; }
      .level { color: #4f5d4e; font-weight: 700; }
      .skill-card h3 { margin: 14px 0 8px; }
      .skill-card p { margin: 0; color: #57625a; min-height: 96px; }
      .skill-card ul { list-style: none; padding: 0; margin: 16px 0; display: grid; gap: 7px; color: #454f49; }
      .primary-btn, .secondary-btn { border: none; border-radius: 12px; padding: 0.9rem 1.1rem; font-weight: 800; cursor: pointer; }
      .primary-btn { background: #c9f267; color: #1a231d; }
      .secondary-btn { background: #f0f3ea; color: #1a231d; }
      .request-panel { margin-top: 28px; background: #fff; border: 1px solid #e7eddf; border-radius: 22px; padding: 22px; }
      .field-grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 16px; }
      .full-width { grid-column: 1 / -1; }
      label { display: flex; flex-direction: column; gap: 8px; font-weight: 600; color: #4d564d; }
      textarea { resize: vertical; }
      .buttons { display: flex; gap: 12px; margin-top: 18px; }
      .message { margin-top: 16px; color: #206941; font-weight: 700; }
      .error { margin-top: 10px; color: #a43737; font-weight: 700; }
      @media (max-width: 900px) { .skill-grid { grid-template-columns: 1fr; } .field-grid { grid-template-columns: 1fr; } }
    `
  ]
})
export class SkillsComponent implements OnInit {
  skills: SkillData[] = [];
  filteredSkills: SkillData[] = [];
  students: Student[] = [];
  selectedSkill: SkillData | null = null;
  selectedDepartment = '';
  selectedLevel = '';
  search = '';
  message = '';
  error = '';

  requestForm: Partial<ExchangeRequest> = {
    requesterName: '',
    preferredTime: '',
    offeredSkill: '',
    message: ''
  };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getStudents().subscribe({ next: (data) => (this.students = data) });
    this.api.getSkills().subscribe({
      next: (data) => {
        this.skills = data;
        this.applyFilters();
      }
    });
  }

  get departments(): string[] {
    return [...new Set(this.skills.map((skill) => skill.department))];
  }

  applyFilters(): void {
    this.filteredSkills = this.skills.filter((skill) => {
      const matchesDepartment = !this.selectedDepartment || skill.department === this.selectedDepartment;
      const matchesLevel = !this.selectedLevel || skill.level === this.selectedLevel;
      const keyword = this.search.trim().toLowerCase();
      const matchesSearch =
        !keyword ||
        skill.title.toLowerCase().includes(keyword) ||
        skill.studentName.toLowerCase().includes(keyword) ||
        skill.description.toLowerCase().includes(keyword);

      return matchesDepartment && matchesLevel && matchesSearch;
    });
  }

  selectSkill(skill: SkillData): void {
    this.selectedSkill = skill;
    this.message = '';
    this.error = '';
    this.requestForm = {
      requesterName: '',
      preferredTime: '',
      offeredSkill: '',
      message: ''
    };
  }

  submitRequest(): void {
    if (!this.selectedSkill || !this.requestForm.requesterName) {
      this.error = 'Please select a student and complete the request details.';
      return;
    }

    this.api
      .addRequest({
        requesterName: this.requestForm.requesterName,
        skillId: this.selectedSkill._id || '',
        skillTitle: this.selectedSkill.title,
        skillOwner: this.selectedSkill.studentName,
        message: this.requestForm.message || '',
        offeredSkill: this.requestForm.offeredSkill || '',
        preferredTime: this.requestForm.preferredTime || '',
        status: 'Pending'
      })
      .subscribe({
        next: () => {
          this.message = 'Exchange request sent successfully.';
          this.error = '';
          this.selectedSkill = null;
        },
        error: (err) => {
          this.error = err?.error?.message || 'Unable to create the exchange request.';
        }
      });
  }
}
