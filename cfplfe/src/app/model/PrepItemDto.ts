export interface PrepItemDto {
  category: string; // e.g., "CANAPE", "PASSED BOWL", "SALADS"
  foodItem: string; // e.g., "SPICY TUNA", "FRIED POLENTA CAKE"
  component: string; // e.g., "GOCHUJANG AIOLI", "CRISPY RICE"
  process: string; // Full prep instructions
  quantity?: string; // Optional, if present
  packout?: string; // Optional, if present
  
}
