import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import type { FetchNotesResponse } from "@/lib/api";

export default async function NotesPage() {
  const initialData: FetchNotesResponse = await fetchNotes({
    page: 1,
    perPage: 12,
  });

  return <NotesClient initialData={initialData} />;
}
