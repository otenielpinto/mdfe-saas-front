import { Metadata } from "next";
import EmitentesTable from "@/components/mdfe/EmitentesTable";

interface EmitentesEmpresaPageProps {
  params: {
    id: string;
  };
}

export function generateMetadata({ params }: EmitentesEmpresaPageProps): Metadata {
  return {
    title: `Emitentes MDF-e - Empresa ${params.id}`,
    description: `Listagem de emitentes para Manifesto Eletrônico de Documentos Fiscais da empresa ${params.id}`,
  };
}

export default function EmitentesEmpresaPage({ params }: EmitentesEmpresaPageProps) {
  const empresaId = parseInt(params.id, 10);
  
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Emitentes MDF-e - Empresa {empresaId}</h1>
        <p className="text-muted-foreground">
          Emitentes para Manifestos Eletrônicos de Documentos Fiscais da empresa {empresaId}
        </p>
      </div>
      
      <EmitentesTable empresaId={empresaId} />
    </div>
  );
}
