import { useState } from 'react';
import Card from './Card';

interface CardItem {
  id: string | number;
  content: React.ReactNode;
}

interface CardContainerProps {
  items: CardItem[];
  onSelectionChange?: (selectedItem: string | number | null) => void;
  selectedItem?: string | number | null;
}

function CardContainer({ items, onSelectionChange, selectedItem: externalSelectedItem }: CardContainerProps) {
  const [internalSelectedItem, setInternalSelectedItem] = useState<string | number | null>(null);

  // Usar el item seleccionado externo si se proporciona, de lo contrario usar el estado interno
  const selectedItem = externalSelectedItem !== undefined ? externalSelectedItem : internalSelectedItem;

  const handleSelect = (id: string | number) => {
    // Si estamos usando el estado externo, solo llamamos al callback
    if (externalSelectedItem !== undefined) {
      // Si el item ya está seleccionado, lo deseleccionamos
      if (selectedItem === id) {
        onSelectionChange?.(null);
      } else {
        // Si no está seleccionado, lo seleccionamos (deseleccionando cualquier otro)
        onSelectionChange?.(id);
      }
    }
    // Si no hay estado externo, usamos el estado interno
    else {
      setInternalSelectedItem(prev => {
        // Si el ítem ya está seleccionado, lo deseleccionamos
        if (prev === id) {
          onSelectionChange?.(null);
          return null;
        }
        // Si no está seleccionado, lo seleccionamos
        else {
          onSelectionChange?.(id);
          return id;
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
          isSelected={selectedItem === item.id}
          onSelect={handleSelect}
        >
          {item.content}
        </Card>
      ))}
    </div>
  );
}

export default CardContainer;