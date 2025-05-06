import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';

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

interface Logo {
  id: string;
  logo: string | File;
}

interface Props {
  logo: Logo;
}

const CompanyLogo = ({ logo }: Props) => {
  const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<Required<Logo>>({
    id: logo.id,
    logo: logo.logo,
  });

  console.log(logo);

  useEffect(() => {
    setData({
      id: logo.id,
      logo: logo.logo,
    });
  }, [logo, setData]);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    patch(route('profile.update'), {
      preserveScroll: true,
    });
  };

  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setData('logo', file);
      setPreview(URL.createObjectURL(file));
    }
  };

  console.log(logo.logo);
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Profile settings" />
      <CompanySettingsLayout>
        <HeadingSmall className="mb-0" title="Informacipon de la empresa" description="Actualizar su razón social y correo de la empresa" />
        <form onSubmit={submit} className="space-y-6">
          <main className="grid grid-cols-3 grid-rows-3 place-items-start gap-x-4">
            <Label className="grid gap-2 self-end" htmlFor="name">
              Razón social
              <Input
                accept=".jpg,.jpeg,.png,.webp"
                type="file"
                id="logo"
                className="mt-1 block w-full"
                onChange={handleFileChange}
                required
                autoComplete="logo"
                placeholder="Logo"
              />
              <InputError className="mt-2" message={errors.logo} />
            </Label>
            <img className="col-start-1 row-span-2 row-start-2 mt-4 h-auto w-52" src={preview || `${logo.logo}`} alt="logo de la empresa" />
            <footer className="col-start-2 row-start-1 flex items-center gap-4 self-end">
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
            </footer>
          </main>
        </form>
      </CompanySettingsLayout>
    </AppLayout>
  );
};

export default CompanyLogo;
