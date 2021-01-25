import { Audio } from "expo";

const soundObjects = {};

const Player = () => {
  const load = (library) => {
    let promisedSoundObjects = [];

    for (const name in library) {
      const sound = { uri: library[name] };

      soundObjects[name] = new Audio.Sound();

      promisedSoundObjects.push(soundObjects[name].loadAsync(sound));
    }

    return promisedSoundObjects;
  };

  const playSound = async (name) => {
    try {
      if (soundObjects[name]) {
        await soundObjects[name].replayAsync();
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return { load, playSound };
};

export default Player;
