import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types'
import { Head } from '@inertiajs/react'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Usuarios',
    href: '/user',
  },
]

export default function User () {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Usuarios" />
      <section>
        s
      </section>
    </AppLayout>
  )
}
