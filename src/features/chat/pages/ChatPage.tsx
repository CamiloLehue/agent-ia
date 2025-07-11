import ChatInput from "../components/ChatInput"

function ChatPage() {
    return (
        <div className="relative max-w-4xl mx-auto p-4 h-full w-full flex flex-col justify-start mt-30">
            <div className="w-full flex justify-center items-center py-5">
                <h1 className="font-bold text-primary"><span className="text-danger/80">WI</span>BOT</h1>
            </div>
            <ChatInput />
        </div>
    )
}

export default ChatPage



