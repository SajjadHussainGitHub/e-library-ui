import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PreferenceItem {
  label: string;
  description: string;
  enabled: boolean;
}

@Component({
  selector: 'app-preferences',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent {
  actionMessage = '';
  preferences: PreferenceItem[] = [
    {
      label: 'Email Notifications',
      description: 'Receive due-date reminders and program updates.',
      enabled: true
    },
    {
      label: 'Dark Reading Mode',
      description: 'Use dark colors in reading and catalog sections.',
      enabled: false
    },
    {
      label: 'Weekly Recommendations',
      description: 'Get a personalized list of new books every week.',
      enabled: true
    }
  ];

  toggle(index: number): void {
    this.preferences[index].enabled = !this.preferences[index].enabled;
  }

  savePreferences(): void {
    this.actionMessage = 'Preferences saved successfully.';
  }
}
