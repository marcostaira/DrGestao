"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreatePacienteData, createPaciente } from "@/services/pacienteService";
import { getProfissionais, Profissional } from "@/services/profissionalService";
import { PacienteForm } from "@/components/pacientes/PacienteForm";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Alert from "@/components/ui/Alert";
import { useEffect } from "react";

export default function NovoPacientePage() {
  const router = useRouter();
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<CreatePacienteData>({
    nome: "",
    telefone: "",
    cpf: "",
    dataNascimento: "",
    telefone2: "",
    email: "",
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    alergias: "",
    menorIdade: false,
    responsavelNome: "",
    responsavelCpf: "",
    responsavelTelefone: "",
    responsavelParentesco: "",
    profissionalId: "",
    observacoes: "",
  });

  useEffect(() => {
    loadProfissionais();
  }, []);

  const loadProfissionais = async () => {
    try {
      const data = await getProfissionais();
      setProfissionais(data);
    } catch (err: any) {
      setError("Erro ao carregar profissionais");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const data = {
        ...formData,
        cpf: formData.cpf?.replace(/\D/g, "") || undefined,
        responsavelCpf:
          formData.responsavelCpf?.replace(/\D/g, "") || undefined,
        cep: formData.cep?.replace(/\D/g, "") || undefined,
      };

      await createPaciente(data);
      router.push("/dashboard/pacientes?success=cadastrado");
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao cadastrar paciente");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Novo Paciente</h1>
          <p className="text-gray-600 mt-1">Preencha os dados do paciente</p>
        </div>

        <Button
          variant="secondary"
          onClick={() => router.push("/dashboard/pacientes")}
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Voltar
        </Button>
      </div>

      {/* Alerts */}
      {error && (
        <Alert type="error" onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      {/* Formulário */}
      <Card>
        <PacienteForm
          formData={formData}
          setFormData={setFormData}
          profissionais={profissionais}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          isEditing={false}
        />
      </Card>
    </div>
  );
}
