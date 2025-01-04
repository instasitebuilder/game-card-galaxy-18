import React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"

const Terms = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-game">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
            <div className="prose prose-invert">
              <p className="text-white/80">
                Welcome to BrainGames. By accessing our website, you agree to these terms of service.
              </p>
              {/* Add more terms content as needed */}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default Terms