import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MdfeTotalizadoresFormProps {
  onSubmit: (data: any) => void;
}

export function MdfeTotalizadoresForm({
  onSubmit,
}: MdfeTotalizadoresFormProps) {
  const [formData, setFormData] = useState({
    qCTe: "0",
    qNFe: "0",
    qMDFe: "0",
    vCarga: "0.00",
    cUnid: "01",
    qCarga: "0.00",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
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
            <CardTitle>Totalizadores</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="qCTe">Quantidade de CT-e</Label>
              <Input
                id="qCTe"
                name="qCTe"
                value={formData.qCTe}
                onChange={handleChange}
                type="number"
                min="0"
                disabled
              />
            </div>
            <div>
              <Label htmlFor="qNFe">Quantidade de NF-e</Label>
              <Input
                id="qNFe"
                name="qNFe"
                value={formData.qNFe}
                onChange={handleChange}
                type="number"
                min="0"
                disabled
              />
            </div>
            <div>
              <Label htmlFor="qMDFe">Quantidade de MDF-e</Label>
              <Input
                id="qMDFe"
                name="qMDFe"
                value={formData.qMDFe}
                onChange={handleChange}
                type="number"
                min="0"
                disabled
              />
            </div>
            <div>
              <Label htmlFor="vCarga">* Valor total da carga (R$)</Label>
              <Input
                id="vCarga"
                name="vCarga"
                value={formData.vCarga}
                onChange={handleChange}
                type="number"
                step="0.01"
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="cUnid">Unidade de medida</Label>
              <div className="flex border rounded-md">
                <div className="px-3 py-2 bg-muted border-r">
                  {formData.cUnid === "01" ? "KG" : "TON"}
                </div>
                <input
                  type="radio"
                  id="cUnid01"
                  name="cUnid"
                  value="01"
                  checked={formData.cUnid === "01"}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, cUnid: e.target.value }))
                  }
                  className="hidden"
                />
                <label
                  htmlFor="cUnid01"
                  className={`flex-1 text-center py-2 cursor-pointer ${
                    formData.cUnid === "01"
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }`}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, cUnid: "01" }))
                  }
                >
                  KG
                </label>
                <input
                  type="radio"
                  id="cUnid02"
                  name="cUnid"
                  value="02"
                  checked={formData.cUnid === "02"}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, cUnid: e.target.value }))
                  }
                  className="hidden"
                />
                <label
                  htmlFor="cUnid02"
                  className={`flex-1 text-center py-2 cursor-pointer ${
                    formData.cUnid === "02"
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }`}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, cUnid: "02" }))
                  }
                >
                  TON
                </label>
              </div>
            </div>
            <div>
              <Label htmlFor="qCarga">* Peso total da carga</Label>
              <Input
                id="qCarga"
                name="qCarga"
                value={formData.qCarga}
                onChange={handleChange}
                type="number"
                step="0.01"
                min="0"
              />
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
