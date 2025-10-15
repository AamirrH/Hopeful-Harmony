export type MusicTrack = {
    mood: 'hopeful' | 'peaceful' | 'sad' | 'focused';
    title: string;
    artist: string;
    url: string;
  };
  
  export const musicSelection: MusicTrack[] = [
    {
      mood: 'hopeful',
      title: 'Golden Sunrise',
      artist: 'Anonymous',
      url: 'https://storage.googleapis.com/studiopa-public-data/golden-hour-lofi-193993.mp3',
    },
    {
      mood: 'peaceful',
      title: 'Gentle Waves',
      artist: 'Anonymous',
      url: 'https://storage.googleapis.com/studiopa-public-data/relaxing-music-vol1-124474.mp3',
    },
    {
      mood: 'sad',
      title: 'Rainy Day',
      artist: 'Anonymous',
      url: 'https://storage.googleapis.com/studiopa-public-data/rain-and-nostalgia-version-60s-10820.mp3',
    },
    {
      mood: 'focused',
      title: 'Synthwave Focus',
      artist: 'Anonymous',
      url: 'https://storage.googleapis.com/studiopa-public-data/crystal-castles-suffocation-type-beat-x-8-bit-x-synthwave-172392.mp3',
    },
  ];
  