//Aqui tem umas maquinas do lab, obviamente dps preciso adicionar todas. Mas e so p ter uma ideia
const SEED_MAQUINAS = [
  {
    id: 1,
    nome: "Reator de baixa pressão 1",
    fabricante: "Fabricação própria do laboratório",
    modelo: "--",
    imagem: "img/maquinas/R1.jpeg",
    local: "Lab LIFS",
    disponivel: true
  },

  {
    id: 2,
    nome: "Reator de baixa pressão 2",
    fabricante: "Fabricação própria do laboratório",
    modelo: "--",
    imagem: "img/maquinas/R2.jpg",
    local: "Lab LIFS",
    disponivel: true
  },

  {
    id: 3,
    nome: "Microscópio de força atômica",
    fabricante: "Park Systems",
    modelo: "XE-100",
    imagem: "img/maquinas/afm.jpg",
    local: "Lab LIFS",
    disponivel: true
  },

  {
    id: 4,
    nome: "Espectrômetro UVVIS",
    fabricante: "Perkin Elmer",
    modelo: "ScanLambda 750",
    imagem: "img/maquinas/UVVIS.jpg",
    local: "Lab LIFS",
    disponivel: true
  },

  {
    id: 5,
    nome: "Quatro Pontas Elétricas Linear",
    fabricante: "Fabricação própria do laboratório",
    modelo: "Special 4P",
    imagem: "img/maquinas/quatro_pontas.jpg",
    local: "Lab LIFS",
    disponivel: true
  },

  {
    id: 6,
    nome: " Fonte de Radiofrequeência 13,56 MHz",
    fabricante: "Tokyo High Power",
    modelo: "THP-13.56-1000",
    imagem: "img/maquinas/RF_generator.jpg",
    local: "Lab LIFS",
    disponivel: true
  }
];
//Mudei para add a foto dos membros tb
const SEED_MEMBROS = [
  {
    id: 1,
    nome: "José Roberto Ribeiro Bortoleto",
    tipo: "Docente chefe do grupo",
    situacao: "atual",
    imagem: "img/membros/bortoleto.JPG",
    lattes: "http://lattes.cnpq.br/0104980613925349",
    orcid: "https://orcid.org/0000-0003-4129-7819",
    email: "jose.rr.bortoleto@unesp.br"
  },
  {
    id: 2,
    nome: "Luiz Henrique Corrêa Monteiro",
    tipo: "Aluno de iniciação científica",
    situacao: "atual",
    imagem: "img/membros/rick.jpeg",
    lattes: "http://lattes.cnpq.br/0250660115526685",
    orcid: "https://orcid.org/0009-0005-1095-3221",
    email: "lh.monteiro@unesp.br"
  },
  {
    id: 3,
    nome: "Paulo Silas Oliveira",
    tipo: "Aluno de doutorado",
    situacao: "atual",
    imagem: "img/membros/paulo.jpg",
    lattes: "http://lattes.cnpq.br/8312977684358988",
    orcid: "https://orcid.org/0000-0001-8367-8287",
    email: "paulo.silas@unesp.br"
  },
  {
    id: 4,
    nome: "Raul Ramos",
    tipo: "Aluno de pós-doutorado",
    situacao: "atual",
    imagem: "img/membros/raul.jpg",
    lattes: "http://lattes.cnpq.br/4183764742951944",
    orcid: "https://orcid.org/0000-0002-6949-485X",
    email: "raul.ramos@unesp.br"
  },
  {
    id: 5,
    nome: "Anna Florkowska",
    tipo: "Aluna de intercâmbio",
    situacao: "atual",
    imagem: "img/membros/ania.JPG"
  },
  {
    id: 6,
    nome: "Maja Poleczka",
    tipo: "Aluna de intercâmbio",
    situacao: "atual",
    imagem: "img/membros/none.jpg"
  }
];

function initData() {
  if (!localStorage.getItem('maquinas')) {
    localStorage.setItem('maquinas', JSON.stringify(SEED_MAQUINAS));
  }
  if (!localStorage.getItem('membros')) {
    localStorage.setItem('membros', JSON.stringify(SEED_MEMBROS));
  }

}
initData();

const EMAIL_MEMBROS = {
  "José Roberto Ribeiro Bortoleto": "jose.rr.bortoleto@unesp.br",
  "Paulo Silas Oliveira": "paulo.silas@unesp.br",
  "Luiz Henrique Corrêa Monteiro": "lh.monteiro@unesp.br",
  "Raul Ramos": "raul.ramos@unesp.br"
};