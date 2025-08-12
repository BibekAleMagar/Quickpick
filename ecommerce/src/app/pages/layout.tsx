import { NavBar } from '@/components/navbar';
import { Footer } from '@/components/footer';


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
        <NavBar />
          <main>
             {children}
          </main>
        <Footer />
        
      
    </>
  )
}
