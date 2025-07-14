export interface ChatItemType {
    prompt: string
    typeSearch: number
}

export interface ChatMessage {
    id: string
    content: string
    role: 'user' | 'assistant'
    timestamp: Date
    selectedItems?: {id: number, name: string}[]
}

export interface ChatResponse {
    message: string
    success: boolean
    error?: string
}

export interface SendMessageRequest {
    prompt: string
    selectedItems: {id: number, name: string}[]
}