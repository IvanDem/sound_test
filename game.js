let game;

window.onload = function() {
  var gameConfig = {
    type: Phaser.AUTO,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 800,
      height: 600,
      zoom: 1
    },
    parent: 'phaser-game',
    antialias: true,
    mipmapFilter: 'LINEAR_MIPMAP_LINEAR',
    scene: gameScene
  }

  game = new Phaser.Game(gameConfig);
  window.focus()

}

class gameScene extends Phaser.Scene {

  constructor() {
    super("gameScene");
  }

  create() {
    let self = this
    let soundNumber = 0
    let scriptTimer = this.time.addEvent({
      delay: 1000,
      callback: () => {
        self.playNextSound(soundNumber)
        self.counter.setText("sound number " + soundNumber)
        soundNumber++
      },
      repeat: -1
    })

    this.counter = this.add.text(100, 100, "sound number " + soundNumber);
    this.audio = false
  }

  playNextSound(soundNumber) {
    console.log("playing sound " + soundNumber);
    let self = this

    this.load.audio("audio" + soundNumber, ["audio/music.ogg", "audio/music.mp3"]);
    this.load.start();
    this.load.once('complete', function() {
      if (self.audio) {
        self.cache.audio.remove(self.audio.key)
        self.audio.stop()
        self.audio.destroy()
        self.audio = null
        console.log("sound destroyed " + (soundNumber + 1));
      }
      self.audio = self.sound.add("audio" + soundNumber)
      self.audio.play()
    })


  }

}