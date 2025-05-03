import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';

interface CreateCompany {
  country: string;
  company_name: string;
  type_company: string;
  nit: string;
  phone: string;
  mail: string;
  tax_amount: number;
  tax_name: string;
  currency: string;
  address: string;
  city: string;
  department: string;
  postal_code: string;
  logo: File;
}

export default function CompanyCreate() {
  // List
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [currencies, setCurrencies] = useState([]);

  // State
  const [selectedCountry, setSelectedCountry] = useState<number | null>(null);
  const [selectedState, setSelectedState] = useState<number | null>(null);

  const { data, setData, post, processing, errors } = useForm<Required<CreateCompany>>({
    country: '',
    company_name: '',
    type_company: '',
    nit: '',
    phone: '',
    mail: '',
    tax_amount: 0,
    tax_name: '',
    currency: '',
    address: '',
    city: '',
    department: '',
    postal_code: '',
    logo: null,
  });

  useEffect(() => {
    fetch('/api/countries')
      .then((res) => res.json())
      .then((response) => {
        // Verifica si la propiedad 'data' contiene un array
        if (Array.isArray(response.data)) {
          setCountries(response.data); // Usa 'response.data' para obtener el array de países
        } else {
          console.error("Error: La propiedad 'data' no es un array", response);
        }
      })
      .catch((error) => {
        console.error('Error al cargar los países:', error);
      });
  }, []);

  // Manejo de cambio de país
  const handleCountryChange = async (id: number) => {
    setSelectedCountry(id); // Establece el país seleccionado
    setData('country', id.toString()); // Actualiza el dato en el formulario

    // Solicita los estados del país seleccionado
    const res = await fetch(`/api/countries/${id}/states`);
    const data = await res.json();
    setStates(data); // Establece los estados para el país seleccionado
    setCities([]); // Resetea las ciudades
    setData('department', ''); // Resetea el estado
    setData('city', ''); // Resetea la ciudad

    const currencyRes = await fetch(`/api/countries/${id}/currencies`);
    const currencyData = await currencyRes.json();
    setCurrencies(currencyData); // Establece las monedas para el país seleccionado
    setData('currency', '');
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
    post(route('company.store'));
  };

  return (
    <form method="POST" id="create-company" onSubmit={submit} encType="multipart/form-data">
      <section className="grid grid-cols-3 gap-4 py-8">
        <Label className="flex flex-col items-start gap-2">
          Nombre de la Empresa
          <Input
            disabled={processing}
            type="text"
            required
            value={data.company_name}
            onChange={(e) => setData('company_name', e.target.value)}
            id="company_name"
          />
          <InputError message={errors.company_name} />
        </Label>
        <Label className="flex flex-col items-start gap-2">
          Tipo de Empresa
          <Input
            disabled={processing}
            type="text"
            required
            value={data.type_company}
            onChange={(e) => setData('type_company', e.target.value)}
            id="type_company"
          />
          <InputError message={errors.type_company} />
        </Label>
        <Label className="flex flex-col items-start gap-2">
          NIT
          <Input disabled={processing} type="text" required value={data.nit} onChange={(e) => setData('nit', e.target.value)} id="nit" />
          <InputError message={errors.nit} />
        </Label>
        <Label className="flex flex-col items-start gap-2">
          Teléfono
          <Input disabled={processing} type="text" required value={data.phone} onChange={(e) => setData('phone', e.target.value)} id="phone" />
          <InputError message={errors.phone} />
        </Label>
        <Label className="flex flex-col items-start gap-2">
          Correo Electrónico
          <Input disabled={processing} type="text" required value={data.mail} onChange={(e) => setData('mail', e.target.value)} id="mail" />
          <InputError message={errors.mail} />
        </Label>
        <Label className="flex flex-col items-start gap-2">
          Nombre del Impuesto
          <Input
            disabled={processing}
            type="text"
            required
            value={data.tax_name}
            onChange={(e) => setData('tax_name', e.target.value)}
            id="tax_name"
          />
          <InputError message={errors.tax_name} />
        </Label>
        <Label className="flex flex-col items-start gap-2">
          Porcentaje de Impuesto
          <Input
            disabled={processing}
            value={data.tax_amount}
            onChange={(e) => setData('tax_amount', Number(e.target.value))}
            id="tax_amount"
            type="number"
          />
          <InputError message={errors.tax_amount} />
        </Label>
        <Label className="flex flex-col items-start gap-2">
          Pais
          <Select onValueChange={(value) => handleCountryChange(Number(value))}>
            <SelectTrigger disabled={processing} value={data.country} className="w-full">
              <SelectValue placeholder="Selecciona un país" />
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
        </Label>
        <Label className="flex flex-col items-start gap-2">
          Estado / Departamento
          <Select onValueChange={(value) => handleStateChange(Number(value))}>
            <SelectTrigger disabled={processing} value={data.department} className="w-full">
              <SelectValue placeholder="Selecciona un estado" />
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
        </Label>
        <Label className="flex flex-col items-start gap-2">
          Ciudad
          <Select onValueChange={(value) => setData('city', value)}>
            <SelectTrigger disabled={processing} value={data.city} className="w-full">
              <SelectValue placeholder="Selecciona una ciudad" />
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
        </Label>
        <Label className="flex flex-col items-start gap-2">
          Moneda
          <Select onValueChange={(value) => setData('currency', value)}>
            <SelectTrigger disabled={processing} value={data.currency} className="w-full">
              <SelectValue placeholder="Selecciona una moneda" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Monedas</SelectLabel>
                {currencies.map((currency) => (
                  <SelectItem key={currency.id} value={currency.id.toString()}>
                    {currency.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Label>
        <Label className="flex flex-col items-start gap-2">
          Dirección
          <Input disabled={processing} type="text" value={data.address} onChange={(e) => setData('address', e.target.value)} id="address" />
          <InputError message={errors.address} />
        </Label>
        <Label className="flex flex-col items-start gap-2">
          Código Postal
          <Input
            disabled={processing}
            type="text"
            value={data.postal_code}
            onChange={(e) => setData('postal_code', e.target.value)}
            id="postal_code"
          />
          <InputError message={errors.postal_code} />
        </Label>
        <Label className="col-span-2 flex flex-col items-start gap-2">
          Logo
          <Input
            accept=".jpg,.jpeg,.png,.webp"
            disabled={processing}
            onChange={(e) => setData('logo', e.target.files?.[0] ?? null)}
            id="logo"
            type="file"
          />
          <InputError message={errors.logo} />
        </Label>
      </section>
      <Button form="create-company" className="w-full cursor-pointer py-4 font-semibold" type="submit" disabled={processing}>
        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
        Crear empresa
      </Button>
    </form>
  );
}
