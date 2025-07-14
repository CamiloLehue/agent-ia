import { useState } from 'react';
import Card from './Card';

interface CardItem {
  id: string | number;
  content: React.ReactNode;
}

interface CardContainerProps {
  items: CardItem[];
  onSelectionChange?: (selectedItems: (string | number)[]) => void;
  selectedItems?: (string | number)[];
}

function CardContainer({ items, onSelectionChange, selectedItems: externalSelectedItems }: CardContainerProps) {
  const [internalSelectedItems, setInternalSelectedItems] = useState<(string | number)[]>([]);

  // Usar los items seleccionados externos si se proporcionan, de lo contrario usar el estado interno
  const selectedItems = externalSelectedItems || internalSelectedItems;

  const handleSelect = (id: string | number) => {
    // Si estamos usando el estado externo, solo llamamos al callback
    if (externalSelectedItems) {
      // Obtenemos solo los IDs de los items que pertenecen a este contenedor
      const containerItemIds = items.map(item => item.id);

      // Filtramos las selecciones actuales para este contenedor específico
      const currentContainerSelections = externalSelectedItems.filter(itemId =>
        containerItemIds.includes(itemId)
      );

      // Verificamos si el ítem está seleccionado
      const isSelected = currentContainerSelections.includes(id);

      // Actualizamos las selecciones para este contenedor
      const newContainerSelections = isSelected
        ? currentContainerSelections.filter(item => item !== id)
        : [...currentContainerSelections, id];

      // Llamamos al callback con las nuevas selecciones de este contenedor
      onSelectionChange?.(newContainerSelections);
    }
    // Si no hay estado externo, usamos el estado interno
    else {
      setInternalSelectedItems(prev => {
        // Si el ítem ya está seleccionado, lo quitamos del array
        if (prev.includes(id)) {
          const newSelected = prev.filter(item => item !== id);
          onSelectionChange?.(newSelected);
          return newSelected;
        }
        // Si no está seleccionado, lo añadimos al array
        else {
          const newSelected = [...prev, id];
          onSelectionChange?.(newSelected);
          return newSelected;
        }
      });
    }
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {items.map(item => (
        <Card
          key={item.id}
          id={item.id}
          isSelected={selectedItems.includes(item.id)}
          onSelect={handleSelect}
        >
          {item.content}
        </Card>
      ))}
    </div>
  );
}

export default CardContainer;