import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Administración',
    href: '/admin',
  },
];

interface Admin {
  company_name: string;
  total_roles: number;
}

const Admin = ({ company_name, total_roles }: Admin) => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Administrador" />
      <main className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <h3 className="text-2xl font-semibold tracking-tight">Bienvenido {company_name}</h3>
        <section>
          <Card className="p-4">Total de roles {total_roles}</Card>
        </section>
      </main>
    </AppLayout>
  );
};

export default Admin;
