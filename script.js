document.addEventListener("DOMContentLoaded", () => {
  // --- 1. CRONÔMETRO ---
  const timerContainer = document.getElementById("countdown-timer");
  if (timerContainer) {
    const dataEvento = new Date(2026, 4, 22, 8, 0, 0).getTime();
    const atualizarCronometro = () => {
      const agora = new Date().getTime();
      const distancia = dataEvento - agora;
      if (distancia < 0) {
        timerContainer.innerHTML =
          "<h3 style='color:#28d311'>🏁 A AVENTURA COMEÇOU!</h3>";
        return;
      }
      const d = Math.floor(distancia / (1000 * 60 * 60 * 24));
      const h = Math.floor(
        (distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const m = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((distancia % (1000 * 60)) / 1000);

      // Atualiza os elementos se eles existirem na página
      if (document.getElementById("days"))
        document.getElementById("days").innerText = d
          .toString()
          .padStart(2, "0");
      if (document.getElementById("hours"))
        document.getElementById("hours").innerText = h
          .toString()
          .padStart(2, "0");
      if (document.getElementById("minutes"))
        document.getElementById("minutes").innerText = m
          .toString()
          .padStart(2, "0");
      if (document.getElementById("seconds"))
        document.getElementById("seconds").innerText = s
          .toString()
          .padStart(2, "0");
    };
    setInterval(atualizarCronometro, 1000);
    atualizarCronometro();
  }

  // --- 2. LÓGICA DO FORMULÁRIO E WHATSAPP ---
  const formInscricao = document.getElementById("registrationForm");

  if (formInscricao) {
    formInscricao.addEventListener("submit", function (e) {
      e.preventDefault();

      const btn = document.getElementById("btnEnviar");
      btn.disabled = true;
      btn.innerHTML = "PROCESSANDO INSCRIÇÃO...";

      // Captura básica dos dados
      const nome = document.getElementById("nome").value;
      const cpf = document.getElementById("cpf").value;
      const nascimento = document.getElementById("nascimento").value;
      const whatsapp = document.getElementById("telefone").value;
      const veiculo = document.getElementById("veiculo").value;
      const placa = document.getElementById("placa").value || "Não informada";
      const ano = document.getElementById("ano").value || "N/I";
      const rota = document.getElementById("rota").value;
      const radio =
        document.querySelector('input[name="radio_com"]:checked')?.value ||
        "Não";
      const zequinhas = document.getElementById("zequinhas").value;
      const tamanhos = document.getElementById("tamanhos_camisetas").value;

      // Captura da forma de pagamento
      const pagamento = document.getElementById("metodo_pagamento").value;

      // --- LÓGICA DE VALOR DINÂMICO ATUALIZADA ---
      const dataAtual = new Date();
      const dataLimiteLote1 = new Date(2026, 2, 31); // 31 de Março
      let valorCalculado = "";

      if (dataAtual > dataLimiteLote1) {
        // SEGUNDO LOTE (Após 31/03)
        if (pagamento === "2x_lote2") {
          valorCalculado = "R$ 300,00 (2x de R$ 150,00 no Cartão)";
        } else {
          valorCalculado = "R$ 300,00 (À Vista)";
        }
      } else {
        // PRIMEIRO LOTE (Até 31/03)
        if (pagamento === "2x" || pagamento === "cartao") {
          valorCalculado = "R$ 280,00 (Parcelado)";
        } else if (pagamento === "2x_lote2") {
          // Caso alguém selecione a opção do 2º lote antes do tempo
          valorCalculado = "R$ 300,00 (2x de R$ 150,00)";
        } else {
          valorCalculado = "R$ 250,00 (À Vista)";
        }
      }

      // --- MONTAGEM DA MENSAGEM ---
      let mensagem = `📝 *Ficha de Inscrição: Maracuru 2026*\n\n`;
      mensagem += `*1. Dados do Condutor*\n`;
      mensagem += `Nome: ${nome}\n`;
      mensagem += `CPF: ${cpf}\n`;
      mensagem += `Data de Nascimento: ${nascimento}\n`;
      mensagem += `WhatsApp: ${whatsapp}\n\n`;

      mensagem += `*2. Dados do Veículo*\n`;
      mensagem += `Modelo: ${veiculo}\n`;
      mensagem += `Placa: ${placa}\n`;
      mensagem += `Ano: ${ano}\n`;
      mensagem += `Possui rádio? ${radio}\n\n`;

      mensagem += `*3. Modalidade de Trilha*\n`;
      mensagem += `Rota: ${rota}\n\n`;

      mensagem += `*4. Pagamento e Kit*\n`;
      mensagem += `*Valor da Inscrição:* ${valorCalculado} por veículo (inclui 2 camisetas e 1 zequinha).\n`;
      mensagem += `Acompanhantes (Zequinhas extras): ${zequinhas}\n`;
      mensagem += `Tamanhos das Camisetas: ${tamanhos}\n\n`;

      mensagem += `_Estou enviando minha ficha para validação do pagamento._`;

      // Envio para o WhatsApp
      const mensagemFinal = encodeURIComponent(mensagem);
      const numeroWhats = "5585982376582";
      const linkZap = `https://wa.me/${numeroWhats}?text=${mensagemFinal}`;

      setTimeout(() => {
        window.location.href = linkZap;
        btn.disabled = false;
        btn.innerHTML = "CONCLUIR INSCRIÇÃO";
      }, 800);
    });
  }
});
