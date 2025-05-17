import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect } from 'react';
import { toast } from 'sonner';
import { Role } from './index';

interface EditRoleProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: Role | null;
}

export const EditRole = ({ open, onOpenChange, role }: EditRoleProps) => {
  if (!role) return null;

  const { data, setData, patch, processing, errors } = useForm<Required<Role>>({
    id: role.id,
    name: role.name,
    description: role.description ?? '',
  });

  // Actualiza los datos cuando cambia el rol a editar
  useEffect(() => {
    setData({
      id: role.id,
      name: role.name,
      description: role.description ?? '',
    });
  }, [role]);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    patch(route('role.update', role.id), {
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
            <Input type="text" name="description" value={data.description} onChange={(e) => setData('description', e.target.value)} />
            <InputError message={errors.description} />
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
