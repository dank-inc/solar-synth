import axios from 'axios'

const buttonEl = document.querySelector('.trigger') as HTMLButtonElement
console.log('solar synth!')
console.log('button', buttonEl)

type Series = {
  name: string
  columns: [string, string]
  values: [time: number, total: number][]
}

type Data = {
  results: { series: Series[] }[]
}

const main = async () => {
  const { data } = await axios.get<Data>('https://txt.t0.vc/KCDX.json')

  const points = data.results[0].series[0].values

  console.log('values:', points)

  // split into days
  // find good sample size
  // create sketch
  // create audio context
  const dataEl = document.querySelector('.data')
  let n = 0
  // get min-max
  // split time into days

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

  buttonEl.addEventListener('mousedown', createSynth)
}

const createCtx = (): AudioContext | null => {
  try {
    return new AudioContext()
  } catch (e) {
    alert('Web Audio API is not supported in this browser')
    return null
  }
}

const createSynth = async () => {
  console.log('playing')
  const context = createCtx()
  if (!context) return

  //create nodes
  const osc = context.createOscillator() //create in event listener so we can press the button more than once
  osc.frequency.value = 220
  const masterGain = context.createGain()
  const analyser = context.createAnalyser()

  //routing
  masterGain.connect(analyser)
  analyser.connect(context.destination)

  const real = new Float32Array([
    0, 0.4, 0.4, 1, 1, 1, 0.3, 0.7, 0.6, 0.5, 0.9, 0.8,
  ])
  // const real = new Float32Array([0, 0, 1, 0, 1, 1, 0.5, 0.2, 1])
  const imag = new Float32Array(real.length)
  // const wavetable = context.create
  const customWave = context.createPeriodicWave(real, imag) // cos,sine

  osc.setPeriodicWave(customWave)

  osc.connect(masterGain)
  osc.start()

  buttonEl.addEventListener('mouseup', () => {
    osc.stop()
  })
}

main()
