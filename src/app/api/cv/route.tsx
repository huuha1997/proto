import { renderToBuffer } from "@react-pdf/renderer";
import { CVDocument } from "@/lib/generate-cv";

export async function GET() {
  const buffer = await renderToBuffer(<CVDocument />);
  const uint8 = new Uint8Array(buffer);

  return new Response(uint8, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="TamPhanMinh_CV.pdf"',
    },
  });
}
