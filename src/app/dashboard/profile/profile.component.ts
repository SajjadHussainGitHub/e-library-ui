import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  member = {
    name: 'Library Member',
    email: 'reader@elibrary.app',
    role: 'Student',
    membershipId: 'EL-2026-1042',
    joinedOn: 'Jan 10, 2025',
    city: 'Lahore',
    bio: 'Passionate reader focused on technology, productivity, and modern fiction.'
  };
}
