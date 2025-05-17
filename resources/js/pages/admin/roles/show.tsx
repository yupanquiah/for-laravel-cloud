import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Role } from '@/pages/admin/roles/index';

interface ShowRoleProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: Role | null;
}

export const ShowRole = ({ open, onOpenChange, role }: ShowRoleProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogTitle>Detalles del Rol</AlertDialogTitle>
        <AlertDialogDescription>
          <div>
            <p>
              <b>ID:</b> {role?.id}
            </p>
            <p>
              <b>Nombre:</b> {role?.name}
            </p>
            <p>
              <b>Descripción:</b> {role?.description || 'Sin descripción'}
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
