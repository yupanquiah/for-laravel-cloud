import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '../ui/checkbox';
import { ColumnHeader } from './column-header';
import { RowActions } from './row-actions';

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
      accessorKey: 'id',
      header: ({ column }) => <ColumnHeader column={column} title="Id" />,
      cell: ({ row }) => <div className="w-[80px]">{row.getValue('id')}</div>,
      enableSorting: false,
      enableHiding: true,
    },
  ];
}
export function EndColumns<T>(): ColumnDef<T>[] {
  return [
    {
      id: 'actions',
      cell: ({ row }) => <RowActions />,
    },
  ];
}
