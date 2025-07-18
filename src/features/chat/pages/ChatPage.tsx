import { useState } from "react"
import ChatInput from "../components/ChatInput"
import ChatResults from "../components/ChatResults"
import { useChat } from "../hooks/useChat"

interface ChatPageProps {
    isSelected?: { id: number, name: string }
    removeSelectedItem: () => void
}

function ChatPage({ isSelected, removeSelectedItem }: ChatPageProps) {
    const [results, setResults] = useState<boolean>(false)
    const { messages, loading, error, sendMessage, isConnected } = useChat()

    return (
        <div className="h-full w-full flex flex-col overflow-hidden ">
            <div className={`${results ? 'flex-1' : 'flex-none'} overflow-hidden transition-all duration-500`}>
                <ChatResults
                    setResults={setResults}
                    results={results}
                    messages={messages}
                    loading={loading}
                    error={error}
                    isConnected={isConnected}
                />
            </div>
            {!results && <div className="flex-1"></div>}
            <div className="flex-shrink-0">
                <ChatInput
                    isSelected={isSelected}
                    setResults={setResults}
                    results={results}
                    removeSelectedItem={removeSelectedItem}
                    onSendMessage={sendMessage}
                    loading={loading}
                />
            </div>
            {!results && <div className="flex-1"></div>}
        </div>
    )
}

export default ChatPage



