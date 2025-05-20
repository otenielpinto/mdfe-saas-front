import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MdfeDocumentosFormProps {
  onSubmit: (data: any) => void;
}

interface Documento {
  chave: string;
  segCodBarra: string;
  indReentrega: boolean;
  pesoTotal: string;
  valor: string;
  municipioCarregamento: string;
  municipioDescarregamento: string;
}

export function MdfeDocumentosForm({ onSubmit }: MdfeDocumentosFormProps) {
  const [activeTab, setActiveTab] = useState("nfe");
  const [documentos, setDocumentos] = useState<{
    nfe: Documento[];
    cte: Documento[];
    mdf: Documento[];
  }>({
    nfe: [],
    cte: [],
    mdf: [],
  });

  const [novoDocumento, setNovoDocumento] = useState<Documento>({
    chave: "",
    segCodBarra: "",
    indReentrega: false,
    pesoTotal: "",
    valor: "",
    municipioCarregamento: "",
    municipioDescarregamento: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNovoDocumento((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddDocumento = () => {
    if (novoDocumento.chave && novoDocumento.chave.length === 44) {
      setDocumentos((prev) => ({
        ...prev,
        [activeTab]: [
          ...prev[activeTab as keyof typeof documentos],
          { ...novoDocumento },
        ],
      }));

      setNovoDocumento({
        chave: "",
        segCodBarra: "",
        indReentrega: false,
        pesoTotal: "",
        valor: "",
        municipioCarregamento: "",
        municipioDescarregamento: "",
      });
    }
  };

  const handleRemoveDocumento = (index: number) => {
    setDocumentos((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab as keyof typeof documentos].filter(
        (_, i) => i !== index
      ),
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(documentos);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações dos Documentos</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="nfe">NF-e</TabsTrigger>
                <TabsTrigger value="cte">CT-e</TabsTrigger>
                <TabsTrigger value="mdf">MDF-e</TabsTrigger>
              </TabsList>

              <TabsContent value="nfe" className="space-y-6">
                <div className="grid grid-cols-6 gap-4">
                  <div className="col-span-3">
                    <Label htmlFor="chave">* Chave da NF-e</Label>
                    <Input
                      id="chave"
                      name="chave"
                      value={novoDocumento.chave}
                      onChange={handleChange}
                      placeholder="Informe a chave da NF-e (44 dígitos)"
                      maxLength={44}
                    />
                  </div>
                  <div>
                    <Label htmlFor="segCodBarra">Cód. Barras</Label>
                    <Input
                      id="segCodBarra"
                      name="segCodBarra"
                      value={novoDocumento.segCodBarra}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex items-end">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="indReentrega"
                        name="indReentrega"
                        checked={novoDocumento.indReentrega}
                        onChange={handleChange}
                      />
                      <Label htmlFor="indReentrega">Reentrega</Label>
                    </div>
                  </div>
                  <div className="flex items-end">
                    <Button type="button" onClick={handleAddDocumento}>
                      + Adicionar
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="pesoTotal">Peso (Kg)</Label>
                    <Input
                      id="pesoTotal"
                      name="pesoTotal"
                      value={novoDocumento.pesoTotal}
                      onChange={handleChange}
                      placeholder="0,00"
                      type="number"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <Label htmlFor="valor">Valor</Label>
                    <Input
                      id="valor"
                      name="valor"
                      value={novoDocumento.valor}
                      onChange={handleChange}
                      placeholder="0,00"
                      type="number"
                      step="0.01"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="municipioCarregamento">
                      Município de Carregamento
                    </Label>
                    <Input
                      id="municipioCarregamento"
                      name="municipioCarregamento"
                      value={novoDocumento.municipioCarregamento}
                      onChange={handleChange}
                      placeholder="Nome do município"
                    />
                  </div>
                  <div>
                    <Label htmlFor="municipioDescarregamento">
                      Município de Descarregamento
                    </Label>
                    <Input
                      id="municipioDescarregamento"
                      name="municipioDescarregamento"
                      value={novoDocumento.municipioDescarregamento}
                      onChange={handleChange}
                      placeholder="Nome do município"
                    />
                  </div>
                </div>

                {documentos.nfe.length > 0 ? (
                  <div className="border rounded-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Chave
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Peso
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Valor
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ações
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {documentos.nfe.map((doc, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {doc.chave}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {doc.pesoTotal}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {doc.valor}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Button
                                type="button"
                                variant="ghost"
                                className="text-red-600 hover:text-red-900"
                                onClick={() => handleRemoveDocumento(index)}
                              >
                                Remover
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-4 border rounded-md">
                    <p className="text-center text-muted-foreground">
                      Nenhuma NF-e adicionada
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="cte" className="space-y-6">
                {/* Similar structure as NF-e tab but for CT-e documents */}
                <div className="p-4 border rounded-md">
                  <p className="text-center text-muted-foreground">
                    Nenhum CT-e adicionado
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="mdf" className="space-y-6">
                {/* Similar structure as NF-e tab but for MDF-e documents */}
                <div className="p-4 border rounded-md">
                  <p className="text-center text-muted-foreground">
                    Nenhum MDF-e adicionado
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button type="submit">Continuar</Button>
      </div>
    </form>
  );
}
