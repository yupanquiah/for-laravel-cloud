import { DataTable } from '@/components/table/table'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { CardDescription, CardTitle } from '@/components/ui/card'
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Head, router, usePage } from '@inertiajs/react'
import { useCallback, useState } from 'react'
import { toast, Toaster } from 'sonner'
import { CreateRole } from './create'
import { RoleColumns } from './role-columns'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Roles',
    href: '/role',
  },
]

export interface Role {
  id: string
  name: string
  description?: string
}

export default function Role () {
  const { roles } = usePage<{ roles: Role[] }>().props

  const [openDialog, setOpenDialog] = useState(false)
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null)


  const onEdit = useCallback((role: Role) => alert(`on edit ${role.id}`), [])

  const onDelete = useCallback((role: Role) => {
    setRoleToDelete(role)
    setOpenDialog(true)
  }, [])

  const confirmDelete = () => {
    if (roleToDelete) {
      router.delete(route('role.destroy', roleToDelete.id), {
        onSuccess: () => {
          setOpenDialog(false)
          setRoleToDelete(null)
          toast.success(`El rol ${roleToDelete.name} ha sido eliminado correctamente`)
        },
        onError: (errors) => {
          setOpenDialog(false)
          toast.error(`Error al eliminar el rol: ${roleToDelete.name}`, {
            description: errors.message || "Ha ocurrido un error inesperado",
            duration: 5000
          })
        }
      })
    }
  }

  const onShow = useCallback((role: Role) => alert(`on delete ${role.id}`), [])

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
        <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
          <AlertDialogContent>
            <AlertDialogTitle>¿Eliminar rol?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. ¿Seguro que deseas eliminar el rol <b>{roleToDelete?.name}</b>?
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel >
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete}>
                Eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <main className="py-8">
          <DataTable data={roles} columns={RoleColumns({ onEdit, onShow, onDelete })} />
        </main>
      </section>
      <Toaster richColors position='bottom-right' />
    </AppLayout>
  )
}
