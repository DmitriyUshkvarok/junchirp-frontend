import { AccountVerificationHeader } from '@/components/RoleConfirmation/AccountVerificationHeader';
export default function RoleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AccountVerificationHeader />
      {children}
    </div>
  );
}
