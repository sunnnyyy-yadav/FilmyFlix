import { Movie } from './tmdb'

// Sample movies as fallback when TMDB API is not available
export const sampleMovies: Movie[] = [
  {
    id: 550,
    title: "Fight Club",
    overview: "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy.",
    poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    backdrop_path: "/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
    release_date: "1999-10-15",
    vote_average: 8.4,
    genre_ids: [18, 53, 35],
    media_type: "movie"
  },
  {
    id: 278,
    title: "The Shawshank Redemption",
    overview: "Imprisoned in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison.",
    poster_path: "/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
    backdrop_path: "/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
    release_date: "1994-09-23",
    vote_average: 8.7,
    genre_ids: [18, 80],
    media_type: "movie"
  },
  {
    id: 238,
    title: "The Godfather",
    overview: "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family.",
    poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    backdrop_path: "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
    release_date: "1972-03-14",
    vote_average: 8.7,
    genre_ids: [18, 80],
    media_type: "movie"
  },
  {
    id: 240,
    title: "The Godfather Part II",
    overview: "In the continuing saga of the Corleone crime family, a young Vito Corleone grows up in Sicily and in 1910s New York.",
    poster_path: "/hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg",
    backdrop_path: "/kGzFbGhp99zva6oZODW5atUtnqi.jpg",
    release_date: "1974-12-20",
    vote_average: 8.6,
    genre_ids: [18, 80],
    media_type: "movie"
  },
  {
    id: 424,
    title: "Schindler's List",
    overview: "The true story of how businessman Oskar Schindler saved over a thousand Jewish lives from the Nazis.",
    poster_path: "/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg",
    backdrop_path: "/yImmxRokQ48PD49BfCRxZL7tGjt.jpg",
    release_date: "1993-12-15",
    vote_average: 8.6,
    genre_ids: [18, 36, 10752],
    media_type: "movie"
  },
  {
    id: 19404,
    title: "Dilwale Dulhania Le Jayenge",
    overview: "Raj is a rich, carefree, happy-go-lucky second generation NRI. Simran is the daughter of Chaudhary Baldev Singh.",
    poster_path: "/lfRkUr7DYdHldAqi3PwdQGBRBPM.jpg",
    backdrop_path: "/90ez6ArvpO8bvpyIngBuwXOqJm5.jpg",
    release_date: "1995-10-20",
    vote_average: 8.7,
    genre_ids: [35, 18, 10749],
    media_type: "movie"
  },
  {
    id: 155,
    title: "The Dark Knight",
    overview: "Batman raises the stakes in his war on crime with the help of Lt. Jim Gordon and District Attorney Harvey Dent.",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop_path: "/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg",
    release_date: "2008-07-16",
    vote_average: 8.5,
    genre_ids: [18, 28, 80, 53],
    media_type: "movie"
  },
  {
    id: 496243,
    title: "Parasite",
    overview: "All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood.",
    poster_path: "/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    backdrop_path: "/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg",
    release_date: "2019-05-30",
    vote_average: 8.5,
    genre_ids: [35, 18, 53],
    media_type: "movie"
  },
  {
    id: 680,
    title: "Pulp Fiction",
    overview: "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge.",
    poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    backdrop_path: "/4cDFJr4HnXN5AdPw4AKrmLlMWdO.jpg",
    release_date: "1994-09-10",
    vote_average: 8.5,
    genre_ids: [53, 80],
    media_type: "movie"
  },
  {
    id: 13,
    title: "Forrest Gump",
    overview: "A man with a low IQ has accomplished great things in his life and been present during significant historic events.",
    poster_path: "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
    backdrop_path: "/wKKzq4xFZZxKF0FIl16rZFgXE0q.jpg",
    release_date: "1994-07-06",
    vote_average: 8.5,
    genre_ids: [35, 18, 10749],
    media_type: "movie"
  },
  {
    id: 769,
    title: "GoodFellas",
    overview: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners.",
    poster_path: "/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
    backdrop_path: "/sw7mordbZxgITU877yTpZCud90M.jpg",
    release_date: "1990-09-12",
    vote_average: 8.5,
    genre_ids: [18, 80],
    media_type: "movie"
  },
  {
    id: 429,
    title: "The Good, the Bad and the Ugly",
    overview: "While the Civil War rages on, three men – a quiet loner, a ruthless hit man, and a Mexican bandit – comb the American Southwest.",
    poster_path: "/bX2xnavhMYjWDoZp1VM6VnU1xwe.jpg",
    backdrop_path: "/Adrip2Jqzw56KeuV2nAxucKMNXA.jpg",
    release_date: "1966-12-23",
    vote_average: 8.5,
    genre_ids: [37],
    media_type: "movie"
  }
]

export function getSampleMovies(count: number = 12): Movie[] {
  const repeated = []
  while (repeated.length < count) {
    repeated.push(...sampleMovies)
  }
  return repeated.slice(0, count)
}
