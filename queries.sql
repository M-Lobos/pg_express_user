-- 1. Elimina la tabla si ya existe
DROP TABLE IF EXISTS usuarios;

-- 2. Habilita extensión para generar UUID v4
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 3. Crea tabla con las columnas requeridas
CREATE TABLE usuarios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  phone VARCHAR(20),
  birth_date DATE,
  budget NUMERIC(12, 2),
  active BOOLEAN DEFAULT true,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Revisión de columnas creadas / posterior creación de datos
SELECT * FROM usuarios;

--5.- QUERIES EN MODELO PARA POOL DE CONEXIÓN __________________________________________________________________________

-- Definición de modelos de Entidad con métodos dentro

export class ModeloEntidad {
  constructor(col1, col2,..., coln) {
    this.id = uuidv4();
    this.col1 = col1;
    this.col2 = col2;
          ...
    this.coln = coln;
    this.active = true;
  }

  static async create(data) {
    try {
      const { col1, col2,..., coln} = data;
      const id = uuidv4();
      const active = true;

      const createQuery = `INSERT INTO nombre_Tabla (
        id, 
        col1,
        col2,
        ...
        coln,
        active) 
      VALUES (
        $1, 
        $2, 
        $3, 
        ... 
        $n, 
        $n+1 
      RETURNING *`;

      const values = [id, col1, col2,..., coln, active];

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


