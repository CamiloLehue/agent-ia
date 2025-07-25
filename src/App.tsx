import { useState } from 'react';
import CardContainer from './components/ui/CardContainer';
import ChatPage from './features/chat/pages/ChatPage';


function App() {
  // Preseleccionar STRACK (ID 4) por defecto
  const [isSelectedData, setIsSelectedData] = useState<{ id: number, name: string } | undefined>({ id: 4, name: 'STRACK' });

  const removeSelectedItem = () => {
    setIsSelectedData(undefined);
    setSelectedItem(null);
  };
  const [selectedItem, setSelectedItem] = useState<string | number | null>(4);

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
    { name: 'STRACK', id: 4 },
    { name: 'Documentos', id: 5 },
    { name: 'ARSA', id: 1 },
    { name: 'Clíma', id: 2 },
    { name: 'Seguridad', id: 3 },
  ]

  //  const data = [
  //   { name: 'Todos', id: 0 },
  //   { name: 'STRACK', id: 4 },
  //   { name: 'ARSA', id: 1 },
  //   { name: 'Clíma', id: 2 },
  //   { name: 'Seguridad', id: 3 },
  //   { name: 'Files', id: 5 },
  // ]
  return (
    // <div className="flex-1 grid grid-cols-12 px-4 min-h-0 h-full container mx-auto">
    //   <div className='col-span-2  border-e border-primary/10 flex flex-col justify-start items-center '>
    //     <CardContainer
    //       items={data.slice(0, 3).map(item => ({ id: item.id, content: item.name }))}
    //       selectedItem={selectedItem}
    //       onSelectionChange={updateSelection}
    //     />
    //   </div>
    //   <div className='col-span-8  '>
    //     <ChatPage isSelected={isSelectedData} removeSelectedItem={removeSelectedItem} />
    //   </div>
    //   <div className='col-span-2 border-s border-primary/10 flex flex-col justify-start items-center '>
    //     <CardContainer
    //       items={data.slice(3, 6).map(item => ({ id: item.id, content: item.name }))}
    //       selectedItem={selectedItem}
    //       onSelectionChange={updateSelection}
    //     />
    //   </div>
    // </div>
     <div className="relative flex-1 grid grid-cols-12  h-full w-full">
      <div className='col-span-4 bg-secondary h-[858px] border border-accent/20 rounded-e-xl'></div>
      <div className='col-span-8 '>
      <div className='px-4'>
        <CardContainer
          items={data.slice(0, 6).map(item => ({ id: item.id, content: item.name }))}
          selectedItem={selectedItem}
          onSelectionChange={updateSelection}
        />
      </div>
        <ChatPage isSelected={isSelectedData} removeSelectedItem={removeSelectedItem} />
      </div>
      
    </div>
  )
}

export default App



