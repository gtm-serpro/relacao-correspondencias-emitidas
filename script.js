// Toggle card expansion
function toggleCard(cardMain) {
    const card = cardMain.closest('.correspondence-card');
    card.classList.toggle('expanded');
}

// Toggle exibir devolvidas/canceladas
document.getElementById('exibirDevolvidas').addEventListener('change', function() {
    const cards = document.querySelectorAll('.correspondence-card[data-devolvida="true"]');
    
    cards.forEach(card => {
        if (this.checked) {
            card.classList.remove('hidden-devolvida');
        } else {
            card.classList.add('hidden-devolvida');
        }
    });
    
    updateCount();
});

// Update correspondence count
function updateCount() {
    const visibleCards = document.querySelectorAll('.correspondence-card:not(.hidden-devolvida)').length;
    document.getElementById('countDisplay').innerHTML = `${visibleCards} correspondências`;
}

// Toggle dropdown
function toggleDropdown(btn) {
    const dropdown = btn.closest('.dropdown');
    const allDropdowns = document.querySelectorAll('.dropdown');
    
    allDropdowns.forEach(d => {
        if (d !== dropdown) {
            d.classList.remove('active');
        }
    });
    
    dropdown.classList.toggle('active');
}

// Fechar dropdowns ao clicar fora
document.addEventListener('click', function(e) {
    if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown').forEach(d => {
            d.classList.remove('active');
        });
    }
});

// Action functions
function downloadDoc(tipo) {
    alert(`Download: ${tipo}`);
}

function alterarPrazo(numero) {
    alert(`Alterar prazo da correspondência ${numero}`);
}

function efetivarManifestacao(numero) {
    alert(`Efetivar manifestação da correspondência ${numero}`);
}

function cancelarCorrespondencia(numero) {
    if (confirm(`Confirma o cancelamento da correspondência ${numero}?`)) {
        alert('Correspondência cancelada com sucesso!');
    }
}

function exibirHistorico(numero) {
    alert(`Exibir histórico da correspondência ${numero}`);
}

function desfazerCiencia(numero) {
    if (confirm(`Confirma desfazer a efetivação de ciência da correspondência ${numero}?`)) {
        alert('Efetivação de ciência desfeita com sucesso!');
    }
}

function desfazerManifestacao(numero) {
    if (confirm(`Confirma desfazer a efetivação de manifestação da correspondência ${numero}?`)) {
        alert('Efetivação de manifestação desfeita com sucesso!');
    }
}

function copiarEmail(numero) {
    alert(`Dados do e-mail da correspondência ${numero} copiados para a área de transferência`);
}

function reenviarEmail(numero) {
    alert(`E-mail da correspondência ${numero} reenviado com sucesso!`);
}

// Initial count
updateCount();