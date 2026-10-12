export interface Student {
  _id?: string; name: string; email: string; department: string; year: string;
  teachSkill: string; learnSkill: string;
}
export interface SkillData {
  _id?: string; studentName: string; studentId?: string; department: string; title: string;
  category: string; level: string; description: string; availableDay: string;
  availableTime: string; exchangeFor: string;
}
// A real TypeScript class with a constructor and method for the syllabus demonstration.
export class Skill implements SkillData {
  _id?: string; studentName!: string; studentId?: string; department!: string; title!: string;
  category!: string; level!: string; description!: string; availableDay!: string;
  availableTime!: string; exchangeFor!: string;
  constructor(data: SkillData) { Object.assign(this, data); }
  getSummary(): string { return `${this.title} by ${this.studentName} (${this.level})`; }
}
export interface ExchangeRequest {
  _id?: string; requesterName: string; skillId: string; skillTitle: string; skillOwner: string;
  message: string; offeredSkill: string; preferredTime: string;
  status: 'Pending' | 'Accepted' | 'Rejected' | 'Completed'; createdAt?: string;
}
