import { useEffect } from 'react'
import { CONTACT } from '../data/site'
import { ROUTES } from '../router'
import { container } from '../ui'

const UPDATED_AT = '8 de agosto de 2026'

const RIGHTS = [
  'confirmar se tratamos algum dado seu e acessar esses dados;',
  'corrigir dados incompletos, inexatos ou desatualizados;',
  'pedir a anonimização, o bloqueio ou a eliminação de dados desnecessários ou tratados fora da lei;',
  'pedir a portabilidade dos dados a outro fornecedor;',
  'pedir a eliminação dos dados tratados com base no seu consentimento;',
  'saber com quem compartilhamos seus dados;',
  'ser informado sobre o que acontece se você não consentir;',
  'revogar o consentimento a qualquer momento.',
]

export default function PrivacyPolicy() {
  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Política de Privacidade | Buffet Kawai'

    // O canonical do index.html aponta para a home. Deixá-lo assim aqui diria
    // aos buscadores que esta página é uma cópia da home.
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    const previousCanonical = canonical?.href
    if (canonical) canonical.href = new URL(ROUTES.privacidade, canonical.href).href

    return () => {
      document.title = previousTitle
      if (canonical && previousCanonical) canonical.href = previousCanonical
    }
  }, [])

  return (
    <article className="bg-kawai-paper pb-20 pt-[150px] lg:pb-28 lg:pt-[190px]">
      <div className={container}>
        <header className="max-w-[760px]">
          <p className="mb-2.5 text-xs font-extrabold uppercase tracking-[0.16em] text-kawai-orange">
            Privacidade
          </p>
          <h1 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.04] tracking-[-0.04em] text-kawai-ink">
            Política de Privacidade
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-kawai-brown">
            Esta política explica quais dados o site do Buffet Kawai coleta, por que coleta e o que
            você pode fazer a respeito, conforme a Lei Geral de Proteção de Dados (Lei 13.709/2018).
          </p>
          <p className="mt-3 text-[13px] text-kawai-muted">Última atualização: {UPDATED_AT}.</p>
        </header>

        <div className="mt-14 grid max-w-[820px] gap-11">
          <Bloco numero="01" titulo="Quem é o responsável">
            <p>
              O responsável pelo tratamento dos dados é o <strong>Buffet Kawai</strong>, com
              atendimento na {CONTACT.address}.
            </p>
            <p>
              Para qualquer assunto relacionado a esta política ou aos seus dados, fale pelo e-mail{' '}
              <Link href={`mailto:${CONTACT.email}`}>{CONTACT.email}</Link> ou pelo WhatsApp{' '}
              <Link href={CONTACT.whatsapp.href}>{CONTACT.whatsapp.display}</Link>.
            </p>
          </Bloco>

          <Bloco numero="02" titulo="Quais dados coletamos">
            <p>
              <strong>Dados que você digita no formulário de orçamento.</strong> Nome e data da
              festa no formulário rápido; e, no formulário completo, também e-mail, telefone,
              número de convidados, tipo de rodízio e a mensagem que você escrever.
            </p>
            <p>
              É importante entender como esse formulário funciona: <strong>ele não envia nada
              para um servidor nosso</strong>. Os campos preenchidos são usados apenas para montar
              uma mensagem de texto e abrir uma conversa no WhatsApp com esse conteúdo já escrito.
              O envio, se acontecer, é seu, pelo WhatsApp — e é lá que a conversa fica guardada.
            </p>
            <p>
              <strong>Dados de navegação.</strong> Se você aceitar os cookies de medição, o Google
              Analytics coleta informações sobre como o site é usado: páginas vistas, cliques nos
              botões de contato, origem do acesso, tipo de dispositivo e navegador, além de um
              identificador aleatório. Não usamos esses dados para publicidade e não conseguimos
              identificar você pessoalmente por meio deles.
            </p>
            <p>
              <strong>Mapa da seção Contato.</strong> A página exibe um mapa incorporado do Google
              Maps. Ao carregar, ele se comunica com servidores do Google, que podem registrar seu
              endereço IP conforme as políticas do próprio Google.
            </p>
            <p>
              Não pedimos e não temos qualquer interesse em dados sensíveis, documentos, dados
              bancários ou de cartão. Nunca solicitaremos esse tipo de informação pelo site.
            </p>
          </Bloco>

          <Bloco numero="03" titulo="Por que usamos esses dados">
            <p>
              Os dados do formulário servem para preparar seu orçamento e responder ao seu contato.
              A base legal é o atendimento a pedido seu em etapa anterior a um contrato, prevista
              no artigo 7º, inciso V, da LGPD.
            </p>
            <p>
              Os dados de navegação servem para entender quais partes do site ajudam ou atrapalham
              quem procura uma festa, e assim melhorar a página. A base legal aqui é o seu
              consentimento, artigo 7º, inciso I — por isso nada é coletado antes de você aceitar.
            </p>
          </Bloco>

          <Bloco numero="04" titulo="Cookies e o banner de consentimento">
            <p>
              O site não usa cookies para funcionar. Os únicos cookies possíveis são os do Google
              Analytics, e eles só existem se você clicar em “Aceitar” no banner que aparece na
              primeira visita. Enquanto você não decidir, nenhum script de medição é carregado e
              nenhum cookie é gravado.
            </p>
            <p>
              Recusar não muda nada no funcionamento do site. Você pode rever a escolha quando
              quiser pelo botão <strong>Preferências de cookies</strong>, no rodapé de qualquer
              página.
            </p>
          </Bloco>

          <Bloco numero="05" titulo="Com quem os dados são compartilhados">
            <p>
              Não vendemos dados e não os repassamos para fins de publicidade. O compartilhamento
              se limita aos serviços necessários para o site e o atendimento funcionarem:
            </p>
            <ul className="grid gap-2.5 pl-5">
              <Item>
                <strong>WhatsApp (Meta)</strong> — é por onde a conversa de orçamento acontece. O
                tratamento dos dados na plataforma segue as políticas da Meta.
              </Item>
              <Item>
                <strong>Google (Analytics e Maps)</strong> — medição de audiência, mediante
                consentimento, e exibição do mapa. Pode envolver transferência internacional de
                dados, já que os servidores ficam fora do Brasil.
              </Item>
            </ul>
          </Bloco>

          <Bloco numero="06" titulo="Por quanto tempo guardamos">
            <p>
              Como o site não armazena os dados do formulário, não há prazo de retenção nossa
              nesse caso: o que existe é o histórico da conversa no WhatsApp, mantido enquanto for
              útil ao atendimento e ao registro da contratação, ou até você pedir a exclusão.
            </p>
            <p>
              Os dados de medição ficam no Google Analytics pelo prazo configurado na ferramenta e
              deixam de ser coletados assim que você revoga o consentimento.
            </p>
          </Bloco>

          <Bloco numero="07" titulo="Seus direitos">
            <p>O artigo 18 da LGPD garante a você, a qualquer momento, o direito de:</p>
            <ul className="grid gap-2.5 pl-5">
              {RIGHTS.map((right) => (
                <Item key={right}>{right}</Item>
              ))}
            </ul>
            <p>
              Para exercer qualquer um deles, escreva para{' '}
              <Link href={`mailto:${CONTACT.email}`}>{CONTACT.email}</Link>. Respondemos o mais
              rápido possível e podemos pedir alguma informação que confirme que a solicitação é
              mesmo sua.
            </p>
          </Bloco>

          <Bloco numero="08" titulo="Segurança">
            <p>
              O site é servido por conexão criptografada e não mantém banco de dados de visitantes,
              o que reduz bastante a superfície de exposição. Ainda assim, nenhum meio digital é
              totalmente livre de risco. Se identificarmos um incidente que possa trazer risco
              relevante a você, comunicaremos você e a Autoridade Nacional de Proteção de Dados,
              como manda a lei.
            </p>
          </Bloco>

          <Bloco numero="09" titulo="Mudanças nesta política">
            <p>
              Se o site passar a coletar algo diferente, esta página será atualizada e a data no
              topo mudará junto. Vale a pena reler antes de enviar um novo pedido de orçamento.
            </p>
          </Bloco>
        </div>
      </div>
    </article>
  )
}

function Bloco({
  numero,
  titulo,
  children,
}: {
  numero: string
  titulo: string
  children: React.ReactNode
}) {
  return (
    <section className="grid gap-x-5 gap-y-3 sm:grid-cols-[54px_minmax(0,1fr)]">
      <span className="font-display text-sm font-bold text-kawai-orange" aria-hidden="true">
        {numero}
      </span>
      <div>
        <h2 className="font-display text-[clamp(1.25rem,2.2vw,1.6rem)] font-bold leading-tight tracking-[-0.02em] text-kawai-ink">
          {titulo}
        </h2>
        <div className="mt-3 grid gap-3.5 text-[15px] leading-[1.75] text-kawai-brown [&_strong]:text-kawai-ink">
          {children}
        </div>
      </div>
    </section>
  )
}

function Item({ children }: { children: React.ReactNode }) {
  return <li className="list-disc marker:text-kawai-orange">{children}</li>
}

function Link({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith('http')
  return (
    <a
      className="font-bold text-kawai-orange underline underline-offset-4"
      href={href}
      rel={external ? 'noreferrer' : undefined}
      target={external ? '_blank' : undefined}
    >
      {children}
    </a>
  )
}
