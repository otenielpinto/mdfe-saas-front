"use client";

import { useState } from "react";
import MdfeTable from "@/components/mdfe/MdfeTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Download, Filter } from "lucide-react";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

// Dados mock temporários - substituir por chamada API
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

export default function MdfePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  return (
    <div className="space-y-4">
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

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Input placeholder="Buscar MDF-e..." className="pl-8" />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filtros
        </Button>
      </div>

      <div className="rounded-md border">
        <MdfeTable mdfes={mockMdfes} />
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
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
