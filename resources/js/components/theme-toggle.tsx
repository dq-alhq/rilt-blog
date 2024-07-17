import { useTheme } from '@/components/providers'
import { Button } from '@/components/ui'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <Button
            variant='outline'
            size='icon'
            aria-label={'Switch to ' + theme === 'light' ? 'dark' : 'light' + 'mode'}
            onPress={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
            <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
            <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
        </Button>
    )
}
