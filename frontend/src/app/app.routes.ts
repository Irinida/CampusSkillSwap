import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { RegisterComponent } from './pages/register.component';
import { SkillsComponent } from './pages/skills.component';
import { AddSkillComponent } from './pages/add-skill.component';
import { RequestsComponent } from './pages/requests.component';
import { DashboardComponent } from './pages/dashboard.component';
import { AboutComponent } from './pages/about.component';
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent }, { path: 'register', component: RegisterComponent },
  { path: 'skills', component: SkillsComponent }, { path: 'add-skill', component: AddSkillComponent },
  { path: 'requests', component: RequestsComponent }, { path: 'dashboard', component: DashboardComponent },
  { path: 'about', component: AboutComponent }, { path: '**', redirectTo: 'home' }
];
