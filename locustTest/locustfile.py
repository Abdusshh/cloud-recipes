import random
from locust import HttpUser, task, between

# Define sample data for ingredients and recipes
INGREDIENTS_LIST = [
    "chicken, rice, garlic",
    "beef, potatoes, carrots",
    "fish, lemon, dill",
    "tofu, soy sauce, broccoli",
    "pasta, tomatoes, basil",
    "eggs, cheese, spinach",
    "pork, apples, onions",
    "shrimp, butter, garlic",
]

INSTRUCTIONS_LIST = [
    "Step 1: Mix all ingredients.\nStep 2: Cook for 20 minutes.",
    "Step 1: Preheat oven.\nStep 2: Bake at 180°C for 30 minutes.",
    "Step 1: Boil water.\nStep 2: Add ingredients and simmer.",
    "Step 1: Chop vegetables.\nStep 2: Stir fry in oil for 15 minutes.",
    "Step 1: Season meat.\nStep 2: Grill until cooked through.",
]


class WebsiteTestUser(HttpUser):
    wait_time = between(1, 3)  # Simulate users waiting 1-3 seconds between tasks

    @task
    def load_homepage(self):
        """Test the GET request for the homepage"""
        self.client.get("/")

    @task
    def load_recipes(self):
        """Test the GET request for the /recipes endpoint"""
        self.client.get("/api/recipes")

    @task
    def load_generate_page(self):
        """Test the GET request for the generate page"""
        self.client.get("/generate")

    @task
    def generate_recipe(self):
        """Test the POST request for the /generate-recipe endpoint"""
        payload = {"ingredients": random.choice(INGREDIENTS_LIST)}
        self.client.post("/api/generate-recipe", json=payload)

    @task
    def save_recipe(self):
        """Test the POST request for saving a recipe"""
        recipe = {
            "title": f"Random Recipe {random.randint(1, 100)}",
            "ingredients": random.choice(INGREDIENTS_LIST).split(", "),
            "instructions": random.choice(INSTRUCTIONS_LIST).split("\n"),
        }
        self.client.post("/api/recipes", json=recipe)
