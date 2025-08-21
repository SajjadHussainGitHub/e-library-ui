// src/app/dashboard/borrowed-books/borrowed-books.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


export interface BorrowedBook {
  title: string;
  author: string;
  dueDate: Date;
}

const ELEMENT_DATA: BorrowedBook[] = [
  {title: 'Book 1', author: 'Author 1', dueDate: new Date('2024-01-15')},
  {title: 'Book 2', author: 'Author 2', dueDate: new Date('2024-02-20')},
  {title: 'Book 3', author: 'Author 3', dueDate: new Date('2024-03-10')},
  // Add more books here
];

@Component({
  selector: 'app-borrowed-books',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './borrowed-books.component.html',
  styleUrls: ['./borrowed-books.component.css'],
})
export class BorrowedBooksComponent {

   displayedColumns: string[] = ['title', 'author', 'dueDate', 'actions'];
  dataSource = ELEMENT_DATA;

}