import CompanyLayout from '@/layouts/admin/company/company-layout';
import { Head } from '@inertiajs/react';
import CompanyCreate from './create';

export default function Company() {
  return (
    <CompanyLayout title="Crear una nueva empresa" description="Agrega la información de tu empresa aquí.">
      <Head title="Empresa" />
      <section className="p-4">
        <CompanyCreate />
      </section>
    </CompanyLayout>
  );
}
