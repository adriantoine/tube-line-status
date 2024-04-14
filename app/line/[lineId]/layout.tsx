import { fetchLineStatuses } from "@/lib/api";
import { MainLayout } from "../../MainLayout";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lineStatus = await fetchLineStatuses();

  return (
    <main>
      <MainLayout isNavMobileHidden={true} lineStatus={lineStatus}>
        {children}
      </MainLayout>
    </main>
  );
}
