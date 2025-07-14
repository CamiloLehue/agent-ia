import { useState } from 'react';
import CardContainer from '../../components/ui/CardContainer';

const CardExample = () => {
  const [selectedItems, setSelectedItems] = useState<(string | number)[]>([]);

  const cardItems = [
    { id: 1, content: 'Opción 1' },
    { id: 2, content: 'Opción 2' },
    { id: 3, content: 'Opción 3' },
    { id: 4, content: 'Opción 4' },
    { id: 5, content: 'Opción 5' },
    { id: 6, content: 'Opción 6' },
  ];

  const handleSelectionChange = (selected: (string | number)[]) => {
    setSelectedItems(selected);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Selección de Cards</h2>
      
      <CardContainer 
        items={cardItems} 
        onSelectionChange={handleSelectionChange} 
      />
      
      <div className="mt-8 p-4 bg-black/20 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Elementos seleccionados:</h3>
        {selectedItems.length > 0 ? (
          <ul className="list-disc pl-5">
            {selectedItems.map(id => (
              <li key={id} className="text-primary">
                {cardItems.find(item => item.id === id)?.content}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-primary/50">No hay elementos seleccionados</p>
        )}
      </div>
    </div>
  );
};

export default CardExample;