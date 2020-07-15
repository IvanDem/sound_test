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

  preload() {
    // this.load.audio("menu_music", ["audio/MUS01.ogg","audio/MUS01.mp3"]);
  }

  create() {
    let self = this
    let soundNumber = 0
    let scriptTimer = this.time.addEvent({
      delay: 1000,
      callback: () => {
        // self.playNextSound(soundNumber)
        // self.counter.setText("sound number " + soundNumber)
        // soundNumber++
      },
      repeat: -1
    })

    this.counter = this.add.text(100, 100, 'Phaser');
    this.audio = false
  }

  playNextSound(soundNumber) {
    console.log("playing sound " + soundNumber);
    let self = this
    if (soundNumber > 800) {
      return
    }

    this.load.audio("audio" + soundNumber, ["audio/goat.ogg", "audio/goat.mp3"]);
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