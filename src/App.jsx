import React, { useState, useEffect } from "react";
import { ChainList } from "./components/ChainList";
import { EndpointDisplay } from "./components/EndpointDisplay";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { Sun, Moon } from "lucide-react";

function AppContent() {
  const [chainData, setChainData] = useState({});
  const [selectedChain, setSelectedChain] = useState(null);
  const [selectedNetwork, setSelectedNetwork] = useState("Mainnet");
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    fetch("/chainData.json")
      .then((response) => response.json())
      .then((data) => {
        setChainData(data);
        setSelectedChain(Object.keys(data)[0]);
      })
      .catch((error) => console.error("Error loading chain data:", error));
  }, []);

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      } font-sans transition-colors duration-300`}
    >
      <header
        className={`${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } border-b border-orange-500 p-6 shadow-lg transition-colors duration-300`}
      >
        <div className='container mx-auto flex justify-between items-center'>
          <h1 className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600'>
            Lava Incentivized Public RPC{" "}
          </h1>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${
              isDarkMode
                ? "bg-gray-700 text-orange-400"
                : "bg-orange-100 text-orange-600"
            } hover:bg-orange-500 hover:text-white transition-colors duration-300`}
          >
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
      </header>
      <main className='container mx-auto p-6 flex flex-col lg:flex-row gap-6'>
        <ChainList
          chains={Object.entries(chainData)}
          selectedChain={selectedChain}
          setSelectedChain={setSelectedChain}
        />
        {selectedChain && chainData[selectedChain] && (
          <EndpointDisplay
            chainData={chainData[selectedChain]}
            selectedNetwork={selectedNetwork}
            setSelectedNetwork={setSelectedNetwork}
          />
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
