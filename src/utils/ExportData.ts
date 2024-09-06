// utils/exportData.ts
export const exportData = (cars: { name: string; style: string; type: string; color: string; price: string }[]) => {
    const csvContent = cars
      .map(car => `${car.name},${car.style},${car.type},${car.color},${car.price}`)
      .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'cars_data.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  