"use server";

import { TMongo } from "@/infra/mongoClient";
import { ObjectId } from "mongodb";
import { Motorista, MotoristaResponse } from "@/types/MotoristaTypes";

/**
 * Get all drivers
 * @returns Response with array of drivers
 */
export async function getAllMotoristas(): Promise<MotoristaResponse> {
  try {
    const { client, clientdb } = await TMongo.connectToDatabase();
    const motoristas = await clientdb
      .collection("motorista")
      .find()
      .toArray();
    await TMongo.mongoDisconnect(client);

    return {
      success: true,
      message: "Motoristas encontrados com sucesso",
      data: motoristas as Motorista[],
    };
  } catch (error) {
    console.error("Erro ao buscar motoristas:", error);
    return {
      success: false,
      message: "Erro ao buscar motoristas",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

/**
 * Get driver by ID
 * @param id Driver ID
 * @returns Response with driver object
 */
export async function getMotoristaById(
  id: number
): Promise<MotoristaResponse> {
  try {
    const { client, clientdb } = await TMongo.connectToDatabase();
    const motorista = await clientdb
      .collection("motorista")
      .findOne({ id: Number(id) });
    await TMongo.mongoDisconnect(client);

    if (!motorista) {
      return {
        success: false,
        message: "Motorista não encontrado",
        data: null,
      };
    }

    return {
      success: true,
      message: "Motorista encontrado com sucesso",
      data: motorista as Motorista,
    };
  } catch (error) {
    console.error(`Erro ao buscar motorista com ID ${id}:`, error);
    return {
      success: false,
      message: "Erro ao buscar motorista",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

/**
 * Get driver by MongoDB ObjectId
 * @param id MongoDB ObjectId
 * @returns Response with driver object
 */
export async function getMotoristaByObjectId(
  id: string
): Promise<MotoristaResponse> {
  try {
    const { client, clientdb } = await TMongo.connectToDatabase();
    const motorista = await clientdb
      .collection("motorista")
      .findOne({ _id: new ObjectId(id) });
    await TMongo.mongoDisconnect(client);

    if (!motorista) {
      return {
        success: false,
        message: "Motorista não encontrado",
        data: null,
      };
    }

    return {
      success: true,
      message: "Motorista encontrado com sucesso",
      data: motorista as Motorista,
    };
  } catch (error) {
    console.error(`Erro ao buscar motorista com ObjectId ${id}:`, error);
    return {
      success: false,
      message: "Erro ao buscar motorista",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

/**
 * Get driver by CPF
 * @param cpf CPF number
 * @returns Response with driver object
 */
export async function getMotoristaByCpf(
  cpf: string
): Promise<MotoristaResponse> {
  try {
    const { client, clientdb } = await TMongo.connectToDatabase();
    const motorista = await clientdb
      .collection("motorista")
      .findOne({ CPF: cpf });
    await TMongo.mongoDisconnect(client);

    if (!motorista) {
      return {
        success: false,
        message: "Motorista não encontrado",
        data: null,
      };
    }

    return {
      success: true,
      message: "Motorista encontrado com sucesso",
      data: motorista as Motorista,
    };
  } catch (error) {
    console.error(`Erro ao buscar motorista com CPF ${cpf}:`, error);
    return {
      success: false,
      message: "Erro ao buscar motorista",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

/**
 * Create a new driver
 * @param data Driver data
 * @returns Response with created driver
 */
export async function createMotorista(
  data: Motorista
): Promise<MotoristaResponse> {
  try {
    const { client, clientdb } = await TMongo.connectToDatabase();

    // Validate required fields
    if (!data.xNome || !data.CPF) {
      await TMongo.mongoDisconnect(client);
      return {
        success: false,
        message: "Nome e CPF são obrigatórios",
        error: "MISSING_REQUIRED_FIELDS",
      };
    }

    // Check if ID already exists
    if (data.id) {
      const existingMotorista = await clientdb
        .collection("motorista")
        .findOne({ id: Number(data.id) });

      if (existingMotorista) {
        await TMongo.mongoDisconnect(client);
        return {
          success: false,
          message: "Já existe um motorista com este ID",
          error: "ID_ALREADY_EXISTS",
        };
      }
    }

    // Check if CPF already exists
    const existingMotorista = await clientdb
      .collection("motorista")
      .findOne({ CPF: data.CPF });

    if (existingMotorista) {
      await TMongo.mongoDisconnect(client);
      return {
        success: false,
        message: "Já existe um motorista com este CPF",
        error: "CPF_ALREADY_EXISTS",
      };
    }

    // Add timestamps
    const dataWithTimestamps = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await clientdb
      .collection("motorista")
      .insertOne(dataWithTimestamps);
    await TMongo.mongoDisconnect(client);

    return {
      success: true,
      message: "Motorista criado com sucesso",
      data: {
        ...dataWithTimestamps,
        _id: result.insertedId,
      } as Motorista,
    };
  } catch (error) {
    console.error("Erro ao criar motorista:", error);
    return {
      success: false,
      message: "Erro ao criar motorista",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

/**
 * Update an existing driver
 * @param id Driver ID
 * @param data Updated driver data
 * @returns Response with update result
 */
export async function updateMotorista(
  id: number,
  data: Partial<Motorista>
): Promise<MotoristaResponse> {
  try {
    const { client, clientdb } = await TMongo.connectToDatabase();

    // Check if driver exists
    const existingMotorista = await clientdb
      .collection("motorista")
      .findOne({ id: Number(id) });

    if (!existingMotorista) {
      await TMongo.mongoDisconnect(client);
      return {
        success: false,
        message: "Motorista não encontrado",
        error: "MOTORISTA_NOT_FOUND",
      };
    }

    // Add updated timestamp
    const dataWithTimestamp = {
      ...data,
      updatedAt: new Date(),
    };

    await clientdb
      .collection("motorista")
      .updateOne({ id: Number(id) }, { $set: dataWithTimestamp });
    await TMongo.mongoDisconnect(client);

    return {
      success: true,
      message: "Motorista atualizado com sucesso",
      data: {
        ...existingMotorista,
        ...dataWithTimestamp,
      } as Motorista,
    };
  } catch (error) {
    console.error(`Erro ao atualizar motorista com ID ${id}:`, error);
    return {
      success: false,
      message: "Erro ao atualizar motorista",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

/**
 * Update a driver by MongoDB ObjectId
 * @param id MongoDB ObjectId
 * @param data Updated driver data
 * @returns Response with update result
 */
export async function updateMotoristaByObjectId(
  id: string,
  data: Partial<Motorista>
): Promise<MotoristaResponse> {
  try {
    const { client, clientdb } = await TMongo.connectToDatabase();

    // Check if driver exists
    const existingMotorista = await clientdb
      .collection("motorista")
      .findOne({ _id: new ObjectId(id) });

    if (!existingMotorista) {
      await TMongo.mongoDisconnect(client);
      return {
        success: false,
        message: "Motorista não encontrado",
        error: "MOTORISTA_NOT_FOUND",
      };
    }

    // Add updated timestamp
    const dataWithTimestamp = {
      ...data,
      updatedAt: new Date(),
    };

    await clientdb
      .collection("motorista")
      .updateOne({ _id: new ObjectId(id) }, { $set: dataWithTimestamp });
    await TMongo.mongoDisconnect(client);

    return {
      success: true,
      message: "Motorista atualizado com sucesso",
      data: {
        ...existingMotorista,
        ...dataWithTimestamp,
      } as Motorista,
    };
  } catch (error) {
    console.error(`Erro ao atualizar motorista com ObjectId ${id}:`, error);
    return {
      success: false,
      message: "Erro ao atualizar motorista",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

/**
 * Delete a driver
 * @param id Driver ID
 * @returns Response with delete result
 */
export async function deleteMotorista(
  id: number
): Promise<MotoristaResponse> {
  try {
    const { client, clientdb } = await TMongo.connectToDatabase();

    // Check if driver exists
    const existingMotorista = await clientdb
      .collection("motorista")
      .findOne({ id: Number(id) });

    if (!existingMotorista) {
      await TMongo.mongoDisconnect(client);
      return {
        success: false,
        message: "Motorista não encontrado",
        error: "MOTORISTA_NOT_FOUND",
      };
    }

    await clientdb.collection("motorista").deleteOne({ id: Number(id) });
    await TMongo.mongoDisconnect(client);

    return {
      success: true,
      message: "Motorista excluído com sucesso",
      data: existingMotorista as Motorista,
    };
  } catch (error) {
    console.error(`Erro ao excluir motorista com ID ${id}:`, error);
    return {
      success: false,
      message: "Erro ao excluir motorista",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

/**
 * Delete a driver by MongoDB ObjectId
 * @param id MongoDB ObjectId
 * @returns Response with delete result
 */
export async function deleteMotoristaByObjectId(
  id: string
): Promise<MotoristaResponse> {
  try {
    const { client, clientdb } = await TMongo.connectToDatabase();

    // Check if driver exists
    const existingMotorista = await clientdb
      .collection("motorista")
      .findOne({ _id: new ObjectId(id) });

    if (!existingMotorista) {
      await TMongo.mongoDisconnect(client);
      return {
        success: false,
        message: "Motorista não encontrado",
        error: "MOTORISTA_NOT_FOUND",
      };
    }

    await clientdb
      .collection("motorista")
      .deleteOne({ _id: new ObjectId(id) });
    await TMongo.mongoDisconnect(client);

    return {
      success: true,
      message: "Motorista excluído com sucesso",
      data: existingMotorista as Motorista,
    };
  } catch (error) {
    console.error(`Erro ao excluir motorista com ObjectId ${id}:`, error);
    return {
      success: false,
      message: "Erro ao excluir motorista",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}