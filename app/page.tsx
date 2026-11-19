import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { MoreAboutMe } from "@/components/MoreAboutMe";
import { PersonJsonLd } from "@/components/PersonJsonLd";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <>
      <PersonJsonLd />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <MoreAboutMe />
      <Contact />
    </>
  );
}
