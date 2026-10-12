import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { SkillData, Student } from '../models';

@Component({
  selector: 'app-add-skill',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="page-shell">
      <div class="summary-card">
        <p class="eyebrow">Offer a skill</p>
        <h1>Share what you know</h1>
      </div>

      <form class="form-card" (ngSubmit)="submit()">
        <div class="field-grid">
          <label>
            <span>Student</span>
            <select [(ngModel)]="form.studentName" name="studentName" required (change)="syncStudent()">
              <option value="">Select a student</option>
              <option *ngFor="let student of students" [value]="student.name">{{ student.name }}</option>
            </select>
          </label>
          <label>
            <span>Department</span>
            <input [(ngModel)]="form.department" name="department" required />
          </label>
          <label>
            <span>Skill title</span>
            <input [(ngModel)]="form.title" name="title" required />
          </label>
          <label>
            <span>Category</span>
            <input [(ngModel)]="form.category" name="category" required />
          </label>
          <label>
            <span>Level</span>
            <select [(ngModel)]="form.level" name="level" required>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </label>
          <label>
            <span>Available day</span>
            <input [(ngModel)]="form.availableDay" name="availableDay" required />
          </label>
          <label>
            <span>Available time</span>
            <input [(ngModel)]="form.availableTime" name="availableTime" required />
          </label>
          <label class="full-width">
            <span>What you can exchange for</span>
            <input [(ngModel)]="form.exchangeFor" name="exchangeFor" required />
          </label>
          <label class="full-width">
            <span>Description</span>
            <textarea [(ngModel)]="form.description" name="description" rows="4" required></textarea>
          </label>
        </div>

        <div class="actions">
          <button class="primary-btn" type="submit">Publish skill</button>
        </div>

        <p class="message" *ngIf="message">{{ message }}</p>
        <p class="error" *ngIf="error">{{ error }}</p>
      </form>
    </section>
  `,
  styles: [
    `
      :host { display: block; padding: 32px 6%; }
      .page-shell { max-width: 980px; margin: 0 auto; }
      .summary-card { background: linear-gradient(135deg, #edf9d4, #fff); border: 1px solid #e4eadf; border-radius: 20px; padding: 24px; margin-bottom: 20px; }
      .eyebrow { margin: 0 0 12px; text-transform: uppercase; letter-spacing: 0.12em; font-size: 11px; font-weight: 800; color: #687860; }
      h1 { margin: 0; font-size: clamp(2.2rem, 3vw, 3.3rem); }
      .form-card { background: #fff; border: 1px solid #e7ecdf; border-radius: 22px; padding: 22px; }
      .field-grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 16px; }
      .full-width { grid-column: 1 / -1; }
      label { display: flex; flex-direction: column; gap: 8px; font-weight: 600; color: #4d574d; }
      input, select, textarea { border: 1px solid #e0e7d8; border-radius: 12px; padding: 0.85rem 0.9rem; font-size: 0.98rem; }
      textarea { resize: vertical; }
      .actions { margin-top: 18px; }
      .primary-btn { border: none; background: #c9f267; color: #1f251d; padding: 0.9rem 1.2rem; border-radius: 12px; font-weight: 800; cursor: pointer; }
      .message { margin-top: 18px; color: #255f3d; font-weight: 700; }
      .error { margin-top: 10px; color: #a43737; font-weight: 700; }
      @media (max-width: 700px) { .field-grid { grid-template-columns: 1fr; } }
    `
  ]
})
export class AddSkillComponent implements OnInit {
  students: Student[] = [];
  form: SkillData = {
    studentName: '',
    department: '',
    title: '',
    category: '',
    level: 'Beginner',
    description: '',
    availableDay: '',
    availableTime: '',
    exchangeFor: ''
  };
  message = '';
  error = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getStudents().subscribe({ next: (data) => (this.students = data) });
  }

  syncStudent(): void {
    const selected = this.students.find((student) => student.name === this.form.studentName);
    if (selected) {
      this.form.department = selected.department;
    }
  }

  submit(): void {
    this.message = '';
    this.error = '';

    this.api.addSkill(this.form).subscribe({
      next: () => {
        this.message = 'Skill published successfully.';
        this.form = { studentName: '', department: '', title: '', category: '', level: 'Beginner', description: '', availableDay: '', availableTime: '', exchangeFor: '' };
      },
      error: (err) => {
        this.error = err?.error?.message || 'Unable to create skill.';
      }
    });
  }
}
