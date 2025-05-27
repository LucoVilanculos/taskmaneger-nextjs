"use client"

import { useState } from "react"
import * as z from 'zod';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

const taskSchema = z.object({
    task: z.string().min(1, 'Task cannoit empty')
})


export const Task = () => {
    const [task, setTask] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = () => {
        const result = taskSchema.safeParse({task})

        if (!result.success) {
        setError(result.error.errors[0].message)
        return
    }
    
    }

    
    
    return  (
        <div className="flex flex-col gap 2 w-full max-w-md mx-auto">
            <div className="fex gap-2">
                <Input
                    placeholder="Type you task..."
                    value={task}
                    onChange={(e) => { setTask(e.target.value) }}
                    className={cn(error && 'border-red-500')}
                />
                <Button onClick={handleSubmit}> <Plus />
                    <Plus className="h-4 w-4 mr-2"/> Add
                </Button>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    )
}

export default Task