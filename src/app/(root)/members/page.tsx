"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import NavbarMobile from "src/components/ui/navber-mobile";
import { Navbar } from "@/components/ui/Navbar";
import Button from "@/components/button";
import MemberSets from "./MemberSets";

const Members = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [finalYear, setFinalYear] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800); // Set isMobile based on viewport width
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(()=>{
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // Months are zero-based, so add 1
    if (currentMonth <= 6){
      setFinalYear(currentYear - 4);
    }
    else{
      setFinalYear(currentYear - 3);
    }
  }, [])

  const router = useRouter();

  const renderNavbar = () => (isMobile ? <NavbarMobile /> : <Navbar />);

  return (
    <div className="main">
      <div className="relative w-full flex items-center justify-end">
        {renderNavbar()}
      </div>

      <div className="logo relative -mt-5 z-10">
        <Image src="/membersbanner.png" alt="banner" width={1000} height={1000} layout="responsive" className="relative" />
      </div>

      <div style={{
        backgroundImage: 'url(/9.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '60px',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        backgroundPositionY: '50%',
        transition: 'background-position 0.5s ease',
        position: 'relative',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }}>

        <h1 className="font-jetbrains-mono text-4xl text-white text-center pb-10">
          THE CREW
        </h1>

        {
          finalYear && (
            <div className="max-w-6xl mx-auto mb-10 px-4">
              <MemberSets year="Orion" folder={String(finalYear)} />
              <MemberSets year="Leo" folder={String(finalYear+1)} />
              <MemberSets year="Canis Majoris" folder={String(finalYear+2)} />
            </div>
          )
        }
        <hr className="border-2 border-white w-full mx-auto" />
      </div>
      <div className="abouttext flex flex-col md:flex-row justify-center">
        <div className="pt-20 pb-20 px-12 md:pl-20 md:pr-20 md:w-1/2">
          <h1 className="font-jetbrains-mono text-4xl text-white pb-4">WANNA JOIN US?</h1>
          <p className="text-teal-400 mb-6">Wanna be a part of The Astronomy And Physics Society? Don&apos;t worry. Here we are giving you the opportunity!!!</p>
          <Button onClick={() => router.push('https://forms.gle/zx9KBwpZjsxb9Ku39')}>Be A Member</Button>
        </div>
        <div className="bg-cover flex align-middle relative w-full md:w-1/2 px-4 md:px-0">
          <Image className="mr-20" src="/3.jpg" alt="about" layout="fill" objectFit="cover" />
        </div>
      </div>
    </div>
  );
};

export default Members;
