const inputPotencia = document.getElementById('potencia');
const inputHoras = document.getElementById('horas');
const inputDias = document.getElementById('dias');
const btnCalcular = document.getElementById('btn-calcular');
const btnLimpar = document.getElementById('btn-limpar');
const areaResultado = document.getElementById('area-resultado');

function calcularConsumo() {
    const potencia = parseFloat(inputPotencia.value);
    const horas = parseFloat(inputHoras.value);
    const dias = parseInt(inputDias.value);

    // Validação para evitar cálculos com campos vazios ou zerados/negativos
    if (!potencia || !horas || !dias || potencia <= 0 || horas <= 0 || dias <= 0) {
        areaResultado.style.display = 'block';
        areaResultado.className = 'resultado erro';
        areaResultado.innerHTML = '<p>Preencha todos os campos com valores válidos maiores que zero.</p>';
        return; 
    }

    // Validações de limite lógico para horas e dias
    if (horas > 24 || dias > 31) {
        areaResultado.style.display = 'block';
        areaResultado.className = 'resultado erro';
        areaResultado.innerHTML = '<p>Os valores de horas (máx 24) ou dias (máx 31) são inválidos.</p>';
        return;
    }

    const consumoMensal = (potencia * horas * dias) / 1000;
    
    let classificacao = '';
    let classeVisual = '';

    // Lógica de classificação das faixas de consumo
    if (consumoMensal <= 30) {
        classificacao = 'Consumo Baixo';
        classeVisual = 'consumo-baixo';
    } else if (consumoMensal <= 100) {
        classificacao = 'Consumo Moderado';
        classeVisual = 'consumo-moderado';
    } else if (consumoMensal <= 200) {
        classificacao = 'Consumo Alto';
        classeVisual = 'consumo-alto';
    } else {
        classificacao = 'Consumo Muito Alto';
        classeVisual = 'consumo-muito-alto';
    }

    areaResultado.style.display = 'block';
    areaResultado.className = `resultado ${classeVisual}`;
    areaResultado.innerHTML = `
        <p>Consumo mensal: <strong>${consumoMensal.toFixed(2).replace('.', ',')} kWh</strong></p>
        <p>Classificação: <strong>${classificacao}</strong></p>
    `;
}

function limparCampos() {
    inputPotencia.value = '';
    inputHoras.value = '';
    inputDias.value = '';
    
    areaResultado.style.display = 'none';
    areaResultado.innerHTML = '';
    areaResultado.className = 'resultado';
}

btnCalcular.addEventListener('click', calcularConsumo);
btnLimpar.addEventListener('click', limparCampos);