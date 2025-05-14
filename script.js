const apikey = "ed37d797";

// Ao carregar a página, garante que a card está recolhida (sem animação de expansão)
document.querySelector('.card').classList.remove("expandir");

/**
 * Função principal para buscar a previsão do tempo na API HG Brasil
 */
async function buscarPrevisao() {
    // Obtém o valor digitado no input e remove espaços extras
    const city = document.getElementById("cidade-input").value.trim().toLowerCase();

    // Esconde a card antes de buscar (remove a classe de expansão)
    document.querySelector('.card').classList.remove("expandir");

    // Se o campo estiver vazio, alerta o usuário e interrompe a função
    if (!city) {
        alert("Digite uma cidade!");
        return;
    }

    // Monta a URL da API com a chave e cidade
    const url = `https://api.hgbrasil.com/weather?key=${apikey}&city_name=${encodeURIComponent(city)}&format=json-cors`;

    try {
        // Faz a requisição para a API
        const response = await fetch(url);
        const dados = await response.json();

        // Se a resposta for válida e contiver resultados
        if (dados && dados.results) {
            const previsao = dados.results;

            // Usa o campo condition_slug para montar a URL da imagem do clima
            const slug = previsao.condition_slug;
            const iconUrl = `https://assets.hgbrasil.com/weather/icons/conditions/${slug}.svg`;

            // Atualiza os elementos da tela com os dados recebidos
            document.getElementById("cidade").innerText = capitalizar(previsao.city_name) || "-";
            document.getElementById("temperatura").innerText = previsao.temp || "-";
            document.getElementById("umidade").innerText = previsao.humidity || "-";
            document.getElementById("condicao").innerHTML = `<img src="${iconUrl}" alt="${previsao.description}" class="icone-clima"> ${previsao.description || "-"}`;
            document.getElementById("vento").innerText = previsao.wind_speedy || "-";

            // Mostra a card com animação de expansão
            document.querySelector('.card').classList.add("expandir");

            // Limpa o campo de entrada após busca bem-sucedida
            document.getElementById('cidade-input').value = "";

        } else {
            // Caso não encontre a cidade, alerta o usuário
            alert("Não foi possível obter os dados da cidade informada.");
        }

    } catch (error) {
        // Em caso de erro na requisição, alerta o usuário
        alert("Erro ao buscar os dados da API.");
        console.log(error);
    }
}

/**
 * Função para capitalizar o nome da cidade
 * Exemplo: "são paulo" -> "São Paulo"
 */
function capitalizar(str) {
    return str.replace(/\b\w/g, l => l.toUpperCase());
}

// Permite buscar ao pressionar Enter no campo de texto
document.getElementById("cidade-input").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        buscarPrevisao();
    }
});

// Permite buscar ao clicar no botão de busca
document.getElementById("buscar-btn").addEventListener("click", buscarPrevisao);
