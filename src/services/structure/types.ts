export interface Structure {
  type: string;
  level: number;
  image: string;
  description: string;
}

export type StructureCreateInput = {
  type: string;
  level: number;
  image: string;
  description: string;
};

export type StructureUpdateInput = {
  type: string;
  level: number;
  image: string;
  description: string;
};
