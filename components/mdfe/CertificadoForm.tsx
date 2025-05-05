"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { MdfeCertificado } from "@/types/MdfeCertificadoTypes";
import {
  createMdfeCertificado,
  getAllMdfeCertificados,
} from "@/actions/actMdfeCertificado";
import { useToast } from "@/components/ui/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
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
import { Loader2, FileUp } from "lucide-react";

// Schema for form validation
const certificadoFormSchema = z.object({
  cpfcnpj: z.string().min(1, "CNPJ/CPF é obrigatório"),
  senha: z.string().min(1, "Senha do certificado é obrigatória"),
});

type CertificadoFormValues = z.infer<typeof certificadoFormSchema>;

export default function CertificadoForm() {
  // Generate a unique key for the form to force re-render and prevent auto-fill
  const formKey = useRef(
    `form-${Math.random().toString(36).substring(2)}`
  ).current;

  // State to store the next available ID
  const [nextId, setNextId] = useState<number | null>(null);
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize form with empty values and prevent browser autocomplete
  const form = useForm<CertificadoFormValues>({
    resolver: zodResolver(certificadoFormSchema),
    defaultValues: {
      cpfcnpj: "",
      senha: "",
    },
    // Reset form on component mount to ensure fields are empty
    resetOptions: {
      keepDirtyValues: false,
    },
  });

  // Fetch the next available ID when component mounts
  useEffect(() => {
    async function fetchNextId() {
      try {
        // Get all certificates to find the highest ID
        const response = await getAllMdfeCertificados();

        if (response.success && response.data && Array.isArray(response.data)) {
          // Find the highest ID
          const highestId = response.data.reduce(
            (max: number, cert: MdfeCertificado) => {
              const certId = cert.id || 0;
              return certId > max ? certId : max;
            },
            0
          );

          // Set the next ID (highest + 1)
          setNextId(highestId + 1);
        } else {
          // If no certificates found or error, start with ID 1
          setNextId(1);
        }
      } catch (error) {
        console.error("Error fetching next ID:", error);
        // Default to ID 1 if there's an error
        setNextId(1);
      }
    }

    fetchNextId();
  }, []);

  // Reset form when component mounts and when route changes
  useEffect(() => {
    // Clear form values
    form.reset({
      cpfcnpj: "",
      senha: "",
    });

    // Clear file selection
    setSelectedFile(null);

    // Add a small delay to ensure browser doesn't auto-fill
    const timer = setTimeout(() => {
      form.reset({
        cpfcnpj: "",
        senha: "",
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [form]);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Handle form submission
  async function onSubmit(data: CertificadoFormValues) {
    if (!selectedFile) {
      toast({
        title: "Erro",
        description: "Por favor, selecione um arquivo de certificado",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Lê o arquivo como ArrayBuffer (equivalente a File.ReadAllBytes em C#)
      // Este processo converte o arquivo em um array de bytes
      const fileBuffer = await selectedFile.arrayBuffer();

      // Converte ArrayBuffer para Uint8Array para garantir que temos um array de bytes
      const uint8Array = new Uint8Array(fileBuffer);

      // Converte para string base64 para armazenamento no banco de dados
      // Isso é equivalente a Convert.ToBase64String(bytes) em C#
      const base64String = Buffer.from(uint8Array).toString("base64");

      // Create certificate data with auto-generated ID if available
      const certificadoData: MdfeCertificado = {
        id: nextId || undefined, // Use the next available ID or let the server generate one
        cpfcnpj: data.cpfcnpj,
        senha: data.senha,
        arquivo_stream: base64String, // Store as base64 string
      };

      const response = await createMdfeCertificado(certificadoData);

      if (response.success) {
        toast({
          title: "Sucesso",
          description: "Certificado cadastrado com sucesso",
        });
        router.push("/mdfe/certificados");
        router.refresh();
      } else {
        toast({
          title: "Erro",
          description: response.message || "Erro ao cadastrar certificado",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erro ao salvar certificado:", error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar o certificado",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cadastrar Certificado Digital</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
        >
          <CardContent className="space-y-4">
            {/* Hidden fields to trick browser autocomplete */}
            <div style={{ display: "none" }}>
              <input
                type="text"
                name="fakeusernameremembered"
                autoComplete="off"
              />
              <input
                type="password"
                name="fakepasswordremembered"
                autoComplete="off"
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              {/* ID (Auto-generated) */}
              <div>
                <FormLabel>ID</FormLabel>
                <div className="flex items-center gap-2 mt-1">
                  <div className="h-10 px-3 py-2 rounded-md border border-input bg-muted flex items-center">
                    {nextId !== null ? nextId : "Carregando..."}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    (Gerado automaticamente)
                  </span>
                </div>
                <FormDescription>ID único para o certificado</FormDescription>
              </div>

              {/* CNPJ/CPF */}
              <FormField
                control={form.control}
                name="cpfcnpj"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CNPJ/CPF</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o CNPJ ou CPF"
                        {...field}
                        autoComplete="off"
                        value={field.value || ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? e.target.value : undefined
                          )
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      CNPJ ou CPF do emitente do certificado
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Arquivo do Certificado */}
              <FormItem>
                <FormLabel>Arquivo do Certificado</FormLabel>
                <FormControl>
                  <div className="flex flex-col gap-2">
                    <Input
                      type="file"
                      accept=".pfx,.p12"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                      className="hidden"
                      autoComplete="off"
                    />
                    <div className="flex gap-2 items-center">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <FileUp className="h-4 w-4 mr-2" />
                        Selecionar Arquivo
                      </Button>
                      <span className="text-sm text-muted-foreground">
                        {selectedFile
                          ? selectedFile.name
                          : "Nenhum arquivo selecionado"}
                      </span>
                    </div>
                  </div>
                </FormControl>
                <FormDescription>
                  Selecione o arquivo de certificado digital (.pfx ou .p12)
                </FormDescription>
                <FormMessage />
              </FormItem>

              {/* Senha do Certificado */}
              <FormField
                control={form.control}
                name="senha"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha do Certificado</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Digite a senha do certificado"
                        {...field}
                        autoComplete="off"
                        value={field.value || ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? e.target.value : undefined
                          )
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Senha utilizada para acessar o certificado digital
                    </FormDescription>
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
              Cadastrar
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
