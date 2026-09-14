// Dados iniciais (seed). Na primeira execucao copiamos para o localStorage (da p ver no nav.)
const SEED_TRABALHOS = [
  { id: 1, titulo: "Annealing térmico em filmes de Nb2O5", autores: "Monteiro, L. H.; Oliveira, P. S.; Bortoleto, J. R.", ano: 2026, tipo: "congresso", arquivo: "congresso-2026-CBrAVIC.pdf" },
  { id: 2, titulo: "Sistema hipims aplicado a plasma", autores: "Monteiro, L. H.; Oliveira, P. S.; Bortoleto, J. R.", ano: 2025, tipo: "congresso", arquivo: "congresso-2025-CIC.pdf" }
];
//Aqui tem umas maquinas do lab, obviamente dps preciso adicionar todas. Mas e so p ter uma ideia
const SEED_MAQUINAS = [
  {
    id: 1,
    nome: "Reator de baixa pressão 1",
    fabricante: "Fabricação própria do laboratório",
    modelo: "--",
    local: "Lab LIFS",
    disponivel: true
  },

  {
    id: 2,
    nome: "Reator de baixa pressão 2",
    fabricante: "Fabricação própria do laboratório",
    modelo: "--",
    local: "Lab LIFS",
    disponivel: true
  },

  {
    id: 3,
    nome: "Microscópio de força atômica",
    fabricante: "Park Systems",
    modelo: "XE-100",
    local: "Lab LIFS",
    disponivel: true
  },

  {
    id: 4,
    nome: "Espectrômetro UVVIS",
    fabricante: "Perkin Elmer",
    modelo: "ScanLambda 750",
    local: "Lab LIFS",
    disponivel: true
  },

  {
    id: 5,
    nome: "Quatro Pontas Elétricas Linear",
    fabricante: "Fabricação própria do laboratório",
    modelo: "Special 4P",
    local: "Lab LIFS",
    disponivel: true
  },

  {
    id: 6,
    nome: " Fonte de Radiofrequeência 13,56 MHz",
    fabricante: "Tokyo High Power",
    modelo: "THP-13.56-1000",
    local: "Lab LIFS",
    disponivel: true
  }
];

const SEED_MEMBROS = [
  { id: 1, nome: "Prof. Dr. José Roberto Ribeiro Bortoleto", tipo: "docente", lattes: " http://lattes.cnpq.br/0104980613925349", orcid: "0000-0003-4129-7819" },
  { id: 2, nome: "Luiz Henrique Corrêa Monteiro", tipo: "aluno de iniciação", lattes: "http://lattes.cnpq.br/0250660115526685", orcid: "0009-0005-1095-3221" },
  { id: 3, nome: "Paulo Silas Oliveira", tipo: "aluno de doutorado", lattes: "http://lattes.cnpq.br/8312977684358988", orcid: "0000-0001-8367-8287" },
  { id: 4, nome: "Raul Ramos", tipo: "doutor auxiliar", lattes: "http://lattes.cnpq.br/4183764742951944", orcid: "0000-0002-6949-485X" },
  { id: 5, nome: "Anna Florkowska", tipo: "aluna de intercâmbio", lattes: "-", orcid: "-" },
  { id: 6, nome: "Maja Poleczka", tipo: "aluna de intercâmbio", lattes: "-", orcid: "-" },

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