// dados-correspondencias.js
const correspondenciasData = [
    {
        id: 1,
        numero: "00005",
        dataEmissao: "2025-12-19T14:35:00",
        destinatario: {
            nome: "João Silva Santos",
            tipo: "pessoa", // pessoa, empresa
            documento: "123.456.789-00",
            tipoDocumento: "CPF"
        },
        tipo: "intimacao", // intimacao, comunicado
        natureza: {
            codigo: "postal-manual",
            nome: "Postal-Manual",
            icone: "fas fa-mail-bulk"
        },
        status: {
            ciencia: {
                efetivada: true,
                tipo: "efetivada", // efetivada, efetivada-abertura, efetivada-decurso, efetivada-caixa-postal, nao-efetivada
                texto: "Efetivada",
                dataCientificacao: "2025-12-15"
            },
            manifestacao: {
                efetivada: false,
                pendente: true,
                dataManifestacao: null
            }
        },
        prazos: {
            prazoManifestacao: 30,
            dataFinalManifestacao: "2026-01-14"
        },
        alertas: [
            {
                tipo: "warning",
                mensagem: "A ciência foi efetivada provisoriamente pelo destinatário ter tido acesso aos documentos da intimação. A efetivação definitiva ocorrerá quando o Aviso de Recebimento (AR) for juntado ao processo."
            }
        ],
        documentos: [
            {
                nome: "Despacho_2024_001.pdf",
                tipo: "pdf",
                principal: true,
                url: "#"
            },
            {
                nome: "Anexo_Tecnico.pdf",
                tipo: "pdf",
                principal: false,
                url: "#"
            }
        ],
        acoes: {
            downloads: ["carta", "ciencia", "ciencia-termo", "termo"],
            podeAlterarPrazo: true,
            podeEfetivarManifestacao: true,
            podeCancelar: true,
            podeDesfazerCiencia: true,
            podeDesfazerManifestacao: true,
            outrasAcoes: []
        },
        devolvida: false,
        cancelada: false
    },
    {
        id: 2,
        numero: "00004",
        dataEmissao: "2025-12-18T10:20:00",
        destinatario: {
            nome: "Maria Oliveira Costa",
            tipo: "pessoa",
            documento: "987.654.321-00",
            tipoDocumento: "CPF"
        },
        tipo: "comunicado",
        natureza: {
            codigo: "email",
            nome: "E-mail",
            icone: "fas fa-at"
        },
        status: {
            ciencia: {
                efetivada: true,
                tipo: "efetivada-abertura",
                texto: "Efetivada por Abertura",
                dataCientificacao: "2025-12-18"
            },
            manifestacao: {
                efetivada: false,
                pendente: false,
                dataManifestacao: null
            }
        },
        prazos: {
            prazoManifestacao: null,
            dataFinalManifestacao: null
        },
        alertas: [],
        documentos: [
            {
                nome: "Comunicado_Administrativo.pdf",
                tipo: "pdf",
                principal: true,
                url: "#"
            }
        ],
        acoes: {
            downloads: ["ciencia", "ciencia-termo", "termo"],
            podeAlterarPrazo: false,
            podeEfetivarManifestacao: false,
            podeCancelar: true,
            podeDesfazerCiencia: true,
            podeDesfazerManifestacao: false,
            outrasAcoes: ["copiarEmail"]
        },
        devolvida: false,
        cancelada: false
    },
    {
        id: 3,
        numero: "00003",
        dataEmissao: "2025-12-15T16:45:00",
        destinatario: {
            nome: "Empresa XYZ Ltda",
            tipo: "empresa",
            documento: "12.345.678/0001-90",
            tipoDocumento: "CNPJ"
        },
        tipo: "intimacao",
        natureza: {
            codigo: "edital",
            nome: "Edital",
            icone: "fas fa-newspaper"
        },
        status: {
            ciencia: {
                efetivada: true,
                tipo: "efetivada-decurso",
                texto: "Efetivada por Decurso",
                dataCientificacao: "2025-12-10"
            },
            manifestacao: {
                efetivada: true,
                pendente: false,
                dataManifestacao: "2025-12-20"
            }
        },
        prazos: {
            prazoManifestacao: 15,
            dataFinalManifestacao: "2025-12-25"
        },
        alertas: [],
        documentos: [
            {
                nome: "Intimacao_Fiscal.pdf",
                tipo: "pdf",
                principal: true,
                url: "#"
            },
            {
                nome: "Relatorio_Auditoria.pdf",
                tipo: "pdf",
                principal: false,
                url: "#"
            },
            {
                nome: "Planilha_Calculos.pdf",
                tipo: "pdf",
                principal: false,
                url: "#"
            }
        ],
        acoes: {
            downloads: ["ciencia", "ciencia-termo", "edital", "termo"],
            podeAlterarPrazo: true,
            podeEfetivarManifestacao: false,
            podeCancelar: true,
            podeDesfazerCiencia: true,
            podeDesfazerManifestacao: true,
            outrasAcoes: []
        },
        devolvida: false,
        cancelada: false
    },
    {
        id: 4,
        numero: "00002",
        dataEmissao: "2025-12-12T09:15:00",
        destinatario: {
            nome: "Carlos Alberto Pereira",
            tipo: "pessoa",
            documento: "456.789.123-00",
            tipoDocumento: "CPF"
        },
        tipo: "comunicado",
        natureza: {
            codigo: "pessoal-interno",
            nome: "Pessoal - Usuário Interno",
            icone: "fas fa-user-circle"
        },
        status: {
            ciencia: {
                efetivada: false,
                tipo: "nao-efetivada",
                texto: "Não Efetivada",
                dataCientificacao: null
            },
            manifestacao: {
                efetivada: false,
                pendente: false,
                dataManifestacao: null
            }
        },
        prazos: {
            prazoManifestacao: null,
            dataFinalManifestacao: null
        },
        alertas: [],
        documentos: [
            {
                nome: "Aviso_Interno.pdf",
                tipo: "pdf",
                principal: true,
                url: "#"
            }
        ],
        acoes: {
            downloads: ["ciencia", "ciencia-termo", "termo"],
            podeAlterarPrazo: false,
            podeEfetivarManifestacao: false,
            podeCancelar: false,
            podeDesfazerCiencia: false,
            podeDesfazerManifestacao: false,
            outrasAcoes: ["reenviarEmail"]
        },
        devolvida: true,
        cancelada: true
    },
    {
        id: 5,
        numero: "00001",
        dataEmissao: "2025-12-10T11:30:00",
        destinatario: {
            nome: "Ana Paula Rodrigues",
            tipo: "pessoa",
            documento: "789.123.456-00",
            tipoDocumento: "CPF"
        },
        tipo: "intimacao",
        natureza: {
            codigo: "dte-rfb",
            nome: "DTE - RFB",
            icone: "fas fa-inbox"
        },
        status: {
            ciencia: {
                efetivada: true,
                tipo: "efetivada-caixa-postal",
                texto: "Efetivada na Caixa Postal",
                dataCientificacao: "2025-12-11"
            },
            manifestacao: {
                efetivada: false,
                pendente: true,
                dataManifestacao: null
            }
        },
        prazos: {
            prazoManifestacao: 10,
            dataFinalManifestacao: "2025-12-21"
        },
        alertas: [],
        documentos: [
            {
                nome: "Notificacao_DTE.pdf",
                tipo: "pdf",
                principal: true,
                url: "#"
            }
        ],
        acoes: {
            downloads: ["ciencia", "ciencia-termo", "termo"],
            podeAlterarPrazo: true,
            podeEfetivarManifestacao: true,
            podeCancelar: true,
            podeDesfazerCiencia: true,
            podeDesfazerManifestacao: true,
            outrasAcoes: []
        },
        devolvida: false,
        cancelada: false
    }
];