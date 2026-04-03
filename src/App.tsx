import { ArrowRight, LayoutTemplate, Palette, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"

const features = [
  {
    title: "Ready-to-build stack",
    description: "Vite, React 19, TypeScript, Tailwind v4, and shadcn/ui are already wired together.",
    icon: LayoutTemplate,
  },
  {
    title: "Reusable design tokens",
    description: "Color roles, radius scale, typography, and dark mode live in one theme layer.",
    icon: Palette,
  },
  {
    title: "Clean starter surface",
    description: "Use this screen as a placeholder, then replace it with your real landing page or app shell.",
    icon: Sparkles,
  },
]

function App() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.07),_transparent_38%),linear-gradient(180deg,_var(--background)_0%,_color-mix(in_oklch,var(--background)_88%,var(--muted))_100%)] text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-10 sm:px-10 lg:px-12">
        <div className="mb-16 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">UI starter template</p>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">React foundation for fast product work</h1>
          </div>
          <div className="hidden rounded-full border border-border/70 bg-background/80 px-4 py-2 text-sm text-muted-foreground shadow-sm backdrop-blur sm:block">
            Vite + React + Tailwind + shadcn/ui
          </div>
        </div>

        <section className="grid flex-1 items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/85 px-3 py-1 text-sm text-muted-foreground shadow-sm backdrop-blur">
                <span className="size-2 rounded-full bg-emerald-500" />
                Starter is configured and ready to reuse
              </div>
              <div className="space-y-4">
                <h2 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                  Ship a new interface without rebuilding your frontend foundation every time.
                </h2>
                <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                  This template gives you a clean default theme, typed config, path aliases, and reusable UI
                  primitives so a new project can start from product work instead of setup work.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="gap-2">
                Start building
                <ArrowRight className="size-4" />
              </Button>
              <Button variant="outline" size="lg">
                Customize theme
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            {features.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="rounded-3xl border border-border/70 bg-background/90 p-6 shadow-sm backdrop-blur"
              >
                <div className="mb-4 inline-flex rounded-2xl bg-muted p-3 text-foreground">
                  <Icon className="size-5" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{title}</h3>
                <p className="text-sm leading-6 text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
