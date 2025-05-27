import { ReactNode } from "react"
import { useEffect, useState } from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function VisitorLayout({ children }: { children: ReactNode }) {
  const [userName, setUserName ] = useState ('')
  
  useEffect(() =>{
    const storedName = localStorage.getItem("userName")
    if (storedName) setUserName(storedName) 
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Header name={userName} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
