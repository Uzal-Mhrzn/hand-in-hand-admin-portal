import { useContactUsStore } from "@/stores/contactUsStore";
import { apiConstants } from "./ApiConstant";
import { Delete, Fetch, Post, Put } from "./ApiService";
import type { ContactUs } from "@/types/ContactUs";

export async function fetchContactUs(): Promise<ContactUs[]> {
  // const contactUsState = useContactUsStore()

  const contactUs = await Fetch(apiConstants.CONTACTUS);
  console.log(contactUs)
  // contactUsState.setContactUs(contactUs);
  return contactUs;
}

export async function addContactUs(body: ContactUs) {
  // const contactUsState = useContactUsStore()
  
  console.log(body)
  const contactUs = await Post(apiConstants.CONTACTUS, body, {"Content-Type": "application/json"});
  // contactUsState.setContactUs(contactUs);
  return contactUs;
}

export async function updateContactUs(id:string, body: ContactUs) {
    // const contactUsState = useContactUsStore()
    
    console.log(body)
    const contactUs = await Put(`${apiConstants.CONTACTUS}/${id}`, body, {"Content-Type": "application/json"});
    // contactUsState.setContactUs(contactUs);
    return contactUs;
  }

export async function deleteContactUs(id: string) {
  return await Delete(`${apiConstants.CONTACTUS}/${id}`);
}
