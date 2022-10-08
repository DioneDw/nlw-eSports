import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import { convertHourStringToMinutes } from './utils/convert-hours-to-minutes'
import { convertMinutesToHoursString } from './utils/convert-minutes-to-hours'
const app = express()
app.use(express.json())
app.use(cors())  // Default open for all Front End Services.
 
const prisma = new PrismaClient({
  log: ['query']
})
app.get('/games', async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          Ads: true
        }
      }
    }
  })
  return response.json(games)
}),
 
app.post('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id;
  const body = request.body;
  const ad = await prisma.ad.create({
    data: {
     gameId,
     name: body.name,
     yearsPlaying: body.yearsPlaying,
     discord: body.discord,
     weekDays: body.weekDays.join(','),
     hourStart: convertHourStringToMinutes(body.hourStart),
     hourEnd: convertHourStringToMinutes(body.hourEnd),
     useVoiceChannel: body.useVoiceChannel,
    }
  })
  return response.status(201).json(ad);
}),

app.get('/games/:id/ads', async (request, response) => {
    const idInform = request.params.id
    const ads = await prisma.ad.findMany({
      select: {
        id: true,
        name: true,
        yearsPlaying: true,
        weekDays: true,
        hourStart: true,
        hourEnd: true,
        useVoiceChannel: true
      },
      where: {
        gameId: idInform
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    return response.json(
      ads.map((ad: { weekDays: string; hourStart: number; hourEnd: number }) => {
        return {
          ...ad,
          weekDays: ad.weekDays.split(','),
          hourStart: convertMinutesToHoursString(ad.hourStart),
          hourEnd: convertMinutesToHoursString(ad.hourEnd),
        }
      })
    )
}),
app.get('/ads/:id/discord', async (request, response) => {
    const idAnunc = request.params.id
    const discord = await prisma.ad.findUniqueOrThrow({
      select: {
        discord: true
      },
      where: {
        id: idAnunc
      }
    })
    return response.json({
      discord: discord.discord
    })
}),
app.listen(3333)
