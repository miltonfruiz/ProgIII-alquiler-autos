import { toast } from "react-toastify";

/*---------- Función para convertir datos a CSV ----------*/
export function convertToCSV(data, options = {}) {
  if (!data || data.length === 0) return "";
  const {
    excludeFields = [],
    fieldFormatters = {},
    headerNames = {},
  } = options;
  const headers = Object.keys(data[0])
    .filter((key) => !excludeFields.includes(key))
    .map((key) => headerNames[key] || key)
    .join(",");
  const rows = data.map((row) => {
    const values = Object.entries(row)
      .filter(([key]) => !excludeFields.includes(key))
      .map(([key, value]) => {
        if (fieldFormatters[key]) {
          value = fieldFormatters[key](value);
        }
        if (value === null || value === undefined) return '""';
        const strValue = String(value).replace(/"/g, '""');
        return `"${strValue}"`;
      });
    return values.join(",");
  });
  return [headers, ...rows].join("\n");
}
/*---------- Función para descargar el archivo CSV ----------*/
export function downloadCSV(data, filename = "backup.csv", options = {}) {
  try {
    if (!data || data.length === 0) {
      toast.warning("No hay datos para exportar");
      return;
    }
    const csv = convertToCSV(data, options);
    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error al generar CSV:", error);
    toast.error("Error al generar el backup");
  }
}
/*---------- Opciones para los selects ----------*/
export const categoryOptions = [
  { value: "Económico", label: "Económico" },
  { value: "Compacto", label: "Compacto" },
  { value: "Estándar", label: "Estándar" },
  { value: "Full-size", label: "Full-size" },
  { value: "Premium", label: "Premium" },
  { value: "SUV", label: "SUV" },
  { value: "Pickup", label: "Pickup" },
  { value: "Minivan", label: "Minivan" },
  { value: "Deportivo", label: "Deportivo" },
  { value: "Eléctrico", label: "Eléctrico" },
];
export const stateOptions = [
  { value: "Disponible", label: "Disponible" },
  { value: "No Disponible", label: "No Disponible" },
];
export const transmissionOptions = [
  { value: "Manual", label: "Manual" },
  { value: "Automática", label: "Automática" },
];
export const brandOptions = [
  { value: "Kia", label: "Kia" },
  { value: "Chevrolet", label: "Chevrolet" },
  { value: "Nissan", label: "Nissan" },
  { value: "Hyundai", label: "Hyundai" },
  { value: "Toyota", label: "Toyota" },
  { value: "Volskwagen", label: "Volskwagen" },
  { value: "Honda", label: "Honda" },
  { value: "Mazda", label: "Mazda" },
  { value: "BMW", label: "BMW" },
  { value: "Mercedes-Benz", label: "Mercedes-Benz" },
  { value: "Ford", label: "Ford" },
  { value: "Jeep", label: "Jeep" },
  { value: "Chrysler", label: "Chrysler" },
  { value: "Dodge", label: "Dodge" },
  { value: "Audi", label: "Audi" },
  { value: "Tesla", label: "Tesla" },
  { value: "BYD", label: "BYD" },
];
export const reservationState = [
  { value: "Pendiente", label: "Pendiente" },
  { value: "Confirmada", label: "Confirmada" },
  { value: "En Curso", label: "En Curso" },
  { value: "Completada", label: "Completada" },
  { value: "Cancelada", label: "Cancelada" },
];
