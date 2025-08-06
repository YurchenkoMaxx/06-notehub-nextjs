import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";
import styles from "./NotePage.module.css";
import { notFound } from "next/navigation";

type NotePageProps = {
  params: Promise<{ id: string }>; // 👈 це важливо!
};

export default async function NotePage(props: NotePageProps) {
  const { id } = await props.params; // 👈 чекаємо на params

  try {
    const note: Note = await fetchNoteById(id);

    return (
      <div className={styles.container}>
        <h1 className={styles.title}>{note.title}</h1>
        <p className={styles.content}>{note.content}</p>
        <p className={styles.tag}>
          Tag: <strong>{note.tag}</strong>
        </p>
        <p className={styles.meta}>
          Created: {new Date(note.createdAt).toLocaleString()}
          <br />
          Updated: {new Date(note.updatedAt).toLocaleString()}
        </p>
      </div>
    );
  } catch {
    return notFound();
  }
}
