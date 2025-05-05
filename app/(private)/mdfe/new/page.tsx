'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const steps = [
  'Emitente',
  'Destinatário',
  'Carga',
  'Veículos',
  'Rota',
  'Tributos',
  'Revisão'
]

export default function NewMdfePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({})

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="space-y-6">
      <Link href="/mdfe">
        <Button variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
      </Link>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Emitir novo MDF-e</h1>
        <div className="flex gap-2">
          <Button variant="outline">Salvar rascunho</Button>
          <Button>Emitir</Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center gap-4">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                index <= currentStep
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              }`}
            >
              {index + 1}
            </div>
            <span
              className={`${
                index === currentStep ? 'font-bold' : 'text-muted-foreground'
              }`}
            >
              {step}
            </span>
            {index < steps.length - 1 && (
              <div className="h-px w-8 bg-border" />
            )}
          </div>
        ))}
      </div>

      <div className="rounded-md border p-6">
        {currentStep === 0 && <div>Formulário do emitente</div>}
        {currentStep === 1 && <div>Formulário do destinatário</div>}
        {currentStep === 2 && <div>Formulário da carga</div>}
        {currentStep === 3 && <div>Formulário de veículos</div>}
        {currentStep === 4 && <div>Formulário da rota</div>}
        {currentStep === 5 && <div>Formulário de tributos</div>}
        {currentStep === 6 && <div>Revisão dos dados</div>}
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentStep === 0}
        >
          Voltar
        </Button>
        <Button onClick={handleNext}>
          {currentStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
        </Button>
      </div>
    </div>
  )
}