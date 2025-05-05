import { Metadata } from "next";
import { notFound } from "next/navigation";
import EmitenteView from "@/components/mdfe/EmitenteView";
import { getMdfeEmitenteById, getMdfeEmitenteByObjectId } from "@/actions/actMdfeEmitente";
import { isValidObjectId } from "@/lib/utils";

interface EmitenteViewPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: EmitenteViewPageProps): Promise<Metadata> {
  // Try to fetch the emitente to get the name for the title
  let emitenteName = "Detalhes do Emitente";
  
  try {
    let response;
    if (isValidObjectId(params.id)) {
      response = await getMdfeEmitenteByObjectId(params.id);
    } else {
      response = await getMdfeEmitenteById(Number(params.id));
    }
    
    if (response.success && response.data) {
      emitenteName = response.data.razao_social || "Detalhes do Emitente";
    }
  } catch (error) {
    console.error("Error fetching emitente for metadata:", error);
  }
  
  return {
    title: `${emitenteName} - MDF-e`,
    description: "Visualização detalhada do emitente MDF-e",
  };
}

export default async function EmitenteViewPage({ params }: EmitenteViewPageProps) {
  const { id } = params;
  
  // Fetch emitente data
  let response;
  try {
    if (isValidObjectId(id)) {
      response = await getMdfeEmitenteByObjectId(id);
    } else {
      response = await getMdfeEmitenteById(Number(id));
    }
  } catch (error) {
    console.error("Error fetching emitente:", error);
    notFound();
  }
  
  if (!response.success || !response.data) {
    notFound();
  }
  
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{response.data.razao_social}</h1>
        <p className="text-muted-foreground">
          Visualização detalhada do emitente MDF-e
        </p>
      </div>
      
      <EmitenteView emitente={response.data} />
    </div>
  );
}
