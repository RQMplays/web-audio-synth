let audioCtx = new (window.AudioContext || window.webkitAudioContext)()
console.log('audioCtx', audioCtx)

let oscillator = audioCtx.createOscillator()
console.log('oscillator', oscillator)

let biquadFilter = audioCtx.createBiquadFilter()
console.log('biquadFilter', biquadFilter)

let gain = audioCtx.createGain()
console.log('gain', gain)

oscillator.connect(biquadFilter)
biquadFilter.connect(gain)

oscillator.frequency.value = 440
oscillator.type = 'sine'

biquadFilter.type = 'lowpass'
biquadFilter.frequency.value = 300
biquadFilter.Q.value = 1

oscillator.start()

// Controls
let btnStart = document.getElementById('start')
btnStart.onclick = () => gain.connect(audioCtx.destination)

let btnStop = document.getElementById('stop')
btnStop.onclick = () => gain.disconnect(audioCtx.destination)

let btnSweep = document.getElementById('sweep')
btnSweep.onclick = () => {
  freqInput.value = 20
  const grow = () => {
    freqInput.value = 1 + parseInt(freqInput.value)
    if (freqInput.value === 20000) {
      clear()
    }
  }
  let sweepProgress = setInterval(grow, 5)
  const clear = () => {
    clearInterval(sweepProgress)
    freqInput.value = 20
  }
}

freqInput = document.getElementById('OSCfrequency')

update = () => {
  oscillator.frequency.value = freqInput.value
}

setInterval(update, 5)
