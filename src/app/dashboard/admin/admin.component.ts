import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { BOOK_SUBJECTS, BookSubject, CatalogBook, LibraryService } from '../library.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  bookForm: FormGroup;
  actionMessage = '';
  catalogBooks: CatalogBook[] = [];
  readonly bookSubjects: readonly BookSubject[] = BOOK_SUBJECTS;

  constructor(private fb: FormBuilder, private libraryService: LibraryService) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      subject: ['Literature' as BookSubject, Validators.required],
      genre: ['', Validators.required],
      year: [2026, [Validators.required, Validators.min(1900), Validators.max(2100)]],
      rating: [4.5, [Validators.required, Validators.min(1), Validators.max(5)]],
      format: ['eBook', Validators.required],
      summary: ['', Validators.required],
      coverImage: [''],
      isFeatured: ['No', Validators.required]
    });

    this.refreshBooks();
  }

  addBook(): void {
    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      return;
    }

    const form = this.bookForm.value;
    this.libraryService.addCatalogBook(
      {
        title: form.title.trim(),
        author: form.author.trim(),
        subject: form.subject as BookSubject,
        genre: form.genre,
        year: Number(form.year),
        rating: Number(form.rating),
        format: form.format,
        summary: form.summary.trim(),
        coverImage: form.coverImage?.trim() || ''
      },
      form.isFeatured === 'Yes'
    );

    this.actionMessage = `"${form.title}" has been uploaded to the catalog.`;
    this.bookForm.patchValue({
      title: '',
      author: '',
      subject: 'Literature',
      genre: '',
      year: 2026,
      rating: 4.5,
      format: 'eBook',
      summary: '',
      coverImage: '',
      isFeatured: 'No'
    });
    this.refreshBooks();
  }

  deleteBook(book: CatalogBook): void {
    this.libraryService.removeCatalogBook(book);
    this.actionMessage = `"${book.title}" was removed from catalog.`;
    this.refreshBooks();
  }

  private refreshBooks(): void {
    this.catalogBooks = this.libraryService.getAllCatalogBooks();
  }
}
