const apikey  = "ed37d797";

document.querySelector('.card').style.display = "none";

async function buscarPrevisao(){
    const city = document.getElementById("cidade-input").value.trim().toLowerCase();
    if(!city){
        alert("Digite uma cidade!");
        return;
    }

    const url = `https://api.hgbrasil.com/weather?key=${apikey}&city_name=${encodeURIComponent(city)}&format=json-cors`;
    try{
        const response = await fetch(url);
        const dados = await response.json();

        if(dados && dados.results){
            const previsao = dados.results;

            // Determina o ícone de acordo com a condição
            let icon = "";
            const cond = previsao.description.toLowerCase();
            if(cond.includes("sol")) {
                icon = '<i class="fas fa-sun"></i>';
            }else if(cond.includes("chuva")) {
                icon = '<i class="fas fa-cloud-showers-heavy"></i>';
            }else if (cond.includes("nublado")) {
                icon = '<i class="fas fa-cloud"></i>';
            }else if (cond.includes("tempestade")) {
                icon = '<i class="fas fa-bolt"></i>';
            }else {
                icon = '<i class="fas fa-smog"></i>';
            }

            document.getElementById("cidade").innerText = previsao.city_name || "-";
            document.getElementById("temperatura").innerText = previsao.temp || "-";
            document.getElementById("umidade").innerText = previsao.humidity || "-";
            document.getElementById("condicao").innerHTML = `${icon} ${previsao.description || "-"}`;
            document.getElementById("vento").innerText = previsao.wind_speedy || "-";

            document.querySelector('.card').style.display = "block";

            document.getElementById('cidade-input').value = ""; // Limpa o campo de entrada

        }else{
            alert("Não foi possível obter os dados da cidade informada.");
        }

    }catch(error){
        alert("Erro ao buscar os dados da API.");
        console.log(error);
    }
}


function capitalizar(str) {
    return str.replace(/\b\w/g, l => l.toUpperCase());
}

// Adicione este trecho FORA da função buscarPrevisao:
document.getElementById("cidade-input").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        buscarPrevisao();
    }
});

document.getElementById("buscar-btn").addEventListener("click", buscarPrevisao);
