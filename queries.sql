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
