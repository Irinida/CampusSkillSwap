import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { Student } from '../models';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="page-shell">
      <div class="summary-card">
        <p class="eyebrow">Join the network</p>
        <h1>Register a student</h1>
        <p>Create your profile and start swapping skills with campus peers.</p>
      </div>

      <form class="form-card" (ngSubmit)="submit()">
        <div class="field-grid">
          <label>
            <span>Name</span>
            <input [(ngModel)]="form.name" name="name" required />
          </label>
          <label>
            <span>Email</span>
            <input [(ngModel)]="form.email" name="email" type="email" required />
          </label>
          <label>
            <span>Department</span>
            <input [(ngModel)]="form.department" name="department" required />
          </label>
          <label>
            <span>Year</span>
            <input [(ngModel)]="form.year" name="year" required />
          </label>
          <label>
            <span>Skill you can teach</span>
            <input [(ngModel)]="form.teachSkill" name="teachSkill" required />
          </label>
          <label>
            <span>Skill you want to learn</span>
            <input [(ngModel)]="form.learnSkill" name="learnSkill" required />
          </label>
        </div>

        <div class="actions">
          <button type="submit" class="primary-btn">Create profile</button>
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
      .summary-card { background: linear-gradient(135deg, #eef9d4, #fff); border: 1px solid #e5ebdf; border-radius: 20px; padding: 24px; margin-bottom: 20px; }
      .eyebrow { margin: 0 0 10px; text-transform: uppercase; letter-spacing: 0.12em; font-size: 11px; font-weight: 800; color: #687860; }
      h1 { margin: 0; font-size: clamp(2.2rem, 3vw, 3.1rem); }
      .form-card { background: #fff; border: 1px solid #e7ecdf; border-radius: 22px; padding: 22px; }
      .field-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
      label { display: flex; flex-direction: column; gap: 8px; font-weight: 600; color: #495446; }
      input { border: 1px solid #dfe6d7; border-radius: 12px; padding: 0.85rem 0.9rem; font-size: 0.98rem; }
      .actions { margin-top: 18px; }
      .primary-btn { border: none; background: #c9f267; color: #1f251d; padding: 0.9rem 1.2rem; border-radius: 12px; font-weight: 800; cursor: pointer; }
      .message { margin-top: 18px; color: #255f3d; font-weight: 600; }
      .error { margin-top: 10px; color: #a43737; font-weight: 600; }
      @media (max-width: 700px) { .field-grid { grid-template-columns: 1fr; } }
    `
  ]
})
export class RegisterComponent {
  form: Student = {
    name: '',
    email: '',
    department: '',
    year: '',
    teachSkill: '',
    learnSkill: ''
  };
  message = '';
  error = '';

  constructor(private api: ApiService) {}

  submit(): void {
    this.message = '';
    this.error = '';

    this.api.addStudent(this.form).subscribe({
      next: () => {
        this.message = 'Student registered successfully.';
        this.form = { name: '', email: '', department: '', year: '', teachSkill: '', learnSkill: '' };
      },
      error: (err) => {
        this.error = err?.error?.message || 'Unable to register student.';
      }
    });
  }
}
