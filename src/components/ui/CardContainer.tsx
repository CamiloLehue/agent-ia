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

  const selectedItem = externalSelectedItem !== undefined ? externalSelectedItem : internalSelectedItem;

  const handleSelect = (id: string | number) => {
    if (externalSelectedItem !== undefined) {
      if (selectedItem === id) {
        onSelectionChange?.(null);
      } else {
        onSelectionChange?.(id);
      }
    }
    else {
      setInternalSelectedItem(prev => {
        if (prev === id) {
          onSelectionChange?.(null);
          return null;
        }
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