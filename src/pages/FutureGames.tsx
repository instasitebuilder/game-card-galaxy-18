import React from "react";
import { CalendarDays, Gamepad, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const UPCOMING_GAMES = [
  {
    title: "Cerebro Challenge",
    releaseDate: "Coming Soon",
    description: "A high-octane, brain-training game designed to test and enhance cognitive skills through memory, logic, vocabulary, and quick thinking challenges. Features adaptive difficulty, multiple game modes, and global leaderboards.",
    image: "photo-1581091226825-a6a2a5aee158",
    features: [
      "Memory Match - Test your recall abilities",
      "Logic Puzzles - Solve complex riddles",
      "Vocabulary Blitz - Master word challenges",
      "Quick Math - Solve under pressure",
      "Spatial Reasoning - Navigate visual puzzles"
    ],
    featured: true
  },
  {
    title: "Brainy Quest",
    releaseDate: "In Development",
    description: "Embark on an epic journey of mind-bending challenges.",
    image: "photo-1518770660439-4636190af475"
  },
  {
    title: "Cerebro Challenge",
    releaseDate: "Coming Soon",
    description: "Test your cognitive abilities in this innovative brain training game.",
    image: "photo-1581091226825-a6a2a5aee158"
  },
  {
    title: "Logic Loop",
    releaseDate: "Planning Phase",
    description: "Connect the dots in this mesmerizing puzzle experience.",
    image: "photo-1531297484001-80022131f5a1"
  },
  {
    title: "Mind Marvels",
    releaseDate: "Coming Soon",
    description: "Discover the wonders of your mind through engaging puzzles.",
    image: "photo-1498050108023-c5249f4df085"
  },
  {
    title: "Neuron Nexus",
    releaseDate: "In Development",
    description: "Connect neural pathways in this unique brain training experience.",
    image: "photo-1526374965328-7f61d4dc18c5"
  },
  {
    title: "Riddle Realm",
    releaseDate: "Coming Soon",
    description: "Solve mysterious riddles in an enchanting world.",
    image: "photo-1487058792275-0ad4aaf24ca7"
  },
  {
    title: "Brain Twister",
    releaseDate: "Planning Phase",
    description: "Challenge yourself with mind-bending puzzles.",
    image: "photo-1518770660439-4636190af475"
  },
  {
    title: "Cognitive Circuit",
    releaseDate: "Coming Soon",
    description: "Train your brain with circuit-based challenges.",
    image: "photo-1581091226825-a6a2a5aee158"
  },
  {
    title: "Think Tanker",
    releaseDate: "In Development",
    description: "Dive deep into strategic thinking puzzles.",
    image: "photo-1531297484001-80022131f5a1"
  },
  {
    title: "IQ Odyssey",
    releaseDate: "Coming Soon",
    description: "Embark on an intelligence-boosting adventure.",
    image: "photo-1498050108023-c5249f4df085"
  },
  {
    title: "Puzzling Perceptions",
    releaseDate: "Planning Phase",
    description: "Challenge your perception with optical illusions.",
    image: "photo-1526374965328-7f61d4dc18c5"
  },
  {
    title: "Mental Matrix",
    releaseDate: "Coming Soon",
    description: "Navigate through complex mental challenges.",
    image: "photo-1487058792275-0ad4aaf24ca7"
  },
  {
    title: "MindSpark",
    releaseDate: "In Development",
    description: "Ignite your cognitive abilities with spark-based puzzles.",
    image: "photo-1518770660439-4636190af475"
  }
];

const FutureGames = () => {
  const { toast } = useToast();

  const handleNotifyMe = (game: string) => {
    toast({
      title: "Notification Set",
      description: `We'll notify you when ${game} is available!`,
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-game p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <CalendarDays className="w-8 h-8 text-game-accent" />
          <h1 className="text-4xl font-bold text-white">Upcoming Games</h1>
        </div>

        {/* Featured Game */}
        {UPCOMING_GAMES.filter(game => game.featured).map(game => (
          <div key={game.title} className="mb-16 relative overflow-hidden rounded-2xl bg-gradient-card backdrop-blur-sm border border-game-card-border">
            <div className="aspect-[21/9] relative overflow-hidden">
              <img
                src={`https://images.unsplash.com/${game.image}`}
                alt={game.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-game-primary/90 via-game-primary/50 to-transparent" />
            </div>
            <div className="absolute bottom-0 w-full p-8">
              <div className="flex items-center gap-2 text-game-accent mb-4">
                <Clock className="w-5 h-5" />
                <span className="text-sm font-medium">{game.releaseDate}</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">{game.title}</h2>
              <p className="text-white/80 text-lg max-w-2xl mb-6">{game.description}</p>
              {game.features && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {game.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-white/70">
                      <div className="w-2 h-2 bg-game-accent rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              )}
              <button
                onClick={() => handleNotifyMe(game.title)}
                className="inline-flex items-center gap-2 bg-game-accent text-white px-6 py-3 rounded-lg hover:bg-game-accent/90 transition-colors"
              >
                <Gamepad className="w-5 h-5" />
                <span>Notify Me</span>
              </button>
            </div>
          </div>
        ))}

        {/* Grid of Other Games */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {UPCOMING_GAMES.filter(game => !game.featured).map((game) => (
            <div
              key={game.title}
              className="group relative overflow-hidden rounded-xl bg-gradient-card backdrop-blur-sm border border-game-card-border hover:scale-[1.02] transition-all duration-300"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={`https://images.unsplash.com/${game.image}`}
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-game-primary/90 via-game-primary/50 to-transparent" />
              </div>
              <div className="absolute bottom-0 w-full p-6">
                <div className="flex items-center gap-2 text-game-accent mb-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">{game.releaseDate}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{game.title}</h3>
                <p className="text-white/70 text-sm mb-4">{game.description}</p>
                <button
                  onClick={() => handleNotifyMe(game.title)}
                  className="inline-flex items-center gap-2 text-game-accent hover:text-white transition-colors"
                >
                  <Gamepad className="w-4 h-4" />
                  <span className="text-sm font-medium">Notify Me</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FutureGames;