"use client";

import { useState, useEffect } from "react";
import MdfeTable from "@/components/mdfe/MdfeTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Plus,
  Download,
  Search,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Filter,
} from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { UF_DATA } from "@/actions/actUF";
import { MdfeSearchForm } from "@/types/MdfeSearchFormTypes";
import { lib } from "@/lib/lib";
import {
  statusOptions,
  tipoEmissaoOptions,
  modalidadeOptions,
} from "@/types/MdfeConversaoTypes";

// Mock data for demonstration
const mockMdfes = [
  {
    id: "1",
    status: "Autorizado",
    createdAt: new Date("2025-05-01"),
    infMDFe: {
      versao: "3.00",
      ide: {
        cUF: 35,
        tpAmb: 1,
        tpEmit: 1,
        tpTransp: 1,
        mod: 58,
        serie: 1,
        nMDF: 12345,
        modal: 1,
        dhEmi: "2025-05-01T00:00:00-03:00",
        tpEmis: 1,
        procEmi: "0",
        verProc: "1.0",
        UFIni: "SP",
        UFFim: "RJ",
        infMunCarrega: [
          {
            cMunCarrega: "3550308",
            xMunCarrega: "São Paulo",
          },
        ],
      },
      emit: {
        CNPJ: "12345678000195",
        IE: "123456789",
        xNome: "Transportadora ABC",
        enderEmit: {
          xLgr: "Rua Exemplo",
          nro: "123",
          xBairro: "Centro",
          cMun: "3550308",
          xMun: "São Paulo",
          CEP: "01001000",
          UF: "SP",
        },
      },
      infModal: {
        versaoModal: "3.00",
        rodo: {
          veicTracao: {
            placa: "ABC1234",
            condutor: [
              {
                xNome: "Motorista Exemplo",
                CPF: "12345678901",
              },
            ],
          },
        },
      },
      infDoc: {
        infMunDescarga: [
          {
            cMunDescarga: "3304557",
            xMunDescarga: "Rio de Janeiro",
          },
        ],
      },
      tot: {
        vCarga: 1000.0,
        cUnid: "KG",
        qCarga: 500.0,
      },
    },
  },
];

/**
 * Gets the default date range (today and 30 days ago)
 */
const getDefaultDateRange = () => {
  const today = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(today.getDate() - 30);

  return {
    periodoEmissaoInicio: lib.formatDateForInput(thirtyDaysAgo),
    periodoEmissaoFim: lib.formatDateForInput(today),
  };
};

export default function MdfePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearchExpanded, setIsSearchExpanded] = useState(true);
  const [searchForm, setSearchForm] = useState<MdfeSearchForm>({
    periodoEmissaoInicio: "",
    periodoEmissaoFim: "",
    serie: "",
    numeroInicial: "",
    numeroFinal: "",
    situacao: "",
    tipoEmissao: "",
    modalidade: "",
    ufCarregamento: "",
    ufDescarregamento: "",
    ufPercurso: "",
    chaveCte: "",
    chaveNfe: "",
  });

  const itemsPerPage = 10;

  // Set default date range on component mount
  useEffect(() => {
    const defaultDates = getDefaultDateRange();
    setSearchForm((prev) => ({
      ...prev,
      periodoEmissaoInicio: defaultDates.periodoEmissaoInicio,
      periodoEmissaoFim: defaultDates.periodoEmissaoFim,
    }));
  }, []);

  // UF options from the existing UF_DATA
  const ufOptions = Array.isArray(UF_DATA) ? UF_DATA : [];

  const handleInputChange = (field: keyof MdfeSearchForm, value: string) => {
    setSearchForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search logic with API call
    console.log("Pesquisando com os filtros:", searchForm);
  };

  const handleNewSearch = () => {
    setSearchForm({
      periodoEmissaoInicio: "",
      periodoEmissaoFim: "",
      serie: "",
      numeroInicial: "",
      numeroFinal: "",
      situacao: "",
      tipoEmissao: "",
      modalidade: "",
      ufCarregamento: "",
      ufDescarregamento: "",
      ufPercurso: "",
      chaveCte: "",
      chaveNfe: "",
    });
  };

  /**
   * Toggles the search form visibility
   */
  const handleToggleSearch = () => {
    setIsSearchExpanded((prev) => !prev);
  };

  /**
   * Checks if search form has any active filters
   */
  const hasActiveFilters = () => {
    return Object.values(searchForm).some((value) => value !== "");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Manifestos de Documentos Fiscais (MDF-e)
        </h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Link href="/mdfe/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo MDF-e
            </Button>
          </Link>
        </div>
      </div>

      {/* Collapsible Search Form */}
      <Collapsible open={isSearchExpanded} onOpenChange={setIsSearchExpanded}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Pesquisa de MDF-e
                  {hasActiveFilters() && (
                    <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {
                        Object.values(searchForm).filter(
                          (value) => value !== ""
                        ).length
                      }{" "}
                      filtros ativos
                    </span>
                  )}
                </CardTitle>
                <CardDescription>
                  Utilize os filtros abaixo para localizar os documentos fiscais
                  desejados
                </CardDescription>
              </div>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-9 p-0"
                  onClick={handleToggleSearch}
                  aria-label={
                    isSearchExpanded ? "Recolher filtros" : "Expandir filtros"
                  }
                >
                  {isSearchExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
          </CardHeader>

          <CollapsibleContent className="transition-all duration-300 ease-in-out">
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-6">
                {/* Period and Series */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="periodoEmissaoInicio">
                      Período Emissão - Início
                    </Label>
                    <Input
                      id="periodoEmissaoInicio"
                      type="date"
                      value={searchForm.periodoEmissaoInicio}
                      onChange={(e) =>
                        handleInputChange(
                          "periodoEmissaoInicio",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="periodoEmissaoFim">
                      Período Emissão - Fim
                    </Label>
                    <Input
                      id="periodoEmissaoFim"
                      type="date"
                      value={searchForm.periodoEmissaoFim}
                      onChange={(e) =>
                        handleInputChange("periodoEmissaoFim", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="serie">Série</Label>
                    <Input
                      id="serie"
                      placeholder="Ex: 1"
                      value={searchForm.serie}
                      onChange={(e) =>
                        handleInputChange("serie", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="numeroInicial">Número Inicial</Label>
                    <Input
                      id="numeroInicial"
                      type="number"
                      placeholder="Ex: 1"
                      value={searchForm.numeroInicial}
                      onChange={(e) =>
                        handleInputChange("numeroInicial", e.target.value)
                      }
                    />
                  </div>
                </div>

                {/* Numbers and Status */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="numeroFinal">Número Final</Label>
                    <Input
                      id="numeroFinal"
                      type="number"
                      placeholder="Ex: 999999"
                      value={searchForm.numeroFinal}
                      onChange={(e) =>
                        handleInputChange("numeroFinal", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="situacao">Situação</Label>
                    <Select
                      value={searchForm.situacao}
                      onValueChange={(value) =>
                        handleInputChange("situacao", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a situação" />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="tipoEmissao">Tipo de Emissão</Label>
                    <Select
                      value={searchForm.tipoEmissao}
                      onValueChange={(value) =>
                        handleInputChange("tipoEmissao", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {tipoEmissaoOptions.map((tipo) => (
                          <SelectItem key={tipo.value} value={tipo.value}>
                            {tipo.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="modalidade">Modalidade</Label>
                    <Select
                      value={searchForm.modalidade}
                      onValueChange={(value) =>
                        handleInputChange("modalidade", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a modalidade" />
                      </SelectTrigger>
                      <SelectContent>
                        {modalidadeOptions.map((modal) => (
                          <SelectItem key={modal.value} value={modal.value}>
                            {modal.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* UF Fields */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="ufCarregamento">UF Carregamento</Label>
                    <Select
                      value={searchForm.ufCarregamento}
                      onValueChange={(value) =>
                        handleInputChange("ufCarregamento", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a UF" />
                      </SelectTrigger>
                      <SelectContent>
                        {ufOptions.map((uf) => (
                          <SelectItem
                            key={`carregamento-${uf.id}`}
                            value={uf.id}
                          >
                            {uf.id} - {uf.descricao}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="ufDescarregamento">
                      UF Descarregamento
                    </Label>
                    <Select
                      value={searchForm.ufDescarregamento}
                      onValueChange={(value) =>
                        handleInputChange("ufDescarregamento", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a UF" />
                      </SelectTrigger>
                      <SelectContent>
                        {ufOptions.map((uf) => (
                          <SelectItem
                            key={`descarregamento-${uf.id}`}
                            value={uf.id}
                          >
                            {uf.id} - {uf.descricao}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="ufPercurso">UF Percurso</Label>
                    <Select
                      value={searchForm.ufPercurso}
                      onValueChange={(value) =>
                        handleInputChange("ufPercurso", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a UF" />
                      </SelectTrigger>
                      <SelectContent>
                        {ufOptions.map((uf) => (
                          <SelectItem key={`percurso-${uf.id}`} value={uf.id}>
                            {uf.id} - {uf.descricao}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Document Keys */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="chaveCte">Chave CT-e</Label>
                    <Input
                      id="chaveCte"
                      placeholder="Chave de acesso do CT-e (44 dígitos)"
                      maxLength={44}
                      value={searchForm.chaveCte}
                      onChange={(e) =>
                        handleInputChange("chaveCte", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="chaveNfe">Chave NF-e</Label>
                    <Input
                      id="chaveNfe"
                      placeholder="Chave de acesso da NF-e (44 dígitos)"
                      maxLength={44}
                      value={searchForm.chaveNfe}
                      onChange={(e) =>
                        handleInputChange("chaveNfe", e.target.value)
                      }
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleNewSearch}
                    className="flex items-center gap-2"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Nova Pesquisa
                  </Button>
                  <Button type="submit" className="flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    Pesquisar
                  </Button>
                </div>
              </form>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Results Table */}
      <div className="rounded-md border">
        <MdfeTable mdfes={mockMdfes} />
      </div>

      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className={
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext onClick={() => setCurrentPage((p) => p + 1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
