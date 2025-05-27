export interface TaskProps {
    id: string
    text: string
    done: boolean
    createdAt: string
}

export type props = {
    task: TaskProps
    onToggle: (id: string) => void
    onDelete: (id: string) => void
}