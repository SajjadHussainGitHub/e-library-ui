import { Injectable } from '@angular/core';

/** Subject areas used to group books in the catalog (Science, IT, Arts, etc.). */
export const BOOK_SUBJECTS = [
  'Science',
  'IT',
  'Arts',
  'Literature',
  'History',
  'Business',
  'Psychology'
] as const;

export type BookSubject = (typeof BOOK_SUBJECTS)[number];

export interface CatalogBook {
  title: string;
  author: string;
  /** Subject category for browsing (Science, IT, Arts, …). */
  subject: BookSubject;
  genre: string;
  year: number;
  rating: number;
  format: string;
  summary: string;
  coverImage?: string;
}

export interface BorrowedBook {
  title: string;
  author: string;
  dueDate: Date;
  status: 'On Time' | 'Due Soon' | 'Overdue';
  renewalsLeft: number;
}

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private featuredBooks: CatalogBook[] = [
    {
      title: 'The Midnight Library',
      author: 'Matt Haig',
      subject: 'Literature',
      genre: 'Fiction',
      year: 2020,
      rating: 4.4,
      format: 'eBook',
      summary: 'A moving story about choices, regrets, and second chances.',
      coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Atomic Habits',
      author: 'James Clear',
      subject: 'Psychology',
      genre: 'Self Development',
      year: 2018,
      rating: 4.8,
      format: 'Audiobook',
      summary: 'Practical techniques to build good habits and break bad ones.',
      coverImage: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Project Hail Mary',
      author: 'Andy Weir',
      subject: 'Science',
      genre: 'Science Fiction',
      year: 2021,
      rating: 4.7,
      format: 'eBook',
      summary: 'A lone astronaut must save humanity with science and courage.',
      coverImage: 'https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Educated',
      author: 'Tara Westover',
      subject: 'Literature',
      genre: 'Memoir',
      year: 2018,
      rating: 4.6,
      format: 'Print',
      summary: 'An unforgettable memoir about family, learning, and identity.',
      coverImage: 'https://images.unsplash.com/photo-1473755504818-b72b6dfdc226?auto=format&fit=crop&w=600&q=80'
    }
  ];

  private allCatalogBooks: CatalogBook[] = [
    {
      title: 'Deep Work',
      author: 'Cal Newport',
      subject: 'IT',
      genre: 'Productivity',
      year: 2016,
      rating: 4.5,
      format: 'Print',
      summary: 'Strategies for focused success in a distracted world.',
      coverImage: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'The Silent Patient',
      author: 'Alex Michaelides',
      subject: 'Literature',
      genre: 'Thriller',
      year: 2019,
      rating: 4.2,
      format: 'eBook',
      summary: 'A psychological thriller with a gripping twist.',
      coverImage: 'https://images.unsplash.com/photo-1474932430478-367dbb6832c1?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Sapiens',
      author: 'Yuval Noah Harari',
      subject: 'History',
      genre: 'History',
      year: 2015,
      rating: 4.7,
      format: 'Audiobook',
      summary: 'A brief history of humankind from ancient times to today.',
      coverImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'A Brief History of Time',
      author: 'Stephen Hawking',
      subject: 'Science',
      genre: 'Science',
      year: 1988,
      rating: 4.6,
      format: 'Print',
      summary: 'Complex ideas in cosmology explained for curious readers.',
      coverImage: 'https://images.unsplash.com/photo-1455885666463-9fa5128a65c0?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      subject: 'Business',
      genre: 'Finance',
      year: 2020,
      rating: 4.6,
      format: 'eBook',
      summary: 'Timeless lessons about wealth, greed, and happiness.',
      coverImage: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      subject: 'Arts',
      genre: 'Literature',
      year: 1988,
      rating: 4.3,
      format: 'Print',
      summary: 'A poetic journey about following personal legends.',
      coverImage: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Clean Code',
      author: 'Robert C. Martin',
      subject: 'IT',
      genre: 'Technology',
      year: 2008,
      rating: 4.7,
      format: 'eBook',
      summary: 'Best practices for writing readable and maintainable code.',
      coverImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Thinking, Fast and Slow',
      author: 'Daniel Kahneman',
      subject: 'Psychology',
      genre: 'Psychology',
      year: 2011,
      rating: 4.4,
      format: 'Audiobook',
      summary: 'A classic on decision-making and cognitive biases.',
      coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80'
    }
  ];

  private borrowedBooks: BorrowedBook[] = [
    { title: 'The Pragmatic Programmer', author: 'Andrew Hunt', dueDate: new Date('2026-04-28'), status: 'On Time', renewalsLeft: 2 },
    { title: 'Dune', author: 'Frank Herbert', dueDate: new Date('2026-04-18'), status: 'Due Soon', renewalsLeft: 1 },
    { title: 'Becoming', author: 'Michelle Obama', dueDate: new Date('2026-04-10'), status: 'Overdue', renewalsLeft: 0 }
  ];

  getBorrowedBooks(): BorrowedBook[] {
    return this.borrowedBooks.map((book) => ({
      ...book,
      dueDate: new Date(book.dueDate),
      status: this.getStatus(book.dueDate)
    }));
  }

  getFeaturedBooks(): CatalogBook[] {
    return this.featuredBooks.map((book) => ({ ...book }));
  }

  getAllCatalogBooks(): CatalogBook[] {
    return this.allCatalogBooks.map((book) => ({ ...book }));
  }

  addCatalogBook(book: CatalogBook, isFeatured: boolean): void {
    const existsInAll = this.allCatalogBooks.some((existing) => this.sameBook(existing, book));
    if (!existsInAll) {
      this.allCatalogBooks = [book, ...this.allCatalogBooks];
    }

    if (isFeatured) {
      const existsInFeatured = this.featuredBooks.some((existing) => this.sameBook(existing, book));
      if (!existsInFeatured) {
        this.featuredBooks = [book, ...this.featuredBooks];
      }
    }
  }

  removeCatalogBook(book: Pick<CatalogBook, 'title' | 'author'>): void {
    this.allCatalogBooks = this.allCatalogBooks.filter((existing) => !this.sameBook(existing, book));
    this.featuredBooks = this.featuredBooks.filter((existing) => !this.sameBook(existing, book));
    this.borrowedBooks = this.borrowedBooks.filter((existing) => !this.sameBook(existing, book));
  }

  isBorrowed(book: Pick<CatalogBook, 'title' | 'author'>): boolean {
    return this.borrowedBooks.some((borrowed) => borrowed.title === book.title && borrowed.author === book.author);
  }

  borrowBook(book: CatalogBook): boolean {
    if (this.isBorrowed(book)) {
      return false;
    }

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);

    this.borrowedBooks = [
      {
        title: book.title,
        author: book.author,
        dueDate,
        status: this.getStatus(dueDate),
        renewalsLeft: 2
      },
      ...this.borrowedBooks
    ];

    return true;
  }

  returnBook(book: BorrowedBook): void {
    this.borrowedBooks = this.borrowedBooks.filter(
      (borrowed) => !(borrowed.title === book.title && borrowed.author === book.author)
    );
  }

  renewBook(book: BorrowedBook): boolean {
    const index = this.borrowedBooks.findIndex(
      (borrowed) => borrowed.title === book.title && borrowed.author === book.author
    );

    if (index === -1 || this.borrowedBooks[index].renewalsLeft === 0) {
      return false;
    }

    const nextBook = { ...this.borrowedBooks[index] };
    nextBook.renewalsLeft -= 1;
    nextBook.dueDate = new Date(nextBook.dueDate);
    nextBook.dueDate.setDate(nextBook.dueDate.getDate() + 7);
    nextBook.status = this.getStatus(nextBook.dueDate);

    this.borrowedBooks = [
      ...this.borrowedBooks.slice(0, index),
      nextBook,
      ...this.borrowedBooks.slice(index + 1)
    ];

    return true;
  }

  private getStatus(dueDate: Date): BorrowedBook['status'] {
    const now = new Date();
    const due = new Date(dueDate);
    const dayDiff = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (dayDiff < 0) {
      return 'Overdue';
    }

    if (dayDiff <= 3) {
      return 'Due Soon';
    }

    return 'On Time';
  }

  private sameBook(
    left: Pick<CatalogBook, 'title' | 'author'>,
    right: Pick<CatalogBook, 'title' | 'author'>
  ): boolean {
    return left.title.trim().toLowerCase() === right.title.trim().toLowerCase() &&
      left.author.trim().toLowerCase() === right.author.trim().toLowerCase();
  }
}
