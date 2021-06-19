import { mapI } from '@dank-inc/lewps'

export const generateSlopes = (arr: number[]): number[][] =>
  arr.map((num, i) => {
    if (i == 0) return [0, num]
    const m = arr[i] - arr[i - 1]
    const b = arr[i] - m * i

    return [m, b]
  })

export const reMap = (arr: number[], sampleLength: number) => {
  // if (arr.length !== slopes.length) throw new Error('lenths not the same')
  const slopes = generateSlopes(arr)

  const nn = mapI(sampleLength, (i) => {
    const u = i / (sampleLength - 1)
    const ni = u * (arr.length - 1)

    const fnI = Math.ceil(ni)

    const [m, b] = slopes[fnI]
    return m * ni + b
  })

  return nn
}
