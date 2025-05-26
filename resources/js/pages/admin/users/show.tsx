import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { UserProps } from '.';

interface ShowUserProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserProps | null;
}

export const ShowUser = ({ open, onOpenChange, user }: ShowUserProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogTitle>Detalles del Rol</AlertDialogTitle>
        <AlertDialogDescription>
          <div>
            <p>
              <b>ID:</b> {user?.id}
            </p>
            <p>
              <b>Nombre:</b> {user?.name}
            </p>
            <p>
              <b>Corrreo:</b> {user?.email || 'Sin descripción'}
            </p>
          </div>
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Cerrar</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
