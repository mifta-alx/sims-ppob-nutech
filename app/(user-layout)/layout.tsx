import {SiteHeader} from "@/components/layout/site-header"

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="[--header-height:calc(--spacing(16))] flex flex-col items-center justify-center">
      <SiteHeader />
      <main className="flex grow w-full max-w-6xl py-8 px-4 items-center justify-center">
        {children}
      </main>
    </div>
  )
}

export default UserLayout