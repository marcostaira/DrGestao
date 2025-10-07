// frontend/src/components/whatsapp/WhatsAppStats.tsx

import React from "react";
import { WhatsAppStats as StatsType } from "../../types/whatsapp.types";

interface WhatsAppStatsProps {
  stats: StatsType | null;
  refreshing: boolean;
  onRefresh: () => void;
}

export const WhatsAppStats: React.FC<WhatsAppStatsProps> = ({
  stats,
  refreshing,
  onRefresh,
}) => {
  if (!stats) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-500 text-center">Carregando estatísticas...</p>
      </div>
    );
  }

  const statCards = [
    {
      title: "Mensagens Enviadas",
      value: stats.totalEnviadas,
      icon: "📤",
      color: "blue",
    },
    {
      title: "Mensagens Recebidas",
      value: stats.totalRecebidas,
      icon: "📥",
      color: "green",
    },
    {
      title: "Mensagens Hoje",
      value: stats.mensagensHoje,
      icon: "📅",
      color: "purple",
    },
    {
      title: "Respondidas",
      value: stats.mensagensRespondidas,
      icon: "✅",
      color: "emerald",
    },
    {
      title: "Com Erro",
      value: stats.mensagensErro,
      icon: "❌",
      color: "red",
    },
    {
      title: "Taxa de Resposta",
      value:
        stats.totalEnviadas > 0
          ? `${(
              (stats.mensagensRespondidas / stats.totalEnviadas) *
              100
            ).toFixed(1)}%`
          : "0%",
      icon: "📊",
      color: "indigo",
    },
  ];

  const colorClasses = {
    blue: "bg-blue-50 border-blue-200 text-blue-800",
    green: "bg-green-50 border-green-200 text-green-800",
    purple: "bg-purple-50 border-purple-200 text-purple-800",
    emerald: "bg-emerald-50 border-emerald-200 text-emerald-800",
    red: "bg-red-50 border-red-200 text-red-800",
    indigo: "bg-indigo-50 border-indigo-200 text-indigo-800",
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <span>📊</span>
          Estatísticas
        </h2>
        <button
          onClick={onRefresh}
          disabled={refreshing}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <span className={refreshing ? "animate-spin" : ""}>🔄</span>
          {refreshing ? "Atualizando..." : "Atualizar"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((card) => (
          <div
            key={card.title}
            className={`border-2 rounded-lg p-4 ${
              colorClasses[card.color as keyof typeof colorClasses]
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium opacity-80">{card.title}</p>
              <span className="text-2xl">{card.icon}</span>
            </div>
            <p className="text-3xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
