import Modal from '@/components/Modal'
import './globals.css'


export const metadata = {
  title: 'Trello 2.0',
  description: 'Generated by Brian',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='bg-[#F5F6F8]'>
        {children}
        <Modal /> 
        </body>
    </html>
  )
}
