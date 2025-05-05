/**
 * MDF-e Certificado type definition
 * Based on the MDFE_CERTIFICADO table structure
 */
export interface MdfeCertificado {
  _id?: any; // MongoDB ObjectId
  id?: number;
  cpfcnpj?: string;
  arquivo_stream?: Buffer | string; // Binary data for certificate file
  senha?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * MDF-e Certificado response type for database operations
 */
export interface MdfeCertificadoResponse {
  success: boolean;
  message: string;
  data?: MdfeCertificado | MdfeCertificado[] | null;
  error?: string;
}
