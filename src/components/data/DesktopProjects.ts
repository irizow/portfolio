import folderImg from "../../assets/icons/folder-icon.webp";

import galleryImg from "../../assets/icons/gallery-icon.webp";

import emailImg from "../../assets/icons/envelope-icon.webp";
import controllerIcon from "../../assets/icons/controller-icon.webp";
import Game from "../Game/Game.tsx";
import Gallery from "../Gallery/Gallery.tsx";
import Projects from "../Projects/Projects.jsx";
import Contact from "../Contact/Contact.jsx";
import { galleryImgs as images } from "../../assets/gallery/gallery.ts";
import React from "react";

export interface DesktopProject<P = any> {
  img: string;
  alt: string;
  title: string;
  component: React.ComponentType<P>;
  props?: P;
}

console.log("fold inages", images);

export const DesktopProjects: DesktopProject<any>[] = [
  {
    img: folderImg,
    alt: "Folder image",
    title: "Projects",
    component: Projects,
  },
  {
    img: controllerIcon,
    alt: "Game controller icon",
    title: "Pkmn",
    component: Game,
  },
  {
    img: emailImg,
    alt: "email icon",
    title: "Contact",
    component: Contact,
  },
  {
    img: galleryImg,
    alt: "gallery icon",
    title: "Gallery",
    component: Gallery,
    props: { images },
  },
];
