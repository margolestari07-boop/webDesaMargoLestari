export interface VillageProfileContent {
  description: string | null;
  vision: string | null;
  mission: readonly string[];
  photoUrl: string | null;
}

export const villageProfileContent: VillageProfileContent = {
  description: null,
  vision: null,
  mission: [],
  photoUrl: null,
};
