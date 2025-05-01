import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePage } from '@inertiajs/react';
import { City, Country, State } from 'country-state-city';
import { useState } from 'react';

const CompanyCreate = () => {
  const { currencies } = usePage().props;

  const [countries] = useState(Country.getAllCountries());
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  const handleCountryChange = (country: any) => {
    setSelectedCountry(country);
    setStates(State.getStatesOfCountry(country.isoCode));
    setCities([]);
  };

  const handleStateChange = (state: any) => {
    setSelectedState(state);
    setCities(City.getCitiesOfState(selectedCountry.isoCode, state.isoCode));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Crear Empresa</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Crear una nueva empresa</DialogTitle>
          <DialogDescription>Agrega la información de tu empresa aquí.</DialogDescription>
        </DialogHeader>

        <Form>
          <section className="grid grid-cols-3 gap-4 py-8">
            <Label className="flex flex-col items-start gap-2">
              Nombre de la Empresa
              <Input id="company_name" />
            </Label>
            <Label className="flex flex-col items-start gap-2">
              Tipo de Empresa
              <Input id="type_company" />
            </Label>
            <Label className="flex flex-col items-start gap-2">
              NIT
              <Input id="nit" />
            </Label>
            <Label className="flex flex-col items-start gap-2">
              Teléfono
              <Input id="phone" />
            </Label>
            <Label className="flex flex-col items-start gap-2">
              Correo Electrónico
              <Input id="mail" type="email" />
            </Label>
            <Label className="flex flex-col items-start gap-2">
              Nombre del Impuesto
              <Input id="tax_name" />
            </Label>
            <Label className="flex flex-col items-start gap-2">
              Porcentaje de Impuesto
              <Input id="tax_amount" type="number" />
            </Label>

            <Label className="flex flex-col items-start gap-2">
              Moneda
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Tu moneda" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Monedas</SelectLabel>
                    {currencies.map(({ name, id }) => (
                      <SelectItem key={id} value={id}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Label>

            <Label className="flex flex-col items-start gap-2">
              País
              <Select
                onValueChange={(value) => {
                  const country = countries.find((c) => c.isoCode === value);
                  handleCountryChange(country);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona un país" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Países</SelectLabel>
                    {countries.map((country) => (
                      <SelectItem key={country.isoCode} value={country.isoCode}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Label>

            <Label className="flex flex-col items-start gap-2">
              Estado / Departamento
              <Select
                onValueChange={(value) => {
                  const state = states.find((s) => s.isoCode === value);
                  handleStateChange(state);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona un estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Estados</SelectLabel>
                    {states.map((state) => (
                      <SelectItem key={state.isoCode} value={state.isoCode}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Label>

            <Label className="flex flex-col items-start gap-2">
              Ciudad
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona una ciudad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Ciudades</SelectLabel>
                    {cities.map((city) => (
                      <SelectItem key={city.name} value={city.name}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Label>

            <Label className="flex flex-col items-start gap-2">
              Dirección
              <Input id="address" />
            </Label>
            <Label className="flex flex-col items-start gap-2">
              Código Postal
              <Input id="postal_code" />
            </Label>
            <Label className="col-span-2 flex flex-col items-start gap-2">
              Logo
              <Input id="logo" type="file" />
            </Label>
          </section>
        </Form>

        <DialogFooter>
          <Button className="w-full" type="submit">
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyCreate;
