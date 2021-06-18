import { forI } from '@dank-inc/lewps'
import { createSketch } from '@dank-inc/sketchy'
import { Values } from '.'

export default createSketch<Values>(
  ({ context, setFillStyle, width, height, data }) => {
    setFillStyle('#111')
    context.strokeStyle = '#ccc'
    context.fillRect(0, 0, width, height)

    return () => {
      setFillStyle('#111')
      context.fillRect(0, 0, width, height)
      context.beginPath()
      context.moveTo(0, height / 2)

      setFillStyle('#ccc')

      forI(data, ([_, val], i, u) => {
        // context.fillRect(u * width, (val + 0.1) * height - 20, 1, 40)
        context.lineTo(u * width, (val + 0.1) * height - 20)

        return null
      })
      context.stroke()
    }
  },
)
