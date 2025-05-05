export interface MdfeResponse {
  success: boolean;
  message: string;
  data?: Mdfe | Mdfe[] | null;
  error?: string;
}

export interface Mdfe {
  _id?: any;
  id?: number;
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
            CPF: string;
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
  ambiente: "homologacao" | "producao";
  referencia?: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
