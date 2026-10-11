//Código foi revisado e adaptado de uma versão que eu tentei escreve, mas n funcinou,. dai usei o GPT para aplicar as melhorias. Isso implicou em mudanças no repositório.js tbm.
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    if (!form) return;

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const titulo = document.querySelector('#titulo')?.value.trim();
        const autores = document.querySelector('#autores')?.value.trim();
        const ano = document.querySelector('#ano')?.value.trim();
        const tipo = document.querySelector('#tipo')?.value.trim();
        const arquivo = document.querySelector('#arquivo')?.files[0];

        if (!titulo || !autores || !ano || !tipo) {
            alert(t('work.required'));
            return;
        }

        const trabalhos = JSON.parse(localStorage.getItem('trabalhos')) || [];

        const novoTrabalho = {
            id: Date.now(),
            titulo: titulo,
            autores: autores,
            ano: ano,
            tipo: tipo.toLowerCase(),
            arquivo: arquivo ? arquivo.name : ''
        };

        trabalhos.push(novoTrabalho);

        localStorage.setItem('trabalhos', JSON.stringify(trabalhos));

        alert(t('work.success'));

        form.reset();
    });
});

