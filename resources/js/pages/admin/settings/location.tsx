import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';

import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from '@/components/ui/select';
import useFetchCountries from '@/hooks/use-fetch-countries';
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

interface CompanyLocation {
  id: string;
  country: string;
  department: string;
  city: string;
  address: string;
  postal_code: string;
}

interface Props {
  location: CompanyLocation;
}

const updateLocation = ({ location }: Props) => {
  const { countries, error } = useFetchCountries();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // State
  const [selectedCountry, setSelectedCountry] = useState<number | null>(null);
  const [selectedState, setSelectedState] = useState<number | null>(null);

  const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<Required<CompanyLocation>>({
    id: location.id,
    country: location.country,
    department: location.department,
    city: location.city,
    address: location.address,
    postal_code: location.postal_code,
  });

  useEffect(() => {
    setData({
      id: location.id,
      country: location.country,
      department: location.department,
      city: location.city,
      address: location.address,
      postal_code: location.postal_code,
    });

    const fetchInitialData = async () => {
      if (location.country) {
        const statesRes = await fetch(`/api/countries/${location.country}/states`);
        const statesData = await statesRes.json();
        setStates(statesData);

        if (location.department) {
          const citiesRes = await fetch(`/api/states/${location.department}/cities`);
          const citiesData = await citiesRes.json();
          setCities(citiesData);
        }
      }
    };

    fetchInitialData();
  }, [location, setData]);

  const handleCountryChange = async (id: number) => {
    setSelectedCountry(id);
    setData('country', id.toString());

    const res = await fetch(`/api/countries/${id}/states`);
    const data = await res.json();

    setStates(data);
    setCities([]);
    setData('department', '');
    setData('city', '');
  };

  // Manejo de cambio de estado
  const handleStateChange = async (id: number) => {
    setSelectedState(id); // Establece el estado seleccionado
    setData('department', id.toString()); // Actualiza el dato de estado en el formulario

    // Solicita las ciudades del estado seleccionado
    const res = await fetch(`/api/states/${id}/cities`);
    const data = await res.json();
    setCities(data); // Establece las ciudades para el estado seleccionado
    setData('city', ''); // Resetea la ciudad
  };

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    patch(route('location.update', { id: location.id }), {
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
              Pais
              <Select onValueChange={(value) => handleCountryChange(Number(value))}>
                <SelectTrigger disabled={processing} value={data.country} className="w-full">
                  {countries?.find((country: { id: number; name: string }) => country.id.toString() === data.country)?.name || 'Selecciona un país'}
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Países</SelectLabel>
                    {countries.map((country) => (
                      <SelectItem key={country.id} value={country.id.toString()}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <InputError className="mt-2" message={errors.country} />
            </Label>
            <Label className="grid gap-2" htmlFor="email">
              Departamento
              <Select onValueChange={(value) => handleStateChange(Number(value))}>
                <SelectTrigger disabled={processing} value={data.department} className="w-full">
                  {states.find((state) => state.id.toString() === data.department)?.name || 'Selecciona un estado'}
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Estados</SelectLabel>
                    {states.map((state) => (
                      <SelectItem key={state.id} value={state.id.toString()}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <InputError className="mt-2" message={errors.department} />
            </Label>
            <Label className="grid gap-2" htmlFor="email">
              Ciudad
              <Select onValueChange={(value) => setData('city', value)}>
                <SelectTrigger disabled={processing} value={data.city} className="w-full">
                  {cities.find((city) => city.name === data.city)?.name || 'Selecciona una ciudad'}
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Ciudades</SelectLabel>
                    {cities.map((city) => (
                      <SelectItem key={city.id} value={city.name}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <InputError className="mt-2" message={errors.city} />
            </Label>
            <Label className="grid gap-2" htmlFor="email">
              Ubicación
              <Input
                id="address"
                type="text"
                className="mt-1 block w-full"
                value={data.address}
                onChange={(e) => setData('address', e.target.value)}
                required
                autoComplete="address"
                placeholder="Telefono"
              />
              <InputError className="mt-2" message={errors.address} />
            </Label>
            <Label className="grid gap-2" htmlFor="email">
              Codigo postal
              <Input
                id="postal_code"
                type="text"
                className="mt-1 block w-full"
                value={data.postal_code}
                onChange={(e) => setData('postal_code', e.target.value)}
                required
                autoComplete="postal_code"
                placeholder="Tipo de empresa"
              />
              <InputError className="mt-2" message={errors.postal_code} />
            </Label>
            <Label className="cursor- grid gap-2 opacity-0" htmlFor="email">
              Vacio
              <Input id="text" type="text" className="mt-1 block w-full" value="" />
              <InputError className="mt-2" message="" />
            </Label>
            <div className="flex w-full items-center gap-4">
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
      </CompanySettingsLayout>
    </AppLayout>
  );
};

export default updateLocation;
