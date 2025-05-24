import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Transition } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import confetti from 'canvas-confetti';
import { LoaderCircle, Plus } from 'lucide-react';
import { FormEventHandler } from 'react';

interface RoleProps {
  id: number;
  name: string;
  role: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export const CreateUser = () => {
  const { roles } = usePage<{ roles: RoleProps[] }>().props;
  const { data, setData, post, processing, errors, recentlySuccessful } = useForm<Required<RoleProps>>({
    id: 0,
    name: '',
    role: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('user.store'));
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Plus />
            Agregar nuevo usuario
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="mb-4">
            <DialogTitle>Crea un nuevo usuario</DialogTitle>
            <DialogDescription>Agrega un nuevo usuario aquí. Guarda los cambios cuando termines.</DialogDescription>
          </DialogHeader>
          <form id="create-role" onSubmit={submit}>
            <main className="space-y-4">
              <Label className="flex flex-col items-start gap-2">
                Nombre de usuario
                <Input type="text" required name="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                <InputError message={errors.name} />
              </Label>
              <Label className="flex flex-col items-start gap-2">
                Escoje el rol
                <Select value={data.role} onValueChange={(value) => setData('role', value)}>
                  <SelectTrigger disabled={processing} className="w-full">
                    <SelectValue placeholder="Selecciona un rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Roles</SelectLabel>
                      {roles.map((role) => (
                        <SelectItem key={role.id} value={role.name}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Label>
              <Label className="flex flex-col items-start gap-2">
                Correo
                <Input type="email" required name="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                <InputError message={errors.email} />
              </Label>
              <Label className="flex flex-col items-start gap-2">
                Contraseña
                <Input type="password" required name="password" value={data.password} onChange={(e) => setData('password', e.target.value)} />
                <InputError message={errors.password} />
              </Label>
              <Label className="flex flex-col items-start gap-2">
                Confirmar Contraseña
                <Input
                  type="password"
                  required
                  name="password_confirmation"
                  value={data.password_confirmation}
                  onChange={(e) => setData('password_confirmation', e.target.value)}
                />
                <InputError message={errors.password_confirmation} />
              </Label>
            </main>
          </form>
          <DialogFooter className="flex items-center justify-center gap-4">
            <Transition
              show={recentlySuccessful ? confetti() : ''}
              enter="transition ease-in-out"
              enterFrom="opacity-0"
              leave="transition ease-in-out"
              leaveTo="opacity-0"
            >
              <p className="text-sm text-neutral-600">Guardado</p>
            </Transition>
            <Button form="create-role" type="submit" disabled={processing}>
              {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
              Crear rol
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
