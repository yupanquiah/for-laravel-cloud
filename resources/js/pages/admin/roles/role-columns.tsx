import { ColumnHeader } from '@/components/table/column-header'
import { EndColumns, StartColumns } from '@/components/table/columns'
import { ColumnDef } from '@tanstack/react-table'

interface Role {
  id: string,
  name: string
}

export const RoleColumns: ColumnDef<Role>[] = [
  ...StartColumns<Role>(),
  {
    accessorKey: "name",
    header: ({ column }) => <ColumnHeader column={column} title="Rol" />,
    cell: ({ row }) => <span className="capitalize">{row.getValue("name")}</span>,
  },
  ...EndColumns<Role>(),
]
