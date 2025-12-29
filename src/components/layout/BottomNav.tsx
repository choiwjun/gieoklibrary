'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, PenTool, BookOpen, Users, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const mobileNavigation = [
    { name: '홈', href: '/dashboard', icon: Home },
    { name: '쓰기', href: '/biography', icon: PenTool },
    { name: '서재', href: '/library', icon: BookOpen },
    { name: '커뮤니티', href: '/community', icon: Users },
    { name: 'MY', href: '/profile', icon: User },
]

export function BottomNav() {
    const pathname = usePathname()

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-secondary-200 bg-white pb-safe">
            <nav className="flex h-16 items-center justify-around px-2">
                {mobileNavigation.map((item) => {
                    const isActive = pathname.startsWith(item.href)
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                'flex flex-col items-center justify-center gap-1 rounded-lg px-2 py-1 min-w-[60px]',
                                isActive ? 'text-primary-600' : 'text-secondary-500 hover:text-secondary-900'
                            )}
                        >
                            <item.icon className={cn('h-6 w-6', isActive && 'fill-primary-100')} />
                            <span className="text-xs font-medium">{item.name}</span>
                        </Link>
                    )
                })}
            </nav>
        </div>
    )
}
