'use client'

import { Header, Sidebar, BottomNav } from '@/components/layout'

export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen flex-col bg-secondary-50">
            {/* Header (Mobile & Desktop) */}
            <Header />

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar (Desktop Only) */}
                <aside className="hidden w-64 flex-col border-r border-secondary-200 bg-white lg:flex">
                    <Sidebar />
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
                    <div className="mx-auto max-w-5xl">
                        {children}
                    </div>
                </main>
            </div>

            {/* Bottom Navigation (Mobile Only) */}
            <div className="lg:hidden">
                <BottomNav />
            </div>
        </div>
    )
}
