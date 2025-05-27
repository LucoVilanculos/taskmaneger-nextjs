'use client'

import { ReactNode, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function VisitorLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [name, setName] = useState<string | null>(null)

  useEffect(() => {
    const storedName = localStorage.getItem('useName')
    setName(storedName)
  })

  const handleLogout = () => {
    localStorage.clear()
    router.push('/visitor')
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header name={name ?? undefined} onLogout={handleLogout}/>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
