'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Save, X } from 'lucide-react'
import Link from 'next/link'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

export default function EditMdfePage() {
  const { id } = useParams()
  const router = useRouter()
  const [formData, setFormData] = useState({})
  const [hasChanges, setHasChanges] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const handleSave = () => {
    // Lógica para salvar alterações
    setShowConfirmDialog(false)
    router.push(`/mdfe/view/${id}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href={`/mdfe/view/${id}`}>
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </Link>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => router.push(`/mdfe/view/${id}`)}
          >
            <X className="mr-2 h-4 w-4" />
            Cancelar
          </Button>
          <Button
            onClick={() => setShowConfirmDialog(true)}
            disabled={!hasChanges}
          >
            <Save className="mr-2 h-4 w-4" />
            Salvar alterações
          </Button>
        </div>
      </div>

      <h1 className="text-2xl font-bold">Editar MDF-e {id}</h1>

      <div className="rounded-md border p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Formulário de edição */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Número</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border p-2"
                onChange={() => setHasChanges(true)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Série</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border p-2"
                onChange={() => setHasChanges(true)}
              />
            </div>
          </div>
          {/* Mais campos do formulário */}
        </div>
      </div>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar alterações</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja salvar as alterações neste MDF-e?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleSave}>
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}