import React from 'react';
import {
  HardDrive, ShieldCheck, Wifi, Monitor, CloudUpload, Headphones, Building2,
  Mail, BadgeCheck, MapPin, ExternalLink, Phone, MessageCircle
} from 'lucide-react';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  price: string;
  wide?: boolean;
}

interface ServicesProps {
  contactEmail: string;
  zaaskUrl: string;
  phone: string;
  phoneDisplay: string;
}

const iconProps = { className: 'w-6 h-6 text-cyber-neon' };

const services: Service[] = [
  {
    icon: <Monitor {...iconProps} />,
    title: 'Formatação e reinstalação',
    description: 'Windows limpo, com drivers, programas base e cópia de segurança dos seus ficheiros.',
    price: 'desde 40 €',
  },
  {
    icon: <HardDrive {...iconProps} />,
    title: 'Upgrade para SSD',
    description: 'Clonagem do disco sem perder nada. O computador fica muito mais rápido.',
    price: '25 € + peça',
  },
  {
    icon: <ShieldCheck {...iconProps} />,
    title: 'Vírus e PC lento',
    description: 'Remoção de malware, limpeza de arranque e otimização do sistema.',
    price: 'desde 30 €',
  },
  {
    icon: <Wifi {...iconProps} />,
    title: 'Redes, Wi-Fi e impressoras',
    description: 'Configuração de routers, cobertura Wi-Fi, impressoras e e-mail.',
    price: 'desde 15 €',
  },
  {
    icon: <CloudUpload {...iconProps} />,
    title: 'Backups e recuperação',
    description: 'Backups automáticos (OneDrive, Google Drive, disco externo) e recuperação de dados.',
    price: 'desde 25 €',
  },
  {
    icon: <Headphones {...iconProps} />,
    title: 'Suporte remoto',
    description: 'Resolução à distância, sem sair de casa, incluindo ao fim do dia.',
    price: '20 € / hora',
  },
  {
    icon: <Building2 {...iconProps} />,
    title: 'Pequenos negócios',
    description: 'Microsoft 365, contas, partilhas de ficheiros, backups e avenças de suporte mensal.',
    price: 'desde 50 € / mês',
    wide: true,
  },
];

const guarantees = [
  { icon: <BadgeCheck className="w-5 h-5 text-cyber-neon" />, text: 'Diagnóstico e orçamento grátis' },
  { icon: <MapPin className="w-5 h-5 text-cyber-neon" />, text: 'Ao domicílio em Santo Tirso e arredores' },
];

export const Services: React.FC<ServicesProps> = ({ contactEmail, zaaskUrl, phone, phoneDisplay }) => {
  return (
    <section id="servicos" className="py-20 md:py-32 scroll-mt-16">
      <h2 className="text-3xl font-mono font-bold text-white mb-4 flex items-center w-full">
        <span className="text-cyber-neon mr-2">01.</span> Serviços de Informática
        <span className="ml-4 h-px bg-cyber-dim/30 flex-grow max-w-xs"></span>
      </h2>
      <p className="text-lg text-cyber-text mb-10 max-w-3xl">
        Ajuda com computadores para particulares e pequenos negócios em Santo Tirso, Trofa, Famalicão e arredores.
        Ao domicílio ou por suporte remoto, com preços claros.
      </p>

      <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-6 mb-10">
        {guarantees.map((g) => (
          <div key={g.text} className="flex items-center font-mono text-sm text-white bg-cyber-dark/70 border border-cyber-dim/30 rounded px-4 py-2">
            {g.icon}
            <span className="ml-2">{g.text}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <div
            key={s.title}
            className={`${s.wide ? 'sm:col-span-2 lg:col-span-3 border-cyber-neon/40 ' : ''}flex flex-col bg-cyber-dark/70 backdrop-blur border border-cyber-dim/20 rounded-lg p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyber-neon/60 hover:shadow-[0_0_20px_rgba(102,252,241,0.12)]`}
          >
            <div className="flex items-center mb-3">
              {s.icon}
              <h3 className="ml-3 text-lg font-bold text-white">{s.title}</h3>
            </div>
            <p className="text-sm text-cyber-text flex-grow mb-4">{s.description}</p>
            <p className="font-mono text-cyber-neon font-bold">{s.price}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-4">
        <a
          href={`https://wa.me/${phone}?text=${encodeURIComponent('Olá João, gostava de pedir um orçamento.')}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex justify-center items-center px-8 py-4 border border-cyber-neon text-cyber-bg bg-cyber-neon font-mono font-bold rounded transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(102,252,241,0.6)]"
        >
          <MessageCircle className="mr-2 w-5 h-5" />
          WhatsApp
        </a>
        <a
          href={`tel:+${phone}`}
          className="inline-flex justify-center items-center px-8 py-4 border border-cyber-neon text-cyber-neon font-mono font-bold rounded transition-all duration-300 hover:bg-cyber-neon/10 hover:-translate-y-1"
        >
          <Phone className="mr-2 w-5 h-5" />
          {phoneDisplay}
        </a>
        <a
          href={`mailto:${contactEmail}?subject=Pedido de orçamento`}
          className="inline-flex justify-center items-center px-8 py-4 border border-cyber-dim text-cyber-neon font-mono rounded transition-all duration-300 hover:bg-cyber-neon/10 hover:-translate-y-1"
        >
          <Mail className="mr-2 w-5 h-5" />
          Pedir orçamento
        </a>
        <a
          href={zaaskUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex justify-center items-center px-8 py-4 border border-cyber-dim text-cyber-neon font-mono rounded transition-all duration-300 hover:bg-cyber-neon/10 hover:-translate-y-1"
        >
          Ver perfil na Zaask
          <ExternalLink className="ml-2 w-4 h-4" />
        </a>
      </div>
      <p className="mt-4 text-xs text-cyber-dim font-mono">
        Preços indicativos para particulares. Peças à parte. Orçamento final dado antes de começar.
      </p>
    </section>
  );
};
