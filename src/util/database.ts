import mysql from 'mysql2/promise';
import type { Recipe } from '../types';

const pool = mysql.createPool({
    host: process.env.DB_HOST, // Your Cloud SQL instance's IP address
    user: process.env.DB_USER,         // Your database user
    password: process.env.DB_PASS, // Your database password
    database: process.env.DB_NAME, // Your database name
    port: 3306, // The default MySQL port
  });
  
  // Example: Test the connection
  export async function testConnection() {
    try {
      const connection = await pool.getConnection();
      console.log('Connected to the database!');
      connection.release();
    } catch (error) {
      console.error('Database connection failed:', (error as Error).message);
    }
  }
  
  // Call the test function to verify the connection
  testConnection();

export async function addRecipe(recipe: Recipe) {
    const { ingredients, instructions } = recipe;
  
    const [result] = await pool.execute<mysql.ResultSetHeader>(
      'INSERT INTO recipes (ingredients, instructions) VALUES (?, ?)',
      [JSON.stringify(ingredients), JSON.stringify(instructions)]
    );
  
    console.log('Recipe added with ID:', (result as mysql.ResultSetHeader).insertId);
    return result.insertId; // Return the new recipe ID
  }

  export async function getRecipes() {
    try {
      const [rows] = await pool.execute('SELECT * FROM recipes');
    
      const recipes = (rows as mysql.RowDataPacket[]).map((row) => {
        try {
          return {
            id: row.id,
            ingredients: JSON.parse(row.ingredients), // Parse ingredients JSON
            instructions: JSON.parse(row.instructions), // Parse instructions JSON
          };
        } catch (error) {
          console.error(`Error parsing JSON for recipe ID ${row.id}:`, (error as Error).message);
          return {
            id: row.id,
            ingredients: row.ingredients, // Return raw data if parsing fails
            instructions: row.instructions,
          };
        }
      });
    
      return recipes;
    } catch (error) {
      console.error('Error fetching recipes:', (error as Error).message);
      throw error;
    }
  }
