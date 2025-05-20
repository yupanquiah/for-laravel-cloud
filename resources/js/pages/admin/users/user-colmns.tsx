import { ColumnHeader } from '@/components/table/column-header';
import { EndColumns, StartColumns } from '@/components/table/columns';
import { ColumnDef } from '@tanstack/react-table';
import { UserProps } from '.';

interface RoleColumnsOptions {
  onEdit: (user: UserProps) => void;
  onDelete: (user: UserProps) => void;
  onShow: (user: UserProps) => void;
}

export function UserColumns({ onEdit, onDelete, onShow }: RoleColumnsOptions): ColumnDef<UserProps>[] {
  return [
    ...StartColumns<UserProps>(),
    {
      accessorKey: 'name',
      header: ({ column }) => <ColumnHeader column={column} title="Nombre" />,
      cell: ({ row }) => <span className="capitalize">{row.getValue('name')}</span>,
    },
    {
      accessorKey: 'email',
      header: ({ column }) => <ColumnHeader column={column} title="Correo" />,
      cell: ({ row }) => <span className="capitalize">{row.getValue('email')}</span>,
    },
    {
      accessorKey: 'company_id',
      header: ({ column }) => <ColumnHeader column={column} title="Empresa" />,
      cell: ({ row }) => <span className="capitalize">{row.getValue('company_id')}</span>,
    },
    ...EndColumns<UserProps>({ onEdit, onShow, onDelete }),
  ];
}
