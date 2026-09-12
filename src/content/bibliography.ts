/**
 * Bibliography — full reference list for the "Acessar Recursos" subpage.
 *
 * Adapted from the practice's internal source-verification vault, not pasted
 * verbatim: internal QA scaffolding (correction logs, per-item confidence
 * flags, cross-references to private notes) is stripped, section commentary
 * is condensed to what a visitor can use, and a small number of entries that
 * are not bibliographic sources (working contacts, unverifiable claims) are
 * left out entirely. Item numbering (1–154) is preserved from the source
 * index even where an entry was dropped, so a gap in the sequence is
 * intentional, not an error.
 *
 * Titles, authors and edition lines are bibliographic data — not translated
 * between languages. Section titles, intros and curatorial notes are.
 */

export type LinkKind =
  | 'livre'
  | 'br'
  | 'editora'
  | 'doi'
  | 'emprestimo'
  | 'site'
  | 'lei'
  | 'dataset'
  | 'preprint';

export interface BiblioLink {
  kind: LinkKind;
  href: string;
}

export interface BiblioItem {
  n: number;
  title: string;
  author: string;
  edition: string;
  links: BiblioLink[];
  note?: { pt: string; en: string };
}

export interface BiblioSection {
  roman: string;
  title: { pt: string; en: string };
  intro?: { pt: string; en: string };
  items: BiblioItem[];
}

export const LINK_LABEL: Record<LinkKind, { pt: string; en: string }> = {
  livre: { pt: 'Acesso livre', en: 'Open access' },
  br: { pt: 'Edição brasileira', en: 'Brazilian edition' },
  editora: { pt: 'Editora', en: 'Publisher' },
  doi: { pt: 'DOI', en: 'DOI' },
  emprestimo: { pt: 'Empréstimo (Internet Archive)', en: 'Loan (Internet Archive)' },
  site: { pt: 'Site oficial', en: 'Official site' },
  lei: { pt: 'Texto da lei', en: 'Full text of the law' },
  dataset: { pt: 'Dataset', en: 'Dataset' },
  preprint: { pt: 'Preprint', en: 'Preprint' },
};

export const BIBLIOGRAPHY: BiblioSection[] = [
  {
    roman: 'I',
    title: { pt: 'Micologia, simbiose e florestas', en: 'Mycology, symbiosis and forests' },
    items: [
      { n: 1, title: 'Entangled Life', author: 'Merlin Sheldrake', edition: 'Random House, 2020 · ed. BR: A trama da vida, Fósforo/Ubu, 2021', links: [
        { kind: 'br', href: 'https://www.fosforoeditora.com.br/produto/a-trama-da-vida-como-os-fungos-constroem-o-mundo-70327' },
        { kind: 'emprestimo', href: 'https://archive.org/details/entangledlifehow0000shel' },
      ]},
      { n: 2, title: 'Mycelium Running', author: 'Paul Stamets', edition: 'Ten Speed Press, 2005 · sem edição brasileira', links: [
        { kind: 'editora', href: 'https://www.penguinrandomhouse.com/books/196974/mycelium-running-by-paul-stamets/' },
        { kind: 'emprestimo', href: 'https://archive.org/details/myceliumrunningh00stam_0' },
      ]},
      { n: 3, title: 'The Mushroom at the End of the World', author: 'Anna Lowenhaupt Tsing', edition: 'Princeton UP, 2015 · ed. BR: O cogumelo no fim do mundo, n-1 edições, 2022', links: [
        { kind: 'br', href: 'https://n-1edicoes.org/publicacoes/o-cogumelo-no-fim-do-mundo/' },
        { kind: 'emprestimo', href: 'https://archive.org/details/mushroomatendofw0000tsin' },
      ]},
      { n: 4, title: 'Finding the Mother Tree', author: 'Suzanne Simard', edition: 'Knopf, 2021 · ed. BR: A árvore-mãe, Zahar, 2022', links: [
        { kind: 'br', href: 'https://www.companhiadasletras.com.br/livro/9786559790708/a-arvore-mae' },
        { kind: 'emprestimo', href: 'https://archive.org/details/findingmothertre0000sima' },
      ]},
      { n: 5, title: 'Das geheime Leben der Bäume', author: 'Peter Wohlleben', edition: 'Ludwig, 2015 · ed. BR: A vida secreta das árvores, Sextante, 2017', links: [
        { kind: 'br', href: 'https://sextante.com.br/products/a-vida-secreta-das-arvores' },
        { kind: 'emprestimo', href: 'https://archive.org/details/hiddenlifeoftree0000wohl_g4u9' },
      ]},
      { n: 6, title: 'Fungi: A Very Short Introduction', author: 'Nicholas P. Money', edition: 'Oxford UP, 2016 · sem edição brasileira', links: [
        { kind: 'editora', href: 'https://global.oup.com/academic/product/fungi-9780199688784' },
        { kind: 'emprestimo', href: 'https://archive.org/details/fungiveryshortin0000mone' },
      ]},
      { n: 7, title: 'Symbiotic Planet', author: 'Lynn Margulis', edition: 'Basic Books, 1998 · ed. BR: Planeta Simbiótico, Dantes, 2022', links: [
        { kind: 'br', href: 'https://dantes.com.br/produto/planeta-simbiotico/' },
        { kind: 'emprestimo', href: 'https://archive.org/details/symbioticplanetn0000marg' },
      ]},
      { n: 8, title: 'Braiding Sweetgrass', author: 'Robin Wall Kimmerer', edition: 'Milkweed, 2013 · ed. BR: A maravilhosa trama das coisas, Intrínseca, 2023', links: [
        { kind: 'br', href: 'https://loja.intrinseca.com.br/a-maravilhosa-trama-das-coisas-sabedoria-indigena-conhecimento-cientifico-e-os-ensinamentos-das-plantas/' },
        { kind: 'emprestimo', href: 'https://archive.org/details/braidingsweetgra0000kimm' },
      ]},
    ],
  },
  {
    roman: 'II',
    title: { pt: 'Pensamento sistêmico e complexidade', en: 'Systems thinking and complexity' },
    items: [
      { n: 9, title: 'Thinking in Systems: A Primer', author: 'Donella H. Meadows', edition: 'Chelsea Green, 2008 · ed. BR: Pensando em sistemas, Sextante, 2022', links: [
        { kind: 'livre', href: 'https://donellameadows.org/archives/leverage-points-places-to-intervene-in-a-system/' },
        { kind: 'br', href: 'https://sextante.com.br/products/pensando-em-sistemas' },
      ], note: { pt: '"Leverage Points", o ensaio-base do capítulo mais citado do livro, está livre no link acima.', en: 'The essay "Leverage Points", the basis for the book’s most-cited chapter, is free at the link above.' }},
      { n: 10, title: 'The Limits to Growth', author: 'Donella H. Meadows, Dennis L. Meadows, Jørgen Randers, William W. Behrens III', edition: 'Universe Books, 1972 · ed. BR: Limites do crescimento, Perspectiva, 1973 (fora de catálogo)', links: [
        { kind: 'livre', href: 'https://collections.dartmouth.edu/content/deliver/inline/meadows/pdf/meadows_ltg-001.pdf' },
      ], note: { pt: 'Digitalização integral autorizada, financiada pelo Donella Meadows Institute, licença CC BY-NC.', en: 'Full authorized digitization, funded by the Donella Meadows Institute, CC BY-NC license.' }},
      { n: 11, title: 'The Systems View of Life', author: 'Fritjof Capra e Pier Luigi Luisi', edition: 'Cambridge UP, 2014 · ed. BR: A visão sistêmica da vida, Cultrix, 2014', links: [
        { kind: 'br', href: 'https://www.grupopensamento.com.br/produto/a-visao-sistemica-da-vida-5383' },
        { kind: 'emprestimo', href: 'https://archive.org/details/systemsviewoflif0000capr' },
      ]},
      { n: 12, title: 'Steps to an Ecology of Mind', author: 'Gregory Bateson', edition: 'Chandler, 1972 · ed. BR: Rumo a uma ecologia da mente, Ubu Editora, 2025', links: [
        { kind: 'br', href: 'https://www.ubueditora.com.br/ecologia-da-mente.html' },
        { kind: 'emprestimo', href: 'https://archive.org/details/stepstoecologyof0000bate_u4t4' },
      ]},
      { n: 13, title: 'El árbol del conocimiento', author: 'Humberto Maturana e Francisco Varela', edition: 'Editorial Universitaria, 1984 · ed. inglesa: The Tree of Knowledge, Shambhala', links: [
        { kind: 'editora', href: 'https://www.shambhala.com/the-tree-of-knowledge.html' },
        { kind: 'emprestimo', href: 'https://archive.org/details/treeofknowledget00matu' },
      ]},
      { n: 14, title: 'Design in Nature', author: 'Adrian Bejan e J. Peder Zane', edition: 'Doubleday, 2012 · sem edição brasileira', links: [
        { kind: 'editora', href: 'https://www.penguinrandomhouse.com/books/211730/design-in-nature-by-adrian-bejan-and-j-peder-zane/' },
        { kind: 'emprestimo', href: 'https://archive.org/details/isbn_9780385534611' },
      ]},
      { n: 15, title: 'Biomimicry', author: 'Janine M. Benyus', edition: 'William Morrow, 1997 · ed. BR: Biomimética, Cultrix, 2003 (esgotada)', links: [
        { kind: 'livre', href: 'https://asknature.org/' },
        { kind: 'emprestimo', href: 'https://archive.org/details/biomimicryinnova0000beny' },
      ], note: { pt: 'AskNature.org, do Biomimicry Institute, é uma base aberta de estratégias biológicas — correlata ao livro, não o texto em si.', en: 'AskNature.org, run by the Biomimicry Institute, is an open database of biological strategies — related to the book, not the text itself.' }},
    ],
  },
  {
    roman: 'III',
    title: { pt: 'Economia, finanças e bens comuns', en: 'Economics, finance and the commons' },
    items: [
      { n: 16, title: 'Doughnut Economics', author: 'Kate Raworth', edition: 'Random House Business, 2017 · ed. BR: Economia Donut, Zahar, 2019', links: [
        { kind: 'livre', href: 'https://doughnuteconomics.org/tools/chapter-one-of-doughnut-economics' },
        { kind: 'br', href: 'https://www.companhiadasletras.com.br/livro/9788537818282/economia-donut' },
      ]},
      { n: 17, title: 'Regenerative Enterprise', author: 'Ethan Roland Soloviev e Gregory Landua', edition: 'v1.0, 2013 · Lulu, 2015 · sem edição brasileira', links: [
        { kind: 'livre', href: 'https://www.regenterprise.com/' },
      ], note: { pt: 'PDF oficial, "pague quanto quiser" — inclusive zero. A ficha desta obra em Recursos atribuía a autoria a "Stephen Johnston"; corrigido aqui.', en: 'Official PDF, "pay what you want" — including zero. This work was previously misattributed on the Resources page to "Stephen Johnston"; corrected here.' }},
      { n: 18, title: 'Sacred Economics', author: 'Charles Eisenstein', edition: 'North Atlantic Books, 2011 · sem edição brasileira', links: [
        { kind: 'livre', href: 'https://sacred-economics.com/wp-content/uploads/2012/01/sacred-economics-book-text.pdf' },
      ]},
      { n: 19, title: 'The Ecology of Commerce', author: 'Paul Hawken', edition: 'HarperBusiness, 1993 · sem edição brasileira', links: [
        { kind: 'editora', href: 'https://www.harperbusiness.com/book/9780062281463/The-Ecology-of-Commerce-Revised-Edition-Paul-Hawken/' },
        { kind: 'emprestimo', href: 'https://archive.org/details/ecologyofcommerc0000hawk' },
      ]},
      { n: 20, title: 'Governing the Commons', author: 'Elinor Ostrom', edition: 'Cambridge UP, 1990 · ed. BR não confirmada', links: [
        { kind: 'editora', href: 'https://www.cambridge.org/core/books/governing-the-commons/7AB7AE11BADA84409C34815CC288CD79' },
        { kind: 'livre', href: 'https://dlc.dlib.indiana.edu/dlc/' },
      ], note: { pt: 'O segundo link é a Digital Library of the Commons — acervo aberto correlato, não o texto do livro.', en: 'The second link is the Digital Library of the Commons — a related open archive, not the book itself.' }},
      { n: 21, title: 'Beyond Growth', author: 'Herman E. Daly', edition: 'Beacon Press, 1996 · sem edição brasileira', links: [
        { kind: 'editora', href: 'https://www.beacon.org/Beyond-Growth-P130.aspx' },
        { kind: 'emprestimo', href: 'https://archive.org/details/beyondgrowth00herm' },
      ]},
      { n: 22, title: 'Small Is Beautiful', author: 'E. F. Schumacher', edition: 'Blond & Briggs, 1973 · ed. BR: O negócio é ser pequeno, Zahar, 1977 (fora de catálogo)', links: [
        { kind: 'livre', href: 'https://centerforneweconomics.org/envision/library/small-is-beautiful-study-guide-50th/' },
        { kind: 'emprestimo', href: 'https://archive.org/details/smallisbeautifu000schu' },
      ]},
      { n: 23, title: 'Drawdown', author: 'Paul Hawken (org.)', edition: 'Penguin, 2017 · ed. BR: Drawdown, Manole, 2018', links: [
        { kind: 'livre', href: 'https://drawdown.org/solutions' },
        { kind: 'br', href: 'https://www.manole.com.br/drawdown/p' },
      ]},
    ],
  },
  {
    roman: 'IV',
    title: { pt: 'Design regenerativo, governança, lugar e narrativa', en: 'Regenerative design, governance, place and narrative' },
    items: [
      { n: 24, title: 'Designing Regenerative Cultures', author: 'Daniel Christian Wahl', edition: 'Triarchy Press, 2016 · ed. BR: Design de Culturas Regenerativas, Bambual, 2019', links: [
        { kind: 'br', href: 'https://bambualeditora.com.br/p/design-de-culturas-regenerativas/' },
        { kind: 'editora', href: 'https://www.triarchypress.net/drc.html' },
      ]},
      { n: 25, title: 'Emergent Strategy', author: 'adrienne maree brown', edition: 'AK Press, 2017 · sem edição brasileira', links: [
        { kind: 'editora', href: 'https://www.akpress.org/emergentstrategy.html' },
        { kind: 'emprestimo', href: 'https://archive.org/details/isbn_9781849352611' },
      ]},
      { n: 26, title: "Permaculture: A Designers' Manual", author: 'Bill Mollison', edition: 'Tagari, 1988 · sem edição brasileira', links: [
        { kind: 'editora', href: 'https://tagaripublications.com/product/permaculture-a-designers-manual/' },
        { kind: 'emprestimo', href: 'https://archive.org/details/permaculturedesi0000moll' },
      ]},
      { n: 27, title: 'A Pattern Language', author: 'Christopher Alexander e outros cinco', edition: 'Oxford UP, 1977 · ed. BR: Uma Linguagem de Padrões, Bookman, 2013', links: [
        { kind: 'livre', href: 'https://www.patternlanguage.com/patterns/patterns.html' },
        { kind: 'emprestimo', href: 'https://archive.org/details/patternlanguage00chri' },
      ], note: { pt: 'A referência de forma direta de Substrate Protocol, no Arquivo de Sonhos.', en: 'The direct reference for the form of Substrate Protocol, in the Archive of Dreams.' }},
      { n: 28, title: 'Seeing Like a State', author: 'James C. Scott', edition: 'Yale UP, 1998 · sem edição brasileira', links: [
        { kind: 'editora', href: 'https://yalebooks.yale.edu/book/9780300078152/seeing-like-a-state/' },
        { kind: 'emprestimo', href: 'https://archive.org/details/seeinglikestateh00scot_0' },
      ]},
      { n: 29, title: 'Staying with the Trouble', author: 'Donna J. Haraway', edition: 'Duke UP, 2016 · ed. BR: Ficar com o problema, n-1 edições, 2023', links: [
        { kind: 'br', href: 'https://n-1edicoes.org/publicacoes/ficar-com-o-problema-fazer-parentes-no-chthluceno/' },
        { kind: 'emprestimo', href: 'https://archive.org/details/stayingwithtroub0000hara' },
      ]},
      { n: 30, title: 'The Carrier Bag Theory of Fiction', author: 'Ursula K. Le Guin', edition: 'ensaio, 1988 · edição avulsa Ignota Books, 2019 · sem edição brasileira (ed. portuguesa: A ficção como cesta, Dois Dias, 2022)', links: [
        { kind: 'editora', href: 'https://ignota.org/products/the-carrier-bag-theory-of-fiction' },
      ]},
      { n: 31, title: 'Ideias para adiar o fim do mundo', author: 'Ailton Krenak', edition: 'Companhia das Letras, 2019', links: [
        { kind: 'livre', href: 'https://www.companhiadasletras.com.br/trechos/14722.pdf' },
        { kind: 'br', href: 'https://www.companhiadasletras.com.br/livro/9788535933581/ideias-para-adiar-o-fim-do-mundo-nova-edicao' },
      ]},
      { n: 32, title: 'La Chute du ciel', author: 'Davi Kopenawa e Bruce Albert', edition: 'Plon, 2010 · ed. BR: A queda do céu, Companhia das Letras, 2015', links: [
        { kind: 'livre', href: 'https://www.companhiadasletras.com.br/trechos/12959.pdf' },
        { kind: 'br', href: 'https://www.companhiadasletras.com.br/livro/9788535926200/a-queda-do-ceu' },
      ]},
    ],
  },
  {
    roman: 'V',
    title: { pt: 'Artigos científicos — o lastro das afirmações sobre fungos', en: 'Scientific articles — the evidence behind the claims about fungi' },
    intro: {
      pt: 'Sem estes, o portal afirma sem sustentar. Nos itens 47 a 54, apenas os metadados foram conferidos em fonte externa — o texto integral não foi lido; nenhuma tese desses oito deve ser parafraseada sem leitura direta.',
      en: 'Without these, the site would be asserting without backing. For items 47 through 54, only the metadata was checked against an external source — the full text was not read; none of these eight should be paraphrased without direct reading.',
    },
    items: [
      { n: 33, title: 'Four hundred-million-year-old vesicular arbuscular mycorrhizae', author: 'Remy, Taylor, Hass & Kerp (1994)', edition: 'PNAS 91(25):11841–11843', links: [
        { kind: 'doi', href: 'https://doi.org/10.1073/pnas.91.25.11841' },
        { kind: 'livre', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC45331/' },
      ]},
      { n: 34, title: 'Glomalean fungi from the Ordovician', author: 'Redecker, Kodner & Graham (2000)', edition: 'Science 289(5486):1920–1921', links: [
        { kind: 'doi', href: 'https://doi.org/10.1126/science.289.5486.1920' },
      ]},
      { n: 35, title: 'Evolutionary history of mycorrhizal symbioses and global host plant diversity', author: 'Brundrett & Tedersoo (2018)', edition: 'New Phytologist 220(4):1108–1115', links: [
        { kind: 'doi', href: 'https://doi.org/10.1111/nph.14976' },
      ]},
      { n: 36, title: 'Early fungi from the Proterozoic era in Arctic Canada', author: 'Loron et al. (2019)', edition: 'Nature 570:232–235', links: [
        { kind: 'doi', href: 'https://doi.org/10.1038/s41586-019-1217-0' },
        { kind: 'livre', href: 'https://insu.hal.science/insu-03586648' },
      ]},
      { n: 37, title: 'Net transfer of carbon between ectomycorrhizal tree species in the field', author: 'Simard et al. (1997)', edition: 'Nature 388:579–582', links: [
        { kind: 'doi', href: 'https://doi.org/10.1038/41557' },
      ]},
      { n: 38, title: 'Ploughing up the wood-wide web?', author: 'Helgason et al. (1998)', edition: 'Nature 394(6692):431', links: [
        { kind: 'doi', href: 'https://doi.org/10.1038/28764' },
      ], note: { pt: 'Primeiro uso do termo "wood-wide web" na literatura científica.', en: 'The first use of the term "wood-wide web" in the scientific literature.' }},
      { n: 39, title: 'Positive citation bias and overinterpreted results lead to misinformation on common mycorrhizal networks in forests', author: 'Karst, Jones & Hoeksema (2023)', edition: 'Nature Ecology & Evolution 7:501–511', links: [
        { kind: 'doi', href: 'https://doi.org/10.1038/s41559-023-01986-1' },
        { kind: 'livre', href: 'https://olemiss.edu/hoeksemalab/docs/Karst%20et%20al.%202023.%20Positive%20citation%20bias%20and%20overinterpreted%20results%20lead%20to%20misinformation%20on%20common%20mycorrhizal%20networks%20in%20forests-1.pdf' },
      ], note: { pt: 'A crítica que fundamenta a postura editorial deste site sobre redes micorrízicas: nenhuma das três alegações mais repetidas — ubiquidade, transferência de recursos que beneficia mudas, favorecimento da própria progênie — se sustenta na evidência revisada por pares.', en: 'The critique behind this site’s editorial stance on mycorrhizal networks: none of the three most repeated claims — ubiquity, resource transfer that benefits seedlings, favoring one’s own offspring — holds up to peer-reviewed evidence.' }},
      { n: 40, title: 'Mycorrhizal mycelium as a global carbon pool', author: 'Hawkins et al. (2023)', edition: 'Current Biology 33(11):R560–R573', links: [
        { kind: 'doi', href: 'https://doi.org/10.1016/j.cub.2023.02.027' },
        { kind: 'livre', href: 'https://eprints.whiterose.ac.uk/199952/1/Hawkins%20et%20al%202023.pdf' },
      ]},
      { n: 41, title: 'Rules for Biologically Inspired Adaptive Network Design', author: 'Tero et al. (2010)', edition: 'Science 327(5964):439–442', links: [
        { kind: 'doi', href: 'https://doi.org/10.1126/science.1177894' },
        { kind: 'livre', href: 'https://markfricker.org/wp-content/uploads/2015/12/tero_et_al-2010-science-327-439.pdf' },
      ], note: { pt: 'O experimento do Physarum polycephalum e a malha ferroviária de Tóquio.', en: 'The Physarum polycephalum experiment and the Tokyo rail network.' }},
      { n: 42, title: 'Language of fungi derived from their electrical spiking activity', author: 'Adamatzky (2022)', edition: 'Royal Society Open Science 9(4):211926', links: [
        { kind: 'doi', href: 'https://doi.org/10.1098/rsos.211926' },
        { kind: 'livre', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8984380/' },
      ]},
      { n: 43, title: 'Does electrical activity in fungi function as a language?', author: 'Blatt, Pullum, Draguhn, Bowman, Robinson & Taiz (2024)', edition: 'Fungal Ecology 68:101326', links: [
        { kind: 'doi', href: 'https://doi.org/10.1016/j.funeco.2023.101326' },
      ], note: { pt: 'Refutação formal da alegação de "linguagem" fúngica do item anterior.', en: 'A formal refutation of the fungal "language" claim in the previous item.' }},
      { n: 44, title: 'Recent technological innovations in mycelium materials as leather substitutes: a patent review', author: 'Elsacker, Vandelook & Peeters (2023)', edition: 'Frontiers in Bioengineering and Biotechnology 11:1204861', links: [
        { kind: 'doi', href: 'https://doi.org/10.3389/fbioe.2023.1204861' },
        { kind: 'livre', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10441217/' },
      ]},
      { n: 45, title: 'Ant system: optimization by a colony of cooperating agents', author: 'Dorigo, Maniezzo & Colorni (1996)', edition: 'IEEE Trans. SMC-B 26(1):29–41', links: [
        { kind: 'doi', href: 'https://doi.org/10.1109/3477.484436' },
      ]},
      { n: 46, title: 'FUNNet: a novel biologically-inspired routing algorithm based on fungi', author: 'Hao, Falconer, Bradley & Crawford (2009)', edition: 'CTRQ 2009, pp. 97–102', links: [
        { kind: 'doi', href: 'https://doi.org/10.1109/CTRQ.2009.23' },
      ]},
      { n: 47, title: 'Reciprocal Rewards Stabilize Cooperation in the Mycorrhizal Symbiosis', author: 'Kiers et al. (2011)', edition: 'Science 333(6044):880–882', links: [
        { kind: 'doi', href: 'https://doi.org/10.1126/science.1208473' },
      ]},
      { n: 48, title: 'A biological market analysis of the plant–mycorrhizal symbiosis', author: 'Wyatt, Kiers, Gardner & West (2014)', edition: 'Evolution 68(9):2603–2618', links: [
        { kind: 'doi', href: 'https://doi.org/10.1111/evo.12466' },
      ]},
      { n: 49, title: 'Mycorrhizal Networks: Common Goods of Plants Shared under Unequal Terms of Trade', author: 'Walder, Niemann, Natarajan, Lehmann, Boller & Wiemken (2012)', edition: 'Plant Physiology 159(2):789–797', links: [
        { kind: 'doi', href: 'https://doi.org/10.1104/pp.112.195727' },
        { kind: 'livre', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3375941/' },
      ]},
      { n: 50, title: 'Regulation of resource exchange in the arbuscular mycorrhizal symbiosis', author: 'Walder & van der Heijden (2015)', edition: 'Nature Plants 1(11):15159', links: [
        { kind: 'doi', href: 'https://doi.org/10.1038/nplants.2015.159' },
      ]},
      { n: 51, title: 'Cheating in arbuscular mycorrhizal mutualism: a network and phylogenetic analysis of mycoheterotrophy', author: 'Perez-Lamarque, Selosse, Öpik, Morlon & Martos (2020)', edition: 'New Phytologist 226(6):1822–1835', links: [
        { kind: 'doi', href: 'https://doi.org/10.1111/nph.16474' },
        { kind: 'livre', href: 'https://www.phyloeco.bio.ens.psl.eu/pdf/PerezLamarqueetal2020NewPhyto.pdf' },
      ]},
      { n: 52, title: 'Functioning of mycorrhizal associations along the mutualism–parasitism continuum', author: 'Johnson, Graham & Smith (1997)', edition: 'New Phytologist 135(4):575–585', links: [
        { kind: 'doi', href: 'https://doi.org/10.1046/j.1469-8137.1997.00729.x' },
      ]},
      { n: 53, title: 'The Costs and Benefits of Plant–Arbuscular Mycorrhizal Fungal Interactions', author: 'Bennett & Groten (2022)', edition: 'Annual Review of Plant Biology 73:649–672', links: [
        { kind: 'doi', href: 'https://doi.org/10.1146/annurev-arplant-102820-124504' },
        { kind: 'livre', href: 'https://par.nsf.gov/servlets/purl/10342243' },
      ]},
      { n: 54, title: 'What determines transfer of carbon from plants to mycorrhizal fungi?', author: 'Bunn, Corrêa, Joshi, Kaiser, Lekberg, Prescott, Sala & Karst (2024)', edition: 'New Phytologist 244(4):1199–1215', links: [
        { kind: 'doi', href: 'https://doi.org/10.1111/nph.20145' },
        { kind: 'livre', href: 'https://onlinelibrary.wiley.com/doi/pdfdirect/10.1111/nph.20145' },
      ], note: { pt: 'Justine Karst, autora principal do item 39, assina também esta crítica à moldura de mercado de carbono.', en: 'Justine Karst, lead author of item 39, also co-authors this critique of the carbon-market framing.' }},
    ],
  },
  {
    roman: 'VI',
    title: { pt: 'ReFi, protocolos regenerativos e localismo digital', en: 'ReFi, regenerative protocols and digital localism' },
    items: [
      { n: 55, title: 'Exploring MycoFi: Mycelial Design Patterns for Web3 and Beyond', author: 'Jeff Emmett e Jessica Zartler', edition: 'Green Pill Network, 2023/2024', links: [
        { kind: 'livre', href: 'https://greenpill.network/pdf/mycofi.pdf' },
        { kind: 'site', href: 'https://book.mycofi.earth/' },
      ], note: { pt: 'A obra publicada mais próxima da tese deste site: padrões de design miceliais aplicados a economia e governança digital, escritos por praticantes, em acesso livre. Referência direta de Substrate Protocol e Bioregional Capital Framework, no Arquivo de Sonhos.', en: 'The closest published work to this site’s thesis: mycelial design patterns applied to digital economy and governance, written by practitioners, freely available. A direct reference for Substrate Protocol and Bioregional Capital Framework, in the Archive of Dreams.' }},
      { n: 56, title: 'GreenPilled: How Crypto Can Regenerate The World', author: 'Kevin Owocki', edition: 'autopublicado, 2022', links: [
        { kind: 'livre', href: 'https://greenpill.network/pdf/green-pill.pdf' },
      ]},
      { n: 57, title: 'Greenpill Network', author: 'rede de capítulos locais', edition: 'desde 2022', links: [
        { kind: 'site', href: 'https://greenpill.network/' },
        { kind: 'livre', href: 'https://greenpill.network/library' },
      ], note: { pt: 'Tem capítulo no Brasil — Greenpill Rio de Janeiro.', en: 'Has a chapter in Brazil — Greenpill Rio de Janeiro.' }},
      { n: 58, title: 'Ethereum Localism: Grounding the Future of Coordination', author: 'The Open Machine e colaboradores', edition: '2025', links: [
        { kind: 'livre', href: 'https://greenpill.network/pdf/ethereum-localism.pdf' },
        { kind: 'site', href: 'https://www.ethereumlocalism.xyz/' },
      ]},
      { n: 59, title: 'Regen Network', author: 'Landua, Shearer, Deriemaeker, Craelius, Szal', edition: 'protocolo e registro de créditos ecológicos, concebido em 2017', links: [
        { kind: 'site', href: 'https://www.regen.network/' },
        { kind: 'livre', href: 'https://regen-network.gitlab.io/whitepaper/WhitePaper.pdf' },
      ], note: { pt: 'Cofundado por Gregory Landua, coautor do item 17. Tem um protocolo específico para espécies-guarda-chuva no Brasil.', en: 'Co-founded by Gregory Landua, co-author of item 17. Has a protocol specifically for umbrella species in Brazil.' }},
      { n: 60, title: 'ReFi — Regenerative Finance (o campo)', author: 'conceito de John Fullerton, Capital Institute', edition: '2015 →', links: [
        { kind: 'livre', href: 'https://ethereum.org/refi/' },
        { kind: 'livre', href: 'https://capitalinstitute.org/finance-for-a-regenerative-economy/' },
      ]},
      { n: 61, title: 'ReFi DAO', author: 'rede de Local Nodes', edition: '—', links: [
        { kind: 'site', href: 'https://www.refidao.com/' },
      ]},
      { n: 62, title: "An evaluation of the regenerative claims of Web3's ReFi movement", author: 'Bennett (2025)', edition: 'Frontiers in Blockchain 8', links: [
        { kind: 'doi', href: 'https://doi.org/10.3389/fbloc.2025.1564083' },
        { kind: 'livre', href: 'https://www.frontiersin.org/journals/blockchain/articles/10.3389/fbloc.2025.1564083/full' },
      ], note: { pt: 'O equivalente, no campo ReFi, ao trabalho de crítica científica do item 39.', en: 'The ReFi-field equivalent of the scientific critique in item 39.' }},
      { n: 63, title: 'Blockchain and regenerative finance: charting a path toward regeneration', author: 'Schletz, Constant et al. (2023)', edition: 'Frontiers in Blockchain', links: [
        { kind: 'doi', href: 'https://doi.org/10.3389/fbloc.2023.1165133' },
        { kind: 'livre', href: 'https://doaj.org/article/e3c9583c0581423a8ccb386b8a260deb' },
      ]},
      { n: 64, title: 'Tokenized Carbon Credits', author: 'Sorensen (2023)', edition: 'Ledger 8', links: [
        { kind: 'doi', href: 'https://doi.org/10.5195/LEDGER.2023.294' },
        { kind: 'livre', href: 'https://ledger.pitt.edu/ojs/ledger/article/view/294' },
      ]},
      { n: 65, title: 'Tokenized carbon credits in voluntary carbon markets: the case of KlimaDAO', author: 'Ballesteros-Rodríguez, De-Lucio & Sicilia (2024)', edition: 'Frontiers in Blockchain', links: [
        { kind: 'doi', href: 'https://doi.org/10.3389/fbloc.2024.1474540' },
        { kind: 'livre', href: 'https://www.frontiersin.org/journals/blockchain/articles/10.3389/fbloc.2024.1474540/full' },
      ]},
      { n: 66, title: 'Zombies on the blockchain', author: 'CarbonPlan', edition: 'análise técnica independente, 2021', links: [
        { kind: 'livre', href: 'https://carbonplan.org/research/toucan-crypto-offsets' },
      ], note: { pt: 'O caso concreto mais importante do campo — e é um fracasso. Em maio de 2022 a Verra proibiu a tokenização de créditos de carbono aposentados, em resposta direta a esta análise.', en: 'The single most important case study in the field — and it is a failure. In May 2022 Verra banned tokenizing retired carbon credits, in direct response to this analysis.' }},
      { n: 67, title: 'Corpus sobre o ecossistema ReFi brasileiro e latino-americano', author: 'Marcelo de Almeida Silva', edition: 'textos de campo, sem revisão por pares', links: [
        { kind: 'site', href: 'https://marcelorefi.github.io/' },
      ], note: { pt: 'Literatura de campo e mapeamento de ecossistema, não produção acadêmica revisada por pares sobre ReFi.', en: 'Field literature and ecosystem mapping, not peer-reviewed academic output on ReFi.' }},
    ],
  },
  {
    roman: 'VII',
    title: { pt: 'Cosmolocalismo e comuns em rede', en: 'Cosmolocalism and networked commons' },
    intro: {
      pt: 'Não existe literatura acadêmica revisada por pares sobre cosmolocalismo no Brasil ou em português — uma contribuição nesta língua, ancorada em bacia hidrográfica, seria original no campo.',
      en: 'There is no peer-reviewed academic literature on cosmolocalism in Brazil or in Portuguese — a contribution in this language, anchored in a watershed, would be original in the field.',
    },
    items: [
      { n: 69, title: 'Cosmo-Localization and Leadership for the Future', author: 'Ramos (2017)', edition: 'Journal of Futures Studies 21(4):65–84', links: [
        { kind: 'doi', href: 'https://doi.org/10.6531/JFS.2017.21(4).A65' },
        { kind: 'livre', href: 'https://jfsdigital.org/wp-content/uploads/2017/07/J5.pdf' },
      ]},
      { n: 70, title: 'Design global, manufacture local', author: 'Kostakis, Niaros, Dafermos & Bauwens (2015)', edition: 'Futures 73:126–135', links: [
        { kind: 'doi', href: 'https://doi.org/10.1016/j.futures.2015.09.001' },
        { kind: 'livre', href: 'https://zenodo.org/records/996189' },
      ]},
      { n: 71, title: 'Towards a political ecology of the digital economy', author: 'Kostakis, Roos & Bauwens (2016)', edition: 'Environmental Innovation and Societal Transitions 18:82–100', links: [
        { kind: 'doi', href: 'https://doi.org/10.1016/j.eist.2015.08.002' },
      ]},
      { n: 72, title: 'The convergence of digital commons with local manufacturing from a degrowth perspective', author: 'Kostakis, Latoufis, Liarokapis & Bauwens (2018)', edition: 'Journal of Cleaner Production 197:1684–1693', links: [
        { kind: 'doi', href: 'https://doi.org/10.1016/j.jclepro.2016.09.077' },
      ]},
      { n: 73, title: 'Beyond global versus local: illuminating a cosmolocal framework for convivial technology development', author: 'Kostakis, Niaros & Giotitsas (2023)', edition: 'Sustainability Science 18(5):2309–2322', links: [
        { kind: 'doi', href: 'https://doi.org/10.1007/s11625-023-01378-1' },
      ]},
      { n: 74, title: 'Cosmolocalism: Understanding the Transitional Dynamics towards Post-Capitalism', author: 'Schismenos, Niaros & Lemos (2020)', edition: 'tripleC 18(2):670–684', links: [
        { kind: 'doi', href: 'https://doi.org/10.31269/triplec.v18i2.1188' },
        { kind: 'livre', href: 'https://www.triple-c.at/index.php/tripleC/article/view/1188/1384' },
      ], note: { pt: 'A revisão genealógica mais próxima do conceito que existe publicada.', en: 'The closest genealogical review of the concept that has been published.' }},
      { n: 75, title: 'Another Scalability is Possible! From Non-Scalability to Cosmolocal Scalability', author: 'Kostakis, Lemos & Kouvara (2024)', edition: 'tripleC 22(2):620–629', links: [
        { kind: 'doi', href: 'https://doi.org/10.31269/triplec.v22i2.1535' },
      ]},
      { n: 76, title: 'Peer to Peer: The Commons Manifesto', author: 'Michel Bauwens, Vasilis Kostakis e Alex Pazaitis', edition: 'University of Westminster Press, 2019', links: [
        { kind: 'livre', href: 'https://library.oapen.org/bitstream/id/2e3f561d-b1f5-4e7c-8da3-ccab0f00501d/UWP-033-REVISED.pdf' },
      ]},
      { n: 77, title: 'Cosmo-Local Reader', author: 'José Ramos, Sharon Ede, Michel Bauwens e James Gien Wong (orgs.)', edition: 'P2P Foundation, 2021 · 50 capítulos', links: [
        { kind: 'livre', href: 'https://clreader.net/' },
        { kind: 'livre', href: 'https://archive.org/details/cosmo-local-reader' },
      ], note: { pt: 'Nenhum dos 50 capítulos trata do Brasil.', en: 'None of the 50 chapters deals with Brazil.' }},
      { n: 78, title: 'P2P Foundation', author: 'organização, Países Baixos', edition: 'acervo sob CC BY-SA 4.0', links: [
        { kind: 'site', href: 'https://p2pfoundation.net/' },
        { kind: 'livre', href: 'https://wiki.p2pfoundation.net/' },
      ]},
    ],
  },
  {
    roman: 'VIII',
    title: { pt: 'Pensamento brasileiro, indígena e quilombola', en: 'Brazilian, Indigenous and Quilombola thought' },
    items: [
      { n: 79, title: 'A vida não é útil', author: 'Ailton Krenak', edition: 'Companhia das Letras, 2020', links: [
        { kind: 'livre', href: 'https://img.travessa.com.br/capitulo/COMPANHIA_DAS_LETRAS/VIDA_NAO_E_UTIL_A-9788535933697.pdf' },
        { kind: 'br', href: 'https://www.companhiadasletras.com.br/livro/9788535933697/a-vida-nao-e-util' },
      ]},
      { n: 80, title: 'O amanhã não está à venda', author: 'Ailton Krenak', edition: 'Companhia das Letras, 2020', links: [
        { kind: 'livre', href: 'https://saudeindigena.fiocruz.br/items/dc8ab5bd-c2bf-4414-8082-104104134e21' },
      ]},
      { n: 81, title: 'Futuro ancestral', author: 'Ailton Krenak', edition: 'Companhia das Letras, 2022', links: [
        { kind: 'br', href: 'https://www.companhiadasletras.com.br/livro/9786559211548/futuro-ancestral' },
      ]},
      { n: 82, title: 'Colonização, Quilombos: modos e significações', author: 'Antônio Bispo dos Santos', edition: 'INCTI/UnB, 2015', links: [
        { kind: 'livre', href: 'https://archive.org/details/bispo-antonio.-colonizacao-quilombos' },
      ], note: { pt: 'Origem do conceito de contracolonização.', en: 'The origin of the concept of counter-colonization.' }},
      { n: 83, title: 'A terra dá, a terra quer', author: 'Antônio Bispo dos Santos', edition: 'Ubu Editora e PISEAGRAMA, 2023', links: [
        { kind: 'br', href: 'https://piseagrama.org/produto/a-terra-da-a-terra-quer/' },
      ], note: { pt: 'Origem do conceito de confluência.', en: 'The origin of the concept of confluence.' }},
      { n: 84, title: 'Metafísicas canibais', author: 'Eduardo Viveiros de Castro', edition: 'n-1 edições, 2015', links: [
        { kind: 'br', href: 'https://n-1edicoes.org/publicacoes/metafisicas-canibais/' },
      ]},
      { n: 85, title: 'Os pronomes cosmológicos e o perspectivismo ameríndio', author: 'Eduardo Viveiros de Castro', edition: 'Mana 2(2):115–144, 1996', links: [
        { kind: 'doi', href: 'https://doi.org/10.1590/S0104-93131996000200005' },
        { kind: 'livre', href: 'https://www.scielo.br/j/mana/a/F5BtW5NF3KVT4NRnfM93pSs/?lang=pt' },
      ]},
      { n: 86, title: 'O barro, o genipapo e o giz no fazer epistemológico de autoria Xakriabá', author: 'Célia Nunes Corrêa (Célia Xakriabá)', edition: 'dissertação de mestrado, UnB, 2018', links: [
        { kind: 'livre', href: 'https://repositorio.unb.br/handle/10482/34103' },
      ]},
      { n: 87, title: 'Amansar o giz', author: 'Célia Xakriabá', edition: 'PISEAGRAMA n. 14, 2020', links: [
        { kind: 'livre', href: 'https://piseagrama.org/artigos/amansar-o-giz/' },
      ]},
    ],
  },
  {
    roman: 'IX',
    title: { pt: 'Restauração, solo e agroecologia no Brasil', en: 'Restoration, soil and agroecology in Brazil' },
    items: [
      { n: 88, title: 'Restauração Florestal', author: 'Pedro H. S. Brancalion, Ricardo R. Rodrigues e Sergius Gandolfi', edition: 'Oficina de Textos, 2015', links: [
        { kind: 'editora', href: 'https://www.ofitexto.com.br/restauracao-florestal/p' },
      ]},
      { n: 89, title: 'Pacto pela Restauração da Mata Atlântica: referencial dos conceitos e ações de restauração florestal', author: 'R. R. Rodrigues, P. H. S. Brancalion e I. Isernhagen (orgs.)', edition: '2009', links: [
        { kind: 'livre', href: 'https://cms.sosma.org.br/wp-content/uploads/2015/03/referencial-teorico.pdf' },
      ]},
      { n: 90, title: 'Boas práticas para o monitoramento da restauração na Mata Atlântica', author: 'Mater Natura', edition: 'supervisão de Ricardo A. G. Viani', links: [
        { kind: 'livre', href: 'https://pactomataatlantica.org.br/wp-content/uploads/2026/08/Boas-Praticas-Monitoramento-v2.pdf' },
      ]},
      { n: 91, title: 'Manejo ecológico do solo: a agricultura em regiões tropicais', author: 'Ana Maria Primavesi', edition: 'Editora Nobel / Expressão Popular', links: [
        { kind: 'livre', href: 'https://anamariaprimavesi.com.br/livros-para-download/' },
        { kind: 'editora', href: 'https://expressaopopular.com.br/livraria/manejo-ecologico-do-solo-a-agricultura-em-regioes-tropicais/' },
      ]},
      { n: 92, title: 'Agroecologia: bases científicas para uma agricultura sustentável', author: 'Miguel Altieri', edition: 'Expressão Popular e AS-PTA', links: [
        { kind: 'livre', href: 'https://agroecologia.org.br/2012/03/19/agroecologia-bases-cientificas-para-uma-agricultura-sustentavel/' },
      ]},
      { n: 93, title: 'Homem e natureza: cultura na agricultura', author: 'Ernst Götsch', edition: 'Centro Sabiá, Recife, 2ª ed.', links: [
        { kind: 'livre', href: 'https://www.naturefund.de/fileadmin/pdf/Agroforst/1995%20-%20Ernst%20G%C3%B6tsch,%20Homem%20e%20natureza%20Cultura%20na%20Agricultura.pdf' },
      ]},
      { n: 94, title: 'O renascer da agricultura', author: 'Ernst Götsch', edition: 'cartilha, AS-PTA', links: [
        { kind: 'livre', href: 'https://aspta.org.br/2014/09/27/cartilha-o-renascer-da-agricultura/' },
      ]},
      { n: 95, title: 'Syntropic farming systems for reconciling productivity, ecosystem functions, and restoration', author: '—', edition: 'The Lancet Planetary Health, 2025', links: [
        { kind: 'doi', href: 'https://doi.org/10.1016/S2542-5196(25)00047-6' },
      ]},
      { n: 96, title: 'Trees shape the soil microbiome of a temperate agrosilvopastoral and syntropic agroforestry system', author: 'Vaupel, Küsters, Toups, Herwig, Bösel & Beule (2025)', edition: 'Scientific Reports', links: [
        { kind: 'doi', href: 'https://doi.org/10.1038/s41598-025-85556-4' },
      ], note: { pt: 'Sistema temperado (Alemanha), não brasileiro — incluído pelo método sintrópico aplicado.', en: 'A temperate system (Germany), not Brazilian — included for its applied syntropic method.' }},
      { n: 97, title: 'Agro-Successional Restoration as a Strategy to Facilitate Tropical Forest Recovery', author: 'Vieira, Holl & Peneireiro (2009)', edition: 'Restoration Ecology', links: [
        { kind: 'doi', href: 'https://doi.org/10.1111/j.1526-100X.2009.00570.x' },
      ]},
      { n: 98, title: 'Flora e Funga do Brasil', author: 'Instituto de Pesquisas Jardim Botânico do Rio de Janeiro', edition: 'base de dados oficial', links: [
        { kind: 'livre', href: 'https://floradobrasil.jbrj.gov.br/' },
        { kind: 'dataset', href: 'https://ipt.jbrj.gov.br/jbrj/resource?r=lista_especies_flora_brasil' },
      ]},
      { n: 99, title: 'Brazilian Flora 2020: Leveraging the power of a collaborative scientific network', author: 'The Brazil Flora Group (2022)', edition: 'TAXON', links: [
        { kind: 'doi', href: 'https://doi.org/10.1002/tax.12640' },
        { kind: 'livre', href: 'https://hal.science/hal-03550554/' },
      ]},
      { n: 100, title: 'Diversity of Brazilian Fungi', author: 'Maia e colaboradores (2015)', edition: 'Rodriguésia 66:1033–1045', links: [
        { kind: 'doi', href: 'https://doi.org/10.1590/2175-7860201566407' },
        { kind: 'livre', href: 'https://www.scielo.br/j/rod/a/n98JMXKKGvhdCJr3YmCw3mm/?lang=en' },
      ]},
      { n: 101, title: 'Indicator species and community structure of gasteroid fungi (Agaricomycetes, Basidiomycota) in ecosystems of the Atlantic Forest in southern Brazil', author: '—', edition: 'Brazilian Journal of Botany, 2018', links: [
        { kind: 'doi', href: 'https://doi.org/10.1007/s40415-018-0479-3' },
      ]},
    ],
  },
  {
    roman: 'X',
    title: { pt: 'Governança de comuns, resiliência e bacia hidrográfica', en: 'Commons governance, resilience and the watershed' },
    items: [
      { n: 102, title: 'A General Framework for Analyzing Sustainability of Social-Ecological Systems', author: 'Ostrom (2009)', edition: 'Science 325(5939):419–422', links: [
        { kind: 'doi', href: 'https://doi.org/10.1126/science.1172133' },
        { kind: 'livre', href: 'https://hdl.handle.net/11059/14638' },
      ]},
      { n: 103, title: 'Beyond Markets and States: Polycentric Governance of Complex Economic Systems', author: 'Ostrom (2010)', edition: 'American Economic Review 100(3):641–672', links: [
        { kind: 'doi', href: 'https://doi.org/10.1257/aer.100.3.641' },
      ]},
      { n: 104, title: 'Revisiting the Commons: Local Lessons, Global Challenges', author: 'Ostrom, Burger, Field, Norgaard & Policansky (1999)', edition: 'Science 284(5412):278–282', links: [
        { kind: 'doi', href: 'https://doi.org/10.1126/science.284.5412.278' },
      ]},
      { n: 105, title: 'Polycentric systems for coping with collective action and global environmental change', author: 'Ostrom (2010)', edition: 'Global Environmental Change 20(4):550–557', links: [
        { kind: 'doi', href: 'https://doi.org/10.1016/j.gloenvcha.2010.07.004' },
      ]},
      { n: 106, title: 'Resilience and Stability of Ecological Systems', author: 'C. S. Holling (1973)', edition: 'Annual Review of Ecology and Systematics 4:1–23', links: [
        { kind: 'doi', href: 'https://doi.org/10.1146/annurev.es.04.110173.000245' },
      ]},
      { n: 107, title: 'Resilience, Adaptability and Transformability in Social-ecological Systems', author: 'Walker, Holling, Carpenter e Kinzig (2004)', edition: 'Ecology and Society 9(2):5', links: [
        { kind: 'doi', href: 'https://doi.org/10.5751/ES-00650-090205' },
        { kind: 'livre', href: 'https://www.ecologyandsociety.org/vol9/iss2/art5/' },
      ]},
      { n: 108, title: 'Resilience: The emergence of a perspective for social–ecological systems analyses', author: 'Carl Folke (2006)', edition: 'Global Environmental Change 16(3):253–267', links: [
        { kind: 'doi', href: 'https://doi.org/10.1016/j.gloenvcha.2006.04.002' },
      ]},
      { n: 109, title: 'Navigating Social-Ecological Systems: Building Resilience for Complexity and Change', author: 'Berkes, Colding e Folke (orgs.)', edition: 'Cambridge University Press', links: [
        { kind: 'doi', href: 'https://doi.org/10.1017/CBO9780511541957' },
      ]},
      { n: 110, title: 'What if… the United States of America were based on watersheds?', author: 'G. Kauffman (2002)', edition: 'Water Policy 4(1):57–68', links: [
        { kind: 'doi', href: 'https://doi.org/10.1016/S1366-7017(02)00019-3' },
      ]},
      { n: 111, title: 'Going with the flow: river basins as the natural units for water management?', author: 'Warner, Wester e Bolding (2008)', edition: 'Water Policy 10(S2):121–138', links: [
        { kind: 'doi', href: 'https://doi.org/10.2166/wp.2008.210' },
        { kind: 'livre', href: 'https://iwaponline.com/wp/article-pdf/10/S2/121/406636/121.pdf' },
      ], note: { pt: 'O contraditório necessário: gerir por bacia é escolha política, não fato natural.', en: 'The necessary counterpoint: managing by watershed is a political choice, not a natural fact.' }},
      { n: 112, title: 'River-basin planning and management: The social life of a concept', author: 'F. Molle (2009)', edition: 'Geoforum 40(3):484–494', links: [
        { kind: 'doi', href: 'https://doi.org/10.1016/j.geoforum.2009.03.004' },
      ]},
      { n: 113, title: 'Comitês de Bacia no Brasil: uma abordagem política no estudo da participação social', author: 'Abers e Keck (2004)', edition: 'Revista Brasileira de Estudos Urbanos e Regionais 6(1)', links: [
        { kind: 'doi', href: 'https://doi.org/10.22296/2317-1529.2004v6n1p55' },
        { kind: 'livre', href: 'https://rbeur.anpur.org.br/rbeur/article/download/104/88' },
      ], note: { pt: 'Ver também Abers & Keck (2006), "Muddy Waters: The Political Construction of Deliberative River Basin Governance in Brazil", IJURR 30(3):601–622, DOI 10.1111/j.1468-2427.2006.00691.x.', en: 'See also Abers & Keck (2006), "Muddy Waters: The Political Construction of Deliberative River Basin Governance in Brazil", IJURR 30(3):601–622, DOI 10.1111/j.1468-2427.2006.00691.x.' }},
      { n: 114, title: 'Lei nº 9.433, de 8 de janeiro de 1997 — Política Nacional de Recursos Hídricos', author: 'Brasil', edition: 'a Lei das Águas', links: [
        { kind: 'lei', href: 'https://www.planalto.gov.br/ccivil_03/leis/l9433.htm' },
      ], note: { pt: 'Art. 1º, V: "a bacia hidrográfica é a unidade territorial para implementação da Política Nacional de Recursos Hídricos." Comitês de Bacia: Arts. 37 a 40.', en: 'Art. 1, V: "the watershed is the territorial unit for implementing the National Water Resources Policy." Watershed committees: Arts. 37–40.' }},
    ],
  },
  {
    roman: 'XI',
    title: { pt: 'Moedas comunitárias — os dois casos', en: 'Community currencies — the two cases' },
    intro: {
      pt: 'Os dois casos mais citados no campo, tratados a fundo. Não localizamos literatura revisada por pares que compare Banco Palmas e Sarafu diretamente — uma lacuna de pesquisa real.',
      en: 'The two most-cited cases in the field, treated in depth. We found no peer-reviewed literature comparing Banco Palmas and Sarafu directly — a real research gap.',
    },
    items: [
      { n: 115, title: 'Banco Palmas', author: 'banco comunitário de desenvolvimento e moeda social', edition: 'Conjunto Palmeiras, Fortaleza-CE, fundado em 1998', links: [
        { kind: 'site', href: 'https://bancopalmas.com/' },
      ]},
      { n: 116, title: 'Bancos comunitários de desenvolvimento e a economia solidária: para além da inclusão bancária', author: 'França Filho, Silva Jr. & Rigo (2012)', edition: 'RAUSP 47(3):500–515', links: [
        { kind: 'doi', href: 'https://doi.org/10.5700/rausp1054' },
        { kind: 'livre', href: 'https://base.socioeco.org/docs/arq_12.pdf' },
      ]},
      { n: 117, title: 'O paradoxo das Palmas', author: 'Rigo & França Filho (2017)', edition: 'Cadernos EBAPE.BR 15(1):169–193', links: [
        { kind: 'livre', href: 'https://bibliotecadigital.fgv.br/ojs/index.php/cadernosebape/article/view/41258' },
      ], note: { pt: 'Achado central: após quinze anos, a circulação da moeda social diminuiu, enquanto o consumo local seguiu alto — os 93% de consumo local não são atribuíveis à moeda; a persistência se explica pela carga simbólica e política, não pela satisfação de necessidades econômicas.', en: 'Central finding: after fifteen years, circulation of the social currency declined while local consumption stayed high — the 93% local consumption figure is not attributable to the currency; its persistence owes to symbolic and political weight, not economic need.' }},
      { n: 118, title: 'Título abreviado não localizado', author: 'Rigo, França Filho & Leal (2015)', edition: 'Desenvolvimento em Questão 13(31):70–107', links: [
        { kind: 'doi', href: 'https://doi.org/10.21527/2237-6453.2015.31.70-107' },
        { kind: 'livre', href: 'https://www.revistas.unijui.edu.br/desenvolvimentoemquestao/article/download/3012/3657' },
      ]},
      { n: 119, title: 'Aplica o arcabouço de Ostrom aos bancos comunitários brasileiros', author: 'Hudon & Meyer (2016)', edition: 'Nonprofit and Voluntary Sector Quarterly 45(4S)', links: [
        { kind: 'doi', href: 'https://doi.org/10.1177/0899764016643609' },
      ]},
      { n: 120, title: 'Título abreviado não localizado', author: 'Cernev & Diniz (2020)', edition: 'RAC 24(5):487–506', links: [
        { kind: 'doi', href: 'https://doi.org/10.1590/1982-7849rac2020190390' },
        { kind: 'livre', href: 'https://www.scielo.br/j/rac/a/n3TkXYtmk8kqRBXvrdxSp9c/?lang=pt' },
      ]},
      { n: 121, title: 'Título abreviado não localizado', author: 'Fare, De Freitas & Meyer (2015)', edition: 'International Journal of Community Currency Research 19(2):6–17', links: [
        { kind: 'doi', href: 'https://doi.org/10.15133/j.ijccr.2015.002' },
      ]},
      { n: 122, title: 'Diagnóstico dos bancos comunitários do Nordeste', author: 'Leal, Rigo & Andrade (2016)', edition: 'IPEA, Mercado de Trabalho n. 60', links: [
        { kind: 'livre', href: 'https://www.ipea.gov.br/' },
      ], note: { pt: 'Levantamento de 26 dos 35 bancos comunitários da região. Achado: 52% não faziam divulgação da moeda social; só 46,2% ofereciam crédito de consumo nela.', en: 'A survey of 26 of the region’s 35 community banks. Finding: 52% did nothing to promote their social currency; only 46.2% offered consumer credit in it.' }},
      { n: 123, title: 'Texto para Discussão 2843', author: 'IPEA (2023)', edition: 'panorama nacional dos bancos comunitários — 148 bancos em 23 estados + DF', links: [
        { kind: 'livre', href: 'https://repositorio.ipea.gov.br/bitstream/11058/11737/1/TD_2843_web.pdf' },
      ]},
      { n: 124, title: 'Working Paper — sustentabilidade financeira dos bancos comunitários', author: 'Meyer (2013)', edition: 'UN NGLS', links: [
        { kind: 'livre', href: 'https://cdn.unrisd.org/assets/legacy-files/301-info-files/DD421F591071F8E2C1257B7400310FC6/Meyer.pdf' },
      ], note: { pt: 'Achado: a moeda em si é financeiramente insustentável — a operação se sustenta pelo microcrédito e pelo serviço de correspondente bancário.', en: 'Finding: the currency itself is not financially sustainable — the operation is sustained by microcredit and banking-correspondent fees.' }},
      { n: 125, title: 'The Road Back to Serfdom', author: 'Mandache (2020)', edition: 'Latin American Perspectives 47(4)', links: [
        { kind: 'doi', href: 'https://doi.org/10.1177/0094582X20903275' },
      ], note: { pt: 'Crítica: a proximidade com financiamento público e a institucionalização comprometeram a sustentabilidade social de longo prazo e a voz política do movimento.', en: 'Critique: closeness to public funding and institutionalization undermined the movement’s long-term social sustainability and political voice.' }},
      { n: 126, title: 'Título abreviado não localizado', author: 'Sevilla (2025)', edition: 'Cadernos do Desenvolvimento Fluminense n. 29', links: [
        { kind: 'doi', href: 'https://doi.org/10.12957/cdf.2025.90430' },
      ], note: { pt: 'Crítica: bancos comunitários e moedas sociais não subvertem a lógica do dinheiro do capitalismo financeirizado; tornam-se transferência de renda absorvida pelo Estado.', en: 'Critique: community banks and social currencies do not subvert financialized capitalism’s logic of money; they become income transfer absorbed by the state.' }},
      { n: 127, title: 'Grassroots Economics / Sarafu Network', author: 'fundada por Will Ruddick', edition: 'Quênia, a partir de 2010', links: [
        { kind: 'site', href: 'https://www.grassrootseconomics.org/' },
        { kind: 'site', href: 'https://www.sarafu.network/' },
      ]},
      { n: 128, title: 'Sarafu Community Inclusion Currency 2020–2021', author: 'Mattsson, Criscione & Ruddick (2022)', edition: 'Scientific Data (Nature) 9:426', links: [
        { kind: 'doi', href: 'https://doi.org/10.1038/s41597-022-01539-4' },
        { kind: 'dataset', href: 'https://doi.org/10.5255/UKDA-SN-855142' },
      ], note: { pt: '~55.000 contas, ~300 milhões de Sarafu transacionados entre janeiro de 2020 e junho de 2021. O dataset exige registro e aceite de termos — não é download anônimo.', en: '~55,000 accounts, ~300 million Sarafu transacted between January 2020 and June 2021. The dataset requires registration and accepting terms — it is not an anonymous download.' }},
      { n: 129, title: 'Título abreviado não localizado', author: 'Mattsson, Criscione & Takes (2023)', edition: 'Scientific Reports 13:5864', links: [
        { kind: 'doi', href: 'https://doi.org/10.1038/s41598-023-33184-1' },
      ], note: { pt: 'Achado: 99,7% do volume contido nos cinco maiores módulos; circulação fortemente localizada geograficamente.', en: 'Finding: 99.7% of volume contained in the five largest modules; circulation is strongly localized geographically.' }},
      { n: 130, title: 'Título abreviado não localizado', author: 'Ba, Zignani & Gaito (2023)', edition: 'Future Generation Computer Systems 148:266–279', links: [
        { kind: 'doi', href: 'https://doi.org/10.1016/j.future.2023.05.022' },
      ], note: { pt: 'Achado: contas de grupo ("chamas") são 0,4% dos usuários e concentram ~36% das transações.', en: 'Finding: group accounts ("chamas") are 0.4% of users and account for ~36% of transactions.' }},
      { n: 131, title: 'Título abreviado não localizado', author: 'Criscione (2025)', edition: 'Journal of Complex Networks 13(3):cnaf005', links: [
        { kind: 'doi', href: 'https://doi.org/10.1093/comnet/cnaf005' },
        { kind: 'preprint', href: 'https://arxiv.org/abs/2409.13674' },
      ], note: { pt: 'Achado: 78,5% dos usuários fizeram uma única transação isolada; 25% dos usuários movimentam 91% do volume.', en: 'Finding: 78.5% of users made a single isolated transaction; 25% of users move 91% of volume.' }},
      { n: 132, title: 'Community Currencies as Crisis Response: Results From a Randomized Control Trial in Kenya', author: 'Mqamelo (2022)', edition: 'Frontiers in Blockchain 4:739751', links: [
        { kind: 'doi', href: 'https://doi.org/10.3389/fbloc.2021.739751' },
      ], note: { pt: 'RCT com randomização individual, N=791 — o dado experimental mais forte que existe sobre moeda comunitária em qualquer lugar do mundo, e é do Quênia, não do Brasil. Mulheres beneficiárias tiveram ganhos significativamente menores.', en: 'An individually randomized RCT, N=791 — the strongest experimental evidence on community currency anywhere in the world, and it is from Kenya, not Brazil. Female beneficiaries had significantly smaller gains.' }},
      { n: 133, title: 'Revisão sistemática de moedas comunitárias', author: 'Michel & Hudon (2015)', edition: 'Ecological Economics 116:160–171', links: [
        { kind: 'doi', href: 'https://doi.org/10.1016/j.ecolecon.2015.04.023' },
      ], note: { pt: 'Achado: a base de evidências do campo inteiro é frágil — não há análise global sumarizando seu impacto.', en: 'Finding: the evidence base for the whole field is weak — no global analysis summarizes its impact.' }},
      { n: 134, title: 'Blockchain humanitarianism and crypto-colonialism', author: 'Jutel (2022)', edition: 'Patterns (Cell) 3(1):100422', links: [
        { kind: 'doi', href: 'https://doi.org/10.1016/j.patter.2021.100422' },
      ]},
      { n: 135, title: 'Título abreviado não localizado', author: 'Ussher, Ebert, Gómez & Ruddick (2021)', edition: 'Journal of Risk and Financial Management 14(11):557', links: [
        { kind: 'doi', href: 'https://doi.org/10.3390/jrfm14110557' },
      ], note: { pt: 'Favorável ao modelo, mas os próprios autores listam limites: desequilíbrio por acúmulo de saldos, risco de default, tensão de liquidez em economias dependentes de importação, necessidade de financiamento externo contínuo.', en: 'Favorable to the model, but the authors themselves list limits: imbalance from accumulated balances, default risk, liquidity strain in import-dependent economies, need for continuous external funding.' }},
      { n: 136, title: 'Estudo de campo em Kilifi sobre a prática de ROLA', author: 'Evite (2026)', edition: 'International Journal of Community Currency Research', links: [
        { kind: 'doi', href: 'https://doi.org/10.26034/zh.ijccr.2026.9556' },
      ]},
      { n: 137, title: 'Modelagem de sistemas complexos das moedas de inclusão comunitária', author: 'financiada pela Cruz Vermelha Dinamarquesa, com a BlockScience', edition: 'Computational Economics (Springer), 2023', links: [
        { kind: 'doi', href: 'https://doi.org/10.1007/s10614-023-10445-9' },
      ]},
    ],
  },
  {
    roman: 'XII',
    title: { pt: 'Pensamento crítico brasileiro e ibero-americano', en: 'Brazilian and Ibero-American critical thought' },
    items: [
      { n: 138, title: 'O Retorno do Território', author: 'Milton Santos, em Território: Globalização e Fragmentação', edition: 'Hucitec/ANPUR, 1994', links: [
        { kind: 'livre', href: 'https://anpur.org.br/wp-content/uploads/1995/07/Territorio_globalizacao-e-fragmentacao.pdf' },
      ], note: { pt: 'O texto de origem da categoria "território usado".', en: 'The source text for the category "territory in use".' }},
      { n: 139, title: 'A Natureza do Espaço: Técnica e Tempo, Razão e Emoção', author: 'Milton Santos', edition: '1ª ed. Hucitec, 1996 · ed. corrente: Edusp, 4ª ed., 2006', links: [], note: { pt: 'Obra-síntese do arcabouço teórico de Milton Santos, Prêmio Jabuti de Ciências Humanas 1997. Sem acesso aberto legal confirmado — consulta em biblioteca ou compra.', en: 'The synthesis of Milton Santos’s theoretical framework, winner of the 1997 Jabuti Prize. No confirmed legal open access — library consultation or purchase.' }},
      { n: 140, title: 'O Brasil: Território e Sociedade no Início do Século XXI', author: 'Milton Santos e Maria Laura Silveira', edition: 'Editora Record, 2001', links: [], note: { pt: 'Aplicação empírica da categoria "território usado" ao território brasileiro. Sem acesso aberto legal confirmado.', en: 'An empirical application of the "territory in use" category to Brazilian territory. No confirmed legal open access.' }},
      { n: 141, title: 'Do território ao território usado: possibilidades entreabertas na ciência geográfica', author: 'Jesus e Vilar (2022)', edition: 'Geografia em Atos 6', links: [
        { kind: 'doi', href: 'https://doi.org/10.35416/geoatos.2022.8630' },
        { kind: 'livre', href: 'https://revista.fct.unesp.br/index.php/geografiaematos/article/download/8630/pdf_1' },
      ]},
      { n: 142, title: 'A Era do Capital Improdutivo', author: 'Ladislau Dowbor', edition: 'Outras Palavras & Autonomia Literária, 2017/2018', links: [
        { kind: 'livre', href: 'https://dowbor.org/wp-content/uploads/2018/11/Dowbor-_-A-ERA-DO-CAPITAL-IMPRODUTIVO.pdf' },
      ]},
      { n: 143, title: 'Democracia Econômica: Alternativas de Gestão Social', author: 'Ladislau Dowbor', edition: '1ª ed. Banco do Nordeste, 2007 · 2ª ed. Vozes, 2008', links: [
        { kind: 'livre', href: 'https://dowbor.org/wp-content/uploads/2020/08/12-DemoEco1.pdf' },
      ]},
      { n: 144, title: 'Epistemologias do Sul', author: 'Boaventura de Sousa Santos e Maria Paula Meneses (orgs.)', edition: 'Almedina/CES-Universidade de Coimbra, 2009 · ed. BR: Cortez, 2010', links: [], note: { pt: 'Ed. brasileira só confirmada em catálogo comercial, sem página de editora ativa.', en: 'The Brazilian edition is confirmed only in a commercial catalog, with no active publisher page.' }},
      { n: 145, title: 'Beyond Abyssal Thinking: From Global Lines to Ecologies of Knowledges', author: 'Boaventura de Sousa Santos (2007)', edition: 'Review (Fernand Braudel Center) 30(1):45–89', links: [
        { kind: 'livre', href: 'https://www.ces.uc.pt/bss/documentos/AbyssalThinking.pdf' },
      ], note: { pt: 'O artigo que cunha "ecologies of knowledges" — a base do conceito de ecologia de saberes.', en: 'The article that coins "ecologies of knowledges" — the basis of the concept of an ecology of knowledges.' }},
      { n: 146, title: 'Introdução à Economia Solidária', author: 'Paul Singer', edition: 'Editora Fundação Perseu Abramo, 2002', links: [
        { kind: 'livre', href: 'https://fpabramo.org.br/wp-content/uploads/2018/04/Introducao-economia-solidaria-WEB-1.pdf' },
      ]},
      { n: 147, title: 'Desenvolvimento capitalista e desenvolvimento solidário', author: 'Paul Singer (2004)', edition: 'Estudos Avançados 18(51):7–22', links: [
        { kind: 'livre', href: 'https://revistas.usp.br/eav/article/download/9997/11569' },
      ]},
    ],
  },
  {
    roman: 'XIII',
    title: { pt: 'Periódicos brasileiros de acesso aberto — agroecologia e economia ecológica', en: 'Brazilian open-access journals — agroecology and ecological economics' },
    items: [
      { n: 148, title: 'Cadernos de Agroecologia', author: 'ABA-Agroecologia', edition: 'anais dos Congressos Brasileiros de Agroecologia', links: [
        { kind: 'site', href: 'https://cadernos.aba-agroecologia.org.br/cadernos' },
      ]},
      { n: 149, title: 'Revista Brasileira de Agroecologia', author: 'ABA-Agroecologia + PPG MADER/UnB', edition: 'CC BY, sem taxa de publicação', links: [
        { kind: 'site', href: 'https://periodicos.unb.br/index.php/rbagroecologia' },
        { kind: 'livre', href: 'https://doaj.org/toc/1980-9735' },
      ]},
      { n: 150, title: 'Agriculturas: Experiências em Agroecologia', author: 'AS-PTA', edition: 'acervo até ~2018–2019', links: [
        { kind: 'site', href: 'https://aspta.org.br/revista-agriculturas/' },
      ]},
      { n: 151, title: 'Desenvolvimento e Meio Ambiente', author: 'UFPR', edition: 'CC BY 4.0, sem embargo', links: [
        { kind: 'site', href: 'https://revistas.ufpr.br/made' },
        { kind: 'livre', href: 'https://doaj.org/toc/2176-9109' },
      ], note: { pt: 'O periódico brasileiro consolidado mais próximo do escopo de economia ecológica.', en: 'The established Brazilian journal closest in scope to ecological economics.' }},
      { n: 152, title: 'Ambiente & Sociedade', author: 'ANPPAS, hospedado no SciELO', edition: 'acesso aberto desde 1999, CC BY-NC', links: [
        { kind: 'site', href: 'https://www.scielo.br/j/asoc/' },
        { kind: 'livre', href: 'https://doaj.org/toc/1414-753X' },
      ]},
      { n: 153, title: 'Sustentabilidade em Debate', author: 'Centro de Desenvolvimento Sustentável/UnB', edition: 'dossiês em economia ecológica e bioeconomia desde 2010', links: [
        { kind: 'site', href: 'https://periodicos.unb.br/index.php/sust' },
        { kind: 'livre', href: 'https://doaj.org/toc/2179-9067' },
      ]},
      { n: 154, title: 'Revista Iberoamericana de Economía Ecológica (REVIBEC)', author: 'REDIBEC', edition: 'rede regional da qual a ECOECO é membro', links: [
        { kind: 'site', href: 'https://redibec.org/ojs/index.php/revibec' },
        { kind: 'livre', href: 'https://doaj.org/toc/2385-4650' },
      ], note: { pt: 'Não é brasileira — é ibero-americana. Incluída por ser a publicação mais diretamente dedicada a economia ecológica entre as encontradas.', en: 'Not Brazilian — it is Ibero-American. Included as the publication most directly dedicated to ecological economics among those found.' }},
    ],
  },
];
