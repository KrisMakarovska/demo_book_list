import { format, utcToZonedTime } from "date-fns-tz";
import { Book } from "../types/Book";

export const convertToFormattedTime = (utcCreatedAt: string) => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const localCreatedAt = utcToZonedTime(new Date(utcCreatedAt), timezone);
  const formattedCreatedAt = format(localCreatedAt, "d MMMM yyyy, h:mma");
  return formattedCreatedAt;
};

export const formatBookTimeData = (book: Book) => {
  const formattedCreatedAt = convertToFormattedTime(book.createdAt);
  if (book.modifiedAt !== "--") {
    const formattedModifiedAt = convertToFormattedTime(book.modifiedAt);
    return {
      ...book,
      modifiedAt: formattedModifiedAt,
      createdAt: formattedCreatedAt,
    };
  }
  return { ...book, createdAt: formattedCreatedAt };
};
