import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Row } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'

interface RowActionsProps<TData> {
  row: Row<TData>
}

export const RowActions = () => {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal />
          <span className="sr-only">  Abrir menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>Editar</DropdownMenuItem>
        <DropdownMenuItem>Ver</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='text-red-400/80 hover:bg-red-400/10'>
          Eliminar
          <DropdownMenuShortcut className='text-red-400/80'>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
