import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PropsWithChildren } from 'react';

interface CompanyCreate {
  title?: string;
  description?: string;
}

const CompanyLayout = ({ title, description, children }: PropsWithChildren<CompanyCreate>) => {
  return (
    <main className="bg-background flex min-h-dvh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <Card className="py-10">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </main>
  );
};

export default CompanyLayout;
