import { Check, GameController, CaretDown } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'
import { Input } from './/Forms/Input'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as Select from '@radix-ui/react-select'
import * as TouggleGroup from '@radix-ui/react-toggle-group'
import { useState, useEffect } from 'react'


export function CreateAdModal(){
  interface Game {
    id: string
    name: string
  }
  const [games, setGames] = useState<Game[]>([])
  const [weekDays, setWeekDays] = useState<string[]>([])

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data => setGames(data))
  }, [])

  return(
  <Dialog.Portal>         {/* Content Dialog que faz as coisar aparecerem na tela vindos de outra origem */}
  <Dialog.Overlay className="bg-black/60 inset-0 fixed" />  {/* Componente que está do lado de fora do dialog */}
  <Dialog.Content className="fixed                   
   bg-[#2A2634] py-8 px-10
    text-white top-1/2 
    left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">   {/* Conteudo do dialog */}
    <Dialog.Title className="text-3xl font-black">     {/*Titulo do Dialog */}
      Publique um anúncio
    </Dialog.Title>
      <form className='mt-8 flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <label htmlFor="game" className='font-semibold' >Qual é o game?</label>
      <Select.Root>
           <Select.Trigger className='bg-zinc-900 py-3 px-4 rounded text-sm flex justify-between'>
            <Select.Value placeholder="Selecione um jogo:"/>
            <Select.Icon>
              <CaretDown/>
            </Select.Icon>
           </Select.Trigger>
           <Select.Portal >
            <Select.Content className='bg-zinc-900 py-3 px-4 text-sm rounded text-zinc-500'>
              <Select.Viewport>
               {games.map(game => {
                return(
                  <Select.Item value={game.id} key={game.id} className='hover:text-white font-black' >
                   <Select.ItemText> {game.name}</Select.ItemText>
                  </Select.Item>
                )
                })}
              </Select.Viewport>
            </Select.Content>
           </Select.Portal>
          </Select.Root>
        </div>
        <div className='flex flex-col gap-2'>
          <label className='font-semibold' htmlFor="name">Seu nome (ou nickname)</label>
          <Input  
            id="name"
            type="text"
            placeholder="Como te chamam dentro do game?"
          />
        </div>

        <div className='grid grid-cols-2 gap-6'>
          <div className='flex flex-col gap-2'>
            <label className='font-semibold' htmlFor="yearsPlaying">Joga a quantos anos?</label>
            <Input
              id="yearsPlaying"
              type="number"
              placeholder="Tudo bem ser ZERO."
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="discord">Qual é o seu Discord?</label>
            <Input
              id="discord"
              type="text"
              placeholder="Usuario#0000"
            />
          </div>
        </div>

        <div className='flex gap-6'>
          <div className='flex flex-col gap-2'>
            <label htmlFor="weekDays">Quando costuma jogar?</label>
              <TouggleGroup.Root type='multiple' className='grid grid-cols-4 gap-2'
              value={weekDays}
              onValueChange={setWeekDays}
              >
              <TouggleGroup.Item
              value='0'
              className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('0')? 'bg-violet-500' :''}`}
              title='Domingo'>D</TouggleGroup.Item>
              <TouggleGroup.Item
              value='1'
              className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('1')? 'bg-violet-500' :''}`} 
              title='Segunda'>S</TouggleGroup.Item>
              <TouggleGroup.Item
              value='2'
              className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('2')? 'bg-violet-500' :''}`} 
              title='Terça'>T</TouggleGroup.Item>
              <TouggleGroup.Item
              value='3'
              className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('3')? 'bg-violet-500' :''}`} 
              title='Quarta'>Q</TouggleGroup.Item>
              <TouggleGroup.Item
              value='4'
              className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('4')? 'bg-violet-500' :''}`} 
              title='Quinta'>Q</TouggleGroup.Item>
              <TouggleGroup.Item
              value='5'
              className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('5')? 'bg-violet-500' :''}`} 
              title='Sexta'>S</TouggleGroup.Item>
              <TouggleGroup.Item
              value='6'
              className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('6')? 'bg-violet-500' :''}`} 
              title='Sábado'>S</TouggleGroup.Item>
              </TouggleGroup.Root>
          </div>
          <div className='flex flex-col gap-2 flex-1'>
            <label htmlFor="hourPlaying">Qual horário do dia?</label>
            <div className='grid grid-cols-2 gap-1'>
              <Input type="time" id="hourStart" placeholder="De" />
              <Input type="time" id="hourEnd" placeholder="Ate" />
            </div>
          </div>
        </div>

        <label className='mt-2 flex gap-2 text-sm items-center'>
          <Checkbox.Root className='w-6 h-6 p-1 rounded bg-zinc-900'>
            <Checkbox.CheckboxIndicator>
              <Check className='w-4 h-4 text-emerald-400 '/>
            </Checkbox.CheckboxIndicator>
          </Checkbox.Root>
          Costumo me conectar ao chat de voz?
        </label>
        
        <footer className='mt-4 flex justify-end gap-4'>
          <Dialog.Close type='button' className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>Cancelar</Dialog.Close>
          <button type='submit' className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600'>
            <GameController className='w-6 h-6'/>               {/* Icone do controle-video-game do Phosphor */}
            Encontrar duo
          </button>
        </footer>
      </form>
  </Dialog.Content>    
</Dialog.Portal>
  )
}