import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { Copy, Check } from "lucide-react";

export const EndpointDisplay = ({
  chainData,
  selectedNetwork,
  setSelectedNetwork,
}) => {
  const [copiedEndpoint, setCopiedEndpoint] = useState(null);
  const { isDarkMode } = useTheme();

  const copyToClipboard = (text, service) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(service);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  return (
    <div className='flex-1 overflow-hidden'>
      <div
        className={`mb-6 flex justify-between items-center ${
          isDarkMode ? "text-gray-200" : "text-gray-800"
        }`}
      >
        <h2 className='text-4xl font-extrabold tracking-tight'>
          {chainData[selectedNetwork].name}
        </h2>
        <div className='flex space-x-3'>
          {Object.keys(chainData).map(
            (network) =>
              network !== "icon" && (
                <button
                  key={network}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-md ${
                    selectedNetwork === network
                      ? "bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-lg"
                      : isDarkMode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => setSelectedNetwork(network)}
                >
                  {network}
                </button>
              )
          )}
        </div>
      </div>
      <div className='space-y-6'>
        {Object.entries(chainData[selectedNetwork].services).map(
          ([service, endpoint]) => (
            <div
              key={service}
              className={`${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } p-6 rounded-xl shadow-lg transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-2xl`}
            >
              <h3
                className={`text-2xl font-bold mb-4 tracking-wide ${
                  isDarkMode ? "text-orange-400" : "text-orange-600"
                }`}
              >
                {service}
              </h3>
              <div className='flex items-center space-x-4'>
                <code
                  className={`flex-grow p-4 rounded-lg text-sm font-mono break-all ${
                    isDarkMode
                      ? "bg-gray-900 text-gray-300"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {endpoint}
                </code>
                <button
                  className={`p-3 rounded-full transition-colors duration-300 focus:outline-none focus:ring ${
                    copiedEndpoint === service
                      ? "bg-green-500 text-white ring-green-200"
                      : isDarkMode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => copyToClipboard(endpoint, service)}
                >
                  {copiedEndpoint === service ? (
                    <Check size={22} className='animate-bounce' />
                  ) : (
                    <Copy size={22} />
                  )}
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
