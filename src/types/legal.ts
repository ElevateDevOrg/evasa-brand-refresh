export type LegalSectionName = "Legislation" | "Affidavits";

export interface LegalDocument {
  title: string;
  url: string; // public URL under /legal
  ext: string; // file extension, e.g. pdf, docx, xlsx
  bytes?: number;
  mtime?: string; // ISO string
}

export interface LegalCategory {
  section: LegalSectionName;
  name: string; // e.g., Financial Services, EME Affidavits
  key: string; // slug/identifier
  displayName?: string; // optional friendly name for display
  documents: LegalDocument[];
}

export interface LegalManifest {
  updatedAt: string; // ISO string
  categories: LegalCategory[];
}


