import { DataTable } from '@/components/table/table';
import { CardDescription, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { CreateUser } from './create';
import { DeleteUser } from './delete';
import { EditUser } from './edit';
import { ShowUser } from './show';
import { UserColumns } from './user-colmns';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Usuarios',
    href: '/user',
  },
];

export interface UserProps {
  id: string;
  name: string;
  email: string;
  password: string;
  company_id: string;
}

export default function User() {
  const { users } = usePage<{ users: UserProps[] }>().props;

  const [userToDelete, setUserToDelete] = useState<UserProps | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const [userToShow, setUserToShow] = useState<UserProps | null>(null);
  const [openShowDialog, setOpenShowDialog] = useState(false);

  const [userToEdit, setUserToEdit] = useState<UserProps | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const onEdit = useCallback((user: UserProps) => {
    setUserToEdit(user);
    setOpenEditDialog(true);
  }, []);

  const onShow = useCallback((user: UserProps) => {
    setUserToShow(user);
    setOpenShowDialog(true);
  }, []);

  const confirmDelete = () => {
    if (userToDelete) {
      router.delete(route('user.destroy', userToDelete.id), {
        onSuccess: () => {
          setOpenDialog(false);
          setUserToDelete(null);
          toast.success(`El rol ${userToDelete.name} ha sido eliminado correctamente`);
        },
        onError: (errors) => {
          setOpenDialog(false);
          toast.error(`Error al eliminar el rol: ${userToDelete.name}`, {
            description: errors.message || 'Ha ocurrido un error inesperado',
            duration: 5000,
          });
        },
      });
    }
  };

  const onDelete = useCallback((user: UserProps) => {
    setUserToDelete(user);
    setOpenDialog(true);
  }, []);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Usuarios" />
      <section className="p-4">
        <header className="flex justify-between">
          <section className="space-y-4">
            <CardTitle>Usuarios</CardTitle>
            <CardDescription>Lista de todos los usuarios</CardDescription>
          </section>
          <CreateUser />
        </header>
        <main className="py-8">
          <DeleteUser open={openDialog} onOpenChange={setOpenDialog} user={userToDelete} onConfirm={confirmDelete} />
          <ShowUser open={openShowDialog} onOpenChange={setOpenShowDialog} user={userToShow} />
          <EditUser open={openEditDialog} onOpenChange={setOpenEditDialog} user={userToEdit} />
          <DataTable data={users} columns={UserColumns({ onEdit, onShow, onDelete })} />
        </main>
      </section>
    </AppLayout>
  );
}
