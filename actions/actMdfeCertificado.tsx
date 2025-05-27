"use server";

import { TMongo } from "@/infra/mongoClient";
import { ObjectId } from "mongodb";
import {
  MdfeCertificado,
  MdfeCertificadoResponse,
} from "@/types/MdfeCertificadoTypes";

/**
 * Get all MDF-e certificates
 * @returns Response with array of MDF-e certificates
 */
export async function getAllMdfeCertificados(): Promise<MdfeCertificadoResponse> {
  try {
    const { client, clientdb } = await TMongo.connectToDatabase();
    const certificados = await clientdb
      .collection("mdfe_certificado")
      .find()
      .toArray();
    await TMongo.mongoDisconnect(client);

    // Don't return the binary data in the list view
    const certificadosSemArquivo = certificados.map((cert) => {
      const { arquivo_stream, ...certSemArquivo } = cert;
      return certSemArquivo;
    });

    return {
      success: true,
      message: "Certificados encontrados com sucesso",
      data: certificadosSemArquivo as MdfeCertificado[],
    };
  } catch (error) {
    console.error("Erro ao buscar certificados:", error);
    return {
      success: false,
      message: "Erro ao buscar certificados",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

/**
 * Get MDF-e certificate by ID
 * @param id Certificate ID
 * @returns Response with MDF-e certificate object
 */
export async function getMdfeCertificadoById(
  id: number
): Promise<MdfeCertificadoResponse> {
  try {
    const { client, clientdb } = await TMongo.connectToDatabase();
    const certificado = await clientdb
      .collection("mdfe_certificado")
      .findOne({ id: Number(id) });
    await TMongo.mongoDisconnect(client);

    if (!certificado) {
      return {
        success: false,
        message: "Certificado não encontrado",
        data: null,
      };
    }

    return {
      success: true,
      message: "Certificado encontrado com sucesso",
      data: certificado as MdfeCertificado,
    };
  } catch (error) {
    console.error(`Erro ao buscar certificado com ID ${id}:`, error);
    return {
      success: false,
      message: "Erro ao buscar certificado",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

/**
 * Get MDF-e certificate by MongoDB ObjectId
 * @param id MongoDB ObjectId
 * @returns Response with MDF-e certificate object
 */
export async function getMdfeCertificadoByObjectId(
  id: string
): Promise<MdfeCertificadoResponse> {
  try {
    const { client, clientdb } = await TMongo.connectToDatabase();
    const certificado = await clientdb
      .collection("mdfe_certificado")
      .findOne({ _id: new ObjectId(id) });
    await TMongo.mongoDisconnect(client);

    if (!certificado) {
      return {
        success: false,
        message: "Certificado não encontrado",
        data: null,
      };
    }

    // Serialize MongoDB document for Client Components
    const serializedCertificado = {
      ...certificado,
      _id: certificado._id.toString(),
    };

    return {
      success: true,
      message: "Certificado encontrado com sucesso",
      data: serializedCertificado as MdfeCertificado,
    };
  } catch (error) {
    console.error(`Erro ao buscar certificado com ObjectId ${id}:`, error);
    return {
      success: false,
      message: "Erro ao buscar certificado",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

/**
 * Get MDF-e certificate by CNPJ/CPF
 * @param cpfcnpj CNPJ/CPF number
 * @returns Response with MDF-e certificate object
 */
export async function getMdfeCertificadoByCpfCnpj(
  cpfcnpj: string
): Promise<MdfeCertificadoResponse> {
  try {
    const { client, clientdb } = await TMongo.connectToDatabase();
    const certificado = await clientdb
      .collection("mdfe_certificado")
      .findOne({ cpfcnpj });
    await TMongo.mongoDisconnect(client);

    if (!certificado) {
      return {
        success: false,
        message: "Certificado não encontrado",
        data: null,
      };
    }

    return {
      success: true,
      message: "Certificado encontrado com sucesso",
      data: certificado as MdfeCertificado,
    };
  } catch (error) {
    console.error(`Erro ao buscar certificado com CNPJ/CPF ${cpfcnpj}:`, error);
    return {
      success: false,
      message: "Erro ao buscar certificado",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

/**
 * Create a new MDF-e certificate
 * @param data Certificate data
 * @returns Response with created MDF-e certificate
 */
export async function createMdfeCertificado(
  data: MdfeCertificado
): Promise<MdfeCertificadoResponse> {
  try {
    const { client, clientdb } = await TMongo.connectToDatabase();

    // Check if ID already exists
    if (data.id) {
      const existingCertificado = await clientdb
        .collection("mdfe_certificado")
        .findOne({ id: Number(data.id) });

      if (existingCertificado) {
        await TMongo.mongoDisconnect(client);
        return {
          success: false,
          message: "Já existe um certificado com este ID",
          error: "ID_ALREADY_EXISTS",
        };
      }
    }

    // Check if CNPJ/CPF already exists
    if (data.cpfcnpj) {
      const existingCertificado = await clientdb
        .collection("mdfe_certificado")
        .findOne({ cpfcnpj: data.cpfcnpj });

      if (existingCertificado) {
        await TMongo.mongoDisconnect(client);
        return {
          success: false,
          message: "Já existe um certificado para este CNPJ/CPF",
          error: "CNPJ_ALREADY_EXISTS",
        };
      }
    }

    // Add timestamps
    const dataWithTimestamps = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await clientdb
      .collection("mdfe_certificado")
      .insertOne(dataWithTimestamps);
    await TMongo.mongoDisconnect(client);

    return {
      success: true,
      message: "Certificado criado com sucesso",
      data: {
        ...dataWithTimestamps,
        _id: result.insertedId,
      } as MdfeCertificado,
    };
  } catch (error) {
    console.error("Erro ao criar certificado:", error);
    return {
      success: false,
      message: "Erro ao criar certificado",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

/**
 * Update an existing MDF-e certificate
 * @param id Certificate ID
 * @param data Updated certificate data
 * @returns Response with update result
 */
export async function updateMdfeCertificado(
  id: number,
  data: Partial<MdfeCertificado>
): Promise<MdfeCertificadoResponse> {
  try {
    const { client, clientdb } = await TMongo.connectToDatabase();

    // Check if certificate exists
    const existingCertificado = await clientdb
      .collection("mdfe_certificado")
      .findOne({ id: Number(id) });

    if (!existingCertificado) {
      await TMongo.mongoDisconnect(client);
      return {
        success: false,
        message: "Certificado não encontrado",
        error: "CERTIFICADO_NOT_FOUND",
      };
    }

    // Add updated timestamp
    const dataWithTimestamp = {
      ...data,
      updatedAt: new Date(),
    };

    await clientdb
      .collection("mdfe_certificado")
      .updateOne({ id: Number(id) }, { $set: dataWithTimestamp });
    await TMongo.mongoDisconnect(client);

    return {
      success: true,
      message: "Certificado atualizado com sucesso",
      data: {
        ...existingCertificado,
        ...dataWithTimestamp,
      } as MdfeCertificado,
    };
  } catch (error) {
    console.error(`Erro ao atualizar certificado com ID ${id}:`, error);
    return {
      success: false,
      message: "Erro ao atualizar certificado",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

/**
 * Update an MDF-e certificate by MongoDB ObjectId
 * @param id MongoDB ObjectId
 * @param data Updated certificate data
 * @returns Response with update result
 */
export async function updateMdfeCertificadoByObjectId(
  id: string,
  data: Partial<MdfeCertificado>
): Promise<MdfeCertificadoResponse> {
  try {
    const { client, clientdb } = await TMongo.connectToDatabase();

    // Check if certificate exists
    const existingCertificado = await clientdb
      .collection("mdfe_certificado")
      .findOne({ _id: new ObjectId(id) });

    if (!existingCertificado) {
      await TMongo.mongoDisconnect(client);
      return {
        success: false,
        message: "Certificado não encontrado",
        error: "CERTIFICADO_NOT_FOUND",
      };
    }

    // Add updated timestamp
    const dataWithTimestamp = {
      ...data,
      updatedAt: new Date(),
    };

    await clientdb
      .collection("mdfe_certificado")
      .updateOne({ _id: new ObjectId(id) }, { $set: dataWithTimestamp });
    await TMongo.mongoDisconnect(client);

    return {
      success: true,
      message: "Certificado atualizado com sucesso",
      data: {
        ...existingCertificado,
        ...dataWithTimestamp,
      } as MdfeCertificado,
    };
  } catch (error) {
    console.error(`Erro ao atualizar certificado com ObjectId ${id}:`, error);
    return {
      success: false,
      message: "Erro ao atualizar certificado",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

/**
 * Delete an MDF-e certificate
 * @param id Certificate ID
 * @returns Response with delete result
 */
export async function deleteMdfeCertificado(
  id: number
): Promise<MdfeCertificadoResponse> {
  try {
    const { client, clientdb } = await TMongo.connectToDatabase();

    // Check if certificate exists
    const existingCertificado = await clientdb
      .collection("mdfe_certificado")
      .findOne({ id: Number(id) });

    if (!existingCertificado) {
      await TMongo.mongoDisconnect(client);
      return {
        success: false,
        message: "Certificado não encontrado",
        error: "CERTIFICADO_NOT_FOUND",
      };
    }

    await clientdb.collection("mdfe_certificado").deleteOne({ id: Number(id) });
    await TMongo.mongoDisconnect(client);

    return {
      success: true,
      message: "Certificado excluído com sucesso",
      data: existingCertificado as MdfeCertificado,
    };
  } catch (error) {
    console.error(`Erro ao excluir certificado com ID ${id}:`, error);
    return {
      success: false,
      message: "Erro ao excluir certificado",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

/**
 * Delete an MDF-e certificate by MongoDB ObjectId
 * @param id MongoDB ObjectId
 * @returns Response with delete result
 */
export async function deleteMdfeCertificadoByObjectId(
  id: string
): Promise<MdfeCertificadoResponse> {
  try {
    const { client, clientdb } = await TMongo.connectToDatabase();

    // Check if certificate exists
    const existingCertificado = await clientdb
      .collection("mdfe_certificado")
      .findOne({ _id: new ObjectId(id) });

    if (!existingCertificado) {
      await TMongo.mongoDisconnect(client);
      return {
        success: false,
        message: "Certificado não encontrado",
        error: "CERTIFICADO_NOT_FOUND",
      };
    }

    await clientdb
      .collection("mdfe_certificado")
      .deleteOne({ _id: new ObjectId(id) });
    await TMongo.mongoDisconnect(client);

    return {
      success: true,
      message: "Certificado excluído com sucesso",
      data: existingCertificado as MdfeCertificado,
    };
  } catch (error) {
    console.error(`Erro ao excluir certificado com ObjectId ${id}:`, error);
    return {
      success: false,
      message: "Erro ao excluir certificado",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}
