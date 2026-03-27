/* =========================================================
   ARQUIVO: inscricao-patrocinador.js
   FUNÇÃO: Cores Dinâmicas e Envio Inteligente B2B
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  // 1. LER QUAL BOTÃO FOI CLICADO (Parâmetro da URL)
  const urlParams = new URLSearchParams(window.location.search);
  const planoEscolhido = urlParams.get("plano");

  // 2. SELECIONAR OS ELEMENTOS DA TELA
  const root = document.documentElement;
  const textoDestaque = document.getElementById("texto-plano-escolhido");
  const selectPlano = document.getElementById("impacto"); // O campo com os preços

  // 3. APLICAR AS CORES E AUTO-SELECIONAR O MENU CORRETO
  if (planoEscolhido === "participante") {
    // MARROM
    root.style.setProperty("--cor-tema", "#b5651d");
    root.style.setProperty("--cor-texto-botao", "#ffffff");
    textoDestaque.innerText = "PLANO: PARTICIPANTE";
    selectPlano.value = "Patrocinador Participante - R$ 600,00"; // Seleciona automático!
  } else if (planoEscolhido === "master") {
    // AZUL
    root.style.setProperty("--cor-tema", "#4da6ff");
    root.style.setProperty("--cor-texto-botao", "#000000");
    textoDestaque.innerText = "PLANO: MASTER";
    selectPlano.value = "Patrocinador Master - R$ 1.000,00"; // Seleciona automático!
  } else {
    // VERDE (Padrão/Parceiro)
    root.style.setProperty("--cor-tema", "#28d311");
    root.style.setProperty("--cor-texto-botao", "#000000");
    textoDestaque.innerText = "PLANO: PARCEIRO";
    selectPlano.value = "Patrocinador Parceiro - R$ 400,00"; // Seleciona automático!
  }

  // 4. LÓGICA DE ENVIO PARA O WHATSAPP
  const form = document.getElementById("formPatrocinio");
  const btnEnviar = document.getElementById("btnEnviar");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Impede a página de recarregar

    btnEnviar.innerText = "PROCESSANDO...";

    // Coleta os dados digitados
    const empresa = document.getElementById("empresa").value;
    const cnpj = document.getElementById("cnpj").value || "Não informado";
    const ramo = document.getElementById("ramo").value;
    const responsavel = document.getElementById("nome_responsavel").value;
    const whatsapp = document.getElementById("telefone").value;
    const insta = document.getElementById("instagram").value || "Não informado";
    const planoComPreco = document.getElementById("impacto").value; // Pega o plano com o preço
    const obs = document.getElementById("obs").value || "Nenhuma";

    // Monta a mensagem para o seu Zap
    let mensagem = `🤝 *NOVO INTERESSE DE PATROCÍNIO - MARACURU*\n\n`;
    mensagem += `*Dados da Empresa:*\n`;
    mensagem += `Nome: ${empresa}\n`;
    mensagem += `CNPJ: ${cnpj}\n`;
    mensagem += `Ramo: ${ramo}\n`;
    mensagem += `Instagram: ${insta}\n\n`;
    mensagem += `*Contato:*\n`;
    mensagem += `Responsável: ${responsavel}\n`;
    mensagem += `WhatsApp: ${whatsapp}\n\n`;
    mensagem += `*Detalhes do Fechamento:*\n`;
    mensagem += `Plano Selecionado: *${planoComPreco}*\n`;
    mensagem += `Observações: ${obs}\n\n`;
    mensagem += `_Gostaria de dar andamento neste patrocínio para a 2ª Edição._`;

    // Cria o link do WhatsApp (Número 5585982376582)
    const linkZap = `https://wa.me/5585982376582?text=${encodeURIComponent(mensagem)}`;

    // Redireciona o usuário
    setTimeout(() => {
      window.location.href = linkZap;
      btnEnviar.innerText = "SOLICITAR PATROCÍNIO VIA WHATSAPP";
    }, 800);
  });
});
