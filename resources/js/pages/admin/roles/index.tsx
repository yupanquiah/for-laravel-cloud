import { CardDescription, CardTitle } from '@/components/ui/card'
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Head, usePage } from '@inertiajs/react'
import { CreateRole } from './create'
import { Tabla } from './tabla'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Roles',
    href: '/role',
  },
];

export default function Role() {
  const { roles } = usePage().props;

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
        <main>
          <Tabla data={roles} />
        </main>
        <footer></footer>
      </section>
    </AppLayout>
  );
}
