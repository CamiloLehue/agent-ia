import { useState } from "react"
import ChatInput from "../components/ChatInput"
import ChatResults from "../components/ChatResults"


interface ChatPageProps {
    isSelected: {id: number, name: string}[]
    removeSelectedItem: (itemId: number) => void
}
function ChatPage({ isSelected, removeSelectedItem }: ChatPageProps) {


    const [results, setResults] = useState<boolean>(false)
    return (
        <div className="relative max-w-4xl mx-auto p-4 h-full w-full flex flex-col justify-start ">
            <ChatResults  setResults={setResults} results={results} />
            <ChatInput isSelected={isSelected} setResults={setResults} results={results} removeSelectedItem={removeSelectedItem} />
        </div>
    )
}

export default ChatPage



