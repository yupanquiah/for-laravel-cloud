import { Edit, Eye } from '@/components/icons/table-icons';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Row } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

interface RowActionsProps<TData> {
  row: Row<TData>;
  onEdit: (value: TData) => void;
  onShow: (value: TData) => void;
  onDelete: (value: TData) => void;
}

export const RowActions = <TData,>({ row, onEdit, onShow, onDelete }: RowActionsProps<TData>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="data-[state=open]:bg-muted flex h-8 w-8 p-0">
          <MoreHorizontal />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={() => onEdit(row.original)} className="flex cursor-pointer items-center justify-between">
          Editar
          <Edit />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onShow(row.original)} className="flex cursor-pointer items-center justify-between">
          Ver <Eye />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={() => onDelete(row.original)} className="flex cursor-pointer items-center justify-between">
          Eliminar
          <span>⌘⌫</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
