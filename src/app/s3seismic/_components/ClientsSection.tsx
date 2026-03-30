"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "../_utils";

type TabKey = "clients" | "partners" | "memberships";

interface LogoItem {
  name: string;
  src: string;
}

const clientLogos: LogoItem[] = [
  { name: "ADEME", src: "/s3seismic-images/logos/s3seismic-ADEME-480x236.png" },
  { name: "Andra", src: "/s3seismic-images/logos/s3seismic-Andra-480x383.png" },
  { name: "CERN", src: "/s3seismic-images/logos/cern.png" },
  { name: "EBN", src: "/s3seismic-images/logos/EBN-logo-480x480.png" },
  { name: "EDF", src: "/s3seismic-images/logos/s3seismic-EDF-480x204.png" },
  { name: "ENGIE", src: "/s3seismic-images/logos/s3seismic-ENGIE-480x288.png" },
  { name: "TotalEnergies", src: "/s3seismic-images/logos/s3seismic-TotalEnergies-480x379.png" },
  { name: "Equinor", src: "/s3seismic-images/logos/Equinor.svg-480x395.png" },
  { name: "Arverne", src: "/s3seismic-images/logos/s3seismic-Arverne.png" },
  { name: "Lithium de France", src: "/s3seismic-images/logos/s3seismic-Lithium-de-France-480x144.webp" },
  { name: "ASN", src: "/s3seismic-images/logos/s3seismic-ASN-480x160.png" },
  { name: "Vulcan Energy", src: "/s3seismic-images/logos/s3seismic-Vulcan-Energy-Subsurface-Solutions-480x330.png" },
  { name: "Carboncuts", src: "/s3seismic-images/logos/Carboncuts-new-480x81.png" },
  { name: "Harbour", src: "/s3seismic-images/logos/HARBOUR_BIG-480x153.png" },
  { name: "Undercover", src: "/s3seismic-images/logos/UNDERCOVER_Horizontal_Original-480x150.png" },
  { name: "Geothermie Prealpes SA", src: "/s3seismic-images/logos/s3seismic-geothermoe_prealpes_sa.png" },
  { name: "Grand-Duche de Luxembourg", src: "/s3seismic-images/logos/s3seismic-Grand-Duche_de_Luxembourg-480x170.png" },
  { name: "SIG Geneve", src: "/s3seismic-images/logos/s3seismic-SIG_Geneve_logo-480x480.png" },
  { name: "Electricite de Strasbourg", src: "/s3seismic-images/logos/s3seismic-Electricte_de_Strasbourg-480x464.png" },
  { name: "ICL", src: "/s3seismic-images/logos/s3seismic-ICL-480x194.png" },
  { name: "K+S", src: "/s3seismic-images/logos/s3seismic-Kpluss-logo-480x164.png" },
  { name: "Fugro", src: "/s3seismic-images/logos/s3seismic-Fugro_logo-480x219.png" },
  { name: "Petrobras", src: "/s3seismic-images/logos/3seismic-petrobras.png" },
  { name: "Repsol", src: "/s3seismic-images/logos/s3seismic-Repsol-Logo-480x270.png" },
  { name: "Shell", src: "/s3seismic-images/logos/s3seismic-Shell-480x270.png" },
  { name: "Exxon", src: "/s3seismic-images/logos/s3seismic-Exxon-480x270.png" },
  { name: "Petrovietnam", src: "/s3seismic-images/logos/s3seismic-Petrovietnam-480x419.png" },
  { name: "Sonatrach", src: "/s3seismic-images/logos/s3seismic-Sonatrach-480x267.png" },
  { name: "Algeoland", src: "/s3seismic-images/logos/s3seismic-Algeoland.jpeg" },
  { name: "AB Group", src: "/s3seismic-images/logos/s3seismic-AB-group.png" },
  { name: "Innovative Energie Pullach", src: "/s3seismic-images/logos/s3seismic-Innovative_Energie_Pullach.png" },
  { name: "Kemone", src: "/s3seismic-images/logos/s3seismic-Kemone.jpg" },
  { name: "Mazarine", src: "/s3seismic-images/logos/s3seismic-Mazarine.svg" },
  { name: "MedcoEnergi", src: "/s3seismic-images/logos/s3seismic-medcoenergi.png" },
  { name: "Nouryon", src: "/s3seismic-images/logos/s3seismic-Nouryon-480x154.png" },
  { name: "Oil Search", src: "/s3seismic-images/logos/3seismic-oil_search.png" },
  { name: "VWR", src: "/s3seismic-images/logos/s3seismic-VWR.png" },
  { name: "SDX Energy", src: "/s3seismic-images/logos/s3seismic-SDX_Energy.svg" },
  { name: "SouthDeep", src: "/s3seismic-images/logos/s3seismic-SouthDeep-480x466.png" },
  { name: "TecLab", src: "/s3seismic-images/logos/TecLab.png" },
  { name: "Ville de Rochefort", src: "/s3seismic-images/logos/s3seismic-ville_de_rochefort-480x403.png" },
];

const partnerLogos: LogoItem[] = [
  { name: "Eiffel Investissement", src: "/s3seismic-images/logos/3seismic-EIFFEL_investissement_group-480x189.png" },
  { name: "TEEC", src: "/s3seismic-images/logos/6-TEEC-480x221.png" },
  { name: "Sercel", src: "/s3seismic-images/logos/3seismic-Sercel-480x134.png" },
  { name: "Viridien", src: "/s3seismic-images/logos/3-VIRIDIEN-480x140.png" },
  { name: "BRGM", src: "/s3seismic-images/logos/3seismic-BRGM-480x186.png" },
  { name: "Energy", src: "/s3seismic-images/logos/3seismic-ENERGY-480x172.png" },
  { name: "RTS", src: "/s3seismic-images/logos/3seismic-RTS.png" },
  { name: "CDP Consulting", src: "/s3seismic-images/logos/3seismic-CDP-Consulting.png" },
  { name: "OILMIN", src: "/s3seismic-images/logos/3seismic-OILMIN.png" },
];

const membershipLogos: LogoItem[] = [
  { name: "AFPG", src: "/s3seismic-images/logos/AFPG-logo-480x160.png" },
  { name: "Avenia", src: "/s3seismic-images/logos/3seismic-Avenia.png" },
  { name: "ENERGEO Alliance", src: "/s3seismic-images/logos/2-ENERGEO_Alliance_Badge_2024-480x462.png" },
];

const tabData: Record<TabKey, LogoItem[]> = {
  clients: clientLogos,
  partners: partnerLogos,
  memberships: membershipLogos,
};

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: "clients", label: "CLIENTS" },
  { key: "partners", label: "PARTNERS" },
  { key: "memberships", label: "MEMBERSHIPS" },
];

export function ClientsSection() {
  const [activeTab, setActiveTab] = useState<TabKey>("clients");

  return (
    <section className="bg-[#f2f5f8] px-4 py-20 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-[1200px] overflow-hidden rounded-[10px] bg-white">
        {/* Tab Bar */}
        <div className="flex border-b border-[#4e5d73]/10">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "relative flex items-center gap-2 px-5 py-4 text-sm uppercase tracking-wider transition-colors sm:px-8 md:px-10",
                activeTab === tab.key
                  ? "bg-white font-semibold text-[#233041]"
                  : "bg-[#f2f5f8]/50 font-normal text-[#4e5d73] hover:text-[#233041]"
              )}
            >
              {activeTab === tab.key && (
                <span className="h-2 w-2 rounded-full bg-[#13d8cb]" />
              )}
              <span className="whitespace-nowrap">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Logo Grid */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 px-8 py-8 sm:gap-x-10 sm:py-12 md:px-12">
          {tabData[activeTab].map((item) => (
            <div
              key={item.name}
              className="flex h-16 w-24 items-center justify-center sm:h-20 sm:w-32 md:w-36"
            >
              {item.src.endsWith('.svg') ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.src}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain opacity-70 transition-opacity hover:opacity-100"
                />
              ) : (
                <Image
                  src={item.src}
                  alt={item.name}
                  width={140}
                  height={80}
                  className="max-h-full w-auto object-contain opacity-70 transition-opacity hover:opacity-100"
                  unoptimized
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
