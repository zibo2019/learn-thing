"use client";

import { ReactFlowProvider } from "reactflow";
import MindMap from "./MindMap";
import { useMindMapData } from "../hooks/useMindMapData";
import { useState, useEffect } from "react";
import RetroGrid from "@/components/ui/retro-grid";
import CreateMindMapForm from "@/app/components/CreateMindMapForm";

export default function MindMapContainer() {
  const { data, isLoading, error, fetchMindMap } = useMindMapData();
  const [dots, setDots] = useState(".");

  const [loadingMessage, setLoadingMessage] = useState("Generating Mind Map");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : prev + "."));
    }, 500);

    const messages = [
      "Connecting ideas",
      "This may take some time",
      "Well, this is awkward",
      "It works on my machine",
      "The demo gods are failing me",
      "Still not finished",
      "Running out of what to say",
      "You shouldn't be seeing this message",
    ];
    let messageIndex = 0;

    const messageInterval = setInterval(() => {
      setLoadingMessage(messages[messageIndex]);
      messageIndex = (messageIndex + 1) % messages.length;
    }, 10000);

    return () => {
      clearInterval(interval);
      clearInterval(messageInterval);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100">
        <div className="relative w-64 h-64 animate-pulse">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-300 to-slate-300 rounded-full opacity-20 animate-ping"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-slate-400 to-gray-400 rounded-full opacity-30 animate-ping animation-delay-300"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-500 to-slate-500 rounded-full opacity-40 animate-ping animation-delay-600"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-white rounded-full shadow-lg"></div>
          </div>
        </div>
        <h2 className="mt-8 text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-slate-700 animate-wave">
          Generating Mind Map
        </h2>
        <p className="mt-2 text-slate-600">
          {loadingMessage}
          {dots}
        </p>
        <RetroGrid />
      </div>
    );
  }

  if (error) return <div>Error: {error.message}</div>;

  if (!data) {
    return <CreateMindMapForm onSubmit={fetchMindMap} />;
  }

  return (
    <div className="w-full h-full">
      <ReactFlowProvider>
        <MindMap data={data} />
      </ReactFlowProvider>
    </div>
  );
}
