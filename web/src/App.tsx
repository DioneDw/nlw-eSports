import './styles/main.css'
import logoApp from './assets/logo-nlw-esports.svg'
import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'
import { useState, useEffect } from 'react'
import { CreateAdModal } from './components/CreateAdModal'
import * as Dialog from '@radix-ui/react-dialog'
import axios from 'axios'

function App() {
  interface Game {
    id: string
    name: string
    bannerUrl: string
    _count: {
      Ads: number
    }
  }
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
   axios('http://localhost:3333/games')
      .then(response => setGames(response.data))
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoApp} alt="logo" />
      <h1 className="text-6xl text-white font-black mt-20">
        Seu{' '}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{' '}
        está aqui.
      </h1>
      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map(game => {
          return (
            <GameBanner
              key={game.id}
              title={game.name}
              bannerUrl={game.bannerUrl}
              adsCount={game._count.Ads}
            />
          )
        })}
      </div>

      <Dialog.Root>    {/* Inicio do componente Dialog do Radix UI */}
        <CreateAdBanner />  {/*Content que encontra-se o modal de fato */}
        <CreateAdModal />  {/* Componente que tem a estrutura do Modal */}
      </Dialog.Root>
    </div>
  )
}
export default App
