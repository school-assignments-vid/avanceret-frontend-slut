import { createClient } from "@/lib/supabase/server";
import { ModalRoot, ModalContent, ModalTrigger } from "@/components/model";
import { AlienMessage, WelcomeVideo } from "@/components/alien-features";
import { ProjectTriggers, ProjectContents } from "@/components/project-ui";
import { ContactForm } from "@/components/contact-form";

export default async function Page() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("modals")
    .select("*")
    .order("id", { ascending: true });

  return (
    <ModalRoot defaultOpen="intro">
      <AlienMessage />

      <ProjectTriggers items={data} />

      <ProjectContents items={data} />

      <ModalContent id="intro">
        <WelcomeVideo />
      </ModalContent>

      <ModalContent id="contact">
        <ContactForm />
      </ModalContent>

      <ModalTrigger
        id="contact"
        className="absolute bottom-0 right-0 pl-4 py-3 pr-12 rounded-tl-lg bg-[#BF532C] text-white font-bold text-[24px] z-10 hover:bg-white hover:text-black transition-colors"
      >
        Contact
      </ModalTrigger>
    </ModalRoot>
  );
}
