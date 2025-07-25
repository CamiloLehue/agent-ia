import { useState } from "react";
import ChatInput from "../components/ChatInput";
import ChatResults from "../components/ChatResults";
import { useChat } from "../hooks/useChat";

interface ChatPageProps {
  isSelected?: { id: number; name: string };
  removeSelectedItem: () => void;
}

function ChatPage({ isSelected, removeSelectedItem }: ChatPageProps) {
  const [results, setResults] = useState<boolean>(false);
  const {
    messages,
    loading,
    error,
    sendMessage,
    isConnected,
    activePdfId,
    activePdfName,
    clearActivePdf,
  } = useChat();

  return (
    <div className="p-5 w-full flex flex-col  gap-2">
      <div className="h-auto w-full flex flex-col overflow-hidden bg-secondary border border-accent/20 rounded-2xl">
        <ChatResults
          setResults={setResults}
          results={results}
          messages={messages}
          loading={loading}
          error={error}
          isConnected={isConnected}
        />
        <ChatInput
          isSelected={isSelected}
          setResults={setResults}
          results={results}
          removeSelectedItem={removeSelectedItem}
          onSendMessage={sendMessage}
          loading={loading}
          activePdfId={activePdfId}
          activePdfName={activePdfName}
          clearActivePdf={clearActivePdf}
        />
      </div>
      <div className="bg-secondary border border-accent/20 w-full h-35 rounded-2xl"></div>
    </div>
  );
}

export default ChatPage;
