'use client'

import Link from 'next/link'
import { Bell, User } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function Header() {
    return (
        <header className="sticky top-0 z-40 w-full border-b border-secondary-200 bg-white shadow-sm">
            <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-primary-500">기억책방</span>
                    </Link>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2 sm:gap-4">
                    <Button variant="ghost" size="icon" className="text-secondary-600 rounded-full" aria-label="알림">
                        <Bell className="h-6 w-6" />
                    </Button>

                    <Link href="/profile">
                        <Button variant="ghost" size="icon" className="text-secondary-600 rounded-full" aria-label="내 프로필">
                            <User className="h-6 w-6" />
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}
