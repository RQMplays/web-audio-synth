class Synthesizer {
  constructor() {
    this.update = this.update.bind(this)
  }

  init() {
    console.log(this)
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    console.log('audioCtx', this.audioCtx)

    this.oscillator = this.audioCtx.createOscillator()
    console.log('oscillator', this.oscillator)
    
    this.biquadFilter = this.audioCtx.createBiquadFilter()
    console.log('biquadFilter', this.biquadFilter)
    
    this.gain = this.audioCtx.createGain()
    console.log('gain', this.gain)
    
    this.oscillator.connect(this.biquadFilter)
    this.biquadFilter.connect(this.gain)
    
    this.oscillator.frequency.value = 440
    this.oscillator.type = 'sine'
    
    this.biquadFilter.type = 'lowpass'
    this.biquadFilter.frequency.value = 300
    this.biquadFilter.Q.value = 1
    
    this.oscillator.start()
  }
  
  update() {
    console.log('this in update', this)
    this.oscillator.frequency.value = freqInput.value
  }
  
  connect() {
    this.gain.connect(this.audioCtx.destination)
  }
  
  disconnect() {
    this.gain.disconnect(this.audioCtx.destination)
  }
  
  sweep() {
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
}

const synthesizer = new Synthesizer()

// Controls
const btnInit = document.getElementById('init')
btnInit.onclick = () => synthesizer.init()

const btnStart = document.getElementById('start')
btnStart.onclick = () => synthesizer.connect()

const btnStop = document.getElementById('stop')
btnStop.onclick = () => synthesizer.disconnect()

const freqInput = document.getElementById('OSCfrequency')

const btnSweep = document.getElementById('sweep')
btnSweep.onclick = () => synthesizer.sweep()

const btnUpdate = document.getElementById('update')
btnUpdate.onclick = () => setInterval(synthesizer.update, 5)