import { createContext } from "react";
import { Book } from "../types/Book";

export interface SharedData {
  booksFromServer: Book[],
  booksFiltered: Book[],
  filter: string,
  setFilter: (filter: string) => void,
  popupAction: string,
  setPopupAction: (filter: string) => void,
  showPopup: boolean,
  setShowPopup: (status: boolean) => void,
}

const defaultSharedData: SharedData = {
  booksFromServer: [],
  booksFiltered: [],
  filter: '',
  setFilter: () => undefined,
  popupAction: '',
  setPopupAction: () => undefined,
  showPopup: false,
  setShowPopup: () => undefined
};

export const SharedDataContext = createContext<SharedData>(defaultSharedData)