import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useEffect } from 'react';
import { toast } from 'sonner';

interface EditUserProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserProps | null;
}

interface UserProps {
  id: number;
  name: string;
  role: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export const EditUser = ({ open, onOpenChange, user }: EditUserProps) => {
  const { roles } = usePage<{ roles: UserProps[] }>().props;
  if (!user) return null;

  const { data, setData, patch, processing, errors } = useForm<Required<UserProps>>({
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password,
    password_confirmation: user.password_confirmation,
    role: user.role,
  });

  useEffect(() => {
    setData({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      password_confirmation: user.password_confirmation,
      role: user?.role,
    });
  }, [user]);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    patch(route('user.update', user.id), {
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
              <Input type="password" name="password" value={data.password} onChange={(e) => setData('password', e.target.value)} />
              <InputError message={errors.password} />
            </Label>
            <Label className="flex flex-col items-start gap-2">
              Confirmar Contraseña
              <Input
                type="password"
                name="password_confirmation"
                value={data.password_confirmation}
                onChange={(e) => setData('password_confirmation', e.target.value)}
              />
              <InputError message={errors.password_confirmation} />
            </Label>
          </main>
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
