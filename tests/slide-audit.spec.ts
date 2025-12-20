import { expect, test } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";

const slides = [
  { id: "diagnosis", label: "Diagnóstico" },
  { id: "opportunity", label: "Oportunidade" },
  { id: "solution", label: "Solução" },
  { id: "dashboard", label: "Dashboard" },
  { id: "demo", label: "Demo ao vivo" },
  { id: "roi", label: "ROI" },
  { id: "implementation", label: "Implementação" },
  { id: "pricing", label: "Oferta" },
  { id: "compliance", label: "Compliance" },
  { id: "proof", label: "Prova" },
  { id: "next", label: "Próximos passos" },
];

test.describe("Proposal slide audit", () => {
  test("iterates slides and validates key interactions", async ({ page }) => {
    const outputDir = path.join(process.cwd(), "artifacts", "playwright");
    await fs.mkdir(outputDir, { recursive: true });

    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });

    await page.goto("/", { waitUntil: "domcontentloaded" });

    const introCta = page.getByRole("button", { name: /iniciar experiência/i });
    await expect(introCta).toBeVisible();
    await page.screenshot({
      path: path.join(outputDir, "01-intro.png"),
      fullPage: true,
    });

    await introCta.click();
    await expect(introCta).toBeHidden();

    for (let index = 0; index < slides.length; index += 1) {
      const slide = slides[index];
      const bullet = page.getByRole("button", { name: `Ir para ${slide.label}` });

      await bullet.click();
      await expect(bullet).toHaveAttribute("aria-current", "true");
      await page.waitForTimeout(250);

      if (slide.id === "solution") {
        const agentButton = page.getByRole("button", { name: "Agente SDR" });
        await agentButton.click();
        await expect(page.getByRole("dialog")).toBeVisible();
        await page.getByRole("button", { name: "Fechar" }).click();
        await expect(page.getByRole("dialog")).toBeHidden();
      }

      if (slide.id === "dashboard") {
        const clientsTab = page.getByRole("tab", { name: "Clientes" });
        await clientsTab.click();
        await expect(clientsTab).toHaveAttribute("aria-selected", "true");

        const rafaelButton = page.getByRole("button", { name: /Rafael Lima/ });
        await rafaelButton.click();
        await expect(rafaelButton).toHaveAttribute("aria-pressed", "true");
        await expect(page.getByText("Temperatura: Média")).toBeVisible();
      }

      if (slide.id === "roi") {
        await expect(
          page.getByRole("heading", { name: /matemática do lucro/i })
        ).toBeVisible();
      }

      if (slide.id === "next") {
        await page.getByRole("button", { name: /iniciar projeto/i }).click();
        await expect(page.getByRole("dialog")).toBeVisible();
        await page.getByRole("button", { name: "Fechar" }).click();
        await expect(page.getByRole("dialog")).toBeHidden();
      }

      await page.screenshot({
        path: path.join(outputDir, `${String(index + 2).padStart(2, "0")}-${slide.id}.png`),
        fullPage: true,
      });
    }

    expect(errors).toEqual([]);
  });
});
