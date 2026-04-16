// src/app/dashboard/borrowed-books/borrowed-books.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BorrowedBook, LibraryService } from '../library.service';

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
  displayedColumns: string[] = ['title', 'author', 'dueDate', 'status', 'renewalsLeft', 'actions'];
  dataSource: BorrowedBook[] = [];
  actionMessage = '';

  constructor(private libraryService: LibraryService) {
    this.refreshBorrowedBooks();
  }

  returnBook(book: BorrowedBook): void {
    this.libraryService.returnBook(book);
    this.actionMessage = `"${book.title}" was returned successfully.`;
    this.refreshBorrowedBooks();
  }

  renewBook(book: BorrowedBook): void {
    const renewed = this.libraryService.renewBook(book);
    this.actionMessage = renewed
      ? `"${book.title}" has been renewed for 7 more days.`
      : `"${book.title}" cannot be renewed anymore.`;
    this.refreshBorrowedBooks();
  }

  private refreshBorrowedBooks(): void {
    this.dataSource = this.libraryService.getBorrowedBooks();
  }
}