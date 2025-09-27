"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface MenuItem {
  name: string;
  href?: string;
  icon: JSX.Element;
  adminOnly?: boolean;
  isTitle?: boolean;
  children?: MenuItem[];
}

export default function Sidebar() {
  const pathname = usePathname();
  const { isAdmin } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "configuracoes",
  ]);

  const menuItems: MenuItem[] = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      name: "Agenda",
      href: "/dashboard/agenda",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      name: "Atendimentos",
      href: "/dashboard/atendimentos",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      name: "Pacientes",
      href: "/dashboard/pacientes",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      name: "Configurações",
      isTitle: true,
      adminOnly: true,
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      children: [
        {
          name: "Geral",
          href: "/dashboard/configuracoes",
          icon: (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          ),
          adminOnly: true,
        },
        {
          name: "Usuários",
          href: "/dashboard/usuarios",
          icon: (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ),
          adminOnly: true,
        },
        {
          name: "Profissionais",
          href: "/dashboard/profissionais",
          icon: (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          ),
          adminOnly: true,
        },
        {
          name: "Procedimentos",
          href: "/dashboard/procedimentos",
          icon: (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
          ),
          adminOnly: true,
        },
      ],
    },
  ];

  const toggleSection = (sectionName: string) => {
    if (expandedSections.includes(sectionName)) {
      setExpandedSections(expandedSections.filter((s) => s !== sectionName));
    } else {
      setExpandedSections([...expandedSections, sectionName]);
    }
  };

  const filteredMenuItems = menuItems.filter(
    (item) => !item.adminOnly || isAdmin
  );

  const renderMenuItem = (item: MenuItem) => {
    if (item.isTitle) {
      const sectionKey = item.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      const isExpanded = expandedSections.includes(sectionKey);
      const filteredChildren =
        item.children?.filter((child) => !child.adminOnly || isAdmin) || [];

      return (
        <div key={item.name}>
          <button
            onClick={() => !isCollapsed && toggleSection(sectionKey)}
            className={`
              w-full flex items-center ${
                isCollapsed ? "justify-center px-6" : "justify-between px-6"
              } py-3 text-sm font-medium transition-colors
              text-primary-100 hover:bg-primary-700 hover:text-white
            `}
            title={isCollapsed ? item.name : ""}
          >
            <div className="flex items-center">
              {item.icon}
              {!isCollapsed && <span className="ml-3">{item.name}</span>}
            </div>
            {!isCollapsed && (
              <svg
                className={`w-4 h-4 transition-transform ${
                  isExpanded ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            )}
          </button>

          {/* Subitens */}
          {(isExpanded || isCollapsed) &&
            filteredChildren.map((child) => {
              const isActive = pathname === child.href;

              return (
                <Link
                  key={child.href}
                  href={child.href!}
                  className={`
                  flex items-center ${
                    isCollapsed ? "justify-center px-6" : "px-10"
                  } py-2.5 text-sm transition-colors
                  ${
                    isActive
                      ? "bg-primary-900 text-white border-l-4 border-primary-400"
                      : "text-primary-200 hover:bg-primary-700 hover:text-white"
                  }
                `}
                  title={isCollapsed ? child.name : ""}
                >
                  {child.icon}
                  {!isCollapsed && <span className="ml-3">{child.name}</span>}
                </Link>
              );
            })}
        </div>
      );
    }

    // Item normal
    const isActive = pathname === item.href;

    return (
      <Link
        key={item.href}
        href={item.href!}
        className={`
          flex items-center ${
            isCollapsed ? "justify-center px-6" : "px-6"
          } py-3 text-sm font-medium transition-colors
          ${
            isActive
              ? "bg-primary-900 text-white border-l-4 border-primary-400"
              : "text-primary-100 hover:bg-primary-700 hover:text-white"
          }
        `}
        title={isCollapsed ? item.name : ""}
      >
        {item.icon}
        {!isCollapsed && <span className="ml-3">{item.name}</span>}
      </Link>
    );
  };

  return (
    <aside
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } bg-primary-800 text-white min-h-screen transition-all duration-300`}
    >
      <div className="p-6 flex items-center justify-between">
        {!isCollapsed && (
          <h1 className="text-xl font-bold">Sistema de Agendamentos</h1>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-primary-700 rounded-lg transition-colors ml-auto"
          title={isCollapsed ? "Expandir menu" : "Recolher menu"}
        >
          {isCollapsed ? (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
          )}
        </button>
      </div>

      <nav className="mt-6">{filteredMenuItems.map(renderMenuItem)}</nav>
    </aside>
  );
}
