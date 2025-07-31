export interface GameMessage {
  id: number;
  texto: string;
  resposta: 'confiavel' | 'golpe';
  categoria: string;
  tipo: 'whatsapp' | 'email' | 'sms' | 'site';
  remetente?: string;
  assunto?: string;
  link?: string;
  urgencia?: boolean;
  explicacao: string;
  dica?: string; // Para modo aprendiz
  modos: Array<'classico' | 'tiozao' | 'empresa' | 'aprendiz'>;
}

export const gameMessages: GameMessage[] = [
  {
    id: 1,
    texto: "Parabéns! Você ganhou um PIX de R$ 5.000,00. Clique aqui para resgatar em até 24 horas ou perderá o prêmio.",
    resposta: 'golpe',
    categoria: 'premio_falso',
    tipo: 'whatsapp',
    remetente: '+55 11 9999-8888',
    urgencia: true,
    explicacao: "Prêmios não solicitados são sempre golpes. Empresas legítimas não sorteiam dinheiro por WhatsApp.",
    dica: "Prêmios verdadeiros nunca chegam sem você ter participado de um sorteio oficial.",
    modos: ['classico', 'tiozao', 'aprendiz']
  },
  {
    id: 2,
    texto: "Seu banco informa: Conta bloqueada por atividade suspeita. Atualize seus dados no link abaixo imediatamente.",
    resposta: 'golpe',
    categoria: 'phishing_bancario',
    tipo: 'sms',
    link: "banco-seguro-falso.com/atualizar",
    urgencia: true,
    explicacao: "Bancos nunca pedem dados por SMS ou links suspeitos. Sempre acesse o app oficial ou site oficial do banco.",
    dica: "Bancos verdadeiros nunca pedem dados pessoais por SMS. Sempre use o app oficial.",
    modos: ['classico', 'empresa', 'aprendiz']
  },
  {
    id: 3,
    texto: "Olá! Sou eu, seu filho. Quebrei meu celular e estou usando o telefone de um amigo. Preciso de R$ 300 urgente para um trabalho da escola. Pode me ajudar?",
    resposta: 'golpe',
    categoria: 'golpe_parente',
    tipo: 'whatsapp',
    remetente: '+55 21 8888-7777',
    urgencia: true,
    explicacao: "Golpe clássico se passando por parente. Sempre confirme por ligação ou pessoalmente antes de enviar dinheiro.",
    dica: "Sempre ligue para o número conhecido do seu parente para confirmar.",
    modos: ['classico', 'tiozao', 'aprendiz']
  },
  {
    id: 4,
    texto: "Seu plano de saúde Unimed vence amanhã. Realize o pagamento através do boleto em anexo para evitar cancelamento.",
    resposta: 'confiavel',
    categoria: 'cobranca_legitima',
    tipo: 'email',
    remetente: 'cobranca@unimed.com.br',
    assunto: 'Vencimento Plano de Saúde',
    explicacao: "E-mail de cobrança legítima vindo do domínio oficial da empresa com informações consistentes.",
    dica: "Verifique se o remetente é do domínio oficial da empresa (unimed.com.br).",
    modos: ['classico', 'empresa', 'aprendiz']
  },
  {
    id: 5,
    texto: "vc ganhou 1 iphone 15 no sorteio da shopee!!! clica aki rapidoo pq so tem ate hoje!!! nao perde naooo 🤑🤑🤑",
    resposta: 'golpe',
    categoria: 'premio_falso',
    tipo: 'whatsapp',
    remetente: 'Shopee Sorteios',
    urgencia: true,
    explicacao: "Mensagem com erros de português, pressa artificial e prêmios não solicitados são sinais claros de golpe.",
    dica: "Muitos erros de português e pressa excessiva são sinais de golpe.",
    modos: ['tiozao', 'aprendiz']
  },
  {
    id: 6,
    texto: "Departamento de RH: Seu contracheque está disponível no portal do funcionário. Acesse com suas credenciais habituais.",
    resposta: 'confiavel',
    categoria: 'comunicacao_trabalho',
    tipo: 'email',
    remetente: 'rh@suaempresa.com.br',
    assunto: 'Contracheque Disponível - Janeiro 2025',
    explicacao: "Comunicação interna legítima da empresa, sem pedidos de dados sensíveis ou links suspeitos.",
    dica: "E-mails internos da empresa costumam usar o domínio oficial e não pedem dados pessoais.",
    modos: ['classico', 'empresa', 'aprendiz']
  },
  {
    id: 7,
    texto: "SUA CONTA DO NUBANK FOI INVADIDA!!! Clique urgente neste link para bloquear os hackers: nubank-seguro.net",
    resposta: 'golpe',
    categoria: 'phishing_bancario',
    tipo: 'whatsapp',
    link: "nubank-seguro.net",
    urgencia: true,
    explicacao: "Site falso! O domínio oficial do Nubank é nubank.com.br. Golpistas usam domínios similares para enganar.",
    dica: "Sempre verifique se o domínio é exatamente o oficial da empresa (nubank.com.br).",
    modos: ['classico', 'tiozao', 'aprendiz']
  },
  {
    id: 8,
    texto: "Você tem uma multa de trânsito pendente no valor de R$ 195,23. Pague com 50% de desconto até 31/01/2025 pelo código PIX no documento anexo.",
    resposta: 'golpe',
    categoria: 'multa_falsa',
    tipo: 'email',
    remetente: 'detran.notificacoes@gmail.com',
    assunto: 'Multa de Trânsito - Desconto 50%',
    urgencia: true,
    explicacao: "DETRAN oficial não usa Gmail. Domínio oficial seria detran.sp.gov.br. Descontos muito altos são suspeitos.",
    dica: "Órgãos públicos nunca usam Gmail ou Hotmail para comunicações oficiais.",
    modos: ['classico', 'empresa', 'aprendiz']
  },
  {
    id: 9,
    texto: "Netflix: Seu pagamento foi recusado. Atualize seu cartão em netflix.com.br/conta para não perder o acesso.",
    resposta: 'confiavel',
    categoria: 'cobranca_legitima',
    tipo: 'email',
    remetente: 'info@netflix.com',
    assunto: 'Problema com seu pagamento Netflix',
    explicacao: "E-mail legítimo da Netflix com domínio oficial, direcionando para o site verdadeiro da empresa.",
    dica: "A Netflix tem domínio oficial netflix.com e envia notificações sobre pagamentos.",
    modos: ['classico', 'aprendiz']
  },
  {
    id: 10,
    texto: "oi amor, quebrei o celular e tô usando o tel da minha amiga. vc pode me emprestar 200 reais? eu te devolvo sabado que vem, juro!",
    resposta: 'golpe',
    categoria: 'golpe_parente',
    tipo: 'whatsapp',
    remetente: '+55 85 7777-6666',
    urgencia: true,
    explicacao: "Golpe clássico se passando por pessoa próxima. Sempre confirme a identidade por ligação antes de enviar dinheiro.",
    dica: "Quando alguém próximo pedir dinheiro por número estranho, sempre ligue para confirmar.",
    modos: ['tiozao', 'aprendiz']
  },
  {
    id: 11,
    texto: "Receita Federal: Você tem R$ 2.847,30 a receber de Imposto de Renda. Solicite sua restituição em gov.br/receita",
    resposta: 'confiavel',
    categoria: 'comunicacao_governo',
    tipo: 'email',
    remetente: 'naoresponda@receita.fazenda.gov.br',
    assunto: 'Restituição Imposto de Renda 2024',
    explicacao: "E-mail legítimo da Receita Federal com domínio oficial .gov.br e direcionamento para site oficial.",
    dica: "Órgãos do governo sempre usam domínios .gov.br em comunicações oficiais.",
    modos: ['classico', 'empresa', 'aprendiz']
  },
  {
    id: 12,
    texto: "PROMOÇÃO IMPERDÍVEL!!! Amazon está dando iPhone de graça!!! Só hoje!!! Click aqui: amazon-promo.tk",
    resposta: 'golpe',
    categoria: 'promocao_falsa',
    tipo: 'whatsapp',
    link: "amazon-promo.tk",
    urgencia: true,
    explicacao: "Amazon oficial é amazon.com.br. Domínios .tk são gratuitos e muito usados por golpistas. Produtos caros nunca são dados de graça.",
    dica: "Empresas grandes nunca 'dão' produtos caros de graça e sempre usam seus domínios oficiais.",
    modos: ['tiozao', 'aprendiz']
  },
  {
    id: 13,
    texto: "IT Suporte: Detectamos tentativa de acesso não autorizado em sua conta corporativa. Altere sua senha imediatamente através do portal interno.",
    resposta: 'confiavel',
    categoria: 'comunicacao_trabalho',
    tipo: 'email',
    remetente: 'suporte.ti@suaempresa.com.br',
    assunto: 'Alerta de Segurança - Ação Necessária',
    explicacao: "Comunicação legítima do TI da empresa orientando sobre segurança, sem pedir dados ou links suspeitos.",
    dica: "Comunicações de TI legítimas orientam sobre segurança sem pedir dados diretamente.",
    modos: ['empresa', 'aprendiz']
  },
  {
    id: 14,
    texto: "Seu WhatsApp será desativado em 2 horas por inatividade. Para manter ativo, clique aqui e confirme seu número: wa-verificacao.com",
    resposta: 'golpe',
    categoria: 'golpe_whatsapp',
    tipo: 'whatsapp',
    link: "wa-verificacao.com",
    urgencia: true,
    explicacao: "WhatsApp nunca desativa contas por 'inatividade' e nunca pede verificação por links. Site oficial é whatsapp.com.",
    dica: "WhatsApp nunca desativa contas por inatividade. Isso é sempre golpe.",
    modos: ['classico', 'tiozao', 'aprendiz']
  },
  {
    id: 15,
    texto: "Magazine Luiza informa: Sua compra de R$ 1.299,90 foi aprovada. Se não foi você que fez esta compra, clique aqui para cancelar.",
    resposta: 'golpe',
    categoria: 'compra_falsa',
    tipo: 'email',
    remetente: 'compras@magazineluiza.com.br',
    assunto: 'Compra Aprovada - Cancelar se necessário',
    explicacao: "Mesmo com domínio correto, usar 'compra não reconhecida' para fazer você clicar é estratégia de golpe. Sempre verifique no app oficial.",
    dica: "Mesmo com domínio correto, sempre verifique compras diretamente no app ou site oficial da loja.",
    modos: ['classico', 'empresa', 'aprendiz']
  },
  {
    id: 16,
    texto: "ei mano, vc viu que o pix virou de graça pra sempre? mas tem que cadastrar de novo senao nao funciona. cadastra aki: pix-gratis.com.br",
    resposta: 'golpe',
    categoria: 'golpe_pix',
    tipo: 'whatsapp',
    remetente: '+55 11 5555-4444',
    link: "pix-gratis.com.br",
    explicacao: "PIX sempre foi gratuito entre pessoas físicas. Não existe 'cadastro novo'. Golpistas aproveitam desinformação sobre PIX.",
    dica: "PIX sempre foi gratuito para pessoas físicas. Não existe 'novo cadastro'.",
    modos: ['tiozao', 'aprendiz']
  },
  {
    id: 17,
    texto: "Caixa Econômica Federal: Seu auxílio emergencial de R$ 600,00 está disponível. Acesse caixa.gov.br para sacar.",
    resposta: 'confiavel',
    categoria: 'comunicacao_governo',
    tipo: 'sms',
    explicacao: "Comunicação oficial da Caixa sobre benefício social, direcionando para site oficial .gov.br.",
    dica: "Bancos públicos usam domínios .gov.br e comunicam sobre benefícios oficiais.",
    modos: ['classico', 'aprendiz']
  },
  {
    id: 18,
    texto: "Mercado Livre URGENTE: Alguém está tentando acessar sua conta de outro estado! Proteja-se clicando aqui: mercado-livre-seguro.net",
    resposta: 'golpe',
    categoria: 'phishing_marketplace',
    tipo: 'email',
    remetente: 'seguranca@mercadolivre.com',
    link: "mercado-livre-seguro.net",
    urgencia: true,
    explicacao: "Site falso! MercadoLivre oficial é mercadolivre.com.br. Golpistas criam domínios similares para confundir.",
    dica: "Mercado Livre oficial é mercadolivre.com.br (tudo junto). Desconfie de domínios com hífens.",
    modos: ['classico', 'empresa', 'aprendiz']
  },
  {
    id: 19,
    texto: "Parabéns! Você foi selecionado para receber R$ 10.000 do programa Auxílio Brasil. Cadastre-se em: auxiliobrasil-oficial.com",
    resposta: 'golpe',
    categoria: 'auxilio_falso',
    tipo: 'whatsapp',
    link: "auxiliobrasil-oficial.com",
    urgencia: true,
    explicacao: "Programas sociais oficiais só são acessados por gov.br. Ninguém é 'selecionado' aleatoriamente para receber benefícios.",
    dica: "Benefícios sociais verdadeiros só são acessados por sites .gov.br, nunca por seleção aleatória.",
    modos: ['classico', 'aprendiz']
  },
  {
    id: 20,
    texto: "Apple Store: Sua compra de iPhone 15 Pro Max (R$ 8.999) foi processada. Se não foi você, cancele em 24h pelo link: applestore-br.com",
    resposta: 'golpe',
    categoria: 'compra_falsa',
    tipo: 'email',
    remetente: 'noreply@apple.com',
    assunto: 'Compra Processada - Apple Store',
    link: "applestore-br.com",
    urgencia: true,
    explicacao: "Apple Store oficial no Brasil é apple.com/br. Domínio 'applestore-br.com' é falso criado para golpe.",
    dica: "Apple oficial no Brasil usa apple.com/br. Qualquer outro domínio é suspeito.",
    modos: ['classico', 'empresa', 'aprendiz']
  },
  {
    id: 21,
    texto: "Seu cartão de crédito foi clonado! Bloqueamos ele pra sua segurança. Desbloqueie urgente no link: bradesco-cartoes.net",
    resposta: 'golpe',
    categoria: 'phishing_bancario',
    tipo: 'sms',
    link: "bradesco-cartoes.net",
    urgencia: true,
    explicacao: "Bradesco oficial é bradesco.com.br. Bancos não enviam links por SMS para desbloqueio de cartão.",
    dica: "Bancos nunca enviam links por SMS para operações com cartão. Use sempre o app oficial.",
    modos: ['classico', 'tiozao', 'aprendiz']
  },
  {
    id: 22,
    texto: "Spotify: Sua assinatura Premium vence em 3 dias. Renove em spotify.com/premium para não perder suas playlists.",
    resposta: 'confiavel',
    categoria: 'cobranca_legitima',
    tipo: 'email',
    remetente: 'noreply@spotify.com',
    assunto: 'Sua assinatura Premium expira em breve',
    explicacao: "E-mail legítimo do Spotify sobre vencimento de assinatura, direcionando para site oficial.",
    dica: "Spotify oficial é spotify.com e envia lembretes sobre vencimento de assinaturas.",
    modos: ['classico', 'aprendiz']
  },
  {
    id: 23,
    texto: "INSS: Você tem benefício em atraso! Saque R$ 3.200 no caixa eletrônico com este código: 789456. Válido até hoje!",
    resposta: 'golpe',
    categoria: 'beneficio_falso',
    tipo: 'sms',
    urgencia: true,
    explicacao: "INSS não envia códigos por SMS para saque. Benefícios são consultados apenas pelo Meu INSS oficial (gov.br).",
    dica: "INSS nunca envia códigos de saque por SMS. Use apenas o app Meu INSS oficial.",
    modos: ['classico', 'tiozao', 'aprendiz']
  },
  {
    id: 24,
    texto: "meu deus gente!!! achei um site que ta vendendo iphone por 100 reais!!! e verdade!!! eu ja comprei 3!!! corre la: iphone-barato.tk",
    resposta: 'golpe',
    categoria: 'produto_barato_demais',
    tipo: 'whatsapp',
    remetente: 'Dica Boa',
    link: "iphone-barato.tk",
    urgencia: true,
    explicacao: "Preços irreais (iPhone por R$ 100) são sempre golpe. Domínios .tk são gratuitos e muito usados por golpistas.",
    dica: "Se o preço está bom demais para ser verdade, provavelmente é golpe.",
    modos: ['tiozao', 'aprendiz']
  },
  {
    id: 25,
    texto: "Bradesco informa: Sua transferência PIX de R$ 2.500,00 foi realizada com sucesso para João Silva. Comprovante disponível no app.",
    resposta: 'confiavel',
    categoria: 'notificacao_bancaria',
    tipo: 'sms',
    explicacao: "Notificação legítima de transação PIX realizada. Bancos enviam confirmações de transações efetivamente realizadas.",
    dica: "Bancos enviam notificações de transações reais. Verifique sempre no app oficial se tiver dúvidas.",
    modos: ['classico', 'empresa', 'aprendiz']
  },
  {
    id: 26,
    texto: "Uber: Sua viagem foi finalizada. Trajeto: Shopping Iguatemi até Rua das Flores, 123. Valor: R$ 18,50. Avalie seu motorista no app.",
    resposta: 'confiavel',
    categoria: 'notificacao_servico',
    tipo: 'sms',
    explicacao: "Notificação padrão do Uber após finalização de viagem, com dados específicos e realistas.",
    dica: "Apps de transporte enviam notificações após cada viagem com detalhes específicos.",
    modos: ['classico', 'aprendiz']
  },
  {
    id: 27,
    texto: "oi vc!! seu cpf foi sortiado pra ganhar auxilio corona de 1800 reais!!! mas so hoje!!! cadastra rapido no link: auxilio-corona.ml",
    resposta: 'golpe',
    categoria: 'auxilio_falso',
    tipo: 'whatsapp',
    link: "auxilio-corona.ml",
    urgencia: true,
    explicacao: "Auxílios emergenciais não são sorteados e só são acessados via canais oficiais do governo (.gov.br). Domínio .ml é suspeito.",
    dica: "Benefícios do governo nunca são 'sorteados' e só existem em sites .gov.br.",
    modos: ['tiozao', 'aprendiz']
  },
  {
    id: 28,
    texto: "Microsoft Teams: Você foi convidado para reunião 'Apresentação Trimestral' dia 05/02 às 14:00. Clique para aceitar.",
    resposta: 'confiavel',
    categoria: 'comunicacao_trabalho',
    tipo: 'email',
    remetente: 'noreply@teams.microsoft.com',
    assunto: 'Convite para reunião - Teams',
    explicacao: "Convite legítimo do Microsoft Teams para reunião de trabalho com detalhes específicos.",
    dica: "Convites do Teams são enviados do domínio oficial da Microsoft com detalhes da reunião.",
    modos: ['classico', 'empresa', 'aprendiz']
  },
  {
    id: 29,
    texto: "Itaú Urgente: Detectamos login suspeito em sua conta. Se não foi você, clique para bloquear: itau-seguro.tk",
    resposta: 'golpe',
    categoria: 'phishing_bancario',
    tipo: 'email',
    remetente: 'seguranca@itau.com.br',
    link: "itau-seguro.tk",
    urgencia: true,
    explicacao: "Domínio falso! Itaú oficial é itau.com.br. Mesmo que o remetente pareça correto, o link revela o golpe.",
    dica: "Sempre verifique o link de destino, mesmo quando o remetente parece oficial.",
    modos: ['classico', 'empresa', 'aprendiz']
  },
  {
    id: 30,
    texto: "iFood: Seu pedido #1234 foi entregue. Hambúrguer Artesanal - R$ 32,90. Que tal avaliar seu delivery?",
    resposta: 'confiavel',
    categoria: 'notificacao_servico',
    tipo: 'sms',
    explicacao: "Notificação padrão do iFood após entrega de pedido com número específico e valor realista.",
    dica: "Apps de delivery enviam confirmações de entrega com detalhes específicos do pedido.",
    modos: ['classico', 'aprendiz']
  },
  {
    id: 31,
    texto: "Urgente!! Seu WhatsApp vai ser cancelado por falta de atualizacao!!! Atualize agora no link oficial: whatsapp-update.net",
    resposta: 'golpe',
    categoria: 'golpe_whatsapp',
    tipo: 'whatsapp',
    link: "whatsapp-update.net",
    urgencia: true,
    explicacao: "WhatsApp nunca 'cancela' contas por falta de atualização. Atualizações são feitas pela loja de apps oficial.",
    dica: "Apps só são atualizados pela loja oficial (Play Store/App Store), nunca por links externos.",
    modos: ['tiozao', 'aprendiz']
  },
  {
    id: 32,
    texto: "Santander: Compra aprovada no cartão final 1234: Supermercado Extra - R$ 157,80. Central de cancelamento: 4003-3333",
    resposta: 'confiavel',
    categoria: 'notificacao_bancaria',
    tipo: 'sms',
    explicacao: "Notificação real de compra no cartão com informações específicas e telefone oficial do banco.",
    dica: "Bancos enviam notificações de compras com final do cartão e telefone oficial para dúvidas.",
    modos: ['classico', 'empresa', 'aprendiz']
  },
  {
    id: 33,
    texto: "Elon Musk esta dando bitcoin de graca!!! 1 bitcoin pra cada pessoa!!! mas so ate hoje!!! envia 0.1 bitcoin pra receber 1 bitcoin de volta!!!",
    resposta: 'golpe',
    categoria: 'criptomoeda_falsa',
    tipo: 'whatsapp',
    urgencia: true,
    explicacao: "Golpe clássico de criptomoedas. Ninguém dá dinheiro de graça, especialmente não pedindo dinheiro primeiro. Esquemas 'envie X para receber Y' são sempre golpes.",
    dica: "Esquemas que pedem para 'enviar dinheiro para receber mais dinheiro' são sempre golpes.",
    modos: ['tiozao', 'aprendiz']
  },
  {
    id: 34,
    texto: "Zoom: Reunião 'Planejamento 2025' iniciará em 15 minutos. ID: 123 456 789. Senha: Plan2025. Organizador: Maria Santos.",
    resposta: 'confiavel',
    categoria: 'comunicacao_trabalho',
    tipo: 'email',
    remetente: 'noreply@zoom.us',
    assunto: 'Lembrete de reunião Zoom',
    explicacao: "Lembrete legítimo de reunião Zoom com ID, senha e organizador específicos.",
    dica: "Lembretes do Zoom incluem detalhes específicos como ID da reunião e organizador.",
    modos: ['classico', 'empresa', 'aprendiz']
  },
  {
    id: 35,
    texto: "parabens vc foi escolhida pra teste do novo iphone 16!!! apple quer sua opiniao!!! preenche os dados aki: apple-teste-br.com",
    resposta: 'golpe',
    categoria: 'teste_falso',
    tipo: 'whatsapp',
    link: "apple-teste-br.com",
    urgencia: true,
    explicacao: "Apple não faz 'escolhas aleatórias' para testes. Domínio falso - Apple oficial é apple.com. Testes reais são feitos por empresas especializadas.",
    dica: "Empresas grandes não 'escolhem' pessoas aleatoriamente para testes de produtos.",
    modos: ['tiozao', 'aprendiz']
  },
  {
    id: 36,
    texto: "FGTS Digital: Seu saque emergencial está liberado. Valor disponível: R$ 1.045,00. Consulte em fgts.caixa.gov.br",
    resposta: 'confiavel',
    categoria: 'comunicacao_governo',
    tipo: 'sms',
    explicacao: "Comunicação oficial da Caixa sobre FGTS direcionando para site oficial .gov.br com valor específico.",
    dica: "FGTS é gerido pela Caixa e comunicações oficiais direcionam para sites .gov.br.",
    modos: ['classico', 'aprendiz']
  }
];

// Função para filtrar mensagens por modo de jogo
export const getMessagesByMode = (mode: 'classico' | 'tiozao' | 'empresa' | 'aprendiz'): GameMessage[] => {
  return gameMessages.filter(message => message.modos.includes(mode));
};

// Função para embaralhar mensagens
export const shuffleMessages = (messages: GameMessage[]): GameMessage[] => {
  const shuffled = [...messages];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
