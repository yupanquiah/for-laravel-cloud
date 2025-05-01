import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import CompanyCreate from './create';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Empresa',
    href: '/company',
  },
];

export default function Company() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Empresa" />
      <section className="p-4">
        <CompanyCreate />
      </section>
    </AppLayout>
  );
}
