import { DataTable } from '@/components/table/table';
import { CardDescription, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useCallback, useState } from 'react';
import { toast, Toaster } from 'sonner';
import { CreateRole } from './create';
import { DeleteRole } from './delete';
import { EditRole } from './edit';
import { RoleColumns } from './role-columns';
import { ShowRole } from './show';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Roles',
    href: '/role',
  },
];

export interface Role {
  id: string;
  name: string;
  description?: string;
}

export default function Role() {
  const { roles } = usePage<{ roles: Role[] }>().props;

  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const [roleToShow, setRoleToShow] = useState<Role | null>(null);
  const [openShowDialog, setOpenShowDialog] = useState(false);

  const [roleToEdit, setRoleToEdit] = useState<Role | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const onEdit = useCallback((role: Role) => {
    setRoleToEdit(role);
    setOpenEditDialog(true);
  }, []);

  const onShow = useCallback((role: Role) => {
    setRoleToShow(role);
    setOpenShowDialog(true);
  }, []);

  const confirmDelete = () => {
    if (roleToDelete) {
      router.delete(route('role.destroy', roleToDelete.id), {
        onSuccess: () => {
          setOpenDialog(false);
          setRoleToDelete(null);
          toast.success(`El rol ${roleToDelete.name} ha sido eliminado correctamente`);
        },
        onError: (errors) => {
          setOpenDialog(false);
          toast.error(`Error al eliminar el rol: ${roleToDelete.name}`, {
            description: errors.message || 'Ha ocurrido un error inesperado',
            duration: 5000,
          });
        },
      });
    }
  };

  const onDelete = useCallback((role: Role) => {
    setRoleToDelete(role);
    setOpenDialog(true);
  }, []);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Roles" />
      <section className="p-4">
        <header className="flex justify-between">
          <section className="space-y-4">
            <CardTitle>Roles</CardTitle>
            <CardDescription>Una lista de todos los usuarios de su cuenta, incluido su nombre, título, correo electrónico y función.</CardDescription>
          </section>
          <CreateRole />
        </header>
        <DeleteRole open={openDialog} onOpenChange={setOpenDialog} role={roleToDelete} onConfirm={confirmDelete} />
        <ShowRole open={openShowDialog} onOpenChange={setOpenShowDialog} role={roleToShow} />
        <EditRole open={openEditDialog} onOpenChange={setOpenEditDialog} role={roleToEdit} />
        <main className="py-8">
          <DataTable data={roles} columns={RoleColumns({ onEdit, onShow, onDelete })} />
        </main>
      </section>
      <Toaster richColors position="bottom-right" />
    </AppLayout>
  );
}
