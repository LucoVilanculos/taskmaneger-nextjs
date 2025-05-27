'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface SuccessModalProps {
  show: boolean
  message: string
  redirectTo: string
  delay?: number
}

export const SuccessModal = ({ show, message, redirectTo, delay = 2000 }: SuccessModalProps) => {
  const router = useRouter()

  useEffect(() => {
    if (show) {
      const timeout = setTimeout(() => {
        router.push(redirectTo)
      }, delay)
      return () => clearTimeout(timeout)
    }
  }, [show, redirectTo, delay, router])

  return (
    <Dialog open={show}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-green-600 text-center text-2xl">✅ Success</DialogTitle>
        </DialogHeader>
        <p className="text-center text-gray-700">{message}</p>
      </DialogContent>
    </Dialog>
  )
}
