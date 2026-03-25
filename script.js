/**
 * PROJETO: Maranguape Off Road - 2ª Edição Maracuru
 * ARQUIVO: script.js (Lógica unificada para Index e Inscrição)
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. CONFIGURAÇÃO DO CRONÔMETRO ---
    // Só executa se os elementos de contagem existirem na página (inscricao.html)
    const timerContainer = document.getElementById('countdown-timer');
    
    if (timerContainer) {
        const dataEvento = new Date(2026, 4, 22, 8, 0, 0).getTime(); // 22 de Maio de 2026
        
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

        // Exibe a data atual formatada
        const campoData = document.getElementById('dataAutomatica');
        if (campoData) {
            const hoje = new Date();
            campoData.innerText = `Data da Inscrição: ${hoje.toLocaleDateString('pt-BR')}`;
        }
    }

    // --- 2. LÓGICA DO FORMULÁRIO E PDF ---
    const formInscricao = document.getElementById('registrationForm');

    if (formInscricao) {
        formInscricao.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btn = document.getElementById('btnEnviar');
            btn.disabled = true;
            btn.innerHTML = "GERANDO SUA FICHA...";

            // Captura dos dados do formulário
            const rádioSelecionado = document.querySelector('input[name="radio_com"]:checked');
            
            const dados = {
                nome: document.getElementById('nome').value,
                cpf: document.getElementById('cpf').value,
                nascimento: document.getElementById('nascimento').value,
                whatsapp: document.getElementById('telefone').value,
                veiculo: document.getElementById('veiculo').value,
                placa: document.getElementById('placa').value || "Não informada",
                ano: document.getElementById('ano').value || "N/I",
                rota: document.getElementById('rota').value,
                radio: rádioSelecionado ? rádioSelecionado.value : "Não",
                zequinhas: document.getElementById('zequinhas').value,
                qtdCamisetas: document.getElementById('qtd_camisetas').value,
                tamanhos: document.getElementById('tamanhos_camisetas').value
            };

            gerarFichaPDF(dados);
        });
    }

    // --- 3. FUNÇÃO PARA GERAR O PDF (LAYOUT EXATO) ---
    function gerarFichaPDF(dados) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const img = new Image();
        img.src = 'img/2maracuru.png';

        img.onload = function() {
            // Cabeçalho e Logo
            doc.addImage(img, 'PNG', 55, 10, 100, 30);
            doc.setFont("helvetica", "normal").setFontSize(26);
            doc.text("FICHA DE INSCRIÇÃO OFICIAL", 105, 55, { align: "center" });
            
            // Linha Verde Maracuru
            doc.setDrawColor(40, 211, 17).setLineWidth(1.5);
            doc.line(30, 62, 180, 62);

            // 1. Dados do Condutor
            doc.setFont("helvetica", "bold").setFontSize(14).text("1. Dados do Condutor", 20, 75);
            doc.setFont("helvetica", "normal").setFontSize(12);
            doc.text(`Nome Completo: ${dados.nome}`, 20, 85);
            doc.text(`CPF: ${dados.cpf}`, 140, 85);
            doc.text(`Nascimento: ${dados.nascimento}`, 20, 95);
            doc.text(`WhatsApp: ${dados.whatsapp}`, 100, 95);

            // 2. Veículo e Percurso
            doc.setFont("helvetica", "bold").text("2. Veículo & Percurso", 20, 115);
            doc.setFont("helvetica", "normal");
            doc.text(`Modelo: ${dados.veiculo}`, 20, 125);
            doc.text(`Ano: ${dados.ano}`, 100, 125);
            doc.text(`Placa: ${dados.placa}`, 20, 135);
            doc.text(`Percurso: ${dados.rota}`, 100, 135);
            doc.text(`Rádio Comunicação: ${dados.radio}`, 20, 145);
            doc.text(`Acompanhantes: ${dados.zequinhas}`, 100, 145);

            // 3. Pedido de Camisas
            doc.setFont("helvetica", "bold").text("3. PEDIDO DE CAMISAS", 20, 170);
            doc.setFont("helvetica", "normal");
            doc.text(`Quantidade: ${dados.qtdCamisetas}`, 20, 180);
            doc.text(`Tamanhos: ${dados.tamanhos}`, 80, 180);

            // Rodapé
            doc.setFont("times", "italic").setFontSize(22);
            doc.text("Venha trilhar com a gente!", 105, 260, { align: "center" });

            // Ação: Salva o PDF e vai para o WhatsApp
            const pdfBlob = doc.output('bloburl');
            window.open(pdfBlob, '_blank'); // Abre o PDF para o usuário ver/salvar

            const msgZap = `*🏁 INSCRIÇÃO EXATA: MARACURU*%0A*Piloto:* ${dados.nome}%0A*Rota:* ${dados.rota}%0A_Olá, acabei de gerar minha ficha de inscrição em PDF e estou enviando agora para confirmação._`;
            
            setTimeout(() => {
                window.location.href = `https://wa.me/5585986593340?text=${msgZap}`;
            }, 1500);
        };
        
        img.onerror = function() {
            alert("Erro ao carregar a logo para o PDF. Verifique a pasta img.");
        };
    }
});