/**
 * BarChartRace.tsx
 * 
 * Diese Komponente implementiert ein interaktives Balkenrennen-Diagramm, das die Punkteentwicklung
 * von Spielern in einem Bundesliga-Tippspiel über 34 Spieltage visualisiert.
 */

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion"; // Animation-Library für React
import { playerData, gameweeks } from "../data/leagueData"; // Importiert Daten für Spieler und Spieltage
import AnimatedBarChart from "./AnimatedBarChart"; // Unter-Komponente für die Balkenanimation
import { PlayIcon, PauseIcon, RewindIcon } from "lucide-react"; // Icons für die Steuerelemente

const BarChartRace = () => {
  // --- State Management ---
  
  // Aktueller Spieltag, startet bei 0 (erster Spieltag)
  const [currentGameweek, setCurrentGameweek] = useState(0);
  
  // Steuerung der Animation: läuft die Animation gerade oder nicht
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Geschwindigkeit der Animation in Millisekunden pro Spieltag
  const [speed, setSpeed] = useState(1000); 
  
  // Referenz für den Timer, der die Animation steuert
  const timerRef = useRef<number | null>(null);
  
  // Maximale Punktzahl, die im Diagramm dargestellt werden kann (für die Skalierung wichtig)
  const maxPossiblePoints = 270; // Etwas höher als die höchste erwartete Punktzahl
  
  /**
   * Bereitet die Daten für den aktuellen Spieltag vor
   * @param gameweekIndex - Index des Spieltags (0-basiert)
   * @returns Array mit Spielerdaten für den Spieltag, nach Punkten sortiert
   */
  const prepareData = (gameweekIndex: number) => {
    if (gameweekIndex < 0) return [];
    
    return playerData
      .map(player => ({
        name: player.name,
        points: player.points[gameweekIndex],
        rank: player.rankings[gameweekIndex],
        color: player.color
      }))
      .sort((a, b) => b.points - a.points); // Sortiert nach Punkten absteigend
  };

  // State für die aktuell anzuzeigenden Chartdaten
  const [chartData, setChartData] = useState(prepareData(currentGameweek));

  /**
   * Berechnet die in einem Spieltag gewonnenen Punkte für einen Spieler
   * @param gameweekIndex - Der aktuelle Spieltag
   * @param playerName - Name des Spielers
   * @returns Die Punktedifferenz zum vorherigen Spieltag
   */
  const getPointsGained = (gameweekIndex: number, playerName: string) => {
    // Für den ersten Spieltag sind alle Punkte "neue Punkte"
    if (gameweekIndex <= 0) return playerData.find(p => p.name === playerName)?.points[0] || 0;
    
    // Für alle anderen Spieltage: Differenz zum vorherigen Spieltag berechnen
    const currentPoints = playerData.find(p => p.name === playerName)?.points[gameweekIndex] || 0;
    const prevPoints = playerData.find(p => p.name === playerName)?.points[gameweekIndex - 1] || 0;
    
    return currentPoints - prevPoints;
  };

  // Aktualisiert die Chartdaten, wenn sich der aktuelle Spieltag ändert
  useEffect(() => {
    setChartData(prepareData(currentGameweek));
  }, [currentGameweek]);

  /**
   * Effect-Hook zur Steuerung der Animation
   * Startet oder stoppt einen Timer, der die Spieltage fortschreitend anzeigt
   */
  useEffect(() => {
    if (isPlaying) {
      // Animation läuft: Timer starten, der den Spieltag erhöht
      timerRef.current = window.setInterval(() => {
        setCurrentGameweek(prev => {
          // Wenn der letzte Spieltag erreicht ist, Animation stoppen
          if (prev >= gameweeks.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1; // Zum nächsten Spieltag wechseln
        });
      }, speed);
    } else if (timerRef.current) {
      // Animation gestoppt: Timer löschen
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Cleanup-Funktion: Timer aufräumen, wenn die Komponente unmounted wird
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPlaying, speed]); // Abhängigkeiten: wird neu ausgeführt, wenn sich isPlaying oder speed ändert

  /**
   * Wechselt zwischen Play und Pause
   * Wenn das Ende erreicht ist und Play gedrückt wird, startet sie von vorne
   */
  const togglePlay = () => {
    if (currentGameweek >= gameweeks.length - 1 && !isPlaying) {
      // Wenn am Ende und auf Play geklickt wird, von vorne beginnen
      setCurrentGameweek(0);
      setIsPlaying(true);
    } else {
      // Sonst einfach den Play/Pause Status umschalten
      setIsPlaying(!isPlaying);
    }
  };

  /**
   * Setzt die Animation auf den Anfang zurück
   */
  const resetAnimation = () => {
    setCurrentGameweek(0);
    setIsPlaying(false);
  };

  /**
   * Handler für Änderungen am Slider, der den Spieltag direkt auswählt
   */
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setCurrentGameweek(value);
    if (isPlaying) {
      // Animation stoppt, wenn der Benutzer manuell einen Spieltag auswählt
      setIsPlaying(false);
    }
  };

  /**
   * Ändert die Animationsgeschwindigkeit
   */
  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
  };

  /**
   * Ermittelt den Spieler, der im aktuellen Spieltag die meisten Punkte gewonnen hat
   * @returns Spieler mit höchstem Punktezuwachs oder null
   */
  const getTopPerformer = () => {
    if (currentGameweek <= 0) return null;
    
    // Für jeden Spieler den Punktegewinn berechnen
    const gains = playerData.map(player => ({
      name: player.name,
      gain: getPointsGained(currentGameweek, player.name)
    }));
    
    // Nach Punktegewinn sortieren und den Spieler mit dem höchsten Gewinn zurückgeben
    const topGainer = [...gains].sort((a, b) => b.gain - a.gain)[0];
    return topGainer;
  };
  
  // Top-Performer für den aktuellen Spieltag berechnen
  const topPerformer = getTopPerformer();

  return (
    <div className="w-full max-w-6xl mx-auto p-4 bg-gray-900 rounded-xl shadow-xl text-gray-100">
      {/* Header-Bereich mit Titel und aktuellem Spieltag */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white p-4 -mx-4 -mt-4 mb-4 rounded-t-xl shadow-md">
        <h1 className="text-2xl font-bold text-center">Bundesliga Tippspiel 2023/2024</h1>
        <div className="flex justify-center items-center mt-2">
          {/* Animierter Spieltag-Label mit Pulseffekt */}
          <motion.div 
            animate={{ scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-xl font-semibold text-yellow-300 drop-shadow-md"
          >
            {gameweeks[currentGameweek]?.label || "Spieltag 1"}
          </motion.div>
        </div>
      </div>
      
      {/* Statusbereich: Zeigt den aktuellen Stand und den Top-Performer */}
      <div className="bg-gray-800 p-3 rounded-lg mb-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="font-medium text-indigo-300 text-sm">
            Aktueller Stand nach {gameweeks[currentGameweek]?.label}
          </div>
          
          {/* Zeigt den Top-Performer an, wenn es einen gibt und er Punkte gewonnen hat */}
          {topPerformer && topPerformer.gain > 0 && (
            <div className="text-xs bg-green-900 text-green-300 px-2 py-0.5 rounded-full">
              Top Performer: {topPerformer.name} (+{topPerformer.gain} Punkte)
            </div>
          )}
        </div>
      </div>
      
      {/* Hier wird das eigentliche Balkendiagramm gerendert */}
      <div className="mb-4">
        <AnimatedBarChart data={chartData} maxValue={maxPossiblePoints} />
      </div>
      
      {/* Steuerelemente für die Animation */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-center space-x-4">
          {/* Zurücksetzen-Button */}
          <button
            onClick={resetAnimation}
            className="p-2 bg-gray-700 text-gray-200 rounded-full hover:bg-gray-600 transition-colors"
            title="Zurücksetzen"
          >
            <RewindIcon size={18} />
          </button>
          
          {/* Play/Pause/Neustart-Button mit kontextabhängigem Text und Icon */}
          <button
            onClick={togglePlay}
            className="px-4 py-2 bg-purple-800 text-white rounded-full hover:bg-purple-700 transition-colors flex items-center justify-center shadow-md"
          >
            {isPlaying ? <><PauseIcon size={18} className="mr-2" /> Pause</> : 
              currentGameweek >= gameweeks.length - 1 ? 
                <><RewindIcon size={18} className="mr-2" /> Neustart</> : 
                <><PlayIcon size={18} className="mr-2" /> Abspielen</>}
          </button>
          
          {/* Geschwindigkeitssteuerung */}
          <div className="space-x-2">
            <button
              onClick={() => handleSpeedChange(2000)}
              className={`px-2 py-1 rounded-full text-xs transition-colors ${speed === 2000 ? 'bg-purple-700 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'}`}
            >
              Langsam
            </button>
            <button
              onClick={() => handleSpeedChange(1000)}
              className={`px-2 py-1 rounded-full text-xs transition-colors ${speed === 1000 ? 'bg-purple-700 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'}`}
            >
              Normal
            </button>
            <button
              onClick={() => handleSpeedChange(500)}
              className={`px-2 py-1 rounded-full text-xs transition-colors ${speed === 500 ? 'bg-purple-700 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'}`}
            >
              Schnell
            </button>
          </div>
        </div>
        
        {/* Zeitleiste/Slider zum manuellen Navigieren zwischen Spieltagen */}
        <div className="w-full px-2">
          <input
            type="range"
            min={0}
            max={gameweeks.length - 1}
            value={currentGameweek}
            onChange={handleSliderChange}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer scrollbar-thin"
          />
          {/* Beschriftung der Zeitleiste */}
          <div className="flex justify-between mt-1 text-xs text-gray-400">
            <span>Spieltag 1</span>
            <span>Spieltag 17</span>
            <span>Spieltag 34</span>
          </div>
        </div>
      </div>
      
      {/* Legende: Zeigt Farbcodes für alle Spieler */}
      <div className="mt-4 border-t border-gray-700 pt-3">
        <div className="text-xs text-gray-400 mb-1">Spieler Farbencodes:</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {playerData.map(player => (
            <div key={player.name} className="flex items-center bg-gray-800 p-1.5 rounded">
              <div className="w-3 h-3 mr-2 rounded" style={{ backgroundColor: player.color }}></div>
              <span className="text-xs text-gray-200">{player.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BarChartRace;
