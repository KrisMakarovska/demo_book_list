import { useState } from "react";
import { Book } from "../types/Book";

export function useLocalStorage(key: string, initialValue: Book[]) {
  const [value, setValue] = useState(() => {
      const item = localStorage.getItem(key);
      if (item) {
        return JSON.parse(item);
      }
    return initialValue;
  });

  const save = (value: Book) => {
    setValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [value, save];
}
