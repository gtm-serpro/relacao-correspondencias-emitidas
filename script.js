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

function verDetalhamento(id) {
    // Busca a correspondência nos dados
    const corresp = correspondenciasData.find(c => c.id === id);
    
    if (!corresp) {
        console.error('Correspondência não encontrada');
        return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'modal-detalhamento';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="fecharModal()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-file-alt"></i> Detalhamento Completo - Correspondência Nº ${corresp.numero}</h3>
                <button class="modal-close" onclick="fecharModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="detalhamento-section">
                    <h4>Informações Gerais</h4>
                    <div class="info-row">
                        <span class="info-label">Número:</span>
                        <span class="info-value">${corresp.numero}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Data de Emissão:</span>
                        <span class="info-value">${new Date(corresp.dataEmissao).toLocaleString('pt-BR')}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Destinatário:</span>
                        <span class="info-value">${corresp.destinatario.nome} (${corresp.destinatario.tipoDocumento}: ${corresp.destinatario.documento})</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Tipo:</span>
                        <span class="info-value">${corresp.tipo === 'intimacao' ? 'Intimação' : 'Comunicado'}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Natureza:</span>
                        <span class="info-value">${corresp.natureza.nome}</span>
                    </div>
                </div>
                
                <div class="detalhamento-section">
                    <h4>Status e Prazos</h4>
                    <div class="info-row">
                        <span class="info-label">Status da Ciência:</span>
                        <span class="info-value">${corresp.status.ciencia.texto}</span>
                    </div>
                    ${corresp.status.ciencia.dataCientificacao ? `
                    <div class="info-row">
                        <span class="info-label">Data da Cientificação:</span>
                        <span class="info-value">${new Date(corresp.status.ciencia.dataCientificacao).toLocaleDateString('pt-BR')}</span>
                    </div>
                    ` : ''}
                    ${corresp.prazos.prazoManifestacao ? `
                    <div class="info-row">
                        <span class="info-label">Prazo de Manifestação:</span>
                        <span class="info-value">${corresp.prazos.prazoManifestacao} dias</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Data Final de Manifestação:</span>
                        <span class="info-value">${new Date(corresp.prazos.dataFinalManifestacao).toLocaleDateString('pt-BR')}</span>
                    </div>
                    ` : ''}
                    ${corresp.status.manifestacao.dataManifestacao ? `
                    <div class="info-row">
                        <span class="info-label">Data da Manifestação:</span>
                        <span class="info-value">${new Date(corresp.status.manifestacao.dataManifestacao).toLocaleDateString('pt-BR')}</span>
                    </div>
                    ` : ''}
                </div>
                
                ${corresp.alertas && corresp.alertas.length > 0 ? `
                <div class="detalhamento-section">
                    <h4>Observações</h4>
                    ${corresp.alertas.map(alerta => `
                        <div class="alert-box">
                            <i class="fas fa-exclamation-triangle"></i>
                            <p>${alerta.mensagem}</p>
                        </div>
                    `).join('')}
                </div>
                ` : ''}
                
                <div class="detalhamento-section">
                    <h4>Documentos Anexados</h4>
                    <ul class="document-list-modal">
                        ${corresp.documentos.map(doc => `
                            <li>
                                <i class="fas fa-file-pdf"></i>
                                <a href="${doc.url}">${doc.nome}</a>
                                ${doc.principal ? '<span class="badge badge-intimacao">PRINCIPAL</span>' : ''}
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
            <div class="modal-footer">
                <button class="action-btn" onclick="fecharModal()">
                    <i class="fas fa-times"></i>
                    Fechar
                </button>
                <button class="action-btn action-btn-primary" onclick="imprimirDetalhamento()">
                    <i class="fas fa-print"></i>
                    Imprimir
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

function fecharModal() {
    const modal = document.querySelector('.modal-detalhamento');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

function imprimirDetalhamento() {
    window.print();
}

// Fechar modal com ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        fecharModal();
    }
});