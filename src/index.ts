import axios from 'axios'

console.log('solar synth!')

type Series = {
  name: string
  columns: [string, string]
  values: [time: number, total: number][]
}

type Data = {
  results: { series: Series[] }[]
}

const main = async () => {
  const { data } = await axios.get<Data>('https://txt.t0.vc/SLLD.json')

  const points = data.results[0].series[0].values

  console.log('values:', points)

  // split into days
  // find good sample size
  // create sketch
  // create audio context
  const dataEl = document.querySelector('.data')
  let n = 0
  for (const [ts, val] of points) {
    const rowEl = document.createElement('div')
    rowEl.className = 'row'

    const numEl = document.createElement('div')
    const tsEl = document.createElement('div')
    const valEl = document.createElement('div')
    numEl.innerText = n.toString().padStart(4, '0')
    tsEl.innerText = ts + ''
    valEl.innerText = val + ''
    rowEl.appendChild(numEl)
    rowEl.appendChild(tsEl)
    rowEl.appendChild(valEl)

    dataEl.appendChild(rowEl)
    n++
  }
}

main()
