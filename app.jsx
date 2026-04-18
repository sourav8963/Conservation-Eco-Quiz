import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Sparkles, 
  Anchor, 
  BookOpen, 
  Globe, 
  Activity, 
  TreePine, 
  ShoppingBag, 
  TrendingUp, 
  PieChart, 
  Factory, 
  Briefcase, 
  Scale, 
  Fingerprint, 
  HeartHandshake, 
  Sliders, 
  Play, 
  Layers, 
  ArrowRight, 
  ChevronRight, 
  Trophy, 
  RefreshCcw, 
  Home, 
  Menu, 
  X, 
  Timer, 
  Check, 
  Bookmark, 
  AlertCircle, 
  CheckCircle 
} from 'lucide-react';

// --- QUIZ CONTENT DATA ---
const QUIZ_DATA = {
  0: { title: "Week 0: Foundation", icon: Anchor, questions: [
    { q: "Which of these is true?", options: ["Wants are unlimited, resources are unlimited", "Wants are limited, resources are limited", "Wants are unlimited, resources are limited", "Wants are limited, resources are unlimited"], answer: "Wants are unlimited, resources are limited" },
    { q: "The property of society getting the most it can from its scarce resources is a definition of:", options: ["efficiency", "equality", "prudence", "sustainability"], answer: "efficiency" },
    { q: "Something that induces a person to act is a definition of:", options: ["enticement", "attraction", "incentive", "occupation"], answer: "incentive" },
    { q: "Input costs that require an outlay of money are:", options: ["explicit costs", "implicit costs", "opportunity costs", "phantom costs"], answer: "explicit costs" },
    { q: "The ability of an individual to own and exercise control over scarce resources is:", options: ["property rights", "resource rights", "individual rights", "social rights"], answer: "property rights" },
    { q: "Whatever must be given up to obtain some item is a definition of:", options: ["explicit costs", "implicit costs", "opportunity costs", "phantom costs"], answer: "opportunity costs" },
    { q: "Most of rational thinking occurs:", options: ["before the margin", "at the margin", "after the margin", "none of these"], answer: "at the margin" },
    { q: "Rational decision making compares:", options: ["average benefits to average costs", "average benefits to marginal costs", "marginal benefits to average costs", "marginal benefits to marginal costs"], answer: "marginal benefits to marginal costs" },
    { q: "An economy that allocates resources through decentralized decisions is:", options: ["urban economy", "rural economy", "planned economy", "market economy"], answer: "market economy" },
    { q: "The ability to produce a good at a lower opportunity cost is:", options: ["real advantage", "monetary advantage", "comparative advantage", "opportunity advantage"], answer: "comparative advantage" }
  ]},
  1: { title: "Week 1: Intro & Roots", icon: BookOpen, questions: [
    { q: "In the word root for conservation, 'servare' stands for:", options: ["together", "to keep", "house", "manage"], answer: "to keep" },
    { q: "Phillips curve shows the relation between:", options: ["profit and loss", "market price and selling price", "inflation and unemployment rate", "electricity consumption and output"], answer: "inflation and unemployment rate" },
    { q: "The ability of a single actor to have a substantial influence on market prices is:", options: ["price power", "market power", "externality", "economic power"], answer: "market power" },
    { q: "An increase in the overall level of prices in the economy is:", options: ["inflation", "deflation", "stagflation", "pro-inflation"], answer: "inflation" },
    { q: "In the word root for conservation, 'con' stands for:", options: ["together", "to keep", "house", "manage"], answer: "together" },
    { q: "Input costs that do not require an outlay of money are:", options: ["explicit costs", "implicit costs", "opportunity costs", "phantom costs"], answer: "implicit costs" },
    { q: "In the word root for Economics, 'nemein' stands for:", options: ["together", "to keep", "house", "manage"], answer: "manage" },
    { q: "Distributing economic prosperity uniformly among members is:", options: ["efficiency", "equality", "prudence", "sustainability"], answer: "equality" },
    { q: "In the word root for Economics, 'oikos' stands for:", options: ["together", "to keep", "house", "manage"], answer: "house" },
    { q: "Fluctuations in economic activity are referred to as:", options: ["business cycles", "economic cycles", "production cycles", "market cycles"], answer: "business cycles" }
  ]},
  2: { title: "Week 2: Sustainability", icon: Globe, questions: [
    { q: "Which of these is a pillar of sustainability?", options: ["social sustainability", "industrial sustainability", "agricultural sustainability", "trans-boundary sustainability"], answer: "social sustainability" },
    { q: "Which of these is NOT a pillar of sustainability?", options: ["environmental sustainability", "economic sustainability", "trans-boundary sustainability", "social sustainability"], answer: "trans-boundary sustainability" },
    { q: "Which of these is a positive check according to Malthus?", options: ["late marriage", "war", "celibacy", "moral restraint"], answer: "war" },
    { q: "The Trinity explosion of 1945 is taken as the beginning of the:", options: ["Holocene", "Cenozoic", "Anthropocene", "Neozoic"], answer: "Anthropocene" },
    { q: "The demographic transition sees a society move from:", options: ["high birth/low death to low birth/high death", "low birth/high death to low birth/low death", "high birth/high death to low birth/low death", "high birth/high death to low birth/high death"], answer: "high birth/high death to low birth/low death" },
    { q: "The logistic growth equation curve is:", options: ["J-shaped", "S-shaped", "U-shaped", "L-shaped"], answer: "S-shaped" },
    { q: "According to Malthusian model, population grows in:", options: ["geometric progression", "arithmetic progression", "exponential decay", "harmonic progression"], answer: "geometric progression" },
    { q: "The book 'An Essay on the Principle of Population' was written by:", options: ["Darwin", "Malthus", "Spencer", "Dawkins"], answer: "Malthus" },
    { q: "The quantum of human impacts can be written as:", options: ["I = P + A + T", "I = P x A x T", "I = P / (A x T)", "I = P + A x T"], answer: "I = P x A x T" },
    { q: "Which of these is a preventive check according to Malthus?", options: ["foresight", "vice", "misery", "flood"], answer: "foresight" }
  ]},
  3: { title: "Week 3: Assessment", icon: Activity, questions: [
    { q: "The potential or capacity of a material to have adverse effects is:", options: ["vulnerability", "susceptibility", "sustainability", "toxicity"], answer: "toxicity" },
    { q: "Which determines if projects require a full or partial impact assessment study?", options: ["screening", "scoping", "reporting", "review"], answer: "screening" },
    { q: "Macrodebris in plastic context has fragments of size:", options: ["> 20 mm", "5 - 20 mm", "< 5 mm", "< 1 mm"], answer: "> 20 mm" },
    { q: "Any changes in systems that inadvertently increase vulnerability to climate stimuli is:", options: ["adaptation", "mitigation", "maladaptation", "malmitigation"], answer: "maladaptation" },
    { q: "The extent to which a chemical is available for uptake into an organism is:", options: ["traceability", "bioaccumulation", "biomagnification", "bioavailability"], answer: "bioavailability" },
    { q: "Hydrocarbons derived directly from mineral oils are:", options: ["petrogenic", "pyrogenic", "biogenic", "chemogenic"], answer: "petrogenic" },
    { q: "The 'relative effect of exposure' is:", options: ["vulnerability", "sensitivity", "sustainability", "toxicity"], answer: "sensitivity" },
    { q: "Increasing concentration of a substance at higher levels in a food chain is:", options: ["traceability", "bioaccumulation", "biomagnification", "bio-response"], answer: "biomagnification" },
    { q: "Mesodebris in plastic context has fragments of size:", options: ["> 20 mm", "5 - 20 mm", "< 5 mm", "< 1 mm"], answer: "5 - 20 mm" },
    { q: "What is used to identify which potential impacts are relevant to assess?", options: ["screening", "scoping", "reporting", "review"], answer: "scoping" }
  ]},
  4: { title: "Week 4: Ecology", icon: TreePine, questions: [
    { q: "Which of these is NOT a physical factor of habitat?", options: ["soil", "moisture", "predators", "temperature"], answer: "predators" },
    { q: "Process of habitat fragmentation and loss:", options: ["Forest->Dissection->Perforation->Fragmentation->Attrition", "Forest->Attrition->Fragmentation->Perforation", "Forest->Dissection->Perforation->Attrition", "Forest->Fragmentation->Attrition"], answer: "Forest->Dissection->Perforation->Fragmentation->Attrition" },
    { q: "A root-mean-treatment plant is an example of:", options: ["phytoremediation", "biological control", "biomagnification", "bioaccumulation"], answer: "phytoremediation" },
    { q: "Liebig's law: rate is limited by factor in:", options: ["least amount", "maximum amount", "tolerance limits", "ambient levels"], answer: "least amount" },
    { q: "Movements of individuals away from home to survive/reproduce is:", options: ["immigration", "migration", "dispersal", "drifting"], answer: "dispersal" },
    { q: "Which of these is a stochastic factor?", options: ["birth rate", "death rate", "population structure", "environmental fluctuation"], answer: "environmental fluctuation" },
    { q: "The movement of lions across the Gir landscape is:", options: ["diffusion", "secular dispersal", "jump dispersal", "drifting"], answer: "diffusion" },
    { q: "The acronym HIPPO does NOT include:", options: ["habitat loss", "invasive species", "pollution", "pollinator"], answer: "pollinator" },
    { q: "Growing vegetables under teak plantation but the plants died. This is:", options: ["autophagy", "stenophagy", "auto-toxicity", "allelopathy"], answer: "allelopathy" },
    { q: "Regular seasonal movement of animals along fixed routes is:", options: ["immigration", "migration", "dispersal", "drifting"], answer: "migration" }
  ]},
  5: { title: "Week 5: Goods", icon: ShoppingBag, questions: [
    { q: "Fire protection is a:", options: ["private good", "club good", "common resource", "public good"], answer: "club good" },
    { q: "Ability to produce a good using fewer inputs is:", options: ["comparative advantage", "absolute advantage", "production advantage", "resource advantage"], answer: "absolute advantage" },
    { q: "Which is NOT a method of internalizing externalities?", options: ["permits", "charity", "control policies", "free market"], answer: "free market" },
    { q: "Public goods are:", options: ["excludable, rival", "non-excludable, rival", "excludable, non-rival", "non-excludable, non-rival"], answer: "non-excludable, non-rival" },
    { q: "Club goods are:", options: ["excludable, rival", "non-excludable, rival", "excludable, non-rival", "non-excludable, non-rival"], answer: "excludable, non-rival" },
    { q: "Impact of one person's actions on a bystander is:", options: ["actor-observer", "externality", "internality", "benefit principle"], answer: "externality" },
    { q: "A simplified description of a system or process is a:", options: ["equation", "model", "philosophy", "process"], answer: "model" },
    { q: "A measure of happiness or satisfaction is:", options: ["utility", "safety", "credits", "value"], answer: "utility" },
    { q: "Clothing is a:", options: ["private good", "club good", "common resource", "public good"], answer: "private good" },
    { q: "Private goods are:", options: ["excludable, rival", "non-excludable, rival", "excludable, non-rival", "non-excludable, non-rival"], answer: "excludable, rival" }
  ]},
  6: { title: "Week 6: Supply & Demand", icon: TrendingUp, questions: [
    { q: "The claim that quantity supplied of a good rises when price rises is:", options: ["law of demand", "law of supply", "quantity law", "none"], answer: "law of supply" },
    { q: "Table showing relation between price and quantity supplied is:", options: ["demand table", "demand schedule", "supply table", "supply schedule"], answer: "supply schedule" },
    { q: "Coffee powder and sugar are:", options: ["substitutes", "complements", "club goods", "public goods"], answer: "complements" },
    { q: "A graph of the relationship between price and quantity demanded is:", options: ["demand curve", "supply curve", "Laffer curve", "Phillips curve"], answer: "demand curve" },
    { q: "Measure of supply response to change in price is:", options: ["price elasticity demand", "income elasticity", "cross-price", "price elasticity supply"], answer: "price elasticity supply" },
    { q: "Good where income increase leads to demand increase:", options: ["normal", "inferior", "Giffen", "common"], answer: "normal" },
    { q: "Measure of demand response to price of another good is:", options: ["PED", "IED", "XED", "PES"], answer: "XED" },
    { q: "A graph of relation between price and quantity supplied is:", options: ["demand curve", "supply curve", "Laffer curve", "Phillips curve"], answer: "supply curve" },
    { q: "A legal minimum on the price is:", options: ["price ceiling", "price floor", "selling ceiling", "selling floor"], answer: "price floor" },
    { q: "Table showing relation between price and quantity demanded is:", options: ["demand table", "demand schedule", "supply table", "supply schedule"], answer: "demand schedule" }
  ]},
  7: { title: "Week 7: Surplus", icon: PieChart, questions: [
    { q: "Laffer curve shows relationship between:", options: ["inflation/unemp", "tax size/revenue", "PS/CS", "tax/DWL"], answer: "tax size/revenue" },
    { q: "Buyer willingness - price paid is:", options: ["CS", "PS", "TS", "DWL"], answer: "CS" },
    { q: "Fall in total surplus from market distortion is:", options: ["CS", "PS", "TS", "DWL"], answer: "DWL" },
    { q: "Seller payment - seller cost is:", options: ["CS", "PS", "TS", "DWL"], answer: "PS" },
    { q: "Maximum amount a buyer will pay is:", options: ["WTP", "demand", "marginal value", "surplus"], answer: "WTP" },
    { q: "Imposition of tariff:", options: ["increases PS/Gov Rev", "increases CS/Gov Rev", "increases all", "increases TS"], answer: "increases PS/Gov Rev" },
    { q: "Area between supply curve and price is:", options: ["CS", "PS", "TS", "DWL"], answer: "PS" },
    { q: "Value to buyers - Cost to sellers is:", options: ["CS", "PS", "TS", "DWL"], answer: "TS" },
    { q: "Price of good in world market is:", options: ["export", "import", "world price", "domestic"], answer: "world price" },
    { q: "Area between demand curve and price is:", options: ["CS", "PS", "TS", "DWL"], answer: "CS" }
  ]},
  8: { title: "Week 8: Production", icon: Factory, questions: [
    { q: "For a positive production externality:", options: ["SMC=PMC", "SMC=PMC-MD", "SMC=PMC+MD", "SMC=PMC/MD"], answer: "SMC=PMC-MD" },
    { q: "Direct benefit to consumers of consuming additional unit:", options: ["PMC", "SMC", "PMB", "SMB"], answer: "PMB" },
    { q: "Loud music is an example of:", options: ["neg prod", "pos prod", "neg cons", "pos cons"], answer: "neg cons" },
    { q: "Indiv consumption reduces well-being of others:", options: ["neg prod", "pos prod", "neg cons", "pos cons"], answer: "neg cons" },
    { q: "Firm production reduces well-being of others:", options: ["neg prod", "pos prod", "neg cons", "pos cons"], answer: "neg prod" },
    { q: "Vaccination is an example of:", options: ["neg prod", "pos prod", "neg cons", "pos cons"], answer: "pos cons" },
    { q: "Firm production increases well-being of others:", options: ["neg prod", "pos prod", "neg cons", "pos cons"], answer: "pos prod" },
    { q: "For a positive consumption externality:", options: ["SMB=PMB", "SMB=PMB-MD", "SMB=PMB+MD", "SMB=PMB/MD"], answer: "SMB=PMB+MD" },
    { q: "For a negative consumption externality:", options: ["SMB=PMB", "SMB=PMB-MD", "SMB=PMB+MD", "SMB=PMB/MD"], answer: "SMB=PMB-MD" },
    { q: "For a negative production externality:", options: ["SMC=PMC+MD", "SMC=PMC-MD", "SMC=PMC", "SMC=PMC/MD"], answer: "SMC=PMC+MD" }
  ]},
  9: { title: "Week 9: Firm Costs", icon: Briefcase, questions: [
    { q: "Increase in total cost from extra unit produced:", options: ["fixed", "variable", "marginal", "sunk"], answer: "marginal" },
    { q: "Increase in output from extra unit of input:", options: ["marginal product", "profit", "loss", "cost"], answer: "marginal product" },
    { q: "Monopoly firm profit:", options: ["(P-ATC)*Q", "(P-Q)*ATC", "(ATC-Q)*P", "(P+Q)-ATC"], answer: "(P-ATC)*Q" },
    { q: "True for competitive firm:", options: ["P=MR", "P=MC", "MR=MC", "All"], answer: "All" },
    { q: "Relation between input quantity and output quantity:", options: ["Laffer", "Phillips", "Production function", "Output"], answer: "Production function" },
    { q: "Total revenue - total cost (explicit + implicit):", options: ["econ profit", "acc profit", "profit", "loss"], answer: "econ profit" },
    { q: "Single firm cost < many firms cost:", options: ["natural monopoly", "artificial", "oligopoly", "duopoly"], answer: "natural monopoly" },
    { q: "True for monopoly:", options: ["P>MR", "MR>MC", "MC>P", "MC>MR"], answer: "P>MR" },
    { q: "Costs not varying with output quantity:", options: ["fixed", "variable", "marginal", "sunk"], answer: "fixed" },
    { q: "Total revenue - total explicit cost:", options: ["econ profit", "acc profit", "profit", "loss"], answer: "acc profit" }
  ]},
  10: { title: "Week 10: Philosophy", icon: Scale, questions: [
    { q: "Policies chosen by impartial observer behind 'veil of ignorance':", options: ["Utilitarianism", "Liberalism", "Libertarianism", "Socialism"], answer: "Liberalism" },
    { q: "Severe deprivation of basic human needs:", options: ["absolute poverty", "relative", "median", "line"], answer: "absolute poverty" },
    { q: "Absolute level of income set by gov below which family is in poverty:", options: ["deprivation line", "poverty line", "index", "formula"], answer: "poverty line" },
    { q: "Above-equilibrium wages paid to increase productivity:", options: ["compensating", "efficiency wage", "productivity", "retention"], answer: "efficiency wage" },
    { q: "Wage difference to offset nonmonetary char of jobs:", options: ["diff differential", "compensating differential", "integral", "rate"], answer: "compensating differential" },
    { q: "Absolute poverty depends on income AND access to services:", options: ["True", "False", "Partially", "None"], answer: "True" },
    { q: "Household income < median income:", options: ["absolute", "relative poverty", "median", "poverty line"], answer: "relative poverty" },
    { q: "Equipment and structures used to produce goods:", options: ["tools", "machinery", "capital", "factors"], answer: "capital" },
    { q: "Competitive firm rental price equals:", options: ["VMP", "<VMP", ">VMP", "VAP"], answer: "VMP" },
    { q: "Gov punishes crimes but doesn't redistribute income:", options: ["Utilitarianism", "Liberalism", "Libertarianism", "Socialism"], answer: "Libertarianism" }
  ]},
  11: { title: "Week 11: Info Economics", icon: Fingerprint, questions: [
    { q: "Buyer at risk of low quality goods:", options: ["adverse selection", "moral hazard", "asymmetric info", "none"], answer: "adverse selection" },
    { q: "Consumption change when price change moves consumer to higher curve:", options: ["income effect", "substitution", "indifference", "budget"], answer: "income effect" },
    { q: "NOT a property of indifference curves:", options: ["higher preferred", "downward", "cross at right angles", "bowed inward"], answer: "cross at right angles" },
    { q: "Action by informed party to reveal info to uninformed:", options: ["signaling", "screening", "informing", "heuristics"], answer: "signaling" },
    { q: "Actual resources that can be developed profitably in future:", options: ["potential", "actual", "reserve resources", "stock"], answer: "reserve resources" },
    { q: "Curve showing bundles giving same satisfaction:", options: ["consumption", "satisfaction", "indifference curve", "budget"], answer: "indifference curve" },
    { q: "Rate at which consumer trades one good for another:", options: ["MRS", "MRE", "MRT", "MRTr"], answer: "MRS" },
    { q: "Ram not cleaning properly => Ram must be lazy:", options: ["confirmation", "halo", "horn effect", "priming"], answer: "horn effect" },
    { q: "Mental shortcut justifying increased investment based on prior investment:", options: ["affect", "avail", "effort", "escalation of commitment"], answer: "escalation of commitment" },
    { q: "Resources that MAY be used in the future:", options: ["potential resources", "actual", "reserve", "stock"], answer: "potential resources" }
  ]},
  12: { title: "Week 12: Ecosystem", icon: HeartHandshake, questions: [
    { q: "Cryo-banking is:", options: ["in-situ cons", "ex-situ conservation", "in-situ pres", "ex-situ pres"], answer: "ex-situ conservation" },
    { q: "Biological pest control is:", options: ["provisioning", "regulating service", "supporting", "cultural"], answer: "regulating service" },
    { q: "Zoo is an example of:", options: ["in-situ", "ex-situ conservation", "pres", "none"], answer: "ex-situ conservation" },
    { q: "Elephant regulates ecosystem and people relate to it:", options: ["umbrella", "keystone", "flagship", "all of the above"], answer: "all of the above" },
    { q: "Wildlife includes animal which forms part of any:", options: ["ecosystem", "state", "country", "habitat"], answer: "habitat" },
    { q: "Tiger regulates ecosystem through herbivore control:", options: ["umbrella", "keystone", "flagship", "all of the above"], answer: "all of the above" },
    { q: "Cost of impacts caused by CO2 emission:", options: ["carbon cost", "econ carbon", "social cost of carbon", "cultural"], answer: "social cost of carbon" },
    { q: "Soil formation is:", options: ["provisioning", "regulating", "supporting service", "cultural"], answer: "supporting service" },
    { q: "Witness orchids classification:", options: ["umbrella", "keystone", "flagship species", "indicator"], answer: "flagship species" },
    { q: "Nutrient cycling is:", options: ["provisioning", "regulating", "supporting service", "cultural"], answer: "supporting service" }
  ]}
};

// --- STYLES ---
const darkThemeClasses = {
  main: "min-h-screen bg-[#020617] text-slate-100 flex flex-col relative overflow-x-hidden",
  glass: "bg-white/[0.02] backdrop-blur-3xl border border-white/10 shadow-2xl",
  blob: "absolute rounded-full blur-[120px] pointer-events-none z-0 opacity-40",
  option: "w-full text-left p-6 rounded-3xl border flex items-center justify-between group transition-all duration-200",
  sidebar: "fixed top-0 left-0 h-full w-80 z-[100] transition-transform duration-500 border-y-0 border-l-0 shadow-[20px_0_40px_rgba(0,0,0,0.4)]",
  nav: "sticky top-0 z-[60] bg-[#020617]/90 backdrop-blur-xl border-b border-white/5 px-6 py-4",
};

// --- COMPONENT ---
export default function App() {
  const [view, setView] = useState('home');
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [customSelection, setCustomSelection] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isShuffled, setIsShuffled] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [sessionTitle, setSessionTitle] = useState("");

  const timerRef = useRef(null);

  // Helper: Shuffle Array
  const shuffleArray = (array) => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  // Helper: Time Format
  const formatTime = (s) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h > 0 ? h + ':' : ''}${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  // Logic: Start Quiz
  const startQuiz = (weekKey) => {
    let rawQuestions = [];
    let title = "";

    if (weekKey === 'all') {
      Object.keys(QUIZ_DATA).forEach(k => rawQuestions = [...rawQuestions, ...QUIZ_DATA[k].questions]);
      title = "Semester Mega Quiz";
    } else if (Array.isArray(weekKey)) {
      weekKey.sort((a, b) => a - b).forEach(k => rawQuestions = [...rawQuestions, ...QUIZ_DATA[k].questions]);
      title = "Custom Batch: " + weekKey.map(w => "W" + w).join(", ");
    } else {
      rawQuestions = QUIZ_DATA[weekKey].questions;
      title = QUIZ_DATA[weekKey].title;
    }

    let prepared = rawQuestions.map(q => ({
      ...q,
      displayOptions: isShuffled ? shuffleArray(q.options) : q.options
    }));

    if (isShuffled) prepared = shuffleArray(prepared);

    setQuizQuestions(prepared);
    setSelectedWeek(weekKey);
    setUserAnswers({});
    setMarkedForReview([]);
    setIsSubmitted(false);
    setTimeElapsed(0);
    setSessionTitle(title);
    setView('quiz');
    setShowSidebar(false);

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setTimeElapsed(p => p + 1), 1000);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Interaction: Logic
  const handleAnswer = (qIdx, option) => {
    if (isSubmitted) return;
    setUserAnswers(p => ({ ...p, [qIdx]: option }));
  };

  const toggleMarkForReview = (idx) => {
    setMarkedForReview(p => p.includes(idx) ? p.filter(i => i !== idx) : [...p, idx]);
  };

  const submitQuiz = () => {
    setIsSubmitted(true);
    if (timerRef.current) clearInterval(timerRef.current);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const exitToHome = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setView('home');
    setSelectedWeek(null);
  };

  const answeredCount = Object.keys(userAnswers).length;
  const reviewCount = markedForReview.length;
  const untouchedCount = quizQuestions.length - answeredCount;
  const progress = (answeredCount / quizQuestions.length) * 100;

  // --- HOME VIEW ---
  if (view === 'home') {
    return (
      <div className={darkThemeClasses.main}>
        {/* Deep Dark Animated Background Elements */}
        <div className={`${darkThemeClasses.blob} top-[-10%] left-[-10%] w-[50%] h-[50%] bg-violet-900/30 animate-pulse`}></div>
        <div className={`${darkThemeClasses.blob} bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-950/20`}></div>
        
        <div className="max-w-6xl mx-auto pt-20 px-6 pb-20 relative z-10 text-center">
          <header className="mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-900/20 border border-violet-500/30 rounded-full text-violet-300 text-xs font-bold tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
              <Sparkles size={12} className="animate-pulse" /> Conservation Economics Hub
            </div>
            <h1 className="text-6xl md:text-7xl font-black text-white mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-600">
              Mastery Hub
            </h1>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed font-light">
              Refine your expertise in sustainability and market dynamics with precise weekly evaluations.
            </p>
          </header>

          <div className={`${darkThemeClasses.glass} rounded-[3rem] p-6 md:p-10 mb-10 text-left border-white/5`}>
            {/* Parameters Header */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-12 pb-8 border-b border-white/5 gap-8">
              <div className="flex items-center gap-5">
                <div className="p-4 bg-violet-600/10 rounded-2xl border border-violet-500/20 shadow-inner">
                  <Sliders className="text-violet-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">System Parameters</h2>
                  <p className="text-slate-500 text-sm font-medium">Control randomization and session scope</p>
                </div>
              </div>
              
              <div 
                onClick={() => setIsShuffled(!isShuffled)} 
                className="flex items-center gap-4 bg-white/[0.03] p-4 px-6 rounded-2xl border border-white/10 cursor-pointer hover:bg-white/[0.05] transition-all group"
              >
                <div className="flex flex-col items-end">
                  <span className="text-sm font-bold text-white">Shuffle Mode</span>
                  <span className={`text-[10px] font-black uppercase ${isShuffled ? 'text-violet-400 shadow-[0_0_10px_rgba(167,139,250,0.5)]' : 'text-slate-500'}`}>
                    {isShuffled ? 'Activated' : 'Linear'}
                  </span>
                </div>
                <div className={`relative w-12 h-6 rounded-full transition-all duration-300 ${isShuffled ? 'bg-violet-600 shadow-[0_0_20px_rgba(139,92,246,0.4)]' : 'bg-slate-800'}`}>
                  <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 shadow-xl ${isShuffled ? 'translate-x-6' : ''}`}></div>
                </div>
              </div>
            </div>

            {/* Targeted Selection Section */}
            <div className="mb-12 bg-black/40 p-8 rounded-[2.5rem] border border-white/5 shadow-inner">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <CheckCircle size={18} className="text-violet-400" /> Selective Review
                  </h3>
                  <p className="text-slate-500 text-sm">Target specific modules for localized evaluation</p>
                </div>
                {customSelection.length > 0 && (
                  <button 
                    onClick={() => startQuiz(customSelection)} 
                    className="px-8 py-4 bg-violet-600 text-white rounded-2xl font-black text-sm hover:bg-violet-500 transition-all flex items-center gap-2 shadow-[0_10px_30px_rgba(139,92,246,0.3)] active:scale-95"
                  >
                    Launch Custom Batch ({customSelection.length})
                    <Play size={16} fill="currentColor" />
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-3">
                {Object.keys(QUIZ_DATA).map(num => (
                  <button 
                    key={num}
                    onClick={() => setCustomSelection(p => p.includes(Number(num)) ? p.filter(n => n !== Number(num)) : [...p, Number(num)])} 
                    className={`px-5 py-3 rounded-2xl border transition-all duration-300 text-sm font-bold active:scale-90 ${
                      customSelection.includes(Number(num)) 
                      ? 'bg-violet-600 border-violet-400 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]' 
                      : 'bg-white/5 border-white/5 text-slate-500 hover:border-white/20 hover:text-slate-300'
                    }`}
                  >
                    Week {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Week Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Mega Quiz Card */}
              <button 
                onClick={() => startQuiz('all')} 
                className="col-span-1 md:col-span-2 group relative p-10 border border-violet-500/20 rounded-[2.5rem] text-left overflow-hidden bg-gradient-to-br from-violet-950/10 to-transparent hover:border-violet-500/50 transition-all duration-500"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
                  <Layers size={180} />
                </div>
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="mb-12">
                    <div className="w-16 h-16 bg-violet-600 rounded-[1.5rem] flex items-center justify-center text-white mb-8 shadow-[0_15px_35px_rgba(139,92,246,0.4)] group-hover:scale-110 transition-transform">
                      <Layers size={32} />
                    </div>
                    <span className="text-[10px] font-black text-violet-400 uppercase tracking-widest bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20 shadow-inner">Cumulative Evaluation</span>
                    <h3 className="text-4xl md:text-5xl font-black text-white mt-4 tracking-tight">Full Semester Exam</h3>
                    <p className="text-slate-400 mt-4 text-lg leading-relaxed max-w-md font-light">130 questions across the entire curriculum compiled into a master review stream.</p>
                  </div>
                  <div className="flex items-center justify-between text-violet-400 font-bold mt-auto">
                    <span className="text-xs uppercase tracking-[0.2em]">Initialize Master Sequence</span>
                    <div className="w-14 h-14 rounded-2xl border border-violet-500/30 bg-violet-500/5 flex items-center justify-center group-hover:bg-violet-600 group-hover:text-white transition-all shadow-xl group-hover:shadow-violet-500/20">
                      <ArrowRight size={24} />
                    </div>
                  </div>
                </div>
              </button>

              {/* Individual Week Cards */}
              {Object.keys(QUIZ_DATA).map(num => {
                const WeekIcon = QUIZ_DATA[num].icon || BookOpen;
                return (
                  <button 
                    key={num}
                    onClick={() => startQuiz(Number(num))} 
                    className="group p-8 border border-white/5 rounded-[2.2rem] text-left flex flex-col justify-between h-[320px] bg-white/[0.02] hover:bg-white/[0.04] hover:border-violet-500/30 transition-all duration-500 hover:translate-y-[-8px] shadow-lg"
                  >
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-8">
                        <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-slate-400 border border-white/5 group-hover:bg-violet-950/30 group-hover:text-violet-400 group-hover:border-violet-500/30 transition-all shadow-inner">
                          <WeekIcon size={24} />
                        </div>
                        <div className="px-3 py-1 rounded-lg bg-black/40 border border-white/5 text-[10px] font-black text-slate-600 uppercase tracking-tighter">Module W{num}</div>
                      </div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-violet-300 transition-colors leading-tight tracking-tight">
                        {QUIZ_DATA[num].title}
                      </h3>
                    </div>
                    <div className="relative z-10 flex items-center justify-between pt-6 border-t border-white/5">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Dataset</span>
                        <span className="text-sm font-bold text-slate-400 group-hover:text-slate-100 transition-colors">10 Objectives</span>
                      </div>
                      <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-violet-500/50 group-hover:bg-violet-500/10 transition-all text-slate-500 group-hover:text-violet-400">
                        <ChevronRight size={20} />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- QUIZ VIEW ---
  return (
    <div className={darkThemeClasses.main}>
      {/* Background Glows for Quiz Screen */}
      <div className={`${darkThemeClasses.blob} top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20`}></div>

      {/* Side Menu (Obsidian Glass) */}
      <div className={`${darkThemeClasses.sidebar} bg-[#020617]/95 backdrop-blur-2xl border-white/5 ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8 border-b border-white/5 flex justify-between items-center">
          <h3 className="text-xl font-bold text-white tracking-tight">Objective Matrix</h3>
          <button onClick={() => setShowSidebar(false)} className="text-slate-500 hover:text-white transition-colors"><X size={24} /></button>
        </div>
        
        {/* Legend with Status Counters */}
        <div className="px-8 py-6 border-b border-white/5 grid grid-cols-1 gap-3 text-[10px] font-black uppercase text-left tracking-widest">
          <div className="flex items-center gap-3 text-blue-400">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)]"></div> 
            Attempted <span className="ml-auto opacity-50">{answeredCount}</span>
          </div>
          <div className="flex items-center gap-3 text-amber-400">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]"></div> 
            Review <span className="ml-auto opacity-50">{reviewCount}</span>
          </div>
          <div className="flex items-center gap-3 text-slate-500">
            <div className="w-2.5 h-2.5 rounded-full bg-white/10 border border-white/10"></div> 
            Remaining <span className="ml-auto opacity-50">{untouchedCount}</span>
          </div>
        </div>

        {/* Scrollable Question Index */}
        <div className="p-4 overflow-y-auto max-h-[calc(100vh-220px)] space-y-2 custom-scrollbar">
          {quizQuestions.map((q, i) => {
            const isAns = userAnswers[i] !== undefined;
            const isRev = markedForReview.includes(i);
            let cls = "bg-white/[0.02] text-slate-500 border-white/5";
            if (isRev) cls = "bg-amber-500/10 text-amber-200 border-amber-500/20";
            else if (isAns) cls = "bg-blue-600/10 text-blue-200 border-blue-500/20";
            
            return (
              <button 
                key={i}
                onClick={() => {
                  document.getElementById(`q-${i}`).scrollIntoView({ behavior: 'smooth', block: 'center' });
                  setShowSidebar(false);
                }} 
                className={`w-full p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all active:scale-95 ${cls}`}
              >
                <span className="w-7 h-7 rounded-lg bg-black/40 flex items-center justify-center text-[10px] font-bold border border-white/5 shadow-inner">{i+1}</span>
                <span className="text-xs truncate font-medium flex-1">{q.q}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quiz Top Navigation */}
      <nav className={darkThemeClasses.nav}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-left">
            <button onClick={() => setShowSidebar(true)} className="p-3 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 rounded-xl transition-colors shadow-inner">
              <Menu size={20} className="text-slate-300" />
            </button>
            <div className="hidden sm:block">
              <span className="text-[10px] font-black text-violet-400 uppercase tracking-[0.2em] block mb-0.5">Evaluation Phase</span>
              <h2 className="text-sm font-bold text-white tracking-wide">{sessionTitle}</h2>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-slate-900/50 border border-white/10 px-6 py-2.5 rounded-2xl font-mono font-bold text-violet-400 shadow-2xl border-white/5">
            <Timer className="animate-pulse" size={20} />
            <span className="text-xl tracking-wider">{formatTime(timeElapsed)}</span>
          </div>
        </div>
      </nav>

      {/* Main Quiz Stream */}
      <div className="max-w-4xl mx-auto w-full px-6 py-12 pb-32 relative z-10">
        {!isSubmitted ? (
          /* Real-time Progress Bar */
          <div className="sticky top-[90px] z-40 glass p-5 rounded-[2rem] mb-12 flex items-center justify-between gap-10 border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="flex-1">
              <div className="flex justify-between text-[10px] font-black uppercase text-slate-500 mb-2.5 tracking-widest">
                <span>Analytical Progress</span>
                <span className="text-violet-400">{Math.round(progress)}% Processed</span>
              </div>
              <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden border border-white/5 shadow-inner">
                <div className="bg-gradient-to-r from-violet-600 to-blue-500 h-full transition-all duration-1000 shadow-[0_0_15px_rgba(139,92,246,0.5)]" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
            <div className="hidden sm:block text-right">
              <span className="text-3xl font-black text-white">{answeredCount} <span className="text-slate-700 text-lg">/</span> {quizQuestions.length}</span>
            </div>
          </div>
        ) : (
          /* Results Score Card */
          <div className="mt-8 mb-16 animate-in zoom-in-95 duration-700">
            <div className="glass rounded-[3.5rem] p-12 md:p-20 text-center relative overflow-hidden border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.6)]">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-violet-500 to-transparent"></div>
              <div className="inline-flex items-center justify-center w-32 h-32 bg-violet-500/10 text-violet-400 border border-violet-500/20 rounded-[2.5rem] mb-8 shadow-inner ring-4 ring-white/5">
                <Trophy size={64} className="animate-bounce" />
              </div>
              <h2 className="text-5xl font-black text-white mb-4 tracking-tighter">Assessment Finalized</h2>
              <p className="text-slate-500 text-lg mb-12 font-light">Your conceptual proficiency has been calculated.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/5 text-center shadow-inner">
                  <span className="block text-4xl font-black text-violet-400 mb-2">
                    {quizQuestions.filter((q, i) => userAnswers[i] === q.answer).length}<span className="text-slate-700 text-2xl">/</span>{quizQuestions.length}
                  </span>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Points</span>
                </div>
                <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/5 text-center shadow-inner">
                  <span className="block text-4xl font-black text-white mb-2">
                    {Math.round((quizQuestions.filter((q, i) => userAnswers[i] === q.answer).length / quizQuestions.length) * 100)}%
                  </span>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Accuracy</span>
                </div>
                <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/5 text-center shadow-inner">
                  <span className="block text-4xl font-black text-blue-400 mb-2">{formatTime(timeElapsed)}</span>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Efficiency</span>
                </div>
              </div>
              
              <div className="mt-16 flex flex-wrap justify-center gap-6">
                <button onClick={() => startQuiz(selectedWeek)} className="px-10 py-4 bg-violet-600 text-white rounded-2xl font-black hover:bg-violet-500 transition-all flex items-center gap-3 shadow-[0_15px_35px_rgba(139,92,246,0.3)] active:scale-95">
                  <RefreshCcw size={20} /> Retake Sequence
                </button>
                <button onClick={exitToHome} className="px-10 py-4 bg-white/5 text-slate-300 rounded-2xl font-black hover:bg-white/10 border border-white/10 transition-all flex items-center gap-3 active:scale-95">
                  <Home size={20} /> Exit to Hub
                </button>
              </div>
            </div>
          </div>
        )}

        {/* The Questions List */}
        <div className="space-y-10 text-left">
          {quizQuestions.map((q, idx) => {
            const activeAns = userAnswers[idx];
            const isMarked = markedForReview.includes(idx);
            const isCorrect = isSubmitted && activeAns === q.answer;
            const borderStyle = isSubmitted 
              ? (isCorrect ? 'border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.1)]' : 'border-rose-500/30 shadow-[0_0_30px_rgba(244,63,94,0.1)]') 
              : (activeAns ? 'border-blue-500/30 shadow-[0_10px_30px_rgba(59,130,246,0.1)]' : 'border-white/5 shadow-xl');

            return (
              <div key={idx} id={`q-${idx}`} className={`glass rounded-[3rem] border transition-all duration-700 overflow-hidden bg-white/[0.02] ${borderStyle}`}>
                <div className="p-10 md:p-14 bg-gradient-to-br from-white/[0.03] to-transparent">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <span className="w-11 h-11 bg-violet-600/10 text-violet-400 border border-violet-500/20 rounded-xl flex items-center justify-center font-black shadow-inner">{idx + 1}</span>
                      <span className="text-slate-600 font-black uppercase tracking-widest text-[10px]">Reference Concept</span>
                    </div>
                    {!isSubmitted && (
                      <button 
                        onClick={() => toggleMarkForReview(idx)} 
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl border transition-all duration-300 active:scale-90 ${
                          isMarked 
                          ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]' 
                          : 'bg-white/5 border-white/5 text-slate-600 hover:text-slate-400 hover:border-white/10'
                        }`}
                      >
                        <Bookmark size={16} fill={isMarked ? "currentColor" : "none"} />
                        <span className="text-[10px] font-black uppercase tracking-widest">{isMarked ? 'Pending Review' : 'Mark Review'}</span>
                      </button>
                    )}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white leading-snug tracking-tight">{q.q}</h3>
                </div>

                <div className="bg-black/30 p-8 md:p-12 grid grid-cols-1 gap-4">
                  {q.displayOptions.map((opt, oIdx) => {
                    const isSelected = activeAns === opt;
                    const isActualCorrect = opt === q.answer;
                    
                    let btnCls = "bg-white/[0.03] border-white/5 hover:border-white/10 hover:bg-white/[0.05]";
                    let dotCls = "border-slate-800";

                    if (isSelected) {
                      btnCls = "bg-blue-600/10 border-blue-500/40 text-white shadow-[0_0_15px_rgba(59,130,246,0.1)]";
                      dotCls = "border-blue-500 bg-blue-500";
                    }

                    if (isSubmitted) {
                      if (isActualCorrect) {
                        btnCls = "bg-emerald-600/10 border-emerald-500/40 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.2)]";
                        dotCls = "border-emerald-500 bg-emerald-500";
                      } else if (isSelected && !isActualCorrect) {
                        btnCls = "bg-rose-600/10 border-rose-500/40 text-rose-300";
                        dotCls = "border-rose-500 bg-rose-500";
                      }
                    }

                    return (
                      <button 
                        key={oIdx}
                        onClick={() => handleAnswer(idx, opt)} 
                        disabled={isSubmitted}
                        className={`${darkThemeClasses.option} ${btnCls}`}
                      >
                        <span className={`text-lg font-medium pr-4 ${isSelected ? 'text-white' : 'text-slate-500'} group-hover:text-slate-200 transition-colors`}>{opt}</span>
                        <div className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center flex-shrink-0 ${dotCls}`}>
                          {(isSelected || (isSubmitted && isActualCorrect)) && <Check size={14} className="text-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {isSubmitted && (
                  <div className={`px-12 py-6 border-t ${isCorrect ? 'bg-emerald-500/5 text-emerald-400' : 'bg-rose-500/5 text-rose-400'} text-xs font-bold flex items-center gap-3 tracking-wide`}>
                    {isCorrect ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                    {isCorrect ? 'VALIDATED: Conceptual Insight Correct' : `ADVISORY: Standard Response is [ ${q.answer} ]`}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!isSubmitted && (
          <div className="pt-24 text-center">
            <button 
              onClick={submitQuiz} 
              className="group relative inline-flex items-center gap-5 px-20 py-8 bg-violet-600 hover:bg-violet-500 text-white rounded-full font-black text-2xl shadow-[0_20px_80px_rgba(139,92,246,0.4)] transition-all duration-500 hover:translate-y-[-4px] active:scale-95"
            >
              Finalize Sequence
              <CheckCircle size={32} className="group-hover:scale-110 transition-transform" />
            </button>
            <p className="mt-6 text-slate-600 text-xs font-black uppercase tracking-[0.3em]">Ensure all modules are evaluated before submission</p>
          </div>
        )}
      </div>
    </div>
  );
}
