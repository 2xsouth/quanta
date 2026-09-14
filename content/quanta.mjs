// Editorial content for quanta. Existing component keys are retained so the
// site's layouts and scroll choreography can remain intact.
const link = (url='/contact') => ({linkType:'page',openInNewTab:false,url});
const cta = (text='contact us',url='/contact') => ({text,link:link(url)});
const block = (text,style='normal') => ({_type:'block',_key: text.slice(0,30),style,markDefs:[],children:[{_type:'span',_key:'text',marks:[],text}]});
const rich = (...texts) => texts.map(text=>block(text));
const bullets = texts => texts.map(text=>({...block(text),listItem:'bullet',level:1}));
const img = (name,alt) => ({alt,asset:{_id:`/assets/quanta/${name}`,_ref:`/assets/quanta/${name}`,url:`/assets/quanta/${name}`,metadata:{dimensions:{width:1536,height:1024}}},crop:null,hotspot:null});
const workflow=img('workflow.png','abstract modules connected in an automated workflow');
const systems=img('systems.png','layered components forming a connected software system');
const diagram=(name,alt)=>img(`${name}.svg`,alt);
const visuals=[workflow,systems,diagram('pipeline','unstructured input processed into structured output'),diagram('connections','business tools connected through a shared workflow'),diagram('observability','a monitored system with review and feedback loops')];

export const contact = {
  // Set only to the business address or form endpoint supplied by quanta.
  email:'',
  endpoint:'',
};

export const site = {
  name:'quanta',
  origin:'https://quanta.maanavchoudhary28.chatgpt.site',
  description:'quanta builds ai-powered software, automations and custom solutions that reduce manual work and improve business operations.',
};

const metadata = (title,path='/') => ({title,ogTitle:title,metaDescription:site.description,ogDescription:site.description,canonicalUrl:site.origin+path,keywords:'ai development, workflow automation, custom software, ai integrations',noIndex:false,ogImage:{...workflow,asset:{...workflow.asset,url:site.origin+workflow.asset.url}},twitterCard:'summary_large_image'});

export const data = {
  'sanity-zug1S6G4p9':{
    footerStrings:{contact:'contact',copyrightTasha:'quanta',copyrightAurasphere:'',credits:'our approach',imageCredits:'built with purpose',privacyPolicy:'privacy & terms'},
    headerStrings:{home:'home',about:'about',contact:'contact'},
    homeNavStrings:{insideTheApp:'our capabilities',whyCreativity:'how we work'},
    privacyPolicyStrings:{accept:'accept',description:'manage your website preferences',settings:'settings'},
  },
  'sanity-jsi6a9h7p5':{
    appLink:link(),aurasphereLink:null,credits:[],
    internalLinks:{home:{...link('/'),pageTitle:'quanta'},about:{...link('/about'),pageTitle:'about quanta'},contact:{...link(),pageTitle:'contact quanta'},privacyPolicy:{...link('/legal'),pageTitle:'privacy & terms | quanta'}},
    socialLinks:{},
  },
  'sanity-83EC1Vnfgb':metadata('quanta — ai systems for better business'),
  'sanity-9bl2UomZQv':metadata('about quanta — practical ai engineering','/about'),
  'sanity-O5qbKiK5cn':metadata('contact quanta — tell us what slows you down','/contact'),
  'sanity-ROEJnGK6rN':metadata('privacy & terms | quanta','/legal'),

  'sanity-JT0kWakLg4':{
    _id:'home-hero',_type:'heroSection',backgroundImage:null,buttonLabel:'',
    headlineLine1:'ai systems built for your business',
    headlineLine2:'less manual work',
    headlineLine3:'more room to grow',
    description:'we build custom software and ai workflows\nthat reduce repetitive work, save time\nand simplify your operations.',
  },
  'sanity-HfYZGxTrQA':{
    _id:'home-intro',_type:'introSection',comingSoonText:'built around your business',
    headlineLine1:'intelligent systems',headlineLine2:'that work with',headlineLine3:'the way you',headlineLine4:'work',
    description:'your team knows where the work gets stuck. we turn those bottlenecks into useful software — connecting your tools, automating repetitive steps and making information easier to act on.',
    learnMoreButton:cta(''),
    intro:[
      {pretitle:'less manual\nwork',title:'repetitive work should not fill your day.',description:'copying data, sorting requests, preparing reports and chasing updates all take time. we map these tasks, identify what can be automated and build workflows that handle the routine steps while keeping your team in control.',image:visuals[0]},
      {pretitle:'software that\nfits',title:'build around the process. not the other way around.',description:'your business has its own rules, data and constraints. we build custom ai applications and internal tools around those requirements, with interfaces your team can use and integrations that fit the systems you already have.',image:visuals[1]},
      {pretitle:'make data\nuseful',title:'turn scattered information into structured output.',description:'documents, messages and records contain information your team needs. we build systems to extract, classify and organize it, with validation and human review where accuracy matters.',image:visuals[2]},
      {pretitle:'connect your\nsystems',title:'your tools should work together.',description:'we connect the software your business depends on. information moves between systems, repetitive handoffs happen automatically and your team spends less time switching tabs and keeping records in sync.',image:visuals[3]},
      {pretitle:'built to\nevolve',title:'useful today. adaptable as you grow.',description:'a working prototype is only the beginning. we deploy, monitor and improve the system, with clear documentation and practical support so your workflows can evolve with your business.',image:visuals[4]},
    ],
  },
  'sanity-lJDHgocMvY':{
    _id:'home-features',_type:'featuresSection',sectionTitle:'our capabilities',backgroundImage:visuals[2],
    headline:{line1:'the right',line2Left:'systems',line2Right:'for your',line3:'business'},
    description:rich('from a single repetitive task to a connected internal platform, we design and build the software your operation needs.'),
    features:[
      {title:'workflow\nautomation',description:'replace repetitive handoffs with dependable workflows. we map the process, define the rules and connect each step, including the exceptions that need a person.',image:visuals[0],subFeatures:[
        {title:'process mapping',description:rich('we examine the work as it happens: the inputs, people, systems and recurring delays. together, we choose an opportunity with a clear operational benefit.')},
        {title:'task automation',description:rich('automate routine data entry, routing, notifications and reporting. rules, approvals and fallbacks make the workflow understandable and manageable.')},
        {title:'human review',description:rich('keep people involved where judgment matters. approval steps and exception queues give your team control without making them repeat the same checks all day.')},
      ]},
      {title:'custom ai\nsoftware',description:'purpose-built applications for the work your company actually does. we combine software engineering with ai where it adds value, from a focused prototype to a production system.',image:visuals[1],subFeatures:[
        {title:'custom applications',description:rich('build interfaces and services around your users, data and business logic, rather than forcing the workflow into an off-the-shelf product.')},
        {title:'internal tools',description:rich('give your team one useful place to review information, manage tasks and act on results. less tool switching, clearer responsibilities.')},
        {title:'practical prototypes',description:rich('test the hardest assumptions early with a small working system. use real examples and feedback to decide what deserves further investment.')},
      ]},
      {title:'document\nintelligence',description:'make information easier to find and use. we build extraction, classification and search systems around your documents, with checks for the outputs your business relies on.',image:visuals[2],subFeatures:[
        {title:'structured extraction',description:rich('turn documents and messages into defined fields that downstream systems can use. validate the results and route uncertain cases for review.')},
        {title:'search and retrieval',description:rich('help people find relevant information across approved sources. ground ai responses in your material and show where the information came from.')},
        {title:'quality checks',description:rich('evaluate the system with representative examples, track common errors and agree on acceptable output before expanding its use.')},
      ]},
      {title:'ai\nintegrations',description:'bring useful ai capabilities into your current software. connect data sources, business applications and approved models through clear, maintainable interfaces.',image:visuals[3],subFeatures:[
        {title:'connected applications',description:rich('connect your crm, spreadsheets, databases and business tools through their supported interfaces. keep records moving without repeated copy and paste.')},
        {title:'controlled ai agents',description:rich('where a task calls for several steps, we can build an agent with defined tools, permissions and limits. sensitive actions can require a person’s approval.')},
        {title:'data access',description:rich('define which information a system needs and who can access its results. keep permissions and data handling part of the design from the beginning.')},
      ]},
      {title:'ongoing\nengineering',description:'keep improving after the first release. we maintain automations, extend capabilities and adapt the software as your team, tools and requirements change.',image:visuals[4],subFeatures:[
        {title:'deployment and monitoring',description:rich('put the system into its working environment, monitor the important steps and make failures visible so they can be investigated and resolved.')},
        {title:'maintenance and support',description:rich('keep integrations and workflows working as external services change. support responsibilities and response expectations are defined in the project scope.')},
        {title:'continuous improvement',description:rich('review how the system is used, listen to the team and prioritize the next useful improvement. build on evidence rather than adding features for their own sake.')},
      ]},
    ],
  },
  // The inherited horizontal testimonial layout now contains illustrative use
  // cases. These are not customer quotes or claims of completed client work.
  'sanity-R6HclJyOjR':{
    _id:'home-testimonials',_type:'testimonialsSection',sectionTitle:'where we can help',
    testimonials:[
      {author:'document processing',quote:'from a full inbox to structured records.',quoteDescription:'extract the relevant details from incoming documents, check required fields and send the result to the right system for review.'},
      {author:'operations',quote:'fewer handoffs. clearer next steps.',quoteDescription:'route requests, trigger updates and keep the people involved informed without asking someone to coordinate every step manually.'},
      {author:'reporting',quote:'information ready when you need it.',quoteDescription:'collect data from approved sources, prepare recurring reports and flag exceptions so the team can focus on what has changed.'},
      {author:'internal knowledge',quote:'find an answer in your own information.',quoteDescription:'build searchable internal tools around your documents, with source references and access controls that match your organization.'},
      {author:'customer operations',quote:'sort the routine. surface the important.',quoteDescription:'classify incoming requests, prepare draft responses and route complex cases to the people who can resolve them.'},
      {author:'connected tools',quote:'one workflow across several systems.',quoteDescription:'keep records aligned across applications and replace repeated copying with integrations that follow your business rules.'},
      {author:'data preparation',quote:'clean inputs for better decisions.',quoteDescription:'standardize records, identify missing information and organize the data before it moves into the next stage of your process.'},
      {author:'team tools',quote:'software shaped around the work.',quoteDescription:'give your team a focused interface to manage reviews, act on results and see the state of a process in one place.'},
      {author:'custom development',quote:'start with the bottleneck.',quoteDescription:'bring us a process that is slow, repetitive or difficult to scale. we will work with you to define a practical software solution.'},
    ],
  },
  'sanity-3cf9ZrerVg':{
    _id:'home-subscriptions',_type:'subscriptionsSection',label:'two ways to work with quanta',headline:'built for your next step',
    description:'an ongoing engineering partner or a solution for one specific challenge. we define the scope around your business, then build what is useful.',cta:cta(''),
    plans:[
      {name:'ongoing ai development',priceLabel:'an engineering partner',note:'workflow automation, ai integrations, internal tools and continuous improvements — with maintenance and technical support defined around your needs. contact us for scope and pricing.',highlight:null,cta:cta()},
      {name:'custom ai solution',priceLabel:'built for your business',note:'we understand your process, identify automation opportunities, design and develop the system, integrate it into your workflow, deploy it and improve it as your needs evolve. contact us for scope and pricing.',highlight:null,cta:cta()},
    ],
  },
  'sanity-rQ0VsJec8G':{
    _id:'about-intro',_type:'aboutIntroSection',sectionTitle:'about quanta',headline:{line1:'built around',line2:'real business',line3:'problems'},
    description:rich('quanta is an ai development and automation company. we build software around the repetitive work, disconnected tools and slow processes that cost businesses time.','we start by understanding how your team works. then we combine software development, ai and integrations to create a system that fits your operation.','our focus is practical: less manual effort, clearer information and tools that people can rely on.'),backgroundImages:visuals.slice(0,3),callToAction:{text:'',url:'/contact'},
  },
  'sanity-0NY6cQqjeq':{
    _id:'about-membership',_type:'aboutMembershipSection',backgroundImage:systems,sectionTitle:'how we\nengineer',headline:'good systems begin with a clear understanding of the work.',subtitle:'three principles guide how we approach each project.',insightsTitle:'our approach',
    insights:[{text:'understand the process before choosing the technology.'},{text:'build for the people who will use the system.'},{text:'make it dependable, then keep improving.'}],
  },
  'sanity-LZiTgcvNqi':{
    _id:'about-insights',_type:'aboutInsightsSection',insights:[
      {backgroundImage:workflow,headline:'understand the process before choosing the technology.',description:rich('we begin with the inputs, decisions, handoffs and exceptions. the goal is to find a useful improvement, not a reason to add ai.'),details:[...rich('first, we establish:'),...bullets(['where time is being spent','which tasks are repetitive','what information the system needs','how a better outcome will be measured'])],sourcesTitle:'what this means',sources:[{author:'discovery',year:'',title:'a shared view of the current workflow and its constraints.',url:null},{author:'scope',year:'',title:'a specific problem, an agreed outcome and a practical first release.',url:null}],loadMoreButton:{text:'discuss your process',url:'/contact'}},
      {backgroundImage:systems,headline:'build for the people who will use the system.',description:rich('automation should remove unnecessary work and make the remaining work easier. we design around the team, its tools and the decisions that still require a person.'),details:[...rich('we design for:'),...bullets(['clear interfaces and responsibilities','human review for important decisions','integration with existing tools','understandable results and source information'])],sourcesTitle:'what this means',sources:[{author:'collaboration',year:'',title:'feedback from the people closest to the work shapes the software.',url:null},{author:'control',year:'',title:'permissions, approval steps and exceptions are part of the workflow.',url:null}],loadMoreButton:{text:'discuss your workflow',url:'/contact'}},
      {backgroundImage:visuals[4],headline:'make it dependable, then keep improving.',description:rich('we test with representative inputs, define useful checks and make the system’s behavior visible. deployment is followed by learning and improvement.'),details:[...rich('we plan for:'),...bullets(['testing against real workflow examples','visible failures and recovery paths','documentation and a clear handover','maintenance as requirements change'])],sourcesTitle:'what this means',sources:[{author:'delivery',year:'',title:'a working system with agreed checks and documentation.',url:null},{author:'evolution',year:'',title:'a focused improvement plan informed by how the system is used.',url:null}],loadMoreButton:{text:'discuss your requirements',url:'/contact'}},
    ],
  },
  'sanity-tU9tXQrhh6':{
    _id:'about-founder',_type:'aboutFounderSection',sectionTitle:'meet the founder',founderName:'south',
    bioParagraph1:'south founded quanta to build practical technology around real business needs.',
    bioParagraph2:'his focus is combining software development and ai to solve operational problems — engineering useful systems that reduce unnecessary manual work and help teams spend their time where it matters.',
    mainPortrait:{alt:'south, founder of quanta',asset:{_id:'/DSC_2898.JPG.jpeg',url:'/DSC_2898.JPG.jpeg',metadata:{dimensions:{width:4024,height:6048}}}},workspaceImage:diagram('engineering','a considered system architecture with connected components'),socialMediaLinks:null,
  },
  'sanity-Ijcd9nZe0t':{
    backgroundImage:null,headline:{line1:'a better way to work',line2:'starts with understanding it'},pretitle:'our engineering philosophy',primaryButton:cta(''),secondaryButton:cta(''),
  },
  'sanity-BRXXtfZ2Io':{
    _id:'about-process',_type:'aboutProcessSection',backgroundGradient:{endColor:'#6b8e6b',startColor:'#2d4a2d'},
    headline:{line1:'understand',line2:'build, test',line3:'improve'},
    description:'useful software comes from careful observation, focused experiments and thoughtful engineering. we start small, test the difficult parts and improve the system with the people who use it.',
    callToActionButton:{showIcon:false,text:'',url:'/contact'},decorativeElement:{alt:'connected software components',asset:null},glowEffect:{intensity:.3,position:'bottom-right'},
  },
  'sanity-hvXIMglF5S':{
    _id:'home-community',_type:'communitySection',backgroundImages:visuals,
    headline:'bring us the problem worth solving',description:rich('whether you have a defined project or a process that needs a closer look, we would like to understand it. tell us what your team does, where the work gets stuck and what better would look like.'),
    featuresList:['built around your workflow','clear project scope','people stay in control','documented systems','room to evolve'],primaryButton:cta('join us'),secondaryButton:cta(''),
  },
  'sanity-MqQLUEMtU9':{
    _id:'about-faqs',_type:'aboutFaqsSection',sectionTitle:'questions, answered',faqs:[
      {question:'what does quanta build?',answer:rich('we build ai-powered software, workflow automations, internal tools and integrations for businesses. the solution can be a focused automation or a custom application built around your process.'),isExpanded:false},
      {question:'do we need to know exactly what to automate?',answer:rich('no. you can start with a process that takes too long or creates repetitive work. we examine the workflow with you and identify where software or ai could make a practical difference.'),isExpanded:false},
      {question:'can you work with our existing software?',answer:rich('we assess your tools, data and available interfaces during discovery. wherever practical, we integrate with the systems your team already uses rather than introducing unnecessary replacements.'),isExpanded:false},
      {question:'how are projects scoped and priced?',answer:rich('scope and pricing depend on the workflow, integrations and ongoing support required. we offer ongoing ai development and custom solutions. contact us to discuss your requirements and define an appropriate engagement.'),isExpanded:false},
      {question:'what happens after the system is deployed?',answer:rich('we define the handover, documentation, maintenance and support arrangements with you. the system can then be improved as your team learns from it and your business requirements evolve.'),isExpanded:false},
    ],
  },
  'sanity-ABfqmSee7p':{
    _id:'contact-content',_type:'contactContentSection',contactImage:visuals[2],sectionTitle:'contact quanta',heading:'what slows\nyou down?',
    description:'tell us about your business, the process you want to improve and the tools your team uses. we can work out the next step together.',
    formFields:{emailLabel:'work email',nameLabel:'your name',messageLabel:'tell us about your workflow'},
    messages:{error:'your inquiry could not be sent. please try again.',success:'thank you. your inquiry has been sent.'},privacyPolicy:{text:'i have read the',linkText:'privacy notice',linkUrl:'/legal'},submitButton:{default:'send inquiry',loading:'sending…'},validation:{emailInvalid:'please enter a valid email address.',privacyRequired:'please confirm you have read the privacy notice.',required:'please complete this field.'},
  },
};

// This notice describes the website and inquiry workflow. Commercial project
// terms are agreed with each client; no legal entity details are fabricated.
const policy=(title,parts)=>({title,lastUpdated:'september 2026',content:parts.flatMap(([heading,text])=>[block(heading,'h3'),block(text)])});
data['sanity-4lKNTEEciw']={
  metadata:{title:'privacy & terms | quanta',description:site.description},
  termsOfUse:policy('working with quanta',[
    ['about this website','quanta builds ai-powered software, workflow automations and custom business solutions. this website introduces our capabilities and provides a way to discuss a potential project.'],
    ['project agreements','the scope, deliverables, fees, payment schedule, intellectual property arrangements and support responsibilities for an engagement are agreed in writing before work begins. an inquiry does not create a project agreement.'],
    ['your information','please provide information you are authorized to share. do not include passwords, access tokens or sensitive customer records in an initial inquiry. we can discuss a suitable way to exchange project material when needed.'],
    ['website content','the descriptions on this website explain the work we can undertake. illustrative workflows are examples, not customer testimonials or guarantees of a specific result.'],
  ]),
  privacyPolicy:policy('privacy notice',[
    ['inquiries','the contact experience requests your name, email address and a description of your workflow so that quanta can discuss your inquiry. only include information relevant to that conversation.'],
    ['how information is used','inquiry information is used to understand your requirements and communicate with you about potential work. project-specific data handling and access requirements are discussed separately.'],
    ['website analytics','this website does not run advertising trackers or google analytics. the hosting provider may process technical request information needed to deliver and secure the website.'],
    ['questions about your information','use the contact page to ask about information you have shared with quanta or to request its correction or removal.'],
  ]),
  cookiePolicy:policy('website storage',[
    ['essential functions','the website uses locally hosted fonts, images and scripts. hosting access controls may use essential cookies when the website is viewed through a private preview.'],
    ['your choices','you can manage cookies and site storage in your browser. restricting essential functions may affect access to a private preview.'],
  ]),
  refundPolicy:policy('scope and commercial terms',[
    ['ongoing development','an ongoing engagement can include ai development, workflow automation, integrations, maintenance and support. priorities and responsibilities are agreed for that engagement.'],
    ['custom solutions','a custom engagement is scoped around a defined business requirement. delivery stages, acceptance criteria, changes and cancellation arrangements are specified in the project agreement.'],
    ['discuss your requirements','contact quanta to work through the scope and pricing for your business. there are no fixed packages or automated purchases on this website.'],
  ]),
};

export const routeKeys={
  '/':['sanity-83EC1Vnfgb','sanity-lJDHgocMvY','sanity-R6HclJyOjR','sanity-3cf9ZrerVg','sanity-JT0kWakLg4','sanity-HfYZGxTrQA'],
  '/about':['sanity-9bl2UomZQv','sanity-0NY6cQqjeq','sanity-rQ0VsJec8G','sanity-LZiTgcvNqi','sanity-tU9tXQrhh6','sanity-Ijcd9nZe0t','sanity-BRXXtfZ2Io','sanity-hvXIMglF5S','sanity-MqQLUEMtU9'],
  '/contact':['sanity-O5qbKiK5cn','sanity-ABfqmSee7p'],
  '/legal':['sanity-4lKNTEEciw','sanity-ROEJnGK6rN'],
};
