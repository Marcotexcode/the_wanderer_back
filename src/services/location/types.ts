export interface Location {
  id: string;
  name: string;
  x: number;
  y: number;
  type: string;
  fontSize: number;
  population: number;
  mainProduct: string;
  image: string;
  description: string;
}

export interface LocationCreateInput {
  name: string;
  x: number;
  y: number;
  type: string;
  fontSize: number;
  population: number;
  mainProduct: string;
  image: string;
  description: string;
}

export interface LocationUpdateInput {
  id?: string;
  name?: string;
  x?: number;
  y?: number;
  type?: string;
  fontSize?: number;
  population?: number;
  mainProduct?: string;
  image?: string;
  description?: string;
}
