import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect } from 'react';

import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CompanySettingsLayout from '@/layouts/admin/settings/layout';
import AppLayout from '@/layouts/app-layout';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Configuración',
    href: '/settings',
  },
  {
    title: 'Editar empresa',
    href: '/settings/company',
  },
];

interface Identity {
  id: string;
  company_name: string;
  mail: string;
  phone: string;
  nit: string;
  type_company: string;
}

interface Props {
  identity: Identity;
}

const updateIdentity = ({ identity }: Props) => {
  const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<Required<Identity>>({
    id: identity.id,
    company_name: identity.company_name,
    mail: identity.mail,
    phone: identity.phone,
    nit: identity.nit,
    type_company: identity.type_company,
  });

  useEffect(() => {
    setData({
      id: identity.id,
      mail: identity.mail,
      company_name: identity.company_name,
      phone: identity.phone,
      nit: identity.nit,
      type_company: identity.type_company,
    });
  }, [identity, setData]);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    patch(route('identity.update', { id: identity.id }), {
      preserveScroll: true,
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Profile settings" />
      <CompanySettingsLayout className="space-y-6">
        <HeadingSmall title="Informacipon de la empresa" description="Actualizar su razón social, correo y etc de la empresa" />
        <form onSubmit={submit}>
          <main className="grid grid-cols-3 gap-x-4 gap-y-6">
            <Label className="grid gap-2" htmlFor="name">
              Razón social
              <Input
                id="company_name"
                className="mt-1 block w-full"
                value={data.company_name}
                onChange={(e) => setData('company_name', e.target.value)}
                required
                autoComplete="company_name"
                placeholder="Razón social"
              />
              <InputError className="mt-2" message={errors.company_name} />
            </Label>
            <Label className="grid gap-2" htmlFor="email">
              Dirección de correo electrónico
              <Input
                id="mail"
                type="email"
                className="mt-1 block w-full"
                value={data.mail}
                onChange={(e) => setData('mail', e.target.value)}
                required
                autoComplete="mail"
                placeholder="Dirección de correo electrónico"
              />
              <InputError className="mt-2" message={errors.mail} />
            </Label>
            <Label className="grid gap-2" htmlFor="email">
              NIT
              <Input
                id="nit"
                type="text"
                className="mt-1 block w-full"
                value={data.nit}
                onChange={(e) => setData('nit', e.target.value)}
                required
                autoComplete="nit"
                placeholder="nit"
              />
              <InputError className="mt-2" message={errors.nit} />
            </Label>
            <Label className="grid gap-2" htmlFor="email">
              Telefono
              <Input
                id="phone"
                type="text"
                className="mt-1 block w-full"
                value={data.phone}
                onChange={(e) => setData('phone', e.target.value)}
                required
                autoComplete="phone"
                placeholder="Telefono"
              />
              <InputError className="mt-2" message={errors.phone} />
            </Label>
            <Label className="grid gap-2" htmlFor="email">
              Tipo de empresa
              <Input
                id="type_company"
                type="text"
                className="mt-1 block w-full"
                value={data.type_company}
                onChange={(e) => setData('type_company', e.target.value)}
                required
                autoComplete="type_company"
                placeholder="Tipo de empresa"
              />
              <InputError className="mt-2" message={errors.type_company} />
            </Label>
            <Label className="cursor- grid gap-2 opacity-0" htmlFor="email">
              Vacio
              <Input id="text" type="text" className="mt-1 block w-full" value="" />
              <InputError className="mt-2" message="" />
            </Label>
            <div className="flex items-center gap-4">
              <Button disabled={processing}>Actualizar</Button>

              <Transition
                show={recentlySuccessful}
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
              >
                <p className="text-sm text-neutral-600">Guardado</p>
              </Transition>
            </div>
          </main>
        </form>
        <DeleteUser />
      </CompanySettingsLayout>
    </AppLayout>
  );
};

export default updateIdentity;
