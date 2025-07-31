import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, BookOpen, Shield, AlertTriangle, Eye, Phone, Mail, CreditCard, Smartphone } from 'lucide-react';
import { useGameStore } from '@/lib/stores/useGameStore';

interface ScamType {
  id: string;
  title: string;
  icon: string;
  category: string;
  description: string;
  howItHappens: string[];
  redFlags: string[];
  whatToDo: string[];
  realExample?: string;
}

const EducationScreen = () => {
  const setGameState = useGameStore(state => state.setGameState);
  const [selectedScam, setSelectedScam] = useState<ScamType | null>(null);

  const scamTypes: ScamType[] = [
    {
      id: 'phishing',
      title: 'Golpe do Phishing',
      icon: '🎣',
      category: 'Internet e E-mail',
      description: 'Golpe onde criminosos se passam por empresas ou órgãos para roubar seus dados pessoais.',
      howItHappens: [
        'Você recebe um e-mail ou mensagem que parece de uma empresa conhecida',
        'A mensagem diz que há um problema com sua conta',
        'Pedem para você clicar em um link ou baixar um arquivo',
        'O link leva para um site falso idêntico ao verdadeiro',
        'Ao inserir seus dados, os criminosos capturam tudo'
      ],
      redFlags: [
        'Urgência excessiva ("Sua conta será bloqueada hoje!")',
        'Erros de português ou formatação estranha',
        'Links suspeitos (exemplo: bancobrasiI.com em vez de bancobrasil.com)',
        'Pedem senha, CPF ou dados bancários por e-mail',
        'Remetente com e-mail estranho'
      ],
      whatToDo: [
        'NUNCA clique em links suspeitos',
        'Acesse o site oficial digitando na barra de endereços',
        'Ligue diretamente para a empresa usando telefone oficial',
        'Verifique sempre o endereço do e-mail',
        'Em caso de dúvida, não forneça dados pessoais'
      ],
      realExample: 'E-mail falso do banco pedindo para "atualizar dados" urgentemente'
    },
    {
      id: 'falso-premio',
      title: 'Golpe do Falso Prêmio',
      icon: '🎁',
      category: 'WhatsApp e SMS',
      description: 'Mensagens informando que você ganhou prêmios incríveis, mas precisa pagar taxas ou fornecer dados.',
      howItHappens: [
        'Recebe mensagem sobre prêmio milionário que "ganhou"',
        'Dizem que você foi sorteado em promoção que nunca participou',
        'Pedem documentos e dados pessoais para "liberação"',
        'Exigem pagamento de "taxa de liberação" ou "imposto"',
        'Após pagamento, desaparecem e você não recebe nada'
      ],
      redFlags: [
        'Prêmios de concursos que você nunca participou',
        'Valores absurdamente altos (R$ 500.000, carros de luxo)',
        'Pedem pagamento antecipado de taxas',
        'Urgência para "não perder a oportunidade"',
        'Documentos com erros ou aparência amadora'
      ],
      whatToDo: [
        'Lembre-se: prêmio verdadeiro NUNCA cobra taxa',
        'Procure informações sobre a empresa promotora',
        'Desconfie de prêmios não solicitados',
        'Não forneça documentos para desconhecidos',
        'Consulte o Procon ou órgãos oficiais'
      ]
    },
    {
      id: 'clonagem-whatsapp',
      title: 'Clonagem de WhatsApp',
      icon: '📱',
      category: 'WhatsApp e Redes Sociais',
      description: 'Criminosos clonam seu WhatsApp para pedir dinheiro aos seus contatos se passando por você.',
      howItHappens: [
        'Recebe ligação ou SMS pedindo código de verificação',
        'Criminoso se passa por atendimento do WhatsApp ou empresa',
        'Você fornece o código de 6 dígitos recebido por SMS',
        'Com o código, eles ativam seu WhatsApp em outro aparelho',
        'Usam sua identidade para pedir dinheiro aos seus contatos'
      ],
      redFlags: [
        'Ligações pedindo código de verificação do WhatsApp',
        'SMS com código de 6 dígitos que você não solicitou',
        'Pessoas se passando por suporte técnico',
        'Pressão para fornecer código rapidamente',
        'Seu WhatsApp sai do ar repentinamente'
      ],
      whatToDo: [
        'NUNCA forneça código de verificação para ninguém',
        'WhatsApp oficial NUNCA liga pedindo códigos',
        'Se acontecer, avise familiares imediatamente',
        'Ative verificação em duas etapas no WhatsApp',
        'Registre ocorrência na delegacia'
      ]
    },
    {
      id: 'cartao-clonado',
      title: 'Clonagem de Cartão',
      icon: '💳',
      category: 'Cartões e Bancos',
      description: 'Criminosos copiam dados do seu cartão para fazer compras fraudulentas.',
      howItHappens: [
        'Usa cartão em estabelecimento com máquina adulterada',
        'Alguém observa você digitando a senha (olheiro)',
        'Criminosos instalam dispositivos em caixas eletrônicos',
        'Fazem cópia dos dados magnéticos do cartão',
        'Usam cartão clonado para saques e compras'
      ],
      redFlags: [
        'Máquina de cartão com aparência estranha ou solta',
        'Pessoas observando você digitar senha',
        'Caixa eletrônico com partes soltas ou diferentes',
        'Estabelecimentos suspeitos ou pouco movimentados',
        'Compras não reconhecidas na fatura'
      ],
      whatToDo: [
        'Cubra a senha ao digitar sempre',
        'Verifique se a máquina está bem fixada',
        'Use caixas eletrônicos de bancos grandes',
        'Monitore extrato e fatura regularmente',
        'Bloqueie cartão imediatamente se suspeitar'
      ]
    },
    {
      id: 'falso-tecnico',
      title: 'Golpe do Falso Técnico',
      icon: '🔧',
      category: 'Telefone e Suporte',
      description: 'Criminosos se passam por técnicos para acessar seu computador ou dados pessoais.',
      howItHappens: [
        'Liga se passando por técnico da Microsoft, Google ou provedor',
        'Diz que seu computador está infectado ou com problema',
        'Pede para instalar programa ou acessar sites específicos',
        'Solicita acesso remoto ao seu computador',
        'Rouba dados, instala vírus ou pede pagamento'
      ],
      redFlags: [
        'Ligações não solicitadas oferecendo suporte técnico',
        'Afirmam conhecer problemas no seu computador',
        'Pedem para instalar programas desconhecidos',
        'Solicitam acesso remoto urgente',
        'Cobram por serviços não contratados'
      ],
      whatToDo: [
        'Grandes empresas NUNCA ligam oferecendo suporte',
        'Desligue imediatamente a ligação',
        'Não instale programas solicitados por telefone',
        'Se tiver dúvidas, procure suporte oficial',
        'Mantenha antivírus sempre atualizado'
      ]
    },
    {
      id: 'emprestimo-facil',
      title: 'Golpe do Empréstimo Fácil',
      icon: '💰',
      category: 'Empréstimos e Financeiro',
      description: 'Oferecem empréstimos com aprovação garantida, mas cobram taxas antecipadas.',
      howItHappens: [
        'Recebe oferta de empréstimo com aprovação garantida',
        'Prometem valores altos sem consulta ao SPC/Serasa',
        'Pedem pagamento de taxa antecipada para "liberação"',
        'Solicitam envio de documentos por WhatsApp',
        'Após pagamento da taxa, desaparecem'
      ],
      redFlags: [
        'Aprovação garantida sem análise',
        'Taxa de liberação antecipada obrigatória',
        'Juros muito baixos para o perfil',
        'Contato apenas por WhatsApp',
        'Pressão para pagamento imediato'
      ],
      whatToDo: [
        'Empréstimo sério NUNCA cobra taxa antecipada',
        'Procure apenas instituições regulamentadas pelo Banco Central',
        'Desconfie de ofertas "milagrosas"',
        'Consulte sempre o CNPJ da empresa',
        'Em dúvida, procure o Procon'
      ]
    }
  ];

  const categories = Array.from(new Set(scamTypes.map(scam => scam.category)));

  const returnToMenu = () => {
    setGameState('menu');
  };

  if (selectedScam) {
    return (
      <div className="game-gradient p-4" style={{ minHeight: '100vh', width: '100%', overflow: 'visible' }}>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white p-6 rounded-t-xl shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-4xl mr-4">{selectedScam.icon}</span>
                <div>
                  <h1 className="text-3xl font-bold">{selectedScam.title}</h1>
                  <p className="text-blue-100 font-semibold">{selectedScam.category}</p>
                </div>
              </div>
              <Button 
                onClick={() => setSelectedScam(null)}
                className="bg-white/20 hover:bg-white/30 text-white border border-white/50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur rounded-b-xl shadow-2xl p-6">
            {/* Description */}
            <Card className="mb-6 border-l-4 border-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <BookOpen className="h-6 w-6 mr-3 text-blue-600" />
                  O que é este golpe?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-700 leading-relaxed">{selectedScam.description}</p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* How it happens */}
              <Card className="border-l-4 border-orange-500">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Eye className="h-5 w-5 mr-3 text-orange-600" />
                    Como acontece
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-3">
                    {selectedScam.howItHappens.map((step, index) => (
                      <li key={index} className="flex items-start">
                        <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-1 flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-gray-700">{step}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>

              {/* Red flags */}
              <Card className="border-l-4 border-red-500">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <AlertTriangle className="h-5 w-5 mr-3 text-red-600" />
                    Sinais de alerta
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {selectedScam.redFlags.map((flag, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-500 text-xl mr-3">🚨</span>
                        <span className="text-gray-700">{flag}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* What to do */}
            <Card className="mt-6 border-l-4 border-green-500">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Shield className="h-6 w-6 mr-3 text-green-600" />
                  Como se proteger
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {selectedScam.whatToDo.map((action, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 text-xl mr-3">✅</span>
                      <span className="text-gray-700 font-semibold">{action}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {selectedScam.realExample && (
              <Card className="mt-6 bg-yellow-50 border-l-4 border-yellow-500">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <span className="text-2xl mr-3">💡</span>
                    Exemplo real
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 italic">"{selectedScam.realExample}"</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="game-gradient p-4 pb-20" style={{ minHeight: '100vh', width: '100%', overflow: 'visible' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-6 rounded-xl shadow-2xl mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                📚 Biblioteca Anti-Golpe
              </h1>
              <p className="text-xl text-indigo-100">
                Aprenda a se proteger dos golpes mais comuns
              </p>
            </div>
            <Button 
              onClick={returnToMenu}
              className="bg-white/20 hover:bg-white/30 text-white border border-white/50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Menu Principal
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => {
            const categoryScams = scamTypes.filter(scam => scam.category === category);
            const categoryIcon = category.includes('WhatsApp') ? '📱' : 
                                 category.includes('Internet') ? '💻' : 
                                 category.includes('Cartão') ? '💳' : 
                                 category.includes('Telefone') ? '☎️' : 
                                 category.includes('Empréstimo') ? '💰' : '🛡️';

            return (
              <Card key={category} className="card-hover bg-white/90 backdrop-blur border-2 border-purple-200 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-t-lg p-4">
                  <CardTitle className="flex items-center text-base font-bold">
                    <span className="text-xl mr-2">{categoryIcon}</span>
                    <span className="leading-tight">{category}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3">
                  <div className="space-y-2">
                    {categoryScams.map((scam) => (
                      <Button
                        key={scam.id}
                        onClick={() => setSelectedScam(scam)}
                        variant="outline"
                        className="w-full justify-start h-auto p-3 border-2 hover:border-purple-400 hover:bg-purple-50 min-h-[80px]"
                      >
                        <div className="flex items-start w-full">
                          <span className="text-xl mr-2 flex-shrink-0 mt-1">{scam.icon}</span>
                          <div className="text-left flex-1 overflow-hidden">
                            <div className="font-semibold text-sm leading-tight mb-1 truncate">{scam.title}</div>
                            <div className="text-xs text-gray-600 leading-relaxed break-words hyphens-auto" style={{ wordBreak: 'break-word' }}>
                              {scam.description.length > 45 ? scam.description.substring(0, 45) + '...' : scam.description}
                            </div>
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-8 bg-gradient-to-r from-yellow-400 to-orange-400 text-black p-6 rounded-xl shadow-lg text-center">
          <h3 className="text-2xl font-bold mb-2">🛡️ Lembre-se sempre:</h3>
          <p className="text-lg">
            <strong>Quando a esmola é demais, o santo desconfia!</strong><br/>
            Se parece bom demais para ser verdade, provavelmente é golpe.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EducationScreen;