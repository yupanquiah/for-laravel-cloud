import { ColumnHeader } from '@/components/table/column-header';
import { EndColumns, StartColumns } from '@/components/table/columns';
import { ColumnDef } from '@tanstack/react-table';

interface Role {
  id: string;
  name: string;
}

interface RoleColumnsOptions {
  onEdit: (role: Role) => void;
  onDelete: (role: Role) => void;
  onShow: (role: Role) => void;
}

export function RoleColumns({ onEdit, onDelete, onShow }: RoleColumnsOptions): ColumnDef<Role>[] {
  return [
    ...StartColumns<Role>(),
    {
      accessorKey: 'name',
      header: ({ column }) => <ColumnHeader column={column} title="Rol" />,
      cell: ({ row }) => <span className="capitalize">{row.getValue('name')}</span>,
    },
    ...EndColumns<Role>({ onEdit, onShow, onDelete }),
  ];
}
