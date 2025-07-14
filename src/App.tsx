import { useState } from 'react';
import CardContainer from './components/ui/CardContainer';
import ChatPage from './features/chat/pages/ChatPage';

function App() {

  const [isSelectedData, setIsSelectedData] = useState<{ id: number, name: string }[]>([]);

  const removeSelectedItem = (itemId: number) => {
    setIsSelectedData(prev => prev.filter(item => item.id !== itemId));
    setSelectedItems(prev => prev.filter(id => id !== itemId));
  };
  const [selectedItems, setSelectedItems] = useState<(string | number)[]>([]);

  // Función para actualizar las selecciones desde cualquier contenedor
  const updateSelections = (containerId: 'left' | 'right', selected: (string | number)[]) => {
    // Obtener los IDs de los items en el contenedor actual
    const containerItems = containerId === 'left'
      ? data.slice(0, 3).map(item => item.id)
      : data.slice(3, 6).map(item => item.id);

    // Filtrar las selecciones actuales para mantener solo las que no pertenecen al contenedor actual
    const otherContainerSelections = selectedItems.filter(id =>
      !containerItems.includes(Number(id))
    );

    // Combinar con las nuevas selecciones de este contenedor
    const newSelectedItems = [...otherContainerSelections, ...selected];

    // Actualizar el estado global
    setSelectedItems(newSelectedItems);

    // Actualizar isSelectedData
    const selectedItemsData = newSelectedItems.map(id => {
      const item = data.find(d => d.id === Number(id));
      return item ? { id: item.id, name: item.name } : null;
    }).filter(item => item !== null) as { id: number, name: string }[];

    setIsSelectedData(selectedItemsData);
  };

  const data = [
    { name: 'Todos', id: 0 },
    { name: 'ARSA', id: 1 },
    { name: 'Clíma', id: 2 },
    { name: 'Seguridad', id: 3 },
    { name: 'STRACK', id: 4 },
    { name: 'Files', id: 5 },
  ]
  return (
    <>
      <div className="container mx-auto h-full w-full flex flex-col justify-start items-center">
        <h1 className="text-2xl font-bold my-6">WIBOTs</h1>

        <section className="h-full w-full grid grid-cols-12 mb-10">
          <div className='col-span-2 border-e border-primary/10 flex flex-col justify-start items-center'>
            <CardContainer
              items={data.slice(0, 3).map(item => ({ id: item.id, content: item.name }))}
              selectedItems={selectedItems}
              onSelectionChange={(selected) => updateSelections('left', selected)}
            />
          </div>
          <div className='col-span-8 '>
            <ChatPage isSelected={isSelectedData} removeSelectedItem={removeSelectedItem} />
          </div>
          <div className='col-span-2 border-s border-primary/10 flex flex-col justify-start items-center'>
            <CardContainer
              items={data.slice(3, 6).map(item => ({ id: item.id, content: item.name }))}
              selectedItems={selectedItems}
              onSelectionChange={(selected) => updateSelections('right', selected)}
            />
          </div>
        </section>
        <p>
          {selectedItems}
        </p>
      </div>
    </>
  )
}

export default App



