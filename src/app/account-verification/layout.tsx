import { RoleConfirmationHeader } from '@/components/Role-confirmation/roleConfirmationHeader';
export default function RoleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <RoleConfirmationHeader />
      {children}
    </div>
  );
}
