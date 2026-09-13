// Dados iniciais (seed). Na primeira execução, copiamos para o localStorage.
const SEED_TRABALHOS = [
  { id: 1, titulo: "Análise de X via Y", autores: "Silva, J.; Souza, M.", ano: 2025, tipo: "artigo", arquivo: "artigo-2025-silva.pdf" },
  { id: 2, titulo: "Sistema Z aplicado a W", autores: "Souza, M.", ano: 2024, tipo: "congresso", arquivo: "congresso-2024-souza.pdf" }
];

const SEED_MAQUINAS = [
  { id: 1, nome: "Impressora 3D FDM", local: "Sala 12", disponivel: true },
  { id: 2, nome: "Microscópio eletrônico", local: "Sala 08", disponivel: true }
];

const SEED_MEMBROS = [
  { id: 1, nome: "Profa. Dra. Ana Lima", tipo: "docente", lattes: "http://lattes.cnpq.br/exemplo", orcid: "0000-0000-0000-0000" }
];

function initData() {
  if (!localStorage.getItem('trabalhos')) {
    localStorage.setItem('trabalhos', JSON.stringify(SEED_TRABALHOS));
  }
  if (!localStorage.getItem('maquinas')) {
    localStorage.setItem('maquinas', JSON.stringify(SEED_MAQUINAS));
  }
  if (!localStorage.getItem('membros')) {
    localStorage.setItem('membros', JSON.stringify(SEED_MEMBROS));
  }
  if (!localStorage.getItem('agendamentos')) {
    localStorage.setItem('agendamentos', JSON.stringify([]));
  }
}
initData();