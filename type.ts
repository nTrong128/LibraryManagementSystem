type Author = {
  id: number;
  authorName: string;
  website: string;
  note: string;
  numberOfBooks: number;
};

export type {Author};
type Category = {
  id: number;
  categoryName: string;
  numberOfBooks: number;
};
export type {Category};

type Publisher = {
  id: number;
  publisherName: string;
  address: string;
  email: string;
  representativeInfo: string;
  numberOfBooks: number;
};
export type {Publisher};

type Book = {
  id: number;
  bookName: string;
  publicationYear: number;
  author: Author;
  category: Category;
  publisher: Publisher;
};

export type {Book};

type Reader = {
  id: number;
  readerName: string;
  address: string;
  libraryCard: null | LibraryCard;
};
export type {Reader};

type LibraryCard = {
  id: number;
  cardNumber: number;
  startDate: Date;
  expirationDate: Date;
  note: string;
};

export type {LibraryCard};

type Employee = {
  id: number;
  fullName: string;
  birthDate: Date;
  phoneNumber: string;
};

export type {Employee};

type CheckOut = {
  id: number;
  libraryCard: LibraryCard;
  employee: Employee;
  checkoutDate: string;
};

export type {CheckOut};
