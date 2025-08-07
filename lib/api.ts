import axios from "axios";
import type { Note, CreateNoteParams } from "@/types/note";


const BASE_URL = "https://notehub-public.goit.study/api";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    
  },
});


export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}


export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}


export async function fetchNotes(
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> {
  const cleanedParams: FetchNotesParams = { ...params };

  if (!params.search?.trim()) {
    delete cleanedParams.search;
  }

  const response = await instance.get<FetchNotesResponse>("/notes", {
    params: cleanedParams,
  });

  return response.data;
}


export async function createNote(data: CreateNoteParams): Promise<Note> {
  const response = await instance.post<Note>("/notes", data);
  return response.data;
}


export async function deleteNote(id: string): Promise<Note> {
  const response = await instance.delete<Note>(`/notes/${id}`);
  return response.data;
}


export async function fetchNoteById(id: string): Promise<Note> {
  const response = await instance.get<Note>(`/notes/${id}`);
  return response.data;
}

