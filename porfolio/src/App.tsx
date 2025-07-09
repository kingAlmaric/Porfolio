import React, { useState, useEffect } from 'react';
import { Terminal, Code, Zap, Database, Globe, Mail, Phone, MapPin, Github, Linkedin, Download, ExternalLink, User, Calendar, Award } from 'lucide-react';

// Animation des particules
const ParticleSystem = () => {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, vx: number, vy: number}>>([]);

  useEffect(() => {
    const newParticles = Array.from({length: 50}, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5
    }));
    setParticles(newParticles);

    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        x: (p.x + p.vx + window.innerWidth) % window.innerWidth,
        y: (p.y + p.vy + window.innerHeight) % window.innerHeight
      })));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-cyan-500 rounded-full opacity-20 animate-pulse"
          style={{
            left: particle.x,
            top: particle.y,
            boxShadow: '0 0 4px #00ffff'
          }}
        />
      ))}
    </div>
  );
};

// Composant de typing animation
const TypingText = ({ text, delay = 50, className = "" }: { text: string, delay?: number, className?: string }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, delay]);

  return <span className={className}>{displayText}<span className="animate-pulse">|</span></span>;
};

// Grille hexagonale
const HexGrid = () => {
  return (
    <div className="fixed inset-0 opacity-5 pointer-events-none z-0">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hexagons" width="100" height="87" patternUnits="userSpaceOnUse">
            <polygon
              points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25"
              fill="none"
              stroke="#ff4500"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons)" />
      </svg>
    </div>
  );
};

function App() {
  const [activeSection, setActiveSection] = useState('à propos');
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalText, setTerminalText] = useState('');
  
  console.log("Ma clé :", import.meta.env.VITE_EXEMPLE_NOM);
  

  const compétences = {
    frontend: ['HTML5', 'CSS3', 'JavaScript', 'Vue.js', 'React', 'Angular', 'Responsive Design'],
    backend: ['PHP', 'Laravel', 'Blade', 'Python', 'C#'],
    database: ['SQL Server', 'SQLite', 'MySQL'],
    devops: ['GitHub', 'Vite', 'Visual Studio'],
    design: ['Canva (confirmé)', 'Figma (débutant)', 'UI/UX Design']
  };

  const projets = [
    {
      title: 'Todo App - Laravel + SQLite',
      description: 'Application web CRUD avec authentification et design responsive',
      tech: ['Laravel', 'Blade', 'PHP', 'HTML/CSS', 'JavaScript', 'SQLite'],
      github: 'https://github.com/kingAlmaric/Todo-App',
      demo: '#'
    },
    {
      title: 'Guide GitHub pour débutants',
      description: 'Tutoriel pratique avec commandes Git, gestion d\'erreurs et workflow',
      tech: ['Git', 'GitHub', 'Documentation', 'Markdown'],
      github: '#',
      demo: '#'
    },
    {
      title: 'Création graphique - TikTok Gaming',
      description: 'Conception d\'affiches pour COD Mobile avec Canva',
      tech: ['Canva', 'Design graphique', 'Gaming', 'Réseaux sociaux'],
      github: '#',
      demo: 'https://www.tiktok.com/@amonre1'
    }
  ];

  const handleTerminal = (command: string) => {
    setTerminalText(prev => prev + `$ ${command}\n`);
    
    switch(command.toLowerCase()) {
      case 'help':
        setTerminalText(prev => prev + 'Commandes disponibles: compétences, projets, contact, education, clear\n\n');
        break;
      case 'compétences':
        setTerminalText(prev => prev + 'Frontend: HTML5, CSS3, JavaScript, Vue.js, React, Angular\nBackend: PHP, Laravel, Python, C#\nDatabase: SQL Server, SQLite, MySQL\nDesign: Canva, Figma, UI/UX\n\n');
        break;
      case 'projets':
        setTerminalText(prev => prev + 'projets: Todo App Laravel, Guide GitHub, Créations graphiques\n\n');
        break;
      case 'contact':
        setTerminalText(prev => prev + 'Email: almaric2013k@gmail.com\nTéléphone: +225 07 49 395 697\nLocalisation: Abidjan Cocody, Djibi\n\n');
        break;
      case 'education':
        setTerminalText(prev => prev + 'Licence 3 - Développement d\'Applications, HETEC\nCertificat Python - University of Michigan, Coursera\n\n');
        break;
      case 'clear':
        setTerminalText('');
        break;
      default:
        setTerminalText(prev => prev + `Commande non reconnue: ${command}\nTapez 'help' pour voir les commandes disponibles.\n\n`);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <ParticleSystem />
      <HexGrid />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-orange-500/30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded transform rotate-45"></div>
              <span className="text-xl font-mono font-bold text-orange-500">KOUASSI.dev</span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              {['à propos', 'compétences', 'projets', 'expérience', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`px-4 py-2 rounded-lg border transition-all duration-300 font-mono uppercase text-sm tracking-wider ${
                    activeSection === section
                      ? 'border-orange-500 bg-orange-500/20 text-orange-500 shadow-lg shadow-orange-500/20'
                      : 'border-gray-700 hover:border-orange-500/50 hover:text-orange-500'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>

            <button
              onClick={() => setTerminalOpen(!terminalOpen)}
              className="p-2 border border-green-500 rounded-lg hover:bg-green-500/20 transition-all duration-300"
            >
              <Terminal className="w-5 h-5 text-green-500" />
            </button>
          </div>
        </div>
      </nav>

      {/* Terminal */}
      {terminalOpen && (
        <div className="fixed top-20 right-6 w-96 h-64 bg-black border border-green-500 rounded-lg z-50 font-mono text-sm shadow-2xl shadow-green-500/20">
          <div className="flex items-center justify-between p-2 border-b border-green-500">
            <span className="text-green-500">terminal</span>
            <button
              onClick={() => setTerminalOpen(false)}
              className="text-red-500 hover:bg-red-500/20 px-2 py-1 rounded"
            >
              ×
            </button>
          </div>
          <div className="p-4 h-48 overflow-y-auto">
            <div className="text-green-500">
              {terminalText}
            </div>
            <div className="flex items-center">
              <span className="text-green-500">$ </span>
              <input
                type="text"
                className="bg-transparent outline-none text-green-500 flex-1 ml-2"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleTerminal(e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
                placeholder="Tapez 'help' pour commencer..."
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="relative z-10 pt-24">
        {/* Hero Section */}
        {activeSection === 'à propos' && (
          <section className="min-h-screen flex items-center justify-center px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-8">
                <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
                  <TypingText text="KOUASSI" delay={100} />
                </h1>
                <h2 className="text-2xl md:text-4xl font-mono text-cyan-500 mb-6">
                  <TypingText text="N'guéssan Yann-Joris Almaric" delay={80} />
                </h2>
                <div className="text-xl md:text-2xl text-gray-300 mb-8">
                  <TypingText text="Développeur Frontend Passionné | Étudiant HETEC | Candidat Stage " delay={30} />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="p-6 border border-orange-500/30 rounded-lg bg-orange-500/5 hover:bg-orange-500/10 transition-all duration-300 group">
                  <Code className="w-12 h-12 text-orange-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold mb-2">Frontend Expert</h3>
                  <p className="text-gray-400">HTML5, CSS3, JavaScript, Vue.js, React</p>
                </div>
                
                <div className="p-6 border border-red-500/30 rounded-lg bg-red-500/5 hover:bg-red-500/10 transition-all duration-300 group">
                  <Database className="w-12 h-12 text-red-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold mb-2">Backend & Database</h3>
                  <p className="text-gray-400">PHP, Laravel, Python, SQL Server</p>
                </div>
                
                <div className="p-6 border border-cyan-500/30 rounded-lg bg-cyan-500/5 hover:bg-cyan-500/10 transition-all duration-300 group">
                  <Zap className="w-12 h-12 text-cyan-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold mb-2">UI/UX Design</h3>
                  <p className="text-gray-400">Canva, Figma, Responsive Design</p>
                </div>
              </div>

<div className="flex justify-center space-x-6">
  <button 
    onClick={() => window.open('https://drive.google.com/file/d/1C-zVYkm5p1MZgfFTZ-eS3dy9ZNKTedHv/view?usp=drive_link', '_blank')}
    className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg font-bold hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105"
  >
    <Download className="w-5 h-5 inline mr-2" />
    Télécharger CV
  </button>
  <button
    onClick={() => setActiveSection('contact')}
    className="px-8 py-3 border border-cyan-500 text-cyan-500 rounded-lg font-bold hover:bg-cyan-500/20 transition-all duration-300"
  >
    <Mail className="w-5 h-5 inline mr-2" />
    Me Contacter
  </button>
</div>

              <div className="mt-12 p-6 border border-cyan-500/30 rounded-lg bg-gradient-to-r from-cyan-500/5 to-blue-500/5">
                <h3 className="text-2xl font-bold mb-4 text-cyan-500">Recherche de Stage</h3>
                <p className="text-gray-300 text-lg mb-4">
                  Étudiant en Licence 3 Développement d'Applications à HETEC
                </p>
                <p className="text-gray-400">
                  Disponible à partir de Maintenant • Spécialisé en développement Frontend • 
                  Passionné par l'innovation eBanking • Prêt à contribuer aux projets de votre Banque
                </p>
              </div>
            </div>
          </section>
        )}

        {/* compétences Section */}
{activeSection === 'compétences' && (
  <section className="min-h-screen py-20 px-6">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
        COMPÉTENCES TECHNIQUES
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(compétences).map(([category, skillList], index) => (
          <div
            key={category}
            className="p-6 border border-gray-700 rounded-lg bg-gray-900/50 hover:border-orange-500/50 transition-all duration-300 group"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <h3 className="text-2xl font-bold mb-6 capitalize text-orange-500 group-hover:text-red-500 transition-colors flex items-center">
              <span className="mr-2">
                {category === 'frontend' ? '🎨' :
                  category === 'backend' ? '⚙️' :
                 category === 'database' ? '🗄️' :
                 category === 'devops' ? '🚀' : '🎯'}
              </span>
              {category === 'frontend' ? 'Frontend' :
                category === 'backend' ? 'Backend' :
               category === 'database' ? 'Base de données' :
               category === 'devops' ? 'Outils & DevOps' : 'Design UI/UX'}
            </h3>
            <div className="space-y-4">
              {skillList.map((skill, skillIndex) => {
                // Définir les niveaux pour chaque compétence (vous pouvez ajuster selon vos vraies compétences)
                const getSkillLevel = (skillName) => {
                  const skillLevels = {
                    // Frontend
                    'React': 50,
                    'JavaScript': 50,
                    'CSS3': 65,
                    'Next.js': 70,
                    'HTML5': 70,
                    'Angular': 50,
                    'Vue.js': 50,
                    
                    // Backend
                    'Python': 50,
                    'C#': 20,
                    'PHP': 55,
                    'Laravel': 50,
                    'Blade': 40,
                    
                    // Database
                    'SQL Server': 40,
                    'SQLite': 30,
                    'MySQL': 35,
                    
                    // DevOps
                    'GitHub': 40,
                    'Visual Studio': 50,
                    
                    // Design
                    'Figma': 75,
                    'Adobe XD': 60,
                    'Photoshop': 55
                  };
                  return skillLevels[skillName] || 50;
                };

                const level = getSkillLevel(skill);
                const getStatusLabel = (level) => {
                  if (level >= 80) return { label: '[EXPERT]', color: 'text-green-400' };
                  if (level >= 60) return { label: '[AVANCÉ]', color: 'text-blue-400' };
                  if (level >= 40) return { label: '[INTERMÉDIAIRE]', color: 'text-yellow-400' };
                  return { label: '[DÉBUTANT]', color: 'text-red-400' };
                };

                const status = getStatusLabel(level);

                return (
                  <div
                    key={skill}
                    className="space-y-2 p-3 rounded hover:bg-orange-500/10 transition-all duration-300"
                    style={{ animationDelay: `${(index * 0.2) + (skillIndex * 0.1)}s` }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-sm">{skill}</span>
                      <span className={`font-mono text-xs ${status.color}`}>{status.label}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-800 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className={`h-full rounded-full animate-pulse ${
                            level >= 80 ? 'bg-gradient-to-r from-green-500 to-green-400' :
                            level >= 60 ? 'bg-gradient-to-r from-blue-500 to-blue-400' :
                            level >= 40 ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' :
                            'bg-gradient-to-r from-red-500 to-red-400'
                          }`}
                          style={{width: `${level}%`}}
                        ></div>
                      </div>
                      <span className={`font-mono text-xs ${status.color}`}>
                        {level}/100
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Terminal-style footer */}
            <div className="mt-4 p-2 bg-gray-800/50 rounded border border-gray-700">
              <p className="text-xs text-gray-400 font-mono">
                <span className="text-cyan-400">~/dev/{category}$</span> {skillList.length} compétences chargées
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 border border-green-500/30 rounded-lg bg-green-500/5">
          <h3 className="text-2xl font-bold mb-4 text-green-500 flex items-center">
            <span className="mr-2">💡</span>
            Compétences transversales
          </h3>
          <ul className="space-y-2 text-gray-300">
            <li>• Rigueur et respect des délais</li>
            <li>• Autonomie technique et apprentissage rapide</li>
            <li>• Créativité dans la conception d'interfaces</li>
            <li>• Travail en équipe et collaboration</li>
            <li>• Résolution de problèmes complexes</li>
            <li>• Adaptabilité aux nouvelles technologies</li>
            <li>• Veille technologique et curiosité</li>
            <li>• Optimisation des performances</li>
          </ul>
        </div>
        
        <div className="p-6 border border-blue-500/30 rounded-lg bg-blue-500/5">
          <h3 className="text-2xl font-bold mb-4 text-blue-500 flex items-center">
            <span className="mr-2">🌐</span>
            Langues & Communication
          </h3>
          <div className="space-y-4 text-gray-300">
            
            {/* Français */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-mono">Français</span>
                <span className="text-green-400 font-mono text-sm">[MATERNELLE]</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-800 rounded-full h-2 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full animate-pulse" style={{width: '100%'}}></div>
                </div>
                <span className="text-green-400 font-mono text-xs">100/100</span>
              </div>
            </div>

            {/* Anglais */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-mono">Anglais</span>
                <span className="text-yellow-400 font-mono text-sm">[DÉBUTANT]</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-800 rounded-full h-2 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full animate-pulse" style={{width: '30%'}}></div>
                </div>
                <span className="text-yellow-400 font-mono text-xs">30/100</span>
              </div>
            </div>

            {/* Code */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-mono">Langage Code</span>
                <span className="text-cyan-400 font-mono text-sm">[INTERMÉDIAIRE]</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-800 rounded-full h-2 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-pulse" style={{width: '50%'}}></div>
                </div>
                <span className="text-cyan-400 font-mono text-xs">50/100</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-gray-800/50 rounded border border-gray-700">
              <p className="text-xs text-gray-400 font-mono leading-relaxed">
                <span className="text-green-400">~/compétences$</span> Communication professionnelle en français, 
                amélioration continue en anglais technique, 
                maîtrise des langages de programmation modernes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)}


        {/* projets Section */}
        {activeSection === 'projets' && (
          <section className="min-h-screen py-20 px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                PROJETS RÉALISÉS
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projets.map((projets, index) => (
                  <div
                    key={projets.title}
                    className="group relative p-6 border border-gray-700 rounded-lg bg-gradient-to-br from-gray-900/80 to-gray-800/80 hover:border-orange-500/50 transition-all duration-500 transform hover:scale-105"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 to-red-500/0 group-hover:from-orange-500/10 group-hover:to-red-500/10 rounded-lg transition-all duration-500"></div>
                    
                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold mb-3 text-orange-500 group-hover:text-red-500 transition-colors">
                        {projets.title}
                      </h3>
                      <p className="text-gray-300 mb-4">{projets.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {projets.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-cyan-500/20 text-cyan-500 rounded-full text-sm font-mono border border-cyan-500/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex space-x-4">
                        <a
                          href={projets.github}
                          className="flex items-center space-x-2 px-4 py-2 border border-gray-600 rounded-lg hover:border-orange-500 hover:text-orange-500 transition-all duration-300"
                        >
                          <Github className="w-4 h-4" />
                          <span>Code</span>
                        </a>
                        <a
                          href={projets.demo}
                          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Demo</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* expérience Section */}
        {activeSection === 'expérience' && (
          <section className="min-h-screen py-20 px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                PARCOURS & FORMATION
              </h2>
              
              <div className="space-y-12">
                {/* Formation */}
                <div className="relative">
                  <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-orange-500 to-red-500"></div>
                  
                  <div className="pl-8">
                    <div className="p-6 border border-gray-700 rounded-lg bg-gray-900/50 hover:border-orange-500/50 transition-all duration-300">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                        <h3 className="text-2xl font-bold text-orange-500">Formation Actuelle</h3>
                      </div>
                      <p className="text-xl text-cyan-500 mb-2">Licence 3 - Développement d'Applications</p>
                      <p className="text-gray-400 mb-4">HETEC • Octobre 2024 - Mai 2025</p>
                      <p className="text-gray-300 mb-4">En attente de stage de fin d'études pour valider le diplôme</p>
                      <p className="text-sm text-yellow-500">Soutenance prévue à l'issue du stage</p>
                    </div>
                  </div>
                </div>

                {/* Certification */}
                <div className="relative">
                  <div className="pl-8">
                    <div className="p-6 border border-gray-700 rounded-lg bg-gray-900/50 hover:border-orange-500/50 transition-all duration-300">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <h3 className="text-2xl font-bold text-green-500">Certification Python</h3>
                      </div>
                      <p className="text-xl text-cyan-500 mb-2">University of Michigan - Coursera</p>
                      <p className="text-gray-400 mb-4">Novembre 2023</p>
                      <a 
                        href="https://coursera.org/verify/JPQJJR8TAWNH"
                        className="inline-flex items-center space-x-2 text-blue-500 hover:text-blue-400 transition-colors"
                      >
                        <Award className="w-4 h-4" />
                        <span>Voir le certificat</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Expérience BNETD */}
                <div className="relative">
                  <div className="pl-8">
                    <div className="p-6 border border-gray-700 rounded-lg bg-gray-900/50 hover:border-orange-500/50 transition-all duration-300">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                        <h3 className="text-2xl font-bold text-blue-500">Stagiaire Développeur</h3>
                      </div>
                      <p className="text-xl text-cyan-500 mb-2">BNETD</p>
                      <p className="text-gray-400 mb-4">Juin 2022 - Mars 2023 (10 mois)</p>
                      <ul className="space-y-2 text-gray-300">
                        <li>• Analyse des besoins utilisateurs et conception fonctionnelle (Merise)</li>
                        <li>• Développement de l'interface en HTML, CSS, JavaScript</li>
                        <li>• Intégration côté back-end en SQL Server</li>
                        <li>• Support utilisateurs sur application interne et ERP</li>
                        <li>• Environnement : Visual Studio, SSMS</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Inventoriste IT */}
                <div className="relative">
                  <div className="pl-8">
                    <div className="p-6 border border-gray-700 rounded-lg bg-gray-900/50 hover:border-orange-500/50 transition-all duration-300">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                        <h3 className="text-2xl font-bold text-purple-500">Inventoriste IT</h3>
                      </div>
                      <p className="text-xl text-cyan-500 mb-2">BNETD</p>
                      <p className="text-gray-400 mb-4">Novembre 2022 - Janvier 2023</p>
                      <ul className="space-y-2 text-gray-300">
                        <li>• Recensement du parc informatique</li>
                        <li>• Saisie en base de données et étiquetage du matériel</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Contact Section */}
        {activeSection === 'contact' && (
          <section className="min-h-screen py-20 px-6 flex items-center justify-center">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-6xl font-bold mb-16 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                CONNECTONS-NOUS
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
  <a 
    href="mailto:almaric2013k@gmail.com"
    className="block p-8 border border-orange-500/30 rounded-lg bg-gradient-to-br from-orange-500/10 to-red-500/10 hover:from-orange-500/20 hover:to-red-500/20 transition-all duration-300 group cursor-pointer"
  >
    <Mail className="w-12 h-12 text-orange-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
    <h3 className="text-2xl font-bold mb-4">Email</h3>
    <span className="text-cyan-500 hover:text-cyan-400 transition-colors font-mono">
      almaric2013k@gmail.com
    </span>
  </a>
  
  <a 
    href="tel:+2250749395697"
    className="block p-8 border border-red-500/30 rounded-lg bg-gradient-to-br from-red-500/10 to-pink-500/10 hover:from-red-500/20 hover:to-pink-500/20 transition-all duration-300 group cursor-pointer"
  >
    <Phone className="w-12 h-12 text-red-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
    <h3 className="text-2xl font-bold mb-4">Téléphone</h3>
    <span className="text-cyan-500 hover:text-cyan-400 transition-colors font-mono">
      +225 07 49 395 697
    </span>
  </a>
</div>

              <div className="mb-12 p-8 border border-cyan-500/30 rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
                <MapPin className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4 text-cyan-500">Localisation</h3>
                <p className="text-gray-300 text-lg">Abidjan Cocody, Djibi</p>
                <p className="text-gray-400">Côte d'Ivoire • Ivoirien • Célibataire</p>
              </div>

              <div className="flex justify-center space-x-8 mb-12">
                <a
                  href="https://github.com/kingAlmaric"
                  className="p-4 border border-gray-700 rounded-lg hover:border-orange-500 hover:bg-orange-500/20 transition-all duration-300 group"
                >
                  <Github className="w-8 h-8 text-gray-400 group-hover:text-orange-500 transition-colors" />
                </a>
                <a
                  href="#"
                  className="p-4 border border-gray-700 rounded-lg hover:border-cyan-500 hover:bg-cyan-500/20 transition-all duration-300 group"
                >
                  <Linkedin className="w-8 h-8 text-gray-400 group-hover:text-cyan-500 transition-colors" />
                </a>
              </div>

              <div className="p-8 border border-cyan-500/30 rounded-lg bg-gradient-to-r from-cyan-500/5 to-blue-500/5">
                <h3 className="text-2xl font-bold mb-4 text-cyan-500">Candidature spontanée – Stage Développement Informatique</h3>
                <p className="text-gray-300 text-lg mb-6">
                  Développeur Frontend passionné recherchant un stage de fin d'études
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
                  <div>
                    <p><strong>Disponibilité :</strong> Maintenant</p>
                    <p><strong>Durée :</strong> Stage de fin d'études</p>
                  </div>
                  <div>
                    <p><strong>Spécialités :</strong> Frontend, eBanking</p>
                    <p><strong>Objectif :</strong> Validation Licence 3</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-400 font-mono">
            © 2025 KOUASSI N'guéssan Yann-Joris Almaric. Développé avec ❤️ et beaucoup de ☕
          </p>
          <p className="text-sm text-orange-500 mt-2">
            Portfolio conçu pour vous - Candidature Stage Développeur Frontend
          </p>
        </div>
      </footer>
    </div>
  );
}


export default App;