import { create } from 'zustand';
import { DocumentStoreProps } from './types';

export const useDocumentStore = create<DocumentStoreProps>((set) => ({
  document: [],
  setDocument: (document) => set((state) => ({ document: [...state.document, document] }))
}));
