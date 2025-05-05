'use client'

import { useParams } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Download, FileEdit, Printer } from 'lucide-react'
import Link from 'next/link'

export default function MdfeViewPage() {
  const { id } = useParams()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Link href="/mdfe">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </Link>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            XML
          </Button>
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Imprimir
          </Button>
          <Link href={`/mdfe/edit/${id}`}>
            <Button>
              <FileEdit className="mr-2 h-4 w-4" />
              Editar
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="info" className="w-full">
        <TabsList>
          <TabsTrigger value="info">Informações</TabsTrigger>
          <TabsTrigger value="items">Itens</TabsTrigger>
          <TabsTrigger value="events">Eventos</TabsTrigger>
          <TabsTrigger value="xml">XML</TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <div className="rounded-md border p-4">
            Informações gerais do MDF-e
          </div>
        </TabsContent>

        <TabsContent value="items">
          <div className="rounded-md border p-4">
            Itens transportados
          </div>
        </TabsContent>

        <TabsContent value="events">
          <div className="rounded-md border p-4">
            Histórico de eventos
          </div>
        </TabsContent>

        <TabsContent value="xml">
          <div className="rounded-md border p-4">
            <pre className="overflow-auto max-h-[600px]">
              Conteúdo do XML aqui
            </pre>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}