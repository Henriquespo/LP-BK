import { useEffect } from 'react'
import BudgetModalProvider from './components/BudgetModalProvider'
import ConsentBanner from './components/ConsentBanner'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Structure from './components/Structure'
import Food from './components/Food'
import Fun from './components/Fun'
import Gallery from './components/Gallery'
import Process from './components/Process'
import Depoimentos from './components/Depoimentos'
import FAQ from './components/FAQ'
import Orcamento from './components/Orcamento'
import Contato from './components/Contato'
import Footer from './components/Footer'
import PrivacyPolicy from './components/PrivacyPolicy'
import { ROUTES, useRoute } from './router'

export default function App() {
  const route = useRoute()

  useEffect(() => {
    // Ao chegar em `/#cardapio` vindo de outra página, o navegador procura a
    // âncora antes do React montar as seções e desiste, deixando tudo no topo.
    // Depois do primeiro render o alvo existe, então o scroll é refeito aqui.
    const id = window.location.hash.slice(1)
    if (id) document.getElementById(id)?.scrollIntoView()
  }, [])

  return (
    <BudgetModalProvider>
      <main>
        <Navbar />
        {route === ROUTES.privacidade ? (
          <PrivacyPolicy />
        ) : (
          <>
            <Hero />
            <About />
            <Structure />
            <Food />
            <Fun />
            <Gallery />
            <Process />
            <Depoimentos />
            <FAQ />
            <Orcamento />
            <Contato />
          </>
        )}
        <Footer />
      </main>
      <ConsentBanner />
    </BudgetModalProvider>
  )
}
