export type Book = {
  id: number;
  name: string;
  author: string;
  category: string;
  isbn: string;
  createdAt: string;
  modifiedAt: string;
  deactivated: boolean;
};

export type PatchBook = {
  name: string;
  author: string;
  category: string;
  isbn: string;
  modifiedAt: string;
};

export type Status = {
  deactivated: boolean;
};
