import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { QRCodeStudio } from "@/features/qrcodes/QRCodeStudio";

export default async function QRCodesPage() {
  const admin = await getAdminSession();
  if (!admin) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      <Navbar adminName={admin.name} />

      <main className="flex-1 p-6 sm:p-8 max-w-7xl mx-auto w-full space-y-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-foreground">
            QR Code Generator & Printable Poster Studio
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Generate custom QR codes targeting the feedback form, customize colors, and export as PNG, vector SVG, or print posters.
          </p>
        </div>

        <QRCodeStudio />
      </main>
    </div>
  );
}
