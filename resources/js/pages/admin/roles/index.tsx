import { Button } from '@/components/ui/button'
import { CardDescription, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Head } from '@inertiajs/react'
import { } from '@radix-ui/react-dialog'
import { IconPlus } from '@tabler/icons-react'
import CreateRole from './create'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Roles',
    href: '/role',
  },
];

function Role() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Roles" />
      <section className="p-4">
        <header className="flex justify-between">
          <section className="space-y-4">
            <CardTitle>Roles</CardTitle>
            <CardDescription>Una lista de todos los usuarios de su cuenta, incluido su nombre, título, correo electrónico y función.</CardDescription>
          </section>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <IconPlus />
                Agregar
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="mb-4">
                <DialogTitle>Crea un nuevo rol</DialogTitle>
                <DialogDescription>Agrega un nuevo rol aquí. Guarda los cambios cuando termines.</DialogDescription>
              </DialogHeader>
              <CreateRole />
            </DialogContent>
          </Dialog>
        </header>
        <main></main>
        <footer></footer>
      </section>
    </AppLayout>
  );
}

export default Role;
