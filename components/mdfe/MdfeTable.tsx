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
import { Mdfe } from "@/types/MdfeTypes";
import { Badge } from "@/components/ui/badge";
import { updateMdfeStatus } from "@/actions/actMdfe";
import { useToast } from "@/components/ui/use-toast";

interface MdfeTableProps {
  mdfes: Mdfe[];
}

export default function MdfeTable({ mdfes }: MdfeTableProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedMdfe, setSelectedMdfe] = useState<Mdfe | null>(null);

  const handleViewMdfe = (mdfe: Mdfe) => {
    router.push(`/mdfe/view/${mdfe._id}`);
  };

  const handleEditMdfe = (mdfe: Mdfe) => {
    router.push(`/mdfe/edit/${mdfe._id}`);
  };

  const handleDeleteDialog = (mdfe: Mdfe) => {
    setSelectedMdfe(mdfe);
    setOpenDeleteDialog(true);
  };

  const handleStatusChange = async (mdfe: Mdfe, status: string) => {
    try {
      const id = mdfe._id?.toString() || mdfe.id;
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

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Série/Número</TableHead>
              <TableHead>Emitente</TableHead>
              <TableHead>UF Origem</TableHead>
              <TableHead>UF Destino</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mdfes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  Nenhum MDF-e encontrado
                </TableCell>
              </TableRow>
            ) : (
              mdfes.map((mdfe) => (
                <TableRow key={mdfe._id?.toString() || mdfe.id?.toString()}>
                  <TableCell className="font-medium">
                    {mdfe.id || "N/A"}
                  </TableCell>
                  <TableCell>
                    {mdfe.infMDFe?.ide?.serie && mdfe.infMDFe.ide.nMDF
                      ? `${mdfe.infMDFe.ide.serie}/${mdfe.infMDFe.ide.nMDF}`
                      : "N/A"}
                  </TableCell>
                  <TableCell>{mdfe.infMDFe?.emit?.xNome || "N/A"}</TableCell>
                  <TableCell>{mdfe.infMDFe?.ide?.UFIni || "N/A"}</TableCell>
                  <TableCell>{mdfe.infMDFe?.ide?.UFFim || "N/A"}</TableCell>

                  <TableCell>{getStatusBadge(mdfe.status)}</TableCell>
                  <TableCell>{formatDate(mdfe.createdAt)}</TableCell>
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
                          onClick={() => handleStatusChange(mdfe, "ENVIADO")}
                        >
                          <FilePlus2 className="mr-2 h-4 w-4" />
                          Marcar como Enviado
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
              {selectedMdfe?.infMDFe?.ide?.serie &&
              selectedMdfe.infMDFe.ide.nMDF
                ? `${selectedMdfe.infMDFe.ide.serie}/${selectedMdfe.infMDFe.ide.nMDF}`
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
                  router.push(`/mdfe/delete/${selectedMdfe._id}`);
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
