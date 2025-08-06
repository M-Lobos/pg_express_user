import { Usuario } from "../models/Usuario.model.js";

export const createUsers = async (req, res) => {
  try {
    const user = await Usuario.create(req.body);

    res.status(201).json({
      message: "Usuario creado con éxito",
      status: 201,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "error al crear el usuario",
      status: 500,
    });
  }
};

export const findAll = async (req, res) => {
  try {
    const user = await Usuario.findAllActive();

    res.status(201).json({
      message: "Usuarios activos encontrados con éxito",
      status: 201,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "error al encontrar el usuarios activos",
      status: 500,
    });
  }
};
