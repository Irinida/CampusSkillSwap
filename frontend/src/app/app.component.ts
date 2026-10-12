import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
@Component({ selector: 'app-root', standalone: true, imports: [RouterLink, RouterLinkActive, RouterOutlet], template: `
<header class="topbar"><a class="brand" routerLink="/home"><span class="brand-icon">↗</span><span>campus<span class="brand-accent">skillswap</span><small>TRADE SKILLS. NOT MONEY.</small></span></a>
<nav><a routerLink="/home" routerLinkActive="active">Home</a><a routerLink="/skills" routerLinkActive="active">Explore</a><a routerLink="/add-skill" routerLinkActive="active">Offer a skill</a><a routerLink="/dashboard" routerLinkActive="active">Dashboard</a><a routerLink="/about" routerLinkActive="active">About</a></nav><a class="nav-cta" routerLink="/register">Join community ↗</a></header>
<main><router-outlet /></main><footer><div class="footer-brand">Campus SkillSwap <span>✳</span></div><p>Good skills grow when they are shared.</p><small>Made for campus communities · MEAN stack mini project</small></footer>` })
export class AppComponent {}
