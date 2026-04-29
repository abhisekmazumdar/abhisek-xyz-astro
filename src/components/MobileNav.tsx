import { useState } from 'react';
import { MenuIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const navLinks = [
  { href: '/logs', label: 'logs' },
  { href: '/uses', label: 'uses' },
];

export default function MobileNav({ currentPath }: { currentPath: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className="p-2 rounded-md hover:bg-[var(--accent-ui)] text-[var(--accent)] cursor-pointer border-0 bg-transparent"
          aria-label="Open navigation menu"
        >
          <MenuIcon size={18} />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-64 bg-[var(--header-bg)] border-[rgb(var(--gray-light))]">
        <SheetHeader>
          <SheetTitle className="text-[rgb(var(--black))] text-left font-bold">Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-6 mt-2">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={[
                'px-3 py-2 rounded-md text-base font-medium no-underline transition-colors',
                currentPath === href || currentPath.startsWith(href + '/')
                  ? 'bg-[var(--accent)] text-white'
                  : 'text-[rgb(var(--black))] hover:bg-[rgb(var(--gray-light))]',
              ].join(' ')}
            >
              {label}
            </a>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
