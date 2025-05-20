import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '../ui/checkbox';
import { ColumnHeader } from './column-header';
import { RowActions } from './row-actions';

interface EndColumnsProps<T> {
  onEdit: (row: T) => void;
  onDelete: (row: T) => void;
  onShow: (row: T) => void;
}

export function StartColumns<T>(): ColumnDef<T>[] {
  return [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'nro',
      header: ({ column }) => <ColumnHeader column={column} title="Nro" />,
      cell: ({ row }) => <div className="w-[80px]">{row.index + 1}</div>,
      enableSorting: false,
      enableHiding: true,
    },
  ];
}

export function EndColumns<T>({ onEdit, onDelete, onShow }: EndColumnsProps<T>): ColumnDef<T>[] {
  return [
    {
      id: 'actions',
      cell: ({ row }) => <RowActions row={row} onEdit={onEdit} onDelete={onDelete} onShow={onShow} />,
    },
  ];
}
