import { useState, useEffect } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { UF_DATA } from "@/actions/actUF";

interface MdfeDadosFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
}

export function MdfeDadosForm({ onSubmit, initialData }: MdfeDadosFormProps) {
  const [formData, setFormData] = useState({
    cUF: "", // Código da UF do emitente do Documento Fiscal
    tpEmit: "1",
    tpTransp: "1", // Tipo do Transportador
    tpAmb: "2",
    tpEmis: "1",
    mod: "58",
    serie: "1",
    numero: "", // equivalente a nMDF no schema
    cMDF: "", // Tipo do Documento Fiscal
    cDV: "", // Dígito Verificador
    dhEmi: new Date().toISOString().split("T")[0],
    tpModal: "1", // equivalente a modal no schema
    ufIni: "", // equivalente a UFIni no schema
    ufFim: "", // equivalente a UFFim no schema
    dhIniViagem: "", // Data e hora previstas de início da Viagem
    indCanalVerde: false, // Indicador de participação do Canal Verde
    indCarregaPosterior: false,
    infMunCarrega: [{ cMunCarrega: "", xMunCarrega: "" }],
    infPercurso: "",
  });

  // Atualizar formData quando initialData mudar
  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
      }));
    }
  }, [initialData]);

  // Ensure UF_DATA is an array with fallback
  const ufList = Array.isArray(UF_DATA) ? UF_DATA : [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Dados</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="cUF">Código da UF do Emitente</Label>
              <Select
                name="cUF"
                value={formData.cUF}
                onValueChange={(value) => handleSelectChange("cUF", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a UF" />
                </SelectTrigger>
                <SelectContent>
                  {ufList.map((uf) => (
                    <SelectItem
                      key={uf.codigoIbge}
                      value={uf.codigoIbge.toString() || ""}
                    >
                      {uf.id}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="tpEmit">Tipo de Emitente</Label>
              <Select
                name="tpEmit"
                value={formData.tpEmit}
                onValueChange={(value) => handleSelectChange("tpEmit", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">
                    Prestador de Serviço de Transporte
                  </SelectItem>
                  <SelectItem value="2">
                    Transportador de Carga Própria
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="tpTransp">Tipo do Transportador</Label>
              <Select
                name="tpTransp"
                value={formData.tpTransp}
                onValueChange={(value) => handleSelectChange("tpTransp", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">ETC</SelectItem>
                  <SelectItem value="2">TAC</SelectItem>
                  <SelectItem value="3">CTC</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="tpAmb">Ambiente</Label>
              <Select
                name="tpAmb"
                value={formData.tpAmb}
                onValueChange={(value) => handleSelectChange("tpAmb", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o ambiente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Produção</SelectItem>
                  <SelectItem value="2">Homologação</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="tpEmis">Tipo de Emissão</Label>
              <Select
                name="tpEmis"
                value={formData.tpEmis}
                onValueChange={(value) => handleSelectChange("tpEmis", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Normal</SelectItem>
                  <SelectItem value="2">Contingência</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="mod">Modelo</Label>
              <Input
                id="mod"
                name="mod"
                value={formData.mod}
                onChange={handleChange}
                disabled
              />
            </div>
            <div>
              <Label htmlFor="serie">Série</Label>
              <Input
                id="serie"
                name="serie"
                value={formData.serie}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="numero">Número</Label>
              <Input
                id="numero"
                name="numero"
                value={formData.numero}
                onChange={handleChange}
                placeholder="Número do MDF-e"
              />
            </div>
            <div>
              <Label htmlFor="cMDF">Tipo do Documento Fiscal</Label>
              <Input
                id="cMDF"
                name="cMDF"
                value={formData.cMDF}
                onChange={handleChange}
                placeholder="Tipo do Documento Fiscal"
              />
            </div>
            <div>
              <Label htmlFor="cDV">Dígito Verificador</Label>
              <Input
                id="cDV"
                name="cDV"
                value={formData.cDV}
                onChange={handleChange}
                placeholder="Dígito Verificador"
              />
            </div>
            <div>
              <Label htmlFor="dhEmi">Data de Emissão</Label>
              <Input
                id="dhEmi"
                name="dhEmi"
                type="date"
                value={formData.dhEmi}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="tpModal">Tipo de Modal</Label>
              <Select
                name="tpModal"
                value={formData.tpModal}
                onValueChange={(value) => handleSelectChange("tpModal", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o modal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Rodoviário</SelectItem>
                  <SelectItem value="2">Aéreo</SelectItem>
                  <SelectItem value="3">Aquaviário</SelectItem>
                  <SelectItem value="4">Ferroviário</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="ufIni">* UF Inicial</Label>
              <Select
                name="ufIni"
                value={formData.ufIni}
                onValueChange={(value) => handleSelectChange("ufIni", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a UF" />
                </SelectTrigger>
                <SelectContent>
                  {ufList.map((uf) => (
                    <SelectItem key={`ini-${uf.id}`} value={uf.id}>
                      {uf.id}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="ufFim">* UF Final</Label>
              <Select
                name="ufFim"
                value={formData.ufFim}
                onValueChange={(value) => handleSelectChange("ufFim", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a UF" />
                </SelectTrigger>
                <SelectContent>
                  {ufList.map((uf) => (
                    <SelectItem key={`fim-${uf.id}`} value={uf.id}>
                      {uf.id}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="dhIniViagem">
                Data e Hora Previstas de Início da Viagem
              </Label>
              <Input
                id="dhIniViagem"
                name="dhIniViagem"
                type="datetime-local"
                value={formData.dhIniViagem}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center space-x-2 pt-6">
              <Checkbox
                id="indCanalVerde"
                checked={formData.indCanalVerde}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("indCanalVerde", checked as boolean)
                }
              />
              <Label htmlFor="indCanalVerde">Participação no Canal Verde</Label>
            </div>
            <div className="flex items-center space-x-2 pt-6">
              <Checkbox
                id="indCarregaPosterior"
                checked={formData.indCarregaPosterior}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(
                    "indCarregaPosterior",
                    checked as boolean
                  )
                }
              />
              <Label htmlFor="indCarregaPosterior">
                Carregamento posterior
              </Label>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button type="submit">Continuar</Button>
      </div>
    </form>
  );
}
