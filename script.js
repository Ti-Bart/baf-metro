let cliques = 0;
let bagSorteio = [];
let isSorteando = false; // Controle de estado para evitar duplo clique

document.getElementById('btnAleatorizar').addEventListener('click', function () {
    if (isSorteando) return; // Evita múltiplos cliques enquanto está rodando
    isSorteando = true;

    cliques++;
    let numeroAleatorio;

    const btn = document.getElementById('btnAleatorizar');
    const resultadoDiv = document.getElementById('resultado');
    const loading = document.getElementById('loading');
    const alarme = document.getElementById('alarme');

    // Inicia Estado de Loading (Limpa anterior e mostra o spinner)
    btn.disabled = true;
    btn.innerText = 'PROCESSANDO...';
    resultadoDiv.innerHTML = '';
    loading.style.display = 'block';

    // Lógica do sorteador (Sacola de 3 itens)
    if (bagSorteio.length === 0) {
        bagSorteio = [false, false, false];
        const indexSorteado = Math.floor(Math.random() * 3);
        bagSorteio[indexSorteado] = true;
    }
    
    // Puxa o último elemento da sacola
    const bafometroAtivado = bagSorteio.pop();

    if (bafometroAtivado) {
        // Ativadores: 1 ou 10
        numeroAleatorio = Math.random() < 0.5 ? 1 : 10;
    } else {
        // Números liberados: 2 a 9
        numeroAleatorio = Math.floor(Math.random() * 8) + 2;
    }

    // Simula um tempo de carregamento aleatório (entre 1.2s e 2.0s) para gerar suspense
    const tempoLoading = Math.floor(Math.random() * 800) + 1200;

    setTimeout(() => {
        // Finaliza o loading e exibe resultado
        loading.style.display = 'none';
        btn.disabled = false;
        btn.innerText = 'SORTEAR AGORA';

        if (bafometroAtivado) {
            resultadoDiv.innerHTML = `
                <div class="resultado-box alerta">
                    <span class="numero">${numeroAleatorio}</span>
                    🚨 TESTE OBRIGATÓRIO! 🚨
                </div>
            `;
            alarme.pause();
            alarme.currentTime = 0;
            alarme.play().catch(error => console.error("Erro no som:", error));
        } else {
            resultadoDiv.innerHTML = `
                <div class="resultado-box liberado">
                    <span class="numero">${numeroAleatorio}</span>
                    ✅ LIBERADO
                </div>
            `;
        }

        // Debug no final
        console.log(
            `Clique: ${cliques}, Número: ${numeroAleatorio}, ` +
            `Bafômetro: ${bafometroAtivado ? 'Sim' : 'Não'}, ` +
            `Itens restantes: ${bagSorteio.length}`
        );

        isSorteando = false;
    }, tempoLoading);
});
