export interface Character {
  name: string;
  characterClass: string;
  level: number;
  userId: string;
  strength: number;
  life: number;
}

export interface CharacterCreateInput {
  name: string;
  characterClass: string;
  userId: string;
  strength: number;
  life: number;
}

export interface CharacterUpdateInput {
  name: string;
  characterClass: string;
  level: number;
  userId: string;
  strength: number;
  life: number;
}
