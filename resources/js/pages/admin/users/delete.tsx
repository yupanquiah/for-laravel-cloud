import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { UserProps } from './index';

interface DeleteRoleProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserProps | null;
  onConfirm: () => void;
}

export const DeleteUser = ({ open, onOpenChange, user, onConfirm }: DeleteRoleProps) => {
  if (!user) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogTitle>¿Eliminar usuario?</AlertDialogTitle>
        <AlertDialogDescription>
          Esta acción no se puede deshacer. ¿Seguro que deseas eliminar el este usuario <b>{user.name}</b>?
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Eliminar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
