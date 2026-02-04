import { ModalTrigger, ModalContent } from "@/components/model";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ModalItem {
  id: number;
  slug: string;
  menu_name: string;
  title: string;
  img: string;
  content: string;
}
export function ProjectTriggers({ items }: { items: ModalItem[] | null }) {
  const activeBtnStyle = "bg-[#BF532C] text-white";
  const btnStyle =
    "py-2 px-4 rounded-lg hover:bg-white hover:text-black transition-colors font-bold lg:text-[25px] text-[16px]";

  if (!items) return null;

  return (
    <div className="flex gap-4 p-4 relative z-10">
      {items.map((item) => (
        <ModalTrigger
          key={item.id}
          id={item.slug}
          className={btnStyle}
          activeClassName={activeBtnStyle}
        >
          {item.menu_name}
        </ModalTrigger>
      ))}
    </div>
  );
}

export function ProjectContents({ items }: { items: ModalItem[] | null }) {
  if (!items) return null;

  return (
    <>
      {items.map((item) => (
        <ModalContent key={item.slug} id={item.slug}>
          <div className="flex flex-row h-full w-full overflow-hidden">
            <div className="relative h-full w-1/2">
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="h-full w-1/2 overflow-auto p-8">
              <h2 className="lg:text-[40px] text-[25px] font-bold mb-6 text-[#BF532C]">
                {item.title}
              </h2>

              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ ...props }) => (
                    <h1
                      className="font-bold text-[#BF532C] mb-4 mt-6 lg:text-[40px] text-[25px]"
                      {...props}
                    />
                  ),
                  h2: ({ ...props }) => (
                    <h2
                      className="font-semibold text-yellow-300 mb-3 mt-5 lg:text-[20px] text-[16px]"
                      {...props}
                    />
                  ),
                  p: ({ ...props }) => (
                    <p
                      className="leading-relaxed mb-4 text-[16px]"
                      {...props}
                    />
                  ),
                  ul: ({ ...props }) => (
                    <ul
                      className="list-disc list-inside mb-4 ml-4"
                      {...props}
                    />
                  ),
                  li: ({ ...props }) => (
                    <li className="mb-1 text-[16px]" {...props} />
                  ),
                  a: ({ ...props }) => (
                    <a
                      className="text-sky-500 hover:underline underline-offset-4 text-[16px]"
                      {...props}
                    />
                  ),
                }}
              >
                {item.content}
              </ReactMarkdown>
            </div>
          </div>
        </ModalContent>
      ))}
    </>
  );
}
