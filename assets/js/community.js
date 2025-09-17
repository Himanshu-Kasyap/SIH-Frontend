// Community Dashboard JavaScript Functionality

class CommunityDashboard {
    constructor() {
        this.currentPage = 1;
        this.questionsPerPage = 12;
        this.currentFilters = {
            search: '',
            category: '',
            sort: 'recent'
        };
        this.questions = [];
        this.isLoading = false;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadQuestions();
        this.updateStats();
    }

    bindEvents() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        
        if (searchInput) {
            searchInput.addEventListener('input', this.debounce((e) => {
                this.currentFilters.search = e.target.value;
                this.resetPagination();
                this.loadQuestions();
            }, 500));
            
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleSearch();
                }
            });
        }
        
        if (searchBtn) {
            searchBtn.addEventListener('click', () => this.handleSearch());
        }

        // Filter functionality
        const categoryFilter = document.getElementById('categoryFilter');
        const sortFilter = document.getElementById('sortFilter');
        
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                this.currentFilters.category = e.target.value;
                this.resetPagination();
                this.loadQuestions();
            });
        }
        
        if (sortFilter) {
            sortFilter.addEventListener('change', (e) => {
                this.currentFilters.sort = e.target.value;
                this.resetPagination();
                this.loadQuestions();
            });
        }

        // Ask Question button
        const askQuestionBtn = document.getElementById('askQuestionBtn');
        if (askQuestionBtn) {
            askQuestionBtn.addEventListener('click', () => {
                // Navigate to ask question page (to be implemented later)
                window.location.href = 'ask-question.html';
            });
        }

        // Pagination
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousPage());
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextPage());
        }

        // View options
        const viewBtns = document.querySelectorAll('.view-btn');
        viewBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                viewBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.changeView(e.target.dataset.view);
            });
        });

        // Category cards
        const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                this.filterByCategory(category);
            });
        });
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    handleSearch() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            this.currentFilters.search = searchInput.value;
            this.resetPagination();
            this.loadQuestions();
        }
    }

    filterByCategory(category) {
        const categoryFilter = document.getElementById('categoryFilter');
        if (categoryFilter) {
            categoryFilter.value = category;
            this.currentFilters.category = category;
            this.resetPagination();
            this.loadQuestions();
        }
    }

    changeView(viewType) {
        const questionsGrid = document.getElementById('questionsGrid');
        if (questionsGrid) {
            questionsGrid.className = viewType === 'list' ? 'questions-list' : 'questions-grid';
            this.renderQuestions();
        }
    }

    resetPagination() {
        this.currentPage = 1;
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.loadQuestions();
        }
    }

    nextPage() {
        const totalPages = Math.ceil(this.questions.length / this.questionsPerPage);
        if (this.currentPage < totalPages) {
            this.currentPage++;
            this.loadQuestions();
        }
    }

    async loadQuestions() {
        if (this.isLoading) return;
        
        this.isLoading = true;
        this.showLoading();

        try {
            // Simulate API call - replace with actual API endpoint
            const response = await this.fetchQuestions();
            this.questions = response.questions || [];
            this.renderQuestions();
            this.updatePagination();
        } catch (error) {
            console.error('Error loading questions:', error);
            this.showError('Failed to load questions. Please try again.');
        } finally {
            this.isLoading = false;
            this.hideLoading();
        }
    }

    async fetchQuestions() {
        // Simulate API call with mock data
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    questions: this.getMockQuestions(),
                    total: 50
                });
            }, 1000);
        });
    }

    getMockQuestions() {
        const mockQuestions = [
            {
                id: 1,
                title: "How to treat leaf blight in tomato plants?",
                description: "I've noticed brown spots on my tomato leaves. The spots are getting bigger and some leaves are turning yellow. What could be causing this and how can I treat it?",
                category: "crop-diseases",
                author: {
                    name: "Rajesh Kumar",
                    reputation: 245
                },
                createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
                answerCount: 3,
                viewCount: 45,
                voteCount: 8,
                isSolved: true,
                hasImage: true
            },
            {
                id: 2,
                title: "Best time for wheat sowing in North India",
                description: "I'm planning to sow wheat this season. What's the optimal time for sowing wheat in North India? Should I wait for more rain or start now?",
                category: "seeds-planting",
                author: {
                    name: "Priya Sharma",
                    reputation: 189
                },
                createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
                answerCount: 7,
                viewCount: 123,
                voteCount: 15,
                isSolved: false,
                hasImage: false
            },
            {
                id: 3,
                title: "Organic pest control methods for cotton",
                description: "Looking for effective organic methods to control pests in cotton crops. Chemical pesticides are expensive and I want to try natural alternatives.",
                category: "pest-control",
                author: {
                    name: "Suresh Patel",
                    reputation: 156
                },
                createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
                answerCount: 5,
                viewCount: 89,
                voteCount: 12,
                isSolved: true,
                hasImage: false
            },
            {
                id: 4,
                title: "Soil pH testing and correction methods",
                description: "My crops are not growing well despite proper watering and fertilization. I suspect soil pH might be the issue. How can I test and correct soil pH?",
                category: "soil-management",
                author: {
                    name: "Anita Devi",
                    reputation: 203
                },
                createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
                answerCount: 9,
                viewCount: 167,
                voteCount: 23,
                isSolved: false,
                hasImage: true
            },
            {
                id: 5,
                title: "Dealing with unexpected frost damage",
                description: "Unexpected frost last night damaged my vegetable crops. What immediate steps should I take to minimize damage and help plants recover?",
                category: "weather-issues",
                author: {
                    name: "Mohan Singh",
                    reputation: 134
                },
                createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
                answerCount: 4,
                viewCount: 78,
                voteCount: 6,
                isSolved: false,
                hasImage: true
            },
            {
                id: 6,
                title: "Proper harvesting techniques for rice",
                description: "First time growing rice. When is the right time to harvest and what's the proper technique to ensure maximum yield and quality?",
                category: "harvesting",
                author: {
                    name: "Lakshmi Reddy",
                    reputation: 98
                },
                createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
                answerCount: 6,
                viewCount: 112,
                voteCount: 18,
                isSolved: true,
                hasImage: false
            }
        ];

        // Filter questions based on current filters
        let filteredQuestions = mockQuestions;

        if (this.currentFilters.search) {
            const searchTerm = this.currentFilters.search.toLowerCase();
            filteredQuestions = filteredQuestions.filter(q => 
                q.title.toLowerCase().includes(searchTerm) ||
                q.description.toLowerCase().includes(searchTerm)
            );
        }

        if (this.currentFilters.category) {
            filteredQuestions = filteredQuestions.filter(q => 
                q.category === this.currentFilters.category
            );
        }

        // Sort questions
        switch (this.currentFilters.sort) {
            case 'popular':
                filteredQuestions.sort((a, b) => b.voteCount - a.voteCount);
                break;
            case 'solved':
                filteredQuestions.sort((a, b) => b.isSolved - a.isSolved);
                break;
            case 'unanswered':
                filteredQuestions.sort((a, b) => a.answerCount - b.answerCount);
                break;
            case 'recent':
            default:
                filteredQuestions.sort((a, b) => b.createdAt - a.createdAt);
                break;
        }

        return filteredQuestions;
    }

    renderQuestions() {
        const questionsGrid = document.getElementById('questionsGrid');
        if (!questionsGrid) return;

        if (this.questions.length === 0) {
            questionsGrid.innerHTML = this.getEmptyStateHTML();
            return;
        }

        const startIndex = (this.currentPage - 1) * this.questionsPerPage;
        const endIndex = startIndex + this.questionsPerPage;
        const questionsToShow = this.questions.slice(startIndex, endIndex);

        questionsGrid.innerHTML = questionsToShow.map(question => 
            this.getQuestionCardHTML(question)
        ).join('');

        // Add click handlers to question cards
        questionsGrid.querySelectorAll('.question-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const questionId = e.currentTarget.dataset.questionId;
                this.navigateToQuestion(questionId);
            });
        });
    }

    getQuestionCardHTML(question) {
        const timeAgo = this.getTimeAgo(question.createdAt);
        const categoryName = this.getCategoryName(question.category);
        
        return `
            <div class="question-card" data-question-id="${question.id}">
                <div class="question-header">
                    <h3 class="question-title">${question.title}</h3>
                    <div class="question-status">
                        ${question.isSolved ? '<div class="solved-badge"><i class="fas fa-check"></i> Solved</div>' : ''}
                        <div class="category-tag">${categoryName}</div>
                    </div>
                </div>
                
                <div class="question-preview">
                    ${question.description}
                </div>
                
                ${question.hasImage ? '<div class="question-image-indicator"><i class="fas fa-image"></i> Has image</div>' : ''}
                
                <div class="question-meta">
                    <div class="question-author">
                        <i class="fas fa-user"></i>
                        <a href="profile.html?id=${question.author._id}" class="author-name">
                            ${question.author.name}
                        </a>
                        <span class="reputation">(${question.author.reputation})</span>
                    </div>
                    <div class="question-stats">
                        <span><i class="fas fa-comments"></i> ${question.answerCount}</span>
                        <span><i class="fas fa-eye"></i> ${question.viewCount}</span>
                        <span class="question-date">${this.formatRelativeTime(question.createdAt)}</span>
                    </div>
                </div>
            </div>
        `;
    }

    formatRelativeTime(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
        if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
        
        return date.toLocaleDateString();
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize community dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check authentication
    const user = JSON.parse(localStorage.getItem('user'));
    // Authentication check removed - community features are now accessible without login
    
    window.communityDashboard = new CommunityDashboard();
});

// Auth;
});oard)hbyDasdow.communitpdates(winTimeUealew Res = nmeUpdatealTi  window.r;
  shboard()CommunityDaw ard = nebounityDashw.comm{
    windo=> ded', () ontentLoa('DOMCventListenerment.addEdocuded
oa DOM is ltialize when

// Ini} }

   ); }, 10000}
                  ();
 .removeication    notif            ment) {
learentEion.pificat  if (not        {
  ) => ((eoutsetTim
        conds10 semove after  // Auto-re           
n);
    notificatiold(endChi.appment.body   docu     
       `;
   iv>
           </d       
>×</button>"close-btn"" class=e()ovnt.remtElemet.parenarentElemenk="this.pon onclic    <butt      ton>
      ut </b                 Refresh
                  )">
uestions(adQard.lotyDashbouniwindow.commve(); emoElement.rent.parents.parentElemclick="thitton on      <bu        e</span>
  ons availablew questi>N       <span>
         ll"></i"fas fa-be  <i class=           ent">
   ontfication-ctiss="no <div cla        = `
   nerHTML inification. not
       ;otification'date-name = 'up.classNtification    nodiv');
    t('ateElemendocument.crecation = nst notifi    costions
    ew quetion for n notificateCrea    // ) {
    cation(otifiwUpdateN   sho
     }
  }
or);
      err updates:', checking foror('Error errconsole.            ) {
roratch (er } c             }
 ;
     ification()teNot.showUpda        this {
        Questions)asNew    if (h       
           uestions
  f new qce o/ 20% chanm() > 0.8; / Math.randos =ewQuestionhasN    const      ions
   estnew qung for ulate checkiSim      // y {
          tr) {
    tes(heckForUpdaync c
    as    }
l);
ateInterva}, this.upd       
 dates();kForUpec     this.ch
       al(() => {tInterv  sely
      odicalions periw quest neheck for   // C    () {
  init
   );
    }
.init(is       thseconds
 30 ; // = 30000eInterval this.updat     hboard;
    = das.dashboard      this  rd) {
hboastructor(das {
    contesmeUpdalass RealTitionality
ctes funcpda-time u// Real

 }
}  imate);
 (anonFrametAnimati    reques  };

              }
    e);
    ame(animationFrstAnimateque          r       1) {
ess <  if (progr      

    );aleString(Value.toLocrrentContent = cuement.text         eless);
   * progrartValue) lue - st (targetValue +Va.floor(startthValue = Maentonst curr           c       
 
     ion, 1); / duratedth.min(elapsess = Ma progronst     cme;
       Tiime - start = currentTedonst elaps  c          Time) => {
e = (currentnimatnst a    cow();

    nce.no = performastartTimet ns      co1000;
  = st duration   con= 0;
      artValue st st
        con {argetValue)t, tlemenateNumber(e

    anim
    } });
              }
     ts[key]);key], stats[er(elemenumb.animateNis      th  {
        ]) lements[key if (e       => {
     .forEach(keylements)keys(ebject.
        O        };

tions')'solvedQuesd(ementByIent.getElons: documuestiolvedQ s        
   ers'),('activeUstElementByIdocument.geers: dveUs        acti    
s'),erlAnswotamentById('tEleocument.getswers: d   totalAn
         uestions'),totalQ('yIdtElementBment.gestions: docutotalQue      = {
      lements onst e  c
      ts) {ts(sta   renderSta}

  });
    ;
          }, 500)     ;
           })
         stions: 756   solvedQue        ,
         eUsers: 892 activ              
     wers: 3891,lAns       tota       47,
      : 12talQuestions to                   esolve({
   r             {
 (() =>tTimeout         se {
   esolve) =>Promise((r new     return     data
ockwith mll ulate API ca    // Sim    
) {hStats(  async fetc
    }

   }   );
    ors:', erring statoad'Error l.error( console          ror) {
 catch (er
        } ats(stats);s.renderStthi         ();
   .fetchStatsthist ts = awaistanst     co
        r statsAPI call foe Simulat   // {
         ry        t
 ateStats() { async upd  
    }

 
        }       `;div>
       </          >
    uttonain</bn">Try Agtry-bt="re()" classadion.relondow.locatonclick="wion   <butt                  sage}</p>
 <p>${mes                h3>
   r</Erro   <h3>            
     i>iangle"></mation-trfa-exclalass="fas    <i c                 state">
="error-  <div class            `
   innerHTML =nsGrid.questio         id) {
   sGr (question  if      id');
'questionsGrentById(ment.getElemrid = docunsGonst questio       c
 message) {  showError(  }

  ed
  nderre reions aen quest hidden whwill be/ Loading    /{
     ) Loading(

    hide
    }   }
          `;  iv>
     /d       <
         s...</span>estioning quLoad      <span>             "></i>
 spininner fa-a-splass="fas fi c  <                  inner">
spg-loadinass="  <div cl      `
        erHTML = rid.innnsGtio    ques      {
   stionsGrid)que       if (Grid');
 uestionsyId('qmentBt.getEleencumid = doestionsGrt quons{
        cding() howLoa}

    s    }
        talPages;
ge >= totPas.currenled = thitBtn.disab nex           tBtn) {
    if (nex    
        
       };
  <= 1gentPa= this.curresabled   prevBtn.di    n) {
      f (prevBt       i     
 
           }ages}`;
lP ${totaPage} ofcurrentge ${this.nt = `PaContetexto.    pageInf  ) {
      pageInfo        if (       
');
 tn('nextBElementByIdgetent.n = documtBtt nexns       co;
 revBtn')Id('pmentByent.getEleBtn = docum  const prev    
  o');ageInf('ptElementByIdocument.gepageInfo = d     const Page);
   stionsPer this.ques.length /estionil(this.quth.ce = Ma totalPagesonst
        cation() {tePagin

    upda;
    }ionId}`${questid=html?etail.stion-df = `quetion.hreindow.loca       w
 ater)ented l be implemage (toetail pstion date to que   // Navig
     tionId) {queson(uesti navigateToQ

   
    }}`;
        ' : ''} agos > 1 ? 'say${dayys} dn `${da retur       ;
    400) 86onds /iffInSecor(d = Math.flodays      const 
      } else {  
      `;''} agos' :  1 ? 'rs >r${houours} hou{heturn `$      r
      nds / 3600);iffInSecoth.floor(durs = Ma ho     const) {
       400 < 86iffInSecondsse if (d  } el  `;
     ''} ago? 's' :es > 1 {minuts} minute$teminu return `${           / 60);
onds iffInSecoor(dfltes = Math. minust  con        {
   00)nds < 36diffInSeco (se if        } elst now';
rn 'Ju  retu   
       0) {conds < 6ffInSe(di        if       

  te) / 1000);r((now - daath.floo Ms =ffInSecond    const die();
    ew Dat nnow =    const {
    Ago(date)    getTime }

 ral';
   || 'Geneegory] p[categoryMarn cat       retu     };
 eneral'
   : 'Gneral'         'ge
   ing',& Planteeds ting': 'Seeds-plan's           ng',
 'Harvestiesting':       'harv     
 ',t Controltrol': 'Pest-conpes          'es',
  Weather Issu 'ues':'weather-iss    ,
        anagement'': 'Soil Magementsoil-man    '      s',
  p Diseases': 'Crose'crop-disea            = {
ryMap st catego     cony) {
   categorName(ory    getCateg}

       `;
   v>
      </di
        tion</p>new quesask a or ch criteria arur se youstingry adjp>T           <h3>
     d</tions founo ques<h3>N             
   ></i>a-search" ffas"i class=        <">
        ate"empty-st <div class=       n `
    ur        retML() {
teHTEmptyStaget

       }   `;
 
          </div>iv>
           </d          
     </div>         
          </div>                 n>
     o}</spa{timeAg   <span>$                       </i>
  "> fa-clock"fasass= <i cl                           m">
"stat-ite <div class=                     </div>
                         n>
 </spaoteCount}.vtionn>${ques     <spa                      >
 -up"></is fa-thumbs="fa  <i class                        ">
  "stat-itemss=div cla     <                   div>
         </        >
       ount}</spanion.viewCquestn>${ <spa                          </i>
  fa-eye">ss="fas    <i cla                 
       tat-item">s="s<div clas                
        div>      </                  t}</span>
rCountion.answe{ques    <span>$                     i>
   ments"></"fas fa-comass=<i cl                        >
    -item"at="stassv cl    <di             ">
       -statsionst class="que     <div                
               
    /div>