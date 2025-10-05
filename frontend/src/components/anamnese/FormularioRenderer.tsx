import React from "react";
import {
  CampoFormulario,
  TipoCampoFormulario,
  RespostaAnamnese,
} from "../../types/anamnese.types";

interface FormularioRendererProps {
  campos: CampoFormulario[];
  respostas: RespostaAnamnese;
  onChange: (respostas: RespostaAnamnese) => void;
  errors?: { [key: string]: string };
}

export default function FormularioRenderer({
  campos,
  respostas,
  onChange,
  errors = {},
}: FormularioRendererProps) {
  const handleChange = (campoId: string, valor: any) => {
    onChange({
      ...respostas,
      [campoId]: valor,
    });
  };

  const renderCampo = (campo: CampoFormulario) => {
    const valor = respostas[campo.id];
    const erro = errors[campo.id];

    const baseClasses = `w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
      erro ? "border-red-500" : ""
    }`;

    switch (campo.tipo) {
      case TipoCampoFormulario.TEXTO:
      case TipoCampoFormulario.EMAIL:
      case TipoCampoFormulario.TELEFONE:
        return (
          <input
            type={campo.tipo === TipoCampoFormulario.EMAIL ? "email" : "text"}
            value={valor || ""}
            onChange={(e) => handleChange(campo.id, e.target.value)}
            placeholder={campo.placeholder}
            className={baseClasses}
            required={campo.obrigatorio}
          />
        );

      case TipoCampoFormulario.TEXTO_LONGO:
        return (
          <textarea
            value={valor || ""}
            onChange={(e) => handleChange(campo.id, e.target.value)}
            placeholder={campo.placeholder}
            rows={4}
            className={baseClasses}
            required={campo.obrigatorio}
          />
        );

      case TipoCampoFormulario.NUMERO:
        return (
          <input
            type="number"
            value={valor || ""}
            onChange={(e) => handleChange(campo.id, e.target.value)}
            placeholder={campo.placeholder}
            min={campo.validacao?.min}
            max={campo.validacao?.max}
            className={baseClasses}
            required={campo.obrigatorio}
          />
        );

      case TipoCampoFormulario.DATA:
        return (
          <input
            type="date"
            value={valor || ""}
            onChange={(e) => handleChange(campo.id, e.target.value)}
            className={baseClasses}
            required={campo.obrigatorio}
          />
        );

      case TipoCampoFormulario.SELECAO:
        return (
          <select
            value={valor || ""}
            onChange={(e) => handleChange(campo.id, e.target.value)}
            className={baseClasses}
            required={campo.obrigatorio}
          >
            <option value="">Selecione...</option>
            {campo.opcoes?.map((opcao, index) => (
              <option key={index} value={opcao}>
                {opcao}
              </option>
            ))}
          </select>
        );

      case TipoCampoFormulario.RADIO:
        return (
          <div className="space-y-2">
            {campo.opcoes?.map((opcao, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="radio"
                  id={`${campo.id}-${index}`}
                  name={campo.id}
                  value={opcao}
                  checked={valor === opcao}
                  onChange={(e) => handleChange(campo.id, e.target.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  required={campo.obrigatorio}
                />
                <label
                  htmlFor={`${campo.id}-${index}`}
                  className="ml-3 block text-sm text-gray-700"
                >
                  {opcao}
                </label>
              </div>
            ))}
          </div>
        );

      case TipoCampoFormulario.MULTIPLA_ESCOLHA:
        return (
          <div className="space-y-2">
            {campo.opcoes?.map((opcao, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  id={`${campo.id}-${index}`}
                  value={opcao}
                  checked={Array.isArray(valor) && valor.includes(opcao)}
                  onChange={(e) => {
                    const valores = Array.isArray(valor) ? [...valor] : [];
                    if (e.target.checked) {
                      valores.push(opcao);
                    } else {
                      const idx = valores.indexOf(opcao);
                      if (idx > -1) valores.splice(idx, 1);
                    }
                    handleChange(campo.id, valores);
                  }}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor={`${campo.id}-${index}`}
                  className="ml-3 block text-sm text-gray-700"
                >
                  {opcao}
                </label>
              </div>
            ))}
          </div>
        );

      case TipoCampoFormulario.SIM_NAO:
        return (
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name={campo.id}
                value="true"
                checked={valor === true}
                onChange={() => handleChange(campo.id, true)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                required={campo.obrigatorio}
              />
              <span className="ml-2 text-sm text-gray-700">Sim</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name={campo.id}
                value="false"
                checked={valor === false}
                onChange={() => handleChange(campo.id, false)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Não</span>
            </label>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {campos
        .sort((a, b) => a.ordem - b.ordem)
        .map((campo) => (
          <div key={campo.id}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {campo.label}
              {campo.obrigatorio && (
                <span className="text-red-500 ml-1">*</span>
              )}
            </label>
            {renderCampo(campo)}
            {errors[campo.id] && (
              <p className="mt-1 text-sm text-red-600">{errors[campo.id]}</p>
            )}
          </div>
        ))}
    </div>
  );
}
