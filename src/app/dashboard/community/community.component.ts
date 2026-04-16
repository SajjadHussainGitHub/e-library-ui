// src/app/dashboard/community/community.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ClubEvent {
  title: string;
  schedule: string;
  audience: string;
  description: string;
}

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css'],
})
export class CommunityComponent {
  readonly events: ClubEvent[] = [
    {
      title: 'Modern Fiction Circle',
      schedule: 'Every Wednesday • 6:30 PM',
      audience: 'General Readers',
      description: 'Discuss contemporary bestsellers and hidden gems with community members.'
    },
    {
      title: 'Research & Reference Clinic',
      schedule: 'Fridays • 4:00 PM',
      audience: 'Students & Academics',
      description: 'Learn citation tips, source discovery, and advanced catalog research.'
    },
    {
      title: 'Weekend Kids Story Hour',
      schedule: 'Saturdays • 11:00 AM',
      audience: 'Children 6-12',
      description: 'Interactive storytelling and fun activities designed for young readers.'
    }
  ];

  readonly highlights: string[] = [
    '12 active reading clubs',
    'Weekly author sessions',
    'Peer recommendations board',
    'Volunteer librarian mentors'
  ];
}