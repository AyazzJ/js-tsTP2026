export type Meal = {
  id: number;
  name: string;
  calories: number;
  price: number;
};

// Utility Type 2: Partial
// Pratique si un jour on veut créer/modifier un repas étape par étape
export type MealDraft = Partial<Meal>;


export async function fetchMeals(): Promise<Meal[]> {
  try {
    const response = await fetch("https://keligmartin.github.io/api/meals.json");

    if (!response.ok) {
      throw new Error("Erreur HTTP : " + response.status);
    }

    const meals: Meal[] = await response.json();
    return meals;
  } catch (error) {
    console.error("Erreur lors du chargement des repas");
    return [];
  }
}
