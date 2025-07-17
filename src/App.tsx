import { useState } from 'react';
import CardContainer from './components/ui/CardContainer';
import ChatPage from './features/chat/pages/ChatPage';
import NetworkDemo from './features/examples/NetworkDemo';

type AppView = 'main' | 'network-demo';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('main');
  const [isSelectedData, setIsSelectedData] = useState<{ id: number, name: string } | undefined>(undefined);

  const removeSelectedItem = () => {
    setIsSelectedData(undefined);
    setSelectedItem(null);
  };
  const [selectedItem, setSelectedItem] = useState<string | number | null>(null);

  // Función para actualizar la selección desde cualquier contenedor
  const updateSelection = (selected: string | number | null) => {
    // Actualizar el estado global
    setSelectedItem(selected);

    // Actualizar isSelectedData
    if (selected !== null) {
      const item = data.find(d => d.id === Number(selected));
      if (item) {
        setIsSelectedData({ id: item.id, name: item.name });
      }
    } else {
      setIsSelectedData(undefined);
    }
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
    <div className="w-full ">
      <div className=" w-full flex flex-col pb-4">
        <div className="flex-1 grid grid-cols-12 gap-4 px-4 overflow-hidden min-h-0">
          <div className='col-span-2 border-e border-primary/10 flex flex-col justify-start items-center overflow-hidden'>
            <CardContainer
              items={data.slice(0, 3).map(item => ({ id: item.id, content: item.name }))}
              selectedItem={selectedItem}
              onSelectionChange={updateSelection}
            />
          </div>
          <div className='col-span-8 overflow-hidden'>
            <ChatPage isSelected={isSelectedData} removeSelectedItem={removeSelectedItem} />
          </div>
          <div className='col-span-2 border-s border-primary/10 flex flex-col justify-start items-center overflow-hidden'>
            <CardContainer
              items={data.slice(3, 6).map(item => ({ id: item.id, content: item.name }))}
              selectedItem={selectedItem}
              onSelectionChange={updateSelection}
            />
          </div>
        </div>
        {selectedItem && (
          <div className="flex-shrink-0 text-center py-2 text-primary/70">
            Seleccionado: {selectedItem}
          </div>
        )}
      </div>
    </div>
  )
}

export default App



