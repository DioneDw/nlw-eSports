import './styles/main.css'
import logoApp from './assets/logo-nlw-esports.svg'
import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'
import { useState, useEffect} from 'react';

function App() {
 
  interface Game {
    id: string,
    name: string,
    bannerUrl: string,
    _count: {
      Ads: number;
    }
  }
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch('http://localhost:3333/games')
    .then(response => response.json())
    .then(data => setGames(data)) 
  },[]);

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
             title= {game.name}
             bannerUrl = {game.bannerUrl}
             adsCount = {game._count.Ads}
            />
          )
        })}
      </div>

      <CreateAdBanner/>

    </div>
  )
}
export default App
