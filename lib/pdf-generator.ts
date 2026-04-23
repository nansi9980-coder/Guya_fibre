// PDF Generator utility for quotes - Version dynamique
// Récupère les infos société depuis le backend, logo en base64, signature directeur depuis localStorage

export interface QuoteData {
  id: string
  client: {
    name: string
    email: string
    phone: string
    company?: string
    address: string
    city: string
  }
  services: Array<{
    name: string
    description: string
    quantity: number
    unitPrice: number
  }>
  notes?: string
  validityDays: number
  date: string
}

export interface CompanyInfo {
  name: string
  address: string
  city: string
  phone: string
  email: string
  website: string
  siret: string
  logo?: string // base64 data URL ou URL http
}

const FALLBACK_COMPANY: CompanyInfo = {
  name: "GUYA FIBRE SARL",
  address: "12 Rue des Palmiers",
  city: "97320 Saint-Laurent-du-Maroni, Guyane française",
  phone: "+594 6 94 43 54 84",
  email: "contact@guyafibre.com",
  website: "www.guyafibre.com",
  siret: "123 456 789 00012",
}

const API_URL = typeof window !== 'undefined'
  ? (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000')
  : 'http://localhost:4000'

/** Charge les infos société depuis le backend, avec fallback */
async function fetchCompanyInfo(): Promise<CompanyInfo> {
  try {
    const r = await fetch(`${API_URL}/api/settings/company/public`)
    if (!r.ok) return FALLBACK_COMPANY
    const data = await r.json()
    return {
      name: data.name || FALLBACK_COMPANY.name,
      address: data.address || FALLBACK_COMPANY.address,
      city: data.city || FALLBACK_COMPANY.city,
      phone: data.phone || FALLBACK_COMPANY.phone,
      email: data.email || FALLBACK_COMPANY.email,
      website: data.website || FALLBACK_COMPANY.website,
      siret: data.siret || FALLBACK_COMPANY.siret,
      logo: data.logo || undefined,
    }
  } catch {
    return FALLBACK_COMPANY
  }
}

/** Convertit une URL image en base64 data URL pour l'embed dans le PDF */
async function imageUrlToBase64(url: string): Promise<string | null> {
  try {
    const fullUrl = url.startsWith('http') ? url : `${API_URL}${url}`
    const r = await fetch(fullUrl)
    if (!r.ok) return null
    const blob = await r.blob()
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = () => reject(null)
      reader.readAsDataURL(blob)
    })
  } catch {
    return null
  }
}

/** Récupère la signature directeur depuis localStorage */
function getDirectorSignature(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('directorSignature') || localStorage.getItem('signature') || null
}

export function generateQuotePDF(
  quoteData: QuoteData,
  companyInfo: CompanyInfo = FALLBACK_COMPANY,
  logoBase64?: string | null,
  directorSignature?: string | null,
): string {
  const subtotal = quoteData.services.reduce(
    (sum, service) => sum + service.quantity * service.unitPrice,
    0
  )
  const tva = subtotal * 0.085
  const total = subtotal + tva

  const validUntil = new Date(quoteData.date)
  validUntil.setDate(validUntil.getDate() + quoteData.validityDays)

  // Logo HTML : image si disponible, sinon texte stylisé
  const logoHtml = logoBase64
    ? `<img src="${logoBase64}" alt="${companyInfo.name}" style="height:56px;width:auto;object-fit:contain;" />`
    : `<div class="logo-text">GUYA<span>FIBRE</span></div>`

  const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Devis ${quoteData.id} - ${companyInfo.name}</title>
  <style>
    @page {
      size: A4;
      margin: 15mm 15mm 20mm 15mm;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      font-size: 11px;
      line-height: 1.6;
      color: #1a1a2e;
      background: #fff;
    }

    /* ─── HEADER ─── */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 0 0 20px 0;
      margin-bottom: 24px;
      border-bottom: 3px solid #00c4b0;
    }
    .logo-area {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .logo-text {
      font-size: 28px;
      font-weight: 900;
      letter-spacing: -1px;
      color: #00c4b0;
    }
    .logo-text span { color: #1a1a2e; }
    .logo-tagline {
      font-size: 9px;
      color: #888;
      letter-spacing: 2px;
      text-transform: uppercase;
    }
    .company-info {
      text-align: right;
      font-size: 9.5px;
      color: #555;
      line-height: 1.8;
    }
    .company-info strong {
      font-size: 11px;
      color: #1a1a2e;
      display: block;
      margin-bottom: 2px;
    }

    /* ─── TITRE DOCUMENT ─── */
    .doc-title-bar {
      background: linear-gradient(135deg, #1a1a2e 0%, #0d2d44 100%);
      color: white;
      padding: 16px 20px;
      border-radius: 6px;
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .doc-title-bar h1 { font-size: 18px; font-weight: 800; letter-spacing: 1px; }
    .doc-title-bar .doc-accent { color: #00c4b0; }
    .doc-meta { text-align: right; font-size: 9.5px; line-height: 1.8; opacity: 0.85; }
    .doc-meta .date-label { font-size: 8px; text-transform: uppercase; letter-spacing: 1px; color: #00c4b0; }

    /* ─── PARTIES ─── */
    .parties-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
    .party-box { border: 1px solid #e2e8f0; border-radius: 6px; overflow: hidden; }
    .party-box-header {
      background: #f8fafc;
      padding: 8px 14px;
      font-size: 8.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #00c4b0;
      border-bottom: 1px solid #e2e8f0;
    }
    .party-box-body { padding: 12px 14px; line-height: 1.9; }
    .party-box-body strong { font-size: 12px; color: #1a1a2e; display: block; margin-bottom: 4px; }
    .party-box-body .info-row { display: flex; gap: 6px; align-items: baseline; }
    .party-box-body .info-label { color: #888; min-width: 40px; font-size: 9px; }

    /* ─── TABLEAU SERVICES ─── */
    .table-section { margin-bottom: 24px; }
    .table-section-title {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #1a1a2e;
      margin-bottom: 8px;
      border-left: 3px solid #00c4b0;
      padding-left: 10px;
    }
    table.services-table { width: 100%; border-collapse: collapse; border-radius: 6px; overflow: hidden; border: 1px solid #e2e8f0; }
    table.services-table thead tr { background: #1a1a2e; color: white; }
    table.services-table thead th { padding: 10px 12px; text-align: left; font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; }
    table.services-table thead th:nth-child(2), table.services-table thead th:nth-child(3), table.services-table thead th:nth-child(4) { text-align: center; }
    table.services-table thead th:last-child { text-align: right; color: #00c4b0; }
    table.services-table tbody tr { border-bottom: 1px solid #e8edf3; }
    table.services-table tbody tr:nth-child(even) { background: #f8fafc; }
    table.services-table tbody tr:last-child { border-bottom: none; }
    table.services-table tbody td { padding: 12px; vertical-align: top; }
    .service-name { font-weight: 700; color: #1a1a2e; font-size: 11px; margin-bottom: 3px; }
    .service-desc { font-size: 9.5px; color: #666; line-height: 1.5; }
    .td-center { text-align: center; vertical-align: middle !important; font-weight: 600; color: #444; }
    .td-amount { text-align: right; vertical-align: middle !important; font-weight: 700; color: #1a1a2e; }
    .td-unit-price { text-align: center; vertical-align: middle !important; color: #555; }

    /* ─── TOTAUX ─── */
    .totals-wrapper { display: flex; justify-content: flex-end; margin-bottom: 24px; }
    table.totals-table { width: 280px; border-collapse: collapse; border: 1px solid #e2e8f0; border-radius: 6px; overflow: hidden; }
    table.totals-table td { padding: 9px 14px; font-size: 10.5px; border-bottom: 1px solid #e2e8f0; }
    table.totals-table td:last-child { text-align: right; font-weight: 600; }
    table.totals-table tr:last-child td { border-bottom: none; background: linear-gradient(135deg, #00c4b0, #009e8e); color: white; font-size: 13px; font-weight: 800; padding: 12px 14px; }
    table.totals-table .tva-row td { background: #f8fafc; color: #666; font-size: 9.5px; }

    /* ─── NOTES ─── */
    .notes-box {
      background: #fffbeb;
      border: 1px solid #fde68a;
      border-left: 4px solid #f59e0b;
      border-radius: 6px;
      padding: 14px 16px;
      margin-bottom: 24px;
    }
    .notes-box h4 { font-size: 9.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #d97706; margin-bottom: 8px; }
    .notes-box p { font-size: 10px; color: #555; line-height: 1.6; }

    /* ─── VALIDITÉ ─── */
    .validity-bar {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      background: #e8f9f7;
      border: 1px solid #b2ebf4;
      border-radius: 30px;
      padding: 10px 24px;
      margin-bottom: 24px;
      font-size: 11px;
      font-weight: 700;
      color: #00a08d;
    }
    .validity-dot { width: 8px; height: 8px; background: #00c4b0; border-radius: 50%; }

    /* ─── SIGNATURE ─── */
    .signature-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 32px; }
    .signature-box { border: 1px dashed #ccc; border-radius: 6px; padding: 12px 16px; min-height: 100px; }
    .signature-box-label { font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #888; margin-bottom: 6px; }
    .signature-box-sub { font-size: 8.5px; color: #aaa; }
    .signature-img { max-height: 70px; width: auto; object-fit: contain; margin-top: 8px; }

    /* ─── FOOTER ─── */
    .doc-footer {
      border-top: 2px solid #e2e8f0;
      padding-top: 12px;
      font-size: 8.5px;
      color: #999;
      text-align: center;
      line-height: 1.8;
    }
    .doc-footer strong { color: #00c4b0; }
  </style>
</head>
<body>

  <!-- HEADER -->
  <div class="header">
    <div class="logo-area">
      ${logoHtml}
      <div class="logo-tagline">Fibre optique · Guyane française</div>
    </div>
    <div class="company-info">
      <strong>${companyInfo.name}</strong>
      ${companyInfo.address}<br>
      ${companyInfo.city}<br>
      Tél : ${companyInfo.phone}<br>
      ${companyInfo.email}<br>
      <span style="color:#00c4b0">${companyInfo.website}</span><br>
      SIRET : ${companyInfo.siret}
    </div>
  </div>

  <!-- TITRE DOCUMENT -->
  <div class="doc-title-bar">
    <div>
      <div style="font-size:10px;color:#00c4b0;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:4px;">Demande de prise de contact</div>
      <h1>N° <span class="doc-accent">${quoteData.id}</span></h1>
    </div>
    <div class="doc-meta">
      <div class="date-label">Date d'émission</div>
      <div style="font-size:11px;font-weight:600;">${formatDate(quoteData.date)}</div>
      <div class="date-label" style="margin-top:8px;">Valide jusqu'au</div>
      <div style="font-size:11px;font-weight:600;">${formatDate(validUntil.toISOString().split('T')[0])}</div>
    </div>
  </div>

  <!-- PARTIES -->
  <div class="parties-grid">
    <div class="party-box">
      <div class="party-box-header">Émetteur</div>
      <div class="party-box-body">
        <strong>${companyInfo.name}</strong>
        <div class="info-row"><span class="info-label">Adresse</span><span>${companyInfo.address}, ${companyInfo.city}</span></div>
        <div class="info-row"><span class="info-label">Tél</span><span>${companyInfo.phone}</span></div>
        <div class="info-row"><span class="info-label">Email</span><span>${companyInfo.email}</span></div>
        <div class="info-row"><span class="info-label">SIRET</span><span>${companyInfo.siret}</span></div>
      </div>
    </div>
    <div class="party-box">
      <div class="party-box-header">Destinataire</div>
      <div class="party-box-body">
        <strong>${quoteData.client.name}</strong>
        ${quoteData.client.company ? `<div class="info-row"><span class="info-label">Société</span><span>${quoteData.client.company}</span></div>` : ''}
        <div class="info-row"><span class="info-label">Adresse</span><span>${quoteData.client.address}, ${quoteData.client.city}</span></div>
        <div class="info-row"><span class="info-label">Tél</span><span>${quoteData.client.phone}</span></div>
        <div class="info-row"><span class="info-label">Email</span><span>${quoteData.client.email}</span></div>
      </div>
    </div>
  </div>

  <!-- TABLEAU SERVICES -->
  <div class="table-section">
    <div class="table-section-title">Détail des prestations</div>
    <table class="services-table">
      <thead>
        <tr>
          <th style="width:48%">Désignation &amp; Description</th>
          <th style="width:12%">Qté</th>
          <th style="width:18%">P.U. HT</th>
          <th style="width:22%">Total HT</th>
        </tr>
      </thead>
      <tbody>
        ${quoteData.services.map((service) => `
          <tr>
            <td>
              <div class="service-name">${service.name}</div>
              <div class="service-desc">${service.description}</div>
            </td>
            <td class="td-center">${service.quantity}</td>
            <td class="td-unit-price">${formatCurrency(service.unitPrice)}</td>
            <td class="td-amount">${formatCurrency(service.quantity * service.unitPrice)}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>

  <!-- TOTAUX -->
  <div class="totals-wrapper">
    <table class="totals-table">
      <tr>
        <td>Sous-total HT</td>
        <td>${formatCurrency(subtotal)}</td>
      </tr>
      <tr class="tva-row">
        <td>TVA Guyane (8,5 %)</td>
        <td>${formatCurrency(tva)}</td>
      </tr>
      <tr>
        <td>TOTAL TTC</td>
        <td>${formatCurrency(total)}</td>
      </tr>
    </table>
  </div>

  ${quoteData.notes ? `
  <!-- NOTES -->
  <div class="notes-box">
    <h4>📝 Notes et conditions particulières</h4>
    <p>${quoteData.notes}</p>
  </div>
  ` : ''}

  <!-- VALIDITÉ -->
  <div style="text-align:center;margin-bottom:24px;">
    <div class="validity-bar">
      <div class="validity-dot"></div>
      Ce devis est valable <strong style="margin:0 4px;">${quoteData.validityDays} jours</strong> à compter du ${formatDate(quoteData.date)}
      <div class="validity-dot"></div>
    </div>
  </div>

  <!-- SIGNATURES -->
  <div class="signature-grid">
    <div class="signature-box">
      <div class="signature-box-label">Bon pour accord — Client</div>
      <div class="signature-box-sub">Date et signature précédées de la mention<br>"Bon pour accord"</div>
    </div>
    <div class="signature-box">
      <div class="signature-box-label">Émis par — ${companyInfo.name}</div>
      <div class="signature-box-sub">Référence : <span style="font-family:monospace;color:#00a08d;">${quoteData.id}</span></div>
      ${directorSignature ? `<img src="${directorSignature}" alt="Signature directeur" class="signature-img" />` : ''}
    </div>
  </div>

  <!-- FOOTER -->
  <div class="doc-footer">
    <strong>${companyInfo.name}</strong> — ${companyInfo.address}, ${companyInfo.city}<br>
    SIRET : ${companyInfo.siret} &nbsp;|&nbsp; Tél : ${companyInfo.phone} &nbsp;|&nbsp; ${companyInfo.email} &nbsp;|&nbsp; <span style="color:#00c4b0">${companyInfo.website}</span><br>
    Document généré le ${formatDate(new Date().toISOString().split('T')[0])} — Confidentiel
  </div>

</body>
</html>
  `

  return html
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount)
}

/** Génère le HTML du devis avec toutes les données dynamiques */
export async function buildQuoteHTML(quoteData: QuoteData): Promise<string> {
  const [companyInfo, signatoire] = await Promise.all([
    fetchCompanyInfo(),
    Promise.resolve(getDirectorSignature()),
  ])

  let logoBase64: string | null = null
  if (companyInfo.logo) {
    // Déjà base64 ?
    if (companyInfo.logo.startsWith('data:')) {
      logoBase64 = companyInfo.logo
    } else {
      logoBase64 = await imageUrlToBase64(companyInfo.logo)
    }
  }
  // Fallback: essaie le logo local
  if (!logoBase64) {
    logoBase64 = await imageUrlToBase64('/images/logo.jpg').catch(() => null)
  }

  return generateQuotePDF(quoteData, companyInfo, logoBase64, signatoire)
}

/** Déclenche le téléchargement PDF via la fenêtre d'impression */
export async function downloadQuotePDF(quoteData: QuoteData): Promise<void> {
  const html = await buildQuoteHTML(quoteData)

  const printWindow = window.open('', '_blank')
  if (printWindow) {
    printWindow.document.write(html)
    printWindow.document.close()
    printWindow.focus()

    setTimeout(() => {
      printWindow.print()
    }, 600)
  }
}

export const exampleQuote: QuoteData = {
  id: "GF-2026-001",
  client: {
    name: "Jean-Pierre Moreau",
    email: "jp.moreau@sfg.gf",
    phone: "+594 694 12 34 56",
    company: "Société Forestière Guyane",
    address: "12 Avenue du Général de Gaulle",
    city: "97300 Cayenne, Guyane française",
  },
  services: [
    { name: "Étude technique et conception", description: "Relevé terrain, étude de faisabilité, conception du réseau", quantity: 1, unitPrice: 1500 },
    { name: "Déploiement fibre FTTO", description: "Installation liaison fibre dédiée 100 Mbps symétrique", quantity: 1, unitPrice: 5500 },
    { name: "Équipements actifs", description: "ONT, routeur professionnel, câblage intérieur", quantity: 1, unitPrice: 1200 },
    { name: "Mise en service", description: "Configuration, tests et validation de la liaison", quantity: 1, unitPrice: 300 },
  ],
  notes: "Ce devis comprend la fourniture et l'installation de tous les équipements nécessaires. Un contrat de maintenance peut être souscrit en complément. Les travaux débuteront sous 15 jours après acceptation du devis.",
  validityDays: 30,
  date: new Date().toISOString().split('T')[0],
}