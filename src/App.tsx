import { useState } from 'react';
import CardContainer from './components/ui/CardContainer';
import ChatPage from './features/chat/pages/ChatPage';


function App() {
  const [isSelectedData, setIsSelectedData] = useState<{ id: number, name: string } | undefined>(undefined);

  const removeSelectedItem = () => {
    setIsSelectedData(undefined);
    setSelectedItem(null);
  };
  const [selectedItem, setSelectedItem] = useState<string | number | null>(null);

  const updateSelection = (selected: string | number | null) => {
    setSelectedItem(selected);

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
    <div className="flex-1 grid grid-cols-12 px-4 min-h-0 h-full container mx-auto">
      <div className='col-span-2  border-e border-primary/10 flex flex-col justify-start items-center '>
        <CardContainer
          items={data.slice(0, 3).map(item => ({ id: item.id, content: item.name }))}
          selectedItem={selectedItem}
          onSelectionChange={updateSelection}
        />
      </div>
      <div className='col-span-8  '>
        <ChatPage isSelected={isSelectedData} removeSelectedItem={removeSelectedItem} />
      </div>
      <div className='col-span-2   border-s border-primary/10 flex flex-col justify-start items-center '>
        <CardContainer
          items={data.slice(3, 6).map(item => ({ id: item.id, content: item.name }))}
          selectedItem={selectedItem}
          onSelectionChange={updateSelection}
        />
      </div>
    </div>
  )
}

export default App



