// renderizador-cards.js

class CorrespondenciaRenderer {
    constructor(containerId = 'correspondenceList') {
        this.container = document.getElementById(containerId);
        this.correspondencias = [];
        this.exibirDevolvidas = false;
    }

    // Carrega os dados
    carregarDados(dados) {
        this.correspondencias = dados;
        this.renderizar();
    }

    // Formata data
    formatarData(dataISO) {
        if (!dataISO) return '—';
        const data = new Date(dataISO);
        return data.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Formata data simples
    formatarDataSimples(dataISO) {
        if (!dataISO) return '—';
        const data = new Date(dataISO);
        return data.toLocaleDateString('pt-BR');
    }

    // Gera badges de tipo
    gerarBadgeTipo(tipo) {
        const tipos = {
            intimacao: { 
                classe: 'badge-intimacao', 
                icone: 'fas fa-bell', 
                texto: 'Intimação',
                tooltip: 'Comunicação oficial que exige resposta ou manifestação do destinatário'
            },
            comunicado: { 
                classe: 'badge-comunicado', 
                icone: 'fas fa-info-circle', 
                texto: 'Comunicado',
                tooltip: 'Informação ou aviso ao destinatário, sem necessidade de manifestação'
            }
        };
        
        const config = tipos[tipo] || tipos.comunicado;
        
        return `
            <span class="badge ${config.classe}" data-tooltip="${config.tooltip}">
                <i class="${config.icone}"></i>
                ${config.texto}
            </span>
        `;
    }

    // Gera badge de natureza com tooltip
    gerarBadgeNatureza(natureza) {
        const tooltips = {
            'postal-manual': 'Correspondência enviada por correio com aviso de recebimento manual',
            'email': 'Correspondência enviada por e-mail eletrônico',
            'edital': 'Publicação oficial em diário ou órgão de divulgação',
            'pessoal-interno': 'Entrega pessoal por servidor interno do órgão',
            'dte-rfb': 'Domicílio Tributário Eletrônico da Receita Federal do Brasil',
            'caixa-postal': 'Correspondência disponibilizada em caixa postal eletrônica'
        };
        
        const tooltip = tooltips[natureza.codigo] || 'Meio de comunicação utilizado para envio';
        
        return `
            <span class="badge badge-natureza" data-tooltip="${tooltip}">
                <i class="${natureza.icone}"></i>
                ${natureza.nome}
            </span>
        `;
    }

    // Gera badge de status de ciência com tooltip
    gerarBadgeStatusCiencia(status) {
        const configs = {
            'efetivada': { 
                classe: 'badge-sucesso', 
                icone: 'fas fa-check-circle',
                tooltip: 'Ciência confirmada pelo destinatário'
            },
            'efetivada-abertura': { 
                classe: 'badge-sucesso', 
                icone: 'fas fa-check-circle',
                tooltip: 'Ciência efetivada pela abertura/visualização da correspondência'
            },
            'efetivada-decurso': { 
                classe: 'badge-sucesso', 
                icone: 'fas fa-check-circle',
                tooltip: 'Ciência efetivada pelo decurso de prazo sem manifestação'
            },
            'efetivada-caixa-postal': { 
                classe: 'badge-sucesso', 
                icone: 'fas fa-check-circle',
                tooltip: 'Ciência efetivada pela disponibilização na caixa postal eletrônica'
            },
            'nao-efetivada': { 
                classe: 'badge-pendente', 
                icone: 'fas fa-times-circle',
                tooltip: 'Ciência ainda não foi confirmada ou efetivada'
            }
        };
        
        const config = configs[status.tipo] || configs['nao-efetivada'];
        
        return `
            <span class="badge ${config.classe}" data-tooltip="${config.tooltip}">
                <i class="${config.icone}"></i>
                ${status.texto}
            </span>
        `;
    }

    // Gera badge de status de manifestação com tooltip
    gerarBadgeStatusManifestacao(manifestacao) {
        if (manifestacao.efetivada) {
            return `
                <span class="badge badge-sucesso" data-tooltip="Destinatário apresentou manifestação dentro do prazo">
                    <i class="fas fa-check-double"></i>
                    Manifestação Efetivada
                </span>
            `;
        }
        
        if (manifestacao.pendente) {
            return `
                <span class="badge badge-pendente" data-tooltip="Aguardando manifestação do destinatário dentro do prazo">
                    <i class="far fa-clock"></i>
                    Manifestação Pendente
                </span>
            `;
        }
        
        return '';
    }

    // Gera badge de cancelada com tooltip
    gerarBadgeCancelada(cancelada) {
        if (!cancelada) return '';
        
        return `
            <span class="badge badge-cancelada" data-tooltip="Correspondência cancelada por decisão administrativa">
                <i class="fas fa-ban"></i>
                Cancelada
            </span>
        `;
    }

    // Gera alertas
    gerarAlertas(alertas) {
        if (!alertas || alertas.length === 0) return '';
        
        return alertas.map(alerta => `
            <span class="alert-icon">
                <i class="fas fa-exclamation-triangle"></i>
                <span class="tooltip-content">${alerta.mensagem}</span>
            </span>
        `).join('');
    }

    // Gera lista de documentos - clicáveis
    gerarDocumentos(documentos) {
        return documentos.map(doc => `
            <li class="document-item ${doc.principal ? 'principal' : ''}">
                <i class="fas fa-file-pdf"></i>
                <a href="#" onclick="event.stopPropagation(); downloadDocumento('${doc.nome}', '${doc.url}'); return false;">${doc.nome}</a>
                ${doc.principal ? '<span class="badge badge-intimacao">PRINCIPAL</span>' : ''}
            </li>
        `).join('');
    }

    // Gera botões de download
    gerarBotoesDownload(downloads, numero) {
        const downloadLabels = {
            'carta': { icone: 'fas fa-envelope', texto: 'Carta de Orientações' },
            'ciencia': { icone: 'fas fa-file-alt', texto: 'Docs. da Ciência' },
            'ciencia-termo': { icone: 'fas fa-file-signature', texto: 'Docs. com Termo' },
            'termo': { icone: 'fas fa-certificate', texto: 'Termo de Ciência' },
            'edital': { icone: 'fas fa-newspaper', texto: 'Edital' }
        };

        return downloads.map(tipo => {
            const config = downloadLabels[tipo];
            if (!config) return '';
            
            return `
                <button class="action-btn" onclick="event.stopPropagation(); downloadDoc('${tipo}', ${numero})">
                    <i class="${config.icone}"></i>
                    ${config.texto}
                </button>
            `;
        }).join('');
    }

    // Gera botões de ação
    gerarBotoesAcao(acoes, numero) {
        let botoes = [];

        if (acoes.podeAlterarPrazo) {
            botoes.push(`
                <button class="action-btn" onclick="event.stopPropagation(); alterarPrazo(${numero})">
                    <i class="fas fa-calendar"></i>
                    Alterar Prazo
                </button>
            `);
        }

        if (acoes.podeEfetivarManifestacao) {
            botoes.push(`
                <button class="action-btn" onclick="event.stopPropagation(); efetivarManifestacao(${numero})">
                    <i class="fas fa-check-circle"></i>
                    Efetivar Manifestação
                </button>
            `);
        }

        if (acoes.podeDesfazerCiencia) {
            botoes.push(`
                <button class="action-btn" onclick="event.stopPropagation(); desfazerCiencia(${numero})">
                    <i class="fas fa-undo"></i>
                    Desfazer Ciência
                </button>
            `);
        }

        if (acoes.podeDesfazerManifestacao) {
            botoes.push(`
                <button class="action-btn" onclick="event.stopPropagation(); desfazerManifestacao(${numero})">
                    <i class="fas fa-undo-alt"></i>
                    Desfazer Manifestação
                </button>
            `);
        }

        // Outras ações específicas
        if (acoes.outrasAcoes.includes('copiarEmail')) {
            botoes.push(`
                <button class="action-btn" onclick="event.stopPropagation(); copiarEmail(${numero})">
                    <i class="fas fa-copy"></i>
                    Copiar E-mail
                </button>
            `);
        }

        if (acoes.outrasAcoes.includes('reenviarEmail')) {
            botoes.push(`
                <button class="action-btn" onclick="event.stopPropagation(); reenviarEmail(${numero})">
                    <i class="fas fa-paper-plane"></i>
                    Reenviar E-mail
                </button>
            `);
        }

        // Sempre adiciona histórico
        botoes.push(`
            <button class="action-btn" onclick="event.stopPropagation(); exibirHistorico(${numero})">
                <i class="fas fa-history"></i>
                Histórico
            </button>
        `);

        // Botão de cancelar (se permitido)
        if (acoes.podeCancelar) {
            botoes.push(`
                <button class="action-btn action-btn-danger" onclick="event.stopPropagation(); cancelarCorrespondencia(${numero})">
                    <i class="fas fa-times-circle"></i>
                    Cancelar
                </button>
            `);
        }

        return botoes.join('');
    }

    // Gera seção de prazos inline para o header
    gerarPrazosInline(corresp) {
        const dataCientificacao = corresp.status.ciencia.dataCientificacao 
            ? this.formatarDataSimples(corresp.status.ciencia.dataCientificacao)
            : 'Não efetivada';
        
        const prazoManifestacao = corresp.prazos.prazoManifestacao 
            ? `${corresp.prazos.prazoManifestacao} dias`
            : 'Não aplicável';
        
        const dataFinalManifestacao = corresp.prazos.dataFinalManifestacao 
            ? this.formatarDataSimples(corresp.prazos.dataFinalManifestacao)
            : '—';
        
        const dataManifestacao = corresp.status.manifestacao.dataManifestacao 
            ? this.formatarDataSimples(corresp.status.manifestacao.dataManifestacao)
            : 'Não manifestado';
        
        const cientificacaoEmpty = !corresp.status.ciencia.dataCientificacao;
        const prazoEmpty = !corresp.prazos.prazoManifestacao;
        const dataFinalEmpty = !corresp.prazos.dataFinalManifestacao;
        const manifestacaoEmpty = !corresp.status.manifestacao.dataManifestacao;
        
        return `
            <div class="card-prazos-inline">
                <div class="card-prazo-item">
                    <span class="card-prazo-label">Cientificação</span>
                    <span class="card-prazo-value ${cientificacaoEmpty ? 'empty' : ''}">${dataCientificacao}</span>
                </div>
                <div class="card-prazo-item">
                    <span class="card-prazo-label">Prazo</span>
                    <span class="card-prazo-value ${prazoEmpty ? 'empty' : ''}">${prazoManifestacao}</span>
                </div>
                <div class="card-prazo-item">
                    <span class="card-prazo-label">Data Final</span>
                    <span class="card-prazo-value ${dataFinalEmpty ? 'empty' : ''}">${dataFinalManifestacao}</span>
                </div>
                <div class="card-prazo-item">
                    <span class="card-prazo-label">Manifestação</span>
                    <span class="card-prazo-value ${manifestacaoEmpty ? 'empty' : ''}">${dataManifestacao}</span>
                </div>
            </div>
        `;
    }

    // Atualiza o método gerarCard para incluir os prazos inline
    gerarCard(corresp) {
        const iconeDestinatario = corresp.destinatario.tipo === 'empresa' ? 'far fa-building' : 'far fa-user';
        const classeDevolvida = (corresp.devolvida || corresp.cancelada) ? 'hidden-devolvida' : '';
        const dataDevolvida = (corresp.devolvida || corresp.cancelada) ? 'data-devolvida="true"' : '';

        return `
            <div class="correspondence-card ${classeDevolvida}" ${dataDevolvida}>
                <div class="card-main" onclick="toggleCard(this)">
                    <div class="card-main-row">
                        <div class="card-header-info">
                            <div class="card-number-inline">
                                <span class="card-number-label">Nº</span>
                                <span class="card-number-value">${corresp.numero}</span>
                            </div>
                            <div class="card-datetime">
                                <i class="far fa-clock"></i>
                                <a href="#" onclick="event.stopPropagation();">${this.formatarData(corresp.dataEmissao)}</a>
                            </div>
                        </div>
                        
                        <div class="card-main-content">
                            <div class="card-destinatario">
                                <i class="${iconeDestinatario}"></i>
                                <span class="tooltip-trigger">
                                    ${corresp.destinatario.nome}
                                    <span class="tooltip-content">${corresp.destinatario.tipoDocumento}: ${corresp.destinatario.documento}</span>
                                </span>
                            </div>
                            
                            <div class="card-badges">
                                ${this.gerarBadgeTipo(corresp.tipo)}
                                ${this.gerarBadgeNatureza(corresp.natureza)}
                                ${this.gerarBadgeStatusCiencia(corresp.status.ciencia)}
                                ${this.gerarBadgeCancelada(corresp.cancelada)}
                                ${this.gerarAlertas(corresp.alertas)}
                                ${this.gerarBadgeStatusManifestacao(corresp.status.manifestacao)}
                            </div>
                        </div>
                        
                        ${this.gerarPrazosInline(corresp)}
                        ${this.gerarDocumentoPrincipalInline(corresp)}
                        
                        <div class="card-expand">
                            <i class="fas fa-chevron-down"></i>
                        </div>
                    </div>
                </div>
                
                <div class="card-details">
                    <div class="details-grid">
                        <div class="detail-item">
                            <span class="detail-label">Data da Cientificação</span>
                            <span class="detail-value ${!corresp.status.ciencia.dataCientificacao ? 'empty' : ''}">
                                ${corresp.status.ciencia.dataCientificacao ? this.formatarDataSimples(corresp.status.ciencia.dataCientificacao) : 'Não efetivada'}
                            </span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Prazo de Manifestação</span>
                            <span class="detail-value ${!corresp.prazos.prazoManifestacao ? 'empty' : ''}">
                                ${corresp.prazos.prazoManifestacao ? corresp.prazos.prazoManifestacao + ' dias' : 'Não aplicável'}
                            </span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Data Final de Manifestação</span>
                            <span class="detail-value ${!corresp.prazos.dataFinalManifestacao ? 'empty' : ''}">
                                ${corresp.prazos.dataFinalManifestacao ? this.formatarDataSimples(corresp.prazos.dataFinalManifestacao) : '—'}
                            </span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Data da Manifestação</span>
                            <span class="detail-value ${!corresp.status.manifestacao.dataManifestacao ? 'empty' : ''}">
                                ${corresp.status.manifestacao.dataManifestacao ? this.formatarDataSimples(corresp.status.manifestacao.dataManifestacao) : 'Não manifestado'}
                            </span>
                        </div>
                    </div>
                    
                    <div class="documents-section">
                        <div class="documents-title">
                            <i class="fas fa-paperclip"></i>
                            Documentos da Correspondência
                        </div>
                        <ul class="document-list">
                            ${this.gerarDocumentos(corresp.documentos)}
                        </ul>
                    </div>
                    
                    <div class="actions-section">
                        <button class="action-btn action-btn-primary" onclick="event.stopPropagation(); verDetalhamento(${corresp.id})">
                            <i class="fas fa-file-alt"></i>
                            Detalhamento Completo
                        </button>
                        
                        ${this.gerarBotoesDownload(corresp.acoes.downloads, corresp.id)}
                        ${this.gerarBotoesAcao(corresp.acoes, corresp.id)}
                    </div>
                </div>
            </div>
        `;
    }

    // Renderiza todos os cards
    renderizar() {
        if (!this.container) {
            console.error('Container não encontrado');
            return;
        }

        const html = this.correspondencias.map(corresp => this.gerarCard(corresp)).join('');
        this.container.innerHTML = html;
        this.atualizarContador();
    }

    // Atualiza contador
    atualizarContador() {
        const visibleCards = this.correspondencias.filter(c => 
            this.exibirDevolvidas || (!c.devolvida && !c.cancelada)
        ).length;
        
        const countDisplay = document.getElementById('countDisplay');
        if (countDisplay) {
            countDisplay.innerHTML = `${visibleCards} correspondência${visibleCards !== 1 ? 's' : ''}`;
        }
    }

    // Toggle exibir devolvidas
    toggleDevolvidas(exibir) {
        this.exibirDevolvidas = exibir;
        
        const cards = document.querySelectorAll('.correspondence-card[data-devolvida="true"]');
        cards.forEach(card => {
            if (exibir) {
                card.classList.remove('hidden-devolvida');
            } else {
                card.classList.add('hidden-devolvida');
            }
        });
        
        this.atualizarContador();
    }

    // Filtra correspondências
    filtrar(criterios) {
        // Implementar lógica de filtro conforme necessário
        // Por exemplo: por tipo, status, data, etc.
        console.log('Filtrar:', criterios);
    }

    // Ordena correspondências
    ordenar(campo, direcao = 'desc') {
        this.correspondencias.sort((a, b) => {
            let valorA, valorB;
            
            switch(campo) {
                case 'numero':
                    valorA = parseInt(a.numero);
                    valorB = parseInt(b.numero);
                    break;
                case 'data':
                    valorA = new Date(a.dataEmissao);
                    valorB = new Date(b.dataEmissao);
                    break;
                case 'destinatario':
                    valorA = a.destinatario.nome;
                    valorB = b.destinatario.nome;
                    break;
                default:
                    return 0;
            }
            
            if (direcao === 'asc') {
                return valorA > valorB ? 1 : -1;
            } else {
                return valorA < valorB ? 1 : -1;
            }
        });
        
        this.renderizar();
    }

    // Gera documento principal inline para o header - clicável
    gerarDocumentoPrincipalInline(corresp) {
        const docPrincipal = corresp.documentos.find(doc => doc.principal);
        
        if (!docPrincipal) return '';
        
        return `
            <div class="card-documento-inline" onclick="event.stopPropagation(); downloadDocumento('${docPrincipal.nome}', '${docPrincipal.url}')">
                <i class="fas fa-file-pdf"></i>
                <div class="card-documento-info">
                    <span class="card-documento-label">Documento Principal</span>
                    <span class="card-documento-nome" title="${docPrincipal.nome}">${docPrincipal.nome}</span>
                </div>
            </div>
        `;
    }
}