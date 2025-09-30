"use client";

interface ColorPickerProps {
  label?: string;
  value: string;
  onChange: (color: string) => void;
  required?: boolean;
}

const PRESET_COLORS = [
  "#3B82F6", // Azul
  "#10B981", // Verde
  "#F59E0B", // Amarelo
  "#EF4444", // Vermelho
  "#8B5CF6", // Roxo
  "#EC4899", // Rosa
  "#14B8A6", // Teal
  "#F97316", // Laranja
  "#6366F1", // Indigo
  "#06B6D4", // Cyan
];

export default function ColorPicker({
  label,
  value,
  onChange,
  required,
}: ColorPickerProps) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-secondary-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="space-y-3">
        {/* Grid de cores predefinidas */}
        <div className="grid grid-cols-5 gap-2">
          {PRESET_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => onChange(color)}
              className={`w-full h-10 rounded-lg border-2 transition-all ${
                value === color
                  ? "border-secondary-900 scale-110"
                  : "border-secondary-200 hover:border-secondary-400"
              }`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>

        {/* Input customizado */}
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-16 h-10 rounded border border-secondary-300 cursor-pointer"
          />
          <input
            type="text"
            value={value.toUpperCase()}
            onChange={(e) => onChange(e.target.value)}
            placeholder="#000000"
            className="flex-1 px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            pattern="^#[0-9A-Fa-f]{6}$"
          />
        </div>
      </div>
    </div>
  );
}
