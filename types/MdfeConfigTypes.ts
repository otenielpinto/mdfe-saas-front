export interface MunCarrega {
  cMunCarrega: string;
  xMunCarrega: string;
}

export interface Percurso {
  UFPer: string;
}

export interface MdfeConfigData {
  cUF: string;
  tpAmb: string;
  tpEmit: string;
  tpTransp: string;
  mod: string;
  serie: string;
  modal: string;
  UFIni: string;
  UFFim: string;
  infMunCarrega: MunCarrega[];
  infPercurso: Percurso[];
  // Campos do veículo
  codigoAgregacao: string;
  placaVeiculo: string;
  renavam: string;
  tara: string;
  capacidadeKG: string;
  capacidadeM3: string;
  tpCar: string;
  tpRod: string;
  // Campos do motorista
  xNome: string;
  cpf: string;
}

// Mock data for MDFe
export const mockMdfeData =
  // MDFe data structure
  {
    infMDFe: {
      versao: "string",
      Id: "string",
      ide: {
        cUF: 0,
        tpAmb: 0,
        tpEmit: 0,
        tpTransp: 0,
        mod: 0,
        serie: 999,
        nMDF: 1,
        cMDF: "string",
        cDV: 9,
        modal: 0,
        dhEmi: "2019-08-24T14:15:22Z",
        tpEmis: 0,
        procEmi: "string",
        verProc: "string",
        UFIni: "string",
        UFFim: "string",
        infMunCarrega: [
          {
            cMunCarrega: "string",
            xMunCarrega: "string",
          },
        ],
        infPercurso: [
          {
            UFPer: "string",
          },
        ],
        dhIniViagem: "2019-08-24T14:15:22Z",
        indCanalVerde: 0,
        indCarregaPosterior: 0,
      },
      emit: {
        CNPJ: "string",
        CPF: "string",
        IE: "string",
        xNome: "string",
        xFant: "string",
        enderEmit: {
          xLgr: "string",
          nro: "string",
          xCpl: "string",
          xBairro: "string",
          cMun: "string",
          xMun: "string",
          CEP: "string",
          UF: "string",
          fone: "string",
          email: "string",
        },
      },
      infModal: {
        versaoModal: "string",
        aereo: {
          nac: "stri",
          matr: "string",
          nVoo: "string",
          cAerEmb: "stri",
          cAerDes: "stri",
          dVoo: "2019-08-24",
        },
        rodo: {
          infANTT: {
            RNTRC: "string",
            infCIOT: [
              {
                CIOT: "string",
                CPF: "string",
                CNPJ: "string",
              },
            ],
            valePed: {
              disp: [
                {
                  CNPJForn: "string",
                  CNPJPg: "string",
                  CPFPg: "string",
                  nCompra: "string",
                  vValePed: 0,
                  tpValePed: "string",
                },
              ],
              categCombVeic: "string",
            },
            infContratante: [
              {
                xNome: "string",
                CPF: "string",
                CNPJ: "string",
                idEstrangeiro: "string",
                infContrato: {
                  NroContrato: "string",
                  vContratoGlobal: 0,
                },
              },
            ],
            infPag: [
              {
                xNome: "string",
                CPF: "string",
                CNPJ: "string",
                idEstrangeiro: "string",
                Comp: [
                  {
                    tpComp: "string",
                    vComp: 0,
                    xComp: "string",
                  },
                ],
                vContrato: 0,
                indAltoDesemp: 0,
                indPag: 0,
                vAdiant: 0,
                indAntecipaAdiant: 0,
                infPrazo: [
                  {
                    nParcela: 999,
                    dVenc: "2019-08-24",
                    vParcela: 0,
                  },
                ],
                tpAntecip: 0,
                infBanc: {
                  codBanco: "strin",
                  codAgencia: "string",
                  CNPJIPEF: "string",
                  PIX: "string",
                },
              },
            ],
          },
          veicTracao: {
            cInt: "string",
            placa: "string",
            RENAVAM: "stringstr",
            tara: 999999,
            capKG: 999999,
            capM3: 999,
            prop: {
              CPF: "string",
              CNPJ: "string",
              RNTRC: "string",
              xNome: "string",
              IE: "string",
              UF: "string",
              tpProp: 0,
            },
            condutor: [
              {
                xNome: "string",
                cpf: "string",
              },
            ],
            tpRod: "string",
            tpCar: "string",
            UF: "string",
          },
          veicReboque: [
            {
              cInt: "string",
              placa: "string",
              RENAVAM: "stringstr",
              tara: 999999,
              capKG: 999999,
              capM3: 999,
              prop: {
                CPF: "string",
                CNPJ: "string",
                RNTRC: "string",
                xNome: "string",
                IE: "string",
                UF: "string",
                tpProp: 0,
              },
              tpCar: "string",
              UF: "string",
            },
          ],
          codAgPorto: "string",
          lacRodo: [
            {
              nLacre: "string",
            },
          ],
        },
        aquav: {
          irin: "string",
          tpEmb: "string",
          cEmbar: "string",
          xEmbar: "string",
          nViag: "string",
          cPrtEmb: "strin",
          cPrtDest: "strin",
          prtTrans: "string",
          tpNav: 0,
          infTermCarreg: [
            {
              cTermCarreg: "string",
              xTermCarreg: "string",
            },
          ],
          infTermDescarreg: [
            {
              cTermDescarreg: "string",
              xTermDescarreg: "string",
            },
          ],
          infEmbComb: [
            {
              cEmbComb: "string",
              xBalsa: "string",
            },
          ],
          infUnidCargaVazia: [
            {
              idUnidCargaVazia: "string",
              tpUnidCargaVazia: 0,
            },
          ],
          infUnidTranspVazia: [
            {
              idUnidTranspVazia: "string",
              tpUnidTranspVazia: 0,
            },
          ],
        },
        ferrov: {
          trem: {
            xPref: "string",
            dhTrem: "2019-08-24T14:15:22Z",
            xOri: "str",
            xDest: "str",
            qVag: 1,
          },
          vag: [
            {
              pesoBC: 0,
              pesoR: 0,
              tpVag: "str",
              serie: "str",
              nVag: 1,
              nSeq: 1,
              TU: 0,
            },
          ],
        },
      },
      infDoc: {
        infMunDescarga: [
          {
            cMunDescarga: "string",
            xMunDescarga: "string",
            infCTe: [
              {
                chCTe: "string",
                SegCodBarra: "string",
                indReentrega: 0,
                infUnidTransp: [
                  {
                    tpUnidTransp: 0,
                    idUnidTransp: "string",
                    lacUnidTransp: [null],
                    infUnidCarga: [null],
                    qtdRat: 0,
                  },
                ],
                peri: [
                  {
                    nONU: "string",
                    xNomeAE: "string",
                    xClaRisco: "string",
                    grEmb: "string",
                    qTotProd: "string",
                    qVolTipo: "string",
                  },
                ],
                infEntregaParcial: {
                  qtdTotal: 0,
                  qtdParcial: 0,
                },
              },
            ],
            infNFe: [
              {
                chNFe: "string",
                SegCodBarra: "string",
                indReentrega: 0,
                infUnidTransp: [
                  {
                    tpUnidTransp: 0,
                    idUnidTransp: "string",
                    lacUnidTransp: [null],
                    infUnidCarga: [null],
                    qtdRat: 0,
                  },
                ],
                peri: [
                  {
                    nONU: "string",
                    xNomeAE: "string",
                    xClaRisco: "string",
                    grEmb: "string",
                    qTotProd: "string",
                    qVolTipo: "string",
                  },
                ],
              },
            ],
            infMDFeTransp: [
              {
                chMDFe: "string",
                indReentrega: 0,
                infUnidTransp: [
                  {
                    tpUnidTransp: 0,
                    idUnidTransp: "string",
                    lacUnidTransp: [null],
                    infUnidCarga: [null],
                    qtdRat: 0,
                  },
                ],
                peri: [
                  {
                    nONU: "string",
                    xNomeAE: "string",
                    xClaRisco: "string",
                    grEmb: "string",
                    qTotProd: "string",
                    qVolTipo: "string",
                  },
                ],
              },
            ],
          },
        ],
      },
      seg: [
        {
          infResp: {
            respSeg: 0,
            CNPJ: "string",
            CPF: "string",
          },
          infSeg: {
            xSeg: "string",
            CNPJ: "string",
          },
          nApol: "string",
          nAver: ["string"],
        },
      ],
      prodPred: {
        tpCarga: "string",
        xProd: "string",
        cEAN: "string",
        NCM: "string",
        infLotacao: {
          infLocalCarrega: {
            CEP: "string",
            latitude: "string",
            longitude: "string",
          },
          infLocalDescarrega: {
            CEP: "string",
            latitude: "string",
            longitude: "string",
          },
        },
      },
      tot: {
        qCTe: 999999,
        qNFe: 999999,
        qMDFe: 999999,
        vCarga: 0,
        cUnid: "string",
        qCarga: 0,
      },
      lacres: [
        {
          nLacre: "string",
        },
      ],
      autXML: [
        {
          CNPJ: "string",
          CPF: "string",
        },
      ],
      infAdic: {
        infAdFisco: "string",
        infCpl: "string",
      },
      infRespTec: {
        CNPJ: "string",
        xContato: "string",
        email: "string",
        fone: "string",
        idCSRT: 999,
        CSRT: "string",
        hashCSRT: "string",
      },
      infSolicNFF: {
        xSolic: "string",
      },
    },
    infMDFeSupl: {
      qrCodMDFe: "stringstringstringstringstringstringstringstringst",
    },
    ambiente: "homologacao",
    referencia: "string",
  };

// Interface for conductor data
export interface Condutor {
  xNome: string;
  cpf: string;
}

// Interface for form data
export interface MdfeRodoviarioFormData {
  codigoAgregacao: string;
  placaVeiculo: string;
  renavam: string;
  tara: string;
  capacidadeKG: string;
  capacidadeM3: string;
  tpCar: string;
  tpRod: string;
  condutores: Condutor[];
}
