# Convert.AI Proposal - The Glass Journey

Interactive horizontal proposal for CM Remedios. The IntroGate works as the hero entry, then the narrative advances through 11 slides focused on problem, solution, proof, ROI, and next steps.

## Stack (exact versions)
- Next.js 16.0.4
- React 19.2.3
- TypeScript 5.9.3
- HeroUI React 2.8.6 + HeroUI Theme 2.4.24
- Tailwind CSS 4.1.18
- Framer Motion 12.x
- GSAP 3.13.x
- R3F + Drei + @react-three/postprocessing
- Recharts 2.15.x
- @xyflow/react 12.10.0
- Zustand 5.x

## Getting Started
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Scripts
- `npm run dev` - dev server
- `npm run build` - production build
- `npm run start` - start production server
- `npm run lint` - eslint

## Narrative Flow (11 slides)
1. Diagnostico - `PainPointsGrid`
2. Oportunidade - `BeforeAfterSlider`
3. Solucao - `EcosystemOrbit` (agent modals with interactive flows)
4. Dashboard - `DashboardPreview`
5. CRM & Inbox - `LiveCRM`
6. ROI - `ROICalculator`
7. Implementacao - `ImplementationPlan`
8. Oferta & Pricing - `OfferPricing`
9. Compliance - `ComplianceAssumptions`
10. Prova - `ProofWall`
11. Next Steps - `NextSteps`

## Structure
- `src/app/page.tsx` - horizontal navigation, dots, progress bar
- `src/components/modules/IntroGate.tsx` - hero entry gate
- `src/components/modules/EcosystemOrbit.tsx` - agents + XYFlow diagrams
- `src/components/modules/DashboardPreview.tsx` - tabs and charts
- `src/components/modules/LiveCRM.tsx` - CRM + inbox + contacts
- `src/store/useProposalStore.ts` - shared state for ROI and navigation

## Notes
- Numbers and pricing are fictitious placeholders.
- The 3D background is intentionally softened to keep focus on content.
