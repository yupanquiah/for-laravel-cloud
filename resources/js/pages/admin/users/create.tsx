import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import confetti from 'canvas-confetti';
import { LoaderCircle, Plus } from 'lucide-react';
import { FormEventHandler } from 'react';

interface Role {
  name: string;
}

export const CreateUser = () => {
  const { data, setData, post, processing, errors, recentlySuccessful } = useForm<Required<Role>>({ name: '' });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('role.store'));
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Plus />
            Agregar
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="mb-4">
            <DialogTitle>Crea un nuevo rol</DialogTitle>
            <DialogDescription>Agrega un nuevo rol aquí. Guarda los cambios cuando termines.</DialogDescription>
          </DialogHeader>
          <form id="create-role" onSubmit={submit}>
            <Label className="flex flex-col items-start gap-4">
              Nombre de rol
              <Input type="text" required name="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
              <InputError message={errors.name} />
            </Label>
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
