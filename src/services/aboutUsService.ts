import { useAboutUsStore } from "@/stores/aboutUsStore";
import { apiConstants } from "./ApiConstant";
import { Delete, Fetch, Post, Put } from "./ApiService";
import type { AboutUs } from "@/types/AboutUs";

export async function fetchAboutUs(): Promise<AboutUs> {
  const aboutUsState = useAboutUsStore()

  const aboutUs = await Fetch(apiConstants.ABOUTUS);
  aboutUsState.setAboutUs(aboutUs[0]);
  return aboutUs[0];
}

export async function addAboutUs(body: AboutUs) {
  const aboutUsState = useAboutUsStore()
  
  console.log(body)
  const aboutUs = await Post(apiConstants.ABOUTUS, body, {"Content-Type": "application/json"});
  aboutUsState.setAboutUs(aboutUs[0]);
  return aboutUs;
}

export async function updateAboutUs(id:string, body: AboutUs) {
    const aboutUsState = useAboutUsStore()
    
    console.log(body)
    const aboutUs = await Put(`${apiConstants.ABOUTUS}/${id}`, body, {"Content-Type": "application/json"});
    aboutUsState.setAboutUs(aboutUs[0]);
    return aboutUs;
  }

export async function deleteAboutUs(id: string) {
  return await Delete(`${apiConstants.ABOUTUS}/${id}`);
}
