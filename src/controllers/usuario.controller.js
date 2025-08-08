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

export const findById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Usuario.findActiveById(id);

    /*   */

    res.status(200).json({
      message: `usuario de id ${id} encontrado con éxito`,
      status: 200,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: `error al encontrar el usuarios de id: ${id}`,
      status: 500,
      error,
    });
  }
};

export const updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const userUpdated = await Usuario.updateUsuario(id, data);

    res.status(200).json({
      message: "Usuario actualizado con éxito",
      status: 200,
      data: userUpdated,
    });
  } catch (error) {
    res.status(500).json({
      message: `error al acualizar el usuarios de id: ${id}`,
      status: 500,
      error,
    });
  }
};
