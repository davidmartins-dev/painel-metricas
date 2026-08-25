import Painel from "@/components/painel";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function PainelPage({ params }: PageProps) {
  // A página se torna apenas um wrapper roteador que repassa o parâmetro
  return <Painel slug={params?.slug ?? ''} />;
}
