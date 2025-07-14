import { useState } from "react"
import ChatInput from "../components/ChatInput"
import ChatResults from "../components/ChatResults"
import { useChat } from "../hooks/useChat"

interface ChatPageProps {
    isSelected: {id: number, name: string}[]
    removeSelectedItem: (itemId: number) => void
}

function ChatPage({ isSelected, removeSelectedItem }: ChatPageProps) {
    const [results, setResults] = useState<boolean>(false)
    const { messages, loading, error, sendMessage, isConnected } = useChat()

    return (
        <div className="relative max-w-4xl mx-auto p-4 h-full w-full flex flex-col justify-start ">
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
            />
        </div>
    )
}

export default ChatPage



