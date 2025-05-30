"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  FileEdit,
  Trash2,
  Eye,
  FilePlus2,
  FileCheck,
  FileWarning,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MdfeDocument } from "@/types/MdfeEnvioTypes";
import { Badge } from "@/components/ui/badge";
import { updateMdfeStatus } from "@/actions/actMdfeEnvio";
import { useToast } from "@/components/ui/use-toast";

interface MdfeTableProps {
  mdfes: MdfeDocument[];
}

export default function MdfeTable({ mdfes }: MdfeTableProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedMdfe, setSelectedMdfe] = useState<MdfeDocument | null>(null);

  const handleViewMdfe = (mdfe: MdfeDocument) => {
    router.push(`/mdfe/view/${mdfe.id}`);
  };

  const handleEditMdfe = (mdfe: MdfeDocument) => {
    const id = mdfe.id;
    if (id) {
      router.push(`/mdfe/new?id=${id}`);
    }
  };

  const handleDeleteDialog = (mdfe: MdfeDocument) => {
    setSelectedMdfe(mdfe);
    setOpenDeleteDialog(true);
  };

  const handleStatusChange = async (mdfe: MdfeDocument, status: string) => {
    try {
      const id = mdfe.id || mdfe._id?.toString();
      if (!id) {
        toast({
          title: "Erro",
          description: "ID do MDFe não encontrado",
          variant: "destructive",
        });
        return;
      }

      const response = await updateMdfeStatus(id, status);

      if (response.success) {
        toast({
          title: "Sucesso",
          description: "Status do MDFe atualizado com sucesso",
        });
        router.refresh();
      } else {
        toast({
          title: "Erro",
          description: response.message || "Erro ao atualizar status do MDFe",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erro ao atualizar status do MDFe:", error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao atualizar o status do MDFe",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string | undefined) => {
    switch (status?.toUpperCase()) {
      case "CRIADO":
        return <Badge variant="outline">Criado</Badge>;
      case "DIGITADO":
        return <Badge variant="outline">Digitado</Badge>;
      case "PROCESSANDO":
        return <Badge variant="secondary">Processando</Badge>;
      case "ENVIADO":
        return <Badge variant="secondary">Enviado</Badge>;
      case "AUTORIZADO":
        return (
          <Badge variant="default" className="bg-green-500 hover:bg-green-600">
            Autorizado
          </Badge>
        );
      case "REJEITADO":
        return <Badge variant="destructive">Rejeitado</Badge>;
      case "CANCELADO":
        return (
          <Badge
            variant="destructive"
            className="bg-yellow-500 hover:bg-yellow-600"
          >
            Cancelado
          </Badge>
        );
      case "ENCERRADO":
        return <Badge variant="default">Encerrado</Badge>;
      default:
        return <Badge variant="outline">{status || "N/A"}</Badge>;
    }
  };

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return "N/A";

    try {
      const dateObj = typeof date === "string" ? new Date(date) : date;
      return formatDistanceToNow(dateObj, {
        addSuffix: true,
        locale: ptBR,
      });
    } catch (error) {
      return "Data inválida";
    }
  };

  const formatDateTime = (dateTimeString: string | undefined) => {
    if (!dateTimeString) return "N/A";

    try {
      const dateObj = new Date(dateTimeString);
      return dateObj.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "America/Sao_Paulo",
      });
    } catch (error) {
      return "Data inválida";
    }
  };

  const formatCurrency = (value: number | string | undefined) => {
    if (!value) return "R$ 0,00";

    const numValue = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(numValue)) return "R$ 0,00";

    return numValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const formatQuantity = (value: number | string | undefined) => {
    if (!value) return "0";

    const numValue = typeof value === "string" ? parseInt(value) : value;
    if (isNaN(numValue)) return "0";

    return numValue.toString();
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data/Hora Emissão</TableHead>
              <TableHead>Série/Número</TableHead>
              <TableHead>Emitente</TableHead>
              <TableHead>UF Origem</TableHead>
              <TableHead>UF Destino</TableHead>
              <TableHead>Valor Carga</TableHead>
              <TableHead>Qtd NFe</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mdfes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center">
                  Nenhum MDF-e encontrado
                </TableCell>
              </TableRow>
            ) : (
              mdfes.map((mdfe) => (
                <TableRow key={mdfe._id?.toString() || mdfe.id?.toString()}>
                  <TableCell className="font-medium">
                    {mdfe.ide?.dhEmi} {mdfe.ide?.hora}
                  </TableCell>
                  <TableCell>
                    {mdfe.ide?.serie && mdfe.ide.numero
                      ? `${mdfe.ide.serie}/${mdfe.ide.numero}`
                      : "N/A"}
                  </TableCell>
                  <TableCell>{mdfe.emit?.xNome || "N/A"}</TableCell>
                  <TableCell>{mdfe.ide?.ufIni || "N/A"}</TableCell>
                  <TableCell>{mdfe.ide?.ufFim || "N/A"}</TableCell>
                  <TableCell>{formatCurrency(mdfe.tot?.vCarga)}</TableCell>
                  <TableCell>{formatQuantity(mdfe.tot?.qNFe)}</TableCell>
                  <TableCell>{getStatusBadge(mdfe.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleViewMdfe(mdfe)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditMdfe(mdfe)}>
                          <FileEdit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteDialog(mdfe)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                        <DropdownMenuLabel>Status</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() =>
                            handleStatusChange(mdfe, "PROCESSANDO")
                          }
                        >
                          <FilePlus2 className="mr-2 h-4 w-4" />
                          Marcar como Processando
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(mdfe, "AUTORIZADO")}
                        >
                          <FileCheck className="mr-2 h-4 w-4" />
                          Marcar como Autorizado
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(mdfe, "REJEITADO")}
                        >
                          <FileWarning className="mr-2 h-4 w-4" />
                          Marcar como Rejeitado
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o MDF-e{" "}
              {selectedMdfe?.ide?.serie && selectedMdfe.ide.numero
                ? `${selectedMdfe.ide.serie}/${selectedMdfe.ide.numero}`
                : selectedMdfe?.id || "selecionado"}
              ? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => {
                if (selectedMdfe) {
                  const id = selectedMdfe.id;
                  if (id) {
                    router.push(`/mdfe/delete/${id}`);
                  }
                }
              }}
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
