import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SavedList {
  name: string;
  books: number;
  updated: string;
}

@Component({
  selector: 'app-saved-lists',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './saved-lists.component.html',
  styleUrls: ['./saved-lists.component.css']
})
export class SavedListsComponent {
  lists: SavedList[] = [
    { name: 'Weekend Reads', books: 6, updated: 'Updated 2 days ago' },
    { name: 'Productivity Essentials', books: 8, updated: 'Updated 1 week ago' },
    { name: 'Sci-Fi Favorites', books: 12, updated: 'Updated today' }
  ];
}
