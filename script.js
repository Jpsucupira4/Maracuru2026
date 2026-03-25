/**
 * PROJETO: Maranguape Off Road - 2ª Edição Maracuru
 * FOCO: Redirecionamento Direto para WhatsApp
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. CRONÔMETRO (Mantido para a página de inscrição) ---
    const timerContainer = document.getElementById('countdown-timer');
    if (timerContainer) {
        const dataEvento = new Date(2026, 4, 22, 8, 0, 0).getTime();
        const atualizarCronometro = () => {
            const agora = new Date().getTime();
            const distancia = dataEvento - agora;
            if (distancia < 0) {
                timerContainer.innerHTML = "<h3 style='color:#28d311'>🏁 A AVENTURA COMEÇOU!</h3>";
                return;
            }
            const d = Math.floor(distancia / (1000 * 60 * 60 * 24));
            const h = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((distancia % (1000 * 60)) / 1000);
            document.getElementById("days").innerText = d.toString().padStart(2, '0');
            document.getElementById("hours").innerText = h.toString().padStart(2, '0');
            document.getElementById("minutes").innerText = m.toString().padStart(2, '0');
            document.getElementById("seconds").innerText = s.toString().padStart(2, '0');
        };
        setInterval(atualizarCronometro, 1000);
        atualizarCronometro();
    }

    // --- 2. LÓGICA DE ENVIO PARA WHATSAPP ---
    const formInscricao = document.getElementById('registrationForm');

    if (formInscricao) {
        formInscricao.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btn = document.getElementById('btnEnviar');
            btn.disabled = true;
            btn.innerHTML = "ENVIANDO PARA O WHATSAPP...";

            // Captura dos dados
            const nome = document.getElementById('nome').value;
            const cpf = document.getElementById('cpf').value;
            const nascimento = document.getElementById('nascimento').value;
            const whatsapp = document.getElementById('telefone').value;
            const veiculo = document.getElementById('veiculo').value;
            const placa = document.getElementById('placa').value || "Não informada";
            const ano = document.getElementById('ano').value || "N/I";
            const rota = document.getElementById('rota').value;
            const radio = document.querySelector('input[name="radio_com"]:checked')?.value || "Não";
            const zequinhas = document.getElementById('zequinhas').value;
            const tamanhos = document.getElementById('tamanhos_camisetas').value;

            // Montagem da Mensagem (Ficha solicitada)
            let mensagem = `📝 *Ficha de Inscrição: Passeio Maracuru (22 e 23 de Maio)*\n\n`;
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
            
            mensagem += `*4. Informações Adicionais*\n`;
            mensagem += `Acompanhantes (Zequinhas): ${zequinhas}\n`;
            mensagem += `Tamanho das Camisetas: ${tamanhos}\n\n`;
            mensagem += `_Estou enviando minha ficha para validação e pagamento._`;

            // Codificar para URL
            const mensagemFinal = encodeURIComponent(mensagem);
            const numeroWhats = "5585986593340";
            const linkZap = `https://wa.me/${numeroWhats}?text=${mensagemFinal}`;

            // Redirecionar
            setTimeout(() => {
                window.location.href = linkZap;
                btn.disabled = false;
                btn.innerHTML = "CONCLUIR INSCRIÇÃO";
            }, 800);
        });
    }
});
