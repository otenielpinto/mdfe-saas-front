"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { MdfeEmitente } from "@/types/MdfeEmitenteTypes";
import {
  createMdfeEmitente,
  updateMdfeEmitente,
  updateMdfeEmitenteByObjectId,
} from "@/actions/actMdfeEmitente";
import { useToast } from "@/components/ui/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

// Schema for form validation
const emitenteFormSchema = z.object({
  id: z.number().optional(),
  empresa: z.number().optional(),
  cpfcnpj: z.string().min(1, "CNPJ/CPF é obrigatório"),
  razao_social: z.string().min(1, "Razão Social é obrigatória"),
  fantasia: z.string().optional(),
  logradouro: z.string().optional(),
  numero: z.string().optional(),
  complemento: z.string().optional(),
  bairro: z.string().optional(),
  codigo_municipio: z.number().optional(),
  nome_municipio: z.string().optional(),
  uf: z.string().min(2, "UF é obrigatória").max(2, "UF deve ter 2 caracteres"),
  cep: z.string().optional(),
  telefone: z.string().optional(),
  ie: z.string().optional(),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  certificado_caminho: z.string().optional(),
  certificado_senha: z.string().optional(),
});

type EmitenteFormValues = z.infer<typeof emitenteFormSchema>;

interface EmitenteFormProps {
  emitente?: MdfeEmitente;
  isEdit?: boolean;
}

export default function EmitenteForm({
  emitente,
  isEdit = false,
}: EmitenteFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with default values or existing emitente data
  const form = useForm<EmitenteFormValues>({
    resolver: zodResolver(emitenteFormSchema),
    defaultValues: {
      id: emitente?.id || undefined,
      empresa: emitente?.empresa || undefined,
      cpfcnpj: emitente?.cpfcnpj || "",
      razao_social: emitente?.razao_social || "",
      fantasia: emitente?.fantasia || "",
      logradouro: emitente?.logradouro || "",
      numero: emitente?.numero || "",
      complemento: emitente?.complemento || "",
      bairro: emitente?.bairro || "",
      codigo_municipio: emitente?.codigo_municipio || undefined,
      nome_municipio: emitente?.nome_municipio || "",
      uf: emitente?.uf || "",
      cep: emitente?.cep || "",
      telefone: emitente?.telefone || "",
      ie: emitente?.ie || "",
      email: emitente?.email || "",
    },
  });

  async function onSubmit(data: EmitenteFormValues) {
    setIsSubmitting(true);
    try {
      if (isEdit && emitente) {
        // Update existing emitente
        let response;
        if (emitente._id) {
          response = await updateMdfeEmitenteByObjectId(
            emitente._id.toString(),
            data
          );
        } else if (emitente.id) {
          response = await updateMdfeEmitente(emitente.id, data);
        } else {
          throw new Error("ID do emitente não encontrado");
        }

        if (response.success) {
          toast({
            title: "Sucesso",
            description: "Emitente atualizado com sucesso",
          });
          router.push("/mdfe/emitentes");
          router.refresh();
        } else {
          toast({
            title: "Erro",
            description: response.message || "Erro ao atualizar emitente",
            variant: "destructive",
          });
        }
      } else {
        // Create new emitente
        const response = await createMdfeEmitente(data);

        if (response.success) {
          toast({
            title: "Sucesso",
            description: "Emitente criado com sucesso",
          });
          router.push("/mdfe/emitentes");
          router.refresh();
        } else {
          toast({
            title: "Erro",
            description: response.message || "Erro ao criar emitente",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error("Erro ao salvar emitente:", error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar o emitente",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEdit ? "Editar Emitente" : "Novo Emitente"}</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* ID e Empresa */}
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="ID (opcional)"
                        autoComplete="off"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : undefined
                          )
                        }
                        disabled={isEdit}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="empresa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Empresa</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Código da Empresa (opcional)"
                        autoComplete="off"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : undefined
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* CNPJ/CPF e Razão Social */}
              <FormField
                control={form.control}
                name="cpfcnpj"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CNPJ/CPF</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="CNPJ ou CPF"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="razao_social"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Razão Social</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Razão Social"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Nome Fantasia */}
              <FormField
                control={form.control}
                name="fantasia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Fantasia</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nome Fantasia"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Endereço */}
              <FormField
                control={form.control}
                name="logradouro"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logradouro</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Logradouro"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="numero"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Número"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="complemento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Complemento</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Complemento"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bairro"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bairro</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Bairro"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="codigo_municipio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Código do Município</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Código do Município"
                        autoComplete="off"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : undefined
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nome_municipio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Município</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Município"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="uf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>UF</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="UF"
                        maxLength={2}
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cep"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CEP</FormLabel>
                    <FormControl>
                      <Input placeholder="CEP" autoComplete="off" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Contato */}
              <FormField
                control={form.control}
                name="telefone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Telefone"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        type="email"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Documentos */}
              <FormField
                control={form.control}
                name="ie"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Inscrição Estadual</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Inscrição Estadual"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Certificado */}
              <FormField
                control={form.control}
                name="certificado_caminho"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Caminho do Certificado</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Caminho do Certificado"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="certificado_senha"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha do Certificado</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Senha do Certificado"
                        type="password"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isEdit ? "Atualizar" : "Salvar"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
