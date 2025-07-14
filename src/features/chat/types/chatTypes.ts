export interface ChatItemType {
    prompt: string
    typeSearch: number
}

export interface ChatMessage {
    id: string
    content: string
    role: 'user' | 'assistant'
    timestamp: Date
    selectedItem?: {id: number, name: string}
}

export interface ChatResponse {
    message: string
    success: boolean
    error?: string
}

export interface SendMessageRequest {
    prompt: string
    selectedItem?: {id: number, name: string}
}