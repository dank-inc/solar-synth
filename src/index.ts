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

  console.log('values:', data.results[0].series[0].values)

  // split into days
  // find good sample size
  // create sketch
  // create audio context
}

main()
