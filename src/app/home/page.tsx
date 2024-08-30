'use client'

import * as Component from '@/components'

export default function HomePage() {
  return (
    <main className="flex flex-col items-center h-screen space-y-8 max-w-screen-xl px-20 pt-20">
      <section className="flex flex-col items-center justify-center space-y-8">
        <h1 className="text-5xl font-black text-center text-dark">EXPLORE O UNIVERSO E CRIE SUA EQUIPE</h1>
        <p className="text-center text-dark opacity-60">
          Os melhores personagens já feitos em quadrinhos. Fique viciado em uma generosa porção de heróis e vilões!
        </p>
        <Component.Input />
      </section>

      <section className="flex flex-col items-center justify-center w-full">
        <div className="flex items-center justify-between w-full">
          <p className="text-2xl font-semibold text-light-gray">Encontrados 12 heróis</p>

          <p className="text-2xl font-medium text-destructive/70 cursor-pointer" onClick={() => alert('Favoritos')}>
            Somente favoritos
          </p>
        </div>

        <div className="grid grid-cols-4 gap-8 mt-8">
          <Component.HeroCard name="Homem-Aranha" />
          <Component.HeroCard name="Homem-Aranha" />
          <Component.HeroCard name="Homem-Aranha" />
          <Component.HeroCard name="Homem-Aranha" />
          <Component.HeroCard name="Homem-Aranha" />
          <Component.HeroCard name="Homem-Aranha" />
          <Component.HeroCard name="Homem-Aranha" />
          <Component.HeroCard name="Homem-Aranha" />
        </div>
      </section>
    </main>
  )
}
