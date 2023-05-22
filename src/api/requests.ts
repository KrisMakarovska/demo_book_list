import { Book, PatchBook, Status } from '../types/Book';
import { client } from './fetchClient';

export const getBooks = () => {
  return client.get<Book[]>('/books');
};

export const addBook = (newBook: Book) => {
  return client.post<Book>('/books', newBook);
};

export const deleteBook = (bookId: number) => {
  return client.delete(`/books/${bookId}`);
};

export const editBook = (bookId: number, editData: PatchBook | Status) => {
  return client.patch(`/books/${bookId}`, editData);
};