import { useState } from 'react';
import Card from './Card';

interface CardItem {
  id: string | number;
  content: React.ReactNode;
}

interface CardContainerProps {
  items: CardItem[];
  onSelectionChange?: (selectedItems: (string | number)[]) => void;
}

function CardContainer({ items, onSelectionChange }: CardContainerProps) {
  const [selectedItems, setSelectedItems] = useState<(string | number)[]>([]);

  const handleSelect = (id: string | number) => {
    setSelectedItems(prev => {
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