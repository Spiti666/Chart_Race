
import { motion } from "framer-motion";
import BarChartRace from "../components/BarChartRace";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-indigo-900 py-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4"
      >
        <div className="mb-6 text-center">
          <motion.h1 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-300"
          >
            Bundesliga Tippspiel 2023/2024
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-300 text-sm"
          >
            Visualisierung der Bundesliga-Tippspiel-Daten über die gesamte Saison
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <BarChartRace />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-8 max-w-3xl mx-auto bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 text-gray-200"
        >
          <h2 className="text-xl font-semibold mb-3 text-indigo-300">Über dieses Dashboard</h2>
          <p className="mb-3 text-gray-300 text-sm">
            Diese interaktive Visualisierung zeigt die Punkteentwicklung im Bundesliga-Tippspiel über alle 34 Spieltage.
            Verfolgen Sie den spannenden Wettkampf zwischen den Spielern und beobachten Sie, wie sich die Positionen 
            im Laufe der Saison verändern.
          </p>
          <p className="text-gray-300 text-sm">
            <span className="font-medium text-indigo-300">Funktionen:</span>
            <ul className="list-disc ml-6 mt-1 space-y-1">
              <li>Animation der Punkteentwicklung über die gesamte Saison</li>
              <li>Einstellung der Animationsgeschwindigkeit (langsam, normal, schnell)</li>
              <li>Manuelles Navigieren zwischen einzelnen Spieltagen</li>
              <li>Hervorhebung der Top-Performer pro Spieltag</li>
            </ul>
          </p>
        </motion.div>
      </motion.div>
      
      <footer className="mt-8 py-4 bg-gradient-to-r from-gray-900 to-black text-gray-400 shadow-inner">
        <div className="container mx-auto text-center text-xs">
          <p>© 2025 Bundesliga Tippspiel 2023/2024 - Visualisierung</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
