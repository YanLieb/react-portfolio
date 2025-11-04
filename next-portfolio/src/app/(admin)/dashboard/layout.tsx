import Menu from './menu/page';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <div className="menu">
        <Menu />
      </div>
      <div className="container">
        {children}
      </div>
    </div>
  )

}