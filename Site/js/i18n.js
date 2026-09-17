//lista de palqavras- gerada por GPT
const TRANSLATIONS = {
  pt: {
    "nav.home": "Início",
    "nav.repository": "Repositório",
    "nav.machines": "Máquinas",
    "nav.members": "Membros",
    "nav.login": "Entrar",
    "nav.logout": "Sair",
    "nav.menu": "Menu",
    "nav.closeMenu": "Fechar menu",
    "nav.theme": "Tema",
    "nav.darkTheme": "Ativar tema escuro",
    "nav.lightTheme": "Ativar tema claro",
    "nav.switchEnglish": "Mudar para inglês",
    "nav.switchPortuguese": "Mudar para português",
    "nav.mainNavigation": "Navegação principal",
    "nav.skip": "Ir para o conteúdo principal",

    "sidebar.title": "Acesso rápido",
    "sidebar.home": "Página inicial",
    "sidebar.repository": "Produção científica",
    "sidebar.machines": "Equipamentos",
    "sidebar.members": "Membros e ex-membros",
    "sidebar.worksAwards": "Trabalhos e prêmios",

    "footer.portal": "Portal acadêmico do LIFS.",
    "footer.demo": "Portal acadêmico demonstrativo.",
    "footer.copyright": "Lab LIFS. Portal do grupo de pesquisa.",

    "home.title": "Laboratório de Investigação de Filmes Semicondutores",
    "home.description": "Portal institucional para organizar a produção científica, os equipamentos e os integrantes do LIFS em uma interface acessível, responsiva e fácil de consultar.",
    "home.repository": "Explorar repositório",
    "home.machines": "Consultar equipamentos",
    "home.carousel": "Destaques visuais do laboratório",
    "home.previous": "Slide anterior",
    "home.next": "Próximo slide",
    "home.news": "Notícias recentes",
    "home.research": "Pesquisa, desenvolvimento e caracterização de filmes finos semicondutores para aplicações em tecnologia e ciência.",
    "home.scroll": "Role para conhecer o laboratório",
    "home.newsScientificTitle": "Produção científica organizada em um único portal",
    "home.newsScientificText": "O repositório permite consultar publicações, congressos e registros acadêmicos do laboratório.",
    "home.newsEquipmentTitle": "Acervo de equipamentos",
    "home.newsEquipmentText": "O catálogo apresenta informações básicas dos equipamentos e oferece fluxo de agendamento para membros.",
    "home.labSectionTitle": "Conheça o laboratório",
    "home.researchAreasTitle": "Áreas de pesquisa do LIFS",
    "home.researchAreasText": "O LIFS desenvolve pesquisas relacionadas à produção, caracterização e aplicação de filmes finos semicondutores.",
    "home.researchArea1": "Filmes finos semicondutores",
    "home.researchArea2": "Deposição e processamento de materiais",
    "home.researchArea3": "Caracterização óptica e elétrica",
    "home.researchArea4": "Plasmas e processos de deposição",
    "home.locationTitle": "Localização",
    "home.locationAddress": "Instituto de Ciência e Tecnologia — UNESP Sorocaba",
    "home.videoTitle": "Vídeo do laboratório",
    "home.news1.title": "Produção científica organizada em um único portal",
    "home.news1.text": "O repositório permite consultar publicações, congressos e registros acadêmicos do laboratório.",
    "home.news2.title": "Acervo de equipamentos",
    "home.news2.text": "O catálogo apresenta informações básicas dos equipamentos e oferece fluxo de agendamento para membros.",

    "repository.filters": "Filtros de pesquisa",
    "repository.type": "Tipo",
    "repository.all": "Todos",
    "repository.article": "Artigo",
    "repository.proceedings": "Anais",
    "repository.congress": "Congresso",
    "repository.award": "Prêmio",
    "repository.year": "Ano",
    "repository.registered": "Trabalhos cadastrados",
    "repository.notice": "O protótipo utiliza localStorage. Arquivos PDF selecionados no cadastro têm apenas o nome armazenado; nenhum servidor faz upload neste projeto estático.",
    "repository.authors": "Autores:",
    "repository.record": "Registro disponível no acervo local do protótipo.",
    "repository.empty": "Nenhum trabalho corresponde aos filtros selecionados.",
    "repository.title": "Repositório científico",
    "repository.description": "Consulte registros acadêmicos cadastrados no protótipo e filtre os resultados por tipo ou ano.",

    "machines.title": "Acervo de máquinas e equipamentos",
    "machines.description": "Confira os equipamentos cadastrados e solicite um horário de uso no protótipo.",
    "machines.list": "Lista de máquinas",
    "machines.location": "Local:",
    "machines.available": "Disponível",
    "machines.inUse": "Em uso",
    "machines.schedule": "Agendar",
    "machines.empty": "Nenhum equipamento cadastrado.",
    "machines.scheduleTitle": "Agendar equipamento",
    "machines.name": "Nome",
    "machines.namePlaceholder": "Nome completo",
    "machines.institution": "Instituição",
    "machines.institutionPlaceholder": "Instituição de origem",
    "machines.reason": "Resumo / motivo do agendamento",
    "machines.reasonPlaceholder": "Descreva brevemente o motivo pelo qual deseja utilizar o equipamento.",
    "machines.date": "Data do agendamento",
    "machines.time": "Horário",
    "machines.confirm": "Confirmar agendamento",
    "machines.cancel": "Cancelar",
    "machines.success": "Agendamento realizado com sucesso.",
    "machines.conflict": "Já existe um agendamento para esse equipamento nesse horário.",
    "machines.r1": "Reator de baixa pressão 1",
    "machines.r2": "Reator de baixa pressão 2",
    "machines.afm": "Microscópio de força atômica",
    "machines.uvvis": "Espectrômetro UVVIS",
    "machines.probe": "Quatro Pontas Elétricas Linear",
    "machines.rf": "Fonte de Radiofrequência 13,56 MHz",
    "machines.r1Description": "Sistema de baixa pressão utilizado para a síntese e deposição de filmes finos. O reator utiliza uma bomba mecânica, permitindo atingir pressões da ordem de 10⁻³ Torr. Pode operar com oxigênio e argônio como gases de processo e possui sistema de aquecimento com temperatura de até 300 °C.",
    "machines.r2Description": "Sistema de baixa pressão utilizado para a síntese e deposição de filmes finos. O reator utiliza uma bomba turbomolecular, permitindo atingir pressões da ordem de 10⁻⁵ Torr. Pode operar com oxigênio e argônio como gases de processo, possui sistema de aquecimento com temperatura de até 300 °C e conta com porta-alvo para líquidos, além de permitir o uso de alvos metálicos e óxidos.",
    "machines.afmDescription": "Equipamento utilizado para a caracterização da topografia e da morfologia superficial de amostras em escala nanométrica, permitindo a análise detalhada da superfície dos materiais.",
    "machines.uvvisDescription": "Espectrômetro utilizado para realizar medidas de transmitância e reflectância óptica de materiais e filmes finos. O equipamento permite realizar varreduras na faixa espectral de 190 a 3200 nm.",
    "machines.probeDescription": "Sistema utilizado para a caracterização elétrica de materiais, incluindo medidas de resistência e resistividade. Permite realizar medições de resistência na faixa de aproximadamente 0,1 a 1000 Ω.",
    "machines.rfDescription": "Fonte de radiofrequência utilizada para alimentação e geração de plasma em processos experimentais, incluindo aplicações relacionadas à deposição e ao tratamento de filmes finos.",
    "machines.photo": "Imagem de",

    "machines.lab": "Lab LIFS",
    "machines.labManufactured": "Fabricação própria do laboratório",

    "members.professor": "Docente chefe do grupo",
    "members.undergraduate": "Aluno de iniciação científica",
    "members.phd": "Aluno de doutorado",
    "members.postdoc": "Aluno de pós-doutorado",
    "members.exchange": "Aluno de intercâmbio",

    "members.title": "Membros do laboratório",
    "members.description": "Conheça os integrantes cadastrados no laboratório e acesse seus perfis acadêmicos.",
    "members.list": "Lista de membros",
    "members.photo": "Foto de",
    "members.empty": "Nenhum membro cadastrado.",
    "members.emptyCategory": "Nenhum membro cadastrado nesta categoria.",
    "members.academicInfo": "Informações acadêmicas e profissionais do integrante do laboratório.",
    "members.lattes": "Lattes",
    "members.orcid": "ORCID",

    "login.title": "Login de membro",
    "login.description": "Entre para acessar o cadastro de trabalhos. Esta autenticação é apenas demonstrativa e funciona localmente no navegador.",
    "login.demo": "Conta de demonstração:",
    "login.email": "E-mail institucional",
    "login.password": "Senha",
    "login.invalid": "E-mail ou senha inválidos.",
    "login.enter": "Entrar",

    "work.title": "Adicionar trabalho",
    "work.description": "Cadastre um novo registro no repositório local do protótipo.",
    "work.titleField": "Título do trabalho",
    "work.authors": "Autores",
    "work.year": "Ano",
    "work.type": "Tipo",
    "work.pdf": "Arquivo PDF (opcional)",
    "work.pdfHelp": "Em um site puramente estático, o protótipo armazena apenas o nome do arquivo selecionado.",
    "work.save": "Salvar trabalho",
    "work.back": "Voltar ao repositório",
    "work.success": "Trabalho cadastrado no acervo local com sucesso.",
    "work.required": "Preencha todos os campos obrigatórios.",

    "error.404": "Erro 404",
    "error.title": "Página não encontrada",
    "error.description": "O endereço solicitado não existe neste projeto.",
    "error.back": "Voltar à página inicial"
  },

  en: {
    "nav.home": "Home",
    "nav.repository": "Repository",
    "nav.machines": "Equipment",
    "nav.members": "Members",
    "nav.login": "Sign in",
    "nav.logout": "Sign out",
    "nav.menu": "Menu",
    "nav.closeMenu": "Close menu",
    "nav.theme": "Theme",
    "nav.darkTheme": "Enable dark theme",
    "nav.lightTheme": "Enable light theme",
    "nav.switchEnglish": "Switch to English",
    "nav.switchPortuguese": "Switch to Portuguese",
    "nav.mainNavigation": "Main navigation",
    "nav.skip": "Skip to main content",

    "sidebar.title": "Quick access",
    "sidebar.home": "Home page",
    "sidebar.repository": "Scientific production",
    "sidebar.machines": "Equipment",
    "sidebar.members": "Members and former members",
    "sidebar.worksAwards": "Works and awards",

    "footer.portal": "LIFS academic portal.",
    "footer.demo": "Academic demonstration portal.",
    "footer.copyright": "Lab LIFS. Research group portal.",

    "home.title": "Semiconductor Thin Films Research Laboratory",
    "home.description": "Institutional portal for organizing the scientific production, equipment and members of LIFS in an accessible, responsive and easy-to-use interface.",
    "home.repository": "Explore repository",
    "home.machines": "View equipment",
    "home.carousel": "Laboratory visual highlights",
    "home.previous": "Previous slide",
    "home.next": "Next slide",
    "home.news": "Recent news",
    "home.research": "Research, development and characterization of semiconductor thin films for applications in technology and science.",
    "home.scroll": "Scroll to learn about the laboratory",
    "home.newsScientificTitle": "Scientific production organized in a single portal",
    "home.newsScientificText": "The repository allows users to browse publications, conferences and academic records from the laboratory.",
    "home.newsEquipmentTitle": "Equipment collection",
    "home.newsEquipmentText": "The catalog provides basic information about the equipment and offers a scheduling process for members.",
    "home.labSectionTitle": "Discover the laboratory",
    "home.researchAreasTitle": "LIFS Research Areas",
    "home.researchAreasText": "LIFS conducts research related to the production, characterization and application of semiconductor thin films.",
    "home.researchArea1": "Semiconductor thin films",
    "home.researchArea2": "Material deposition and processing",
    "home.researchArea3": "Optical and electrical characterization",
    "home.researchArea4": "Plasmas and deposition processes",
    "home.locationTitle": "Location",
    "home.locationAddress": "Institute of Science and Technology — UNESP Sorocaba",
    "home.videoTitle": "Laboratory video",
    "home.news1.title": "Scientific production organized in a single portal",
    "home.news1.text": "The repository allows users to consult publications, conferences and academic records from the laboratory.",
    "home.news2.title": "Equipment collection",
    "home.news2.text": "The catalog provides basic equipment information and offers a scheduling system for members.",

    "repository.filters": "Search filters",
    "repository.type": "Type",
    "repository.all": "All",
    "repository.article": "Article",
    "repository.proceedings": "Proceedings",
    "repository.congress": "Conference",
    "repository.award": "Award",
    "repository.year": "Year",
    "repository.registered": "Registered works",
    "repository.notice": "The prototype uses localStorage. PDF files selected during registration only have their file name stored; no server uploads files in this static project.",
    "repository.authors": "Authors:",
    "repository.record": "Record available in the prototype's local collection.",
    "repository.empty": "No work matches the selected filters.",
    "repository.title": "Scientific repository",
    "repository.description": "Browse academic records registered in the prototype and filter the results by type or year.",

    "machines.title": "Equipment collection",
    "machines.description": "Check the registered equipment and request a usage time in the prototype.",
    "machines.list": "Equipment list",
    "machines.location": "Location:",
    "machines.available": "Available",
    "machines.inUse": "In use",
    "machines.schedule": "Schedule",
    "machines.empty": "No equipment registered.",
    "machines.scheduleTitle": "Schedule equipment",
    "machines.name": "Name",
    "machines.namePlaceholder": "Full name",
    "machines.institution": "Institution",
    "machines.institutionPlaceholder": "Institution of origin",
    "machines.reason": "Summary / reason for scheduling",
    "machines.reasonPlaceholder": "Briefly describe why you would like to use the equipment.",
    "machines.date": "Schedule date",
    "machines.time": "Time",
    "machines.confirm": "Confirm schedule",
    "machines.cancel": "Cancel",
    "machines.success": "Schedule completed successfully.",
    "machines.conflict": "There is already a schedule for this equipment at this time.",
    "machines.r1": "Low-pressure reactor 1",
    "machines.r2": "Low-pressure reactor 2",
    "machines.afm": "Atomic force microscope",
    "machines.uvvis": "UV-Vis spectrometer",
    "machines.probe": "Linear four-point probe",
    "machines.rf": "13.56 MHz radio-frequency source",
    "machines.r1Description": "Low-pressure system used for the synthesis and deposition of thin films. The reactor uses a mechanical pump, allowing pressures on the order of 10⁻³ Torr to be reached. It can operate with oxygen and argon as process gases and features a heating system with temperatures of up to 300 °C.",
    "machines.r2Description": "Low-pressure system used for the synthesis and deposition of thin films. The reactor uses a turbomolecular pump, allowing pressures on the order of 10⁻⁵ Torr to be reached. It can operate with oxygen and argon as process gases, features a heating system with temperatures of up to 300 °C, and includes a liquid-target holder, as well as allowing the use of metallic and oxide targets.",
    "machines.afmDescription": "Equipment used for the characterization of the topography and surface morphology of samples at the nanometer scale, enabling detailed analysis of material surfaces.",
    "machines.uvvisDescription": "Spectrometer used to perform optical transmittance and reflectance measurements of materials and thin films. The equipment allows spectral scans over the range from 190 to 3200 nm.",
    "machines.probeDescription": "System used for the electrical characterization of materials, including resistance and resistivity measurements. It allows resistance measurements in the range of approximately 0.1 to 1000 Ω.",
    "machines.rfDescription": "Radio-frequency source used to power and generate plasma in experimental processes, including applications related to thin-film deposition and treatment.",
    "machines.photo": "Image of",

    "machines.lab": "LIFS Laboratory",
    "machines.labManufactured": "Laboratory-built",

    "members.professor": "Group leader",
    "members.undergraduate": "Undergraduate research student",
    "members.phd": "PhD student",
    "members.postdoc": "Postdoctoral researcher",
    "members.exchange": "Exchange student",

    "members.title": "Laboratory members",
    "members.description": "Meet the members registered in the laboratory and access their academic profiles.",
    "members.list": "Members list",
    "members.photo": "Photo of",
    "members.empty": "No members registered.",
    "members.emptyCategory": "No members registered in this category.",
    "members.academicInfo": "Academic and professional information about the laboratory member.",
    "members.lattes": "Lattes",
    "members.orcid": "ORCID",

    "login.title": "Member sign in",
    "login.description": "Sign in to access the work registration page. This authentication is demonstrative and works locally in the browser.",
    "login.demo": "Demo account:",
    "login.email": "Institutional e-mail",
    "login.password": "Password",
    "login.invalid": "Invalid e-mail or password.",
    "login.enter": "Sign in",

    "work.title": "Add work",
    "work.description": "Register a new record in the prototype's local repository.",
    "work.titleField": "Work title",
    "work.authors": "Authors",
    "work.year": "Year",
    "work.type": "Type",
    "work.pdf": "PDF file (optional)",
    "work.pdfHelp": "In a purely static website, the prototype stores only the name of the selected file.",
    "work.save": "Save work",
    "work.back": "Back to repository",
    "work.success": "Work successfully added to the local collection.",
    "work.required": "Please fill in all required fields.",

    "error.404": "Error 404",
    "error.title": "Page not found",
    "error.description": "The requested address does not exist in this project.",
    "error.back": "Back to home page"
  }
};
// Trecho feito por mim e reestruturado pela IA, a ideia é basicamente determinar a opcao de lingua do user. 
function getLanguage() {
  const language = localStorage.getItem("language");

  if (language === "en" || language === "pt") {
    return language;
  }

  return "pt";
}

function t(key) {
  const language = getLanguage();

  return TRANSLATIONS[language]?.[key]
    ?? TRANSLATIONS.pt[key]
    ?? key;
}

function applyTranslations() {
  const language = getLanguage();

  document.documentElement.lang = language === "en" ? "en" : "pt-BR";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;

    if (TRANSLATIONS[language]?.[key]) {
      element.textContent = TRANSLATIONS[language][key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;

    if (TRANSLATIONS[language]?.[key]) {
      element.placeholder = TRANSLATIONS[language][key];
    }
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    const key = element.dataset.i18nAriaLabel;

    if (TRANSLATIONS[language]?.[key]) {
      element.setAttribute(
        "aria-label",
        TRANSLATIONS[language][key]
      );
    }
  });

  document.querySelectorAll("[data-i18n-title]").forEach((element) => {
    const key = element.dataset.i18nTitle;

    if (TRANSLATIONS[language]?.[key]) {
      element.setAttribute(
        "title",
        TRANSLATIONS[language][key]
      );
    }
  });

  const languageButton = document.getElementById("language-toggle");

  if (languageButton) {
    languageButton.textContent = language === "pt" ? "EN" : "PT";
    languageButton.setAttribute(
      "aria-label",
      language === "pt"
        ? t("nav.switchEnglish")
        : t("nav.switchPortuguese")
    );
  }

  document.title = getPageTitle(language);
}

function getPageTitle(language) {
  const page = window.location.pathname.split("/").pop();

  const titles = {
    pt: {
      "index.html": "Lab LIFS | Início",
      "repositorio.html": "Lab LIFS | Repositório",
      "maquinas.html": "Lab LIFS | Máquinas",
      "membros.html": "Lab LIFS | Membros",
      "login.html": "Lab LIFS | Login",
      "adicionar-trabalho.html": "Lab LIFS | Adicionar trabalho",
      "404.html": "Lab LIFS | Página não encontrada"
    },
    en: {
      "index.html": "Lab LIFS | Home",
      "repositorio.html": "Lab LIFS | Repository",
      "maquinas.html": "Lab LIFS | Equipment",
      "membros.html": "Lab LIFS | Members",
      "login.html": "Lab LIFS | Sign in",
      "adicionar-trabalho.html": "Lab LIFS | Add work",
      "404.html": "Lab LIFS | Page not found"
    }
  };

  return titles[language][page] ?? "Lab LIFS";
}

function setLanguage(language) {
  if (language !== "pt" && language !== "en") {
    return;
  }

  const elements = document.querySelectorAll(
    "[data-i18n], [data-i18n-placeholder], [data-i18n-aria-label], [data-i18n-title]"
  );

  elements.forEach((element) => {
    element.classList.add("language-fade");
  });

  setTimeout(() => {
    localStorage.setItem("language", language);
    applyTranslations();

    requestAnimationFrame(() => {
      elements.forEach((element) => {
        element.classList.remove("language-fade");
      });
    });

    document.dispatchEvent(
      new CustomEvent("languagechange", {
        detail: { language }
      })
    );
  }, 250);
}

document.addEventListener("DOMContentLoaded", () => {
  applyTranslations();

  const languageButton = document.getElementById("language-toggle");

  languageButton?.addEventListener("click", () => {
    setLanguage(getLanguage() === "pt" ? "en" : "pt");
  });
});