import { Mdfe } from "@/types/MdfeTypes";

/**
 * Converte os dados do formulário de carga e veículo para o formato esperado pelo MDF-e
 */
export function adaptarDadosCargaVeiculo(formData: any): Partial<Mdfe> {
  // Extrai os estados de percurso separados por vírgula
  const estadosPercurso = formData.estadosPercurso
    ? formData.estadosPercurso
        .split(",")
        .map((estado: string) => estado.trim())
        .filter((estado: string) => estado.length > 0)
    : [];

  return {
    infMDFe: {
      infModal: {
        versaoModal: "3.00",
        rodo: {
          infANTT: {
            RNTRC: formData.RNTRC || "",
            ...(formData.CIOT
              ? {
                  infCIOT: [
                    {
                      CIOT: formData.CIOT,
                    },
                  ],
                }
              : {}),
          },
          veicTracao: {
            placa: formData.placa,
            ...(formData.codInternoVeiculo
              ? { cInt: formData.codInternoVeiculo }
              : {}),
            tara: parseInt(formData.taraKG) || 0,
            condutor: [
              {
                xNome: formData.xNome,
                cpf: formData.cpf,
              },
            ],
            UF: formData.UF,
            // Propriedades adicionais específicas do tipo de veículo podem ser adicionadas aqui
          },
        },
      },
      ide: {
        // Inclui informações de carregamento e percurso
        UFIni: formData.estadoCarregamento,
        UFFim: formData.estadoDescarregamento,
        infMunCarrega: [
          {
            cMunCarrega: "", // Código IBGE será preenchido depois
            xMunCarrega: formData.cidadeCarregamento,
          },
        ],
        ...(estadosPercurso.length > 0
          ? {
              infPercurso: estadosPercurso.map((uf: string) => ({
                UFPer: uf,
              })),
            }
          : {}),
      },
      infDoc: {
        infMunDescarga: [
          {
            cMunDescarga: "", // Código IBGE será preenchido depois
            xMunDescarga: formData.cidadeDescarregamento,
            // As notas fiscais seriam adicionadas aqui com infNFe ou infCTe
          },
        ],
      },
      tot: {
        vCarga: parseFloat(formData.valorTotalCarga) || 0,
        cUnid: formData.unidadeMedida,
        qCarga: parseFloat(formData.pesoBrutoTotal) || 0,
      },
    },
  };
}

/**
 * Mescla os dados parciais do MDF-e em um objeto único
 */
export function combinarDadosMdfe(
  dadosEmitente: any,
  dadosCargaVeiculo: any
  // Adicione outros objetos de dados do formulário conforme necessário
): Partial<Mdfe> {
  // Aqui a lógica para combinar todos os objetos parciais do MDF-e
  // Este é um exemplo simples que apenas combina os objetos usando spread operator
  return {
    ...dadosEmitente,
    ...dadosCargaVeiculo,
    // Adicione outros dados conforme necessário
  };
}
