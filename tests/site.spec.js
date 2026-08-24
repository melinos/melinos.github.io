const { expect, test } = require("@playwright/test");

async function expectNoHorizontalOverflow(page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
}

async function openMobileNavigation(page, testInfo) {
  if (!testInfo.project.name.startsWith("mobile")) return;

  const toggle = page.getByRole("button", { name: "Toggle navigation" });
  await expect(toggle).toBeVisible();
  await toggle.click();
}

test("home page is current, responsive, and navigable", async ({ page }, testInfo) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1, name: "Melinos Averkiou" })).toBeVisible();
  await expect(page.getByText("EASE", { exact: true }).first()).toBeVisible();
  await expect(page.getByText(/Data Leakage Detection and De-duplication/).first()).toBeVisible();
  await expect(page.getByText("Im2SurfTex", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("ShapeWords", { exact: true }).first()).toBeVisible();

  const profileImage = page.locator(".profile img");
  await expect(profileImage).toBeVisible();
  await expect.poll(() => profileImage.evaluate((image) => image.naturalWidth)).toBeGreaterThan(0);

  await openMobileNavigation(page, testInfo);
  const navigation = page.getByRole("navigation");
  await expect(navigation.getByRole("link", { name: "publications", exact: true })).toBeVisible();
  await expect(navigation.getByRole("link", { name: "projects", exact: true })).toBeVisible();
  await expect(navigation.getByRole("link", { name: "CV", exact: true })).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("dark mode changes the active color scheme", async ({ page }, testInfo) => {
  await page.addInitScript(() => localStorage.setItem("theme", "light"));
  await page.goto("/");
  await openMobileNavigation(page, testInfo);

  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.getByRole("button", { name: "Change color theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("publication and project collections contain the latest work", async ({ page }) => {
  await page.goto("/publications/");
  await expect(page.getByRole("heading", { level: 2, name: "2026" })).toBeVisible();
  await expect(page.getByText("Data Leakage Detection and De-duplication in Large Scale Geospatial Image Datasets", { exact: true })).toBeVisible();
  await expect(page.getByText("EASE: Parametric Garment Design with Explicit and Local Ease Control", { exact: true })).toBeVisible();
  await expect(page.getByText("ShapeWords: Guiding Text-to-Image Synthesis with 3D Shape-Aware Prompts", { exact: true })).toBeVisible();
  await expect(
    page.getByText("Im2SurfTex: Surface Texture Generation via Neural Backprojection of Multi-View Images", { exact: true })
  ).toBeVisible();
  await expect(page.getByText(/Pix2Poly: A Sequence Prediction Method/)).toBeVisible();
  await expectNoHorizontalOverflow(page);

  await page.goto("/projects/");
  await expect(page.locator(".projects .card")).toHaveCount(8);
  await expect(page.getByRole("heading", { level: 3, name: "Data Leakage Detection" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 3, name: "BuildingNet" })).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("CV PDF is linked and available", async ({ page, request }) => {
  await page.goto("/cv/");
  const cvLink = page.getByRole("link", { name: "Download CV" });
  await expect(cvLink).toHaveAttribute("href", "/assets/pdf/averkiou_cv.pdf");

  const response = await request.get("/assets/pdf/averkiou_cv.pdf");
  expect(response.ok()).toBeTruthy();
  expect(response.headers()["content-type"]).toContain("application/pdf");
});
