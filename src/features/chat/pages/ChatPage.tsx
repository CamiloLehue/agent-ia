import { useState } from "react"
import ChatInput from "../components/ChatInput"
import ChatResults from "../components/ChatResults"


interface ChatPageProps {
    isSelected: [number][]
}
function ChatPage({ isSelected }: ChatPageProps) {

    console.log("Mis consultas seleccionadas", isSelected)

    const [results, setResults] = useState<boolean>(false)
    return (
        <div className="relative max-w-4xl mx-auto p-4 h-full w-full flex flex-col justify-start ">
            <ChatResults setResults={setResults} results={results} />
            <ChatInput setResults={setResults} results={results} />
        </div>
    )
}

export default ChatPage



