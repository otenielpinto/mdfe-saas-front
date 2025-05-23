"use server";

import { TMongo } from "@/infra/mongoClient";
import { ObjectId } from "mongodb";
import { Mdfe, MdfeResponse } from "@/types/MdfeTypes";

/**
 * Get all MDFe
 * @returns Response with array of MDFe
 */
export async function getAllMdfe(): Promise<MdfeResponse> {
  try {
    const { client, clientdb } = await TMongo.connectToDatabase();
    const mdfes = await clientdb
      .collection("mdfe")
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    await TMongo.mongoDisconnect(client);

    return {
      success: true,
      message: "MDFes encontrados com sucesso",
      data: mdfes as unknown as Mdfe[],
    };
  } catch (error) {
    console.error("Erro ao buscar MDFes:", error);
    return {
      success: false,
      message: "Erro ao buscar MDFes",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

/**
 * Get MDFe by ID
 * @param id MDFe ID
 * @returns Response with MDFe object
 */
export async function getMdfeById(id: number): Promise<MdfeResponse> {
  try {
    const { client, clientdb } = await TMongo.connectToDatabase();
    const mdfe = await clientdb.collection("mdfe").findOne({ id: Number(id) });
    await TMongo.mongoDisconnect(client);

    if (!mdfe) {
      return {
        success: false,
        message: "MDFe não encontrado",
        data: null,
      };
    }

    return {
      success: true,
      message: "MDFe encontrado com sucesso",
      data: mdfe as unknown as Mdfe,
    };
  } catch (error) {
    console.error(`Erro ao buscar MDFe com ID ${id}:`, error);
    return {
      success: false,
      message: "Erro ao buscar MDFe",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

/**
 * Get MDFe by MongoDB ObjectId
 * @param id MongoDB ObjectId
 * @returns Response with MDFe object
 */
export async function getMdfeByObjectId(id: string): Promise<MdfeResponse> {
  try {
    const { client, clientdb } = await TMongo.connectToDatabase();
    const mdfe = await clientdb
      .collection("mdfe")
      .findOne({ _id: new ObjectId(id) });
    await TMongo.mongoDisconnect(client);

    if (!mdfe) {
      return {
        success: false,
        message: "MDFe não encontrado",
        data: null,
      };
    }

    return {
      success: true,
      message: "MDFe encontrado com sucesso",
      data: mdfe as unknown as Mdfe,
    };
  } catch (error) {
    console.error(`Erro ao buscar MDFe com ObjectId ${id}:`, error);
    return {
      success: false,
      message: "Erro ao buscar MDFe",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

/**
 * Get MDFe by chave (access key)
 * @param chave MDFe access key
 * @returns Response with MDFe object
 */
export async function getMdfeByChave(chave: string): Promise<MdfeResponse> {
  try {
    const { client, clientdb } = await TMongo.connectToDatabase();
    const mdfe = await clientdb.collection("mdfe").findOne({ chave });
    await TMongo.mongoDisconnect(client);

    if (!mdfe) {
      return {
        success: false,
        message: "MDFe não encontrado",
        data: null,
      };
    }

    return {
      success: true,
      message: "MDFe encontrado com sucesso",
      data: mdfe as unknown as Mdfe,
    };
  } catch (error) {
    console.error(`Erro ao buscar MDFe com chave ${chave}:`, error);
    return {
      success: false,
      message: "Erro ao buscar MDFe",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

/**
 * Create a new MDFe
 * @param data MDFe data
 * @returns Response with created MDFe
 */
export async function createMdfe(data: Mdfe): Promise<MdfeResponse> {
  try {
    const { client, clientdb } = await TMongo.connectToDatabase();

    // Add timestamps
    const dataWithTimestamps = {
      ...data,
      status: "CRIADO",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await clientdb
      .collection("mdfe")
      .insertOne(dataWithTimestamps);
    await TMongo.mongoDisconnect(client);

    return {
      success: true,
      message: "MDFe criado com sucesso",
      data: {
        ...dataWithTimestamps,
        _id: result.insertedId,
      } as unknown as Mdfe,
    };
  } catch (error) {
    console.error("Erro ao criar MDFe:", error);
    return {
      success: false,
      message: "Erro ao criar MDFe",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

/**
 * Update an existing MDFe
 * @param id MDFe ID
 * @param data Updated MDFe data
 * @returns Response with update result
 */
export async function updateMdfe(
  id: number,
  data: Partial<Mdfe>
): Promise<MdfeResponse> {
  try {
    const { client, clientdb } = await TMongo.connectToDatabase();

    // Check if MDFe exists
    const existingMdfe = await clientdb
      .collection("mdfe")
      .findOne({ id: Number(id) });

    if (!existingMdfe) {
      await TMongo.mongoDisconnect(client);
      return {
        success: false,
        message: "MDFe não encontrado",
        error: "MDFE_NOT_FOUND",
      };
    }

    // Add updated timestamp
    const dataWithTimestamp = {
      ...data,
      updatedAt: new Date(),
    };

    await clientdb
      .collection("mdfe")
      .updateOne({ id: Number(id) }, { $set: dataWithTimestamp });
    await TMongo.mongoDisconnect(client);

    return {
      success: true,
      message: "MDFe atualizado com sucesso",
      data: {
        ...existingMdfe,
        ...dataWithTimestamp,
      } as unknown as Mdfe,
    };
  } catch (error) {
    console.error(`Erro ao atualizar MDFe com ID ${id}:`, error);
    return {
      success: false,
      message: "Erro ao atualizar MDFe",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

/**
 * Update MDFe by MongoDB ObjectId
 * @param id MongoDB ObjectId
 * @param data Updated MDFe data
 * @returns Response with update result
 */
export async function updateMdfeByObjectId(
  id: string,
  data: Partial<Mdfe>
): Promise<MdfeResponse> {
  try {
    const { client, clientdb } = await TMongo.connectToDatabase();

    // Check if MDFe exists
    const existingMdfe = await clientdb
      .collection("mdfe")
      .findOne({ _id: new ObjectId(id) });

    if (!existingMdfe) {
      await TMongo.mongoDisconnect(client);
      return {
        success: false,
        message: "MDFe não encontrado",
        error: "MDFE_NOT_FOUND",
      };
    }

    // Add updated timestamp
    const dataWithTimestamp = {
      ...data,
      updatedAt: new Date(),
    };

    await clientdb
      .collection("mdfe")
      .updateOne({ _id: new ObjectId(id) }, { $set: dataWithTimestamp });
    await TMongo.mongoDisconnect(client);

    return {
      success: true,
      message: "MDFe atualizado com sucesso",
      data: {
        ...existingMdfe,
        ...dataWithTimestamp,
      } as unknown as Mdfe,
    };
  } catch (error) {
    console.error(`Erro ao atualizar MDFe com ObjectId ${id}:`, error);
    return {
      success: false,
      message: "Erro ao atualizar MDFe",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

/**
 * Delete MDFe
 * @param id MDFe ID
 * @returns Response with delete result
 */
export async function deleteMdfe(id: number): Promise<MdfeResponse> {
  try {
    const { client, clientdb } = await TMongo.connectToDatabase();

    // Check if MDFe exists
    const existingMdfe = await clientdb
      .collection("mdfe")
      .findOne({ id: Number(id) });

    if (!existingMdfe) {
      await TMongo.mongoDisconnect(client);
      return {
        success: false,
        message: "MDFe não encontrado",
        error: "MDFE_NOT_FOUND",
      };
    }

    await clientdb.collection("mdfe").deleteOne({ id: Number(id) });
    await TMongo.mongoDisconnect(client);

    return {
      success: true,
      message: "MDFe excluído com sucesso",
      data: existingMdfe as unknown as Mdfe,
    };
  } catch (error) {
    console.error(`Erro ao excluir MDFe com ID ${id}:`, error);
    return {
      success: false,
      message: "Erro ao excluir MDFe",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

/**
 * Delete MDFe by MongoDB ObjectId
 * @param id MongoDB ObjectId
 * @returns Response with delete result
 */
export async function deleteMdfeByObjectId(id: string): Promise<MdfeResponse> {
  try {
    const { client, clientdb } = await TMongo.connectToDatabase();

    // Check if MDFe exists
    const existingMdfe = await clientdb
      .collection("mdfe")
      .findOne({ _id: new ObjectId(id) });

    if (!existingMdfe) {
      await TMongo.mongoDisconnect(client);
      return {
        success: false,
        message: "MDFe não encontrado",
        error: "MDFE_NOT_FOUND",
      };
    }

    await clientdb.collection("mdfe").deleteOne({ _id: new ObjectId(id) });
    await TMongo.mongoDisconnect(client);

    return {
      success: true,
      message: "MDFe excluído com sucesso",
      data: existingMdfe as unknown as Mdfe,
    };
  } catch (error) {
    console.error(`Erro ao excluir MDFe com ObjectId ${id}:`, error);
    return {
      success: false,
      message: "Erro ao excluir MDFe",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

/**
 * Get MDFe's by company ID
 * @param empresaId Company ID
 * @returns Response with array of MDFe
 */
export async function getMdfesByEmpresa(
  empresaId: number
): Promise<MdfeResponse> {
  try {
    const { client, clientdb } = await TMongo.connectToDatabase();
    const mdfes = await clientdb
      .collection("mdfe")
      .find({ empresa: Number(empresaId) })
      .sort({ createdAt: -1 })
      .toArray();
    await TMongo.mongoDisconnect(client);

    return {
      success: true,
      message: "MDFes encontrados com sucesso",
      data: mdfes as unknown as Mdfe[],
    };
  } catch (error) {
    console.error(`Erro ao buscar MDFes da empresa ${empresaId}:`, error);
    return {
      success: false,
      message: "Erro ao buscar MDFes",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

/**
 * Update MDFe status
 * @param id MDFe ID or ObjectId
 * @param status New status
 * @returns Response with update result
 */
export async function updateMdfeStatus(
  id: string | number,
  status: string
): Promise<MdfeResponse> {
  try {
    const { client, clientdb } = await TMongo.connectToDatabase();
    let filter;

    if (typeof id === "number") {
      filter = { id: Number(id) };
    } else {
      filter = { _id: new ObjectId(id) };
    }

    // Check if MDFe exists
    const existingMdfe = await clientdb.collection("mdfe").findOne(filter);

    if (!existingMdfe) {
      await TMongo.mongoDisconnect(client);
      return {
        success: false,
        message: "MDFe não encontrado",
        error: "MDFE_NOT_FOUND",
      };
    }

    await clientdb.collection("mdfe").updateOne(filter, {
      $set: {
        status,
        updatedAt: new Date(),
      },
    });

    await TMongo.mongoDisconnect(client);

    return {
      success: true,
      message: "Status do MDFe atualizado com sucesso",
      data: {
        ...existingMdfe,
        status,
        updatedAt: new Date(),
      } as unknown as Mdfe,
    };
  } catch (error) {
    console.error(`Erro ao atualizar status do MDFe ${id}:`, error);
    return {
      success: false,
      message: "Erro ao atualizar status do MDFe",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}
