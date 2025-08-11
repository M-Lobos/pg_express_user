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

      const createQuery = `INSERT INTO usuarios (
        id, 
        name, 
        lastname, 
        email, 
        phone, 
        birth_date, 
        budget, 
        active) 
      VALUES (
        $1, 
        $2, 
        $3, 
        $4, 
        $5, 
        $6, 
        $7, 
        $8) 
      RETURNING *`;

      const values = [
        id,
        name,
        lastname,
        email,
        phone,
        birth_date,
        budget,
        active,
      ];

      const { rows } = await query(createQuery, values);
      
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

  static async findActiveById(id) {
    try {
      const findQuery = `SELECT * FROM usuarios WHERE id = $1 AND active = $2`;
      const value = [id, true];

      const { rows } = await query(findQuery, value);

      if (rows.length <= 0) throw new Error("No udimos encontrar el ID");

      return rows;
    } catch (error) {
      console.error("error al encontrar al usuario", error.message);
      throw new Error(`error al encontrar usuario por id: ${id}`);
    }
  }

  static async updateUsuario(id, data) {
    try {
      const { name, lastname, email, phone, birth_date, budget } = data;

      const updateQuery = `
        UPDATE usuarios 
        SET 
          name = $1,
          lastname = $2, 
          email = $3, 
          phone = $4, 
          birth_date= $5,
          budget= $6 
        
        WHERE id = $7 AND active = true 
        RETURNING * ; `;

      const values = [name, lastname, email, phone, birth_date, budget, id];

      const { rows } = await query(updateQuery, values);

      if (rows.length === 0) throw new Error("No se encuentra el ID");

      return rows[0];
    } catch (error) {
      console.error("error al actualizar al usuario por id", error.message);
      throw new Error(`error al encontrar usuario por id: ${id}`);
    }
  }

  static async permaDelete(id) {
    try {
      const deleteQuery = `DELETE FROM usuarios WHERE id = $1 AND active = true`;
      const value = [id];

      await query(deleteQuery, value);
    } catch (error) {
      console.error("error al eliminar  al usuario por id", error.message);
      throw new Error(`error al eliminar usuario por id: ${id}`);
    }
  }

  static async softDelete(id) {
    try {
      const softDeleteQuery = `UPDATE usuarios SET active = false WHERE id=$1 AND active = true RETURNING *`;
      const value = [id];

      const { rows } = await query(softDeleteQuery, value);
      if (rows.length === 0) throw new Error("No se encuentra el ID");

      return rows[0];
    } catch (error) {
      console.error("error al eliminar  al usuario por id", error.message);
      throw new Error(`error al eliminar usuario por id: ${id}`);
    }
  }
}
