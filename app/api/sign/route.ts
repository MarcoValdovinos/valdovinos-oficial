import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { document, user } = body;

    if (!document) {
      return NextResponse.json({ error: "Documento vacío" }, { status: 400 });
    }

    // 1. Generar el SHA-256 real del documento
    const hash = crypto.createHash('sha256').update(document).digest('hex');

    // 2. Simular la firma MCP (Post-Cuántica)
    const mcpSignature = crypto.createHmac('sha256', 'LLAVE_SECRETA_KRONOS')
      .update(hash)
      .digest('hex');

    // 3. Devolver el sello inmutable
    return NextResponse.json({
      status: "success",
      folio: `KODICE-${Date.now()}`,
      hash: hash,
      signature: mcpSignature,
      timestamp: new Date().toISOString(),
      user: user || "anonimo",
      network: "Polygon Amoy"
    });

  } catch (error) {
    return NextResponse.json({ error: "Error en el motor de sellado" }, { status: 500 });
  }
}
