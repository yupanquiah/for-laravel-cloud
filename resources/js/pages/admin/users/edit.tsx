import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect } from 'react';
import { toast } from 'sonner';
import { UserProps } from './index';

interface EditUserProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserProps | null;
}

export const EditUser = ({ open, onOpenChange, user }: EditUserProps) => {
  if (!user) return null;

  const { data, setData, patch, processing, errors } = useForm<Required<UserProps>>({
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password,
    company_id: user.company_id,
  });

  // Actualiza los datos cuando cambia el rol a editar
  useEffect(() => {
    setData({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      company_id: user.company_id,
    });
  }, [user]);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    patch(route('role.update', user.id), {
      onSuccess: () => {
        onOpenChange(false);
        toast.success('Rol actualizado correctamente');
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Rol</DialogTitle>
          <DialogDescription>Edita los datos del rol y guarda los cambios.</DialogDescription>
        </DialogHeader>
        <form id="edit-role" onSubmit={submit}>
          <Label>
            Nombre de rol
            <Input type="text" required name="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
            <InputError message={errors.name} />
          </Label>
          <Label>
            Descripción
            <Input type="text" name="description" value={data.email} onChange={(e) => setData('email', e.target.value)} />
            <InputError message={errors.email} />
          </Label>
        </form>
        <DialogFooter>
          <Button form="edit-role" type="submit" disabled={processing}>
            Guardar cambios
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
