export interface ProfileDetail {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  metadatas: MetadataElement[];
}

export interface MetadataElement {
  value: string;
  metadata: MetadataMetadata;
}

export interface MetadataMetadata {
  key: string;
  label: string;
}
