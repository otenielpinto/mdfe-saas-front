// Base response interface
export interface MdfeResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

// Status enum for better type safety
export enum MdfeStatus {
  CRIADO = "CRIADO",
  DIGITADO = "DIGITADO",
  PROCESSANDO = "PROCESSANDO",
  AUTORIZADO = "AUTORIZADO",
  REJEITADO = "REJEITADO",
  CANCELADO = "CANCELADO",
  ENCERRADO = "ENCERRADO",
}

// Modal types
export enum ModalType {
  RODOVIARIO = "1",
  AEREO = "2",
  AQUAVIARIO = "3",
  FERROVIARIO = "4",
}

// Emission environment
export enum TipoAmbiente {
  PRODUCAO = "1",
  HOMOLOGACAO = "2",
}

// Emission type
export enum TipoEmissao {
  NORMAL = "1",
  CONTINGENCIA = "2",
}

// Main MDFe document interface reflecting the actual MongoDB structure
export interface MdfeDocument {
  _id?: string;
  id: string;
  dt_movto: Date;

  // Main data section
  dados: {
    cUF: string;
    tpEmit: string;
    tpTransp: string;
    tpAmb: TipoAmbiente;
    tpEmis: TipoEmissao;
    mod: string;
    serie: string;
    numero: string;
    cMDF: string;
    cDV: string;
    dhEmi: string;
    tpModal: ModalType;
    ufIni: string;
    ufFim: string;
    dhIniViagem?: string;
    indCanalVerde: boolean;
    indCarregaPosterior: boolean;
    infMunCarrega: Array<{
      cMunCarrega: string;
      xMunCarrega: string;
    }>;
    infPercurso: string;
  };

  // Road transport specific data
  rodoviario: {
    codigoAgregacao?: string;
    placaVeiculo: string;
    renavam?: string;
    tara?: string;
    capacidadeKG?: string;
    capacidadeM3?: string;
    tpCar: string;
    tpRod: string;
    condutores: Array<{
      xNome: string;
      cpf: string;
    }>;
  };

  // Documents information
  informacoes_dos_documentos: {
    nfe: Array<{
      chave: string;
      segCodBarra?: string;
      indReentrega: boolean;
      pesoTotal: string;
      valor: string;
      municipioCarregamento: string;
      municipioDescarregamento: string;
    }>;
    cte: Array<{
      chave: string;
      segCodBarra?: string;
      indReentrega: boolean;
      pesoTotal: string;
      valor: string;
      municipioCarregamento: string;
      municipioDescarregamento: string;
    }>;
    mdf: Array<{
      chave: string;
      segCodBarra?: string;
      indReentrega: boolean;
      pesoTotal: string;
      valor: string;
      municipioCarregamento: string;
      municipioDescarregamento: string;
    }>;
  };

  // Totals
  totalizadores: {
    qCTe: string;
    qNFe: string;
    qMDFe: string;
    vCarga: string;
    cUnid: string;
    qCarga: string;
  };

  // Additional information
  informacoes_adicionais: {
    infAdFisco?: string;
    infCpl?: string;
  };

  // Reference data
  referencia: Record<string, any>;

  // Status and keys
  status: MdfeStatus;
  qrCodMDFe?: string;
  chave?: string;

  // Emitter information
  emitente: {
    CNPJ: string;
    IE: string;
    xNome: string;
    xFant?: string;
    enderEmit: {
      xLgr: string;
      nro: string;
      xCpl?: string;
      xBairro: string;
      cMun: string;
      xMun: string;
      CEP: string;
      UF: string;
      fone?: string;
      email?: string;
    };
  };

  // Waterway transport data
  aquaviario: {
    irin?: string;
    nomeEmbarcacao?: string;
    codigoEmbarcacao?: string;
    balsa: Array<any>;
  };

  // Metadata
  createdAt: Date;
  updatedAt: Date;
  id_tenant: number;
  id_empresa: number;
}

// Legacy interface for backward compatibility
export interface MdfeEnvio {
  _id?: any;
  id?: string;
  empresa?: number;
  chave?: string;
  infMDFe: {
    versao: string;
    Id?: string;
    ide: {
      cUF: number;
      tpAmb: number;
      tpEmit: number;
      tpTransp: number;
      mod: number;
      serie: number;
      nMDF: number;
      cMDF?: string;
      cDV?: number;
      modal: number;
      dhEmi: string;
      tpEmis: number;
      procEmi: string;
      verProc: string;
      UFIni: string;
      UFFim: string;
      infMunCarrega: {
        cMunCarrega: string;
        xMunCarrega: string;
      }[];
      infPercurso?: {
        UFPer: string;
      }[];
      dhIniViagem?: string;
      indCanalVerde?: number;
      indCarregaPosterior?: number;
    };
    emit: {
      CNPJ?: string;
      CPF?: string;
      IE: string;
      xNome: string;
      xFant?: string;
      enderEmit: {
        xLgr: string;
        nro: string;
        xCpl?: string;
        xBairro: string;
        cMun: string;
        xMun: string;
        CEP: string;
        UF: string;
        fone?: string;
        email?: string;
      };
    };
    infModal: {
      versaoModal: string;
      rodo?: {
        infANTT?: {
          RNTRC: string;
          infCIOT?: {
            CIOT: string;
            CPF?: string;
            CNPJ?: string;
          }[];
        };
        veicTracao: {
          placa: string;
          RENAVAM?: string;
          tara?: number;
          condutor: {
            xNome: string;
            cpf: string;
          }[];
          UF?: string;
        };
        veicReboque?: {
          placa: string;
          RENAVAM?: string;
          tara?: number;
          UF?: string;
        }[];
      };
    };
    infDoc: {
      infMunDescarga: {
        cMunDescarga: string;
        xMunDescarga: string;
        infCTe?: {
          chCTe: string;
        }[];
        infNFe?: {
          chNFe: string;
        }[];
      }[];
    };
    tot: {
      qCTe?: number;
      qNFe?: number;
      qMDFe?: number;
      vCarga: number;
      cUnid: string;
      qCarga: number;
    };
    infAdic?: {
      infAdFisco?: string;
      infCpl?: string;
    };
  };
  infMDFeSupl?: {
    qrCodMDFe?: string;
  };
  ambiente: string;
  referencia?: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
