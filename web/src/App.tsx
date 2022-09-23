import './styles/main.css'
import logoApp from './assets/logo-nlw-esports.svg'
import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'
import { useState, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { GameController } from 'phosphor-react'

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
    fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data => setGames(data))
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

      <Dialog.Root>
        <CreateAdBanner />
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
          <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
            <Dialog.Title className="text-3xl font-black">
              Publique um anúncio
            </Dialog.Title>
              <form>
                <div>
                  <label htmlFor="game">Qual é o game?</label>
                  <input
                    id="game"
                    type="text"
                    placeholder="Selecione o game que deseja jogar"
                  />
                </div>
                <div>
                  <label htmlFor="name">Seu nome (ou nickname)</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Como te chamam dentro do game?"
                  />
                </div>

                <div>
                  <div>
                    <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
                    <input
                      id="yearsPlaying"
                      type="number"
                      placeholder="Tudo bem ser ZERO."
                    />
                  </div>
                  <div>
                    <label htmlFor="discord">Qual é o seu Discord?</label>
                    <input
                      id="discord"
                      type="text"
                      placeholder="Usuario#0000"
                    />
                  </div>
                </div>

                <div>
                  <div>
                    <label htmlFor="weekDays">Quando costuma jogar?</label>
                    
                  </div>
                  <div>
                    <label htmlFor="hourPlaying">Qual horário do dia?</label>
                    <div>
                      <input type="time" id="hourStart" placeholder="De" />
                      <input type="time" id="hourEnd" placeholder="Ate" />
                    </div>
                  </div>
                </div>

                <div>
                  <input type="checkbox" />
                  Costumo me conectar ao chat de voz?
                </div>
                
                <footer>
                  <button>Cancelar</button>
                  <button type='submit'>
                    <GameController/>
                    Encontrar duo
                  </button>
                </footer>
              </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}
export default App
