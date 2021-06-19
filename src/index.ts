import axios from 'axios'
import { createParams, loadSketch } from '@dank-inc/sketchy'
import vis from './vis'
import { forI } from '@dank-inc/lewps'
import { generateSlopes, reMap } from './utils/maff'

const buttonEl = document.querySelector('.trigger') as HTMLButtonElement
const stopEl = document.querySelector('.stahp') as HTMLButtonElement

export type Values = [time: number, total: number][]

type Series = {
  name: string
  columns: [string, string]
  values: Values
}

type Data = {
  results: { series: Series[] }[]
}

type State = {
  index: number
  data: Values
  bufferLength: number
  interval: any
}

const state: State = {
  index: 0,
  data: [],
  bufferLength: 256,
  interval: null,
}

const main = async () => {
  const { data } = await axios.get<Data>('https://txt.t0.vc/KCDX.json')

  const visEl = document.getElementById('sketchy')
  const rangeEl = document.getElementById('range') as HTMLInputElement

  const points = data.results[0].series[0].values

  state.data = points
    .slice(0, state.bufferLength)
    .map(([ts, val]) => [ts, val / 7500])

  rangeEl.min = 0 + ''
  rangeEl.max = points.length + ''
  rangeEl.value = state.index + ''

  rangeEl.onchange = (e) => {
    // @ts-ignore
    const index = e.target.value as number
    state.index = index

    const newData = []
    for (let i = state.index; i < state.index + state.bufferLength; i++) {
      newData.push(points[i % points.length])
    }

    forI(newData, (point, i) => {
      state.data[i][1] = point[1] / 7500
      return null
    })
  }

  console.log('length', points.length)

  loadSketch(
    vis,
    createParams({
      element: visEl,
      data: state.data.map(([_, v]) => v),
      animate: true,
    }),
  )

  const otherD = reMap(
    state.data.map((point) => point[1]),
    100,
  )

  loadSketch(vis, createParams({ element: visEl, data: otherD, animate: true }))

  const dataEl = document.querySelector('.data')
  let n = 0

  for (const [ts, val] of points) {
    const rowEl = document.createElement('div')
    rowEl.className = 'row'

    const numEl = document.createElement('div')
    const tsEl = document.createElement('div')
    const valEl = document.createElement('div')
    numEl.innerText = n.toString().padStart(4, '0')
    tsEl.innerText = Math.floor(ts / 100000000000) - 16200000 + ''
    valEl.innerText = val + ''
    rowEl.appendChild(numEl)
    rowEl.appendChild(tsEl)
    rowEl.appendChild(valEl)

    dataEl.appendChild(rowEl)
    n++
  }

  buttonEl.addEventListener('mousedown', playSynth)
}

const createCtx = (): AudioContext | null => {
  try {
    return new AudioContext()
  } catch (e) {
    alert('Web Audio API is not supported in this browser')
    return null
  }
}

let source: AudioBufferSourceNode
let playing = false

const playSynth = async () => {
  const context = createCtx()
  if (!context) return
  playing = true
  // const track = new MediaStreamTrack()
  // const stream = new MediaStream([track])
  // context.createMediaStreamSource(stream)

  const generateBuffer = (t = 0) => {
    const arrayBuffer = context.createBuffer(1, state.data.length, 44000)
    const channel = arrayBuffer.getChannelData(0)

    forI(state.data, ([_, val], i) => (channel[i] = val * 2 - 0.5))

    source = context.createBufferSource()
    source.buffer = arrayBuffer

    source.connect(context.destination)
    source.start()

    source.onended = (e) => {
      if (!playing) return
      const t = e.timeStamp
      generateBuffer(t)
    }
  }

  generateBuffer()
}

stopEl.addEventListener('mousedown', () => {
  playing = false

  source?.stop()
})

main()

const shit = () => {
  const n = [3, 5, 5, 15, 2, 10]

  const nSlopes = generateSlopes(n)
  const nn = reMap(n, nSlopes, 3)

  console.log(n)
  console.log(nn)
}

shit()
