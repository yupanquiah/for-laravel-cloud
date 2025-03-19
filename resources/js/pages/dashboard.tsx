import { ActionButtons } from "@/components/action-buttons"
import { Banner } from "@/components/banner"
import { Chart01 } from "@/components/chart-01"
import { Chart02 } from "@/components/chart-02"
import { Chart03 } from "@/components/chart-03"
import { Chart04 } from "@/components/chart-04"
import { Chart05 } from "@/components/chart-05"
import { Chart06 } from "@/components/chart-06"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarTrigger
} from "@/components/ui/sidebar"
import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItems } from '@/types'
import { Head } from '@inertiajs/react'


const breadcrumbs: BreadcrumbItems[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
]

export default function Dashboard () {
  return (
    <AppLayout>
      <Head title="Dashboard" />
      <SidebarInset>
        <div className="px-4 md:px-6 lg:px-8 @container">
          <div className="w-full  mx-auto">
            <header className="flex flex-wrap gap-3 min-h-20 py-4 shrink-0 items-center transition-all ease-linear border-b">
              {/* Left side */}
              <div className="flex flex-1 items-center gap-2">
                <SidebarTrigger className="-ms-1" />
                <div className="max-lg:hidden lg:contents">
                  <Separator
                    orientation="vertical"
                    className="me-2 data-[orientation=vertical]:h-4"
                  />
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="#">Home</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Dashboard</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
              </div>
              {/* Right side */}
              <ActionButtons />
            </header>
            <div className="overflow-hidden">
              <div className="grid auto-rows-min @2xl:grid-cols-2 *:-ms-px *:-mt-px -m-px">
                <Chart01 />
                <Chart02 />
                <Chart03 />
                <Chart04 />
                <Chart05 />
                <Chart06 />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
      <Banner />
    </AppLayout>
  )
}
