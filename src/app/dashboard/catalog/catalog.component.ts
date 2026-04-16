// src/app/dashboard/catalog/catalog.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BOOK_SUBJECTS,
  BookSubject,
  CatalogBook,
  LibraryService,
} from '../library.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent {
  borrowedCount = 0;
  actionMessage = '';
  featuredBooks: CatalogBook[] = [];
  allCatalogBooks: CatalogBook[] = [];
  /** Subjects shown in the catalog filter (All + Science, IT, Arts, …). */
  readonly subjectFilters: readonly (BookSubject | 'All')[] = ['All', ...BOOK_SUBJECTS];
  selectedSubject: BookSubject | 'All' = 'All';

  constructor(private libraryService: LibraryService) {
    this.refreshCatalogData();
  }

  get filteredFeaturedBooks(): CatalogBook[] {
    if (this.selectedSubject === 'All') {
      return this.featuredBooks;
    }
    return this.featuredBooks.filter((b) => b.subject === this.selectedSubject);
  }

  get filteredCatalogBooks(): CatalogBook[] {
    if (this.selectedSubject === 'All') {
      return this.allCatalogBooks;
    }
    return this.allCatalogBooks.filter((b) => b.subject === this.selectedSubject);
  }

  setSubject(subject: BookSubject | 'All'): void {
    this.selectedSubject = subject;
  }

  borrow(book: CatalogBook): void {
    const isAdded = this.libraryService.borrowBook(book);
    this.actionMessage = isAdded
      ? `"${book.title}" has been added to your borrowed list.`
      : `"${book.title}" is already in your borrowed list.`;
    this.refreshCatalogData();
  }

  isBorrowed(book: CatalogBook): boolean {
    return this.libraryService.isBorrowed(book);
  }

  private refreshCatalogData(): void {
    this.featuredBooks = this.libraryService.getFeaturedBooks();
    this.allCatalogBooks = this.libraryService.getAllCatalogBooks();
    this.borrowedCount = this.libraryService.getBorrowedBooks().length;
    if (this.selectedSubject !== 'All') {
      const hasBooksInSubject = [...this.featuredBooks, ...this.allCatalogBooks].some(
        (b) => b.subject === this.selectedSubject
      );
      if (!hasBooksInSubject) {
        this.selectedSubject = 'All';
      }
    }
  }
}