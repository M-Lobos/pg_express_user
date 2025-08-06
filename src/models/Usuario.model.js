import { v4 as uuidv4 } from "uuid";
import { query } from "../config/db.config.js";

export class Usuario {
  constructor(name, lastname, email, phone, birth_date, budget) {
    this.id = uuidv4();
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.phone = phone;
    this.birth_date = birth_date;
    this.budget = budget;
    this.active = true;
  }

  static async create(data) {
    try {
      const { name, lastname, email, phone, birth_date, budget } = data;

      const id = uuidv4();
      const active = true;

      const { rows } = await query(
        "INSERT INTO usuarios (id, name, lastname, email, phone, birth_date, budget, active) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
        [id, name, lastname, email, phone, birth_date, budget, active]
      );
      return rows;
    } catch (error) {
      console.error("error al crear el usuario", error.message);
      throw new Error(`error al crear el usuario ${error}`);
    }
  }

  static async findAllActive() {
    try {
      const findQuery = `SELECT * FROM usuarios WHERE active = $1`;
      const value = [true];

      const { rows } = await query(findQuery, value);

      return rows;
    } catch (error) {
      console.error("error al encontrar usuarios activos", error.message);
      throw new Error(`error al encontrar usuarios activos ${error}`);
    }
  }
}
