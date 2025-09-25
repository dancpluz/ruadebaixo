import DarkModeToggle from "@/components/DarkModeToggle";
import { fetchGameCovers } from "../actions/db/read";
import GameSelect from "@/components/GameSelect";
import Image from 'next/image';
import GameButtons from "@/components/GameButtons";

const mockGameCovers = [
  {
    "id": 101,
    "title": "Cyber Nexus: Reboot",
    "headline": "Hackeie sistemas corporativos em um futuro distópico dominado por IAs",
    "description": "Em 2077, você é um hacker renegado lutando contra megacorporações que controlam a humanidade. Use suas habilidades de programação para invadir sistemas, desbloquear segredos corporativos e libertar a população da opressão digital. Cada decisão afeta o ecossistema digital da cidade.",
    "link": "https://store.example.com/cyber-nexus-reboot",
    "game_tags": ["Ficção científica", "Cyberpunk", "Mundo aberto", "Hacker"],
"tags": ["futurista", "distopia", "IA", "rebelião"],
  "cover": "https://placehold.co/600x400/0f0e17/FFFFFF/png?text=Cyber+Nexus",
    "logo_front": "https://placehold.co/300x100/8a00d4/FFFFFF/png?text=CN",
      "logo_back": "https://placehold.co/300x100/00c3ff/000000/png?text=REBOOT",
        "classification": {
  "image": "https://placehold.co/100x150/ff0000/FFFFFF/png?text=PEGI+18"
},
"topics": [
  {
    "title": "Hacking Realista",
    "description": "Minigames baseados em linguagens de programação reais com desafios de lógica",
    "image": "https://placehold.co/100x100/00ff40/000000/png?text=<>"
  },
  {
    "title": "Mundo Dinâmico",
    "description": "Cidade que reage às suas ações - sistemas de segurança evoluem com suas táticas",
    "image": "https://placehold.co/100x100/0044ff/FFFFFF/png?text=3D"
  },
  {
    "title": "IA Adaptativa",
    "description": "Inimigos que aprendem com seu estilo de jogo e desenvolvem contra-medidas",
    "image": "https://placehold.co/100x100/ff00aa/FFFFFF/png?text=AI"
  }
]
  },
{
  "id": 202,
    "title": "Echoes of Avalon",
      "headline": "Desvende mistérios ancestrais em um reino de magia e criaturas lendárias",
        "description": "Como guardião de Avalon, explore florestas encantadas, resolva quebra-cabeças arcanos e domine magias elementais para restaurar o equilíbrio entre mundos. Com mais de 40 horas de narrativa ramificada, suas escolhas determinam o destino do reino feérico.",
          "link": "https://store.example.com/echoes-of-avalon",
            "game_tags": ["Fantasia", "Aventura", "RPG", "Mundo aberto"],
              "tags": ["magia", "dragões", "puzzles", "escolhas"],
                "cover": "https://placehold.co/600x400/2c5e2a/FFFFFF/png?text=Echoes+Avalon",
                  "logo_front": "https://placehold.co/300x100/d4af37/000000/png?text=AVALON",
                    "logo_back": "https://placehold.co/300x100/4b0082/FFFFFF/png?text=ECHOES",
                      "classification": {
    "image": "https://placehold.co/100x150/ffcc00/000000/png?text=PEGI+12"
  },
  "topics": [
    {
      "title": "Sistema de Magia",
      "description": "Combine elementos para criar mais de 100 feitiços únicos com efeitos sinérgicos",
      "image": "https://placehold.co/100x100/ff7700/000000/png?text=✨"
    },
    {
      "title": "Companheiros Míticos",
      "description": "Domesticar criaturas lendárias que auxiliam em combate e exploração",
      "image": "https://placehold.co/100x100/ff0000/FFFFFF/png?text=🐉"
    },
    {
      "title": "Narrativa Viva",
      "description": "Personagens com rotinas diárias e memórias de suas interações",
      "image": "https://placehold.co/100x100/5500ff/FFFFFF/png?text=📖"
    }
  ]
},
{
  "id": 303,
    "title": "Neon Velocity",
      "headline": "Corridas ilegais em metrópises futuristas com veículos modificados",
        "description": "Personalize seu veículo com 500+ opções de modificação e compita em ligas subterrâneas de Tóquio a Nova York. Desbloqueie habilidades especiais, evada da polícia e estabeleça seu nome no mundo das corridas clandestinas. Modo multiplayer para 12 jogadores com sistema de apostas.",
          "link": "https://store.example.com/neon-velocity",
            "game_tags": ["Corrida", "Velocidade", "Multijogador", "Ficção científica"],
              "tags": ["tuning", "openworld", "arcade", "online"],
                "cover": "https://placehold.co/600x400/1a1a2e/FFFFFF/png?text=Neon+Velocity",
                  "logo_front": "https://placehold.co/300x100/ff00ff/000000/png?text=NEON",
                    "logo_back": "https://placehold.co/300x100/00ffff/000000/png?text=VELOCITY",
                      "classification": {
    "image": "https://placehold.co/100x150/00ff00/000000/png?text=PEGI+16"
  },
  "topics": [
    {
      "title": "Personalização Extrema",
      "description": "Sistema de modificação veicular que afeta desempenho e física",
      "image": "https://placehold.co/100x100/ffdd00/000000/png?text=🔧"
    },
    {
      "title": "Mundo Persistente",
      "description": "Cidades que evoluem com eventos ao vivo e temporadas competitivas",
      "image": "https://placehold.co/100x100/00aaff/FFFFFF/png?text=🌆"
    },
    {
      "title": "Modo Perseguição",
      "description": "Batalhas contra IA policial com táticas adaptativas e equipamento militar",
      "image": "https://placehold.co/100x100/ff0000/FFFFFF/png?text=🚨"
    }
  ]
}
]

export default async function Home() {
  // Utilizando o padrão Result para lidar com possíveis erros
  const gameCoversResult = await fetchGameCovers();
  
  return (
    <main className='h-screen w-screen overflow-clip'>
      <div className='absolute md:top-6 top-4 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-8 size-24 z-10 mix-blend-difference'>
        <Image
          src="/logordb.svg"
          alt="Rua de Baixo Logo"
          width={200}
          height={200}
          className='object-contain size-full'
        />
      </div>
      <GameSelect gameCovers={mockGameCovers} />
      <GameButtons />
      {/* <DarkModeToggle /> */}
    </main>
  )
}
